# Result

A Result represents a successful value or an error. It forces the consumer to check whether the returned type is an error or not, `result.ok` acts as a [discriminant](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#discriminated-unions) between success and failure.

For example, when processing the return type for the [chat function](./chat.md#chat-function) you can do the following

```typescript
const chatResult = chat(chatOptions);

if (!chatResult.ok) {
  handleError(chatResult.error);

  return;
}

console.log(chatResult.value.message)
``` 

The library never throws when there's an error, instead it returns an [error result](#errresult), and the value of the result (i.e. `result.error`) will be a [request error](./requesterror.md).


## Result type

**Signature:**

```typescript
type Result<T, E> = OkResult<T> | ErrResult<E>;
```

**References:** [OkResult](#okresult)<!-- -->, [ErrResult](#errresult)

## OkResult

Represents a successful result where you can access `value`

**Signature:**

```typescript
interface OkResult<T> 
```

### Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  ok | true |  |
|  value  | T |  |


## ErrResult

Represents a failure result

**Signature:**

```typescript
interface ErrResult<E> 
```

### Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  error | E | Usually a [request error](./requesterror.md) |
|  ok | false |  |

