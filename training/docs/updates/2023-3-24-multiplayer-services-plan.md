---
title: Bounties Services and polish
description: We redesigned the Multiplayer modal, added Services, and surfaced what Repls are included in your plan.
authors:
  - name: Conner Ow
    title: Support Engineer
    url: https://replit.com/@IroncladDev
    image_url: https://storage.googleapis.com/replit/images/1662665479969_1173707b428ef17419de4940af146e6a.png
tags: [bounties, services, multiplayer]
image: https://docimg.replit.com/updates/services.png
hide_table_of_contents: false
---

Welcome back to another edition of Replit Updates!

In the past two weeks we merged a total of 874 pull requests. Our top contributor this week is [Moudy Elkammash](https://replit.com/@moudy) who landed 87 merged pull requests.

# Launches & New Features

## Multiplayer Menu Redesign

[Devin Halladay](https://replit.com/@theflowingsky) redesigned the multiplayer popover menu you use to invite people to your Repl with. Easily access, manage and invite collaborators from this menu.

![Multiplayer popover redesign](https://docimg.replit.com/updates/multiplayer.png)

## Bounties Services

Programmers are talented in many different areas, and some Bounties may not match the the skillset you offer. We've turned the model around so that you as a Bounty Hunter can name your price and post a listing of what **you** want to build for others.

At the moment, posting a Bounty Service has been whitelisted to a small group of users. If you want to post a service, you can [sign up for access](https://replit.typeform.com/to/H3LScOzC), or ask one of these amazing creators to build something cool for you!

![Bounty Services](https://docimg.replit.com/updates/services.png)

## Billing polish

You can now see what Repls are included in your plan as well as the ones you are spending cycles on.

![Plan Surfacing](https://docimg.replit.com/updates/plan-surfacing.png)

# Workspace polish

We've done a lot of polishing Replit workspace in the past two weeks. Here are some highlights.

## 1. LSP

Having two of the same TypeScript files open at the same time and coding in either of them would cause the Language Server Protocol (LSP) to hallucinate and show errors that didn't exist. [Giuseppe](https://replit.com/@giuseppeatreplit) fixed this bug, providing everyone with a better TypeScript experience on Replit.

## 2. New tab focus

Clicking on the "+" icon next to your tabs wouldn't focus the search bar. Opening a new tab should automatically place your focus there and enable you to search for the things you need faster.

## 3. Scala Syntax Highlighting

Recently, if you had `var hola = '"'` in your Scala code, the syntax highlighting wouldn't display correctly. [Sergei](https://replit.com/@SergeiChestakov) swiftly created a fix for this, improving the development experience for Scala developers.

## 4. Markdown commenting

Did you know you can add code comments in Markdown files? There was an issue where `cmd/ctrl + /` keyboard shortcut was highlighting the entire file - now it works as expected.

## 5. JSX Commenting

Commenting out React Components with the `cmd/ctrl + /` keyboard shortcut used to result in normal Javascript comments `//` being used instead of a block comment `{/* ... */}`. Thanks to [super-fast-shipping Sergei](https://replit.com/@SergeiChestakov), this issue has been resolved.

# New Templates and Repls

### [GPT-4 Chat UI](https://replit.com/@zahid/GPT-4-Chat-UI?v=1)
[Zahid Khajawa](https://replit.com/@zahid) made a user interface capable of using GPT-4 as well as GPT-3.5-turbo.  Simply provide your own API key and you've got a fully-functional Chat UI.  Check it out at https://replit.com/@zahid/GPT-4-Chat-UI?v=1

### [OpenAI Node.js GPT-4](https://replit.com/@replit/OpenAI-Nodejs-GPT-4?v=1)
Replit has a [Node.js template](https://replit.com/@replit/OpenAI-Python-GPT-4?v=1) that allows you to access the GPT-4 AI Model using Node.js

### [OpenAI Python GPT-4](https://replit.com/@replit/OpenAI-Python-GPT-4?v=1)
If you're a python developer, you can use GPT-4 by accessing the OpenAI API in [this template](https://replit.com/@replit/OpenAI-Python-GPT-4?v=1).

# Content

## [Building Ghostwriter Chat](https://blog.replit.com/ghostwriter-building)
See how Replit built Ghostwriter Chat, how it works, and some tips on how to use it better.  [Read More](https://blog.replit.com/ghostwriter-building).

## [An update to cover pages](https://blog.replit.com/new-cover-page)
A couple of weeks ago, Repl cover pages were extremely cramped, only allowing a very small view of a Repl's output.  We've expanded the cover page to utilize almost the entire screen, enabling you to have a better view of the Repl you're browsing, and have all the social content accessible from the side at all times.  Read more on the [blog post](https://blog.replit.com/new-cover-page).

![cover page update](https://blog.replit.com/images/new-cover-page/new-cover-page.png?v=1679415104765)

## [Outbount Data Transfer Limits](https://blog.replit.com/announcing-outbound-data-transfer-limits)
Beginning April 7th, Replit will start enforcing limits on the amount of outbound data that developers can transmis from their Repls.  See the [blog post](https://blog.replit.com/announcing-outbound-data-transfer-limits) for more information.

## [Applications of Generative AI](https://youtu.be/IAbhei16pL8)
Watch AI Legends Amjad Masad, Jim Fan, and Michele Catasta talk about advancements in Generative AI, the NVIDIA GTC event, and multi-modality.  [Watch on youtube](https://youtu.be/IAbhei16pL8)