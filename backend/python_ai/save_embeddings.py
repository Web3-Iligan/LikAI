# backend/python_ai/save_embeddings.py
import os
import json
import numpy as np
import time
from modules.document_loader import get_pdf_files, process_single_pdf
from modules.embedding import embed_texts

class NumpyEncoder(json.JSONEncoder):
    """Custom encoder for numpy data types"""
    def default(self, obj):
        if isinstance(obj, (np.int_, np.intc, np.intp, np.int8,
                            np.int16, np.int32, np.int64, np.uint8,
                            np.uint16, np.uint32, np.uint64)):
            return int(obj)
        elif isinstance(obj, (np.float_, np.float16, np.float32, np.float64)):
            return float(obj)
        elif isinstance(obj, (np.ndarray,)):
            return obj.tolist()
        return json.JSONEncoder.default(self, obj)

def save_single_pdf_embeddings(pdf_filename):
    """Process a single PDF and save its embeddings"""
    print(f"Processing and embedding {pdf_filename}...")
    
    # Get document chunks from single PDF
    chunks = process_single_pdf(pdf_filename)
    if not chunks:
        print(f"No chunks found for {pdf_filename}! Check if the PDF has extractable text.")
        return None
    
    # Extract text content from chunks
    texts = [chunk.page_content for chunk in chunks]
    print(f"Extracted {len(texts)} text chunks from {pdf_filename}")
    
    # Generate embeddings
    print(f"Generating embeddings for {len(texts)} text chunks...")
    try:
        embeddings_list = embed_texts(texts)
        print(f"Successfully generated {len(embeddings_list)} embeddings")
    except Exception as e:
        print(f"Error generating embeddings: {str(e)}")
        return None
    
    # Prepare data for saving
    embeddings_data = []
    for i, (chunk, embedding) in enumerate(zip(chunks, embeddings_list)):
        metadata = chunk.metadata.copy()
        embeddings_data.append({
            "id": i,
            "text": chunk.page_content,
            "metadata": metadata,
            "embedding": embedding  # Vector representation
        })
    
    # Create directory for embeddings files
    embeddings_dir = os.path.join(os.path.dirname(__file__), "data", "embeddings")
    os.makedirs(embeddings_dir, exist_ok=True)
    
    # Save embeddings as a JSON file
    pdf_name = pdf_filename.replace('.pdf', '')
    embeddings_file = os.path.join(embeddings_dir, f"{pdf_name}_embeddings.json")
    with open(embeddings_file, "w") as f:
        json.dump(embeddings_data, f, indent=2, cls=NumpyEncoder)
    
    print(f"Saved {len(embeddings_data)} embeddings to {embeddings_file}")
    return embeddings_file

def save_embeddings_to_file():
    """Process all PDFs one by one, create embeddings, and save them to viewable files"""
    print("Starting PDF processing and embedding...")
    
    # Get list of PDF files
    pdf_files = get_pdf_files()
    
    if not pdf_files:
        print("No PDF files found! Please add PDFs to data/pdfs/ directory")
        return
    
    print(f"Found {len(pdf_files)} PDF files: {', '.join(pdf_files)}")
    
    # Process each PDF one by one
    processed_files = []
    for pdf_file in pdf_files:
        try:
            print(f"\n{'='*50}")
            print(f"Processing PDF {pdf_files.index(pdf_file) + 1}/{len(pdf_files)}: {pdf_file}")
            print(f"{'='*50}")
            
            # Process with a small delay between files to avoid rate limiting
            embeddings_file = save_single_pdf_embeddings(pdf_file)
            if embeddings_file:
                processed_files.append(embeddings_file)
            
            # Small delay between processing files
            time.sleep(1)
        except Exception as e:
            print(f"Error processing {pdf_file}: {e}")
    
    # Initialize vector database if needed
    if processed_files:
        try:
            print("\nInitializing vector database...")
            from modules.rag_pipeline import initialize_or_load_vectordb
            vector_db = initialize_or_load_vectordb()
            print(f"Vector database initialized with {len(vector_db.get()['ids'])} documents")
        except Exception as e:
            print(f"Error initializing vector database: {e}")
    
    return processed_files

if __name__ == "__main__":
    processed_files = save_embeddings_to_file()
    if processed_files:
        print(f"\nProcess complete. Processed {len(processed_files)} PDF files:")
        for file in processed_files:
            print(f" - {os.path.basename(file)}")
    else:
        print("\nNo files were processed successfully.")