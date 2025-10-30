import os
import hashlib
from typing import List, Dict, Any
import json
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.documents import Document

# Define paths
PDF_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data", "pdfs")
PROCESSED_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data", "processed")

# Create directories if they don't exist
os.makedirs(PDF_DIR, exist_ok=True)
os.makedirs(PROCESSED_DIR, exist_ok=True)

def get_pdf_hash(filepath: str) -> str:
    """Generate a hash for a PDF file to track changes"""
    with open(filepath, "rb") as f:
        file_hash = hashlib.md5(f.read()).hexdigest()
    return file_hash

def get_pdf_files():
    """Get list of PDF files in the PDF directory"""
    if not os.path.exists(PDF_DIR):
        return []
    
    return [f for f in os.listdir(PDF_DIR) if f.lower().endswith('.pdf')]

def process_single_pdf(filename: str) -> List[Document]:
    """Process a single PDF file and return its chunks"""
    filepath = os.path.join(PDF_DIR, filename)
    if not os.path.exists(filepath):
        print(f"File not found: {filepath}")
        return []
    
    print(f"Loading PDF: {filename}")
    # Load PDF tracking data
    tracking_file = os.path.join(PROCESSED_DIR, "pdf_tracking.json")
    if os.path.exists(tracking_file):
        with open(tracking_file, "r") as f:
            tracking = json.load(f)
    else:
        tracking = {}
    
    file_hash = get_pdf_hash(filepath)
    
    # Force processing of the PDF regardless of tracking
    print(f"Extracting text from {filename}...")
    loader = PyPDFLoader(filepath)
    
    try:
        documents = loader.load()
        print(f"Extracted {len(documents)} pages from {filename}")
        
        if not documents:
            print(f"Warning: No text content found in {filename}")
            return []
            
        # Get metadata from filename (e.g., category_name.pdf)
        category = filename.split('_')[0] if '_' in filename else 'general'
        category = category.replace('.pdf', '')
        
        # Add metadata
        for doc in documents:
            doc.metadata["source"] = filename
            doc.metadata["category"] = category
        
        # Split into chunks
        print(f"Splitting {filename} into chunks...")
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200,
            separators=["\n\n", "\n", " ", ""]
        )
        document_chunks = text_splitter.split_documents(documents)
        print(f"Created {len(document_chunks)} chunks from {filename}")
        
        # Update tracking
        tracking[filepath] = file_hash
        with open(tracking_file, "w") as f:
            json.dump(tracking, f)
            
        return document_chunks
    
    except Exception as e:
        print(f"Error processing {filename}: {str(e)}")
        return []

def process_pdfs() -> List[Document]:
    """Process all PDFs in the PDF directory and chunk them"""
    all_chunks = []
    
    # Get list of PDF files
    pdf_files = get_pdf_files()
    
    for filename in pdf_files:
        chunks = process_single_pdf(filename)
        all_chunks.extend(chunks)
    
    return all_chunks

def save_processed_chunks(chunks: List[Dict[str, Any]], source: str):
    """Save processed chunks to disk"""
    filename = source.replace('.pdf', '')
    processed_file = os.path.join(PROCESSED_DIR, f"{filename}_chunks.json")
    with open(processed_file, "w") as f:
        json.dump(chunks, f)

if __name__ == "__main__":
    # Run this script directly to process PDFs
    chunks = process_pdfs()
    print(f"Processed {len(chunks)} chunks from PDFs")