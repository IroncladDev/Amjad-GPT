---
sidebar_label: useActiveFile
---

# `useActiveFile()` Hook

The `useActiveFile()` hook returns the file actively focused on by the current user.

## Usage

```tsx
import { useActiveFile } from "@replit/extensions-react";

const Component = () => {
  const activeFile = useActiveFile();

  return (
    <>
      <span>Active File: {activeFile}</span>
    </>
  );
};
```

## Signature

```ts
function useActiveFile(): string | null;
```
