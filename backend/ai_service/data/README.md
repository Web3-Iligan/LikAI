# Knowledge Base PDFs

Place your aquaculture and biosecurity PDF documents in this folder. The system will process them and use them as context for generating farm assessment recommendations.

## Naming Convention

Name your PDF files following this format for better organization:

```
category_topic.pdf
```

For example:

- biosecurity_pond_preparation.pdf
- water_quality_management.pdf
- disease_prevention_vannamei.pdf

## Sample Documents

You should include PDFs that cover:

1. Shrimp farm biosecurity practices
2. Water quality management
3. Disease prevention protocols
4. Feed management guidelines
5. Farm setup best practices
6. Equipment sanitation procedures

## PDF Processing

When you run `python initialize_vectordb.py`, these PDFs will be:

1. Processed into text chunks
2. Embedded into vectors
3. Stored in the vector database
4. Used by the RAG system to generate contextual recommendations
