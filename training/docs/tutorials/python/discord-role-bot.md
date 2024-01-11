---
title: Discord role assignment bot with Python
---

# Creating a Discord role assignment bot with Python

[Discord](https://discord.com/) is a free-to-use chat server application that was initially developed for gamers but is becoming increasingly widely used by many different communities. Anyone can use it to create a chat server for discussion over text as well as voice and video. In addition to hosting human members, these servers can also host special automated users, called bots, which are capable of a variety of fun and useful tasks: everything from playing music to helping human moderators.

In this tutorial, we'll create a welcome bot for our programming discussion Discord server. This bot will welcome users as they join and assign them roles and private channels based on their stated interests. By the end of this tutorial, you will:

- Have familiarity with the process of creating a Discord bot application.
- Be able to use [discord.py](https://discordpy.readthedocs.io/en/stable/) to develop useful bot logic.
- Know how to host Discord bots on Replit!

## Getting started

Sign in to [Replit](https://replit.com) or [create an account](https://replit.com/signup) if you haven't already. Once logged in, create a Python repl.

![Creating a new repl](https://docimg.replit.com/images/tutorials/46-discord-role-bot/create-repl.png)

## Creating a Discord application

Open another browser tab and visit the [Discord Developer Portal](http://discordapp.com/developers/applications). Log in with your Discord account, or create one if you haven't already. Keep your repl open – we'll return to it soon.

Once you're logged in, create a new application. Give it a name, like "Welcomer".

![Creating a new Discord application](https://docimg.replit.com/images/tutorials/46-discord-role-bot/discord-create-app.png)

Discord applications can interact with Discord in several different ways, not all of which require bots, so creating one is optional. That said, we'll need one for this project. Let's create a bot.

1. Click on **Bot** in the menu on the left-hand side of the page.
2. Click **Add Bot**.
3. Give your bot a username (such as "WelcomeBot").
4. Click **Reset Token** and then **Yes, do it!**
5. Copy the token that appears just under your bot's username.

![Creating a Discord bot](https://docimg.replit.com/images/tutorials/46-discord-role-bot/discord-create-bot.png)

The token you just copied is required for the code in our repl to interface with Discord's API. Return to your repl and open the Secrets tab in the left sidebar. Create a new secret with `DISCORD_TOKEN` as its key and the token you copied as its value.

![Secret token](https://docimg.replit.com/images/tutorials/46-discord-role-bot/secret-token.png)

Once, you've done that, return to the Discord developer panel. We need to finish setting up our bot.

First, disable the Public Bot option – the functionality we're building for this bot will be highly specific to our server, so we don't want anyone else to try to add it to their server. What's more, bots on 100 or more servers have to go through a special verification and approval process, and we don't want to worry about that.

Second, we need to configure access to privileged [Gateway Intents](https://discord.com/developers/docs/topics/gateway#gateway-intents). Depending on a bot's functionality, it will require access to different events and sources of data. Events involving users' actions and the content of their messages are considered more sensitive and need to be explicitly enabled.

For this bot to work, we'll need to be able to see when users join our server, and we'll need to see the contents of their messages. For the former, we'll need the Server Members Intent and for the latter, we'll need the Message Content Intent. Toggle both of these to the "on" position. Save changes when prompted.

![Bot intents](https://docimg.replit.com/images/tutorials/46-discord-role-bot/bot-intents.png)

Now that we've created our application and its bot, we need to add it to a server. We'll walk you through creating a test server for this tutorial, but you can also use any server you've created in the past, as long as the other members won't get too annoyed about it becoming a bot testing ground. You can't use a server that you're just a normal user on, as adding bots requires special privileges.

Open [Discord.com](http://discord.com) in your browser. You should already be logged in. Then click on the **+** icon in the leftmost panel to create a new server. Alternatively, open an existing server you own.

![New server](https://docimg.replit.com/images/tutorials/46-discord-role-bot/new-server.png)

In a separate tab, return to the [Discord Dev Portal](https://discord.com/developers/applications) and open your application. Follow these steps to add your bot to your server:

1. Click on **OAuth2** in the left sidebar.
2. In the menu that appears under **OAuth2**, select **URL Generator**.
3. Under **Scopes**, mark the checkbox labelled _bot_.
4. Under **Bot Permissions**, mark the checkbox labelled _Administrator_.
   ![Bot permissions](https://docimg.replit.com/images/tutorials/46-discord-role-bot/bot-permissions.png)

5. Scroll down and copy the URL under **Generated URL**.
   ![Generated url](https://docimg.replit.com/images/tutorials/46-discord-role-bot/generated-url.png)

6. Paste the URL in your browser's navigation bar and hit Enter.
7. On the page that appears, select your server from the drop-down box and click **Continue**.
8. When prompted about permissions, click **Authorize**, and complete the CAPTCHA.
   ![Bot connect](https://docimg.replit.com/images/tutorials/46-discord-role-bot/bot-connect.png)

9. Return to your Discord server. You should see that your bot has just joined.

Now that we've done the preparatory work, it's time to write some code. Return to your repl for the next section.

## Writing the Discord bot code

We'll be using [discord.py](https://discordpy.readthedocs.io/en/stable/) to interface with Discord's API using Python. Add the following code scaffold to `main.py` in your repl:

```python
import os, re, discord
from discord.ext import commands

DISCORD_TOKEN = os.getenv("DISCORD_TOKEN")

bot = commands.Bot(command_prefix="!")

@bot.event
async def on_ready():
    print(f"{bot.user} has connected to Discord!")

bot.run(DISCORD_TOKEN)
```

First, we import the Python libraries we'll need, including discord.py and its [commands extension](https://discordpy.readthedocs.io/en/stable/ext/commands/commands.html). Next we retrieve the value of the `DISCORD_TOKEN` environment variable, which we set in our repl's secrets tab above. Then we instantiate a [`Bot` object](https://discordpy.readthedocs.io/en/stable/ext/commands/api.html#discord.ext.commands.Bot). We'll use this object to listen for Discord events and respond to them.

The first event we're interested in is [`on_ready()`](https://discordpy.readthedocs.io/en/stable/api.html#discord.on_ready), which will trigger when our bot logs onto Discord (the `@bot.event` [decorator](https://realpython.com/primer-on-python-decorators/) ensures this). All this event will do is print a message to our repl's console, telling us that the bot has connected.

Note that we've prepended `async` to the function definition – this makes our `on_ready()` function into a [coroutine](https://docs.python.org/3/library/asyncio-task.html). Coroutines are largely similar to functions, but may not execute immediately, and must be invoked with the `await` keyword. Using coroutines makes our program [asynchronous](https://realpython.com/async-io-python/#the-10000-foot-view-of-async-io), which means it can continue executing code while waiting for the results of a long-running function, usually one that depends on input or output. If you've used JavaScript before, you'll recognize this style of programming.

The final line in our file starts the bot, providing `DISCORD_TOKEN` to authenticate it. Run your repl now to see it in action. Once it's started, return to your Discord server. You should see that your bot user is now online.

![Online bot](https://docimg.replit.com/images/tutorials/46-discord-role-bot/online-bot.png)

## Creating server roles

Before we write our bot's main logic, we need to create some roles for it to assign. Our Discord server is for programming discussion, so we'll create roles for a few different programming languages: Python, JavaScript, Rust, Go, and C++. For the sake of simplicity, we'll use all-lowercase for our role names. Feel free to add other languages.

You can add roles by doing the following:

1. Right-click on your server's icon in the leftmost panel.
2. From the menu that appears, select **Server Settings**, and then **Roles**.
3. Click **Create Role**.
   ![Create role](https://docimg.replit.com/images/tutorials/46-discord-role-bot/create-role.png)

4. Enter a role name (for example, "python") and choose a color.
5. Click **Back**.
6. Repeat steps 3–5 until all the roles are created.

Your role list should now look something like this:

![Roles list](https://docimg.replit.com/images/tutorials/46-discord-role-bot/roles-list.png)

The order in which roles are listed is the [role hierarchy](https://support.discord.com/hc/en-us/articles/214836687-Role-Management-101). Users who have permission to manage roles will only be able to manage roles lower than their highest role on this list. Ensure that the WelcomeBot role is at the top, or it won't be able to assign users to any of the other roles, even with Administrator privileges.

At present, all these roles will do is change the color of users' names and the list they appear in on the right sidebar. To make them a bit more meaningful, we can create some private channels. Only users with a given role will be able to use these channels.

To add private channels for your server's roles, do the following:

1. Click on the **+** next to **Text Channels**.
2. Type a channel name (e.g. "python") under **Channel Name**.
3. Enable the **Private Channel** toggle.
4. Click **Create Channel**.
5. Select the role that matches your channel's name.
6. Repeat for all roles.

![Create channel](https://docimg.replit.com/images/tutorials/46-discord-role-bot/create-channel.gif)

As the server owner, you'll be able to see these channels regardless of your assigned roles, but normal members will not.

## Messaging users

Now that our roles are configured, let's write some bot logic. We'll start with a function to DM users with a welcome message. Return to your repl and enter the following code just below the line where you defined `bot`:

```python
async def dm_about_roles(member):
    print(f"DMing {member.name}...")

    await member.send(
        f"""Hi {member.name}, welcome to {member.guild.name}!

Which of these languages do you use:

* Python (🐍)
* JavaScript (🕸️)
* Rust (🦀)
* Go (🐹)
* C++ (🐉)

Reply to this message with one or more of the language names or emojis above so I can assign you the right roles on our server.
"""
    )
```

This simple function takes a [`member`](https://discordpy.readthedocs.io/en/stable/api.html#member) object and sends it a private message. Note the use of `await` when running the coroutine [`member.send()`](https://discordpy.readthedocs.io/en/stable/api.html#discord.Member.send).

We need to run this function when one of two things happens: a new member joins the server, or an existing member types the command `!roles` in a channel. The second one will allow us to test the bot without constantly leaving and rejoining the server, and let users change their minds about what programming languages they want to discuss.

To handle the first event, add this code below the definition of `on_ready`:

```python
@bot.event
async def on_member_join(member):
    await dm_about_roles(member)
```

The [`on_member_join()`](https://discordpy.readthedocs.io/en/stable/api.html#discord.on_member_join) callback supplies a `member` object we can use to call `dm_about_roles()`.

For the second event, we'll need a bit more code. While we could use discord.py's [bot commands framework](https://discordpy.readthedocs.io/en/stable/ext/commands/commands.html) to handle our `!roles` command, we will also need to deal with general message content later on, and doing both in different functions doesn't work well. So instead, we'll put everything to do with message contents in a single [`on_message()`](https://discordpy.readthedocs.io/en/stable/api.html#discord.on_message) event. If our bot were just responding to commands, using [`@bot.command`](https://discordpy.readthedocs.io/en/stable/ext/commands/commands.html) handlers would be preferable.

Add the following code below the definition of `on_member_join()`:

```python
@bot.event
async def on_message(message):
    print("Saw a message...")

    if message.author == bot.user:
        return # prevent responding to self

    # Respond to commands
    if message.content.startswith("!roles"):
        await dm_about_roles(message.author)
```

First, we print a message to the repl console to note that we've seen a message. We then check if the message's author is the bot itself. If it is, we terminate the function, to avoid infinite loops. Following that, we check if the message's content starts with `!roles`, and if so we invoke `dm_amount_roles()`, passing in the message's author.

Stop and rerun your repl now. If you receive a CloudFlare error, type `kill 1` in your repl's shell and try again. Once your repl's running, return to your Discord server and type "!roles" into the general chat. You should receive a DM from your bot.

![Bot direct message](https://docimg.replit.com/images/tutorials/46-discord-role-bot/bot-dm.png)

## Assigning roles from replies

Our bot can DM users, but it won't do anything when users reply to it. Before we can add that logic, we need to implement a small hack to allow our bot to take actions on our server based on the contents of direct messages.

The Discord bot framework is designed with the assumption that bots are generic and will be added to many different servers. Bots do not have a home server, and there's no easy way for them to trace a process flow that moves from a server to private messages like the one we're building here. Therefore, our bot won't automatically know which server to use for role assignment when that user replies to its DM.

We could work out which server to use through the user's [`mutual_guilds`](https://discordpy.readthedocs.io/en/stable/api.html#discord.User.mutual_guilds) property, but it is not always reliable due to caching. Note that Discord servers were previously known as "guilds" and this terminology persists in areas of the API.

As we don't plan to add this bot to more than one server at a time, we'll solve the problem by hardcoding the server ID in our bot logic. But first, we need to retrieve our server's ID. The easiest way to do this is to add another command to our bot's vocabulary. Expand the `if` statement at the bottom of `on_message()` to include the following `elif`:

```python
    elif message.content.startswith("!serverid"):
        await message.channel.send(message.channel.guild.id)
```

Rerun your repl and return to your Discord server. Type "!serverid" into the chat, and you should get a reply from your bot containing a long string of digits. Copy that string to your clipboard.

Go to the top of `main.py`. Underneath `DISCORD_TOKEN`, add the following line:

```python
SERVER_ID =
```

Paste the contents of your clipboard after the equals sign. Now we can retrieve our server's ID from this variable.

Once that's done, return to the definition of `on_message()`. We're going to add another `if` statement to deal with the contents of user replies in DMs. Edit the function body so that it matches the below:

```python
@bot.event
async def on_message(message):
    print("Saw a message...")

    if message.author == bot.user:
        return # prevent responding to self

    # NEW CODE BELOW
    # Assign roles from DM
    if isinstance(message.channel, discord.channel.DMChannel):
        await assign_roles(message)
        return
    # NEW CODE ABOVE

    # Respond to commands
    if message.content.startswith("!roles"):
        await dm_about_roles(message.author)
    elif message.content.startswith("!serverid"):
        await message.channel.send(message.channel.guild.id)
```

This new `if` statement will check whether the message that triggered the event was in a DM channel, and if so, will run `assign_roles()` and then exit. Now we need to define `assign_roles()`. Add the following code above the definition of `on_message()`:

```python
async def assign_roles(message):
    print("Assigning roles...")

    languages = set(re.findall("python|javascript|rust|go|c\+\+", message.content, re.IGNORECASE))
```

We can find the languages mentioned in the user replies using [regular expressions](https://docs.python.org/3/library/re.html): [`re.findall()`](https://docs.python.org/3/library/re.html) will return a list of strings that match our expression. This way, whether the user replies with "Please add me to the Python and Go groups" or just "python go", we'll be able to assign them the right role.

We convert the list into a [set](https://realpython.com/python-sets/) in order to remove duplicates.

The next thing we need to do is deal with emoji responses. Add the following code to the bottom of the `assign_roles()` function:

```python
    language_emojis = set(re.findall("\U0001F40D|\U0001F578|\U0001F980|\U0001F439|\U0001F409", message.content))
    # https://unicode.org/emoji/charts/full-emoji-list.html

    # Convert emojis to names
    for emoji in language_emojis:
        {
            "\U0001F40D": lambda: languages.add("python"),
            "\U0001F578": lambda: languages.add("javascript"),
            "\U0001F980": lambda: languages.add("rust"),
            "\U0001F439": lambda: languages.add("go"),
            "\U0001F409": lambda: languages.add("c++")
        }[emoji]()
```

In the first line, we do the same regex matching we did with the language names, but using emoji Unicode values instead of standard text. You can find [a list of emojis with their codes on Unicode.org](https://unicode.org/emoji/charts/full-emoji-list.html). Note that the `+` in this list's code should be replaced with `000` in your Python code: for example, `U+1F40D` becomes `U0001F40D`.

Once we've got our set of emoji matches in `language_emojis`, we loop through it and use a dictionary to add the correct name to our `languages` set. This dictionary has strings as values and lambda functions as keys. Finally, `[emoji]()` will select the lambda function for the provided key and execute it, adding a value to `languages`. This is similar to the [switch-case](https://en.wikipedia.org/wiki/Switch_statement) syntax you may have seen in other programming languages.

We now have a full list of languages our users may wish to discuss. Add the following code below the `for` loop:

```python
    if languages:
        server = bot.get_guild(SERVER_ID)

        roles = [discord.utils.get(server.roles, name=language.lower()) for language in languages]

        member = await server.fetch_member(message.author.id)
```

This code first checks that the `languages` set contains values. If so, we use [`get_guild()`](https://discordpy.readthedocs.io/en/stable/api.html#discord.Client.get_guild) to retrieve a `Guild` object corresponding to our server's ID (remember, guild means server).

We then use a [list comprehension](https://realpython.com/list-comprehension-python/) and discord.py's [`get()`](https://discordpy.readthedocs.io/en/stable/api.html#discord.utils.get) function to construct a list of all the roles corresponding to languages in our list. Note that we've used the `lower()` to ensure all of our strings are in lowercase.

Finally, we retrieve the `member` object corresponding to the user who sent us the message and our server.

We now have everything we need to assign roles. Add the following code to the bottom of the `if` statement, within the body of the `if` statement:

```python
        try:
            await member.add_roles(*roles, reason="Roles assigned by WelcomeBot.")
        except Exception as e:
            print(e)
            await message.channel.send("Error assigning roles.")
        else:
            await message.channel.send(f"""You've been assigned the following role{"s" if len(languages) > 1 else ""} on {server.name}: { ', '.join(languages) }.""")
```

The `member` object's `add_roles()` method takes an arbitrary number of `role` objects as positional arguments. We [unpack](https://docs.python.org/3/tutorial/controlflow.html#unpacking-argument-lists) our `languages` set into separate arguments using the `*` operator, and provide a string for the named argument `reason`.

Our operation is wrapped in a [try-except-else](https://realpython.com/python-exceptions/#the-try-and-except-block-handling-exceptions) block. If adding roles fails, we'll print the resulting error to our repl's console and send a generic error message to the user. If it succeeds, we'll send a message to the user informing them of their new roles, making extensive use of [string interpolation](https://peps.python.org/pep-0498/).

Finally, we need to deal with the case where no languages were found in the user's message. Add an `else:` block onto the bottom of the `if languages:` block as below:

```python
    else:
        await message.channel.send("No supported languages were found in your message.")
```

Rerun your repl and return to your Discord server. Open the DM channel with your bot and try sending it one or more language names or emojis. You should receive the expected roles. You can check this by clicking on your name in the right-hand panel on your Discord server – your roles will be listed in the box that appears.

![Assigned roles](https://docimg.replit.com/images/tutorials/46-discord-role-bot/roles.png)

## Removing roles

Our code currently does not allow users to remove roles from themselves. While we could do this manually as the server owner, we've built this bot to avoid having to do that sort of thing, so let's expand our code to allow for role removal.

To keep things simple, we'll remove any roles mentioned by the user which they already have. So if a user with the "python" role writes "c++ python", we'll add the "c++" role and remove the "python" role.

Let's make some changes. Find the `if languages:` block in your `assign_roles()` function and change the code above `try:` to match the below:

```python
    if languages:
        server = bot.get_guild(SERVER_ID)

        # <-- RENAMED VARIABLE + LIST CHANGED TO SET
        new_roles = set([discord.utils.get(server.roles, name=language.lower()) for language in languages])

        member = await server.fetch_member(message.author.id)

        # NEW CODE BELOW
        current_roles = set(member.roles)

```

We replace the list of roles with a set of new roles. We also create a set of roles the user current holds. Given these two sets, we can figure out which roles to add and which to remove using [set operations](https://realpython.com/python-sets/#operating-on-a-set). Add the following code below the definition of `current_roles`:

```python
        roles_to_add = new_roles.difference(current_roles)
        roles_to_remove = new_roles.intersection(current_roles)
```

The roles to add will be roles that are in `new_roles` but not in `current_roles`, i.e. the _difference_ of the sets. The roles to remove will be roles that are in both sets, i.e. their _intersection_.

Now we need to replace the try-except-else block with the code below:

```python
        try:
            await member.add_roles(*roles_to_add, reason="Roles assigned by WelcomeBot.")
            await member.remove_roles(*roles_to_remove, reason="Roles revoked by WelcomeBot.")
        except Exception as e:
            print(e)
            await message.channel.send("Error assigning/removing roles.")
        else:
            if roles_to_add:
                    await message.channel.send(f"You've been assigned the following role{'s' if len(roles_to_add) > 1 else ''} on {server.name}: { ', '.join([role.name for role in roles_to_add]) }")

            if roles_to_remove:
                await message.channel.send(f"You've lost the following role{'s' if len(roles_to_remove) > 1 else ''} on {server.name}: { ', '.join([role.name for role in roles_to_remove]) }")
```

This code follows the same general logic as our original block, but can remove roles as well as add them.

Finally, we need to update the bot's original DM to reflect this new functionality. Find the `dm_about_roles()` function and amend it as follows:

```python
async def dm_about_roles(member):
    print(f"DMing {member.name}...")

    await member.send(
        f"""Hi {member.name}, welcome to {member.guild.name}!

Which of these languages do you use:

* Python (🐍)
* JavaScript (🕸️)
* Rust (🦀)
* Go (🐹)
* C++ (🐉)

Reply to this message with one or more of the language names or emojis above so I can assign you the right roles on our server.

Reply with the name or emoji of a language you're currently using and want to stop and I'll remove that role for you.
"""
    )
```

Rerun your repl and test it out. You should be able to add and remove roles from yourself. Try inviting some of your friends to your Discord server, and have them use the bot as well. They should receive DMs as soon as they join.

![Welcome message](https://docimg.replit.com/images/tutorials/46-discord-role-bot/welcome.png)
![Bot role message](https://docimg.replit.com/images/tutorials/46-discord-role-bot/bot-role-message.png)

## Where next?

We've created a simple Discord server welcome bot. There's a lot of scope for additional functionality. Here are some ideas for expansion:

- Include more complex logic for role assignment. For example, you could have some roles that require users to have been members of the server for a certain amount of time.
- Have your bot automatically assign additional user roles based on behavior. For example, you could give a role to users who react to messages with the most emojis.
- Add additional commands. For example, you might want to have a command that searches Stack Overflow, allowing members to ask programming questions from the chat.

Discord bot code can be hosted on Replit permanently, but you'll need to use a [Deployment](/hosting/deployments/about-deployments) repl to keep it running 24/7.

You can find our repl below:

<iframe height="400px" width="100%" src="https://replit.com/@ritza/DiscordWelcomeBot?embed=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
