"""
Script to initialize the vector database with PDF documents.
Run this script after placing your PDF documents in the data/pdfs directory.
"""

import os
import sys
from modules.rag_pipeline import initialize_or_load_vectordb

def main():
    print("Initializing vector database...")
    
    # Check if PDFs exist
    pdf_dir = os.path.join(os.path.dirname(__file__), "data", "pdfs")
    if not os.path.exists(pdf_dir):
        os.makedirs(pdf_dir, exist_ok=True)
        print(f"Created PDF directory at {pdf_dir}")
    
    pdf_files = [f for f in os.listdir(pdf_dir) if f.lower().endswith('.pdf')]
    
    if not pdf_files:
        print("\nWARNING: No PDF files found!")
        print(f"Please add PDF files to {pdf_dir} before running this script.")
        print("\nRecommended naming format: category_topic.pdf")
        print("Example: biosecurity_pond_preparation.pdf")
        return 1
    
    print(f"Found {len(pdf_files)} PDF files: {', '.join(pdf_files)}")
    
    try:
        # Initialize vector database
        vector_db = initialize_or_load_vectordb()
        print(f"\nSuccessfully created vector database with {len(vector_db.get()['ids'])} documents")
        print("\nYou can now run the API server with: python app.py")
        return 0
    except Exception as e:
        print(f"Error initializing vector database: {e}")
        return 1

if __name__ == "__main__":
    sys.exit(main())
