import os
from typing import List, Dict, Any
from dotenv import load_dotenv
from langchain_huggingface import HuggingFaceEmbeddings

load_dotenv()

# Define embedding model
MODEL_NAME = os.getenv("EMBEDDING_MODEL", "all-MiniLM-L6-v2")

def get_embeddings_model():
    """Get the embeddings model using SentenceTransformers (local model)"""
    return HuggingFaceEmbeddings(model_name=MODEL_NAME)

def embed_texts(texts: List[str]) -> List[List[float]]:
    """Embed a list of texts"""
    embeddings = get_embeddings_model()
    return embeddings.embed_documents(texts)

def embed_query(query: str) -> List[float]:
    """Embed a single query"""
    embeddings = get_embeddings_model()
    return embeddings.embed_query(query)