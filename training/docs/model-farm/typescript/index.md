
# ModelFarm JavaScript/TypeScript

ModelFarm expects to run within a Replit managed server context. Use this library in servers or other applications that execute on a Replit server, rather than your user's browser.

For an example of how to use this library with streaming, explore [Replit's demo app](https://replit.com/@replit/Bun-ModelFarm-Chat).

## Installation

Install the TypeScript Library with

```
npm install @replit/ai-modelfarm
```

or if you're using `yarn`, run

```
yarn add @replit/ai-modelfarm
```

The library supports [Bun](https://replit.com/@replit/Bun?v=1), [Deno](https://replit.com/@replit/Deno?v=1), and [NodeJS](https://replit.com/@replit/Nodejs?v=1) (Node version 18+ or any
Node version [polyfilled with the fetch API](https://github.com/node-fetch/node-fetch#providing-global-access)).

## Quickstart

### Chat

Refer to [Chat docs](./chat.md) for a complete API reference and more functions
like one that supports streaming

```ts
import * as replitai from '@replit/ai-modelfarm';

const result = await replitai.chat({
  model: 'chat-bison',
  temperature: 0.5,
  messages: [{ author: 'user', content: 'how are you?' }],
});

console.log(result);
```

### Completion


Refer to [Completion docs](./completion.md) for a complete API reference and more
functions like one that supports streaming

```ts
import * as replitai from '@replit/ai-modelfarm';

const result = await replitai.complete({
  model: 'text-bison',
  prompt: 'What is the capital of France?',
  temperature: 0.2,
  maxOutputTokens: 64,
});

console.log(result);
```

### Embedding

Refer to [Embedding docs](./embedding.md) for a complete API reference

```ts
import * as replitai from '@replit/ai-modelfarm';

const result = await replitai.embed({
  model: 'textembedding-gecko',
  content: ['What is the capital of France?'],
});

console.log(result);
```
