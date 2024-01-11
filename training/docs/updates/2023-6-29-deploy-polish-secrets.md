---
title: Secrets, Deployment Hypercharge, and Polish
description: We added secret configuration, improved the speed to deploy a Repl, and did some polish.
authors:
  - name: Conner Ow
    title: Support Engineer
    url: https://replit.com/@IroncladDev
    image_url: https://storage.googleapis.com/replit/images/1662665479969_1173707b428ef17419de4940af146e6a.png
tags: []
image: https://docimg.replit.com/updates/git-diffs.png
hide_table_of_contents: false
---

Welcome back to another edition of the Replit Changelog!

In the past three weeks, we merged a total of 914 Pull Requests.

## Faster Deployments

For larger applications, large packages were causing the build phase to take a long time, leading some deployments to time out.

We shipped a change that reduced the deployment time for larger applications by a few minutes.

We also added a nice touch of design to the deployment process 🎨

![Deployment Progress](https://docimg.replit.com/images/changelog/deploy-steps.png)

## Secrets Configuration

Digging through existing code to find out how to set the correct environment variables is a time-consuming process, especially for building full stack apps.

After forking a Repl, the key names of existing Environment Variables will now be set in Replit Secrets.

![Configuring Secrets](https://docimg.replit.com/images/changelog/secrets-config.png)

## Search and Replace

Navigating large projects requires fast and responsive search. Using ripgrep and crosis, we built the functionality to search your Repls. We then used a variety of streaming techniques to make it fast.

Read More: https://blog.replit.com/the-journey-to-code-search

![Code Search and Replace](https://blog.replit.com/images/the-journey-to-code-search/query-history.gif?v=1687886974039)

## Icons in Account Options

When you click on your username in the Sidebar, you will see a list of options leading to different parts of the site. We recently added some icons for a more intuitive design.

![No icons](https://docimg.replit.com/images/changelog/profile-no-icons.png)
![With Icons](https://docimg.replit.com/images/changelog/profile-icons.png)

## Extension Logs

We added a new section to the Developer Tools pane for Extensions developers. Debugging is now a lot easier during the development process.

![Extension Logs](https://docimg.replit.com/images/changelog/extension-logs.png)

## Discord Usernames

With Discord's recent [migration to adopt usernames](https://discord.com/blog/usernames), four-number discriminators are slowly being removed from usernames. We now support this format as a profile customization option.

![Discord Username](https://docimg.replit.com/images/changelog/discord-username.png)
