---
title: Telegram bot
---

# Quick-start Telegram Bot

If you've ever used an online forum, you may have seen that there are sometimes ways to post messages other than doing it straight on the forum, like posting by email.

In this tutorial, we'll build a public message board and instead of users posting messages directly on the site, they'll send them to a Telegram bot.

The messages will simply contain the message text, but we'll provide further information on how to use other data, such as the usernames of users. We will leave it as an exercise for you to expand the functionality.

![Bot functionality](https://docimg.replit.com/images/tutorials/18-telegram-bot/bot_functionality.gif)

## Prerequisites

To follow along in this tutorial:

- You should be familiar with basic Python programming.
- You will need to have [Telegram downloaded](https://telegram.org/), and an account.
- You will also need a Replit account, so [create one now](https://replit.com/signup) if you haven't already.

It would be helpful if you are familiar with the [Replit database](/tutorials/python/using-the-replit-database), but it's not a necessity.

## Registering a Bot

We need to register our bot on Telegram to generate the credentials we'll use to connect to the Telegram API. Each bot requires a user account to be responsible for it. This can be done using Telegram's official management bot called the "BotFather".

To do this, start by signing into your Telegram client and searching for "@bot" in the chat search. **Be sure to select the verified account** (the one with the checkmark beside it), otherwise we may end up talking to someone impersonating the official BotFather.

![BotFather search](https://docimg.replit.com/images/tutorials/18-telegram-bot/bot_father.png)

To activate the BotFather, click on "start".

![Activating BotFather](https://docimg.replit.com/images/tutorials/18-telegram-bot/bot_father_start.png)

We can send BotFather the command "/newbot" to begin the bot creation workflow.

It will ask us for:

- The name of the bot which will be displayed on the top of the new bot's chat, for example, "Replit Quick-start Tutorial".

- The username, which will be used to reference the bot uniquely, for example, "@replit_tutorialbot".

Note: It is useful to have a short username to make it easier for users to type it out – especially if you plan on adding an inline mode.

![Generating bot token](https://docimg.replit.com/images/tutorials/18-telegram-bot/token.png)

Once we have answered all the questions, the BotFather will send us our authentication token which will look something like this: `110201543:AAHdqTcvCH1vGWJxfSeofSAs0K5PALDsaw`.

Note that the whole string (the colon and both strings on either side of it) is the token.

## Making a Bot Interface

We can now begin writing the part of the program that handles requests from Telegram. Create a new repl and select Python from the language dropdown.

![Creating a new Repl](https://docimg.replit.com/images/tutorials/18-telegram-bot/new_repl.png)

Our bot needs to interact with Telegram. We will need to access the Telegram REST API. There are many ways of doing this, but for the sake of this tutorial, we'll use a convenience library that wraps around the API.

Before we can go any further, we need to make our token accessible for our bot to use later on. Create a `TOKEN` environment variable by clicking the lock icon in the sidebar as shown below, and paste your bot token that you noted earlier, something like `110201543:AAHdqTcvCH1vGWJxfSeofSAs0K5PALDsaw`:

![Creating a new environment variables](https://docimg.replit.com/images/tutorials/18-telegram-bot/env_variables.png)

This will ensure that our token is available as an environment variable and that it cannot be accessed by people publicly viewing the repl.

### Creating a barebones bot

Now that we're all set up, we can get coding! We will start with the following in our `main.py` file:

```python
import os

from telegram import Update #upm package(python-telegram-bot)
from telegram.ext import Updater, CommandHandler, MessageHandler, Filters, CallbackContext  #upm package(python-telegram-bot)


def help_command(update: Update, context: CallbackContext) -> None:
    htext = '''
Welcome
Send a message to store it.
Send /fetch to retrieve the most recent message'''
    update.message.reply_text(htext)


def main():
    updater = Updater(os.getenv("TOKEN"))

    dispatcher = updater.dispatcher
    dispatcher.add_handler(CommandHandler("start", help_command))
    dispatcher.add_handler(CommandHandler("help", help_command))

    updater.start_polling()

    updater.idle()


if __name__ == '__main__':
    main()
```

At the top, we import `os` so that we can get our token from the environment variable.

We then import classes from the Telegram library.

The comments starting with `#upm` are not optional. They are used by Replit to download the correct package. It is not needed in general, but it is needed here because there are a lot of similar Telegram libraries.

The `help_command` function is run whenever the user sends us a "/start" or "/help" command. "/start" is also automatically run when a new user joins your bot (like we did earlier with the BotFather). The bot knows to use this function because we tell it later in the `main` function's body.

The `main` function initialises an updater for us, using our token.

```python
updater = Updater(os.getenv("TOKEN"))
```

The updater is the class that will continuously check Telegram for new messages for our bot.

When the updater gets a new message, it hands it over to the dispatcher. The dispatcher checks if we have an appropriate handler for the message. As mentioned above, we define ours to handle the commands "/start" and "/help". We do that with the `add_handler` function, like this:

```python
dispatcher.add_handler(CommandHandler("start", help_command))
```

and

```python
dispatcher.add_handler(CommandHandler("help", help_command))
```

To keep it simple, the "/start" command and the "/help" command have the same handler here, but you could decide to have a different function for handling each if you wanted.

We then need to actually tell the updater to start checking for new messages. We accomplish that with this line:

```python
updater.start_polling()
```

It's important to know that `start_polling` is a non-blocking function. That means that the code won't halt execution here. It will just carry on until the program terminates.

In other words, if we left this as our last line of the `main` function, the code would execute and then immediately exit because there was nothing else blocking it. So to keep our bot listening, we use the line `updater.idle()` to block the script while we are listening.

### Logging functionality

According to the help text, there are two things the bot should do.

1. If you send a message to the bot, it should store it somehow.

2. If you send the bot the "/fetch" command, it should send you back the latest message.

To accomplish this, we will use Replit's key-value database. Start by importing the API.

```python
from replit import db
```

`db` is an object that behaves like a dictionary but persists its content between runs. It also serializes its keys as strings.

Since we want to store logged messages in a certain order, but the db object is not inherently ordered, let's create a helper function that can get the largest key (assuming we are only going to use numeric indices). Add this function before the definition of the `help_command` function:

```python
def latest_key():
    ks = db.keys()
    if len(ks):
        return max(map(int, ks))
    else:
        return -1
```

`latest_key` gets all the keys from our db. If there are keys, convert them all to integers and return the biggest one. If there aren't any keys, `return -1`.

We can now create a handler that logs the user's messages to the database. Add this function after the definition of the `help_command` function:

```python
def log(update: Update, context: CallbackContext) -> None:
    db[str(latest_key() + 1)] = update.message.text
```

This gets the latest key from the database, increments it by one, and sets a new key-pair with the message.

However, this will not be run until we register the handler, so add the following line after the other `dispatcher.add_handler(...)` lines:

```python
dispatcher.add_handler(MessageHandler(Filters.text & ~Filters.command, log))
```

You may notice that `MessageHandler` is used instead of `CommandHandler`. This is a more general handler that selects messages based off flags that you supply. In this case, it handles messages that contain text but aren't commands.

We can now log messages, but we can't see them yet. Let's add a handler that lets a user fetch the latest message. Add this function after the definition of the `log` function:

```python
def fetch(update: Update, context: CallbackContext) -> None:
    update.message.reply_text(db.get(str(latest_key()), 'No Messages yet.'))
```

We can register this one along with the other command handlers. Add this after the existing `dispatcher.add_handler(...)` lines:

```python
dispatcher.add_handler(CommandHandler("fetch", fetch))
```

## Make a Web UI

Now that we have a functional bot, we want to add a web interface for it. The tool we'll use is Flask. We can include the following code after our other imports and before our `latest_key` function definition.

```python
from math import ceil
from flask import render_template
from flask import Flask
app = Flask(__name__)

@app.route('/')
@app.route('/<int:page>')
def home(page=None):
    ks = sorted(map(int, db.keys()))
    pages = ceil(len(ks) / 10)
    if page is None: #Default to latest page
        page = pages

    if page < pages:
        next_page = page + 1
    else:
        next_page = None
    if page > 1:
        prev_page = page - 1
    else:
        prev_page = None

    messages = tuple(db[str(key)] for key in ks[(page-1)*10:page*10])

    return render_template('home.html', messages=messages, next_page=next_page, page=page, prev_page=prev_page)
```

This defines a small Flask app. Replit takes care of our Flask import. For this tutorial, we'll only make a single page.

We tell Flask how the page should be reachable with special decorators. `@app.route('/')` says that when the user accesses at `https://example.com`, it will serve this handler. In this case, the variable "page" will default to None.

`@app.route('/<int:page>')` says that when a user accesses something like `https://example.com/4` then it will open to page 4 of the logged messages. In this case, the variable "page" will be set to 4.

This won't work yet, because our template `home.html` doesn't exist. Let's create that now in a folder called "templates" (i.e. templates/home.html):

```python
<!doctype html>
<h1>Messages - Page {{ page }}</h1>
<ul>
 {% for msg in messages %}
 <li>{{ msg | escape }}</li>
 {% endfor %}
</ul>

{% if prev_page %}<a href='/{{ prev_page }}'>Previous Page</a>{% endif %}
{% if prev_page and next_page %}|{% endif%}
{% if next_page %}<a href='/{{ next_page }}'>Next Page</a>{% endif %}
```

This template will output a page of logged messages and links to the next or previous page at the bottom.

The template requires a variable "page" for the page number and an array of "messages" that is looped through and displayed as a list. It also takes in variables "prev_page" and "next_page" which we use to create links to the previous page and next page, if they exist respectively. These are all provided in our route function above when we run `render_template`.

How do we calculate the maximum number of pages?

```python
pages = ceil(len(ks) / 10)
```

That is to say, we divide the number of keys in our Replit database by ten and round it up. We can also use this number as our default. That way, if someone visits the plain "/" route, we will just display the latest page.

```python
if page is None:
    page = pages
```

We know that the last messages will be the "latest" because we sorted them in ascending order in the line before.

"prev_page" and "next_page" are the current page either decremented or incremented if they are a valid page numbers (otherwise set to None so that the template doesn't display them).

## Putting it All Together

If we run our program now, the Flask web app won’t work yet. Flask needs to listen for requests in a similar way to the Telegram library. We might normally end the program with `app.run()` to start the Flask server.

The problem is that this line of code would never be reached in normal circumstances because we have the line `updater.idle()` blocking our code before that. To solve this, we can replace this line with the line that starts our Flask server in the foreground. This is because the only reason we had the line was to stop the program from quitting prematurely and Flask accomplishes the same anyway. So, let's change it to this:

```python
#updater.idle()
app.run(host='0.0.0.0', port=8080)
```

The parameters, host and port set to these values allow Replit to access the server and should normally display a window with our page’s content. We can now browse through messages sent to this bot by users.

## Make it Your Own

If you've followed along, you'll have your own version of the repl to extend. Otherwise, start from ours.

<iframe height="400px" width="100%" src="https://replit.com/@ritza/telegram-bot?embed=1" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Where Next?

Try using the "/setcommands" command in the BotFather to add a quick-menu for the commands in your bot. Usage is described [here](https://core.telegram.org/bots#6-botfather).

If we wanted access to the username of a person sending a message, we could access it in a similar way that we would access the message's text:

```python
username = update.message.from_user.username
```

You can check [the documentation](https://python-telegram-bot.readthedocs.io/en/stable/telegram.message.html#telegram.Message) for a list of additional data made available.
