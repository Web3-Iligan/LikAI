"""
RAG Pipeline Test Suite
Tests the complete RAG pipeline functionality with realistic scenarios.
"""

import os
import sys
import unittest
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class TestEmbeddings(unittest.TestCase):
    """Test embedding model functionality"""
    
    @classmethod
    def setUpClass(cls):
        """Set up test fixtures"""
        from modules.embedding import get_embeddings_model
        cls.embeddings = get_embeddings_model()
    
    def test_embedding_generation(self):
        """Test that embeddings are generated correctly"""
        from modules.embedding import embed_query
        
        query = "What is biosecurity in shrimp farming?"
        embedding = embed_query(query)
        
        self.assertIsInstance(embedding, list)
        self.assertGreater(len(embedding), 0)
        self.assertEqual(len(embedding), 384)  # all-MiniLM-L6-v2 dimension
    
    def test_batch_embeddings(self):
        """Test batch embedding generation"""
        from modules.embedding import embed_texts
        
        texts = [
            "Pond preparation is essential",
            "Water quality monitoring",
            "Disease prevention"
        ]
        
        embeddings = embed_texts(texts)
        
        self.assertEqual(len(embeddings), 3)
        self.assertEqual(len(embeddings[0]), 384)
    
    def test_embedding_similarity(self):
        """Test that similar texts have higher similarity"""
        from modules.embedding import embed_query
        import numpy as np
        
        # Similar texts
        emb1 = np.array(embed_query("shrimp farming biosecurity"))
        emb2 = np.array(embed_query("biosecurity in shrimp culture"))
        
        # Different text
        emb3 = np.array(embed_query("weather forecast"))
        
        # Calculate cosine similarity
        def cosine_sim(a, b):
            return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))
        
        sim_similar = cosine_sim(emb1, emb2)
        sim_different = cosine_sim(emb1, emb3)
        
        self.assertGreater(sim_similar, sim_different)


class TestVectorDatabase(unittest.TestCase):
    """Test vector database functionality"""
    
    @classmethod
    def setUpClass(cls):
        """Set up test fixtures"""
        from modules.rag_pipeline import initialize_or_load_vectordb
        cls.vector_db = initialize_or_load_vectordb()
    
    def test_vector_db_exists(self):
        """Test that vector database is initialized"""
        self.assertIsNotNone(self.vector_db)
    
    def test_vector_db_has_documents(self):
        """Test that vector database contains documents"""
        result = self.vector_db.get()
        doc_count = len(result['ids'])
        
        self.assertGreater(doc_count, 0, "Vector database should contain documents")
    
    def test_similarity_search(self):
        """Test similarity search functionality"""
        query = "biosecurity measures for shrimp farming"
        results = self.vector_db.similarity_search(query, k=3)
        
        self.assertIsInstance(results, list)
        self.assertGreater(len(results), 0)
        
        # Check that results have content and metadata
        for doc in results:
            self.assertTrue(hasattr(doc, 'page_content'))
            self.assertTrue(hasattr(doc, 'metadata'))
            self.assertIn('source', doc.metadata)
    
    def test_search_relevance(self):
        """Test that search results are relevant to query"""
        query = "water quality management"
        results = self.vector_db.similarity_search(query, k=1)
        
        self.assertGreater(len(results), 0)
        
        # Content should contain relevant keywords
        content = results[0].page_content.lower()
        relevant_keywords = ['water', 'quality', 'pond', 'shrimp', 'farm', 'aquaculture']
        
        # At least one keyword should be present
        has_relevant_keyword = any(keyword in content for keyword in relevant_keywords)
        self.assertTrue(has_relevant_keyword, "Search result should be relevant to query")


class TestLLMConnection(unittest.TestCase):
    """Test LLM connection and response generation"""
    
    @classmethod
    def setUpClass(cls):
        """Set up test fixtures"""
        from modules.ai_models import get_llm
        cls.llm = get_llm()
    
    def test_llm_initialization(self):
        """Test that LLM initializes correctly"""
        self.assertIsNotNone(self.llm)
    
    def test_llm_simple_response(self):
        """Test simple LLM response"""
        prompt = "Say 'test successful' if you can read this."
        response = self.llm.invoke(prompt)
        
        response_text = response.content if hasattr(response, 'content') else str(response)
        
        self.assertIsInstance(response_text, str)
        self.assertGreater(len(response_text), 0)


