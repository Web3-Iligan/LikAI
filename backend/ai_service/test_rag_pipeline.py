"""
Complete RAG Pipeline Status Check
Checks the entire system status without performing actual operations
"""

import os
import sys
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def print_section(title):
    """Print a formatted section header"""
    print("\n" + "=" * 70)
    print(f"  {title}")
    print("=" * 70)

def check_pdf_files():
    """Check 1: PDF Files Availability"""
    print_section("CHECK 1: PDF FILES AVAILABILITY")
    
    try:
        pdf_dir = os.path.join("data", "pdfs")
        
        if not os.path.exists(pdf_dir):
            print(f"[ERROR] PDF directory not found: {pdf_dir}")
            return False
        
        pdf_files = [f for f in os.listdir(pdf_dir) if f.endswith('.pdf')]
        
        if not pdf_files:
            print(f"[ERROR] No PDF files found in {pdf_dir}")
            return False
        
        print(f"[OK] Found {len(pdf_files)} PDF files:")
        for pdf in pdf_files:
            file_path = os.path.join(pdf_dir, pdf)
            file_size = os.path.getsize(file_path) / (1024 * 1024)  # MB
            print(f"  - {pdf} ({file_size:.2f} MB)")
        
        return True
        
    except Exception as e:
        print(f"[ERROR] PDF check failed: {e}")
        return False

def check_embeddings_ready():
    """Check 2: Embedding Model Availability"""
    print_section("CHECK 2: EMBEDDING MODEL")
    
    try:
        from modules.embedding import get_embeddings_model
        
        # Get embedding model name
        embedding_model = os.getenv("EMBEDDING_MODEL", "all-MiniLM-L6-v2")
        print(f"[INFO] Configured model: {embedding_model}")
        
        # Try to initialize the model (will download if not cached)
        print("[TEST] Initializing embedding model...")
        embeddings = get_embeddings_model()
        print("[OK] Embedding model loaded successfully")
        
        # Quick test
        test_embedding = embeddings.embed_query("test")
        print(f"[OK] Embedding dimension: {len(test_embedding)}")
        
        return True
        
    except Exception as e:
        print(f"[ERROR] Embedding model check failed: {e}")
        return False

def check_vector_database():
    """Check 3: Vector Database Status"""
    print_section("CHECK 3: VECTOR DATABASE STATUS")
    
    try:
        vectordb_dir = os.path.join("data", "vectordb")
        
        # Check if vector DB directory exists
        if not os.path.exists(vectordb_dir):
            print(f"[WARNING] Vector DB directory not found: {vectordb_dir}")
            print("[INFO] Run: python initialize_vectordb.py")
            return False
        
        # Check if ChromaDB files exist
        chroma_db = os.path.join(vectordb_dir, "chroma.sqlite3")
        if not os.path.exists(chroma_db):
            print(f"[WARNING] ChromaDB file not found: {chroma_db}")
            print("[INFO] Run: python initialize_vectordb.py")
            return False
        
        # Get database size
        db_size = os.path.getsize(chroma_db) / (1024 * 1024)  # MB
        print(f"[OK] Vector DB found: {db_size:.2f} MB")
        
        # Try to load and check document count
        from modules.rag_pipeline import initialize_or_load_vectordb
        
        print("[TEST] Loading vector database...")
        vector_db = initialize_or_load_vectordb()
        
        result = vector_db.get()
        doc_count = len(result['ids'])
        
        if doc_count == 0:
            print("[WARNING] Vector DB is empty!")
            print("[INFO] Run: python initialize_vectordb.py")
            return False
        
        print(f"[OK] Vector DB loaded with {doc_count} document chunks")
        
        # Test a quick similarity search
        print("[TEST] Testing similarity search...")
        test_results = vector_db.similarity_search("biosecurity for shrimp farming", k=1)
        
        if test_results:
            print(f"[OK] Similarity search working")
            print(f"     Sample result: {test_results[0].metadata.get('source', 'Unknown')}")
        
        return True
        
    except Exception as e:
        print(f"[ERROR] Vector database check failed: {e}")
        import traceback
        traceback.print_exc()
        return False

def check_llm_connection():
    """Check 4: LLM Connection & API Key"""
    print_section("CHECK 4: LLM CONNECTION (GROQ API)")
    
    try:
        # Check API key
        groq_key = os.getenv("GROQ_API_KEY")
        if not groq_key:
            print("[ERROR] GROQ_API_KEY not found in .env file")
            print("[INFO] Get your free API key at: https://console.groq.com/keys")
            print("[INFO] Add to .env: GROQ_API_KEY=your_key_here")
            return False
        
        # Mask the key for display
        masked_key = groq_key[:8] + "..." + groq_key[-4:] if len(groq_key) > 12 else "***"
        print(f"[OK] Groq API key found: {masked_key}")
        
        # Initialize LLM
        from modules.ai_models import get_llm
        
        print("[TEST] Initializing Groq LLM (llama-3.1-8b-instant)...")
        llm = get_llm()
        print("[OK] LLM initialized successfully")
        
        # Test connection with simple prompt
        test_prompt = "Say 'OK' if you can read this."
        print(f"[TEST] Sending test prompt to Groq API...")
        
        response = llm.invoke(test_prompt)
        response_text = response.content if hasattr(response, 'content') else str(response)
        
        print(f"[RESPONSE] {response_text[:100]}...")
        print("[OK] Groq API responding correctly")
        
        return True
        
    except Exception as e:
        print(f"[ERROR] LLM connection failed: {e}")
        print("[NOTE] Make sure you have a valid Groq API key in your .env file")
        print("[INFO] Get one at: https://console.groq.com/keys")
        return False

