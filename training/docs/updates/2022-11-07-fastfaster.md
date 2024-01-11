---
title: Infrastructure Upgrades and Mobile Fixes
description: Replit is now faster and the mobile app is better!
slug: infra-and-mobile
authors:
  - name: Dave Madden
    title: Support Engineer
    url: https://replit.com/@dave
    image_url: https://avatars.githubusercontent.com/u/58042797?s=400&u=ad1218e882cb4ebff060b24b97178562d7ed43a7&v=4
tags: [updates, performance, infrastructure, mobile]
image: https://docimg.replit.com/images/updates/2022-11-07/halflatencyagain.png
hide_table_of_contents: false
---

This week we merged 441 pull requests, pushed 1,172 commits, and added 49,440 lines of code to our codebases. See what we shipped: 👇

## What we shipped

### Matt and Madison made all the fast things..._even faster_

[Last week](/updates/introducing-replit-updates) [Bradley](https://replit.com/@bheilbrun) found a way to cut Replit.com's p95 latency _in half_.

This week it appears that [Madison](https://replit.com/@MadisonFitch) and [Matt Iselin](https://replit.com/@mattiselin) have **cut latency in half again!**

Take a look at this chart and see if you can tell when we shipped the changes:
<img
  src="https://docimg.replit.com/images/updates/2022-11-07/halflatencyagain.png"
  alt="a graph of Replit.com's p95 latency"
/>

What does this mean for you? It means the slowest 5% of requests to Replit.com now respond in 1/4 the time they did two weeks ago. _And we're not done._

> Editor's Note: if you say "Madison" and "Matt Iselin" one right after another a few times, they sound exactly the same. This has been extremely confusing for us at times (on account of them actually being two different people), so we thought we should do our civic duty and spread our confusion by sharing it.

### The mobile app keeps getting better

It’s been three weeks since we launched our amazing [mobile app](https://replit.com/mobile), and we’ve been hard at work making it even better!

- [Laima](https://replit.com/@replitlaima) and [Abdel](https://replit.com/@abdelWithReplit) added the ability to give your Repl a name as you're creating it.
- [Ian](https://replit.com/@inkRepl) fixed a bug with the Git plugin so now you can incorporate your version control workflows in mobile without issue!
- Ian also fixed a bug where the workspace wouldn't scroll to the correct position when the keyboard was open.
- [Matthew](https://replit.com/@MCChen) fixed a bug where, if an Android user's primary browser was FreeAdblocker, the browser would prevent them from being able to log in to the Replit app. Now the app overrides the default browser for a smooth login!

## What we polished

- [Giuseppe](https://replit.com/@giuseppeatreplit) shipped performance improvements to [Ghostwriter](https://replit.com/site/ghostwriter)'s Explain Code feature.
- [Samip](https://replit.com/@samipdahal) and [Muhammad](https://replit.com/@msareini) deployed `batched codegen` to help reduce latency for all our Ghostwriter features.
- [Larry](https://replit.com/@larry-stone) and Aman shipped the just-in-time Cycles purchase experience for Power Ups to make it easier to get started with Ghostwriter.
- [Eddie](https://replit.com/@eddieatreplit) made your favorite teacher's day with some substantial quality-of-life improvements to Teams for Education including the ability to copy courses and solutions to the next year.

## Behind the Repls

### Jesse conquered the Dome (again)

Those of you who've written into Replit Support have probably exchanged emails with [Jesse](https://replit.com/@jesse). (It's possible those emails contained references to [a certain book](https://www.thebeginningofinfinity.com/), but we'll talk about that another time.) What you may not know about Jesse is that he's an accomplished rock-climber, who spent last weekend climbing [Half Dome](https://en.wikipedia.org/wiki/Half_Dome).

Just take a look at this. Yes, these are actual pictures of an actual Jesse climbing the actual rock:
<img
  src="https://docimg.replit.com/images/updates/2022-11-07/climber.jpg"
  alt="Jesse climbing Half Dome"
/>
<img
  src="https://docimg.replit.com/images/updates/2022-11-07/hdsunset.jpg"
  alt="the sun setting as Jesse climbs"
/>

This made Replit Founding Engineer [Faris](https://replit.com/@masfrost) extremely uncomfortable until Talor helpfully reminded him that "less people die climbing than they do _not_ climbing." This made Faris feel better and all was right with the world for a moment.
