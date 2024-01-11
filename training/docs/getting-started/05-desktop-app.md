# Desktop App

The Replit Desktop App is a standalone native version of the Replit IDE. It provides a focused environment for coding, with all the features of the browser IDE, plus the added convenience of being accessible directly from your home screen or dock.

## **Key features**

**Focused coding**: Enjoy a native, 'zen-mode' like Replit experience on macOS, Windows, and Linux.

- The app is easily accessible from your desktop, allowing you to quickly launch and start coding without opening a browser.
    
- The desktop app provides a dedicated space for coding, free from the distractions of a Repl in the browser.

- To quickly open the desktop app from your browser Repl, open the [command palette](https://docs.replit.com/programming-ide/keyboard-shortcuts#command-palette) (`Ctrl/Cmd + K`) and then select **Open in desktop app**.

**Easily accessible**: Create multiple windows for different Repls and directly access Replit from your dock or home screen.

**Enhanced keyboard shortcuts**: The app allows you to define keyboard shortcuts not typically available available in the browser, enabling you to tailor your coding environment to your personal preferences and workflows.

**Full feature set of the browser IDE**: The desktop app includes all the features of the Replit browser IDE, including collaborative coding, integrated debugging tools, and Git integration.

For more on the Replit Desktop App, including how we built it, check out the announcement [blog post](https://blog.replit.com/desktop-app).

## **Installation**

Install the Replit Desktop App on your operating system (Windows, macOS, Linux) here: [replit.com/desktop](https://replit.com/desktop).

- On macOS and Windows, the app will auto-update when you launch the app.

- Linux users must manually update. Check for new versions at [replit.com/desktop](https://replit.com/desktop).

## **Features**

#### **Custom keyboard shortcuts**

The desktop app allows for more keyboard shortcuts than in the browser.

- To see the default shortcuts, navigate to **Settings** using the command palette: `Ctrl/Cmd + K` -> **Settings** -> **Keyboard shortcuts** or from the Tools section in the left sidebar.

- Note: the default shortcuts are slightly different from the browser.

- View more on shortcuts [here](https://docs.replit.com/programming-ide/keyboard-shortcuts).

Default desktop shortcut for opening a new window: `Ctrl/Cmd + Shift + N`

#### **Deep linking:** 

The app supports a number of deep links, or links to specific pages or flows, that will launch the app if it's not already running.

  - To create a new Repl: `replit://new`

  - To create a new Repl in a specific language: `replit://new?language=nodejs`

  - To open the desktop app homepage: `replit://home`

  - To open a specific Repl: `replit://@<user-name>/<repl-name>`, eg: `replit://repl/@replit/Expressjs-Template`
    
## **Desktop App vs. the browser**
        
### **Similarities from web**
            
  - The desktop app performs in the same way as a Repl in the browser. All the compute resources run in the cloud and not locally. The Repl resources are based on [your plan](https://replit.com/pricing) and not your computer’s hardware.
            
  - Ability to use multiple windows. Use the file menu or `Ctrl/Cmd + Shift + N` to open a new window.
            
  - All Tools, Extensions, Deployments, Replit AI, etc. are available.
        
### **Differences from the browser**
            
  - **Full Chromium devtools:** Navigating to the web preview and selecting the wrench icon allows the use of the full Chromium browser devtools.
![dev-tools](https://docimg.replit.com/images/desktop/desktop-app-integrated-devtools.webp)
            
  - **Keyboard shortcuts:** Due to not being constrained by browser shortcut conflicts, there are more shortcuts available than the browser, but there are some minor differences from the default keyboard shortcuts in the browser.
            
  - **The navigation menu:** To the right of the sidebar toggle in the Workspace header is the navigation menu. This is where you can create a new Repl, open new windows, and search for and filter through your existing Repls.
![nav-menu](https://docimg.replit.com/images/desktop/desktop-app-nav-menu.gif)
            
  - **The avatar menu:** Use this menu, located at the top right, to go to the full Replit web app.
  - This is where you can go to the Community page, Bounties, Teams, etc., Account (change themes, billing, view resource usage), view the app version, and to logout.
![avatar-menu](https://docimg.replit.com/images/desktop/avatar.png)
                
  - Note: logging out of the desktop app will not log you out in your browser.
    
### **Support**
        
Use the tag `desktop-app` when submitting a bug report on [the forum](https://ask.replit.com/c/support/bug-reports/).
        
Include the desktop app version in any support request, such as bug reports, by navigating to the top right avatar menu to view the version number, e.g. “1.0.0”.