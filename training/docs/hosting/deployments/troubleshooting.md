---
sidebar_position: 11
---

# Troubleshooting Common Deployment Issues

Here are ten things you can try if you are having any trouble with your deployments.

If you still need assistance after trying all ten things, please post your question in the [Replit Help category on our forum](https://ask.replit.com/c/help/13) and we will help you as soon as possible.

1. Does your Repl work within the Replit Workspace? Press the big button at the top of the screen that says “Run”. If it doesn’t show you a webview with a web address ending in the repl.co domain, your code doesn’t work. Once that’s fixed up, you can try deploying again.
2. Is your program running continuously? Deployments expect that your program never runs to completion, and will try to restart it if it does. If your program just runs a function and exits, this will not work.
3. If you’re running a website (as opposed to a bot), is the server listening on 0.0.0.0? Deployments can automatically detect which port your server is running on, but only if it’s listening on the 0.0.0.0 address. If it’s listening on localhost or 127.0.0.1, it won’t work.
4. Are there any errors in your application? Look in the “Logs” tab at the top of the Deployments pane to see the output of your application. Are there any stack traces or exceptions that you can see? This indicates an error in your code due to various issues such as uninitialized variables or trying to use packages that aren’t installed.
5. Are your run and build commands correct? Common mistakes here include typos, using incorrect flags, or specifying the wrong file or directory. Double-check your commands and make any necessary adjustments.
6. Did you specify all your production secrets and environment variables in the Deployments pane? Putting them in the Secrets pane is not enough – they won’t copy over automatically. This may cause your application to fail in the initialization step with errors about undefined values.
7. Is your Repl too big? Reserved and Autoscale Deployments only work on Repls that are 8 GB or less in size, and Static Deployments can only be up to 1 GB. Try deleting some files or using an external datastore, such as our integrated [PostgreSQL](https://docs.replit.com/hosting/databases/postgresql-on-replit).
8. Does your homepage take a long time to load? Before marking your Deployment as successful, we run a health check where we try to reach it via an HTTP request. If your main page takes more than 5 seconds to load, the health check will time out and the Deployment will fail in the last step.
9. Do you have any [ports specified in the .replit config](https://docs.replit.com/programming-ide/configuring-repl#ports)? If you have any ports specified, we turn off port auto-detection and rely on the config you have provided. You must specify a port in the config with an externalPort equal to 80 in order for the promotion step to pass. Make sure your server is listening on the specified localPort.
10. Are you relying on SQLite or the file system for data storage? The file system available in deployments is not persistent, and gets reset every time you deploy your Repl. For data persistence, we recommend using a database such as our integrated [PostgreSQL](https://docs.replit.com/hosting/databases/postgresql-on-replit).
11. Do the deployment logs contain messages on missing dependencies that exist in your Repl? Refer to the section on [package caching](#package-caching).

Here's an example of what the logs tab might look like:

![deployment logs tab](https://docimg.replit.com/images/deployments/deploying-from-github/21-deployment-logs-short.png)

### Deploying Streamlit Applications

Streamlit applications work seamlessly with Replit Deployments. To deploy a Streamlit application most easily, use [this template](https://replit.com/@replit/Streamlit?v=1).

Or, set the run command for deployments to this:

```
streamlit run --server.address 0.0.0.0 --server.headless true --server.enableCORS=false --server.enableWebsocketCompression=false main.py
```

If your application is in a different file other than `main.py`, replace `main.py` with the name of your file instead.

### Package Caching

To improve development times on Node and Python deployments, the build process excludes development dependencies from the deployment bundle by default. Replit also caches your project's dependencies so that they can be reused across deployments. If you run into issues with missing dependencies, you may need to selectively disable these features.

First, try including development dependencies in the deployment build. You can do that by defining the `REPLIT_KEEP_PACKAGE_DEV_DEPENDENCIES` environment variable in the `.replit` file.

```
[env]
REPLIT_KEEP_PACKAGE_DEV_DEPENDENCIES = "1"
```

If that doesn't work, you can disable package caching altogether. This can also be done by defining an environment variable in `.replit`. In this case the variable you need to define is `REPLIT_DISABLE_PACKAGE_LAYER`.

```
[env]
REPLIT_DISABLE_PACKAGE_LAYER = "1"
```

#### Development Dependencies

Package managers typically mark some dependencies as development only. This can be useful for reducing bundle size when deploying your application to production.

For Python Repls, development dependencies are added to the `[tool.poetry.group.dev.dependencies]` group in the `pyproject.toml` file. You can check [this page](https://python-poetry.org/docs/managing-dependencies/) for more information on Python dependency management with Poetry.

For Node Repls, development dependencies are listed in the `devDependencies` section of the `package.json` file. For more information, check out [this npm Docs page](https://docs.npmjs.com/specifying-dependencies-and-devdependencies-in-a-package-json-file).