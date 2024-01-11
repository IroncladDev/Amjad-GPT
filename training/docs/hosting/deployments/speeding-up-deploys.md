---
sidebar_position: 10
---

# Speeding up Deploys with Caching

If your Python or Node Repl follows a set of constraints, it’s possible to speed up the deployment process by enabling package caching. This feature works by caching the language-specific dependencies of your Repl for reuse across deploys.

## Prerequisites

### Python

- Your Repl uses Python 3.10 or above
- All your application’s dependencies were installed with Poetry
- Your project does not use internal packages installed with `poetry install`

### Node

- Your project uses npm version 7 or above

## Enabling Package Caching

If your Repl follows the prerequisites above, you can try enabling package caching to speed up deploys. To do this, you need to define an environment variable in the `.replit` file. For Python Repls, the variable is `REPLIT_PYTHON_PACKAGE_LAYER`. For Node Repls, it's `REPLIT_NODEJS_PACKAGE_LAYER`.

Set the correct environment variable in the `[env]` section of the `.replit` file.

```
[env]
# For Python
REPLIT_PYTHON_PACKAGE_LAYER = "1"
# or For Node
REPLIT_NODEJS_PACKAGE_LAYER = "1"
```

After the initial deployment with caching enabled, the build system will cache the dependencies for quicker future deployments.

## Troubleshooting

If your deployment fails during the `Bundle` or `Promote` steps, you may need to disable package caching.
To do that, just remove the environment variable definitions from `.replit`.