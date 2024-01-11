# The Webview

The Webview is a specialized Tool for previewing and debugging your web application.

![Webview](https://docimg.replit.com/images/programming-ide/webview.png)

By default, when your Repl exposes an HTTP server, the Webview will automatically open. If you don't want this intrusive behavior, there is a setting to [turn it off](/programming-ide/workspace-features/preferences#automatially-open-the-webview-then-a-port-is-open).

## Domain Linking

Click on the Pencil icon on the right side of the URL bar to add a custom domain to your Repl. For instructions on how to do this, see [Connecting your domain to your Repl](/hosting/custom-domains).

*Please note that domain linking for development hosting will be deprecated on January 1st, 2024 and may not appear in the webview you for you, if you would like to deploy your app to a domain you own consider using [production deployments](/hosting/deployments/about-deployments). Read more about the transition [in our blog post](https://blog.replit.com/hosting-changes)*.

## Devtools

Click on the Wrench icon to open the developer tools in the Webview. The Developer tools will allow you to see console logs, inspect elements, view network requests, and more.

![Devtools](https://docimg.replit.com/images/programming-ide/webview-devtools.png)

## FAQs

### Why can't I edit the URL in the webview?

The URL shown in the webview is read-only and points to the root route of your Repl's web output through the [`<iframe>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe) HTML element. To test a different route, click the button on the far right to open your project's web output in a new browser tab.

### What's the difference between the Webview and an [Extension](/extension/intro)?

The Webview is a normal iframe and an Extension establishes a special handshake with the Replit workspace. Read more [here](/extensions/faq#whats-the-difference-between-the-webview-and-an-extension).
