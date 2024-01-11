---
sidebar_label: useThemeValues
---

# `useThemeValues()` Hook

The `useThemeValues()` hook provides you with the global token color values of the current user's theme.

## Usage

```ts
import { useThemeValues } from '@replit/extensions-react';

const Component = () => {
  const themeValues = useThemeValues();

  ...
}
```

## Signature

```ts
function useThemeValues(): ThemeValuesGlobal | null;
```

## Types

### [ThemeValuesGlobal](/extensions/api/themes#themevaluesglobal)

Replit's global theme token values for UI, excluding syntax highlighting.
