---
sidebar_position: 3
---

# Static Deployments

Static Deployments allow you to deploy static websites and frontend applications on Replit. If you don't need a backend server or can statically build your website using your frontend framework, Static Deployments allow you to deploy your website in a cost-effective manner versus deploying a [Reserved VM](/hosting/deployments/reserved-vm-deployments) or an [Autoscale Deployment](/hosting/deployments/autoscale-deployments).

## Setting up your Repl

Before using a Static Deployment, you should verify that your Repl is working. You can do so using the "Run" button at the top of the workspace.

<!-- ![running your Repl](https://docimg.replit.com/images/deployments/static/01-testing-app-runs.png) -->
<img alt="running your Repl" src="https://docimg.replit.com/images/deployments/static/01-testing-app-runs.png" width="500" />

Next, ensure that your Repl can build your website into static files and take note of the directory. For example, if you are using **Vite**, you can run `npm run build` or `npx vite build` in the workspace's shell tool to initiate the build process. Once that is complete, you should see a `dist` directory in your Repl's file tree (or whichever output directory your framework uses).

![npm run build](https://docimg.replit.com/images/deployments/static/02-npm-run-build.png)
![dist directory](https://docimg.replit.com/images/deployments/static/03-dist-directory.png)

## Creating a Deployment

First, open up the Deployments tab. You can do this by clicking the "Deploy" button at the top right of the workspace or opening a new pane and typing "Deployments".

![opening the Deployments tab](https://docimg.replit.com/images/deployments/static/04-opening-deployments-tab.png)

In the Deployments tool, select the "Static" Deployment type, then proceed using the "Set up your deployment" button.

![Deployments tab](https://docimg.replit.com/images/deployments/static/05-deployments-tab.png)

## Configuring your Deployment

Configure the build command and public directory that you noted earlier. The build command is run when your Deployment is created, and the public directory is the directory to which your static files are built.

![configuring your Deployment](https://docimg.replit.com/images/deployments/static/06-preparing-the-deploynent.png)

_Note: If you want to host all files within your Repl, use `./` as the public directory._

### Index and 'Not Found' Pages

Your static deployment's home page will be read from the `index.html` file in the public directory. You can also provide a custom 'Not Found' page by adding a `404.html` file in the public directory. This will set the page that's served when a route that doesn't exist is requested.

## Starting your Deployment

After configuring your Deployment, click "Deploy" to start the deployment process. Once the Deployment is complete, you can access details like the URL, build logs, and more. Learn more about managing your Deployment [here](/hosting/deployments/monitoring-a-deployment).

![initiate the deployment process](https://docimg.replit.com/images/deployments/static/07-deployment-process.png)
![deployment complete](https://docimg.replit.com/images/deployments/static/08-successful-deployment.png)

## Billing

Static deployments are free to create for users with a Replit Core subscription (previously Hacker or Pro). Those users receive up to 100 static deployments. Please [contact us](https://support.replit.com) if you need more.

Users on the free plan will need to add a credit card before creating a Static Deployment. Free users also have 10 GiBs of outbound storage transfer. If you exceed 10GiBs, you will be billed for additional resourse usage at $0.10/GiB.

You will be billed for outbound storage transfer once you’ve exceeded your monthly allowance.
