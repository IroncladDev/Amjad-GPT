# Debugging

## Why use a debugger?

Debuggers are powerful tools that enable you to pause and step through the execution of your code. When the debugger is active, you can inspect the results of your code, including the data stored within your variables. This allows you to model the execution of your program step-by-step and identify precisely where your program encounters issues.

## How to use the debugger?

Repls that are written in the following languages can use a built-in, multiplayer debugger:

- Python
- JavaScript (Node.js)
- Java
- C/C++
- With more coming soon (through [Nix](/programming-ide/nix-on-replit).

## Opening the Debugger Panel

To begin using the debugger, click on the Debugger icon on the sidebar or open a new tab and type "Debugger":

![debugger-in-tools](https://docimg.replit.com/images/programming-ide/debugger/01-debugger-in-tools.png)
![search-debugger](https://docimg.replit.com/images/programming-ide/debugger/02-search-debugger.png)

The debugger pane will appear as shown below:
![debugger-pane](https://docimg.replit.com/images/programming-ide/debugger/03-debugger-pane.png)

## Multiplayer Debugging Experiencing

When debugging a program in a Repl, app participants will see all actions performed by any other participant. This means that the debugging experience will be shared by all participants in a Repl, including:

- The breakpoints.
- The place / time where the program is paused.
- The contents of the variables.
- The output of the console.

## Adding breakpoints

To start, add [breakpoints](https://en.wikipedia.org/wiki/Breakpoint) to your Repl. Breakpoints are lines of the code where the program will pause during execution while debugging but do not affect the program when run normally. When the program is paused, the Debugger will display the values of all variables, eliminating the need for print/log statements.

![add-breakpoints](https://docimg.replit.com/images/programming-ide/debugger/04-add-breakpoints.png)

## Starting and Controlling Debugger

1. **Starting the Debugger:** With your breakpoints set, click the play button in the debugger panel to start the debugging process:
   ![run-debugger](https://docimg.replit.com/images/programming-ide/debugger/05-run-debugger.png)

   The program will run until it reaches a breakpoint, then pause for inspection.

2. **Advancing the Debugger:** Use the "Next Step" button to advance the program to the next possible line where it can be stopped inside your source code. For example, if the current line calls a function, "Next Step" will go inside the function. If it is last line in a function, "Next Step" will return to where that function was called.

3. **Jumping to the Next Breakpoint:** The "Next Breakpoint" button will advance the program to the next breakpoint or until the program finishes if there are no more breakpoints after the current one.

4. **Stopping the Debugger:** The "Stop" button terminates the debugging session and kills the process being debugged.

## Inspecting Variables

While the debugger is running and your program is paused, you can view a list of variables in scope. For this demo, we see a `numbers` list and an `i` variable created by a `for` loop:
![variable-inspector](https://docimg.replit.com/images/programming-ide/debugger/07-variable-inspector.png)

Once you identify the issue, you can stop the debugger and fix the problem.

## Stopping the Debugger

Click the "stop" button (the square button) to exit the debugger and run your program normally.

In the example provided earlier, the issue was with the `i` variable from the `for` loop starting at `1` instead of `0`, causing the first item of the array to be missed.
![fixing-the-code](https://docimg.replit.com/images/programming-ide/debugger/08-fixing-the-code.png)

After correcting the error by changing the range from `1..len` instead of `0..len` and running the code again, the program works as expected
![fixed-output](https://docimg.replit.com/images/programming-ide/debugger/09-fixed-output.png)

## Adding support for other languages through Nix

Support for additional languages through [Nix](https://docs.replit.com/programming-ide/nix-on-replit) is coming soon. This feature will expand the debugger's capabilities, allowing users to debug programs in even more languages within the Replit environment.
