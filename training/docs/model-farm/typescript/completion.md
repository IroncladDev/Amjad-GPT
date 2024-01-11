# Completion API

All the following functions, types, interfaces are exported by the library.

[badreftest](#lol)

## complete function

Gets the completion for a piece of text.

**Signature:**

```typescript
function complete(options: CompletionOptions): Promise<Result<{
    completion: string;
}, RequestError>>;
```

### Parameters

|  Parameter | Type |
|  --- | --- |
|  options | [CompletionOptions](#completionoptions) |

**Returns:**

Promise&lt;[Result](./result.md)<!-- -->&lt;{ completion: string; }, [RequestError](./requesterror.md)<!-- -->&gt;&gt;


## completeStream function

Gets a stream of completions for a piece of text.

**Signature:**

```typescript
function completeStream(options: CompletionOptions): Promise<Result<AsyncGenerator<{
    completion: string;
}>, RequestError>>;
```

### Parameters

|  Parameter | Type |
|  --- | --- |
|  options | [CompletionOptions](#completionoptions) |

**Returns:**

Promise&lt;[Result](./result.md)<!-- -->&lt;AsyncGenerator&lt;{ completion: string; }&gt;, [RequestError](./requesterror.md)<!-- -->&gt;&gt;

## completeMultipleChoices function

Gets multiple completions for a piece of text.

**Signature:**

```typescript
declare function completeMultipleChoices(options: CompletionMultipleChoicesOptions): Promise<Result<{
    choices: Array<{
        completion: string;
    }>;
}, RequestError>>;
```

### Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  options | [CompletionMultipleChoicesOptions](#completionmultiplechoicesoptions) |  |

**Returns:**

Promise&lt;[Result](./result.md)<!-- -->&lt;{ choices: Array&lt;{ completion: string; }&gt;; }, [RequestError](./requesterror.md)<!-- -->&gt;&gt;



## CompletionOptions

Options for completion request

**Signature:**

```typescript
interface CompletionOptions 
```

### Properties

|  Property| Type | Description |
|  --- | --- | --- |
|  extraParams? | Record&lt;string, unknown&gt; | _(Optional)_ Allows extra model specific parameters. Consult with the documentation for which parameters are available for each model. |
|  maxOutputTokens?  | number | _(Optional)_ The maximum number of tokens generated in the completion. The absolute maximum value is limited by model's context size. |
|  model  | [CompletionModel](#completionmodel) | Specifies the model to use |
|  prompt | string | The string/text to complete |
|  temperature?  | number | _(Optional)_ Sampling temperature between 0 and 1. The higher the value, the more likely the model will produce a completion that is more creative and imaginative. |


## CompletionMultipleChoicesOptions

**Signature:**

```typescript
interface CompletionMultipleChoicesOptions extends CompletionOptions 
```
**Extends:** [CompletionOptions](#completionoptions)

### Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  choicesCount| number | Number of completions to generate. Minimum 1, the maximum depends on the model, the returned choices will be automatically adjusted to fit the model. You should not treat this as a guarantee, what you will get is a number of choices upto <code>choicesCount</code>. |




## CompletionModel

Available models for text completion

**Signature:**

```typescript
type CompletionModel = 'text-bison';
```
