---
title: Connection stability, bandwidth, and polish
description: Less Repl reconnects for Pro, Hacker and Teams users, introduced outbound data transfer limits, and more.
authors:
  - name: Conner Ow
    title: Support Engineer
    url: https://replit.com/@IroncladDev
    image_url: https://storage.googleapis.com/replit/images/1662665479969_1173707b428ef17419de4940af146e6a.png
tags: []
image: https://docimg.replit.com/updates/egwess.png
hide_table_of_contents: false
---

Welcome back to another edition of Replit Updates!

In the past two weeks we merged a total of 906 pull requests.

# Features & Launches

## Less Repl Reconnects

Repls are computers that live in the cloud. If the virtual machine behind your Repl disconnects, you will lose your network link and your Repl will restart, interrupting your coding session.

All users on Hacker, Pro, or Teams plans will see a 10x reduction in container restarts while coding in the Workspace. Now you can code for multiple hours straight without a single restart.

See the [blog post](https://blog.replit.com/regular-vms) and our [partnership with Google Cloud](https://blog.replit.com/google-partnership).

## Outbound Data Transfer Limits

Outbound Data Transfer, often referred to as bandwidth or egress, is the amount of data your Repl transmits to users and extenal services. As of April 7th, we have started to enforce this limit.

We started limiting egress since abusive Repls were keeping costs high. Now that we are paying for less abuse, we used our savings to enable [non-pre-emptible VMs](#less-repl-reconnects).

![bandwidth pricing](https://blog.replit.com/images/outbound-data-transfer/pricing-table.png)

On the [Account Page](https://replit.com/account) under Resource Usage, you will see a meter for Outbound Data Transfer. Regardless of your plan, you can increase your monthly bandwidth quota for ten cycles per GiB.

![data transfer indicator](https://docimg.replit.com/updates/egwess.png)

## Tab Dropdown Options

Clicking on the header of a file tab will show a dropdown menu. We've added the options to copy the file path, copy the link to the file, and even download it!

![dropdown](https://docimg.replit.com/updates/dropdwn.png)

# Workspace Bug Fixes

## Search Priority

In a large codebase, there are often many files with the same name. Previously if you opened the command bar and searched for a file, all matches would display in random order. Files are now organized hierarchically, or by file depth.

### Before

<img src="https://docimg.replit.com/updates/search-order-before.png" width="400"/>

### After

<img src="https://docimg.replit.com/updates/search-order-after.png" width="400"/>

## Declaration Highlighting

The `declare` keyword in TypeScript files were previously not highlighted as valid keywords. [Sergei Chestakov](https://replit.com/@SergeiChestakov) smashed this bug almost instantly.

### Before

<img src="https://docimg.replit.com/updates/declare-before.png" width="400"/>

### After

<img src="https://docimg.replit.com/updates/declare-after.png" width="400"/>

## Type Folding

You can now fold types and interfaces in the editor! Huge thanks to [Giuseppe Burtini](https://replit.com/@giuseppeatreplit) who implemented this fix.

<img src="https://docimg.replit.com/updates/fold-interface.png" width="400"/>

# Polish

## Location Alignment

The Location map pin on user profiles wasn't aligned with the text correctly. The polish king [Bookie0](https://replit.com/@Bookie0) identified and fixed this pesky CSS issue.

### Before

<img src="https://user-images.githubusercontent.com/64614924/229367734-c5619fac-336c-416d-ad49-66150a81cdf5.png" width="400"/>

### After

<img src="https://user-images.githubusercontent.com/64614924/229367733-0751ec58-1d3c-4337-bb8f-7096b018ceac.png" width="400"/>

## Account Dropdown Hover State

When opening the dropdown in the sidebar by clicking on your username or profile image, the items in the dropdown didn't change color if you hovered over them. Once more, [Bookie0](https://replit.com/@Bookie0) hopped in and saved the day with his amazing CSS skills!

### Before

<img src="https://user-images.githubusercontent.com/64614924/227723773-ac46ebf9-f53c-47e9-97af-bed026eb9ef3.png" width="400"/>

### After

<img src="https://user-images.githubusercontent.com/64614924/227723775-b6fc4917-029c-4940-b9dc-d22a9a702cb9.png" width="400"/>
