---
sidebar_position: 1
sidebar_label: "Manifest"
---

# Manifest File

The `extension.json` file contains the manifest for an Extension and needs to be placed in a public directory such that it is served at the root (`/extension.json`). You are required to provide a manifest file to publish an Extension to the Extensions Store.

## Properties

| Property         | Type                            | Description                                                                                               |
| ---------------- | ------------------------------- | --------------------------------------------------------------------------------------------------------- |
| name             | `string`                        | Required. The Extension's name. Length can be 1-60 characters.                                            |
| description      | `string`                        | Required. The Extension's description. Length can be 1-255 characters.                                    |
| longDescription? | `string`                        | Optional. The Extension's longer description. Markdown is supported and recommended.                      |
| icon?            | `string`                        | Optional. The Extension's icon. This is a reference to a file on the repl. Any web based image format is accepted, but SVGs are preferred.            |
| tags?            | `string[]`                      | Optional. A list of tags that describe the extension.                                                     |
| coverImages?     | [`CoverImage[]`](#coverimage)   | Optional. A Cover Image belonging to an Extension. Max 4 coverImages per extension.                       |
| website?         | `string`                        | Optional. The Extension's website                                                                         |
| authorEmail?     | `string`                        | Optional. The email address of the extension author. This is made public                                  |
| fileHandlers?    | [`FileHandler[]`](#filehandler) | Optional. An array of [file handlers](/extensions/basics/key-concepts#file-handler-file-editors-and-icons) registered by the extension. |
| tools?           | [`Tool[]`](#tool)               | Optional. An array of [tools](/extensions/basics/key-concepts#tool-extension-ui) registered by the extension.                 |
| scopes?          | [`Scope[]`](#scope)             | Optional. An array of scopes required by the extension.                                                   |
| background? | [`BackgroundPage`](#backgroundpage) | Optional. A path to a background script |


## Types

### CoverImage

A Cover Image belonging to your extension. Currently, only the first image will be used in the extension store. The `path` should reference an image file on the Repl's file system.

| Property | Type     | Description                                                        |
| -------- | -------- | ------------------------------------------------------------------ |
| path     | `string` | The path to the image. This is relative to the statically served root           |
| label    | `string` | The label of the image. This is used as the alt text for the image |

### FileHandler

A [file handler](/extensions/basics/key-concepts#file-handler-file-editors-and-icons) is a custom user experience around a particular file in the Workspace, in the form of a Pane.

| Property | Type     | Description                                                                                             |
| -------- | -------- | ------------------------------------------------------------------------------------------------------- |
| glob     | `string` | A glob pattern that matches the files that this handler should be used for                              |
| handler  | `string` | The path to the handler. This is relative to the statically served root.                                |
| name?    | `string` | Optional. Required if more than one file handler is registered. Fallback value is the extension's name. |
| icon?    | `string` | Optional. Required if more than one file handler is registered. Fallback value is the extension's icon. |

### Tool

A [tool](/extensions/basics/key-concepts#tool-extension-ui) is a custom user experience in the Workspace, in the form of a Pane.

| Property | Type     | Description                                                                                     |
| -------- | -------- | ----------------------------------------------------------------------------------------------- |
| handler  | `string` | The path to the handler. This is relative to the statically served root.                        |
| name?    | `string` | Optional. Required if more than one tool is registered. Fallback value is the extension's name. |
| icon?    | `string` | Optional. Required if more than one tool is registered. Fallback value is the extension's icon. |

### Scope

Scopes/Permissions required by the extension.

| Property | Type                      |
| -------- | ------------------------- | --------------------------------------------- |
| name     | [`ScopeType`](#scopetype) | The name of the scope                         |
| reason   | `string`                  | The reason why the extension needs this scope |

### ScopeType

- `read` - Read any file in a Repl
- `write-exec` - Write to any file, and execute any code or shell command in a Repl
- `repldb:read` - Read all data in the key-value [ReplDB](/hosting/databases/replit-database) in a Repl
- `repldb:write` - Write or delete any key in the key-value [ReplDB](/hosting/databases/replit-database) in a Repl
- `experimental-api` - Use experimental APIs that may be unstable, may change in behavior or be removed entirely

```ts
"read" | "write-exec" | "repldb:read" | "repldb:write" | "experimental-api"
```

### BackgroundPage

The path to a specified route that will run a background script.

```
{
  page: string;
}
```
