#!/usr/bin/env python
"""
Quick Integration Check
Verifies that the RAG pipeline is ready for farm assessment
"""

import os
import sys

def check_env():
    """Check if environment is configured"""
    print("🔍 Checking Environment Configuration...")
    
    from dotenv import load_dotenv
    load_dotenv()
    
    groq_key = os.getenv("GROQ_API_KEY")
    if not groq_key:
        print("❌ GROQ_API_KEY not found in .env")
        print("   Get one at: https://console.groq.com/keys")
        return False
    
    print(f"✅ GROQ_API_KEY found: {groq_key[:8]}...{groq_key[-4:]}")
    return True

def check_vectordb():
    """Check if vector database exists"""
    print("\n🔍 Checking Vector Database...")
    
    vectordb_path = os.path.join("data", "vectordb", "chroma.sqlite3")
    if not os.path.exists(vectordb_path):
        print("❌ Vector database not found")
        print("   Run: python initialize_vectordb.py")
        return False
    
    db_size = os.path.getsize(vectordb_path) / (1024 * 1024)
    print(f"✅ Vector database found: {db_size:.2f} MB")
    return True

def check_pdfs():
    """Check if PDFs are available"""
    print("\n🔍 Checking PDF Knowledge Base...")
    
    pdf_dir = os.path.join("data", "pdfs")
    if not os.path.exists(pdf_dir):
        print("❌ PDF directory not found")
        return False
    
    pdfs = [f for f in os.listdir(pdf_dir) if f.endswith('.pdf')]
    if not pdfs:
        print("❌ No PDF files found")
        return False
    
    print(f"✅ Found {len(pdfs)} PDF files:")
    for pdf in pdfs:
        print(f"   - {pdf}")
    return True

def check_modules():
    """Check if all required modules can be imported"""
    print("\n🔍 Checking Python Modules...")
    
    try:
        from modules.rag_pipeline import process_farm_assessment
        from modules.ai_models import get_llm
        from modules.embedding import get_embeddings_model
        from modules.schemas import AssessmentData, AIRecommendation
        print("✅ All modules imported successfully")
        return True
    except ImportError as e:
        print(f"❌ Module import failed: {e}")
        print("   Run: pip install -r requirements.txt")
        return False

def main():
    print("=" * 60)
    print("RAG PIPELINE INTEGRATION CHECK")
    print("=" * 60)
    
    checks = {
        "Environment": check_env(),
        "PDF Files": check_pdfs(),
        "Vector Database": check_vectordb(),
        "Python Modules": check_modules(),
    }
    
    print("\n" + "=" * 60)
    print("SUMMARY")
    print("=" * 60)
    
    for name, status in checks.items():
        icon = "✅" if status else "❌"
        print(f"{icon} {name}")
    
    all_passed = all(checks.values())
    
    if all_passed:
        print("\n✅ ALL CHECKS PASSED!")
        print("\nYour RAG pipeline is ready for farm assessment.")
        print("\nTo start the API server:")
        print("  python app.py")
        print("\nThe farm assessment form will use this backend at:")
        print("  http://localhost:8000/process-assessment")
        return 0
    else:
        print("\n❌ SOME CHECKS FAILED")
        print("\nPlease fix the issues above before using the farm assessment.")
        
        if not checks["Environment"]:
            print("\n1. Create .env file with GROQ_API_KEY")
        if not checks["Vector Database"]:
            print("2. Run: python initialize_vectordb.py")
        if not checks["Python Modules"]:
            print("3. Run: pip install -r requirements.txt")
        
        return 1

if __name__ == "__main__":
    sys.exit(main())


