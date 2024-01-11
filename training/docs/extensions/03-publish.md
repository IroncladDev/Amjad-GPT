---
sidebar_label: "Publishing"
---

import {ResourceCard} from '../src/components/homepage/ResourceCard'

# Publish your Extension

After you've finished building your Extension, it's time to publish it to the store for all to use. There are a few steps you will need to complete before you release it. Extensions are expected to be a bundle that can be statically served.

## Design an Icon

Extensions need to have a clean, visible, and memorable icon before being added to the store. We have a [Figma template](https://www.figma.com/community/file/1220063901895293170) you can use to design your own, or you can use the Icon Generator to create one for you.

<ResourceCard
  image="https://extension-9d8280fb-1a5f-495b-9624-aba982c42205.theflowingsky.repl.co/cover.png"
  href="https://replit.com/extension/@theflowingsky/9d8280fb-1a5f-495b-9624-aba982c42205"
  title="Icon Generator Extension"
  description="Use this extension in your Extension Repl to generate an icon for your own extension"
/>

<!-- [![Extension Icon Cover](https://s3-alpha.figma.com/hub/file/3206318308/7beb7f18-f8da-4456-91ee-e5e676cbd610-cover.png)](https://www.figma.com/community/file/1220063901895293170) -->

## Building

If you use a framework like React, you will need to build a static output folder which renders the extension's contents statically. The default template already has the build steps configured, just confirm that it works by running the build command in the shell. 

If you are using HTML/CSS/JS, set the build command to a single space `" "` and set the output directory to your Repl's base URL `.`.

### Vite

Running `npx vite build` will create a static folder `dist`. Set `build` to `vite build` in your `package.json` file and set the extension's build command to `npm run build`. Next, set the output folder to `dist`.

### Next.js

Next.js supports building a [static HTML export](https://nextjs.org/docs/advanced-features/static-html-export), but some features such as server-side rendering and API routes are not supported.

In `next.config.js`, set the `output` property to `"export"`.

The required steps to build the static output folder consist of:

1. Deleting the `.next` folder
2. Building in development mode
3. Running `next export`

All three steps can be collapsed into a single bash command, which can be set as the `"export"` command in `package.json`.

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "export": "rm -rf .next && export NODE_ENV=development && yarn build && next export"
},
```

Running `next export` will create a static folder `out`. In the Extension Devtools, set the build command to `npm run export` and the output folder to `out`.

## Review

After your extension has been published, you must wait for a Replit staff member to review it before it can be put on the store.
