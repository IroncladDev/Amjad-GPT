# Request Error

RequestError interface represents an HTTP error with a message and an HTTP status code. It's surfaced in the API as the error in [result type](./result.md).

## RequestError

An object that represents an error with a request

**Signature:**

```typescript
interface RequestError 
```

### Properties

|  Property |  Type |
|  --- | --- | 
|  message   | string  |
|  statusCode | number  |

