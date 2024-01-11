---
title: Snippet Manager
---
# Create a Snippet Manager

In this tutorial, we will build a snippet manager extension with React. A snippet manager is a tool used for storing and organizing commonly used pieces of code or text that can be quickly accessed.

## Prequisites

This tutorial assumes that you have a basic knowledge and understanding of web development and React.

## Set up your Repl

1. Fork the [Replit React Extension Template](https://replit.com/@replit/React-Extension?v=1).
2. Install the `react-feather` package with `npm install react-feather`.

## Configure the manifest file

Configure the title and description in `public/extension.json` (the Extension [manifest file](/extensions/api/manifest)).

```json
{
  "name": "Snippet Manager",
  "description": "Easily access snippets of code directly within the Replit workspace",
  "version": "0",
  "tags": ["snippet", "manager", "tool"]
}
```

Add the `tools` property to `extension.json` and provide a tool that handles the `/` route of your application. This will allow your extension to appear as a tool in the sidebar.

```json
"tools": [
  {
    "handler": "/",
    "name": "Snippet Manager"
  }
]
```

## Build the Snippet Manager

Import the following dependencies in `src/App.jsx`

```js
import { useReplit, useReplitEffect } from "@replit/extensions-react";
import { replDb } from "@replit/extensions";
import { useState } from "react";
import "./App.css";
```

Remove all the existing code from the `App` function and add state variables `snippets` and `newSnippetValue`. `snippets` will store all of the snippets you've created and `newSnippetValue` will be a string for when you create a new snippet.

```jsx
function App() {
  const [snippets, setSnippets] = useState([]);
  const [newSnippetValue, setNewSnippetValue] = useState("");

  return (
    <main>
      <h1>Snippet Manager</h1>
    </main>
  );
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

### Handle Handshake Statuses

Handle the `loading` and `error` statuses from the `useReplit` hook. If the Extension is neither loading nor has resulted in an error, the main content will be rendered.

```jsx
function App() {
  ...

  if(status === 'error') {
    return <div className="screen">
      <h2>Error: {error.message}</h2>
    </div>
  }

  if(status === 'loading') {
    return <div className="screen">
      <h2>Loading...</h2>
    </div>
  }

  return <main>
    <h1>Snippet Manager</h1>
  </main>
}
```

Paste the following CSS code into `src/App.css` to apply basic styling to your exstension. If you refresh the extension, the snippets you've added will be saved.

```css
body {
  background-color: rgb(40, 40, 40);
  color: white;
  margin: 0;
  font-family: sans-serif;
}

main {
  padding: 16px;
  display: flex;
  flex-direction: column;
}

main h1 {
  margin-top: 0;
  margin-bottom: 16px;
}

.screen {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
```

### Snippet Creation

Create an empty function `insertSnippet` within the `App` function.

```js
const insertSnippet = () => {};
```

Add the following JSX code into the `App` function after the `h1` tag. This will be a basic form to create a new snippet.

```jsx
<div className="create-snippet-form">
  <textarea
    placeholder="Enter a new snippet here..."
    value={newSnippetValue}
    onChange={(e) => setNewSnippetValue(e.target.value)}
  ></textarea>
  <div>
    <button onClick={insertSnippet}>Add Snippet</button>
  </div>
</div>
```

Define an asynchronous function `updateSnippets` in `App`. This will allow us to update the `snippets` state variable and save it using the [replDb module](/extensions/api/replDb) at the same time.

**Note**: Values saved to a Repl's database get automatically URI-decoded so encoding has to happen twice. Repl Databases can only store key-values as strings. [Read More](/hosting/databases/replit-database).

```js
const updateSnippets = async (snippetsArr) => {
  setSnippets(snippetsArr);
  await replDb.set({
    key: "snippets",
    value: encodeURIComponent(snippetsArr.map(encodeURIComponent).join(",")),
  });
};
```

Back in the `insertSnippet` function, use the `updateSnippets` function to insert and save `newSnippetValue` to the list of snippets.

```js
const insertSnippet = () => {
  updateSnippets([...snippets, newSnippetValue]);
  setNewSnippetValue("");
};
```

Add the following CSS code into `src/App.css` to style the snippet creation form:

```css
.create-snippet-form {
  display: flex;
}

.create-snippet-form textarea {
  flex-grow: 1;
  margin-right: 8px;
}

textarea,
button {
  padding: 8px;
  background-color: rgb(90, 90, 90);
  border-radius: 8px;
  border: none;
  color: white;
  outline: none;
}

textarea:focus,
textarea:hover {
  border: none;
  outline: none;
  box-shadow: 0 0 0 2px #3273dc;
}

textarea::placeholder {
  color: rgb(200, 200, 200);
}

button {
  cursor: pointer;
}

button:focus,
button:hover {
  outline: none;
  background-color: #3273dc;
}
```

### Load and list the snippets

Define an asynchronous function `loadSnippets` in `App`. This function will fetch all the snippets from the Replit database and update the `snippets` state variable.

```jsx
const loadSnippets = async () => {
  const snippetsFromDB = await replDb.get({
    key: "snippets",
  });

  if (snippetsFromDB) {
    setSnippets(snippetsFromDB.split(",").map(decodeURIComponent));
  }
};
```

Call the [`useReplitEffect` hook](/extensions/development/react/hooks/useReplitEffect) to run the `loadSnippets` function once, when Replit successfully connects to your Extension.

```js
useReplitEffect(() => loadSnippets(), []);
```

Add the following code to the main UI after the `.create-snippet-form` element. Display each snippet as a paragraph from the `snippet` state variable.

```jsx
<div className="snippet-list">
  {snippets.map((snippet, index) => (
    <p key={index}>{snippet}</p>
  ))}
</div>
```

[Install your extension](/extensions#installanextension), start creating some snippets, watch as they appear in realtime.

### The Snippet Component

You will be able to copy, edit, and delete snippets from the `Snippet` component with the click of a button.

Create a file `src/components/Snippet.jsx` and import the following dependencies:

```js
import { messages } from "@replit/extensions";
import { Copy, Edit2, Trash } from "react-feather";
import { useState, useEffect } from "react";
```

Create and export the `Snippet` component. The props declared in this component are as follows:

- `content` is the value of the snippet
- `index` is a number signifying the index of the snippet
- `snippets` is a full list of all the snippets in the database
- `updateSnippets` is the asynchronous function passed down from the `App` component

Add two state variables `isEditing` and `value`. `isEditing` indicates whether the snippet is being edited and `value` is the new value which will be used when editing the snippet, before it is saved.

```jsx
export const Snippet = ({ content, index, snippets, updateSnippets }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(content);

  return <div>Snippet Component</div>;
};
```

Add a useEffect hook to set `value` to `content` whenever `content` updates. The prop will change when snippets get edited and deleted.

```js
useEffect(() => setValue(content), [content]);
```

Create a function `copyToClipboard`. Handle the asynchronous clipboard event with the `.then()` and `.catch()` methods. Use the [`messages` module](/extensions/api/messages) to display whether the action was successful or not.

```js
const copyToClipboard = () => {
  window.navigator.clipboard
    .writeText(content)
    .then(async () => await messages.showConfirm("Copied to clipboard"))
    .catch(async (e) => await messages.showError(e.message));
};
```

Define a function `saveEdit`. This will update the current snippet to reflect the `value` state variable and save it to the database.

```js
const saveEdit = async () => {
  const snippetsArr = [...snippets];
  snippetsArr[index] = value;

  await updateSnippets(snippetsArr);
  setIsEditing(false);
};
```

Add a function `deleteSnippet`. After it is confirmed that the user wants to delete the snippet, remove the snippet from both the application state and the database.

```js
const deleteSnippet = async () => {
  const shouldDelete = confirm("Are you sure you want to delete this snippet?");

  if (shouldDelete) {
    const snippetsArr = [...snippets];
    snippetsArr.splice(index, 1);

    await updateSnippets(snippetsArr);
    await messages.showConfirm("Snippet Deleted");
  }
};
```

Complete the UI of the `Snippet` component with the following JSX code. If the snippet is being edited, a different component will be shown.

```jsx
return isEditing ? (
  <div className="snippet edit">
    <textarea value={value} onChange={(e) => setValue(e.target.value)} />
    <div className="snippet-button-row">
      <button onClick={() => setIsEditing(false)}>Cancel</button>
      <button onClick={saveEdit}>Save</button>
    </div>
  </div>
) : (
  <div className="snippet">
    <p>{content}</p>

    <div className="snippet-buttons">
      <button onClick={copyToClipboard}>
        <Copy />
      </button>

      <button onClick={() => setIsEditing(true)}>
        <Edit2 />
      </button>

      <button onClick={deleteSnippet}>
        <Trash />
      </button>
    </div>
  </div>
);
```

Apply the following CSS to `src/App.css`:

```css
.snippet {
  padding: 8px;
  background: rgb(70, 70, 70);
  margin-bottom: 8px;
  display: flex;
  padding: 8px;
  border-radius: 8px;
}

.snippet p {
  flex-grow: 1;
  margin: 0;
  padding: 0;
}

.snippet-buttons {
  display: flex;
}

.snippet-buttons button {
  margin-left: 8px;
}

.edit {
  flex-direction: column;
}

.edit textarea {
  margin-bottom: 8px;
}

.edit .snippet-button-row button {
  margin-right: 8px;
}
```

### Display the snippets

In `App.jsx`, import the `Snippet` component.

```js
import { Snippet } from "./components/Snippet";
```

Update the `.snippet-list` div to render the new component.

```js
snippets.map((snippet, index) => (
  <Snippet
    key={index}
    content={snippet}
    snippets={snippets}
    updateSnippets={updateSnippets}
    index={index}
  />
));
```

Finally, style the snippet list with the following CSS:

```css
.snippet-list {
  flex-direction: column;
  display: flex;
  margin-top: 8px;
}
```

---

The Snippet Manager extension is now complete! [Install it](/extensions#installanextension), open the Tools section on the sidebar, and select the Snippet Manager extension. You can now easily save and access your favorite snippets directly within your Repl.

[See full solution](https://replit.com/@IroncladDev/Snippet-Manager)

<video controls src="https://docimg.replit.com/extensions/videos/snippet-manager.mp4"/>

<iframe src="https://replit.com/@IroncladDev/Snippet-Manager?embed=true" height="600"/>
