import os
from typing import Dict, Any, List
from dotenv import load_dotenv
from langchain_groq import ChatGroq

from .schemas import AssessmentData

load_dotenv()

# Get Groq API token
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

def get_llm():
    """Get the language model from Groq API"""
    if not GROQ_API_KEY:
        raise ValueError("GROQ_API_KEY not found in .env file. Get one at https://console.groq.com/keys")
    
    return ChatGroq(
        model="llama-3.1-8b-instant",
        groq_api_key=GROQ_API_KEY,
        temperature=0.7,
        max_tokens=2048,
    )

def create_assessment_prompt(assessment: AssessmentData, context: str) -> str:
    """Create a prompt for the assessment"""
    prompt_template = """<s>[INST] You are an expert aquaculture consultant specializing in biosecurity for shrimp farming.

Analyze this shrimp farm and provide a comprehensive status assessment with percentage scores and actionable recommendations.

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

Provide your assessment in this EXACT format:

===OVERALL ASSESSMENT===
Overall Score: [0-100]
Overall Status: [Excellent/Good/Moderate Risk/High Risk/Critical]
Summary: [2-3 sentence comprehensive overview of the farm's current state and main challenges]

===CATEGORY ASSESSMENTS===

BIOSECURITY:
Score: [0-100]
Status: [Excellent/Good/Needs Improvement/Poor/Critical]
Issues: [List 2-3 specific biosecurity gaps or weaknesses, separated by semicolons]
Strengths: [List 1-2 biosecurity practices they're doing well, separated by semicolons]

WATER MANAGEMENT:
Score: [0-100]
Status: [Excellent/Good/Needs Improvement/Poor/Critical]
Issues: [List 2-3 specific water management concerns, separated by semicolons]
Strengths: [List 1-2 water management practices they're doing well, separated by semicolons]

POND PREPARATION:
Score: [0-100]
Status: [Excellent/Good/Needs Improvement/Poor/Critical]
Issues: [List 2-3 specific pond preparation issues, separated by semicolons]
Strengths: [List 1-2 pond preparation practices they're doing well, separated by semicolons]

STOCK QUALITY:
Score: [0-100]
Status: [Excellent/Good/Needs Improvement/Poor/Critical]
Issues: [List 2-3 specific stock sourcing/handling concerns, separated by semicolons]
Strengths: [List 1-2 stock quality practices they're doing well, separated by semicolons]

HEALTH MONITORING:
Score: [0-100]
Status: [Excellent/Good/Needs Improvement/Poor/Critical]
Issues: [List 2-3 specific health monitoring gaps, separated by semicolons]
Strengths: [List 1-2 health monitoring practices they're doing well, separated by semicolons]

===PRIORITY RECOMMENDATIONS===

Generate 5-8 actionable biosecurity tasks. For each task, provide:

1. [TASK TITLE]:
Description: [DETAILED EXPLANATION]
Priority: [critical/high/medium/low]
Category: [Biosecurity/Water Management/Pond Preparation/Stock Quality/Health Monitoring/Infrastructure]
Estimated Cost: [Cost range in Philippine Pesos, e.g., '₱500-1,000', '₱0 (existing equipment)']
Timeframe: [When to implement, e.g., 'Today', 'Next 7 days', 'Within 30 days']
Adaptation Reason: [Why this is specifically important for THIS farm based on their scores and practices]

[Continue for all 5-8 recommendations]

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
