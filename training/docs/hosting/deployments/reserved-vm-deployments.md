---
sidebar_position: 4
---

# Reserved VM Deployments

Repls are not publicly accessible by default, accessible only via their cover page. Reserved VM Deployments enable you to release a snapshot of your Repl, ensuring that changes made within the editor don't disrupt the production build. Customize run and build commands, and connect the deployment to a `<app-name>.replit.app` or a custom domain.

## Setting up a deployment

Start by creating a deployment. Click the "Release" button located in the top right corner of the workspace.

<img alt="release button" src="https://docimg.replit.com/images/deployments/deploying-your-repl/release-button.png"/>

Two deployment options are available:

1. **Deploy:** Deploy your Repl to a public `<app-name>.replit.app` URL (or custom domain), ideal for hosting your app publicly/
2. **Publish:** Publish your Repl to the community, which can be run from the cover page.

<img alt="deployment options" src="https://docimg.replit.com/images/deployments/deploying-your-repl/deployment-options.png" style={{ width: '80%' }} />

### Deploying a Repl

After selecting **Deploy**, select Reserved VM and you will be prompted to choose a deployment tier.

Unlike deploying to the community, which doesn't host your Repl under a domain and has a wakeup phase when accessed via the cover page, the other deployment options offer different specs and capabilities for your Repl in production.

<img alt="deployment tier selection" src="https://docimg.replit.com/images/deployments/deploying-from-github/13-deployment-tiers.png" style={{ width: '75%' }} />

Next, provide setup information such as the build command, run command, and any environment variables you want to set for production.

<img alt="deployment info" src="https://docimg.replit.com/images/deployments/deploying-from-github/14-deployment-modal.png" style={{ width: '80%' }} />

Once you have entered the necessary information, click the "Deploy" button to start the deployment process.

After the deployment is complete, you can access details like the URL, build logs, and more. Learn more about editing deployment information [here](/hosting/deployments/monitoring-a-deployment)

**Note: Viewing Deployment logs is very effective for debugging a failed deployment or an issue with your project. You can learn more about logs [here](/hosting/deployments/monitoring-a-deployment#logs-tab)**

### Publishing a Repl

You will initiate the publishing process by clicking the **Publish** button, detailed [here](/hosting/sharing-your-repl).

### Host Configuration

If your Reserved VM has a "Web Server" app type, your program must listen for requests on the correct address to deploy successfully ("Background Worker" apps will not receive HTTP requests and are exempt from this requirement).

HTTP requests will be sent to external port 80 of your deployment. Your server must listen for traffic on 0.0.0.0, listening on localhost or 127.0.0.1 won't work. There are two ways to expose the port:

- Port Auto-Detection: If no ports have been configured in .replit, one will be detected automatically. The first opened port will be used; if your program uses multiple ports, consider using the approach below.
- Configure a port [in the .replit config](https://docs.replit.com/programming-ide/configuring-repl#ports): If ports have been configured in .replit, one must be configured with `externalPort = 80`.