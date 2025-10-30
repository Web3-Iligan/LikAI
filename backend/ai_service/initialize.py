#!/usr/bin/env python
"""
LikAI AI Service Initializer
Complete setup script that:
1. Checks environment configuration
2. Downloads embedding model
3. Initializes vector database
4. Verifies all components

Run this once to set up the entire AI service.
"""

import os
import sys
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def print_header(text, char="="):
    """Print a formatted header"""
    width = 80
    print("\n" + char * width)
    print(f"  {text}")
    print(char * width)

def print_step(step_num, total_steps, title):
    """Print a step header"""
    print(f"\n{'='*80}")
    print(f"  STEP {step_num}/{total_steps}: {title}")
    print(f"{'='*80}")

def check_environment():
    """Step 1: Check environment configuration"""
    print_step(1, 5, "ENVIRONMENT CONFIGURATION")
    
    try:
        # Check for .env file
        env_file = os.path.join(os.path.dirname(__file__), ".env")
        if not os.path.exists(env_file):
            print("❌ .env file not found!")
            print("\nPlease create a .env file with:")
            print("   GROQ_API_KEY=your_groq_api_key_here")
            print("   EMBEDDING_MODEL=all-MiniLM-L6-v2")
            print("\nGet your free Groq API key at: https://console.groq.com/keys")
            return False
        
        print("✅ .env file found")
        
        # Check GROQ API key
        groq_key = os.getenv("GROQ_API_KEY")
        if not groq_key:
            print("❌ GROQ_API_KEY not set in .env file")
            print("\nGet your free API key at: https://console.groq.com/keys")
            print("   Add to .env: GROQ_API_KEY=your_key_here")
            return False
        
        masked_key = groq_key[:8] + "..." + groq_key[-4:] if len(groq_key) > 12 else "***"
        print(f"✅ GROQ_API_KEY configured: {masked_key}")
        
        # Check embedding model configuration
        embedding_model = os.getenv("EMBEDDING_MODEL", "all-MiniLM-L6-v2")
        print(f"✅ Embedding model configured: {embedding_model}")
        
        return True
        
    except Exception as e:
        print(f"❌ Environment check failed: {e}")
        return False

def check_dependencies():
    """Step 2: Check Python dependencies"""
    print_step(2, 5, "PYTHON DEPENDENCIES")
    
    try:
        print("Checking required packages...")
        
        required_packages = [
            ("langchain", "langchain"),
            ("langchain_groq", "langchain-groq"),
            ("langchain_huggingface", "langchain-huggingface"),
            ("langchain_chroma", "langchain-chroma"),
            ("chromadb", "chromadb"),
            ("sentence_transformers", "sentence-transformers"),
        ]
        
        missing = []
        for package_name, install_name in required_packages:
            try:
                __import__(package_name)
                print(f"  ✅ {install_name}")
            except ImportError:
                print(f"  ❌ {install_name}")
                missing.append(install_name)
        
        if missing:
            print(f"\n❌ Missing packages: {', '.join(missing)}")
            print("\nInstall with:")
            print("   pip install -r requirements.txt")
            return False
        
        print("\n✅ All required packages installed")
        return True
        
    except Exception as e:
        print(f"❌ Dependency check failed: {e}")
        return False

def download_embedding_model():
    """Step 3: Download and cache embedding model"""
    print_step(3, 5, "EMBEDDING MODEL SETUP")
    
    try:
        from modules.embedding import get_embeddings_model, embed_query
        
        embedding_model = os.getenv("EMBEDDING_MODEL", "all-MiniLM-L6-v2")
        print(f"Loading embedding model: {embedding_model}")
        print("   (First run will download ~80-500MB depending on model)")
        print("   (Subsequent runs will use cached model)")
        
        # Initialize model (downloads if needed)
        embeddings = get_embeddings_model()
        print("✅ Embedding model loaded successfully")
        
        # Test the model
        print("\nTesting embedding generation...")
        test_text = "biosecurity for shrimp farming"
        test_embedding = embed_query(test_text)
        
        print(f"✅ Embedding test passed")
        print(f"   - Test query: '{test_text}'")
        print(f"   - Embedding dimensions: {len(test_embedding)}")
        print(f"   - Model ready for use")
        
        return True
        
    except Exception as e:
        print(f"❌ Embedding model setup failed: {e}")
        import traceback
        traceback.print_exc()
        return False

def check_pdfs():
    """Step 4a: Check PDF files"""
    print("\nChecking PDF knowledge base...")
    
    try:
        pdf_dir = os.path.join(os.path.dirname(__file__), "data", "pdfs")
        
        if not os.path.exists(pdf_dir):
            os.makedirs(pdf_dir, exist_ok=True)
            print(f"Created PDF directory: {pdf_dir}")
        
        pdf_files = [f for f in os.listdir(pdf_dir) if f.lower().endswith('.pdf')]
        
        if not pdf_files:
            print(f"❌ No PDF files found in {pdf_dir}")
            print("\nPlease add your knowledge base PDFs to:")
            print(f"   {pdf_dir}")
            print("\nRecommended naming: category_topic.pdf")
            print("   Example: biosecurity_pond_preparation.pdf")
            return False
        
        print(f"✅ Found {len(pdf_files)} PDF files:")
        total_size = 0
        for pdf in pdf_files:
            file_path = os.path.join(pdf_dir, pdf)
            file_size = os.path.getsize(file_path) / (1024 * 1024)  # MB
            total_size += file_size
            print(f"   - {pdf} ({file_size:.2f} MB)")
        
        print(f"   Total: {total_size:.2f} MB")
        return True
        
    except Exception as e:
        print(f"❌ PDF check failed: {e}")
        return False

