# ModelFarm Python

## Installation

ModelFarm is available via the `replit-ai` package in PyPI.

If you're using `poetry`, the default package manager for Python in Replit you can install it with:

```
poetry add replit-ai
poetry install
```

If you are using pip then install it with:

```
pip install replit-ai
```

## Overview

There are two ways of interacting with the ModelFarm APIs. Both are included in the `replit-ai` package.

1.  **Replit API**: The Replit API is our most powerful APIs, and allows for easily moving between all providers, and all models with a standard interface. It supports all features provided by the underlying models.
2.  **Model Provider Specific APIs.**: These APIs allow for easily swapping between using a model via ModelFarm, and using a model provider's libraries by changing an import. These APIs may not support all available options.

## Quick Start

### Completion

```python
from replit.ai.modelfarm import CompletionModel

model = CompletionModel("text-bison")
response = model.complete(["Write a tweet about the meaning of life: "], temperature=0.2)

print(response.responses[0].choices[0].content)
>>> 'The meaning of life is to find your gift. The purpose of life is to give it away.'
```

### Chat

```python
from replit.ai.modelfarm import ChatModel, ChatSession, ChatExample, ChatMessage

model = ChatModel("chat-bison")
response = model.chat([
  ChatSession(
    context="You are philosphy bot.",
    examples=[
      ChatExample(
        input=ChatMessage(content="1 + 1"),
        output=ChatMessage(content="2")
      )
    ],
    messages=[
      ChatMessage(author="USER", content="How much wood can a woodchuck chuck?"),
    ],
  )
], temperature=0.2)

print(response.responses[0].candidates[0].message.content)
>>> 'A woodchuck can chuck as much wood as a woodchuck can chuck if a woodchuck could chuck wood.'
```

### Embedding

```python
from replit.ai.modelfarm import EmbedModel, EmbeddingModelResponse

model = EmbeddingModel("textembedding-gecko")
response = model.embed([{"content": "Hello, world!"}])

print(response)
>>> [TextEmbedding(statistics=TextEmbeddingStatistics(token_count=4, truncated=False), values=[0.010562753304839134, ...])]
```
