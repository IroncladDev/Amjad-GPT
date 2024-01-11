---
title: "Extension Devtools"
---

# Developing your Extension

In every extension Repl, you will see a button labeled **Extension Devtools** in the top-right corner of the workspace.

![Devtools button](https://docimg.replit.com/extensions/devtools-button.png)

If you do not see this button, make sure your Repl is [configured to be an Extension](/programming-ide/configuring-repl#extension).

## Developer Tools

The Extension Devtools pane makes it easy to edit your Extension's metadata and manage [Tools](/extensions/basics/key-concepts#tool-extension-ui) and [File Handlers](/extensions/basics/key-concepts#file-handler-file-editors-and-icons).

![Devtools](https://docimg.replit.com/extensions/devtools.png)

### Extension Metadata

Click the **Edit** button in the top-right corner of your Extension preview to edit it. See [docs on the manifest file](/extensions/api/manifest).

![Extension preview](https://docimg.replit.com/extensions/preview-card.png)

### File Handlers

Click the "+" Icon next to **File Handlers** or click **New File Handler**. You will then be prompted to fill out the necessary information for the file handler. See [Type Definition](/extensions/api/manifest#filehandler).

To preview a file handler in action, click the **Open** button on the right side of an existing file handler.

### Tools

Click the "+" Icon next to **Tools** or click **New Tool**. You will then be prompted to fill out the necessary information for the new tool. See [Type Definition](/extensions/api/manifest#tool).

To preview a tool in action, click the **Open** button on the right side of an existing tool.
