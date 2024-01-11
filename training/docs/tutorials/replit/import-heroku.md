---
title: Import a project from Heroku
---

# Import a project from Heroku

With Replit, you can write and host your code all in the same place.

If you already have an app or project running on Heroku and your code is stored Github, you can easily port it over to Replit.

## Importing your Heroku project from Github

GitHub repositories can be run automatically on Replit. Head to [replit.com/heroku](https://replit.com/heroku) to import a repository. Any public repository under 500 MB (or 1GiB with Replit Core membership) can be cloned. You can unlock private repos after authenticating with GitHub and purchasing a [Replit Core membership](https://replit.com/pricing).

1. Go to [replit.com/heroku](https://replit.com/heroku)

![new repl modal](https://docimg.replit.com/images/tutorials/import-heroku/import-heroku-modal.png)

2. Paste the link to your GitHub repository. If your repo is private, authenticate with GitHub first.

3. Select the repo, language, and owner of the Repl. Replit will try to detect the language of your repository automatically for you!

## Configuring your imported project

Replit imports all of files from your repo to the Repl. Replit also tries to configure your project to run correctly based on your `Procfile` or language. If that doesn't work, you can use our config editor to set the run command for yourself.

![visual config editor](https://docimg.replit.com/images/tutorials/import-heroku/visual-config.png)

You can use the shell to run any command and then set the "Run" button once you've decided what it should do.

Press "Done" to finalize your Repl's configuration and close the config editor.

It's always possible to make changes later by visiting the `.replit` file from the filetree.

Note: you can add `.replit` to existing GitHub repositories to skip the config step during the import process.

For more information on how to configure your repl, see the [.replit documentation](/programming-ide/configuring-repl).

## That's it!

Now you can edit, run, and host your project all from Replit. For more information go to our [getting started page](/).

Below is some information for advanced Heroku users.

### Multiple processes

Currently, Replit only supports running one process per repl, so if your Heroku app has multiple processes (like a web process and a worker) then consider moving one of them over to another Repl.

### Config, secrets, and environment variables

You will have to port over your config variables from your Heroku app to your Repl. Config variables are located in the settings tab of your Heroku project.

![Heroku config vars](https://docimg.replit.com/images/tutorials/import-heroku/heroku-config.png)

Please follow our [environment variable documentation](/programming-ide/workspace-features/secrets) to add them to your Repl.

### Add-ons

For free Heroku add-on alternatives, check out the following links:

- [Serverless Postgres](https://neon.tech/)
- [Serverless Redis](https://upstash.com/)
- [MongoDB](https://www.mongodb.com/)
- [Supabase](https://supabase.com/)