def initialize_vector_database():
    """Step 4b: Initialize vector database"""
    print_step(4, 5, "VECTOR DATABASE INITIALIZATION")
    
    try:
        # Check PDFs first
        if not check_pdfs():
            return False
        
        print("\nInitializing vector database...")
        print("   This may take a few minutes depending on PDF size")
        
        from modules.rag_pipeline import initialize_or_load_vectordb
        
        # Check if DB already exists
        vectordb_dir = os.path.join(os.path.dirname(__file__), "data", "vectordb")
        db_exists = os.path.exists(vectordb_dir) and os.listdir(vectordb_dir)
        
        if db_exists:
            print("Vector database already exists")
            response = input("   Reinitialize? This will reprocess all PDFs (y/N): ")
            if response.lower() != 'y':
                print("✅ Using existing vector database")
                
                # Load and verify
                vector_db = initialize_or_load_vectordb()
                result = vector_db.get()
                doc_count = len(result['ids'])
                print(f"✅ Vector database loaded: {doc_count} document chunks")
                return True
            
            # Delete old DB
            import shutil
            shutil.rmtree(vectordb_dir)
            print("Removed old vector database")
        
        # Initialize new DB
        print("Processing PDFs and creating embeddings...")
        vector_db = initialize_or_load_vectordb()
        
        result = vector_db.get()
        doc_count = len(result['ids'])
        
        if doc_count == 0:
            print("❌ Vector database is empty!")
            return False
        
        print(f"✅ Vector database initialized successfully")
        print(f"   - Document chunks: {doc_count}")
        
        # Test similarity search
        print("\nTesting similarity search...")
        test_results = vector_db.similarity_search("biosecurity for shrimp farming", k=1)
        
        if test_results:
            print("✅ Similarity search working")
            print(f"   - Found relevant content from: {test_results[0].metadata.get('source', 'Unknown')}")
        
        return True
        
    except Exception as e:
        print(f"❌ Vector database initialization failed: {e}")
        import traceback
        traceback.print_exc()
        return False

def test_complete_pipeline():
    """Step 5: Test complete RAG pipeline"""
    print_step(5, 5, "RAG PIPELINE END-TO-END TEST")
    
    try:
        print("Running complete pipeline test...")
        
        from modules.rag_pipeline import query_farm_knowledge
        
        # Test query
        test_question = "What are the key biosecurity measures for shrimp farming?"
        print(f"\nTest query: '{test_question}'")
        
        print("Generating AI response...")
        answer = query_farm_knowledge(test_question)
        
        if not answer:
            print("❌ No response generated")
            return False
        
        print("\n✅ RAG Pipeline working successfully!")
        print("\nSample Response:")
        print("-" * 80)
        # Show first 300 characters of response
        display_answer = answer[:300] + "..." if len(answer) > 300 else answer
        print(display_answer)
        print("-" * 80)
        
        return True
        
    except Exception as e:
        print(f"❌ Pipeline test failed: {e}")
        import traceback
        traceback.print_exc()
        return False

def main():
    """Main initialization flow"""
    print_header("LikAI AI SERVICE INITIALIZER", "=")
    print("\nThis script will set up your AI service from scratch.")
    print("It will:")
    print("  1. Check environment configuration")
    print("  2. Verify Python dependencies")
    print("  3. Download embedding model")
    print("  4. Initialize vector database")
    print("  5. Test complete RAG pipeline")
    
    # Run all steps
    steps = [
        ("Environment", check_environment),
        ("Dependencies", check_dependencies),
        ("Embedding Model", download_embedding_model),
        ("Vector Database", initialize_vector_database),
        ("Pipeline Test", test_complete_pipeline),
    ]
    
    results = {}
    
    for step_name, step_func in steps:
        result = step_func()
        results[step_name] = result
        
        if not result:
            print(f"\n❌ {step_name} step failed. Cannot continue.")
            print("\nPlease fix the issues above and run this script again.")
            break
    
    # Print final summary
    print_header("INITIALIZATION SUMMARY", "=")
    
    passed = sum(1 for v in results.values() if v)
    total = len(results)
    
    for step_name, result in results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"  {status:10} {step_name}")
    
    print(f"\n{'='*80}")
    print(f"  Results: {passed}/{total} steps completed")
    
    if passed == total:
        print(f"\n  SUCCESS! AI Service is ready to use!")
        print(f"\n  Next steps:")
        print(f"     1. Start the API server:")
        print(f"        python app.py")
        print(f"\n     2. The API will be available at:")
        print(f"        http://localhost:8000")
        print(f"\n     3. Test endpoints:")
        print(f"        POST http://localhost:8000/process-assessment")
        print(f"        POST http://localhost:8000/chat")
        
        print(f"\n  Tips:")
        print(f"     - API docs: http://localhost:8000/docs")
        print(f"     - Run tests: python test_rag_pipeline.py")
        
        return 0
    else:
        print(f"\n  ❌ INITIALIZATION INCOMPLETE")
        print(f"\n  Please fix the issues above and run:")
        print(f"     python initialize.py")
        
        return 1
    
    print("="*80)

if __name__ == "__main__":
    sys.exit(main())

