# Embedding Models

Embedding models are specialized machine learning models designed to map text into fixed-size vectors in a high-dimensional space. These vectors capture semantic meaning and relationships between words, allowing for various natural language processing tasks like text classification, clustering, and similarity analysis. Unlike Chat or Completion models, which generate text as output, embedding models primarily serve as a feature extraction mechanism to represent text in a format that other machine learning models can understand and process. They are commonly used for retrieval-augmented generation (RAG), in order to choose which bits of a large dataset should be included in the context for a completion or chat model.

## Google

### textembedding-gecko

#### Parameters

| Parameter Name  | Streaming Supported | Type             | Description                                                                                                                                                                                                                                         |
|-----------------|---------------------|------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| content         | True                | \[{content: str}\] | An array of text content to be embedded |