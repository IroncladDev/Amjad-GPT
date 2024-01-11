---
sidebar_position: 2
---

# Autoscale Deployments

Autoscale can scale to 0, 1, or many instances as required. You're only charged when you have traffic, and you can scale up horizontally to handle high load when needed.

It is our recommended choice for websites, web applications, APIs, or microservices.

## Autoscaling

### Why Autoscale?

Autoscaling helps with two scenarios:
* Scaling to zero to save you money when you don't have traffic
* Scaling up to multiple instances when you have high traffic and need more servers

If you only want the scale to zero behavior, set your max number of machines to 1 during deployment configuration.

### How does scaling work?

Autoscale Deployments adds or removes instances under the following conditions:
* It will scale from one to zero instances of your application if there is no traffic for at least 15 minutes.
* It will scale from zero to once instances of your application if you get a single request.
* It will add instances as you exceed 80 concurrent requests per instance, up to you set maximum instances.
* It will remove instances as your traffic lowers, to fall beneath the 80 concurrent requests target.

## Tips for effective Autoscale services

Because Autoscale is based on request handling to be cost effective and to support horizontal scaling, there are some requirements and tips to work well.

### Autoscale Requirements

Your application must meet the following requirements:
* It must listen for requests using HTTP, HTTP/2, WebSockets, or gRPCs.
* It can not perform background activities outside of request handling.
* It must be stateless, it cannot rely on persistent local state. Note that you may use _external_ state, such as databases like [PostgeSQL](/hosting/databases/postgresql-on-replit).

### Autoscale Tips

If you are new to horizontally scaled applications, there are some tips you can follow to improve performance. The key constraints to remember are:
* Your application will start new copies frequently
* Your application will have multiple copies running at once
* State stored locally is an in-memory filesystem

Here are some tips to help you manage those contraints:

**Report errors instead of crashing**

Handle exceptions and do not let your application crash. Crashes will cause a new server to start, which slows your request processing. Instead, report errors using logging.

**Use dependencies wisely**

Dynamic languages with dependent libraries (eg NodeJS modules) add to startup latency, and will slow requests when a new instance is starting. Minimize your dependencies or utilize lazy loading if your language supports it.

**Lazily load global variables**

Global variables are initialized at startup, which will slow requests when a new instance is starting. Lazily initializing these variables will speed up initialization.

**Use remote storage**

Since there are multiple copies of your application running, use an external data store that can handle multiple concurrent writers such as [PostgeSQL](/hosting/databases/postgresql-on-replit) or MongoDB.

**Delete temporary files**

Files your application writes locally will live in an in-memory filesystem. To free up memory for your application, use this sparingly and delete files after they are no longer needed.

## Billing

### What am I charged for?

Autoscale Deployments are billed based on your actual usage. You are billed for:
* CPU and RAM consumed during request processing (see below).
* Requests processed.
* Outbound transfer for bytes sent from your server.

Learn more about our pricing for these resources under [usage-based billing](/hosting/about-usage-based-billing)

### How does CPU billing work?

CPU and RAM are charged together in an "execution unit", based on the sizing you choose. You are only charged for execution for the time when a request is being processed. Execution time is rounded to the nearest 100 milliseconds.

This means you are _not_ charged for time your application is running, so long as no requests are actively being processed.

An open WebSocket is considered an active HTTP request. So execution time will be billed for any time where a WebSocket connection is open.

Note: CPU is aggressively throttled outside of request processing. If your application is based on running background activities, instead consider a [Reserved VM Deployment](/hosting/deployments/reserved-vm-deployments).

## How to use Autoscale Deployments

### Setting up your Repl

Before using an Autoscale Deployment, you should verify that your Repl is working. You can do so using the "Run" button at the top of the workspace.

![running your Repl](https://docimg.replit.com/images/deployments/static/01-testing-app-runs.png)

### Creating a Deployment

First, open up the Deployments tab. You can do this by clicking the "Deploy" button at the top right of the workspace or opening a new pane and typing "Deployments".

![opening the Deployments tab](https://docimg.replit.com/images/deployments/static/04-opening-deployments-tab.png)

In the Deployments tool, select the "Autoscale" Deployment type, then proceed using the "Set up your deployment" button.

![Deployments tab](https://docimg.replit.com/images/deployments/autoscale/03-autoscale-deployments-tab.png)

### Configuring your Deployment

In the configuration menu, you can configure how your Autoscale Deployment behaves. You can configure the following:
- **Machine Power:** How much vCPU and RAM the machines in your Deployment will use (each)
- **Max instances:** The maximum number of machines that your Deployment will scale up to in high traffic

![autoscale configuration](https://docimg.replit.com/images/deployments/autoscale/04-autoscale-configuration.png)
![configure machine power](https://docimg.replit.com/images/deployments/autoscale/05-machine-power-config.png)

### Host Configuration

HTTP requests will be sent to external port 80 of your deployment. Your server must listen for traffic on 0.0.0.0, listening on localhost or 127.0.0.1 won't work. There are two ways to expose the port:

- Port Auto-Detection: If no ports have been configured in .replit, one will be detected automatically. The first opened port will be used; if your program uses multiple ports, consider using the approach below.
- Configure a port [in the .replit config](https://docs.replit.com/programming-ide/configuring-repl#ports): If ports have been configured in .replit, one must be configured with `externalPort = 80`.

### Starting your Deployment

After configuring your Deployment, click "Deploy" to start the deployment process. Once the Deployment is complete, you can access details like the URL, build logs, and more. Learn more about managing your Deployment [here](/hosting/deployments/monitoring-a-deployment).
