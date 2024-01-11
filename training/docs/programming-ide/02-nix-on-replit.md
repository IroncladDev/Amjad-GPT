# Using Nix with Replit

Replit supports all programming languages through integration with [Nix](https://nixos.org/). Nix is a tool for managing software packages and system configurations.

All Nix Repls have a `replit.nix` configuration file. To access this file, click the three dots on the file tree and select **Show hidden files**.

## Installation

To use a specific Nix package in your Repl, [find the package](https://search.nixos.org) on the Nix foundation and it to your `replit.nix` file.

### NodeJS 19

In some cases, some packages on NPM may require a newer version of NodeJS to run. To install a newer version, search to confirm that it exists on Nix.

![Finding NodeJS on Nix](https://docimg.replit.com/images/programming-ide/find-nix.png)

In this case, we will use `nodejs-19_x`. Click on the package name to expand it.

![Expanded nix package](https://docimg.replit.com/images/programming-ide/nix-package.png)

Under **How to install \_nodejs-19_x**, switch to the **NixOS Configuration** tab. Highlighted in blue is what you will paste into your `replit.nix` file. Listed under **Programs provided** are the new bash commands that will be available once the package is installed.

![Installation instructions](https://docimg.replit.com/images/programming-ide/nix-package.png)

Replace `pkgs.nodejs-18_x` in your existing `replit.nix` file to the new package. After your shell is reloaded, the NodeJS version will be updated to v19.

```nix
{ pkgs }: {
	deps = [
		pkgs.nodejs-19_x
    pkgs.nodePackages.typescript-language-server
    pkgs.yarn
    pkgs.replitPackages.jest
	];
}
```

### OpenRA

You can play the classic game Command and Conquer Red Alert by installing the `openra` package from Nix.

```nix
{ pkgs }: {
  deps = [
    pkgs.openra
  ];
}
```

To start the game, run `openra` in the shell, or set that as your Repl's run command.

### Python & NodeJS

Some packages such as [node-gyp](https://www.npmjs.com/package/node-gyp) require Python in order to run.

Python Repls require a special Nix configuration due to its vast amount of abilities. Simply insert the desired NodeJS Nix package in the `deps` section of the `replit.nix` file, maintaining the original configuration of the python nix file.

```nix
{ pkgs }: {
  deps = [
    pkgs.nodejs-19_x
    pkgs.python310Full
    pkgs.replitPackages.prybar-python310
    pkgs.replitPackages.stderred
  ];
  env = {
    PYTHON_LD_LIBRARY_PATH = pkgs.lib.makeLibraryPath [
      # Needed for pandas / numpy
      pkgs.stdenv.cc.cc.lib
      pkgs.zlib
      # Needed for pygame
      pkgs.glib
      # Needed for matplotlib
      pkgs.xorg.libX11
    ];
    PYTHONHOME = "${pkgs.python310Full}";
    PYTHONBIN = "${pkgs.python310Full}/bin/python3.10";
    LANG = "en_US.UTF-8";
    STDERREDBIN = "${pkgs.replitPackages.stderred}/bin/stderred";
    PRYBAR_PYTHON_BIN = "${pkgs.replitPackages.prybar-python310}/bin/prybar-python310";
  };
}
```

## Switch the Nix Channel

You can switch the Nix Channel in your Repl by [editing the [nix] entry](/programming-ide/configuring-repl#nix) in your `.replit` file.

## Unstable Packages

In some cases, a Nix package can be labeled as broken or insecure, not be suitable for the current platform, or not have a free licence. Nix will not install a package under any of these circumstances.

To allow for the installation of such packages, navigate into the `.config` folder > `nixpkgs/config.nix`, and then set it to the following. If you do not see the `.config` folder, click the three dots on the file tree and select **Show hidden files**.

```nix
{
  allowUnfree = true;
}
```
