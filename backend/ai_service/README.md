# LikAI AI Backend - RAG Pipeline

AI-powered biosecurity recommendations for Filipino shrimp farmers using Retrieval-Augmented Generation (RAG).

---

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- Groq API key (free at https://console.groq.com/keys)

### Installation

```bash
# Navigate to directory
cd backend/python_ai

# Create virtual environment
python -m venv venv

# Activate (Git Bash)
source venv/Scripts/activate
# Or PowerShell: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Initialize vector database (first time only)
python initialize_vectordb.py
```

### Configuration

**Create `.env` file in `backend/python_ai/`:**

```env
# Groq API Configuration
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
EMBEDDING_MODEL=all-MiniLM-L6-v2
```

**Get your Groq API key:** https://console.groq.com/keys (free tier available)

---

## 🏗️ Architecture

### RAG Pipeline Flow
```
Farm Assessment → Query → Vector DB Search → Retrieve Context → 
LLM (Groq) → Structured Recommendations
```

### Components

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Document Loader** | PyPDF | Load GAqP manuals |
| **Embeddings** | SentenceTransformers | Convert text to vectors |
| **Vector DB** | ChromaDB | Store & search embeddings |
| **LLM** | Groq (Llama 3.2-3B) | Generate recommendations |
| **API** | FastAPI | REST endpoints |

---

## 📊 Data

### Knowledge Base (3 PDFs)
- `EM-Code-of-GAqP-Shrimp-and-Crab.pdf` (135 pages)
- `Explanatory-Manual-for-GAqP.pdf` (73 pages)
- `Shrimp-Roadmap.pdf` (427 pages)

**Total:** 1,235 document chunks in vector database (13.74 MB)

### Directory Structure
```
data/
├── pdfs/           # Source PDFs
├── vectordb/       # ChromaDB storage
└── processed/      # PDF tracking
```

---

## 🧪 Testing

### Run Complete Test Suite
```bash
python test_rag_pipeline.py
```

**Tests:**
1. ✅ PDF Loading & Chunking
2. ✅ Embedding Generation
3. ✅ Vector Database
4. ✅ LLM Connection (Groq)
5. ✅ End-to-End RAG Pipeline

---

## 🌐 API Server

### Start Server
```bash
# Make sure you're in the virtual environment
source venv/Scripts/activate  # Git Bash
# OR
.\venv\Scripts\activate       # PowerShell

# Start the server
python app.py
# Or: uvicorn app:app --host 0.0.0.0 --port 8000 --reload
```

**Server will run on:** http://localhost:8000

### Endpoints

**Health Check:**
```bash
GET http://localhost:8000/health
```

**Process Assessment:**
```bash
POST http://localhost:8000/process-assessment
Content-Type: application/json

{
  "farmName": "Test Farm",
  "location": "Pampanga",
  "primarySpecies": "Vannamei Shrimp",
  "farmType": "Semi-intensive",
  "farmSize": "5 hectares",
  "isNewFarmer": "New Farmer",
  "waterSource": ["Well Water"],
  "initialBudget": "₱50,000-100,000",
  "hasElectricity": "Yes",
  "topConcerns": ["Disease Prevention"]
}
```

**Response:**
```json
{
  "tasks": [
    {
      "title": "Implement Water Filtration System",
      "description": "...",
      "priority": "high",
      "category": "Water Management",
      "estimatedCost": "₱5,000-10,000",
      "timeframe": "Within 7 days",
      "adaptationReason": "..."
    }
  ]
}
```

---

## 🔧 Configuration

### Groq API

**Model:** `llama-3.1-8b-instant` (Production-Ready)
- Fast inference (<1 second)
- Excellent instruction following
- 131K context window
- Production-stable (won't be deprecated)

**Free Tier Limits:**
- 30 requests/minute
- 14,400 requests/day
- Sufficient for production MVP

**Alternative Models:**
- `llama-3.3-70b-versatile` - More capable (70B parameters)
- `openai/gpt-oss-120b` - Most powerful (120B parameters)

Change model in `modules/ai_models.py`:
```python
model="llama-3.3-70b-versatile"  # More powerful
```

### Embeddings

**Model:** `all-MiniLM-L6-v2`
- 384-dimensional vectors
- Runs locally (no API calls)
- Fast and accurate

---

## 🛠️ Development

### Project Structure
```
backend/python_ai/
├── app.py                      # FastAPI server
├── initialize_vectordb.py      # Vector DB setup
├── test_rag_pipeline.py        # Test suite
├── requirements.txt            # Dependencies
├── modules/
│   ├── ai_models.py           # LLM integration
│   ├── document_loader.py     # PDF processing
│   ├── embedding.py           # Vector embeddings
│   ├── rag_pipeline.py        # RAG orchestration
│   └── schemas.py             # Pydantic models
├── data/
│   ├── pdfs/                  # Source documents
│   ├── vectordb/              # ChromaDB
│   └── processed/             # Tracking
└── venv/                      # Virtual environment
```

### Adding New PDFs

1. Place PDF in `data/pdfs/`
2. Run: `python initialize_vectordb.py`
3. Vector DB automatically updates

---

## 🚨 Troubleshooting

### ImportError: No module named 'langchain_groq'
```bash
pip install langchain-groq
```

### GROQ_API_KEY not found
1. Create `.env` file in `backend/python_ai/`
2. Add: `GROQ_API_KEY=your_key`
3. Get key: https://console.groq.com/keys

### Vector database empty
```bash
python initialize_vectordb.py
```

### LLM timeout
- Free tier may be slow during peak hours
- Upgrade to Groq Pro for guaranteed speed

---

## 📈 Performance

| Metric | Value |
|--------|-------|
| **Vector Search** | <100ms |
| **LLM Inference** | 1-3 seconds |
| **Total Pipeline** | 2-5 seconds |
| **Database Size** | 13.74 MB |
| **Documents** | 1,235 chunks |

---

## 🔐 Security

- API key in `.env` (not committed to git)
- CORS configured in `app.py`
- Input validation via Pydantic
- Rate limiting on Groq side

---

## 📦 Dependencies

**Core:**
- `langchain>=0.3.0` - LLM framework
- `langchain-groq>=0.2.0` - Groq integration
- `langchain-chroma>=0.1.0` - Vector DB
- `chromadb>=0.5.0` - Vector storage

**AI/ML:**
- `sentence-transformers>=2.7.0` - Embeddings
- `numpy>=1.24.0` - Array operations

**API:**
- `fastapi>=0.115.0` - REST API
- `uvicorn>=0.30.0` - ASGI server

**Utilities:**
- `pypdf>=4.0.0` - PDF processing
- `pydantic>=2.7.0` - Data validation
- `python-dotenv>=1.0.0` - Environment vars

---

## 🌟 Use Cases

### 1. Farm Assessment
Generate personalized GAqP action plans based on farmer inputs and retrieved context from manuals.

### 2. AI Chatbot
Answer farmer questions using RAG to provide accurate, context-aware responses.

### 3. Compliance Checking
Verify farm practices against GAqP standards using document retrieval.

---

## 📚 Knowledge Base

All recommendations are grounded in official Philippine aquaculture standards:

- **GAqP Code** - Good Aquaculture Practices for Shrimp & Crab
- **GAqP Manual** - Implementation guidelines
- **Shrimp Roadmap** - Comprehensive farming guide

Documents are publicly available from BFAR (Bureau of Fisheries and Aquatic Resources).

---

## 🤝 Integration

### Frontend Integration

```typescript
// frontend/src/api/ai/index.ts
const response = await fetch('http://localhost:8000/process-assessment', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(assessmentData)
});

const { tasks } = await response.json();
```

### Environment Variables

**Development:**
```env
VITE_AI_API_URL=http://localhost:8000
```

**Production:**
```env
VITE_AI_API_URL=https://your-api-domain.com
```

---

## 📞 Support

For issues or questions:
- Review test output: `python test_rag_pipeline.py`
- Check Groq status: https://status.groq.com/
- API docs: http://localhost:8000/docs (when server running)

---

**Built with ❤️ for Filipino shrimp farmers**
