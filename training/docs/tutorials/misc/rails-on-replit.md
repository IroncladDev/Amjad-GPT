# Running Rails on Replit

Running a Ruby on Rails application on Replit is usually quite easy and this guide hopes to hold your hand through the process.

## Starting from Scratch

If you are starting from scratch, it is recommended that you use the existing Ruby on Rails template.

## Starting from an existing Github Repository

If you already have a Rails application stored in a Github repository, and you want to clone the repository into Replit there are a few things that you need to do.

From the main menu, start by creating a Repl and importing your repository from Github.

After you hit Import from Github, and the repository has been cloned, you will have the option to select a run command. If Replit detects your imported repository as a Rails application, it will automatically supply you the appropriate run command. If not, for rails applications, you will want to put the following as the run command:

```
bundle exec rails server --binding=0.0.0.0
```

The app needs to be bound to `0.0.0.0` instead of `localhost` to be able to run on Replit.

The command is prefaced with `bundle exec` so that it runs in the context of the installed gems. Any Rails commands that you run must be prefaced with `bundle exec`.

Once the run command is set, you will likely also need to install all the existing necessary packages by running the following command in the shell:

```
bundle install
```

Once that is done, you should be free to try running the application by hitting the run button.

However, to fully utilize Replit's features, you will have to make two more changes.

First, you will have to allow `*.repl.co` hosts by adding the following line to `config/environments/development.rb`.

```
# Allow hosting on *.repl.co hosts
config.hosts << /.*\.repl.co/
```

![allow replit hosts](https://docimg.replit.com/images/misc/rails-env-dev-host.png)

Then, allow the app to be iframed on `replit.com` by adding the following lines to `config/application.rb`.

```
# Allow app to be iframed on replit.com
config.action_dispatch.default_headers = {
  'X-Frame-Options' => 'ALLOWFROM replit.com'
}
```

![allow app to be iframed on replit.com](https://docimg.replit.com/images/misc/rails-config-app.png)

Now, when you run your app, a window should pop up displaying your application.

![rails popup window](https://docimg.replit.com/images/misc/rails-window.png)

## Running Commands

**All commands must be prefaced by `bundle exec`.** This is so that the command runs in the context of the installed gems environment. The console pane will give you output from the server but you can run arbitrary command from the shell without stopping the server.

## FAQ

### Could not find 'bundler' required by your 'Gemfile.lock'

This probably means that the version of the bundler that your lock file requires is not the one we currently have on Replit. You can either install the appropriate version of the bundler or you can simply delete the `Gemfile.lock` and then run `bundle install` to reinstall the correct version of necessary packages and also recreate the lock file.
