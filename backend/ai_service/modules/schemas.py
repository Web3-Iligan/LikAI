from pydantic import BaseModel
from typing import List, Optional, Dict

class AssessmentData(BaseModel):
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
    
    # Add other assessment fields as needed
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

class AIRecommendation(BaseModel):
    title: str
    description: str
    priority: str
    category: str
    estimatedCost: str
    timeframe: str
    adaptationReason: Optional[str] = None

class CategoryAssessment(BaseModel):
    score: int  # 0-100
    status: str  # Excellent/Good/Needs Improvement/Poor/Critical
    issues: List[str]
    strengths: List[str]

class FarmStatusAssessment(BaseModel):
    overallScore: int  # 0-100
    overallStatus: str  # Excellent/Good/Moderate Risk/High Risk/Critical
    summary: str
    categories: Dict[str, CategoryAssessment]
    recommendations: List[AIRecommendation]
