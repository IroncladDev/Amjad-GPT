# Chat

Chat models are specialized versions of large language models designed to handle conversational contexts. They excel at generating human-like responses in interactive dialogue and maintaining context throughout a conversation, making them ideal for tasks like customer support, virtual assistance, and interactive applications. In contrast, Completion models are more suited for single-turn tasks that don't require maintaining a conversational history, such as text summarization, translation, or code generation. While both types of models can generate text based on the input they receive, Chat models are optimized for multi-turn dialogue and often exhibit a better understanding of nuanced conversational cues compared to their Completion counterparts.

This API is designed to be used across multiple providers, and certain parameters may work only with certain models or providers. Please consult the [chat models page](../models/chat_models.md) to find more details.

### Structured Input For ChatModel

The input for a `ChatModel` is created using certain typed objects. We create a `ChatSession` object using a list of `ChatExample` objects and a list of `ChatMessage` objects. See the type definition code blocks below.

**ChatSession**

The main input type for a chat session that is used with `ChatModel`. It is built using the input context, a list of `ChatExample` and a list of `ChatMessage` types.

```python
class ChatSession(BaseModel):
  context: str
  examples: List[ChatExample]
  messages: List[ChatMessage]
```

**ChatExample**

ChatExample represents a single to and from interaction in a chat session that the model can use as an example.

```python
class ChatExample(BaseModel):
  input: ChatMessage
  output: ChatMessage
```

**ChatMessage**

ChatMessage represents a single message in a chat session.

```python
class ChatMessage(BaseModel):
  content: str
  author: str = ""
```

### ChatModel

The main class to help use a chat model from ModelFarm in a provider agnostic way.

---

`__init__(self, model_name: str, \*\*kwargs: Dict[str, Any])`

Initializes a ChatModel instance.

- **Arguments**
  - `model_name (str)`: The name of the model to be used.
  - `**kwargs (Dict[str, Any])`: Additional keyword arguments.
- **Returns**
  - None

---

`chat(self, prompts: List[ChatSession], max_output_tokens: int = 1024, temperature: float = 0.2, **kwargs) -> ChatModelResponse`

Makes a synchronous chat generation based on the prompts and parameters.

- **Arguments**
  - `prompts (List[ChatSession])`: A list of `ChatSession` objects representing the chat prompts.
  - `max_output_tokens (int)`: The maximum number of output tokens. Default is 1024.
  - `temperature (float)`: The temperature to control the randomness of the output. Default is 0.2.
  - `**kwargs`: Additional keyword arguments.
- **Returns**
  - `ChatModelResponse`: An object containing the model's response.

---

`async_chat(self, prompts: List[ChatSession], max_output_tokens: int = 1024, temperature: float = 0.2, **kwargs) -> ChatModelResponse`

Makes an asynchronous chat generation based on the prompts and parameters.

- **Arguments**
  - `prompts (List[ChatSession])`: A list of `ChatSession` objects representing the chat prompts.
  - `max_output_tokens (int)`: The maximum number of output tokens. Default is 1024.
  - `temperature (float)`: The temperature to control the randomness of the output. Default is 0.2.
  - `**kwargs`: Additional keyword arguments.
- **Returns**
  - `ChatModelResponse`: An object containing the model's response.

---

`stream_chat(self, prompts: List[ChatSession], max_output_tokens: int = 1024, temperature: float = 0.2, **kwargs) -> Iterator[ChatModelResponse]`

Streams chat generations based on the prompts and parameters. The method returns an iterator of model responses.

- **Arguments**
  - `prompts (List[ChatSession])`: A list of `ChatSession` objects representing the chat prompts.
  - `max_output_tokens (int)`: The maximum number of output tokens. Default is 1024.
  - `temperature (float)`: The temperature to control the randomness of the output. Default is 0.2.
  - `**kwargs`: Additional keyword arguments.
- **Returns**
  - `Iterator[ChatModelResponse]`: An iterator that yields `ChatModelResponse` objects.

---

`async_stream_chat(self, prompts: List[ChatSession], max_output_tokens: int = 1024, temperature: float = 0.2, **kwargs) -> Iterator[ChatModelResponse]`

Streams asynchronous chat generations based on the prompts and parameters. The method returns an asynchronous iterator of model responses.

- **Arguments**
  - `prompts (List[ChatSession])`: A list of `ChatSession` objects representing the chat prompts.
  - `max_output_tokens (int)`: The maximum number of output tokens. Default is 1024.
  - `temperature (float)`: The temperature to control the randomness of the output. Default is 0.2.
  - `**kwargs`: Additional keyword arguments.
