---
sidebar_position: 45
---

# Building a Discord bot with Python and Replit

In this tutorial, we'll use [Replit](https://replit.com) and Python to build a Discord chatbot. If you're reading this tutorial, you probably have at least heard of Discord and likely have an existing account. If not, Discord is a VoIP and chat application that is designed to replace Skype for gamers. The bot we create in this tutorial will be able to join a Discord server and respond to messages sent by people.

If you prefer JavaScript, you can find [a translation of this tutorial using Node.js](https://www.codementor.io/@garethdwyer/building-a-discord-bot-with-node-js-and-repl-it-mm46r1u8y) instead of Python.

You'll find it easier to follow along if you have some Python knowledge and have used Discord or a similar app such as Skype or Telegram before. We won't be covering the very basics of Python, but we will explain each line of code in detail, so if you have any experience with programming, you should be able to follow along.

## Overview and requirements

We'll be doing all of our coding through the Replit web IDE and hosting our bot with Replit as well, so you won't need to install any additional software on your machine. For this tutorial you will need to create a [Discord](https://discord.com) account (if you already have one, you can skip this). There are instructions for how to do this in the next section.

In this tutorial, we will be covering:

- Creating an application and a bot user in your Discord account.
- Creating a server on Discord.
- Adding our bot to our Discord server.

Let's get through these admin steps first and then we can get to the fun part of coding our bot.

### Creating a bot in Discord and getting a token

You can sign up for a free account over at [Discord](https://discord.com/register), and can download one of their desktop or mobile applications from the [Discord homepage](https://discord.com). You can also use Discord in the browser.

Once you have an account, you'll want to create a Discord application. Visit the [Discord Developer Portal](http://discordapp.com/developers/applications) and press the "New application" button, as in the image below.

![Creating a new Discord application](https://docimg.replit.com/images/tutorials/basic-discord-bot-python/new-discord-app.png)

Fill out a name for your bot and select "Create".

The first thing to do on the next page is to note your Client ID, which you'll need to add the bot to the server. You can come back later and get it from this page, or copy it somewhere where you can easily find it later.

![Record your Client ID](https://docimg.replit.com/images/tutorials/basic-discord-bot-python/appid.png)

You can also rename the application and provide a description for your bot at this point and press "Save Changes".

You have now created a Discord application. The next step is to add a bot to this application, so head over to the "Bot" tab using the menu on the left and press the "Add Bot" button, as indicated below. Click "Yes, do it" when Discord asks if you're sure about bringing a new bot to life.

![Adding a bot to our Discord Application](https://docimg.replit.com/images/tutorials/basic-discord-bot-python/addbot.png)

The last thing we'll need from our bot is a Token. Anyone who has the bot's token can prove that they own the bot, so you'll need to be careful not to share this with anyone. You can get the token by pressing "Reset Token", and then copy it to your clipboard it by pressing "Copy".

![Generating a token for our Discord bot](https://docimg.replit.com/images/tutorials/basic-discord-bot-python/token.png)

Take note of your token or copy it to your clipboard, as we'll need to add it to our code soon.

#### Privileged Gateway Intents

In order for your bot to receive events such as `on_message`, you will need to enable the `SERVER MEMBERS INTENT` in your bot's settings. You can do this by going to the `Bot` tab in your application settings and enabling the `SERVER MEMBERS INTENT` switch.

![Enabling the SERVER MEMBERS INTENT](https://docimg.replit.com/images/tutorials/discord-bot/privileged-intents.png)

Read more about privileged gateway intents [here](https://discordpy.readthedocs.io/en/latest/intents.html).

### Creating a Discord server

If you don't have a Discord server to add your bot to, you can create one by either opening the desktop Discord application that you downloaded earlier or returning to the Discord home page in your browser. Press the "+" icon indicated by the exclamation mark, as shown below, to create a server.

![Creating a Discord server](https://docimg.replit.com/images/tutorials/basic-discord-bot-python/create-server.png)

Press "Create a server" in the screen that follows, and then give your server a name. Once the server is up and running, you can chat with yourself, or invite some friends to chat with you. Soon we'll invite our bot to chat with us as well.

### Adding your Discord bot to your Discord server

Our Discord bot is still just a shell at this stage as we haven't written any code to allow him to do anything, but let's go ahead and add him to our Discord server anyway. To add a bot to your server, you'll need the Client ID from the "General Information" page that we looked at before when we created our ReplBotApplication (ie. the client ID, not the secret bot Token).

Create a URL that looks as follows, but using your Client ID instead of mine at the end:

https://discordapp.com/api/oauth2/authorize?scope=bot&client_id=746269162917331028

Visit the URL that you created, in your web browser and you'll see a page similar to the following where you can choose which server to add your bot to.

![Authorizing our bot to join our server](https://docimg.replit.com/images/tutorials/basic-discord-bot-python/bottoserver.png)

Select the server we created in the step before this and hit the "authorize" button. After completing the captcha, you should get an in-app Discord notification telling you that your bot has joined your server.

Now we can get to the fun part of building a brain for our bot!

## Creating a Repl and installing our Discord dependencies

The first thing we need to do is create a Python Repl to write the code for our Discord bot. Over at [Replit](https://replit.com), create a new Repl, choosing "Python" as your language.

![New REPL](https://docimg.replit.com/images/tutorials/basic-discord-bot-python/new-repl.png)

We don't need to reinvent the wheel, as there is already a great Python wrapper for the Discord bot API over on [GitHub](https://github.com/Rapptz/discord.py), which makes it a lot faster to get set up with a basic Python discord bot. To use the library, we can simply write `import discord` at the top of `main.py`. Replit will handle installing this dependency when you press the "run" button.

![Import discord](https://docimg.replit.com/images/tutorials/basic-discord-bot-python/import.png)

Our bot is nearly ready to go -- but we still need to plug in our secret token. This will authorize our code to control our bot.

## Setting up authorization for our bot

By default, Replit code is public. This is great as it encourages collaboration and learning, but we need to be careful not to share our secret bot token (which gives anyone who has access to it full control of our bot).

To get around the problem of needing to give our _code_ access to the token while allowing others to access our code but _not_ our token, we'll be using [environment variables](https://www.digitalocean.com/community/tutorials/how-to-read-and-set-environmental-and-shell-variables-on-a-linux-vps). Replit allows us to set secret environment variables through the "Secrets (Environment variables)" menu option.

![Secrets Menu Option](https://docimg.replit.com/images/tutorials/basic-discord-bot-python/secrets-menu.png)

Open the "Secrets" menu option, there you will be able to set environment variables for your Repl. Set the key as the name of your environment variable to `DISCORD_BOT_SECRET`. Set the value as your bot's secret token (note that this is the second token that we got while setting up the bot -- different from the Client ID that we used to add our bot to our server). It should look something like:.

![Set Secrets Key Value](https://docimg.replit.com/images/tutorials/basic-discord-bot-python/secrets.png)

You'll need to:

- **Replace** the token (in the value section) with the token that Discord gave you when creating your own bot.
- Click "Add new secret" to create your environment variable.
- Run the code again. Sometimes you'll need to refresh the whole page to make sure that your environment variables are successfully loaded.

Let's make a Discord bot that repeats everything we say but in reverse. We can do this in only a few lines of code. In your `main.py` file, add the following:

```python
import os
import discord

discord.Client(intents=discord.Intents.all())

@client.event
async def on_ready():
    print("I'm in")
    print(client.user)

@client.event
async def on_message(message):
    if message.author != client.user:
        await message.channel.send(message.content[::-1])

my_secret = os.environ['DISCORD_BOT_SECRET']
client.run(my_secret)
```

Let's tear this apart line by line to see what it does.

- **Lines 1-2** import the discord library that we installed earlier and the built-in operating system library, which we'll need to access our bot's secret token.
- In **line 4**, we create a Discord `Client`. This is a Python object that we'll use to send various commands to Discord's servers.
- In **line 6**, we say we are defining an `event` for our client. This line is a Python decorator, which will take the function directly below it and modify it in some way. The Discord bot is going to run _asynchronously_, which might be a bit confusing if you're used to running standard Python. We won't go into asynchronous Python in depth here, but if you're interested in what this is and why it's used, there's a good guide over at [FreeCodeCamp](https://medium.com/free-code-camp/a-guide-to-asynchronous-programming-in-python-with-asyncio-232e2afa44f6). In short, instead of running the code in our file from top to bottom, we'll be running pieces of code in response to specific events.
- In **lines 7-9** we define what kind of event we want to respond to, and what the response should be. In this case, we're saying that in response to the `on_ready` event (when our bot joins a server successfully), we should output some information server-side (i.e. this will be displayed in our Repl's output, but not sent as a message through to Discord). We'll print a simple `I'm in` message to see that the bot is there and print our bot's user id (if you're running multiple bots, this will make it easier to work out who's doing what).
- **Lines 11-14** are similar, but instead of responding to an `on_ready` event, we tell our bot how to handle new messages. **Line 13** says we only want to respond to messages that aren't from us (otherwise our bot will keep responding to himself -- you can remove this line to see why that's a problem), and **line 14** says we'll send a new message to the same channel where we received a message (`message.channel`) and the content we'll send will be the same message that we received, but backwards (`message.content[::-1]` - `::-1` is a slightly odd but useful Python idiom to reverse a string or list).

The last two lines get our secret token from the environment variables that we set up earlier and then tell our bot to start up.

Press the "Run" button again and you should see your bot reporting a successful channel join in the Repl output.

![Seeing our bot join our server](https://docimg.replit.com/images/tutorials/basic-discord-bot-python/botjoin.png)

Open Discord, and from within the server we created earlier, select your ReplBotApplication from the pane on the right-hand side of the screen.

![The Repl bot is active](https://docimg.replit.com/images/tutorials/basic-discord-bot-python/selectbot.png)

Once you have selected this, you will be able to send a message (by typing into the box highlighted below) and see your bot respond!

![Send a message to your bot](https://docimg.replit.com/images/tutorials/basic-discord-bot-python/messagebox.png)

The bot responds each time, reversing the text we enter.

![Our bot can talk](https://docimg.replit.com/images/tutorials/basic-discord-bot-python/chat.png)

## Keeping our bot alive

Your bot can now respond to messages, but only for as long as your Repl is running. If you close your browser tab or shut down your computer, your bot will stop and no longer respond to messages on Discord.

Replit will keep your code running after you close the browser tab only if you are running a web server and you have a [Deployment](/hosting/deployments/about-deployments) framework.

Create a new file in your project called `keep_alive.py` and add the following code:

```python
from flask import Flask
from threading import Thread

app = Flask('')

@app.route('/')
def home():
    return "I'm alive"

def run():
  app.run(host='0.0.0.0',port=8080)

def keep_alive():
    t = Thread(target=run)
    t.start()
```

We won't go over this in detail as it's not central to our bot, but here we start a web server that will return "I'm alive" if anyone visits it, and we'll provide a method to start this in a new thread (leaving the main thread for our Repl bot).

In our `main.py` file, we need to add an import for this server at the top. Add the following line near the top of `main.py`.

```python
from keep_alive import keep_alive
```

In `main.py` we need to start up the web server just before you start up the bot. Add this line of code to `main.py`, just before the line with `my_secret = os.environ['DISCORD_BOT_SECRET']`:

```python
keep_alive()
```

After doing this and hitting the green "Run" button again, you should see some changes to your Repl. For one, you'll see a new pane in the top right which shows the web output from your server. We can see that visiting our Repl now returns a basic web page showing the "I'm alive" string that we told our web server to return by default. In the bottom-right pane, you can also see some additional output from Flask starting up and running continuously, listening for requests.

![Output from our Flask server](https://docimg.replit.com/images/tutorials/basic-discord-bot-python/keepalive.png)

Now your bot will stay alive even after closing your browser or shutting down your development machine. Repl will still clean up your server and kill your bot after about one hour of inactivity, so if you don't use your bot for a while, you'll have to log into Repl and start the bot up again or use a [Deployments](/hosting/deployments/about-deployments) repl to keep it running 24/7.

## Forking and extending our basic bot

This is not a very useful bot as is, but the possibilities are only limited by your creativity now! You can have your bot receive input from a user, process the input, and respond in any way you choose. In fact, with the basic input and output that we've demonstrated, we have most of the components of any modern computer, all of which are based on the [Von Neumann architecture](https://en.wikipedia.org/wiki/Von_Neumann_architecture) (we could easily add the missing memory by having our bot write to a file, or with a bit more effort by linking an [SQLite database](https://www.sqlite.org/index.html) for persistent storage).

If you followed along with this tutorial, you'll have your own basic Repl bot to play around with and extend. If you were simply reading, you can easily fork this bot at [https://replit.com/@ritza/discord-bot](https://replit.com/@ritza/discord-bot) and extend it how you want. Happy hacking!

If you're stuck for ideas, why not link up your Discord bot to the [Twitch API](https://dev.twitch.tv/) to get notified when your favourite streamers are online, or build a [text adventure](https://en.wikipedia.org/wiki/Interactive_fiction).

You can also check out this [tutorial](https://www.codementor.io/@garethdwyer/building-a-discord-bot-with-node-js-and-repl-it-mm46r1u8y), where we build exactly the same bot but using Node.js instead of Python. Even if you prefer Python, it's often a good idea to build the same project in two languages so that you can better appreciate the differences and similarities.

## Further Reading:

If you are interested, here are some more Discord bot tutorials:

- [Role assignment bot with Python](/tutorials/python/discord-role-bot)

You can find our repl below:

<iframe height="400px" width="100%" src="https://replit.com/@ritza/discord-bot?embed=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
