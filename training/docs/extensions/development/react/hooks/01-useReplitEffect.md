---
sidebar_label: useReplitEffect
---

# `useReplitEffect()` Hook

The `useReplitEffect()` hook fires a callback with the `replit` API wrapper upon the first component render and when its dependency array changes. It is similar in functionality to the `useEffect` React hook.

## Usage

```ts
import { useReplitEffect } from '@replit/extensions-react';

const Component = () => {
  useReplitEffect(async (replit) => {
    ...
  }, [...dependencies]);

  ...
}
```

## Signature

```ts
function useReplitEffect(
  callback: (typeof replit) => Promise<void>;
  dependencies: Array<any>
): null;
```
