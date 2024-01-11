# Embedding API

All the following functions, types, interfaces are exported by the library.

## embed function

Converts text into numerical vectors

**Signature:**

```typescript
function embed(options: EmbedOptions): Promise<Result<{
    embeddings: Array<Embedding>;
}, RequestError>>;
```

### Parameters

|  Parameter | Type |
|  --- | --- |
|  options | [EmbeddingOptions](#embeddingoptions) |

**Returns:**

Promise&lt;[Result](./result.md)<!-- -->&lt;{ embeddings: Array&lt;[Embedding](#embedding)<!-- -->&gt;; }, [RequestError](./requesterror.md)<!-- -->&gt;&gt;

## EmbeddingOptions

Options for embedding request

**Signature:**

```typescript
interface EmbeddingOptions 
```

### Properties

|  Property | Modifiers | Type | Description |
|  --- | --- | --- | --- |
|  content |  | Array&lt;string&gt; | The strings to embed, the returned embedding will correspond to the order of the passed string |
|  extraParams? |  | Record&lt;string, unknown&gt; | _(Optional)_ Allows extra model specific parameters. Consult with the documentation |
|  model |  | [EmbeddingModel](#embeddingmodel) | The model to embed with |



## Embedding

Embedding vector returned by an embedding request

**Signature:**

```typescript
interface Embedding 
```

### Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  truncated | boolean | Indicates if the input text was longer than max allowed tokens and truncated |
|  values  | Array&lt;number&gt; | The embedding vectors corresponding to the words in the input text |


## EmbeddingModel

Available models for text embedding

**Signature:**

```typescript
type EmbeddingModel = 'textembedding-gecko';
```
