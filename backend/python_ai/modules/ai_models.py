import os
from typing import Dict, Any, List
from dotenv import load_dotenv
from langchain_community.llms import HuggingFaceEndpoint

from .schemas import AssessmentData

load_dotenv()

# Get API token
HF_API_TOKEN = os.getenv("HUGGING_FACE_API_KEY")

def get_llm():
    """Get the language model from Hugging Face"""
    return HuggingFaceEndpoint(
        endpoint_url="https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
        huggingfacehub_api_token=HF_API_TOKEN,
        max_length=2048,
        temperature=0.7,
        top_p=0.95,
    )

def create_assessment_prompt(assessment: AssessmentData, context: str) -> str:
    """Create a prompt for the assessment"""
    prompt_template = """<s>[INST] You are an expert aquaculture consultant specializing in biosecurity for shrimp farming.
    
Based on the following farm profile and current biosecurity practices, generate a dynamic, prioritized biosecurity action plan.

Farm Profile:
Farm Name: {farm_name}
Location: {location}
Primary Shrimp Species: {primary_species}
Farm Type: {farm_type}
Farm Size: {farm_size}
New/Existing Farmer: {is_new_farmer}
{years_in_use}
Water Source: {water_source}
Initial Biosecurity Budget: {initial_budget}
Electricity Access: {has_electricity}
Top Concerns: {top_concerns}

{current_practices}

RELEVANT CONTEXT FROM KNOWLEDGE BASE:
{context}

Generate a list of 5-8 actionable biosecurity tasks. For each task, provide:
1. A concise title
2. Description: A detailed explanation of the task
3. Priority: critical, high, medium, or low
4. Category: The area this task belongs to (e.g., Infrastructure, Access Control, Water Management)
5. Estimated Cost: Cost range in Philippine Pesos (e.g., '₱500-1,000', '₱0 (existing equipment)')
6. Timeframe: When this should be implemented (e.g., 'Today', 'Next 7 days', 'Daily')
7. Adaptation Reason: Why this task is specifically relevant for this farm

Format each task as follows:

1. [TASK TITLE]:
Description: [DETAILED DESCRIPTION]
Priority: [PRIORITY LEVEL]
Category: [CATEGORY]
Estimated Cost: [COST ESTIMATE]
Timeframe: [TIMEFRAME]
Adaptation Reason: [SPECIFIC REASON FOR THIS FARM]

[/INST]
"""

    # Format existing pond practices if applicable
    current_practices = ""
    if assessment.isNewFarmer == "Existing Pond":
        practices_items = []
        if assessment.pondDrainSunDry: 
            practices_items.append(f"Pond Drain & Sun-dry: {assessment.pondDrainSunDry}")
        if assessment.removeMuckLayer:
            practices_items.append(f"Remove Muck Layer: {assessment.removeMuckLayer}")
        if assessment.disinfectPond:
            practices_items.append(f"Disinfect Pond: {assessment.disinfectPond}")
        if assessment.filterIncomingWater:
            practices_items.append(f"Filter Incoming Water: {assessment.filterIncomingWater}")
        if assessment.separateReservoir:
            practices_items.append(f"Separate Reservoir: {assessment.separateReservoir}")
        if assessment.waterMonitoringFrequency:
            practices_items.append(f"Water Monitoring Frequency: {assessment.waterMonitoringFrequency}")
        if assessment.plSource:
            practices_items.append(f"PL Source: {assessment.plSource}")
        if assessment.acclimatePLs:
            practices_items.append(f"Acclimate PLs: {assessment.acclimatePLs}")
        if assessment.quarantinePLs:
            practices_items.append(f"Quarantine PLs: {assessment.quarantinePLs}")
        if assessment.hasFencing:
            practices_items.append(f"Has Fencing: {assessment.hasFencing}")
        if assessment.useFootbaths:
            practices_items.append(f"Use Footbaths: {assessment.useFootbaths}")
        if assessment.equipmentSharing:
            practices_items.append(f"Equipment Sharing: {assessment.equipmentSharing}")
        if assessment.visitorManagement:
            practices_items.append(f"Visitor Management: {assessment.visitorManagement}")
        if assessment.wasteDisposal:
            practices_items.append(f"Waste Disposal: {assessment.wasteDisposal}")
        if assessment.controlFeeding:
            practices_items.append(f"Control Feeding: {assessment.controlFeeding}")
        if assessment.healthMonitoring:
            practices_items.append(f"Health Monitoring: {assessment.healthMonitoring}")
        if assessment.keepRecords:
            practices_items.append(f"Keep Records: {assessment.keepRecords}")
        
        if practices_items:
            current_practices = "Current Biosecurity & Management Practices:\n" + "\n".join(practices_items)
    
    # Format years in use if applicable
    years_in_use = f"Years in use: {assessment.existingPondYears}" if assessment.existingPondYears else ""
    
    # Create the prompt
    prompt = prompt_template.format(
        farm_name=assessment.farmName,
        location=assessment.location,
        primary_species=assessment.primarySpecies,
        farm_type=assessment.farmType,
        farm_size=assessment.farmSize,
        is_new_farmer=assessment.isNewFarmer,
        years_in_use=years_in_use,
        water_source=", ".join(assessment.waterSource),
        initial_budget=assessment.initialBudget,
        has_electricity=assessment.hasElectricity,
        top_concerns=", ".join(assessment.topConcerns),
        current_practices=current_practices,
        context=context
    )
    
    return prompt
