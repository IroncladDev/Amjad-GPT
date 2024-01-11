---
sidebar_position: 5
---

# Custom Domains with Deployments

## Connecting Your Domain To Your Deployment

First, you need to go into the "Deployments" pane of your Repl and click the "Settings" tab:

![domains tab](https://docimg.replit.com/images/deployments/custom-domains/1.png)

From there, you can add your domain to the domain linking panel:

![domain linking panel](https://docimg.replit.com/images/deployments/custom-domains/2.png)

Next, you will be prompted to copy information for the A and TXT records. The A record points your domain to your Repl, and the TXT record verifies that you own the domain.

![copy domain information](https://docimg.replit.com/images/deployments/custom-domains/3.png)

Once you have copied the info, you can add the A and TXT records to your domain. You can link your Repl to a root domain or a subdomain. In my case, the root domain would be `thedevbird.com`, but for this tutorial, we will link the domain: `kaboom.thedevbird.com` to our Repl.

_Note: I am using Hover for DNS management in this tutorial, but it should be comparable to any other DNS manager_

![adding A record](https://docimg.replit.com/images/deployments/custom-domains/4.png)

Enter @ for hostname and the IP address from your deployments settings panel.

![adding TXT record](https://docimg.replit.com/images/deployments/custom-domains/5.png)

Copy and paste the TXT record to your DNS settings and save the new record.

### Name Field

The **name** is your subdomain prefix, such as `kaboom` (e.g.: <code><b>kaboom</b>.thedevbird.com</code>) or your root domain: `example.com`.

### Target Field

The **target** is what the record will point to, usually the IP you copied from the domain linking panel.

## Waiting for DNS Propagation

The time to fully propagate DNS changes can range from a few minutes to about 24-48 hours. We recommend using a tool such as https://whatsmydns.net/ to keep track of the DNS propagation. All you need to do is input your custom domain (`tutorial.thedevbird.com` in this case) and select the DNS record type you want to check.

In the screenshots below, you can see how quickly the TXT record propagated. In contrast, when making this tutorial, the A record had only propagated to one primary DNS server in the same time span.

![TXT propogation](https://docimg.replit.com/images/deployments/custom-domains/txt-propagation.png)
![A propogation](https://docimg.replit.com/images/deployments/custom-domains/a-propagation.png)

**The key to linking your domain is patience.** Your Repl won't be able to connect to your custom domain until the DNS records are propagated all the way through.

## We Have Liftoff!

Once your DNS records have been fully propagated, you can check back on the Domains tab for your Deployment, which should show that your domain has been verified:

![custom domain is verified](https://docimg.replit.com/images/deployments/custom-domains/domain-verified.png)

If you don't see this, please send a support ticket via https://replit.com/support and **make sure to include a screenshot of your DNS records, the custom domain you want to link, and the link to your Repl.**