def check_rag_pipeline():
    """Check 5: Complete RAG Pipeline"""
    print_section("CHECK 5: RAG PIPELINE END-TO-END TEST")
    
    from modules.rag_pipeline import process_farm_assessment
    from modules.schemas import AssessmentData
    
    try:
        # Create minimal test assessment
        test_assessment = AssessmentData(
            farmName="Test Farm",
            location="Pampanga",
            primarySpecies="Vannamei Shrimp",
            farmType="Semi-intensive",
            farmSize="2 hectares",
            isNewFarmer="New Farmer",
            waterSource=["Well Water"],
            initialBudget="₱50,000-100,000",
            hasElectricity="Yes",
            topConcerns=["Disease Prevention"]
        )
        
        print("[TEST] Processing test farm assessment...")
        print(f"[INPUT] Farm: {test_assessment.farmName} | Location: {test_assessment.location}")
        
        assessment = process_farm_assessment(test_assessment)
        
        if not assessment:
            print("[ERROR] No assessment generated")
            return False
        
        # Display overall assessment scores
        print(f"\n[OK] Farm Assessment Completed:")
        print(f"  Overall Score: {assessment.overallScore}/100")
        print(f"  Overall Status: {assessment.overallStatus}")
        print(f"  Summary: {assessment.summary[:100]}...")
        
        # Display category scores
        print(f"\n[CATEGORIES] Assessed {len(assessment.categories)} areas:")
        for category_name, category_data in assessment.categories.items():
            print(f"  - {category_name.replace('_', ' ').title()}: {category_data.score}/100 ({category_data.status})")
        
        # Display recommendations
        print(f"\n[RECOMMENDATIONS] Generated {len(assessment.recommendations)} tasks")
        
        # Show first recommendation as sample
        if assessment.recommendations:
            rec = assessment.recommendations[0]
            print(f"\n[SAMPLE] First Recommendation:")
            print(f"  Title: {rec.title[:80]}...")  # Truncate long titles
            print(f"  Priority: {rec.priority}")
            print(f"  Category: {rec.category}")
            # Handle Unicode characters in cost (₱ symbol)
            cost_display = rec.estimatedCost.encode('ascii', 'replace').decode('ascii')
            print(f"  Cost: {cost_display}")
            print(f"  Timeframe: {rec.timeframe}")
        
        print("\n[OK] RAG pipeline is fully operational with status assessments")
        return True
        
    except Exception as e:
        print(f"[ERROR] RAG pipeline check failed: {e}")
        import traceback
        traceback.print_exc()
        return False

def main():
    """Run all system checks"""
    print("\n" + "=" * 70)
    print("  RAG PIPELINE SYSTEM STATUS CHECK")
    print("  Verifying: PDFs -> Embeddings -> Vector DB -> LLM -> Pipeline")
    print("=" * 70)
    
    results = {}
    
    # Run all checks
    results['PDF Files'] = check_pdf_files()
    results['Embedding Model'] = check_embeddings_ready()
    results['Vector Database'] = check_vector_database()
    results['LLM Connection'] = check_llm_connection()
    
    # Only run full pipeline test if previous checks passed
    if all(results.values()):
        results['RAG Pipeline'] = check_rag_pipeline()
    else:
        print_section("SKIPPING RAG PIPELINE TEST")
        print("[SKIP] Previous checks failed, skipping full pipeline test")
        results['RAG Pipeline'] = False
    
    # Print summary
    print_section("STATUS SUMMARY")
    
    passed = sum(1 for v in results.values() if v)
    total = len(results)
    
    for check_name, result in results.items():
        status = "[PASS]" if result else "[FAIL]"
        print(f"{status:8} {check_name}")
    
    print(f"\n{'=' * 70}")
    print(f"  RESULTS: {passed}/{total} checks passed")
    
    if passed == total:
        print(f"  STATUS: [SUCCESS] ALL SYSTEMS OPERATIONAL")
        print(f"\n  Ready to run: python app.py")
    else:
        print(f"  STATUS: [ERROR] SYSTEM NOT READY")
        print(f"\n  Next steps:")
        if not results.get('PDF Files'):
            print("    1. Add PDFs to data/pdfs/")
        if not results.get('Vector Database'):
            print("    2. Run: python initialize_vectordb.py")
        if not results.get('LLM Connection'):
            print("    3. Add GROQ_API_KEY to .env file")
    
    print("=" * 70)
    
    return 0 if passed == total else 1

if __name__ == "__main__":
    exit_code = main()
    sys.exit(exit_code)
