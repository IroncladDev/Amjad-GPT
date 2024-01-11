# Secrets and Environment Variables

You can store sensitive information such as API keys, credentials, and more in your Repl with Secrets. Get started by clicking on the **Secrets** icon in the Tools section.

![secrets icon](https://docimg.replit.com/images/programming-ide/secrets-icon.png)

## How Replit keeps your Secrets safe

Only you and your invited collaborators can see Secret values in a Repl. Secrets data is encrypted with AES-256 at rest, and encryption keys are stored in a secure location that is protected by multiple layers of security. To help protect against key compromise, encryption keys are rotated regularly. Data in transit is encrypted using TLS. These measures safeguard your Secrets against breaches and vulnerabilities to ensure secure storage and protection.

## Managing Secrets

You can easily and securely edit your Repl's secrets/environment variables with the Secrets tool. Alternatively, you can open the raw JSON editor if you want to quickly edit multiple secrets at the same time.

![secrets tab](https://docimg.replit.com/images/programming-ide/secret-tab.png)

## Accessing Secrets

In most Repls, you will be provided with instructions on how to access secrets in your code. Here are some examples of widely-used programming languages:

### Python

```python
import os
print(os.getenv("MY_SECRET"))
```

### JavaScript

```javascript
console.log(process.env.MY_SECRET);
```

### Java

```java
System.out.println(System.getenv("MY_SECRET"))
```

## FAQs

### Why can't I see the Secrets Pane?

HTML/CSS/JS Repls don't have Secrets since they are [statically hosted](https://blog.hubspot.com/website/static-vs-dynamic-website).

### Why aren't my secrets updating?

Restarting your Repl will reload its secrets, exposing them to your Repl's environment again.

### What happens when someone forks my Repl?

A forked Repl will contain the keys, but not the values, of the secrets/environment variables from the original Repl it was forked from.