class TestRAGPipeline(unittest.TestCase):
    """Test complete RAG pipeline"""
    
    def test_farm_knowledge_query(self):
        """Test farm knowledge query functionality"""
        from modules.rag_pipeline import query_farm_knowledge
        
        question = "What are biosecurity measures for shrimp farming?"
        answer = query_farm_knowledge(question)
        
        self.assertIsInstance(answer, str)
        self.assertGreater(len(answer), 50)
        
        # Answer should contain relevant keywords
        answer_lower = answer.lower()
        relevant_keywords = ['biosecurity', 'shrimp', 'farm', 'pond']
        has_keywords = any(keyword in answer_lower for keyword in relevant_keywords)
        self.assertTrue(has_keywords, "Answer should be relevant to question")
    
    def test_non_farm_query_rejection(self):
        """Test that non-farm queries are rejected appropriately"""
        from modules.rag_pipeline import query_farm_knowledge
        
        question = "What's the weather like today?"
        answer = query_farm_knowledge(question)
        
        # Should return a message indicating it's out of scope
        self.assertIn("shrimp farming", answer.lower())
        self.assertIn("specialized", answer.lower())
    
    def test_farm_assessment_processing(self):
        """Test complete farm assessment processing"""
        from modules.rag_pipeline import process_farm_assessment
        from modules.schemas import AssessmentData
        
        # Create test assessment
        test_data = AssessmentData(
            farmName="Test Farm",
            location="Pampanga",
            primarySpecies="Vannamei Shrimp",
            farmType="Semi-intensive",
            farmSize="2 hectares",
            isNewFarmer="New Farmer",
            waterSource=["Well Water"],
            initialBudget="₱50,000-100,000",
            hasElectricity="Yes",
            topConcerns=["Disease Prevention", "Water Quality"]
        )
        
        # Process assessment
        result = process_farm_assessment(test_data)
        
        # Verify result structure
        self.assertIsNotNone(result)
        self.assertTrue(hasattr(result, 'overallScore'))
        self.assertTrue(hasattr(result, 'overallStatus'))
        self.assertTrue(hasattr(result, 'categories'))
        self.assertTrue(hasattr(result, 'recommendations'))
        
        # Verify overall score is valid
        self.assertGreaterEqual(result.overallScore, 0)
        self.assertLessEqual(result.overallScore, 100)
        
        # Verify categories exist
        self.assertGreater(len(result.categories), 0)
        
        # Verify recommendations exist
        self.assertGreater(len(result.recommendations), 0)
        
        # Check recommendation structure
        rec = result.recommendations[0]
        self.assertTrue(hasattr(rec, 'title'))
        self.assertTrue(hasattr(rec, 'priority'))
        self.assertTrue(hasattr(rec, 'category'))
        self.assertIn(rec.priority, ['critical', 'high', 'medium', 'low'])


class TestDocumentProcessing(unittest.TestCase):
    """Test document processing functionality"""
    
    def test_pdf_files_exist(self):
        """Test that PDF files exist in the data directory"""
        from modules.document_loader import get_pdf_files, PDF_DIR
        
        self.assertTrue(os.path.exists(PDF_DIR))
        
        pdf_files = get_pdf_files()
        self.assertGreater(len(pdf_files), 0, "Should have at least one PDF file")
    
    def test_pdf_processing(self):
        """Test PDF processing functionality"""
        from modules.document_loader import get_pdf_files, process_single_pdf
        
        pdf_files = get_pdf_files()
        if not pdf_files:
            self.skipTest("No PDF files available")
        
        # Process first PDF
        chunks = process_single_pdf(pdf_files[0])
        
        self.assertIsInstance(chunks, list)
        self.assertGreater(len(chunks), 0)
        
        # Check chunk structure
        chunk = chunks[0]
        self.assertTrue(hasattr(chunk, 'page_content'))
        self.assertTrue(hasattr(chunk, 'metadata'))
        self.assertIn('source', chunk.metadata)


def run_tests():
    """Run all tests with detailed output"""
    print("\n" + "="*80)
    print("  RAG PIPELINE TEST SUITE")
    print("="*80)
    
    # Create test suite
    loader = unittest.TestLoader()
    suite = unittest.TestSuite()
    
    # Add test classes
    suite.addTests(loader.loadTestsFromTestCase(TestEmbeddings))
    suite.addTests(loader.loadTestsFromTestCase(TestVectorDatabase))
    suite.addTests(loader.loadTestsFromTestCase(TestLLMConnection))
    suite.addTests(loader.loadTestsFromTestCase(TestRAGPipeline))
    suite.addTests(loader.loadTestsFromTestCase(TestDocumentProcessing))
    
    # Run tests
    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(suite)
    
    # Print summary
    print("\n" + "="*80)
    print("  TEST SUMMARY")
    print("="*80)
    print(f"  Tests run: {result.testsRun}")
    print(f"  Successes: {result.testsRun - len(result.failures) - len(result.errors)}")
    print(f"  Failures: {len(result.failures)}")
    print(f"  Errors: {len(result.errors)}")
    
    if result.wasSuccessful():
        print("\n  ✅ ALL TESTS PASSED!")
        print("="*80)
        return 0
    else:
        print("\n  ❌ SOME TESTS FAILED")
        print("="*80)
        return 1


if __name__ == "__main__":
    exit_code = run_tests()
    sys.exit(exit_code)
