---
sidebar_label: useReplit
---

# `useReplit()` Hook

The `useReplit()` hook establishes the handshake between the Replit and the extension and passes the API wrapper for usage inside a React component.

## Usage

```ts
import { useReplit } from '@replit/extensions-react';

const Component = () => {
  const { replit, status, filePath, error } = useReplit();

  ...
}
```

## Signature

```ts
function useReplit(init?: {
  permissions: Array<string>;
}): UseReplitInitialized | UseReplitPreInitialization | UseReplitFailure;
```

## Result

| Property | Type                                  | Description                                                                                            |
| -------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| status   | [`HandshakeStatus`](#handshakestatus) | A string indicating the status of the handshake between Replit and the Extension                       |
| error    | `string` &#124; `null`                | If the handshake has failed, `error` is a string indicating the error message                          |
| filePath | `string` &#124; `null`                | If the handshake has succeeded, `filePath` points to the current file the user is focusing             |
| replit   | `typeof replit`                       | If the handshake has succeeded, `replit` is the API wrapper for the entire `@replit/extensions` module |

## Types

### HandshakeStatus

An enumerated set of values for the handshake status.

| Key     | Value       |
| ------- | ----------- |
| Ready   | `"ready"`   |
| Error   | `"error"`   |
| Loading | `"loading"` |

### UseReplitReady

If the handshake between Replit and the Extension has been established successfully

| Property | Type                                          |
| -------- | --------------------------------------------- |
| status   | [`HandshakeStatus`](#handshakestatus).`Ready` |
| error    | `null`                                        |
| filePath | `string`                                      |
| replit   | `typeof replit`                               |

### UseReplitLoading

The default handshake status, before initialization has been established.

| Property | Type                                            |
| -------- | ----------------------------------------------- |
| status   | [`HandshakeStatus`](#handshakestatus).`Loading` |
| error    | `null`                                          |
| filePath | `null`                                          |
| replit   | `null`                                          |

### UseReplitFailure

If the handshake has failed.

| Property | Type                                          |
| -------- | --------------------------------------------- |
| status   | [`HandshakeStatus`](#handshakestatus).`Error` |
| error    | `string`                                      |
| filePath | `null`                                        |
| replit   | `null`                                        |
