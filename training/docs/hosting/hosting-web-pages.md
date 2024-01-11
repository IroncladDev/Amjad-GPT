---
sidebar_position: 2
---

*Please note that this form of public hosting (development hosting) will be deprecated on January 1st, 2024, we recommend you use [static deployments](/hosting/deployments/static-deployments) as a more scalable solution. Read more about the transition [in our blog post](https://blog.replit.com/hosting-changes)*.

# Hosting Static Web Pages

You can host web pages and static websites on Replit. Every Repl that hosts websites, including web servers, has a unique URL that you can share with others.

After running a Repl, you can find its URL in the `Webview` tab.

## Where to find my Repl's URL?

Repls are hosted with the following URL Pattern: `http://REPL-NAME--USERNAME.repl.co`, where `REPL-NAME` is the name of the Repl and `USERNAME` is the owner's username.

If you create a Repl with your username as the title (e.g. https://replit.com/@username/username), it will be hosted at: `https://USERNAME.repl.co`.

### End of Life for Dot-Style Domains

**Note:** As of February 17th, 2023, we have switch to using `https://slug--username.repl.co` instead of `https://slug.username.repl.co`. Only users who created their account after the date will have the new URL format. To see which format your account uses, check the URL of your Repl's webview.

## How to Update your Website

Changes to your code will only take effect in the live version once you re-run the project. The changes will be reflected immediately if your Repl is an HTML Repl or an auto-refresh template.

## Hosted Repl Example

Here is an example of a hosted webpage using p5.js. You can view the live, full-screen version [here](https://p5js.replit.repl.co).

<iframe height="800px" width="100%" src="https://replit.com/@replit/p5js?embed=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## How to Use Custom Domains with Hosted Repls

You can link any hosted, Repl to a custom domain that you own. This includes static sites (HTML Repls) and HTTP servers (any repl with a web server). Check out our documentation [here](/docs/hosting/custom-domains.md) to learn how to use Custom Domains.
