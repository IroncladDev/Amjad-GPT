---
sidebar_position: 9
---

# Deployments Migration Guide

If you are currently hosting your app or website with Always On or Repl.co and want to migrate to Deployments, this guide is for you.

Choose a deployment type
The first thing to do is to identify which type of Deployment you need. There are three types:
- Reserved VM
- Autoscale
- Static

Each one works in a slightly different way.

The way Deployments work is simple. When you hit “Deploy”, we bundle up your code into a container and host it on our infrastructure.

If you choose the Reserved VM option, we host your app in a dedicated virtual machine. This type of deployment will virtually never restart, and you will be billed daily for one day of usage for your VM tier.

If you choose the Autoscale option, we host your app on managed container infrastructure. Autoscale deployments can scale up and down with the traffic you receive. You are only billed for the time that your deployment spends processing requests, and your deployment will go to sleep between requests.

If you choose the Static option, your app will be frontend-only. There is no container at all in this deployment type; we simply host your static files on your chosen subdomain.

For most Repls, we recommend using Autoscale deployments. If your app is a bot (such as a Discord or Telegram bot) or cannot tolerate restarts, choose the Reserved VM option.

### Make sure your Repl works in the workspace
If you haven’t run your Repl in a while, do that first and make sure that the Repl works as intended. Unless it is a bot, it should open a webview and be accessible through the workspace.

If your Repl doesn’t work in the Workspace, it won’t work in a Deployment.

### Configure your deployment
There are three things you need to configure when deploying your application:
- Build command
- Run command
- Environment variables

The build command runs during the Build step of the deployment, which occurs before the code is bundled into a [container](https://www.docker.com/resources/what-container/). For example, if your app has a build step such as “npm run build”, you would run that here.

The run command runs when your deployment starts up. This happens during the Promote step of the deployment. For example, you might run “npm start” to start your application here.

The environment variables are passed to both your build and your run commands. When you first deploy, your existing secrets will be copied over. If you add a secret later on, you’ll need to remember to copy that over to your deployment as well.

Make sure that your build and run commands are working correctly by running them in the Shell tab before deploying.

### Enjoy better reliability
That’s all it takes! We built deployments to be a better, more reliable version of Always On and it should work better in every way.

If you have any issues getting your deployment to work, please consult the [Troubleshooting Guide](https://docs.replit.com/hosting/deployments/troubleshooting). You can also [book a debugging session with our team](https://calendly.com/debug-replit-deployments/20-minute-meeting).

The primary difference between Always On and Deployments is that Deployments do not support filesystem persistence. If you are relying on SQLite, JSON files, or anything else to persist data on your hosted app, that will not work in a deployed setting. Consider using [Replit Database](https://docs.replit.com/hosting/databases/replit-database) or [PostgreSQL](https://docs.replit.com/hosting/databases/postgresql-on-replit) instead.
