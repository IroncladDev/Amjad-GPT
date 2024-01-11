# Outbound Data Transfer Limits

Since April 7th, 2023, we have updated the outbound transfer limits for all plans (Free, Replit Core) to enhance the user experience, maintain platform integrity, and provide predictable costs. These limits are in place to ensure fair access to Replit's resources.

## Viewing Your Outbound Transfer Usage

You can view your outbound transfer usage in the `Resource Usage > Outbound Transfer` section of the [account page](https://replit.com/account#resource%20usage).

![resource usage](https://docimg.replit.com/images/hosting/outbound-transfer/resource-usage.png)

On this page, you will see your total usage for the current month, which will be broken down by Repl. You will also see the total limit for your current plan. If you wish to increase your limit, press the `Increase limit` button.

![usage by repl](https://docimg.replit.com/images/hosting/outbound-transfer/usage-by-repls.png)

## What Counts Towards Outbound Transfer?

Any data that is sent from your Repl to a client will count towards your outbound transfer limit. This includes:

- HTTP requests
- Websocket connections
- Requests to Replit Database
- Requests to an external API

Any data sent to your Repl, regardless of which domain (repl.co, replit.app, custom domain), will count towards your outbound transfer limit.

## What Happens if You Exceed Your Limit?

If you go over your limit, your Repls will effectively shut off. Your Repls will no longer be able to send any outbound data. However, this will not affect your Repl's ability to receive data.

We will send notification emails if you hit 50% and 100% of your outbound transfer usage.

We recommend that you monitor your outbound transfer usage to avoid hitting your limit. If you need more outbound transfer, you can upgrade to a higher-tier plan or purchase additional outbound transfer through our [Support team](https://replit.com/support).