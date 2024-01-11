---
title: Replit India, Git upgrade, and Polish
description: We launched Replit India, seamless Git integration with the shell, and did a ton of polishing!
authors:
  - name: Conner Ow
    title: Support Engineer
    url: https://replit.com/@IroncladDev
    image_url: https://storage.googleapis.com/replit/images/1662665479969_1173707b428ef17419de4940af146e6a.png
tags: [updates, cycles, bounties, polish]
image: https://docimg.replit.com/updates/thanksgiving.png
hide_table_of_contents: false
---

Welcome back to the Replit Changelog!

We merged a total of **866** pull requests in the past two weeks. In addition to the major launches we shipped this week, we also have some small polish changes.

## Replit India

We launched [Replit India](https://replit.com/india) to improve the speed and performance of the coding experience for developers located far from the United States. You can now choose between the United States and the India server clusters.

![Replit india](https://docimg.replit.com/updates/thanksgiving.png)

Navigate to your [account](https://replit.com/account), change your **server location**, and fire your Repls up with minimal latency.

![india server](https://docimg.replit.com/updates/india-server.png)

## Git in the Shell

We just shipped a smoother Git experience in the shell. Instead of manually entering your Git credentials for each command, simply grant Replit access to your credentials, allowing for seamless control of your repositories without any authentication issues.

![Git in the shell](https://docimg.replit.com/updates/git.gif)

Many thanks to [Ryan](https://replit.com/@ryantmreplit) for all his hard work in making the Git experience better for everyone.

## Repl Shop Upgrade

Ready to gear up in Replit merch? Check out the new and upgraded [Repl Shop](https://shop.replit.com).

## Bounties Page Redesign

The [Bounties page](https://replit.com/bounties) has undergone a redesign. On top of looking better, you can now view Bounties you've posted and Bounties you're participating in.

![new Bounties page](https://docimg.replit.com/updates/bounties.png)

## Anon Repl Redesign

Have you checked out the [Replit dog](https://replit.com/dog) or the [Replit cat](https://replit.com/cat) before? Unfortunately you won't be directed to a cute dog or cat GIF, instead you'll land on an **Anonymous Repl**. Anonymous Repls are Repls that don't have an owner and give you a complete surprise if you fork them.

Thanks to our famous and amazing designer Clément Rozé, also known as [Bookie0](https://replit.com/@Bookie0), the page for anonymous Repls has been updated to use our [Design System](https://blog.replit.com/rui-eng)

![anon Repl page](https://docimg.replit.com/updates/anon.png)

Anonymous Repls were more widely used in the past but are now deprecated. If you want to learn more about anonymous Repls, check out the [blog post](https://blog.replit.com/anon).

## Markdown Component Redesign

Did you know you can have an element that hides and shows content in Markdown files? You can use the `<details>` and `<summary>` html tags to do this as in the image below:

![details-summary in Markdown](https://docimg.replit.com/updates/md-show-hide.png)

We fixed these components that used to render with poor spacing.

Speaking of Markdown, we recently published a [Markdown tutorial](/tutorials/markdown) covering everything from basic to advanced syntax, as well as custom renderers for Loom videos, Figma canvases, and more.

## Badge Overflow fix

Who doesn't love to have tons of badges on their Replit profile? [Faris](https://replit.com/@masfrost) sure loves to! Before, creators with many badges would find some of them hiding behind the showcased Repl on their profile.

![badge overflow](https://docimg.replit.com/updates/badge-overflow.png)

Be sure to show your gratitude to the [CSS grandmaster](https://replit.com/@Bookie0) for this and lots of other UI polish.

![faris profile look noice now](https://docimg.replit.com/updates/faris.png)
