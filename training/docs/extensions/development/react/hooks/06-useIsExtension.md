---
sidebar_label: useIsExtension
---

# `useIsExtension()` Hook

The `useIsExtension()` hook returns whether the handshake has been successfully established with the Replit workspace. If the handshake is loading, `undefined` will be returned. After loading has finished, the hook will return a boolean.

## Usage

```ts
import { useIsExtension } from '@replit/extensions-react';

const Component = () => {
  const isExtension = useIsExtension();

  ...
}
```

## Signature

```ts
function useIsExtension(): boolean | undefined;
```
