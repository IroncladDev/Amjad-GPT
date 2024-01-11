---
title: "Manual Installation"
---

While we recommend using our [Templates](/extensions/basics/templates) to get started, you can also install the API client manually.

### As a `<script>` import

Start using the Extensions API client by inserting this code into the `<head>` tag of your HTML:

```html
<script src="https://unpkg.com/@replit/extensions@1.8.0/dist/index.global.js"></script>
```

Start using the API client by creating a new `<script>` tag and using the pre-defined `replit` variable.

```html
<script>
  async function main() {
    await replit.init();

    ...
  }

  window.addEventListener('load', main);
</script>
```

### As an npm package

Install the client with your preferred package manager, and use the `import` statement to start using it.

```
npm install @replit/extensions
yarn add @replit/extensions
pnpm add @replit/extensions
```

After installing the API client, use the `import` statement to start using it.

```tsx
import {
  fs,
  data,
  ...
} from '@replit/extensions';
```