from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
import os
from dotenv import load_dotenv

from modules.rag_pipeline import process_farm_assessment
from modules.schemas import AssessmentData, AIRecommendation

# Load environment variables
load_dotenv()

app = FastAPI(title="Farm Assessment AI API")

# Configure CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AssessmentRequest(BaseModel):
    farmName: str
    location: str
    primarySpecies: str
    farmType: str
    farmSize: str
    isNewFarmer: str
    existingPondYears: Optional[str] = None
    waterSource: List[str]
    initialBudget: str
    hasElectricity: str
    topConcerns: List[str]
    # Optional fields for existing farms
    pondDrainSunDry: Optional[str] = None
    removeMuckLayer: Optional[str] = None
    disinfectPond: Optional[str] = None
    filterIncomingWater: Optional[str] = None
    separateReservoir: Optional[str] = None
    waterMonitoringFrequency: Optional[str] = None
    plSource: Optional[str] = None
    acclimatePLs: Optional[str] = None
    quarantinePLs: Optional[str] = None
    hasFencing: Optional[str] = None
    useFootbaths: Optional[str] = None
    equipmentSharing: Optional[str] = None
    visitorManagement: Optional[str] = None
    wasteDisposal: Optional[str] = None
    controlFeeding: Optional[str] = None
    healthMonitoring: Optional[str] = None
    keepRecords: Optional[str] = None

class RecommendationResponse(BaseModel):
    tasks: List[AIRecommendation]

@app.post("/process-assessment", response_model=RecommendationResponse)
async def analyze_assessment(request: AssessmentRequest):
    try:
        # Convert request to internal schema
        assessment_data = AssessmentData(**request.dict())
        
        # Process with RAG pipeline
        recommendations = process_farm_assessment(assessment_data)
        
        return {"tasks": recommendations}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing assessment: {str(e)}")

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "farm-ai"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
