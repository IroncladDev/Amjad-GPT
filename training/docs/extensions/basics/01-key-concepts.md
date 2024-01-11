---
sidebar_position: 3
---

# Key Concepts
On this page, you'll learn the key concepts of Replit Extensions. If you're new to Extensions, we recommend you start with the [Get Started guide](/extensions/).

## Platform

### Extension
Extensions allow you to add custom functionality, tools, and third-party integrations to the Workspace. Extensions can be installed by any user via the Store.

### Store
The Extensions Store is a marketplace for Extensions. Anyone can create and release an extension on the store. You can also share private links to unlisted Extensions, which is great for testing, internal tools, and more.

---

## Development

### Extension Repl
Extension Repls contain the frontend code for your Extension. You can use HTML / CSS / Javascript, and any web framework of your choice. We provide templates that use React and Vanilla Javascript.

### Devtools
Extension Devtools are a set of tools that help you build and test your Extension. In the Extension Repl workspace, you can access the Devtools by clicking the "Devtools" button in the header.

## Extension Features

### Tool (*Extension UI*)
A custom user interface presented as a Tab in the workspace. Examples include a ReplDB editor or a Chat Extension. Learn how to [build your first tool](/extensions/examples/snippet-manager).

### File Handler (*File Editors and Icons*)
File handlers allow you to build Tools and add icons for specific file types. Examples include a JSON file editor or a CSV file editor. Learn how to [build your first file handler](/extensions/examples/json-editor). Under the hood, file handlers are just tools with a filetype association.

### Command
Commands allow you to add custom commands to the CLUI command bar. Commands are a great way to build a CLI-like experience for your extension, and enable quick actions for your users.

### Background Script
Background scripts are loaded when the Repl opens. They remain permanently loaded until the extension is uninstalled or you close the workspace.