- **Returns**
  - `Iterator[ChatModelResponse]`: An asynchronous iterator that yields `ChatModelResponse` objects.

### Response Format
All four apis return the same `ChatModelResponse` response type, with the stream APIs returning a generator of them.

The resultant `ChatModelResponse` has two main fields:

- `metadata` containing metadata information for the call like the token count, char count etc. The value of this field is provider specific and will change with future providers.
- `responses ` containing the response candidates, where each candidate has the response message with its content,  and additional metadata on the response provided the specific model used.

```python
>>> print(response.model_dump())
{
    "metadata": {
        "inputTokenCount": {
            "billableTokens": 0,
            "unbilledTokens": 19,
            "billableCharacters": 46,
            "unbilledCharacters": 0,
        },
        "outputTokenCount": {
            "billableTokens": 0,
            "unbilledTokens": 50,
            "billableCharacters": 220,
            "unbilledCharacters": 0,
        },
    },
    "responses": [
        {
            "candidates": [
                {
                    "message": {
                        "content": " The meaning of life is a deep question that has been pondered by philosophers, theologians, and artists for centuries. There is no one answer that is universally agreed upon, but some common themes that emerge include:\n\n* Finding happiness and fulfillment in one'",
                        "author": "1",
                    },
                    "metadata": {
                        "safetyAttributes": {
                            "blocked": False,
                            "categories": ["Health", "Religion & Belief"],
                            "scores": [0.1, 0.6],
                        },
                        "citationMetadata": {"citations": []},
                    },
                }
            ]
        }
    ],
}
```

## Examples

#### Synchronous

```python
from replit.ai.modelfarm import ChatModel, ChatSession, ChatExample, ChatMessage, ChatModelResponse

model: ChatModel = ChatModel('chat-bison')

# build chat session with context, examples and messages
chat_session: ChatSession = ChatSession(
    context="You are philosophy bot.",
    examples=[
        ChatExample(input=ChatMessage(content="1 + 1"),
                    output=ChatMessage(content="2"))
    ],
    messages=[
        ChatMessage(author="USER", content="What is the meaning of life?"),
    ])

# synchronous, non-streaming call
response: ChatModelResponse = model.chat([chat_session], max_output_tokens=50)
```


#### Synchronous - Streaming

```python
from replit.ai.modelfarm import ChatModel, ChatSession, ChatExample, ChatMessage, ChatModelResponse

model: ChatModel = ChatModel('chat-bison')

# build chat session with context, examples and messages
chat_session: ChatSession = ChatSession(
    context="You are philosophy bot.",
    examples=[
        ChatExample(input=ChatMessage(content="1 + 1"),
                    output=ChatMessage(content="2"))
    ],
    messages=[
        ChatMessage(author="USER", content="What is the meaning of life?"),
    ])

responses = model.stream_chat([chat_session])
for response in responses:
  print(response)
```

#### Asynchronous

```python
import asyncio
from replit.ai.modelfarm import ChatModel, ChatSession, ChatExample, ChatMessage, ChatModelResponse

async def main():
  model: ChatModel = ChatModel('chat-bison')

  # build chat session with context, examples and messages
  chat_session: ChatSession = ChatSession(
      context="You are philosphy bot.",
      examples=[
          ChatExample(input=ChatMessage(content="1 + 1"),
                      output=ChatMessage(content="2"))
      ],
      messages=[
          ChatMessage(author="USER", content="What is the meaning of life?"),
      ])

  # asynchronous non-streaming call
  responses = await model.async_chat([chat_session])
  for response in responses:
    print(response)


asyncio.run(main())
```

#### Asynchronous - Streaming

```python
import asyncio
from replit.ai.modelfarm import ChatModel, ChatSession, ChatExample, ChatMessage, ChatModelResponse

async def main():
  model: ChatModel = ChatModel('chat-bison')

  # build chat session with context, examples and messages
  chat_session: ChatSession = ChatSession(
      context="You are philosphy bot.",
      examples=[
          ChatExample(input=ChatMessage(content="1 + 1"),
                      output=ChatMessage(content="2"))
      ],
      messages=[
          ChatMessage(author="USER", content="What is the meaning of life?"),
      ])

  # asynchronous streaming call
  responses = model.async_stream_chat([chat_session])

  async for async_response in responses:
    # each response is a ChatModelResponse
    print(async_response)

asyncio.run(main())
```
