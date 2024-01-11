---
title: Storage, Inline Ghostwriter, and Ports
description: We introduced Account-level storage, inline Ghostwriter functionality, redirect you when a port isn't on the right host, redesigned the Preferences pane in the Workspace, improved the Extensions Store, and allow you to delete multiple Repls at once.
authors:
  - name: Conner Ow
    title: Support Engineer
    url: https://replit.com/@IroncladDev
    image_url: https://storage.googleapis.com/replit/images/1662665479969_1173707b428ef17419de4940af146e6a.png
tags: []
image: https://docimg.replit.com/images/changelog/account-storage.png
hide_table_of_contents: false
---

Welcome back to another edition of the Replit Changelog!

In the past three weeks, we merged a total of 823 Pull Requests.

# Account-Level Storage

![Account-level Storage shown in Resources](https://docimg.replit.com/images/changelog/account-storage.png)

Repls were previously limited to a storage limit of 1GB each.  This made it difficult and sometimes even impossible to run larger projects on Replit.

The maximum storage capacity of a Repl has been bumped from a single Gigabyte to 256GiB.

Read more on the [Blog Post](https://blog.replit.com/replit-storage-the-next-generation)

# Inline Ghostwriter

Ghostwriter's **Code Generation** and **Code Transformation** features have gotten a major upgrade and now appear inline with your code rather than a popover that blocks your view.

## Inline Transformation

Select a portion of code, right-click, and select **Edit Code**.  Submit a prompt and Ghostwriter will show you a code suggestion in the form of a diffed view.  You can toggle between Comparison mode, your original code, and Ghostwriter's suggestion.

![Inline Transform](https://docimg.replit.com/images/changelog/inline-transform.png)

## Inline Code Generation

Similarly to Code Transformation, Right-click and select **Generate Code**.  Enter a prompt and Ghostwriter will provide a suggestion.

![Inline Generate](https://docimg.replit.com/images/changelog/inline-generate.png)

# Host Redirection

To expose a web output, you are required to run an HTTP port on the host `0.0.0.0`.  If this is not the case, no web output will be forwarded.

If you accidentally run an HTTP port on the wrong host, you will get a popup indication.

![Host Redirection](https://docimg.replit.com/images/changelog/port-direct.png)

# Editor Preferences Redesign

We've redesigned the Settings pane to use a cleaner and more intuitive design.  Keybinds now have their own tab so as not to take up so much space.

![Settings Redesign](https://docimg.replit.com/images/changelog/new-settings.png)

# New Extensions Store

In and outside of the workspace, we've updated the Extensions Store to look and perform a lot better.  Additionally, you can sort and filter extensions to find the one you need instead of scrolling through hundreds of them.

![New Extensions Store](https://docimg.replit.com/images/changelog/store-v2.png)

# Repl Multi-Deletion

You can now select and delete multiple Repls at the same time rather than deleting each one individually.  Hover over a Repl and select it by clicking on the checkbox on the left.

![Selection Start](https://docimg.replit.com/images/changelog/selection-start.gif)

After selecting the desired Repls for deletion, press the Trash icon to delete them.

![Selection](https://docimg.replit.com/images/changelog/selection.png)