# Complete Code

Replit AI is a code completion tool that provides suggestions based on the code in your current file. To use it, simply start coding and the suggestions will appear inline.

## Features

- Code completion suggestions based on your current file
- Enhanced suggestions by using code comments
- Prompt engineering for improved results
- Toggle code completion on or off in editor settings

## How to Use

1. Start coding in your file and Replit AI will provide code completion suggestions.
2. Use code comments to provide additional context for more accurate suggestions.
3. Write clean, relevant code and comments for the best results from Replit AI.
4. If desired, toggle Replit AI on or off in the editor settings.

## Examples

Here is an example of Replit AI providing basic code completion suggestions:

![replitai basic code generation](https://docimg.replit.com/images/replitai/complete-code-examples-code-generation.png)

And here is an example of Replit AI using code comments to generate more accurate suggestions:

![replitai basic code generation](https://docimg.replit.com/images/replitai/complete-code-examples-accurate-suggestion.png)

## Prompt Engineering

Good prompts for AI code helpers like Replit AI can greatly improve the tool's performance and usefulness. Here are some examples of original prompts and improved versions that provide more context and detail:

| Original Prompt                                      | Improved Prompt                                                                                                        | Possible AI Confusion                                                                                                                                  |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `// write a function that adds two numbers together` | `// a function that returns the sum of two numbers`                                                                    | Replit AI might get confused with what to do with the added numbers. In the original prompt, no steps are specified with what to do with the result. |
| `// event listener`                                  | `// 'ready' event listener`                                                                                            | Replit AI will not know what to write next if only 'event listener' is specified.                                                                    |
| `// fetch a random image from unsplash`              | `// use axios to fetch a random image from the unsplash api`                                                           | Replit AI  might accidentally provide a URL instead of actually making the api call.                                                                  |
| `/* apply a custom style to my checkbox */`          | `/* select all html elements with the .checkbox class and use labels and pseudo-elements to give it a custom style */` | Replit AI  will most likely get confused selecting the checkbox element.                                                                              |
| `// create an array of numbers`                      | `// create an array of numbers from 0 to 10`                                                                           | Replit AI  might not know which numbers to include in the array without more specific instructions.                                                   |
| `// sort the list of names`                          | `// sort the list of names alphabetically`                                                                             | Replit AI  might not know the desired sorting order without more specific instructions.                                                               |
| `// read data from the file`                         | `// read data from the file 'data.txt'`                                                                                | Replit AI  might not know which file to read without a specific filename.                                                                             |
| `// connect to the database`                         | `// connect to the MySQL database using the 'mysql' library`                                                           | Replit AI might not know which database to connect to or which library to use.                                                                       |
| `// loop through the list`                           | `// loop through the list of numbers and print each one`                                                               | Replit AI might not know what to do with the list items without specific instructions.                                                               |
| `// insert a new record`                             | `// insert a new record into the 'users' table`                                                                        | Replit AI might not know which table to insert into without a specific table name.                                                                   |

## Toggling Code Completion

To deactivate Replit AI's Code Completion feature, go to bottom of your editor, click AI and uncheck the Enable button. This can also be completed within the Settings pane. 

![toggle code completion](https://docimg.replit.com/images/replitai/Toggling-Code-Completion.png)
