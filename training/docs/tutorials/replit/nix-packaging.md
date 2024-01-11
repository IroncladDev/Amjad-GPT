---
title: Packaging software with Nix
---

# Packaging software with Nix

Replit's repls are powered by [Nix](https://nixos.org/). Nix is a tool for managing software packages and system configurations. The Nix community also maintains the [Nix Packages Collection](https://github.com/NixOS/nixpkgs) (Nixpkgs), Nix's official package repository. It contains [over 50,000 projects](https://repology.org/repository/nix_stable). Chances are high that the software you need is already in there! You can search for packages on the [NixOS website](https://search.nixos.org/packages) (DuckDuckGo users can use the [`!nixpkg` bang command](https://duckduckgo.com/bang?q=nixpkg)).

However, despite being the largest repository of packaged software (at the <span title="July 2022">time of writing</span>), there is software that has not been packaged in the Nix Package Set. If you need something packaged in order to use it in Nix, you can [make a packaging request](https://github.com/NixOS/nixpkgs/issues/new?labels=0.kind%3A+packaging+request&template=packaging_request.md), but then you have to wait for a volunteer to package it for you. It's much quicker to learn how to package it yourself!

Packaging software with Nix is easier than for most other repositories. The Nix language is a <abbr title="Domain Specific Language">DSL</abbr> specifically designed for packaging software. It's partly why Nixpkgs has the most packages despite having only about a sixth of the maintainers of the repository with the most maintainers, <abbr title="Arch User Repository">AUR</abbr> (2182 vs 12292).

An exhaustive breakdown of all the ins and outs of packaging for Nix is out of the scope of this article, but we'll take a look at the principles of packaging software and show you how to package some simple examples.

To begin with, let's talk about fetching software. Before we can package anything, we need to get a copy of it.

## Fetching software

Before we can build a package, we need to fetch either the source code, or if the source code is not available, the binary file. Nix has [many different fetchers](https://nixos.org/manual/nixpkgs/stable/#chap-pkgs-fetchers) we can use to fetch files.

Nix tries hard to be reproducible, that is, to ensure that whenever you build a package with the same inputs, it gives you the exact same result. When we're fetching things from the network, we need to be sure that what we've received is the thing we expected. That's why Nix fetchers all require you to supply a hash of the expected file. A hash is a short, distinctive representation of some data. It's like a digital fingerprint. If the hash of the file we downloaded matches the hash we expected, we can be sure we got the exact file we expected. Nix supports `md5`, `sha1`, `sha256`, and `sha512` hashes, though the first two are deprecated and should no longer be used.

How do you get the hash of the file? Some projects will list hashes or checksums of their downloads on their website. If they do, use what they give you. If not, you could download it yourself, and then run a program like `sha256sum` to get the hash. This works well for simple files, but becomes a bit harder when you're using a fetcher like `fetchFromGitHub` to fetch a specific version of a Git repository. An easy workaround is to fill in a nonsensical value for the hash, and then attempt to build the package. Nix will abort the build after fetching because the hash won't match, but it will print the hash of what it fetched to the console. You can copy this value and use it as the correct hash. Re-running the build should now succeed.

Alternatively, there are also some command-line tools that can prefetch a file for you. They will fetch the file, put it in the Nix store, and print out the hash to the console. The [`nix-prefetch-url`](https://nixos.org/manual/nix/stable/command-ref/nix-prefetch-url.html) command comes installed in a standard Nix environment, including Replit repls. Both `nix-prefetch-git` and `nix-prefetch-github` are in Nixpkgs (so they can be installed easily using `replit.nix`) and work similarly. For more advanced uses, consider using [`nix-prefetch`](https://github.com/msteen/nix-prefetch), also in Nixpkgs, which can prefetch using any Nix fetcher.

When updating the version of something that's fetched, be sure to change the hash, too. Internally, Nix uses the hashes to identify things, and if it hasn't changed and Nix has already got a copy downloaded from before, Nix may silently use that instead of actually attempting to fetch the file again.

### Fetch files and archives with `fetchurl` and `fetchzip`

The simplest fetcher is `fetchurl`. It will fetch a file and put it in the Nix store. The `fetchzip` fetcher is very similar, but it will unpack the archive before storing it in the Nix store. This is useful if you need to refer to specific files from the archive, rather than the download as a whole. Despite its name, it can handle many different archive formats, not just zip files. In general, unless you need to refer to a specific file in an archive in a Nix expression, use `fetchurl`, which will not unpack the archive before putting it in the Nix store. This will save space, and, as we will cover in more detail later, archives are automatically unpacked during the build process in any case.

Sign in to [Replit](https://replit.com) or [create an account](https://replit.com/signup) if you haven't already. Once logged in, create a new [Blank Repl](https://replit.com/@replit/Blank-Repl).

![Create repl](https://replit-docs-images.bardia.repl.co/images/tutorials/nix-packaging/create-repl.png)

Find the `replit.nix` file in your repl. If you don't see it in the Files sidebar, select "Show hidden files" from the menu.

![](https://replit-docs-images.bardia.repl.co/images/tutorials/nix-packaging/show-hidden.png)

Edit `replit.nix` to look like this:

```nix
{ pkgs }:

let
  hello = pkgs.stdenv.mkDerivation rec {
    pname = "hello";
    version = "2.12";
    src = pkgs.fetchurl {
      url = "mirror://gnu/hello/hello-${version}.tar.gz";
      sha256 = "1111111111111111111111111111111111111111111111111111";
    };
  };
in {
  deps = [
    hello
  ];
}
```

Once you've made this change to `replit.nix`, open the Console tab, and press enter. The output should be similar to:

![Console output using a wrong hash](https://replit-docs-images.bardia.repl.co/images/tutorials/nix-packaging/wrong-hash.png)

Nix is telling us what the hash of the file it fetched actually is, in this case: `1ayhp9v4m4rdhjmnl2bq3cibrbqqkgjbl3s7yk2nhlh8vj3ay16g`. Your output might be different, that just means that you're using an updated version of Nixpkgs, so `stdenv` has been updated; since that's a dependency of the derivation that `stdenv.mkDerivation` produces and since derivation hashes depend on their input derivation hashes, your derivation's hash will have changed, too.

Now that we have the real hash, copy it to the `sha256` attribute in the derivation, press enter in the console, which will then pick up on the change, and Nix will successfully build the `hello` package — though it won't output anything when it succeeds. The `hello` command will be added to your environment. If you run it, the `hello` program just echoes "Hello, world!" to the console. At first glance, that doesn't seem like a very useful program, but [its purpose](https://www.gnu.org/software/hello/manual/html_node/Overview.html) is actually to help test packaging systems. Now we know ours is working!

![Successfully installed hello](https://replit-docs-images.bardia.repl.co/images/tutorials/nix-packaging/hello-command.png)

If you have been paying particularly close attention, you may have spotted that Nix is telling us that two derivations will be built, even though we're only asking it to build one. This is because each fetcher actually builds a derivation: the fetched file that's added to the Nix store. Nix packages can only depend on things that are in the Nix Store, so in order to build `hello`, we need its source code to be put in the Nix Store, too. Since we don't have it yet, it needs to be "built" first (fetched, in this case). A fetcher is actually a special type of builder.

We could also have gotten the same hash with `nix-prefetch-url`:

```bash
nix-prefetch-url https://ftpmirror.gnu.org/hello/hello-2.12.tar.gz
```

![Prefetch command](https://replit-docs-images.bardia.repl.co/images/tutorials/nix-packaging/prefetch-command.png)

You can copy the string `1ayhp9v4m4rdhjmnl2bq3cibrbqqkgjbl3s7yk2nhlh8vj3ay16g` to the `sha256` field in the derivation and it will also work (again, your actual hash might be different). Sometimes the hashes are in a different format, but that's not a problem. Nix fetchers understand different types of hashes presented in a variety of formats.

### Some notes on hashes

In our first example, we initially provided a hash that we knew was incorrect in order to have Nix output the correct hash in the hash mismatch error message. Trusting the hash that Nix gives back to us is an approach called [trust on first use](https://en.wikipedia.org/wiki/Trust_on_first_use). We're assuming that the file Nix actually fetched is correct. For many purposes, this is fine.

If you have a real hash, not a dummy hash, in your derivation and you still get this error, carefully try to find out what might have happened, as this means that Nix is telling you that the file it actually fetched is not what you expected. It could be that the download was corrupted due to network problems, in which case re-attempting it later might succeed; or that the target file has actually been changed on the server. This might happen if you're trying to download from a URL that does not provide a stable version, or if an attacker has surreptitiously replaced the file. If you're unsure, try to determine with a trusted party, such as the publishers of the code, whether everything is OK.

You may notice that the hash Nix calculates for a file doesn't match the hash that `sha256sum` calculates. They are actually the same hash, but they're encoded differently. Most hash tools print out the hash in a hexadecimal (base 16) format, but Nix prefers its own non-standard base 32 format, because it's shorter (it's base 32, but it doesn't use the characters `e`, `o`, `u`, and `t` to reduce the chances of offensive letter sequences). To convert a base 16 hash to a base 32 hash or vice versa, use `nix-hash`:

```bash
$ nix-hash --to-base32 --type sha256 cf04af86dc085268c5f4470fbae49b18afbc221b78096aab842d934a76bad0ab
1ayhp9v4m4rdhjmnl2bq3cibrbqqkgjbl3s7yk2nhlh8vj3ay16g
$ nix-hash --to-base16 --type sha256 1ayhp9v4m4rdhjmnl2bq3cibrbqqkgjbl3s7yk2nhlh8vj3ay16g
cf04af86dc085268c5f4470fbae49b18afbc221b78096aab842d934a76bad0ab
```

You don't need to encode hashes in Nix's custom base 32 format before using them. The normal base 16 format works just fine.

### Fetch Git repositories with `fetchgit`

If the source code you need is in a Git repository, you can use [`fetchgit`](https://nixos.org/manual/nixpkgs/stable/#fetchgit). It expects at least one extra attribute compared to `fetchurl`, the attribute `rev`. This can be the full Git commit ID (the `sha1` hash) or a tag name, like `v2.12`.

Try the following `replit.nix` file:

```nix
{ pkgs }:

let
  hello = pkgs.stdenv.mkDerivation rec {
    pname = "hello";
    version = "2.12";
    src = pkgs.fetchgit {
      url = "https://github.com/ritza-co/simple-hello-world-demo.git";
      rev = "v${version}";
      sha256 = "1111111111111111111111111111111111111111111111111111";
    };
  };
in {
  deps = [
    hello
  ];
}
```

Once again, after changing `replit.nix`, open the Console tab, and press enter. The output should be similar to:

```
Detected change in environment, reloading shell...
nix error: building nix env: exit status 102
Output has been trimmed to the last 20 lines
executing builder '/nix/store/bm7jr70d9ghn5cczb3q0w90apsm05p54-bash-5.1-p8/bin/bash'
building '/nix/store/6drp4pmqj67b3ysy88fhawz4fdf2kwkb-simple-hello-world-demo.drv'...
exporting https://github.com/ritza-co/simple-hello-world-demo.git (rev v2.12) into /nix/store/hmmp6c24wg43d9cbslmhgrrccvhhaxac-simple-hello-world-demo
Initialized empty Git repository in /nix/store/hmmp6c24wg43d9cbslmhgrrccvhhaxac-simple-hello-world-demo/.git/
remote: Enumerating objects: 462, done.
remote: Counting objects: 100% (462/462), done.
remote: Compressing objects: 100% (333/333), done.
remote: Total 462 (delta 127), reused 462 (delta 127), pack-reused 0
Receiving objects: 100% (462/462), 1.09 MiB | 7.15 MiB/s, done.
Resolving deltas: 100% (127/127), done.
From https://github.com/ritza-co/simple-hello-world-demo
 * tag               v2.12      -> FETCH_HEAD
Switched to a new branch 'fetchgit'
removing `.git'...
hash mismatch in fixed-output derivation '/nix/store/bj8zf0n8xdfrkj5mndmlhg34ac3pd91l-simple-hello-world-demo':
  wanted: sha256:1111111111111111111111111111111111111111111111111111
  got:    sha256:1mc1vrixpkzkdnvpzn3b01awvha6z7k2dnpai3c6g89in8l1wr70
cannot build derivation '/nix/store/gw50rkh9d2m4hxiyyldcz6wk0hf76pkx-hello.drv': 1 dependencies couldn't be built
error: build of '/nix/store/gw50rkh9d2m4hxiyyldcz6wk0hf76pkx-hello.drv' failed
```

Replacing the `sha256` in the derivation with `1mc1vrixpkzkdnvpzn3b01awvha6z7k2dnpai3c6g89in8l1wr70` will allow the build to succeed (your hash might be different, check the `got: sha256:` line).

There are also fetchers for other version control repositories, such as [`fetchsvn`](https://nixos.org/manual/nixpkgs/stable/#fetchsvn), [`fetchhg`](https://nixos.org/manual/nixpkgs/stable/#fetchhg), or [`fetchcvs`](https://nixos.org/manual/nixpkgs/stable/#fetchcvs).

### Fetch code from GitHub with `fetchFromGitHub`

The `fetchFromGitHub` fetcher doesn't take a `url` attribute, instead replacing it with `owner` and `repo` attributes.

Try the following `replit.nix` file:

```nix
{ pkgs }:

let
  hello = pkgs.stdenv.mkDerivation rec {
    pname = "hello";
    version = "2.12";
    src = pkgs.fetchFromGitHub {
      owner = "ritza-co";
      repo = "simple-hello-world-demo";
      rev = "v${version}";
      sha256 = "1111111111111111111111111111111111111111111111111111";
    };
  };
in {
  deps = [
    hello
  ];
}
```

Again, if you switch to the Console tab and pressing enter, the build will fail because we haven't provided the correct hash. Nix will output the correct hash. Use this to get the build to succeed.

There are also fetchers for other Git forges, such as [`fetchFromGitLab`](https://nixos.org/manual/nixpkgs/stable/#fetchfromgitlab), [`fetchFromBitbucket`](https://nixos.org/manual/nixpkgs/stable/#fetchfrombitbucket), or [`fetchFromSavannah`](https://nixos.org/manual/nixpkgs/stable/#fetchfromsavannah). Most work just like `fetchFromGitHub`.

## Building a package

Now that we know how to fetch source code, we need to know how to build it into actual software. Our little `hello` program is built in a stock-standard way, and the default options used by `stdenv.mkDerivation` are perfect for it. Most software is not quite so simple, and will require us to tweak some of these options.

For some common types of software, Nix has [dedicated builders](https://nixos.org/manual/nixpkgs/stable/#chap-language-support) that make those types of software easier to build. Some examples are Python programs or C# programs.

The "standard" builder is `stdenv.mkDerivation`. The dedicated builders are usually wrappers around `stdenv.mkDerivation`, so they inherit much from it. If the software you need to build is written in C or you can't find a dedicated builder for it, use `stdenv.mkDerivation` to build it.

Even if there is a dedicated builder for your software, it's probably a good idea to at least read this next section on `stdenv.mkDerivation` so you understand the fundamentals of building a package in Nix.

### Building with `stdenv.mkDerivation`

So far, we've not really explained what a derivation means in Nix. A derivation is an attribute set that tells Nix what it needs to know to build a package.

It contains information about:

- What other derivations, if any, a derivation depends on;
- What build script to use;
- What platform to build for;
- What arguments and environment variables should be available to the builder; and
- Where Nix should put the results of the build.

As the final part of evaluating a Nix expression that produces a derivation, Nix will save that derivation attribute set to disk in the Nix store as a `.drv` file. It represents the build action. Later, in the build phase, Nix will use this `.drv` file to build the package it describes. If you want to see what one looks like, run the following command in the Console:

```bash
nix show-derivation $(which hello)
```

This will show you `hello`'s derivation file, which was used by Nix to build it.

Before Nix builds a derivation, it will ensure that all the input derivation paths are valid. That is, that those derivations have been built and their outputs exist in the Nix store. If not, it will fetch them from the binary cache, or build those first.

Nix actually has a built-in function called `derivation` that produces derivation attribute sets, but we usually use `stdenv.mkDerivation` instead, which is easier to use. The `stdenv.mkDerivation` builder is not built into the Nix language itself. It's part of Nixpkgs, and evolved over time as the community built more and more packages, incorporating their learnings as useful abstractions.

The minimum attributes that `stdenv.mkDerivation` needs are `name` and `src`. If `name` is not provided, it will attempt to construct it from `pname` + `version`: `"${pname}-${version}"`.

The `stdenv.mkDerivation` builder automates common build tasks and provides common Unix tools: `gcc`, `coreutils`/`findutils`/`diffutils`, `sed`/`grep`/`awk`, `tar`/`gzip`/`bzip2`/`xz`, `make`, `bash`, and `patch`. If your package uses the Unix standard `./configure; make; make install` build procedure (like our earlier `hello` example), you don't even need to tweak the standard build at all. If `stdenv.mkDerivation` doesn't work automatically, you can easily customize or override the various build phases.

Let's take a look at a more complex derivation:

```nix
{ pkgs }:

let
  mle = with pkgs; stdenv.mkDerivation rec {
    pname = "mle";
    version = "1.5.0";

    src = fetchFromGitHub {
      owner = "adsr";
      repo = "mle";
      rev = "v${version}";
      sha256 = "1nhd00lsx9v12zdmps92magz76c2d8zzln3lxvzl4ng73gbvq3n0";
    };

    # Bug fixes found after v1.5.0 release
    patches = [
      (fetchpatch {
        name = "skip_locale_dep_test.patch";
        url = "https://github.com/adsr/mle/commit/e4dc4314b02a324701d9ae9873461d34cce041e5.patch";
        sha256 = "sha256-j3Z/n+2LqB9vEkWzvRVSOrF6yE+hk6f0dvEsTQ74erw=";
      })
      (fetchpatch {
        name = "fix_input_trail.patch";
        url = "https://github.com/adsr/mle/commit/bc05ec0eee4143d824010c6688fce526550ed508.patch";
        sha256 = "sha256-dM63EBDQfHLAqGZk3C5NtNAv23nCTxXVW8XpLkAeEyQ=";
      })
    ];

    # Fix location of Lua 5.4 header and library
    postPatch = ''
      substituteInPlace Makefile --replace "-llua5.4" "-llua";
      substituteInPlace mle.h    --replace "<lua5.4/" "<";
      patchShebangs tests/*
    '';

    # Use select(2) instead of poll(2) (poll is returning POLLINVAL on macOS)
    # Enable compiler optimization
    CFLAGS = "-DTB_OPT_SELECT -O2";

    nativeBuildInputs = [ makeWrapper installShellFiles ];

    buildInputs = [ pcre uthash lua5_4 ];

    doCheck = true;

    installFlags = [ "prefix=${placeholder "out"}" ];

    postInstall = ''
      installManPage mle.1
    '';
  };
in {
  deps = [
    mle
  ];
}
```

This was adapted from [mle](https://github.com/adsr/mle)'s [derivation in Nixpgks](https://github.com/NixOS/nixpkgs/blob/c5edc1d38aaa960a04ad2c675af102debde12462/pkgs/applications/editors/mle/default.nix). Let's break down some of the new concepts in here.

#### Dependencies

If your software depends on other packages that are not part of the standard environment, you can provide them using the `buildInputs` attribute as follows:

```nix
pkgs.stdenv.mkDerivation {
  name = "foo-1.2.3";
  ...
  buildInputs = with pkgs; [libbar perl ncurses];
}
```

You may also see `nativeBuildInputs`, which you can think of as being for build-time dependencies, whereas `buildInputs` is for run-time dependencies. That is an oversimplification, but it's a good approximation.

If you're unsure where to put a dependency, use `buildInputs`. Even if you accidentally put a build-time dependency there, the derivation should still build. It's not ideal, but if you're just trying to get some software into your repl, it'll do just fine.

There are [even more ways to specify dependencies](https://nixos.org/manual/nixpkgs/stable/#variables-specifying-dependencies), but unless you're cross-compiling they're unlikely to matter to you.

#### Patches

One of the great things about Nix is that since it's source built, it has first-class support for applying patches to software.

```nix
pkgs.stdenv.mkDerivation {
  name = "foo-1.2.3";
  ...
  patches = [
    (fetchpatch {
      url = "https://example.com/patches/001_arches_align.patch";
      sha256 = "0i3qclm2mh98c04rqpx1r4qagd3wpxlkj7lvq0ddpkmr8bm0fh0m";
    })

    (fetchpatch {
      url = "https://example.com/patches/002_no_remove_static_const.patch";
      sha256 = "0zfjqmjsj0y1kfzxbp29v6nxq5qwgazhb9clqc544sm5zn0bdp8n";
    })

    (fetchpatch {
      url = "https://example.com/patches/003_64_bit_clean.patch";
      sha256 = "0mda9fkaqf2s1xl6vlbkbq20362h3is9dpml9kfmacpbifl4dx3n";
    })
	];
}
```

Patches are applied in the order that they are listed. They must be in the format accepted by the `patch` command, and may optionally be compressed using `gzip`, `bzip2`, or `xz`.

They can be local files, or you can fetch them. Prefer using `fetchpatch` rather than `fetchurl` to fetch patches. It works similarly, but it performs normalization on the patches before computing the hash, such as removing comments and unstable parts sometimes added by version control systems that change over time (and which would otherwise cause the hash to change).

#### Environment variables

Any attributes that you set on `stdenv.mkDerivation` will also be made available in the build environment as environment variables. Be aware that they'll be set in all phases if you set them this way.

### Build phases

The standard builder script has several phases, which are defined as bash functions. You can influence the behaviour of each phase by setting specific attributes on `stdenv.mkDerivation`, some of which are detailed below. The most common phases are as follows, in order:

1. [`unpackPhase`](https://nixos.org/manual/nixpkgs/stable/#ssec-unpack-phase): This should unpack the source into the current directory. The default implementation simply unpacks the derivation's `src` files.
   - By default it supports plain tar archives, or those compressed by gzip (`*.tar.gz`, `*.tgz` or `*.tar.Z`), bzip2 (`*.tar.bz2`, `*.tbz2` or `*.tbz`) or xz (`*.tar.xz`, `*.tar.lzma` or `*.txz`).
   - It can also automatically unpack zip files. Zip files are unpacked using the `unzip` package, which is not in the standard environment. Add it to `nativeBuildInputs`.
   - Setting `dontUnpack` to `true` will skip this phase.
1. [`patchPhase`](https://nixos.org/manual/nixpkgs/stable/#ssec-patch-phase): The patch phase applies any supplied `patches` to the unpacked source code.
   - `patchFlags` sets flags to be passed to `patch`. If not set, the argument `-p1` is used, which causes the leading directory component to be stripped from the file names in each patch.
   - Setting `dontPatch` to `true` skips this phase, but if `patches` is not set it's also skipped.
1. [`configurePhase`](https://nixos.org/manual/nixpkgs/stable/#ssec-configure-phase): Prepares the source tree for building. By default, it runs `./configure` if it exists.
   - Set `configureScript` to change the configure script. Defaults to `./configure`.
   - Set `configureFlags` to pass additional arguments to the configure script.
   - By default, `--prefix=$prefix` is added to the configure flags. Set `dontAddPrefix` to disable this.
   - Set `prefix` to set the `$prefix` variable above (remember how attributes defined here are also exposed as environment variables). By default this is set to `$out`, which is the output directory that Nix creates for your package in the Nix store.
   - Setting `dontConfigure` to `true` will skip this phase.
1. [`buildPhase`](https://nixos.org/manual/nixpkgs/stable/#build-phase):
   - Set `makeFile` to change the name of the MakeFile.
   - Set `makeFlags` to pass additional flags to `make`.
   - Set `buildFlags` to pass additional flags to `make`, but only called during the build phase.
   - Setting `dontBuild` to `true` will skip this phase.
1. [`installPhase`](https://nixos.org/manual/nixpkgs/stable/#ssec-install-phase):
   - Set `installFlags` to pass additional flags to `make`, that will only be called during the install phase.
   - Remember that `makeFlags` will also affect this phase.
   - Setting `dontInstall` to `true` will skip this phase.

You can override any of these phases by setting an attribute with the phase's name. It will be executed as a bash script in the standard environment.

You can also adjust the build by running code before and after each phase. Set at attribute with either `pre` or `post` and the phase's name (capitalized), e.g. `preConfigure` or `postBuild`.

You can add yet more phases before or after each of these phases, or even reorder them completely. Read the [documentation for build phases](https://nixos.org/manual/nixpkgs/stable/#sec-stdenv-phases) for details on how to do that.

Here we've covered the basics. Read [`stdenv.mkDerivation`'s documentation](https://nixos.org/manual/nixpkgs/stable/#chap-stdenv) for more. Remember that this is the basis for the largest software repository, and as such there's a lot it is capable of.

### Shell functions and utilities

The standard environment also has a few [shell functions and utilities](https://nixos.org/manual/nixpkgs/stable/#ssec-stdenv-functions) that may be helpful if you're making adjustments to the phases above, such as:

- [`substituteInPlace`](https://nixos.org/manual/nixpkgs/stable/#fun-substituteInPlace), which performs substitutions in files, especially handy to replace references in scripts to executables in nix derivations to get them to work correctly:
  ```
  substituteInPlace ./foo.sh \
    --replace /usr/bin/bar $bar/bin/bar \
    --replace /usr/bin/baz $bar/bin/baz
  ```

### Dedicated builders

As we touched on before, `stdenv.mkDerivation` is not the only builder. Many frameworks, programming languages, or build systems have dedicated builders that provide conveniences and abstractions for their idiosyncrasies. Be sure to have a look at [builders for specific languages and frameworks](https://nixos.org/manual/nixpkgs/stable/#chap-language-support) in the Nixpkgs manual.

It is not necessarily an exhaustive list. Even if you don't see a dedicated builder for your use case listed in the manual, there may still be one. The best way to find out is to have a look at [source code in Nixpkgs](https://github.com/NixOS/nixpkgs), which is hosted on GitHub.

Look for terms, tools, and commands that are specific to your ecosystem. You can use GitHub's web search, or make a local clone of the repo to `grep` (consider making a shallow clone using git's `--depth=1` flag, as it's quite a big repository with many branches and a long history).

### Package setup hooks

[Hooks](https://nixos.org/manual/nixpkgs/stable/#ssec-setup-hooks) are scripts that are run during the build if a dependency uses them. If a dependency of your derivation uses a hook, that hook will be run during the build of your derivation.

You should not use hooks directly, but be aware that depending on packages that use hooks may change the way your build works. Even `stdenv.mkDerivation` includes some hooks, for example, to place docs in the right place, to remove debug symbols, or to compress man pages.

There are hooks for specific technologies, for example, the `cmake` derivation uses the [`cmake` hook](https://nixos.org/manual/nixpkgs/stable/#cmake), which makes some changes to `stdenv.mkDerivation` for Cmake projects. Thus, including `cmake` (the derivation) in the `nativeBuildInputs` of your derivation will change the way it works. You can use the `cmakeFlags` attribute in this situation.

## Further reading

For more information, be sure to take a look at:

- Nix Pills [6: Our First Derivation](https://nixos.org/guides/nix-pills/our-first-derivation.html), [7: Working Derivation](https://nixos.org/guides/nix-pills/working-derivation.html), and [8: Generic Builders](https://nixos.org/guides/nix-pills/generic-builders.html) for a gradual build up to `stdenv.mkDerivation` from first principles.
- The [Nixpkgs manual](https://nixos.org/manual/nixpkgs/stable/), the authoritative reference, which includes further information, such as advanced features we haven't gotten into here. Of particular interest might be the section on [trivial builders](https://nixos.org/manual/nixpkgs/stable/#chap-language-support) for creating things like text files or shell scripts.
- [Packaging/Binaries on the NixOS Wiki](https://nixos.wiki/wiki/Packaging/Binaries). You may need to use a pre-compiled binary file. This is most common with proprietary software.
