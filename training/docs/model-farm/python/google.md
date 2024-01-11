# Google Provider API

The `replit-ai` package provides a shim for the Google Vertex AI SDK libraries that allows for swapping to and from the original libraries by simply changing the imports at the top of the code. Both the input parameters and responses from these APIs are intended to be 100% compatible.

To move from the Vertex AI SDK, remove all initialization code, and replace all `vertexai` imports with `replit.ai.modelfarm.google`.

Before:
```python
# From 
import vertexai
from vertexai.language_models import TextGenerationModel

vertexai.init(project=project_id, location=location)

parameters = {
  "temperature": 0.2,
  "max_output_tokens": 256,
  "top_p": 0.8,
  "top_k": 40,
}

model = TextGenerationModel.from_pretrained("text-bison@001")
response = model.predict(
  "Give me ten interview questions for the role of program manager.",
  **parameters,
)
print(f"Response from Model: {response.text}")
```

After:
```python
from replit.ai.modelfarm.google.language_models import TextGenerationModel

parameters = {
  "temperature": 0.2,
  "max_output_tokens": 256,
  "top_p": 0.8,
  "top_k": 40,
}

model = TextGenerationModel.from_pretrained("text-bison@001")
response = model.predict(
  "Give me ten interview questions for the role of program manager.",
  **parameters,
)
print(f"Response from Model: {response.text}")
```

Note that the Replit-provided Google-specific APIs support both synchronous and asynchronous operations, the latter facilitated through the asyncio library.

## Chat

