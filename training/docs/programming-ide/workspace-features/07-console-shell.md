# Console & Shell

Every Repl has both a Console and a Shell.

The console shows the output your Repl when it is run while the shell allows you to execute any bash command at any time within your Repl.

## Stop a process

To stop a process in the Shell or the Console, use the `CTRL+C` shortcut on your keyboard. Performing this action in the Console will stop the Repl and performing it in the Shell will stop the current process running in the particular Shell tab.

## Searching

When either the Console or the Shell is focused, you will see a search button.

![Search](https://docimg.replit.com/images/programming-ide/console-shell-search.png)

Once you start searching, you will see an input and three options.

1. Enter a search term in the input
2. Hit "Next" to jump to the next match
3. Hit "Back" to jump to the previous match
4. Hit "Exit" to exit Search mode

## Clear the Console/Shell

To clear all the existing content on either the console or the shell, hit the Trash icon in the top-right corner of either one. Alternatively, you can run the `clear` command if you are using the Shell.

## Multiple Shell instances

You can open up any number of Shell instances in a Repl, but only one console. The console will only ever show the output of the Repl in realtime.

You can open up multiple Shell instances by opening a new tab and selecting the Shell tool multiple times, or by dragging the Shell tool from the Tools section of the sidebar into multiple different areas.

## FAQs

### Why is my JavaScript output not showing?

Ensure that your Repl is in NodeJS and not HTML/CSS/JS. To see the javascript output in an HTML/CSS/JS Repl, you will need to use the [Devtools](/programming-ide/workspace-features/webview#devtools) instead.
