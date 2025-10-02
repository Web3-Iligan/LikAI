"""
Utility script to check if PDFs contain extractable text.
Run this script to verify if your PDFs can be properly processed.
"""

import os
import sys
from pypdf import PdfReader

def check_pdf_text(pdf_path):
    """Check if a PDF contains extractable text"""
    print(f"Checking PDF: {os.path.basename(pdf_path)}")
    
    try:
        # Open the PDF
        reader = PdfReader(pdf_path)
        text_found = False
        total_text_length = 0
        
        # Check each page for text
        for i, page in enumerate(reader.pages):
            text = page.extract_text()
            text_length = len(text) if text else 0
            total_text_length += text_length
            
            if text_length > 0:
                text_found = True
                print(f"  Page {i+1}: {text_length} characters")
                # Print a sample of the text
                sample = text[:100] + "..." if len(text) > 100 else text
                print(f"  Sample: {sample}")
                break  # Just show the first page with text
        
        if text_found:
            print(f"✓ Success! PDF contains approximately {total_text_length} characters of extractable text.")
            return True
        else:
            print(f"✗ Failed! No extractable text found in the PDF. This may be an image-based PDF.")
            print("  Solution: Use OCR software to convert the PDF to text before processing.")
            return False
            
    except Exception as e:
        print(f"✗ Error reading PDF: {e}")
        return False

def main():
    """Check all PDFs in the data/pdfs directory"""
    # Define path to PDF directory
    pdf_dir = os.path.join(os.path.dirname(__file__), "data", "pdfs")
    
    if not os.path.exists(pdf_dir):
        print(f"PDF directory not found: {pdf_dir}")
        return 1
    
    # Get list of PDFs
    pdf_files = [f for f in os.listdir(pdf_dir) if f.lower().endswith('.pdf')]
    
    if not pdf_files:
        print("No PDF files found!")
        return 1
    
    print(f"Found {len(pdf_files)} PDF files.")
    
    # Check each PDF
    results = []
    for pdf_file in pdf_files:
        pdf_path = os.path.join(pdf_dir, pdf_file)
        print(f"\n{'='*50}")
        result = check_pdf_text(pdf_path)
        results.append((pdf_file, result))
    
    # Print summary
    print(f"\n{'='*50}")
    print("SUMMARY:")
    success_count = sum(1 for _, result in results if result)
    print(f"{success_count}/{len(results)} PDFs contain extractable text:")
    
    for pdf_file, result in results:
        status = "✓" if result else "✗"
        print(f"{status} {pdf_file}")
    
    if success_count < len(results):
        print("\nSome PDFs do not have extractable text. Consider:")
        print("1. Using OCR software to convert these PDFs to text-based PDFs")
        print("2. Finding alternative text-based versions of these documents")
    
    return 0

if __name__ == "__main__":
    sys.exit(main())

