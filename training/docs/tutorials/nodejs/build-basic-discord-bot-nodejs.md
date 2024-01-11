---
sidebar_position: 46
---

# Building a Discord bot with Node.js and Replit

In this tutorial, we'll use [Replit](https://replit.com) and Node.js to build a Discord chatbot. The bot will be able to join a Discord server and respond to messages.

If you prefer Python, here's a [Python Discord bot tutorial](/tutorials/python/discord-role-bot).

You'll find it easier to follow along if you have some JavaScript knowledge and you should have used Discord or a similar app such as Skype or Telegram before. We won't be covering the very basics of Node.js, but we will explain each line of code in detail, so if you have any experience with programming, you should be able to follow along.

## Overview and requirements

We'll be doing all of our coding through the Replit web IDE, and we'll host our bot with Replit too, so you won't need to install any additional software on your machine. For this tutorial you will need to create a [Discord](https://discordapp.com/) account (if you already have one, you can skip this).

We will cover:

- Creating an application and a bot user in your Discord account.
- Creating a server on Discord.
- Adding our bot to our Discord server.

Let's get through these admin steps first and then we can get to the fun part of coding our bot.

### Creating a bot in Discord and getting a token

You can sign up for a free account over at [Discord](https://discordapp.com/register), and you can download one of their desktop or mobile applications from [the Discord homepage](https://discordapp.com/). You can also use Discord in the browser.

Once you have an account, you'll want to create a Discord application. Visit [the Discord developer's page](https://discordapp.com/developers/applications/) and press the "New application" button, as in the image below.

![Creating a new Discord application](https://replit-docs-images.bardia.repl.co/images/tutorials/basic-discord-bot-nodejs/new-discord-app.png)

Fill out a name for your bot and select "Create".

The first thing to do on the next page is to note your Application ID, which you'll need to add the bot to the server. You can come back later and get it from this page, or copy it somewhere so you can find it when you need it.

![Record your Client ID](https://replit-docs-images.bardia.repl.co/images/tutorials/basic-discord-bot-nodejs/app-id.png)

You can also rename the application and provide a description for your bot, then press "Save Changes".

You have now created a Discord application. The next step is to add a bot to this application, so head over to the "Bot" tab using the menu on the left and press the "Add Bot" button, as shown below. Click "Yes, do it" when Discord asks if you're sure about bringing a new bot to life.

![Adding a bot to our Discord Application](https://replit-docs-images.bardia.repl.co/images/tutorials/basic-discord-bot-nodejs/add-bot.png)

The last thing we'll need from our bot is a token. Anyone who has the bot's token can prove that they own the bot, so you'll need to be careful not to share this with anyone. You can get the token by pressing "Reset Token", and then copy it to your clipboard by pressing "Copy".

![Generating a token for our Discord bot](https://replit-docs-images.bardia.repl.co/images/tutorials/basic-discord-bot-nodejs/get-token.png)

![Copying a token for our Discord bot](https://replit-docs-images.bardia.repl.co/images/tutorials/basic-discord-bot-nodejs/copy-token.png)

Take note of your token or copy it to your clipboard, as we'll need to add it to our code soon.

### Creating a Discord server

If you don't have a Discord server to add your bot to, you can create one by either opening the desktop Discord application that you downloaded earlier or returning to the Discord home page in your browser. Press the "+" icon, as shown below, to create a server.

![Creating a Discord server](https://replit-docs-images.bardia.repl.co/images/tutorials/basic-discord-bot-nodejs/create-server.png)

Press "Create a server" in the screen that follows, and then give your server a name. Once the server is up and running, you can chat with yourself, or invite some friends to chat with you. Soon we'll invite our bot to chat with us as well.

### Adding your Discord bot to your Discord server

Our Discord bot is still just a shell at this stage as we haven't written any code to allow it to do anything, but let's go ahead and add the bot to our Discord server anyway. To add a bot to your server, you'll need the Application ID from the "General Information" page that we looked at before when we created our ReplBotApplication (ie. the application ID, not the secret bot token).

Create a URL that looks as follows, but using your application ID instead of mine at the end (the link calls the application ID "client_id"):

https://discordapp.com/api/oauth2/authorize?scope=bot&client_id=746269162917331028

Visit the URL that you created in your web browser and you'll see a page similar to the following where you can choose which server to add your bot to.

![Authorizing our bot to join our server](https://replit-docs-images.bardia.repl.co/images/tutorials/basic-discord-bot-nodejs/add-bot-to-server.png)

Select the server we created in the step before this and hit the "Authorize" button. After completing the captcha, you should get an in-app Discord notification telling you that your bot has joined your server.

Now we can get to the fun part of building a brain for our bot!

## Creating a repl and installing our Discord dependencies

The first thing we need to do is create a Node.js repl to write the code for our Discord bot. Over at [Replit](https://replit.com), create a new repl, choosing "Node.js" as your language.

![Create a new repl](https://replit-docs-images.bardia.repl.co/images/tutorials/basic-discord-bot-nodejs/new-repl.png)

We don't need to reinvent the wheel as there is already a great Node wrapper for the Discord bot API called [discord.js](https://discord.js.org/). Normally we would install this third-party library through [npm](https://www.npmjs.com/), but because we're using Replit, we can skip the installation. Our repl will automatically pull in all dependencies.

In the default `index.js` file that is included with your new repl, add the following line of code:

```javascript
const Discord = require("discord.js");
```

Press the "Run" button and you should see Replit installing the Discord library in the output pane on the right, as in the image below.

![Installing Discord.js in our Repl](https://replit-docs-images.bardia.repl.co/images/tutorials/basic-discord-bot-nodejs/install-discord-js.png)

Our bot is nearly ready to go - but we still need to plug in our secret token. This will authorize our code to control our bot.

## Setting up authorization for our bot

By default, Replit code is public. This is great as it encourages collaboration and learning, but we need to be careful not to share our secret bot token (which gives anyone who has access to it full control of our bot).

To get around the problem of needing to give our _code_ access to the token while allowing others to access our code but _not_ our token, we'll be using [environment variables](https://www.digitalocean.com/community/tutorials/how-to-read-and-set-environmental-and-shell-variables-on-a-linux-vps). Replit allows us to set secret environment variables through the "Secrets (Environment variables)" menu option.

Open the "Secrets" menu option. There you will be able to set environment variables for your repl. Set the key as the name of your environment variable to `DISCORD_BOT_SECRET`. Set the value as your bot's secret token (note that this is the second token that we got while setting up the bot -- different from the Application ID that we used to add our bot to our server). It should look something like:

![Set Secrets Key Value](https://replit-docs-images.bardia.repl.co/images/tutorials/basic-discord-bot-nodejs/replit-secrets.png)

Let's make a Discord bot that repeats everything we say but in reverse. We can do this in just a few lines of code. In your `index.js` file, add the following:

```javascript
const Discord = require("discord.js");
const client = new Discord.Client({
  intents: ["GUILDS", "GUILD_MESSAGES"],
});

const token = process.env["DISCORD_BOT_SECRET"];

client.on("ready", () => {
  console.log("I'm in");
  console.log(client.user.username);
});

client.on("messageCreate", (msg) => {
  if (msg.author.id != client.user.id) {
    msg.channel.send(msg.content.split("").reverse().join(""));
  }
});

client.login(token);
```

Let's tear this apart line by line to see what it does.

- **Line 1** is the line we added earlier. This line tells Replit to install the third party library and brings it into this file so that we can use it.
- In **line 2**, we create a Discord `Client`. We'll use this client to send commands to the Discord _server_ to control our bot and send it commands.
- In **line 3-8**, we provide the `intents` of our `Client`, these are provided to designate which events our bot will be able to receive.
- In **line 9**, we retrieve our secret token from the environment variables (which Replit sets from the "Secrets" menu).
- In **line 11**, we define an `event` for our client, which defines how our bot should react to the `ready` event. The Discord bot is going to run _asynchronously_, which might be a bit confusing if you're used to running standard synchronous code. We won't go into asynchronous coding in-depth here, but if you're interested in what this is and why it's used, there's a good guide over at [RisingStack](https://blog.risingstack.com/node-hero-async-programming-in-node-js/). In short, instead of running the code in our file from top to bottom, we'll be running pieces of code in response to specific events.
- In **lines 12-14**, we define how our bot should respond to the `ready` event, which is fired when our bot successfully joins a server. We instruct our bot to output some information server-side (i.e. it will be displayed in our repl's output, but not sent as a message through to Discord). We'll print a simple "I'm in" message to see that the bot is there and print our bot's username (if you're running multiple bots, this will make it easier to work out who's doing what).
- **Lines 16-20** are similar, but instead of responding to a `ready` event, we tell our bot how to handle new messages. **Line 17** says we only want to respond to messages that aren't from us (otherwise our bot will keep responding to himself -- you can remove this line to see why that's a problem), and **line 18** says we'll send a new message to the same channel we received a message in (`msg.channel`) and the content we'll send will be the same message that we received, but backwards. To reverse a string, we split it into its individual characters, reverse the resulting array, and then join it all back into a string again.

The last line fires up our bot and uses the token we loaded earlier to log into Discord.

Press the "Run" button again and you should see your bot reporting a successful channel join in the repl output.

![Repl output showing channel join](https://replit-docs-images.bardia.repl.co/images/tutorials/basic-discord-bot-nodejs/bot-join.png)

Open Discord, and from within the server we created earlier, you will be able to send a message (by typing into the box highlighted below) and see your bot respond!

![Send a message to your bot](https://replit-docs-images.bardia.repl.co/images/tutorials/basic-discord-bot-nodejs/message-repl-bot.png)

The bot responds each time, reversing the text we enter.

![Our bot can talk!](https://replit-docs-images.bardia.repl.co/images/tutorials/basic-discord-bot-nodejs/repl-bot-response.png)

## Keeping our bot alive

Your bot can now respond to messages, but only for as long as your repl is running. If you close your browser tab or shut down your computer, your bot will stop and no longer respond to messages on Discord.

Replit will keep your code running after you close the browser tab only if you are running a web server. Our bot doesn't require an explicit web server to run, but we can create a server and run it in the background just to keep our repl alive.

Create a new file in your project called `keep_alive.js` and add the following code:

```javascript
var http = require("http");

http
  .createServer(function (req, res) {
    res.write("I'm alive");
    res.end();
  })
  .listen(8080);
```

We won't go over this in detail as it's not central to our bot, but here we start a web server that will return "I'm alive" if anyone visits it.

In our `index.js` file, we need to add a `require` statement for this server at the top. Add the following line near the top of `index.js`:

```javascript
const keep_alive = require("./keep_alive.js");
```

After doing this and hitting the green "Run" button again, you should see some changes to your repl. For one, you'll see a new pane in the top right that shows the web output from your server. We can see that visiting our repl now returns a basic web page showing the "I'm alive" string that we told our web server to return by default.

![Running a Node server in the background](https://replit-docs-images.bardia.repl.co/images/tutorials/basic-discord-bot-nodejs/keep-alive.png)

Now your bot will stay alive even after closing your browser or shutting down your development machine. Replit will still clean up your server and kill your bot after about one hour of inactivity, so if you don't use your bot for a while, you'll have to log into your repl and start the bot up again. Alternatively, you can set up a third-party (free!) service like [Uptime Robot](https://uptimerobot.com/). Uptime Robot pings your site every five minutes to make sure it's still working -- usually to notify you of unexpected downtime, but in this case the constant pings have the side effect of keeping our repl alive as it will never go more than an hour without receiving any activity. Note that you need to select the "HTTP" option instead of the "Ping" option when setting up Uptime Robot, as Replit requires regular HTTP requests to keep your chatbot alive, or you can use a [Deployment](/hosting/deployments/about-deployments) repl to keep it running 24/7.

## Forking and extending our basic bot

This is not a very useful bot as-is, but the possibilities are only limited by your creativity now! You can have your bot receive input from a user, process the input, and respond in any way you choose. In fact, with the basic input and output that we've demonstrated, we have most of the components of any modern computer, all of which are based on the [Von Neumann architecture](https://en.wikipedia.org/wiki/Von_Neumann_architecture) (we could easily add the missing memory by having our bot write to a file, or with a bit more effort link in a [SQLite database](https://www.sqlite.org/index.html) for persistent storage).

If you followed along with this tutorial, you'll have your own basic repl bot to play around with and extend. If you were only reading, you can easily fork my bot at [https://replit.com/@ritza/discord-bot-node-1](https://replit.com/@ritza/discord-bot-node-1) and extend it however you like (you'll need to add your own token and reset the secrets still). Happy hacking!

If you're stuck for ideas, you could try link up your Discord bot to the [Twitch API](https://dev.twitch.tv/) to get notified when your favorite streamers are online, or build a [text adventure](https://en.wikipedia.org/wiki/Interactive_fiction).

## Further Reading:

If you are interested, here's another Discord bot tutorial:

- [Role assignment bot with Python](/tutorials/python/discord-role-bot)

<iframe height="400px" width="100%" src="https://replit.com/@ritza/discord-bot-node-1?embed=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
