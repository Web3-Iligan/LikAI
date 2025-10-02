from typing import List, Dict, Any
import os
import re
from langchain_community.vectorstores import Chroma
from langchain.retrievers import ContextualCompressionRetriever
from langchain.retrievers.document_compressors import LLMChainExtractor

from .document_loader import process_pdfs
from .embedding import get_embeddings_model
from .schemas import AssessmentData, AIRecommendation
from .ai_models import get_llm, create_assessment_prompt

# Vector DB path
VECTOR_DB_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data", "vectordb")
os.makedirs(VECTOR_DB_PATH, exist_ok=True)

def initialize_or_load_vectordb():
    """Initialize or load the vector database"""
    embeddings = get_embeddings_model()
    
    # Check if vector DB exists
    if os.path.exists(VECTOR_DB_PATH) and os.listdir(VECTOR_DB_PATH):
        # Load existing DB
        vector_db = Chroma(persist_directory=VECTOR_DB_PATH, embedding_function=embeddings)
    else:
        # Create new DB
        chunks = process_pdfs()
        if not chunks:
            raise ValueError("No documents found to process")
            
        vector_db = Chroma.from_documents(
            documents=chunks,
            embedding=embeddings,
            persist_directory=VECTOR_DB_PATH
        )
        vector_db.persist()
        
    return vector_db

def get_relevant_context(assessment_data: AssessmentData) -> str:
    """Retrieve relevant context for the assessment"""
    vector_db = initialize_or_load_vectordb()
    
    # Create search query from assessment data
    query_parts = [
        assessment_data.primarySpecies,
        assessment_data.farmType,
        assessment_data.isNewFarmer,
        *assessment_data.topConcerns
    ]
    query = " ".join(filter(None, query_parts))
    
    # Retrieve relevant documents
    docs = vector_db.similarity_search(query, k=5)
    
    # Format context from documents
    context_parts = []
    for doc in docs:
        source = doc.metadata.get("source", "unknown")
        category = doc.metadata.get("category", "general")
        context_parts.append(f"--- From {source} ({category}) ---\n{doc.page_content}")
    
    return "\n\n".join(context_parts)

def process_farm_assessment(assessment_data: AssessmentData) -> List[AIRecommendation]:
    """Process farm assessment using RAG pipeline"""
    # Get relevant context from vector DB
    context = get_relevant_context(assessment_data)
    
    # Create prompt with assessment data and context
    prompt = create_assessment_prompt(assessment_data, context)
    
    # Get LLM from Hugging Face
    llm = get_llm()
    
    # Generate completion with prompt
    response = llm.invoke(prompt)
    
    # Parse response into structured recommendations
    recommendations = parse_ai_response(response)
    
    return recommendations

def parse_ai_response(response: str) -> List[AIRecommendation]:
    """Parse the AI response into structured recommendations"""
    # Start with a simple implementation - this can be enhanced later
    # In production, you'd use more robust parsing
    
    recommendations = []
    
    # Simple regex-based parsing
    task_blocks = re.split(r'\d+\.\s+', response)
    task_blocks = [block for block in task_blocks if block.strip()]
    
    for block in task_blocks:
        try:
            title_match = re.search(r'^([^:]+):', block)
            title = title_match.group(1).strip() if title_match else 'Task'
            
            desc_match = re.search(r'Description:\s*([^Priority]+)', block, re.IGNORECASE)
            description = desc_match.group(1).strip() if desc_match else block[:200].strip()
            
            priority_match = re.search(r'Priority:\s*(critical|high|medium|low)', block, re.IGNORECASE)
            priority = priority_match.group(1).lower() if priority_match else 'medium'
            
            category_match = re.search(r'Category:\s*([^Estimated]+)', block, re.IGNORECASE)
            category = category_match.group(1).strip() if category_match else 'General'
            
            cost_match = re.search(r'Estimated Cost:\s*([^Timeframe]+)', block, re.IGNORECASE)
            estimated_cost = cost_match.group(1).strip() if cost_match else '₱0-1,000'
            
            timeframe_match = re.search(r'Timeframe:\s*([^Adaptation]+)', block, re.IGNORECASE)
            timeframe = timeframe_match.group(1).strip() if timeframe_match else 'Within 7 days'
            
            reason_match = re.search(r'Adaptation Reason:\s*(.+)', block, re.IGNORECASE)
            adaptation_reason = reason_match.group(1).strip() if reason_match else None
            
            recommendations.append(AIRecommendation(
                title=title,
                description=description,
                priority=priority,
                category=category,
                estimatedCost=estimated_cost,
                timeframe=timeframe,
                adaptationReason=adaptation_reason
            ))
        except Exception as e:
            print(f"Error parsing task block: {e}")
    
    # If parsing failed completely, return a fallback recommendation
    if not recommendations:
        recommendations = [AIRecommendation(
            title="Implement Basic Biosecurity Measures",
            description="Set up fundamental biosecurity practices appropriate for your farm type.",
            priority="high",
            category="Biosecurity",
            estimatedCost="₱1,000-3,000",
            timeframe="Within 7 days"
        )]
    
    return recommendations