Please refer to the Google Vertex AI documentation for chat [here](https://cloud.google.com/vertex-ai/docs/generative-ai/model-reference/text-chat). 

### Examples

**Synchronous Usage**

```python
from replit.ai.modelfarm.google.preview.language_models import ChatModel, InputOutputTextPair, ChatSession, ChatMessage, TextGenerationResponse

chat_model = ChatModel.from_pretrained("chat-bison@001")

chat: ChatSession = chat_model.start_chat(
  context="My name is Miles. You are an astronomer, knowledgeable about the solar system.",
  examples=[
    InputOutputTextPair(
      input_text="How many moons does Mars have?",
      output_text="The planet Mars has two moons, Phobos and Deimos.",
    ),
  ]
)

# synchronous, non-streamed response
response: TextGenerationResponse = chat.send_message(
  "How many planets are there in the solar system?",
  temperature=0.2,
  max_output_tokens=256,
  top_p=0.95,
  top_k=40
)

# synchronous, streamed response
responses = chat.send_message_stream(
  "Tell me something about each planet in the Solar System: ",
  temperature=0.2,
  max_output_tokens=1024,
  top_p=0.95,
  top_k=40
)

for response in responses:
  print(response)

# chat has a message_history, which is a list of ChatMessage objects based on the session's state
chat_history: list[ChatMessage] = chat.message_history
```

**Asynchronous Usage**

```python
import asyncio
from replit.ai.modelfarm.google.preview.language_models import ChatModel, InputOutputTextPair, ChatSession, ChatMessage, TextGenerationResponse


async def main():
  chat_model = ChatModel.from_pretrained("chat-bison@001")

  chat: ChatSession = chat_model.start_chat(
    context="My name is Miles. You are an astronomer, knowledgeable about the solar system.",
    examples=[
      InputOutputTextPair(
        input_text="How many moons does Mars have?",
        output_text="The planet Mars has two moons, Phobos and Deimos.",
        ),
    ]
  )

  # asynchronous, non-streaming call
  response: TextGenerationResponse = await chat.async_send_message(
    "How many planets are there in the solar system?",
    temperature=0.2,
    max_output_tokens=1024,
    top_p=0.95,
    top_k=40
  )

  # asynchronous streaming call
  responses = chat.async_send_message_stream(
    "Tell me something about each planet.",
    temperature=0.2,
    max_output_tokens=1024,
    top_p=0.95,
    top_k=40
  )

  async for async_response in responses:
    print(async_response)

asyncio.run(main())
```

## Embedding

Please refer to the Google Vertex AI documentation for embeddings [here](https://cloud.google.com/vertex-ai/docs/generative-ai/model-reference/text-embeddings). 

### Examples

**Synchronous Usage**

```python
from replit.ai.modelfarm.google.language_models import TextEmbeddingModel, TextEmbedding

model = TextEmbeddingModel("textembedding-gecko")

# synchronous call
response: list[TextEmbedding] = model.get_embeddings(["Hello, world!"])

# TextEmbedding has two keys: statistics and values
print(response[0].statistics)
print(response[0].values)
```

The `TextEmbedding` object like the following:

```python
>>> print(response[0].__dict__)
{
    "statistics": TextEmbeddingStatistics(token_count=4, truncated=False),
    "values": [
        0.010413173586130142,
        0.012456662021577358,
        # .. truncated
        -0.048689305782318115,
        -0.007193463854491711,
    ],
}
```

**Asynchronous Usage**

```python
import asyncio
from replit.ai.modelfarm.google.language_models import TextEmbeddingModel, TextEmbedding

async def main():
  model = TextEmbeddingModel("textembedding-gecko")

  # asynchronous call
  response: list[TextEmbedding] = await model.async_get_embeddings(
      ["Hello, world!"])
  print(response)

asyncio.run(main())
```

## Completion
Please refer to the Google Vertex AI documentation for completion [here](https://cloud.google.com/vertex-ai/docs/generative-ai/model-reference/text). 

### Examples

**Synchronous Usage**

```python
from replit.ai.modelfarm.google.language_models import TextGenerationModel, TextGenerationResponse

model: TextGenerationModel = TextGenerationModel.from_pretrained(
  "text-bison@001")

response: TextGenerationResponse = model.predict(
  "Give me ten interview questions for the role of program manager.",
  temperature=0.8,
  top_p=0.8,
  top_k=40,
  max_output_tokens=256)
print(response)

# synchronous streaming
responses = model.predict_streaming(
    prompt=
    "Give me ten interview questions for the role of a software engineer.")

for response in responses:
  print(response)
```

The `TextGenerationResponse` looks like the following:

```python
>>> print(response.model_dump())
{
    "is_blocked": False,
    "raw_prediction_response": {
        "content": "1. What is your experience with project management?\n2. What is your process for managing a project?\n3. How do you handle unexpected challenges or roadblocks?\n4. How do you communicate with stakeholders and keep them updated on the progress of the project?\n5. What are your strengths and weaknesses as a project manager?\n6. What are your salary expectations?\n7. What are your career goals?\n8. Why are you interested in this position?\n9. What do you know about our company?\n10. What questions do you have for me?",
        "metadata": {
            "safetyAttributes": {
                "blocked": False,
                "categories": ["Finance"],
                "scores": [0.1],
            },
            "citationMetadata": {"citations": []},
        },
    },
    "safety_attributes": {"Finance": 0.1},
    "text": "1. What is your experience with project management?\n2. What is your process for managing a project?\n3. How do you handle unexpected challenges or roadblocks?\n4. How do you communicate with stakeholders and keep them updated on the progress of the project?\n5. What are your strengths and weaknesses as a project manager?\n6. What are your salary expectations?\n7. What are your career goals?\n8. Why are you interested in this position?\n9. What do you know about our company?\n10. What questions do you have for me?",
}

```

**Asynchronous Usage**

```python
import asyncio
from replit.ai.modelfarm.google.language_models import TextGenerationModel, TextGenerationResponse

async def main():
  model: TextGenerationModel = TextGenerationModel.from_pretrained(
      "text-bison@001")

  response: TextGenerationResponse = model.predict(
      "Give me ten interview questions for the role of program manager.",
      temperature=0.8,
      top_p=0.8,
      top_k=40,
      max_output_tokens=256)
  print(response.model_dump())

  # asynchronous, non-streaming call
  response: TextGenerationResponse = await model.async_predict(
      "How many planets are there in the solar system?",
      temperature=0.2,
      max_output_tokens=1024,
      top_p=0.95,
      top_k=40)

  # asynchronous streaming call
  responses = model.async_predict_streaming(
      "How many planets are there in the solar system?",
      temperature=0.2,
      max_output_tokens=1024,
      top_p=0.95,
      top_k=40)

  async for async_response in responses:
    # each response is a ChatModelResponse
    print(async_response)

asyncio.run(main())
```
