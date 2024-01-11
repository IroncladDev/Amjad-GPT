---
sidebar_position: 4
---

# Repl Auth 2.0 (beta)

This feature is not out to all users yet, and is hence in beta.

To help you authenticate users hassle-free, we have created Repl Auth. This allows you to authenticate users without having to write your own authentication logic or work with databases. You can simply authenticate a user with their Replit account without the need to store secure passwords. It's also faster to set up than something like Google authentication.

## Setup

You'll need a Replit account for this tutorial so if you haven't already, head over to the [signup page](https://replit.com/signup) to create an account.

## The "Log in with Replit" Sidebar

The Replit workspace includes a new sidebar pane that will be the go-to place for all your Repl Authentication needs. To enable its functionality, you must start a web app in your Repl. You could use HTML, React, NodeJS, Flask, or whatever your heart desires.

![Intial Repl Auth Sidebar](https://docimg.replit.com/images/hosting/repl-auth/initial-auth-sidebar.png)

## Using a prebuilt login page (the easy way)

With the "Log in with Replit" sidebar, you can enable login with just one click. Once you have a [web app running](https://replit-docs-2-repl-auth.krishatreplit.repl.co/hosting/deploying-http-servers), you can simply click "Enable login page" as shown above. This will require all users of your web app to log in before they can visit your site. They will see the following page:
![Prebuilt Repl Auth Page](https://docimg.replit.com/images/hosting/repl-auth/auth-page.png)

## Using a custom login button (the advanced way)

To use your own custom login button, click the text in the sidebar reading "use your own custom button." Your sidebar will now show some code snippets that you can easily insert into your code.
![Repl Auth Custom Button](https://docimg.replit.com/images/hosting/repl-auth/custom-button.png)

### If you are using HTML:

Ensure that you are in an HTML file. Then click "Auto add". A script should have been inserted in your code just before the `</head>` tag.

Next, move your cursor to wherever your would like to add your button, and click "Insert". The button syntax should be added to your code in the desired location. You can change the text or add CSS to this button in the same way as other HTML elements.

After refreshing your web page, you should see your custom button appear! For an example, please see our [HTML custom button example](#html-repl-with-custom-button) at the bottom of the page.

### If you are not using HTML:

In the case that you are not using HTML, you will have to create your own button and login function. To help you out, we've included a javascript implementation of the login function below. For an example, please see our [React custom button example](#react-repl-with-custom-button) at the bottom of the page.

```js
function LoginWithReplit() {
  window.addEventListener("message", authComplete);
  var h = 500;
  var w = 350;
  var left = screen.width / 2 - w / 2;
  var top = screen.height / 2 - h / 2;

  var authWindow = window.open(
    "https://replit.com/auth_with_repl_site?domain=" + location.host,
    "_blank",
    "modal =yes, toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=" +
      w +
      ", height=" +
      h +
      ", top=" +
      top +
      ", left=" +
      left
  );

  function authComplete(e) {
    if (e.data !== "auth_complete") {
      return;
    }

    window.removeEventListener("message", authComplete);

    authWindow.close();
    location.reload();
  }
}
```

## Getting user info

Most information for getting user info will also live inside the "Log in with Replit" sidebar, under the "Usage" section.

![Repl Auth User Info](https://docimg.replit.com/images/hosting/repl-auth/get-info.png)

We currently expose the following information for users that are logged in:

- id
- name
- profileImage
- bio
- url
- roles
- teams

### Getting user info from the client side

To access user info on the client side, we send a `GET` request to `/__replauthuser`. We are then returned a JSON object that contains the user information.

#### If you are in HTML:

You can simply insert the code snippet listed under "usage" in the sidebar. See our [HTML example](#html-repl-with-custom-button) at the bottom of the page for more information.

#### If you are not in HTML:

You will have to send your own fetch request to `/__replauthuser`. To help you out, we've included a javascript implementation of the login function below. See our [React example](#react-repl-with-custom-button) at the bottom of the page for more information.

```
async function getUserInfo() {
  return await fetch('/__replauthuser')
}
```

### Getting user info from the server side

To access user info on the server side, we can access the following request headers:

- `X-Replit-User-Id`
- `X-Replit-User-Name`
- `X-Replit-User-Profile-Image`
- `X-Replit-User-Bio`
- `X-Replit-User-Url`
- `X-Replit-User-Roles`
- `X-Replit-User-Teams`

#### If you are in NodeJS:

You can simply insert the code snippets listed under "usage" in the sidebar. See our [NodeJS example](#nodejs-repl-with-custom-button) at the bottom of the page for more information.

#### If you are not in NodeJS:

You will have to access the request headers on your own. To help you out, we've included a javascript implementation of the login function below. See our [Python Flask example](#python-flask-repl-with-custom-button) at the bottom of the page for more information.

## Examples

Check out these examples to see Repl Auth in action!

### HTML Repl with Custom Button

<iframe height="400px" width="100%" src="https://replit.com/@util/Repl-Auth-HTML-Example?embed=1" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

### React Repl with Custom Button

<iframe height="400px" width="100%" src="https://replit.com/@util/Repl-Auth-React-Example?embed=1" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

### NodeJS Repl with Custom Button

<iframe height="400px" width="100%" src="https://replit.com/@util/Repl-Auth-Node-Example?embed=1" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

### Python Flask Repl with Custom Button

<iframe height="400px" width="100%" src="https://replit.com/@util/Repl-Auth-Flask-Example?embed=1" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
