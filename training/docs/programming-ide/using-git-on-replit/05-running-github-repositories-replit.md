# Running GitHub repositories on Replit

GitHub repositories can be run automatically on Replit. Head to [https://replit.com/github](https://replit.com/github) to import a repository. You can unlock private repositories after authenticating with GitHub and purchasing the [Replit Core membership](https://replit.com/pricing).

![import modal](https://docimg.replit.com/images/programming-ide/running-github-repositories-replit/XOFmfO94Du.png)

From the modal above, you can select the repo, language, and owner of the Repl. We will automatically detect the language if your GitHub repository already has a `.replit` file!

## Configuring a Cloned Repo

When you clone a repository without a `.replit` file, we automatically show the visual `.replit` editor:

![Visual config editor](https://docimg.replit.com/images/programming-ide/running-github-repositories-replit/2QlSkG7YCB.png)

This will automatically create the `.replit` file and make it possible to customize how the repl will run.

You can use the shell to run any command and then set the "Run" button once you've decided what it should do.

Clicking "done" will finalize the Repl's configuration and close the visual editor.

Adding a `.replit` file to a repository makes cloning fast with no configuration necessary. The configuration file can always be changed at any time. For more information on how to configure your Repl, see the documentation on [Configuring your Repl](/programming-ide/configuring-repl).

## Adding a "Run on Replit" Badge

<img
style={{ height: 40, width: 190 }}
src="https://replit.com/badge/github/replit/clui"
/>

After configuring a run command for your Repl, you can add a badge to your repository README that will allow anyone to run your project automatically!

### Generate a badge

<iframe
  style={{ border: 0, width: '100%', height: 280 }}
  src="https://run-on-replit.util.repl.co">
</iframe>
