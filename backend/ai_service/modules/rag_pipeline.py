from typing import List, Dict, Any
import os
import re

try:
    from langchain_chroma import Chroma
except ImportError:
    from langchain_community.vectorstores import Chroma

from .document_loader import process_pdfs
from .embedding import get_embeddings_model
from .schemas import AssessmentData, AIRecommendation, CategoryAssessment, FarmStatusAssessment
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

def process_farm_assessment(assessment_data: AssessmentData) -> FarmStatusAssessment:
    """Process farm assessment using RAG pipeline"""
    # Get relevant context from vector DB
    context = get_relevant_context(assessment_data)
    
    # Create prompt with assessment data and context
    prompt = create_assessment_prompt(assessment_data, context)
    
    # Get LLM from Groq
    llm = get_llm()
    
    # Generate completion with prompt
    response = llm.invoke(prompt)
    
    # Extract content from AIMessage object (ChatGroq returns AIMessage)
    response_text = response.content if hasattr(response, 'content') else str(response)
    
    # Parse response into structured assessment with scores
    assessment = parse_ai_response(response_text)
    
    return assessment

def query_farm_knowledge(question: str) -> str:
    """
    Query the RAG system for farm-related knowledge.
    Returns an AI-generated answer based on the vector database context.
    """
    # Check if question is farm-related
    farm_keywords = [
        'shrimp', 'prawn', 'aquaculture', 'pond', 'water', 'feed', 'disease', 
        'biosecurity', 'gaqp', 'farm', 'harvest', 'culture', 'post-larvae', 'pl',
        'stocking', 'mortality', 'growth', 'vannamei', 'monodon', 'oxygen',
        'ph', 'salinity', 'temperature', 'ammonia', 'nitrite', 'treatment',
        'hatchery', 'nursery', 'grow-out', 'fry', 'nauplii'
    ]
    
    question_lower = question.lower()
    is_farm_related = any(keyword in question_lower for keyword in farm_keywords)
    
    if not is_farm_related:
        return ("I'm LikAI Coach, specialized in aquaculture and shrimp farming practices. "
                "I can only answer questions related to shrimp farming, pond management, "
                "biosecurity, water quality, feeding, disease prevention, and GAqP best practices. "
                "Please ask me something about your shrimp farm! 🦐")
    
    # Initialize vector DB
    vector_db = initialize_or_load_vectordb()
    
    # Retrieve relevant context
    docs = vector_db.similarity_search(question, k=4)
    
    # Format context
    context_parts = []
    for doc in docs:
        source = doc.metadata.get("source", "unknown")
        context_parts.append(f"[From {source}]\n{doc.page_content}")
    
    context = "\n\n".join(context_parts)
    
    # Create prompt for question answering
    prompt = f"""You are LikAI Coach, an expert in shrimp aquaculture and GAqP (Good Aquaculture Practices) certification. 
Answer the farmer's question using the provided context from official GAqP manuals.

CONTEXT FROM GAqP MANUALS:
{context}

FARMER'S QUESTION:
{question}

INSTRUCTIONS:
- Provide a clear, practical answer that farmers can immediately apply
- Use simple language and avoid jargon when possible
- Include specific steps or actions when relevant
- Reference GAqP standards when applicable
- Keep the response concise but comprehensive (3-5 paragraphs max)
- Use emojis sparingly for emphasis (🦐 for shrimp, 💧 for water, etc.)
- If the context doesn't fully answer the question, provide general best practices

ANSWER:"""
    
    # Get LLM response
    llm = get_llm()
    response = llm.invoke(prompt)
    
    # Extract content
    answer = response.content if hasattr(response, 'content') else str(response)
    
    return answer.strip()

