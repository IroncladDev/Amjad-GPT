---
sidebar_position: 1
---

# About Deployments

Deployments are a way to release a snapshot of your Repl, ensuring that changes made within the editor don't disrupt the production build. Customize run and build commands, and connect the deployment to a `<app-name>.replit.app` or a custom domain.

Replit offers deployments for all use cases:
- [Autoscale Deployments](/hosting/deployments/autoscale-deployments): scale to zero to save costs, and scale up to multiple instances to handle high traffic
- [Static Deployments](/hosting/deployments/static-deployments): fast static sites, free for subscribed users
- [Reserved VMs](/hosting/deployments/reserved-vm-deployments): a single VM for cost certainty and special use cases

## What is a Deployment?

A deployment saves your Repl's current state as a "snapshot", and runs it on a shared or dedicated machine. This allows you to share your Repl with others, or host a website or Discord bot with minimal downtime. Unlike publishing to the community, which doesn't host your Repl under a domain and has a wakeup phase when accessed via the cover page, the other deployment options offer different specs and capabilities for your Repl in production.

## Why Deploy?

Deployments are useful for a variety of reasons. For example, you can use them to:

- Host a website or Discord bot with minimal downtime
- Separate your development environment from your production environment
- Share a snapshot of your Repl with others

## How to Deploy

Deployments are initiated from the Repl editor. Simply click the "Release" button or open the "Deployments" tool to get started.

## Which Deployment should I choose?

Replit offers three types of Deployments to serve different use cases. Choose the one that best fits your needs.

### Autoscale Deployments

[Autoscale Deployments](/hosting/deployments/autoscale-deployments) is our most commonly recommended option. It offers both flexible machine sizing and horizontal scaling.

Autoscale can scale to 0, 1, or many instances as required. You're only charged when the CPU is active during request processing.

It is our recommended choice for websites, web applications, APIs, or microservices.

Autoscale is the right choice if:
* Your application is a server using HTTP, HTTP/2, WebSockets, or gRPCs to handle requests.
* You want to try multiple ideas without spending for applications that don't receive traffic.
* You want to be able to scale up quickly to handle large amounts of requests.
* You need our highest reliability (99.95% uptime).

Your app may not be right for Autoscale if:
* Your application runs background activities outside of request handling.
* Your application can't run multiple instances in parallel.
* Your application can't handle multiple requests in parallel.
* Restarts are disruptive to your application.

### Reserved VM Deployments

[Reserved VM Deployments](/hosting/deployments/reserved-vm-deployments) run exactly one copy of your application on a single VM. It offers flexible machine sizing with cost certainty.

It is our best choice for long running or compute intensive applications and jobs. If your application was not a good fit for Autoscale, consider Reserved VMs instead.

Reserved VM is the right choice if:
* You want cost certainty.
* Your application is not a server.
* Your application does not tolerate being restarted easily.
* You have a long running WebSocket connection (eg. bots).
* You run background activities outside of request handling.
* Your require high reliability (99.9% uptime).

### Static Deployments

[Static Deployments](/hosting/deployments/static-deployments) serve static content such as HTML, JavaScript, and CSS files. There is no server involved.

This is a cost effective way to share simple websites such as portfolios, personal sites, or company landing pages.

Static Deployments are included for free in Replit plans, you only pay for outbound transfer based on traffic to the site.