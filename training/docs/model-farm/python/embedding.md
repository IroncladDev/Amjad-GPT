# Embedding

Embedding models are specialized machine learning models designed to map text into fixed-size vectors in a high-dimensional space. These vectors capture semantic meaning and relationships between words, allowing for various natural language processing tasks like text classification, clustering, and similarity analysis. Unlike Chat or Completion models, which generate text as output, embedding models primarily serve as a feature extraction mechanism to represent text in a format that other machine learning models can understand and process. They are commonly used for retrieval-augmented generation (RAG), in order to choose which bits of a large dataset should be included in the context for a completion or chat model.

This API is designed to be used across multiple providers, and certain parameters may work only with certain models or providers. Please consult the [embedding models page](../models/embedding_models.md) to find more details.

### Class: EmbeddingModel

#### Description

Handles predictions from an embedding model.

#### `__init__(self, model_name: str, **kwargs: Dict[str, Any])`

##### Description

Initializes an `EmbeddingModel` instance.

##### Parameters

- `model_name` (str): The name of the model.
- `**kwargs` (Dict[str, Any]): Additional keyword arguments.

---

#### Method: `embed(self, content: List[Dict[str, Any]], **kwargs) -> EmbeddingModelResponse`

##### Description

Makes a prediction based on the content and parameters.

##### Parameters

- `content` (List[Dict[str, Any]]): The list of content to embed.
- `**kwargs` (Dict[str, Any]): Additional keyword arguments.

##### Returns

- `EmbeddingModelResponse`: The response from the model.

---

#### Method: `async_embed(self, content: List[Dict[str, Any]], **kwargs: Dict[str, Any]) -> EmbeddingModelResponse`

##### Description

Makes an asynchronous embedding generation based on the content and parameters.

##### Parameters

- `content` (List[Dict[str, Any]]): The list of content to embed. For most models, the dictionary should contain the content to embed with the "content" key.
- `**kwargs` (Dict[str, Any]): Additional keyword arguments.

##### Returns

- `EmbeddingModelResponse`: The response from the model.

---

#### Method: `__build_request_payload(self, content: List[Dict[str, Any]], **kwargs: Dict[str, Any]) -> Dict[str, Any]`

##### Description

Builds the request payload.

##### Parameters

- `content` (List[Dict[str, Any]]): The list of content to embed. For most models, the dictionary should contain the content to embed with the "content" key.
- `**kwargs` (Dict[str, Any]): Additional keyword arguments.

##### Returns

- `Dict[str, Any]`: The request payload.

---

### Response

The `EmbeddingModelResponse` object is returned for both the syncronous and asyncronous methods. It has two main fields:

- `metadata` containing metadata information for the call like the token count, char count etc. This may change with future providers.
- `embeddings` is a list where the first item is a dictionary with the key values mapping to the embedding array

```python
print(response.model_dump())
>>> {
    "metadata": {
        "tokenCountMetadata": {
            "billableTokens": 0,
            "unbilledTokens": 0,
            "billableCharacters": 12,
            "unbilledCharacters": 0,
        }
    },
    "embeddings": [
        {
            "values": [
                0.010413173586130142,
                0.012456662021577358,
                0.0022182136308401823,
                0.049747664481401443,
                #... truncated
                -0.007193463854491711,
            ],
            "tokenCountMetadata": {
                "billableTokens": 0,
                "unbilledTokens": 4,
                "billableCharacters": 0,
                "unbilledCharacters": 0,
            },
            "truncated": False,
        }
    ],
}
```

### Examples

#### Syncronous
```python
from replit.ai.modelfarm import EmbeddingModel,  EmbeddingModelResponse

model = EmbeddingModel("textembedding-gecko")
embedding_input = [{"content": "Hello, world!"}]

# synchronous call
response: EmbeddingModelResponse = model.embed(embedding_input)
```

#### Asyncronous

```python
import asyncio
from replit.ai.modelfarm import EmbeddingModel,  EmbeddingModelResponse

async def main():
  model = EmbeddingModel("textembedding-gecko")
  embedding_input = [{"content": "Hello, world!"}]

  # asynchronous call
  response: EmbeddingModelResponse = await model.async_embed(embedding_input)
  print(response)

asyncio.run(main())
```
