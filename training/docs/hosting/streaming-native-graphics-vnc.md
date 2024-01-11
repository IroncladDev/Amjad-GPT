---
sidebar_position: 6
---

# Streaming native graphics using VNC

Replit offers virtual network computing (VNC) functionality. VNC is a mature virtual desktop protocol that allows your Repl to stream a native desktop to your web browser. This protocol allows native applications (developed in Python, Java, C++, etc.) to open desktop windows as they would on any physical computer.

This streaming technology allows you to work with legacy applications in your browser from any device! For example, you could run a Python-powered game designed for desktop right on your mobile phone or tablet without making any changes to the underlying code.

<a href="https://replit.com/@demcrepl/Tetris-in-Pygame" target="_blank">Tetris (powered by PyGame)</a>
![tetris](https://docimg.replit.com/images/vnc/tetris.png)

## How Can I Use VNC?

Any Repl – in any language – can use a virtual desktop. No changes are needed to execute native graphics programs on Replit. The VNC pane will appear when any application attempts to open a native desktop window.

## Securing Your Repl

By default, your VNC connection does not have a password and can only be accessed from https://replit.com since the connection relies on the same authentication used for the WebSocket. If you need to access your Repl via the external [noVNC](https://novnc.com) client, you can set a VNC password.

Set a password in your Repl [secrets](/programming-ide/workspace-features/secrets) configuration. `Secrets` is a secure place to store passwords without the fear of other users accessing your passwords. Setting `VNC_PASSWORD` will add enhanced security when connecting remotely.

## How Can I Use Fullscreen VNC?

You must have secured your Repl as instructed above to proceed with these steps.

1. Execute the following command in your "Shell" tab: `echo $REPL_ID`

   ![echo $REPL_ID](https://docimg.replit.com/images/vnc/replid.png)

2. Construct your connection URL by replacing `REPL_ID` in with the output from above: `<REPL_ID>.id.repl.co`

3. Open the [noVNC client](https://novnc.com/noVNC/vnc.html) in a separate browser tab.

4. Open connection settings.

   ![open connection settings](https://docimg.replit.com/images/vnc/settings.png)

5. Expand the WebSockets field. Enter your connection URL (`<REPL_ID>.id.repl.co`) in the `host` field, and leave the `path` field empty.

   ![host](https://docimg.replit.com/images/vnc/host.png)

6. Change the `Scaling Mode` to `Remote Resizing`:

   ![scaling](https://docimg.replit.com/images/vnc/scaling.png)

7. Use the `runner` username and the password configured above when asked for credentials.

## Examples

- <a href="https://replit.com/@demcrepl/Tetris-in-Pygame" target="_blank">PyGame</a>
- <a href="https://replit.com/@amasad/docs-matplotlib" target="_blank">Python matplotlib</a>
- <a href="https://replit.com/@sigcse2021/Game-of-Life-demcrepl" target="_blank">Java Processing</a>
