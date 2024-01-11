---
title: A New Sidebar (and Header)
description: We redesigned the Workspace Sidebar and Header, and polished a lot of stuff.
authors:
  - name: Bardia Pourvakil
    title: Support Engineer Manager
    url: https://replit.com/@bardia
    image_url: https://avatars.githubusercontent.com/u/24982590?v=4
tags: [updates, workspace, sidebar, mobile]
image: https://docimg.replit.com/images/updates/2022-12-05/sidebar-redesign.png
hide_table_of_contents: false
---

Welcome back to another edition of Replit Updates!

In the last two weeks, we merged 579 pull requests across our codebases, here are the highlights:

## Workspace Sidebar + Header Redesign

We redesigned the sidebar to make it into a launcher for tools and files. Previously, we had a bunch of tools (like packager and debugger) which were “trapped” inside of the sidebar. This redesign lets us open both tools and files as tabs, and makes it much easier for us to set up the workspace for extensions. We also redesigned the header to make it more compact and focused.

![Sidebar redesign](https://docimg.replit.com/images/updates/2022-12-05/sidebar-redesign.png)

## Learn Java with BloomTech

We just added a new beginner-friendly [course](https://replit.com/learn/bloomtech-sketch-app) to our Learn page! In this series of daily lessons taught by BloomTech's lead Java instructor, you will learn Java by creating an end-to-end application that allows you to draw and paint on a canvas.

## Mobile App Updates

- Added teams to the mobile app, which can be accessed from the account tab. — Abdel Rahman Elleithy
- Added Replit Reps badges to profile pag. — Ian Kirkpatrick
- Added a new page to view Cycles transactions. — Abdel Rahman Elleithy
- Fixed some login issues. — Matthew Chen.
- Stopped showing owner picker if user doesn't have any teams. — Abdel Rahman Elleithy
- Stopped showing Edit/Delete Repl Metadata buttons for users that don't own the Repl. — Ian Kirkpatrick
- Stopped showing confusing PWA banner. — Laima Tazmin

## Workspace Polish

- Added border styles for active/inactive, floating/tiled and dragging states for panes. — Moudy Elkammash.
- Added a button to the navbar to access the Chat feature. — Devin Halladay
- Added focus indicator for Console and Shell trash and search UI. — Talor Anderson
- Upgraded `.draw` files to use the latest Excalidraw, which comes with image support, more advanced drawing tools, and much more. — Jeremy Press and Ornella Altunyan
- Improved the visual design of the new tab pane. — Moudy Elkammash
- Increased the max width of file path tooltip to account for arbitrarily long paths. — Moudy Elkammash
- Fixed an issue issue where the autocomplete menu would flash while typing. — Xiaoyi Chen
- Fixed a bug where Select All Occurrences code action wasn't working. — Moudy Elkammash
- Fixed a bug where the Kaboom learn tab wasn't working. — Tiga Wu
- Fixed an issue with .pedit files not working. — Tiga Wu
- Fixed an issue where other users' cursor tooltips would render outside the code editor, covering other pieces of UI. — Alexandre Cai
- Fixed a bug with JSX parsing that led to indentation issues. — Brian Pool
- Fixed a bug where you needed to hit the down arrow twice after opening up file search to start going through the results. — Moudy Elkammash
- Removed the refresh app component in the navbar. — Gian Segato

## Teams for Edu Fixes

- The checkbox for making the team invite privacy links is moved to the team creation modal instead of the manage members modal. — H
- Other ways to add users such as from CSV or from google classrooms are disabled for teams with privacy invites. — H
