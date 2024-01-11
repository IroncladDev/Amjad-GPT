---
sidebar_position: 3
title: Custom Domains
---

*Please note that domain linking for development hosting (outlined in this article) will be deprecated on January 1st, 2024, if you would like to deploy your app to a domain you own consider using [production deployments](/hosting/deployments/about-deployments). Read more about the transition [in our blog post](https://blog.replit.com/hosting-changes)*.

# How to connect your repl to a custom domain

## Connecting your domain to your repl

First, you need to go into the webview of your repl and click the pencil icon to the right of the address bar:

![webview of a repl](https://docimg.replit.com/images/hosting/custom-domains/firefox_5rCxkoAqnc.png)

From there, you can add your domain to the domain linking panel:

![domain linking panel](https://docimg.replit.com/images/hosting/custom-domains/firefox_wppUODOd46.png)

Next, you will be prompted to copy information for the CNAME and TXT records. The CNAME record points your domain to your repl, and the TXT record verifies that you own the domain.

![copy domain information](https://docimg.replit.com/images/hosting/custom-domains/firefox_lus7QfIaSB.png)

Once you have copied the info, you can add the CNAME and TXT records to your domain. You can link your repl to a root domain or a subdomain. In my case, the root domain would be `thedevbird.com`, but for this tutorial, we will link the domain: `tutorial.thedevbird.com` to our repl.

_Note: I am using Cloudflare for DNS management in this tutorial, but it should be comparable to any other DNS manager_

![adding CNAME record](https://docimg.replit.com/images/hosting/custom-domains/firefox_qau5BXKe2y.png)
![adding TXT record](https://docimg.replit.com/images/hosting/custom-domains/firefox_2RcqsnHBGO.png)

### Name field

The **name** is your subdomain prefix, such as `tutorial` (e.g.: <code><b>tutorial</b>.thedevbird.com</code>) or your root domain: `example.com`.

Some DNS services **do not** allow you to use your root domain with a CNAME record. In that case, you will need to use an A record. Replit's domain linking panel should show an `A` record automatically whenever you enter only your root domain:

![linking a root domain](https://docimg.replit.com/images/hosting/custom-domains/firefox_iqrjFe5IAn.png)

### Target field

The **target** is what the record will point to, usually the information you copied from the domain linking panel.

## The waiting game

Unfortunately, the time to fully propagate DNS changes can range from a few minutes to about 24-48 hours. We recommend using a tool such as https://whatsmydns.net/ to keep track of the DNS propagation. All you need to do is input your custom domain (`tutorial.thedevbird.com` in this case) and select the DNS record type you want to check.

In the screenshots below, you can see how quickly the TXT record propagated. In contrast, when making this tutorial, the CNAME record had only propagated to one primary DNS server in the same time span.

![TXT propogation](https://docimg.replit.com/images/hosting/custom-domains/firefox_sOOlsNcFwj.png)
![CNAME propogation](https://docimg.replit.com/images/hosting/custom-domains/IwYGyOjqEW.png)

**The key to linking your domain is patience.** Your repl won't be able to connect to your custom domain until the DNS records are propagated all the way through.

## We have liftoff!

Once your DNS records have been fully propagated, you can check back on the domain linking panel of your repl, which should show that your domain has been verified:

![custom domain is verified](https://docimg.replit.com/images/hosting/custom-domains/firefox_seLItLADFi.png)

If you don't see this, please send a support ticket via https://replit.com/support and **make sure to include a screenshot of your DNS records, the custom domain you want to link, and the link to your repl.**
