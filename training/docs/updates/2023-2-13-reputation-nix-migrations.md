---
title: Migrations & Bounty Reputation system
description: Migrated old Repls to nix and shipped the Bounty Reputation system
authors:
  - name: Conner Ow
    title: Support Engineer
    url: https://replit.com/@IroncladDev
    image_url: https://storage.googleapis.com/replit/images/1662665479969_1173707b428ef17419de4940af146e6a.png
tags: [updates, nix, bounties, typescript]
image: https://docimg.replit.com/images/animations/nix-migration.gif
hide_table_of_contents: false
---

Welcome back to another edition of the Replit Changelog!

In the past two weeks we merged 915 pull requests. Our top contributor this week is [Bookie](https://replit.com/@Bookie0) who landed 58 merged pull requests.

# Nix Migration

![migrating to nix](https://docimg.replit.com/images/animations/nix-migration.gif)

Before incorporating Nix, Replit used [Polygott](https://github.com/replit/polygott) as its primary language support engine. However, with the adoption of Nix, we have begun phasing out Polygott. Some older Repls may still be using Polygott, and if you fork one of these older Repls, your Repl will also run on Polygott. However, now Replit will automatically migrate the forked Repl to use Nix.

# Bounty Reputation System

You can now review Bounty Hunters and receive ratings for your work on Bounties.

![bounty review](https://docimg.replit.com/images/animations/review-hunter.gif)

After receiving a review, your reputation can be viewed and evaluated by a Bounty Poster.

![bounty review](https://docimg.replit.com/images/animations/bounty-hunter-review.gif)
