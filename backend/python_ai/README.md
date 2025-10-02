# LikAI - Farm Assessment AI Backend

This Python service provides AI-powered recommendations for farm assessments using LangChain and Hugging Face. It implements a Retrieval-Augmented Generation (RAG) system that uses domain-specific PDFs to provide contextually relevant recommendations.

## Features

- 🧠 AI-powered analysis of farm assessment data
- 📄 RAG system using PDF documents as knowledge base
- 🔍 Vector search for relevant context retrieval
- 🔄 API integration with LikAI frontend and Motoko backend

## Setup

### Prerequisites

- Python 3.8+
- A Hugging Face API key (free tier available)
- PDF documents for domain knowledge

### Installation

1. **Clone the repository and navigate to this directory:**

```bash
cd backend/python_ai
```

2. **Create a virtual environment:**

```bash
python -m venv venv
```

3. **Activate the virtual environment:**

- Windows:

```bash
venv\Scripts\activate
```

- Linux/Mac:

```bash
source venv/bin/activate
```

4. **Install dependencies:**

```bash
pip install -r requirements.txt
```

5. **Create .env file:**

Copy `env.example` to `.env` and add your Hugging Face API key:

```bash
cp env.example .env
```

Then edit the `.env` file to include your Hugging Face API key.

### Adding Knowledge Base Documents

1. **Place your PDF documents in the `data/pdfs` directory**

- Follow the naming convention: `category_topic.pdf`
- Example: `biosecurity_pond_preparation.pdf`, `water_quality_management.pdf`

2. **Initialize the vector database:**

```bash
python initialize_vectordb.py
```

This will process all PDFs and create embeddings for the RAG system.

## Running the Service

Start the FastAPI server:

```bash
python -m uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at http://localhost:8000

### API Endpoints

- **POST /process-assessment**: Process farm assessment data and get AI recommendations
- **GET /health**: Health check endpoint

## Docker Deployment

Build and run with Docker:

```bash
docker build -t likai-ai-backend .
docker run -p 8000:8000 -e HUGGING_FACE_API_KEY=your_key_here likai-ai-backend
```

## Integration with Frontend

Update the farm assessment form's `handleSubmit` function to call this API:

```typescript
const handleSubmit = async () => {
  if (!validateCurrentStep()) return;

  setIsSubmitting(true);
  try {
    const response = await fetch("http://localhost:8000/process-assessment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) throw new Error("Failed to submit assessment");

    const data = await response.json();
    // Handle the AI-generated recommendations

    navigate("/plan");
  } catch (error) {
    console.error("Error submitting assessment:", error);
  } finally {
    setIsSubmitting(false);
  }
};
```

## Integration with Motoko Backend

For the Motoko backend to communicate with this service, use the HTTP outcalls feature in the `ai_bridge` canister.