def parse_ai_response(response: str) -> FarmStatusAssessment:
    """Parse the AI response into structured assessment with scores"""
    
    # Initialize defaults
    overall_score = 50
    overall_status = "Moderate Risk"
    summary = "Assessment completed. Please review the recommendations below."
    categories = {}
    recommendations = []
    
    try:
        # Extract overall assessment
        overall_match = re.search(r'Overall Score:\s*(\d+)', response, re.IGNORECASE)
        if overall_match:
            overall_score = int(overall_match.group(1))
        
        status_match = re.search(r'Overall Status:\s*([^\n]+)', response, re.IGNORECASE)
        if status_match:
            overall_status = status_match.group(1).strip()
        
        summary_match = re.search(r'Summary:\s*([^\n]+(?:\n(?!===)[^\n]+)*)', response, re.IGNORECASE)
        if summary_match:
            summary = summary_match.group(1).strip()
        
        # Extract category assessments
        category_names = ['BIOSECURITY', 'WATER MANAGEMENT', 'POND PREPARATION', 'STOCK QUALITY', 'HEALTH MONITORING']
        
        for category_name in category_names:
            # Find the category block
            category_pattern = rf'{category_name}:\s*\n\s*Score:\s*(\d+)\s*\n\s*Status:\s*([^\n]+)\s*\n\s*Issues:\s*([^\n]+)\s*\n\s*Strengths:\s*([^\n]+)'
            category_match = re.search(category_pattern, response, re.IGNORECASE | re.DOTALL)
            
            if category_match:
                score = int(category_match.group(1))
                status = category_match.group(2).strip()
                issues_str = category_match.group(3).strip()
                strengths_str = category_match.group(4).strip()
                
                # Split by semicolons and clean up
                issues = [i.strip() for i in issues_str.split(';') if i.strip()]
                strengths = [s.strip() for s in strengths_str.split(';') if s.strip()]
                
                # Use a clean category key (lowercase with underscores)
                category_key = category_name.lower().replace(' ', '_')
                
                categories[category_key] = CategoryAssessment(
                    score=score,
                    status=status,
                    issues=issues if issues else ["No specific issues identified"],
                    strengths=strengths if strengths else ["Practices under review"]
                )
        
        # Extract recommendations
        # Find the recommendations section
        rec_section = re.search(r'===PRIORITY RECOMMENDATIONS===(.*)', response, re.IGNORECASE | re.DOTALL)
        if rec_section:
            rec_text = rec_section.group(1)
            
            # Split by numbered tasks
            task_blocks = re.split(r'\n\s*\d+\.\s+', rec_text)
            task_blocks = [block for block in task_blocks if block.strip()]
            
            for block in task_blocks:
                try:
                    title_match = re.search(r'^([^:]+):', block)
                    title = title_match.group(1).strip() if title_match else 'Task'
                    
                    desc_match = re.search(r'Description:\s*([^P][^\n]*(?:\n(?!Priority:)[^\n]+)*)', block, re.IGNORECASE)
                    description = desc_match.group(1).strip() if desc_match else block[:200].strip()
                    
                    priority_match = re.search(r'Priority:\s*(critical|high|medium|low)', block, re.IGNORECASE)
                    priority = priority_match.group(1).lower() if priority_match else 'medium'
                    
                    category_match = re.search(r'Category:\s*([^\n]+)', block, re.IGNORECASE)
                    category = category_match.group(1).strip() if category_match else 'General'
                    
                    cost_match = re.search(r'Estimated Cost:\s*([^\n]+)', block, re.IGNORECASE)
                    estimated_cost = cost_match.group(1).strip() if cost_match else '₱0-1,000'
                    
                    timeframe_match = re.search(r'Timeframe:\s*([^\n]+)', block, re.IGNORECASE)
                    timeframe = timeframe_match.group(1).strip() if timeframe_match else 'Within 7 days'
                    
                    reason_match = re.search(r'Adaptation Reason:\s*([^\n]+(?:\n(?!\d+\.)[^\n]+)*)', block, re.IGNORECASE)
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
                    print(f"Error parsing recommendation: {e}")
                    continue
    
    except Exception as e:
        print(f"Error parsing AI response: {e}")
    
    # If no categories were parsed, create defaults
    if not categories:
        default_categories = ['biosecurity', 'water_management', 'pond_preparation', 'stock_quality', 'health_monitoring']
        for cat in default_categories:
            categories[cat] = CategoryAssessment(
                score=50,
                status="Needs Assessment",
                issues=["Data collection in progress"],
                strengths=["Assessment pending"]
            )
    
    # If no recommendations were parsed, create a fallback
    if not recommendations:
        recommendations = [AIRecommendation(
            title="Implement Basic Biosecurity Measures",
            description="Set up fundamental biosecurity practices appropriate for your farm type.",
            priority="high",
            category="Biosecurity",
            estimatedCost="₱1,000-3,000",
            timeframe="Within 7 days",
            adaptationReason="Essential foundation for farm health"
        )]
    
    return FarmStatusAssessment(
        overallScore=overall_score,
        overallStatus=overall_status,
        summary=summary,
        categories=categories,
        recommendations=recommendations
    )
