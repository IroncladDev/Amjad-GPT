# Chat API

All the following functions, types, interfaces are exported by the library.

## chat function

Gets a single chat message completion for a conversation.

**Signature:**

```typescript
function chat(options: ChatOptions): Promise<
  Result<
    {
      message: ChatMessage;
    },
    RequestError
  >
>;
```

### Parameters

|  Parameter | Type |
|  --- | --- |
|  options | [ChatOptions](#chatoptions) |

**Returns:**

Promise&lt;[Result](./result.md)<!-- -->&lt;{ message: [ChatMessage](#chatmessage)<!-- -->; }, [RequestError](./requesterror.md)<!-- -->&gt;&gt;


## chatStream function

Gets a single chat message completion for a conversation. The result contains an iterator of messages, please note that this would be a \*single message\* that has the contents chunked up.

**Signature:**

```typescript
function chatStream(options: ChatOptions): Promise<
  Result<
    AsyncGenerator<{
      message: ChatMessage;
    }>,
    RequestError
  >
>;
```

### Parameters

|  Parameter | Type |
|  --- | --- |
|  options | [ChatOptions](#chatoptions) |

**Returns:**

Promise&lt;[Result](./result.md)<!-- -->&lt;AsyncGenerator&lt;{ message: [ChatMessage](#chatmessage)<!-- -->; }&gt;, [RequestError](./requesterror.md)<!-- -->&gt;&gt;

## chatMultipleChoices function

Gets multiple chat completions for a conversation.

**Signature:**

```typescript
function chatMultipleChoices(options: ChatMultipleChoicesOptions): Promise<
  Result<
    {
      choices: Array<{
        message: ChatMessage;
      }>;
    },
    RequestError
  >
>;
```

### Parameters

|  Parameter | Type |
|  --- | --- |
|  options | [ChatMultipleChoicesOptions](#chatmultiplechoicesoptions) |

**Returns:**

Promise&lt;[Result](./result.md)<!-- -->&lt;{ choices: Array&lt;{ message: [ChatMessage](#chatmessage<!-- -->; }&gt;; }, [RequestError](./requesterror.md)<!-- -->&gt;&gt;



## ChatOptions

Options for chat request

**Signature:**

```typescript
interface ChatOptions 
```

### Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  messages  | Array&lt;[ChatMessage](#chatmessage)<!-- -->&gt; | Previous messages in the conversation. |
|  model  | [ChatModel](#chatmodel) | Specifies the model to use. |
|  context  | string | This can be instructions for the model on how it should respond or information it uses to generate a response. This can also be used to restrict the model to a specific topic. |
|  temperature  | number | _(Optional)_ Sampling temperature between 0 and 1. The higher the value, the more likely the model will produce a completion that is more creative and imaginative. |
|  maxOutputTokens?  | number | _(Optional)_ The maximum number of tokens generated in the chat completion. The absolute maximum value is limited by model's context size. 
|  extraParams?   | Record&lt;string, unknown&gt; | _(Optional)_ Allows extra model specific parameters. Consult with the provider documentation for which parameters are available for each model. |

## ChatMultipleChoicesOptions

**Signature:**

```typescript
interface ChatMultipleChoicesOptions extends ChatOptions 
```
**Extends:** [ChatOptions](#chatoptions)

### Properties

|  Property | Type | Description |
|  ---| --- | --- |
|  choicesCount | number | Number of chat completions to generate. Minimum 1, the maximum depends on the model, the returned choices will be automatically adjusted to fit the model. You should not treat this as a guarantee, what you will get is a number of choices up to <code>choicesCount</code>. |


## ChatMessage

A message in a chat conversation

**Signature:**

```typescript
interface ChatMessage 
```

### Properties

|  Property | Type | Description |
|  ---  | --- | --- |
|  author  | string | The author of the message. Typically the completion infers the author from examples and previous messages provided in the options. |
|  content | string | The content of the message |


## ChatModel

Available models for chat completion

**Signature:**

```typescript
type ChatModel = 'chat-bison';
```

