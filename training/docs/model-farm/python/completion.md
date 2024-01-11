# Completion

Completion models are designed for single-turn tasks that require generating text based on a given prompt but don't necessitate maintaining a conversational history. These models excel in applications like text summarization, code generation, and translation, where the focus is on generating accurate and relevant content in one go, rather than engaging in back-and-forth dialogue. In contrast, Chat models are optimized for interactive, multi-turn conversations, and they are better at understanding and generating nuanced responses within a conversational context. While both types of models are capable of generating text, Completion models are generally more suited for tasks that don't require the complexities of conversational state and context.

This API is designed to be used across multiple providers, and certain parameters may work only with certain models or providers. Please consult the [completion models page](../models/completion_models.md) to find more details.

### CompletionModel

#### Description

Handles predictions from a completion model.

### `__init__(self, model_name: str, **kwargs: Dict[str, Any])`

#### Description

Initializes a CompletionModel instance.

#### Parameters

- `model_name` (str): The name of the model.
- `**kwargs` (Dict[str, Any]): Additional keyword arguments.

---

### Method: `complete(self, prompts: List[str], max_output_tokens: int = 1024, temperature: float = 0.2, **kwargs: Dict[str, Any]) -> CompletionModelResponse`

#### Description

Makes a generation based on the prompts and parameters.

#### Parameters

- `prompts` (List[str]): The list of prompts.
- `max_output_tokens` (int): The maximum number of output tokens. Default is 1024.
- `temperature` (float): Controls the randomness of the output. Default is 0.2.
- `**kwargs` (Dict[str, Any]): Additional keyword arguments.

#### Returns

- `CompletionModelResponse`: The response from the model.

---

### Method: `async_complete(self, prompts: List[str], max_output_tokens: int = 1024, temperature: float = 0.2, **kwargs) -> CompletionModelResponse`

#### Description

Makes an asynchronous generation based on the prompts and parameters.

#### Parameters

- `prompts` (List[str]): The list of prompts.
- `max_output_tokens` (int): The maximum number of output tokens. Default is 1024.
- `temperature` (float): Controls the randomness of the output. Default is 0.2.
- `**kwargs` (Dict[str, Any]): Additional keyword arguments.

#### Returns

- `CompletionModelResponse`: The response from the model.

---

### Method: `stream_complete(self, prompts: List[str], max_output_tokens: int = 1024, temperature: float = 0.2, **kwargs: Dict[str, Any]) -> Iterator[CompletionModelResponse]`

#### Description

Streams generations based on the prompts and parameters.

#### Parameters

- `prompts` (List[str]): The list of prompts.
- `max_output_tokens` (int): The maximum number of output tokens. Default is 1024.
- `temperature` (float): Controls the randomness of the output. Default is 0.2.
- `**kwargs` (Dict[str, Any]): Additional keyword arguments.

#### Returns

- `Iterator[CompletionModelResponse]`: An iterator of the responses from the model.

---

### Method: `async_stream_complete(self, prompts: List[str], max_output_tokens: int = 1024, temperature: float = 0.2, **kwargs: Dict[str, Any]) -> Iterator[CompletionModelResponse]`

#### Description

Streams asynchronous predictions based on the prompts and parameters.

#### Parameters

- `prompts` (List[str]): The list of prompts.
- `max_output_tokens` (int): The maximum number of output tokens. Default is 1024.
- `temperature` (float): Controls the randomness of the output. Default is 0.2.
- `**kwargs` (Dict[str, Any]): Additional keyword arguments.

#### Returns

- `Iterator[CompletionModelResponse]`: An iterator of the responses from the model.

---

### Response

The resultant `CompletionModelResponse` has two main fields:

- `metadata` containing metadata information for the call like the token count, char count etc.
- `responses` containing the response choices, where each candidate has the response message with its content,  and additional metadata on the response provided the specific model used

```python
print(response.model_dump())
>>> {
    "metadata": {
        "inputTokenCount": {
            "billableTokens": 0,
            "unbilledTokens": 7,
            "billableCharacters": 23,
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
            "choices": [
                {
                    "content": " The meaning of life is a deep question that has been pondered by philosophers, theologians, and artists for centuries. There is no one answer that is universally agreed upon, but some common themes that emerge include:\n\n* Finding happiness and fulfillment in one'",
                    "metadata": {
                        "safetyAttributes": {
                            "blocked": False,
                            "categories": ["Health", "Religion & Belief"],
                            "scores": [0.1, 0.7],
                        },
                        "citationMetadata": {"citations": []},
                    },
                }
            ]
        }
    ],
}
```

### Examples

#### Synchronous

```python
from replit.ai.modelfarm import CompletionModel, CompletionModelResponse

model: CompletionModel = CompletionModel("text-bison")

prompts = ["What is the meaning of life?"]

# synchronous, non-streaming call
response: CompletionModelResponse = model.complete(prompts,
                                                   max_output_tokens=50,
                                                   temperature=0.2)
print(response)
```

#### Syncronous - Streaming

```python
from replit.ai.modelfarm import CompletionModel, CompletionModelResponse

model: CompletionModel = CompletionModel("text-bison")

prompts = ["What is the meaning of life?"]


responses: list[CompletionModelResponse] = model.stream_complete(
    prompts, max_output_tokens=50, temperature=0.2)
for response in responses:
  print(response)
```

#### Asynchronous

```python
import asyncio
from replit.ai.modelfarm import CompletionModel, CompletionModelResponse

async def main():
  model: CompletionModel = CompletionModel("text-bison")

  prompt = "What is the meaning of life?"

  # asychronous non-streaming call
  responses = await model.async_complete([prompt])
  for response in responses:
    print(response)

asyncio.run(main())
```

#### Asynchronous - Streaming
```python
import asyncio
from replit.ai.modelfarm import CompletionModel, CompletionModelResponse

async def main():
  model: CompletionModel = CompletionModel("text-bison")

  prompt = "What is the meaning of life?"

  # asynchronous streaming call
  responses = model.async_stream_complete([prompt])
  async for async_response in responses:
    # each response is a ChatModelResponse
    print(async_response)

asyncio.run(main())
```
