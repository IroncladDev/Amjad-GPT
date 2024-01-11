---
sidebar_position: 7
sidebar_label: FAQs
---

# Frequently Asked Questions

### How does my extension get verified?

A Replit staff member must review your Extension and manually verify it.

### My backend server isn't working with my extension

Extensions are expected to be a bundle that can be [statically served](https://blog.hubspot.com/website/static-vs-dynamic-website). This means that you can't run a server in the same Repl as the extension you're hosting. We would recommend separating your server and client for extension development.

### My extension is throwing a timeout error

Make sure you are viewing your extension through the correct pane and not the [webview](https://docs.replit.com/hosting/add-a-made-with-replit-badge-to-your-webview#what-is-the-webview). To correctly open your extension, use the [Extension Devtools](/extensions/development/devtools).

If your extension is opened in the correct pane, hit the Reload icon in the extension tab.

![Reload button](https://docimg.replit.com/extensions/reload-head.png)

### What's the difference between the Webview and an Extension?

The webview is a normal iframe that displays the web output of your Repl. In the case of an extension, a special handshake is established between it and the Replit workspace.
