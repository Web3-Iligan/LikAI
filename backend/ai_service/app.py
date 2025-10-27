from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from contextlib import asynccontextmanager
import os
import json
import logging
from datetime import datetime
from dotenv import load_dotenv

from modules.rag_pipeline import process_farm_assessment, query_farm_knowledge
from modules.schemas import AssessmentData, AIRecommendation, CategoryAssessment, FarmStatusAssessment

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)
logger = logging.getLogger(__name__)

# Lifespan event handler (replaces deprecated on_event)
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info("=" * 80)
    logger.info("🚀 FARM ASSESSMENT AI BACKEND STARTING UP")
    logger.info("=" * 80)
    logger.info("Server: http://0.0.0.0:8000")
    logger.info("Health: http://0.0.0.0:8000/health")
    logger.info("API Docs: http://0.0.0.0:8000/docs")
    logger.info("Assessment Endpoint: http://0.0.0.0:8000/process-assessment")
    logger.info("Model: llama-3.1-8b-instant (Groq)")
    logger.info("=" * 80)
    logger.info("⏳ Waiting for requests from frontend...")
    logger.info("=" * 80)
    yield
    # Shutdown
    logger.info("=" * 80)
    logger.info("🛑 FARM ASSESSMENT AI BACKEND SHUTTING DOWN")
    logger.info("=" * 80)

app = FastAPI(title="Farm Assessment AI API", lifespan=lifespan)

# Configure CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Middleware to log all requests
@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = datetime.now()
    
    # Log incoming request
    logger.info(f"🌐 {request.method} {request.url.path} - Client: {request.client.host}")
    
    # Process request
    response = await call_next(request)
    
    # Calculate processing time
    process_time = (datetime.now() - start_time).total_seconds()
    
    # Log response
    logger.info(f"⏱️  Completed in {process_time:.2f}s - Status: {response.status_code}")
    
    return response

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
    overallScore: int
    overallStatus: str
    summary: str
    categories: Dict[str, Dict[str, Any]]
    tasks: List[AIRecommendation]

@app.post("/process-assessment", response_model=RecommendationResponse)
async def analyze_assessment(request: AssessmentRequest):
    try:
        # Log incoming request
        logger.info("=" * 80)
        logger.info("📥 INCOMING REQUEST FROM FRONTEND")
        logger.info("=" * 80)
        
        request_dict = request.model_dump()
        logger.info(f"Farm Name: {request_dict.get('farmName')}")
        logger.info(f"Location: {request_dict.get('location')}")
        logger.info(f"Species: {request_dict.get('primarySpecies')}")
        logger.info(f"Farm Type: {request_dict.get('farmType')}")
        logger.info(f"Farm Size: {request_dict.get('farmSize')}")
        logger.info(f"New/Existing: {request_dict.get('isNewFarmer')}")
        logger.info(f"Top Concerns: {request_dict.get('topConcerns')}")
        
        # Log full request as JSON
        logger.info("\n📋 FULL REQUEST DATA:")
        logger.info(json.dumps(request_dict, indent=2, ensure_ascii=False))
        logger.info("-" * 80)
        
        # Convert request to internal schema
        assessment_data = AssessmentData(**request.model_dump())
        
        logger.info("🤖 Processing assessment with RAG pipeline...")
        
        # Process with RAG pipeline
        farm_assessment = process_farm_assessment(assessment_data)
        
        # Convert FarmStatusAssessment to response format
        response_data = {
            "overallScore": farm_assessment.overallScore,
            "overallStatus": farm_assessment.overallStatus,
            "summary": farm_assessment.summary,
            "categories": {
                key: {
                    "score": cat.score,
                    "status": cat.status,
                    "issues": cat.issues,
                    "strengths": cat.strengths
                }
                for key, cat in farm_assessment.categories.items()
            },
            "tasks": farm_assessment.recommendations
        }
        
        # Log outgoing response
        logger.info("=" * 80)
        logger.info("📤 SENDING RESPONSE TO FRONTEND")
        logger.info("=" * 80)
        logger.info(f"Overall Score: {response_data['overallScore']}/100")
        logger.info(f"Overall Status: {response_data['overallStatus']}")
        logger.info(f"Summary: {response_data['summary'][:100]}...")
        
        # Log category scores
        logger.info("\n📊 CATEGORY SCORES:")
        for cat_name, cat_data in response_data['categories'].items():
            logger.info(f"  • {cat_name.replace('_', ' ').title()}: {cat_data['score']}/100 ({cat_data['status']})")
        
        logger.info(f"\n✅ Generated {len(response_data['tasks'])} recommendations")
        
        # Log first recommendation as sample
        if response_data['tasks']:
            first_task = response_data['tasks'][0]
            logger.info(f"\n📝 Sample Recommendation:")
            logger.info(f"  Title: {first_task.title}")
            logger.info(f"  Priority: {first_task.priority}")
            logger.info(f"  Category: {first_task.category}")
        
        # Log full response as JSON
        logger.info("\n📋 FULL RESPONSE DATA:")
        # Create serializable version of response
        serializable_response = {
            "overallScore": response_data["overallScore"],
            "overallStatus": response_data["overallStatus"],
            "summary": response_data["summary"],
            "categories": response_data["categories"],
            "tasks": [
                {
                    "title": task.title,
                    "description": task.description,
                    "priority": task.priority,
                    "category": task.category,
                    "estimatedCost": task.estimatedCost,
                    "timeframe": task.timeframe,
                    "adaptationReason": task.adaptationReason
                }
                for task in response_data["tasks"]
            ]
        }
        logger.info(json.dumps(serializable_response, indent=2, ensure_ascii=False))
        logger.info("=" * 80)
        logger.info("✅ REQUEST COMPLETED SUCCESSFULLY")
        logger.info("=" * 80)
        
        return response_data
    except Exception as e:
        logger.error("=" * 80)
        logger.error("❌ ERROR PROCESSING REQUEST")
        logger.error("=" * 80)
        logger.error(f"Error: {str(e)}")
        logger.error("=" * 80)
        raise HTTPException(status_code=500, detail=f"Error processing assessment: {str(e)}")

class QueryRequest(BaseModel):
    question: str
    session_id: Optional[str] = None

class QueryResponse(BaseModel):
    answer: str
    question: str
    timestamp: str

@app.post("/query", response_model=QueryResponse)
async def query_knowledge(request: QueryRequest):
    """
    Query the RAG system for farm-related knowledge.
    Includes guardrails to only answer aquaculture-related questions.
    """
    try:
        logger.info("=" * 80)
        logger.info("🤖 CHATBOT QUERY REQUEST")
        logger.info("=" * 80)
        logger.info(f"Question: {request.question}")
        logger.info(f"Session ID: {request.session_id or 'N/A'}")
        
        # Get answer from RAG system
        answer = query_farm_knowledge(request.question)
        
        logger.info(f"✅ Generated answer ({len(answer)} characters)")
        logger.info("=" * 80)
        
        return QueryResponse(
            answer=answer,
            question=request.question,
            timestamp=datetime.now().isoformat()
        )
    except Exception as e:
        logger.error(f"❌ Error processing query: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error processing query: {str(e)}")

@app.get("/")
async def root():
    """Root endpoint - API information"""
    return {
        "service": "Farm Assessment AI API",
        "status": "running",
        "model": "llama-3.1-8b-instant (Groq)",
        "endpoints": {
            "health": "/health",
            "assessment": "/process-assessment (POST)",
            "query": "/query (POST)",
            "docs": "/docs"
        }
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    logger.info("💚 Health check requested")
    return {"status": "healthy", "service": "farm-ai"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
