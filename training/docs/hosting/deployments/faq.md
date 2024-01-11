---
sidebar_position: 8
---

# Deployments FAQ

## Why did my deployment fail?

You can debug your deployment by viewing the logs. Learn more about logs [here](/hosting/deployments/troubleshooting.md).

If you're still having issues, please send an email to [support@replit.com](mailto:support@replit.com).

## How do I deploy a Repl with a custom domain?

You can connect a custom domain to your deployment by following the steps [here](/hosting/deployments/custom-domains.md).

## What are the limits for deployments?

The limits for deployments are determined by the tier you choose for your Repl. Each tier offers a different combination of CPU, RAM, and outbound transfer. The first four tiers are for shared hosting, while the next four tiers are for dedicated hosting. The specific resource limits for each tier can be found during the deployment process when selecting a tier and on our [pricing page](https://replit.com/pricing).

## How does deployments pricing work?

### Reserved VM

Reserved VM pricing is based on [Cycles](/cycles/about-cycles). Each Cycle is equivalent to $0.01. The cost of a deployment depends on the tier you choose, with higher tiers having higher prices. You can view the pricing for each tier during the deployment process when selecting a tier and on our [pricing page](http://replit.com/pricing).

To use [Cycles](/cycles/about-cycles) for your deployments, you need to have a balance of Cycles in your account. If you don't have any Cycles, you can purchase deployments with a credit/debit card from the deployments pane. Once you have Cycles in your account, they will be used to cover the cost of your deployments based on the pricing of the selected tier.

### Autoscale

Autoscale pricing requires a credit or debit card to be on your account.

#### Compute Units

Autoscale is billed based on your resource usage. A compute unit measures both the amount of time and the machine power used (CPU + RAM) to complete a task. You pick your app’s machine power, so if you choose a more powerful machine, it will use more compute units per second while it is running. Each compute unit costs $0.00000125.

_6 million compute units per month are included in Replit Core._

#### Requests

In addition to compute units, Autoscale deployments are billed for requests. 2.5 Million requests per month are included in Replit Core. If you use all the compute units or requests from your plan, any additional usage will be billed at the end of the month or once you accumulate $10 of usage. Compute unit overages are charged at $0.00000125 per compute unit. Any request overages are charged at $0.4 per million requests. You can always check your current usage for the month in your Account page.

### Static

Static deployments are free. You may deploy up to 100 static sites if you have Replit Core. You are only responsible for [outbound data transfer](hosting/outbound-transfer.md). Replit Core includes 100GB of outbound data transfer per month.