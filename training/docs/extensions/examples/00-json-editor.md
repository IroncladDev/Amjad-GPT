---
title: JSON Editor
---
# Create a JSON editor

In this tutorial, we will create a JSON editor Extension with React and the [react-json-view](https://www.npmjs.com/package/react-json-view) package. Our application will display a JSON file's content and allow users to edit, add or delete properties directly from the editor. When a user finishes editing the JSON, the file will automatically update with the changes.

## Prequisites

This tutorial assumes that you have a basic knowledge and understanding of web development and React.

## Set up your Repl

1. Fork the [Replit React Extension Template](https://replit.com/@replit/React-Extension?v=1).
2. Install the `react-json-view` package with `npm install --force react-json-view`. The package uses React 17 as a peer dependency but works fine with React 18 as well.

## Configure the manifest file

Configure the title and description in `public/extension.json` (the Extension [manifest file](/extensions/api/manifest)).

```json
{
  "name": "JSON Editor",
  "description": "A viewer/editor for JSON files, providing code folding and structured editing",
  "tags": ["editor"]
}
```

Add the `fileHandlers` property to `extension.json` and provide a handler for JSON files. This tells Replit that your extension handles a particular file pattern using a page provided by your extension at the `handler` path. In this case, the handler is `/`, meaning that Replit shows the page at the root as the handler for all `.json` files

```json
  "fileHandlers": [
    {
      "glob": "*.json",
      "handler": "/"
    }
  ],
```

## Build the JSON editor

Import the following dependencies in `src/App.jsx`.

```js
import * as React from "react";
import ReactJson from "react-json-view";
import "./App.css";
import {
  useReplit,
  useReplitEffect,
  useWatchTextFile,
} from "@replit/extensions-react";
```

Remove all the existing code from the `App` function and a state variable `path`, which will point to the JSON file your Extension will render.

```js
function App() {
  const [path, setPath] = React.useState(null);

  return <div>My app</div>;
}
```

### Initialize the Handshake

Initialize the handshake and derive the `status` and `error` properties from the [`useReplit hook`](/extensions/development/react/hooks/useReplit) within the `App` function.

The `status` property is an enumerated value indicating whether the handshake connection with Replit is `loading`, `ready`, or has resulted in an `error`.

```js
function App() {
  ...

  const { status, error } = useReplit();

  ...
}
```

### Get the File Path

Use the [`useReplitEffect`](/extensions/development/react/hooks/useReplitEffect) hook and set the `path` state to the `extensionPort`'s file path. This will set the `path` state once the handshake between Replit and your Extension has been established.

```js
useReplitEffect(async ({ extensionPort }) => {
  const filePath = await extensionPort.filePath;

  setPath(filePath);
}, []);
```

### Create the File Watcher

You can easily create a file watcher with the [`useWatchTextFile`](/extensions/development/react/hooks/useWatchTextFile) hook. Call the hook, pass in the file path, and derive `content` and `writeChange` from it.

```js
const { content, writeChange } = useWatchTextFile({
  filePath: path,
});
```

### Reflecting file contents

Create a `parsedContent` [React Memo](https://react.dev/reference/react/useMemo) that returns the `content` file value as parsed JSON. If there is an error parsing it, return `null` instead.

The [React useMemo hook](https://react.dev/reference/react/useMemo) caches a result based on an array of dependencies between re-renders to improve performance. Caching reduces the amount of computing required in a process, ultimately improving performance.

```js
const parsedContent = React.useMemo(() => {
  try {
    return JSON.parse(content);
  } catch (e) {
    return null;
  }
}, [content]);
```

### Handle file changes

Create a function which handles changes from the [react-json-view](https://www.npmjs.com/package/react-json-view) editor component. The `updated_src` property passed into this function is a JSON object.

Stringify the JSON object and then write it to the JSON file using the `writeChange` function.

Finally, update the `setContent` state to reflect the contents of the file.

```js
const handleChange = async ({ updated_src: newContent }) => {
  const stringified = JSON.stringify(newContent, null, 2);

  writeChange({
    from: 0,
    to: content.length,
    insert: stringified,
  });
};
```

### Build the UI

It's time to start building the UI.

First, handle loading and error states.

```js
function App() {
  ...

  if (status === "error") {
    return <main>
      <div className="notice error">{error.toString()}</div>
    </main>
  }
  else if (status === "loading") {
    return <main>
      <div className="notice">Loading...</div>
    </main>
  }
  else if (status === "ready") {
    return <main>Ready</main>
  }
}
```

[Install the Extension](/extensions#development-installation) by opening up the Command Bar (**cmd**/**ctrl** + k), navigating to **Extensions**, and selecting **From this Repl**. The extension should load and display "Ready" almost instantly.

If you open the webview, your extension should load for a few seconds and fail. Extensions should be developed and used within the correct pane rather than the webview.

![Loading state](https://docimg.replit.com/extensions/examples/json-editor/load-nocss.png)

![Error state](https://docimg.replit.com/extensions/examples/json-editor/error-nocss.png)

If both `path` and `content` are valid strings, render the editor. If not, tell the user to select a file.

```js
else if (status === "ready") {
  return <main>
    {path && content ?
      <ReactJson
        style={{ width: '100vw', height: "100vh", padding: "1em" }}
        theme="ocean"
        displayDataTypes={false}
        src={parsedContent}
        onEdit={handleChange}
        onAdd={handleChange}
        onDelete={handleChange}
      /> :
      <div className="notice">
        Please select a file
      </div>
    }
  </main>
}
```

That's it. Now install and load your Extension, and it should work.

![Select a file](https://docimg.replit.com/extensions/examples/json-editor/file-select-nocss.png)

![Editor without CSS](https://docimg.replit.com/extensions/examples/json-editor/editor-nocss.png)

### Style your Extension

Right now, the Extension has barely any styles applied to it. To make it look more polished, paste the following into `App.css`:

```css
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  display: flex;
  font-family: sans-serif;
  background: black;
  color: white;
}

#root,
main {
  flex-grow: 1;
  display: flex;
  width: 100%;
}

.notice {
  flex-grow: 1;
  align-self: center;
  justify-self: center;
  text-align: center;
  color: white;
  font-size: 24px;
}
```

---

Your Extension is now complete! [Install it](/extensions#installanextension), press the kebab menu on a JSON file in the file tree and then select "Open with JSON Editor" to start editing your JSON files with ease.

[See full solution](https://replit.com/@IroncladDev/JSON-editor-example?v=1).

<video controls src="https://docimg.replit.com/extensions/videos/json-editor.mp4"/>

<iframe src="https://replit.com/@IroncladDev/JSON-editor-example?embed=true" height="600"/>
