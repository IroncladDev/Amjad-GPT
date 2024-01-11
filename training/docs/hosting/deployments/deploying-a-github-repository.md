---
sidebar_position: 6
---

# Deploying a GitHub repository

If you have a project hosted on GitHub that you want to deploy using Replit, the process is incredibly simple. Just follow these easy steps to import your repository, ensure its smooth operation, and deploy it to a public URL for hosting.

## Import a Repl from GitHub

1. Navigate to https://replit.com/new or click the "+" button at the top right of the screen to create a new Repl.

   <img class="image" alt="new repl button" src="https://docimg.replit.com/images/deployments/deploying-from-github/1-new-repl-button.png" />

2. Click the "Import from GitHub" button at the top right of the modal.

   <img class="image" alt="import from github button" src="https://docimg.replit.com/images/deployments/deploying-from-github/2-import-from-github-button.png" style={{ width: '80%' }} />

3. Enter the URL or the name of the GitHub repository you want to import. You do not need to be the repository owner.

   <img class="image" alt="import from github modal" src="https://docimg.replit.com/images/deployments/deploying-from-github/3-import-from-github-modal.png" style={{ width: '80%' }} />

## Configure the Repl

1. After importing, configure the run command for the Repl. This is usually auto-filled, but you can modify it to suit your project's requirements.

   <img class="image" alt="github run command" src="https://docimg.replit.com/images/deployments/deploying-from-github/4-github-run-command.png" />

2. Click the "Run" button at the top right of the screen to ensure the Repl can run.

   <img class="image" alt="run button" src="https://docimg.replit.com/images/deployments/deploying-from-github/5-run-button.png" style={{ width: '60%' }} />

3. The Repl will install packages and execute the run command.

   <img class="image" alt="install packages" src="https://docimg.replit.com/images/deployments/deploying-from-github/6-install-packages.png" />

### Modify the Run Command

If you need to change the run command:

1. Click the "Show hidden files" button at the top right of the file tree and open the `.replit` file.

   <img class="image" alt="show hidden files" src="https://docimg.replit.com/images/deployments/deploying-from-github/8-show-hidden-files.png" style={{ width: '50%' }} />
   <img class="image" alt="dot replit file" src="https://docimg.replit.com/images/deployments/deploying-from-github/9-dot-replit-file.png" style={{ width: '60%' }} />

2. In the `.replit` file, change the `run` line to:

   ```bash
   run = "npm run <your run command>"
   ```

   <img class="image" alt="new run command" src="https://docimg.replit.com/images/deployments/deploying-from-github/10-new-run-command.png" />

3. Rerun the Repl to ensure it works as expected. Once confirmed, proceed to deploy the Repl.

   <img class="image" alt="successful run" src="https://docimg.replit.com/images/deployments/deploying-from-github/11-successful-run.png" />

## Deploying the Repl

1. Click the "Release" button at the top right of the screen.

   <img class="image" alt="release button" src="https://docimg.replit.com/images/deployments/deploying-from-github/12-release-button.png" style={{ width: '75%' }} />

2. Select the "Deploy" option, allowing you to deploy the Repl to a public `<app-name>.replit.app` URL (or a custom domain) for public hosting.

3. Choose the deployment tier you want to use. You can use the dropdown to select the perfect power for your deployment machine. Learn more about the different deployment tiers [here](https://replit.com/pricing).

   <img class="image" alt="deployment tiers" src="https://docimg.replit.com/images/deployments/deploying-from-github/13-deployment-tiers.png" style={{ width: '75%' }} />

   _Note: Dedicated machines provide full, unshared CPU power for consistent performance. In contrast, shared machines allocate CPU resources among multiple virtual machines, potentially leading to variable performance based on other users' activities._

4. Next, you will see a summary of the purchase. This includes the cost of the tier and if auto-refill is enabled. Click the "Deploy your project" button to continue.

   <img class="image" alt="deployment purchase" src="https://docimg.replit.com/images/deployments/deploying-from-github/13.5-deployment-purchase.png" style={{ width: '75%' }} />

5. Enter the build command, run command, and any environment variables needed for production.

   <img class="image" alt="deployment modal" src="https://docimg.replit.com/images/deployments/deploying-from-github/14-deployment-modal.png" style={{ width: '75%' }} />

   _Note: f "Health check before promoting" is selected, the system verifies that your deployment opens a port before promoting it. You can deselect this option to bypass the health check for projects that don't require opening a port (e.g., Discord or Slack bots)._

6. Once you have entered the required information, click the "Deploy" button to initiate the deployment process.

   <img class="image" alt="deployment building" src="https://docimg.replit.com/images/deployments/deploying-from-github/15-deployment-building.png" style={{ width: '75%' }} />
   <img class="image" alt="deployment done" src="https://docimg.replit.com/images/deployments/deploying-from-github/17-deployment-done.png" style={{ width: '75%' }} />

## Monitoring a Deployment

We offer a few ways of interacting and monitoring your deployments. You can view and change details such as custom domains, build logs, and build history. Find information on editing deployment details [here](/hosting/deployments/monitoring-a-deployment).

## Troubleshooting

If you're having trouble with your deployment or the deployment fails, refer to [this page](/hosting/deployments/troubleshooting) for steps to mitigate issues with deployments.
