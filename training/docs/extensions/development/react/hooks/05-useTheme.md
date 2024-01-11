---
sidebar_label: useTheme
---

# `useTheme()` Hook

The `useTheme()` hook returns all metadata on the current theme including syntax highlighting, description, HSL, token values, and more.

## Usage

```ts
import { useTheme } from '@replit/extensions-react';

const Component = () => {
  const theme = useTheme();

  ...
}
```

## Signature

```ts
function useThemeValues(): ThemeVersion | null;
```

## Types

### [ThemeVersion](/extensions/api/themes#themeversion)

A specific theme version reflecting all colors and metadata on the current theme.
