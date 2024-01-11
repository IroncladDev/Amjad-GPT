import Loom from '../../src/components/Loom'

# Configuring a Repl

Every Repl comes with two configuration files `.replit` and `replit.nix`. The `.replit` file controls multiple aspects of your Repl's behavior including the run command, LSP (Language Server Protocol), whether your Repl is a [Workspace Extension](/extension/intro), and more.

This page will cover configuring the `.replit` file, which follows the [toml configuration format](https://learnxinyminutes.com/docs/toml/). To view this file, click on the three-dot menu on the file tree and select **Show hidden files**.

- [Nix Configuration](/programming-ide/nix-on-replit)
- [Change the Run Command](#run)
- [Extension Configuration](#extension)

---

## `run`

Gets executed when the Run button is clicked.

This command has lower precedence than `[interpreter] > command`, meaning [`[interpreter] > command`](#command) will override `run`.

```toml
run = "node index.js"
```

---

## `onBoot`

The command that executes when your Repl boots up.

```toml
onBoot = "npm install"
```

---

## `compile`

Runs directly before the [`run`](#run) command. Used for compiled languages like C, C++, Java, etc.

---

## `language`

During a GitHub import, this tells the workspace which language should be used when creating the Repl.

```toml
language = "javascript"
```

---

## `entrypoint`

The name of the main file including the extension. This is the file that will be run, and shown by default when opening the editor.

```toml
entrypoint = "index.js"
```

---

## `hidden`

A list of files or folders to hide by default in the side filetree. These filepaths are still accessible through clicking the three dot menu in the file tree, and selecting **Show hidden files**.

```toml
hidden = [".config", "package-lock.json", "*.zip", "**/*.svg"]
```

---

## `audio`

Enables [system-wide audio](/tutorials/replit/playing-audio-replit) for the Repl when configured to `true`.

```toml
audio = true
```

---

## `[languages]`

Specifies whether LSP (Language Server Protocol) should be enabled for the following specified languages.

### `[languages.<language name>]`

Pre-language configuration. The language name has no special meaning other than to allow multiple languages to be configured at once.

#### `pattern`

**Type:** `string`

A [glob](<https://en.wikipedia.org/wiki/Glob_(programming)>) used to identify which files belong to the specified language configuration.

```
[languages]

[languages.javascript]
pattern = "**/{*.js,*.jsx,*.ts,*.tsx,*.json}"
```

### `[languages.<language name>.languageServer]`

Configuration for setting up [LSP](https://microsoft.github.io/language-server-protocol/) for the specified language. This allows for code intelligence (autocomplete, underlined errors, etc).

#### `start`

The command used to start the LSP server for the specified language.

```
[languages]

[languages.javascript]
pattern = "**/{*.js,*.jsx,*.ts,*.tsx,*.json}"

[languages.javascript.languageServer]
start = "typescript-language-server --stdio"
```

---

## `[[hints]]`

Set hints to display in the console/shell alongside your output. You can have any number of hints in a Repl.

Each hint is required to consist of a `regex` and a `message`. The `regex` is a [regular expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions) that searches through your output. If a match is found, the `message` is printed logged to the console/shell.

```toml
[[hints]]
regex = "ERROR"
message = "Something went wrong."

[[hints]]
regex = "exit status [12]"
message = "Bad exit code, an error occurred."
```

---

## `[nix]`

Specifies the [Nix channel](https://nixos.wiki/wiki/Nix_channels) your Repl will use.

### `channel`

A nix channel ID.

```toml
[nix]
channel = "stable-22_11"
```

---

## `[[ports]]`

**Type:** `{localPort, externalPort}`

Allows you to configure which HTTP port to expose for your web output. By default, any exposed HTTP port with host `0.0.0.0` will be exposed as your Repl's web output.

Extra ports can be served without overriding the default port by adding a new `[[ports]]` entry to your `.replit` file. You are required to specify both a `localPort` and `externalPort` entry. You can add multiple extra ports by adding multiple `[[ports]]` entries to your `.replit` file as defined below.

### Supported ports

A repl can expose `8099` and `9000` as extra `externalPorts`.

### `localPort`

Determines which port should be run in the background without overriding your Repl's web output.

### `externalPort`

Determines which port should be exposed as your Repl's web output.

```toml
[[ports]]
localPort = 3000
externalPort = 8099
```

---

## `[extension]`

Specifies whether a Repl is a [Workspace Extension](/extension/intro).

### `isExtension`

Should be set to `true` in an extension Repl. This makes the [Extension Devtools](/extensions/development/devtools) accessible and optimizes the workspace for developing extensions.

```toml
[extension]
isExtension = true
```

### `extensionID`

Determines if a Repl is attached to a specific extension. If unset, publishing your Extension creates a new extension and automatically fills `extensionID` for you.

```toml
[extension]
extensionID = "492a5fcd-f090-4356-ace8-50755e8deb2b"
```

### `buildCommand`

This command is run to bundle your extension into a static directory (specified by `outputDirectory` below), which is then uploaded to Replit as an Extension.

```toml
[extension]
buildCommand = "npm run build"
```

### `outputDirectory`

The path to the static directory that should be used to render the Extension. This path is relative to your Repl's root directory.

```toml
[extension]
outputDirectory = "./dist"
```

---

## `[env]`

A key-value object of environment variables. For sensitive environment variables, use [Secrets](/programming-ide/workspace-features/secrets) instead

```toml
[env]
VIRTUAL_ENV = "/home/runner/${REPL_SLUG}/venv"
PATH = "${VIRTUAL_ENV}/bin"
PYTHONPATH="${VIRTUAL_ENV}/lib/python3.8/site-packages"
```

---

## `[unitTest]`

If set, enables unit testing for the Repl.

### `language`

The language for unit tests. Unit testing is only available for `java`, `python`, and `nodejs`.

```toml
[unitTest]
langhage = "nodejs"
```

---

## `[interpreter]`

Specifies the interpreter, which should be a compliant [prybar binary](https://github.com/replit/prybar).

### `command`

Starts the interpreter. Overrides the [`run`](#run) command if set.

```toml
[interpreter]
command = [
    "prybar-nodejs",
    "-q",
    "--ps1",
    "\u0001\u001b[33m\u0002\u0001\u001b[00m\u0002 ",
    "-i"
]
```

### `prompt`

A list of bytes used to detect running state, if unspecified it defaults to `[0xEE, 0xA7]`.

```toml
[interpreter]
prompt = [0xEE, 0xA7]
```

---

## `[packager]`

If set, enables package management with the Packager .

### `afterInstall`

If set, is executed after a new package is installed via the Packager.

```toml
[packager]
afterInstall = "echo 'package installed'"
```

### `ignoredPaths`

A list of paths to ignore while attempting to guess packages.

```toml
[packager]
ignoredPaths = [".git"]
```

### `ignoredPackages`

A list of modules to never attempt to guess a package for, when installing packages.

```toml
[packager]
ignoredPackages = ["twitter", "discord"]
```

### `language`

Specifies the language to use for package operations. See available languages in the [Universal Package Manager](https://github.com/replit/upm) repository.

```toml
[packager]
language = "python"
```

### `[packager.features]`

UPM features that are supported by the specified languages.

#### `packageSearch`

When set to `true`, enables support for the Packager.

```toml
[packager]
language = "python3"

  [packager.features]
  packageSearch = true
```

#### `guessImports`

When set to `true`, UPM will attempt to guess which packages need to be installed prior to running the Repl.

```toml
[packager]
language = "python3"

  [packager.features]
  guessImports = true
```

#### `enabledForHosting`

Sets whether hosting the Repl requires running a package installation operation.

```toml
[packager]
language = "python3"

  [packager.features]
  enabledForHosting = false
```

## `[deployment]`

### `run`

The command that executes when a Deployment container starts.

```toml
[deployment]
run = "npm start"
```

### `build`

The command that executes before running a Deployment.

```toml
[deployment]
build = "npm run build"
```

### `ignorePorts`

If `true`, we won't check if a Repl has opened a port in order to deem a deployment as successful.

```toml
[deployment]
ignorePorts = true
```
