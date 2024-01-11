---
sidebar_position: 0
sidebar_label: Introduction
---

# Introduction

Aside from the original API Client, we have a React-specific package which eliminates the need for extension developers to do a lot of boilerplate setup when using React for Extension development. 

The package comes with a set of hooks and components that combine to make a blazingly fast and seamless developer experience.

 - [NPM Package](https://www.npmjs.com/package/@replit/extensions-react)
 - [GitHub Repository](https://github.com/replit/extensions-react)

## Installation

```
npm install @replit/extensions-react
yarn add @replit/extensions-react
pnpm add @replit/extensions-react
```

## Usage

Fork the [React Extension Template](https://replit.com/@replit/React-Extension?v=1) to get started.  Alternatively, you can start from scratch by wrapping your application with the `HandshakeProvider` component imported from `@replit/extensions-react`.

```tsx
import { HandshakeProvider } from '@replit/extensions-react';
import { createRoot } from 'react-dom/client';
import App from './App';

createRoot(document.getElementById('root')).render(
  <HandshakeProvider>
    <App />
  </HandshakeProvider>
)
```

In the `App` function, check the handshake status with the `useReplit` hook.

```tsx
import { useReplit } from '@replit/extensions-react';

function App() {
  const { status, error, replit } = useReplit();

  if(status === "loading") {
    return <div>Loading...</div>
  }

  if(status === "error") {
    return <div>An error occurred: {error?.message}</div>
  }

  return <div>
    Extension is Ready!
  </div>
}
```