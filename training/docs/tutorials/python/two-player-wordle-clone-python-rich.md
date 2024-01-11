---
title: Wordle with Python & Rich
---

# Building a two player _Wordle_ clone with Python and Rich on Replit

In this guide, we'll build a version of the popular game _Wordle_. Instead of the computer providing a word that the player has to guess, our version will work with two players. Player 1 will enter the word, and then player 2 will try to guess the word entered, similar to the popular game _Hangman_.

Once you're done, you'll be able to play a command-line-based game with a friend (with both of you sitting at the same machine), as shown below.

<video controls width="80%" autoplay loop src="https://docimg.replit.com/images/tutorials/39-two-player-wordle-clone-python-rich/twordledemo.mp4" type="video/mp4">
</video>

We'll be using Python, and to do the green and yellow colors we'll use [Rich](https://rich.readthedocs.io/en/stable/introduction.html), a library for rich-text formatting. To follow along, you should know some basic Python, but we'll explain each code sample in depth so you should be able to keep up even if you are not familiar with Python.

## Getting started

To get started, create a **Python** repl.

![New repl](https://docimg.replit.com/images/tutorials/39-two-player-wordle-clone-python-rich/new-repl.png)

## Installing Rich

Rich isn't part of the Replit Universal Installer, so we have to install it manually. Open up the "Shell" tab in the repl workspace and run the following commands:

```bash
python3 -m poetry init --no-interaction
python3 -m poetry add rich
```

This will create a `pyproject.toml` file to define Rich as a dependency, and Replit will automatically install it for us next time we run our app.

![Running commands in shell](https://docimg.replit.com/images/tutorials/39-two-player-wordle-clone-python-rich/shell.png)

## Printing colored text

The first thing we need to figure out is how to print out different colored letters. By default, we'll use similar settings to the _Wordle_ defaults

- Green = correct letter in the correct position
- Yellow = correct letter in the incorrect position
- Gray = incorrect letter

Because we're using Rich, we don't have to mess around with [ANSI escape codes](https://en.wikipedia.org/wiki/ANSI_escape_code). It's possible to use them to style terminal text, but you end up having to deal with nasty-looking strings like `\033[0;32m`, and there are likely to be compatibility issues too. Rich abstracts this away for us, and we can use nicer-looking controls like '[black on green]TWORDLE[/]' to describe how the text should look.

Take a look at how this works now by adding the following code to `main.py` and pressing "Run":

```python
import rich

rich.print('[black on green]TWORDLE[/]')
```

Because we may want to customize what specific colors mean at some point, let's define each of our three cases in functions. Replace the existing code in `main.py` with the following:

```python
import rich

def correct_place(letter):
    return f'[black on green]{letter}[/]'

def correct_letter(letter):
    return f'[black on yellow]{letter}[/]'

def incorrect(letter):
    return f'[black on white]{letter}[/]'

WELCOME_MESSAGE = correct_place("WELCOME") + " " + incorrect("TO") + " " + correct_letter("TWORDLE") + "\n"

def main():
    rich.print(WELCOME_MESSAGE)

if __name__ == '__main__':
    main()
```

Run this code, and you'll see a Wordle-styled welcome message, demonstrating all three styles, as shown below.

![Wordle welcome message](https://docimg.replit.com/images/tutorials/39-two-player-wordle-clone-python-rich/welcometowordle.png)

## Creating the game loop

As in classic _Wordle_, our game will allow the player six tries to guess a word. Unlike classic _Wordle_, we'll allow for two players. Player 1 will choose a word, and player 2 will attempt to guess it. The basic logic is then:

```
Get word from Player 1
Get guess from Player 2
While Player 2 has guesses remaining
    Get new guess
    If guess is correct
        End the game
```

So let's ignore our fancy colored text for a moment and build this logic.

### Getting and guessing the word

We'll use the `Console` class from Rich, which creates a virtual output pane on top of our actual console. This will make it easier to have more control over our output as we build out the app.

Add the following two imports to the top of the `main.py` file:

```python
from rich.prompt import Prompt
from rich.console import Console
```

And now replace the `main()` function with the following code:

```python
def main():
    rich.print(WELCOME_MESSAGE)

    allowed_guesses = 6
    used_guesses = 0

    console = Console()
    answer_word = Prompt.ask("Enter a word")
    console.clear()

    while used_guesses < allowed_guesses:
        used_guesses += 1
        guess = Prompt.ask("Enter your guess")
        if guess == answer_word:
            break
    print(f"\n\nTWORDLE {used_guesses}/{allowed_guesses}\n")
```

If you run this, you'll be prompted (as player 1) to enter a word. The entered word will then be hidden from view to avoid spoiling the game, and player 2 can enter up to six guesses. At this stage, player 2 doesn't get any feedback on correct or incorrect letters, which makes the game pretty hard for player 2! If player 2 does happen to guess correctly, the loop will break and the game will display how many guesses were used.

![Game loop](https://docimg.replit.com/images/tutorials/39-two-player-wordle-clone-python-rich/gameloop.png)

### Providing feedback on correct letters

Let's add a helper function to calculate whether each letter should be green, yellow, or gray. Add this function above the `main()` function in `main.py`:

```python
def score_guess(guess, answer):
    scored = []
    for i, letter in enumerate(guess):
        if answer[i] == guess[i]:
            scored += correct_place(letter)
        elif letter in answer:
            scored += correct_letter(letter)
        else:
            scored += incorrect(letter)
    return ''.join(scored)
```

This function takes in player 2's guess and the correct answer and compares them letter by letter. It uses the helper functions we defined earlier to create the Rich formatting string for each letter, and then joins them all together into a single string.

<hr />

**NOTE:** Here we simplify how duplicate letters are handled. In classic _Wordle_, letters are colored based on how often they occur in the correct answer, for example, if you guess "SPEED" and the correct word is "THOSE", the second E in your guess will be colored as incorrect. In our version, it will be labeled as a correct letter in the wrong place. Handling duplicate letters is tricky, and implementing this logic correctly is left as an exercise to the reader.

<hr />

Call this function from inside the `while` loop in `main()` by adding the `console.print` line as follows:

```python
    while used_guesses < allowed_guesses:
        used_guesses += 1
        guess = Prompt.ask("Enter your guess")
        console.print(score_guess(guess, answer_word)) # new line
        if guess == answer_word:
            break
```

Now player 2 has something to work on from each guess, and it should be a lot easier to guess the correct word by incrementally finding more correct letters, as shown in the example below.

![Feedback](https://docimg.replit.com/images/tutorials/39-two-player-wordle-clone-python-rich/feedback.png)

## Adding an emoji representation for spoiler-free sharing

A key part of _Wordle_ is that once a player has guessed a word, they can share a simple graphic of how well they did, without giving away the actual word. For our two-player version, this "no spoilers" feature isn't as important, but let's add it anyway.

As with the letter-coloring, we want to keep the emoji we use configurable. By default, we'll use green, yellow, and gray squares. Let's start by defining this in a dictionary, near the top of our `main.py` file. Add the following to your code:

```python
emojis = {
    'correct_place': '🟩',
    'correct_letter': '🟨',
    'incorrect': '⬜'
}
```

Replace the `score_guess` function with the following:

```python
def score_guess(guess, answer):
    scored = []
    emojied = []
    for i, letter in enumerate(guess):
        if answer[i] == guess[i]:
            scored += correct_place(letter)
            emojied.append(emojis['correct_place'])
        elif letter in answer:
            scored += correct_letter(letter)
            emojied.append(emojis['correct_letter'])
        else:
            scored += incorrect(letter)
            emojied.append(emojis['incorrect'])
    return ''.join(scored), ''.join(emojied)
```

The logic is very similar to before, but instead of only calculating the correct style for the letter, we also keep track of each emoji. At the end, we return both the string to print out the scored word, and the emoji representation for that guess.

To use this in the main function, replace the code for the `while` loop with the following code:

```python
    all_emojied = []
    while used_guesses < allowed_guesses:
        used_guesses += 1
        guess = Prompt.ask("Enter your guess")
        scored, emojied = score_guess(guess, answer_word)
        all_emojied.append(emojied)
        console.print(scored)
        if guess == answer_word:
            break
    print(f"\n\nTWORDLE {used_guesses}/{allowed_guesses}\n")
    for em in all_emojied:
        console.print(em)
```

If you run again, the game will work as before, but now you'll see the emoji representation printed after the game ends. This can be copy-pasted to share and help our game go viral. You can see what it looks like in the image below.

![Emojis](https://docimg.replit.com/images/tutorials/39-two-player-wordle-clone-python-rich/withemoji.png)

## Some finishing touches

The one messy part of our game remaining is that the input prompts are still shown after player 2 has entered each guess. This means that each word is shown twice: once in its colored form, and once exactly as the player entered it. Let's adapt the game to clear the console and output just the colored versions of each guess.

To do this, we need to keep track of all player 2's guess, which we were not doing before.

Replace the `while` loop in the `main()` function with the following code:

```python
    all_emojied = []
    all_scored = []
    while used_guesses < allowed_guesses:
        used_guesses += 1
        guess = Prompt.ask("Enter your guess")
        scored, emojied = score_guess(guess, answer_word)
        all_scored.append(scored)
        all_emojied.append(emojied)
        console.clear()
        for scored in all_scored:
            console.print(scored)
        if guess == answer_word:
            break
```

This clears the console completely after each guess by player 2, and then prints out each of the (styled) guesses. The output looks neater now, as shown below.

![Cleared inputs](https://docimg.replit.com/images/tutorials/39-two-player-wordle-clone-python-rich/clearedinputs.png)

### Adding instructions

People will like our game more if they can figure out what to do without having to read documentation. Let's add some basic instructions for each player to the game interface. Below the `WELCOME_MESSAGE` variable we defined earlier, add the following:

```python
P1_INSTRUCTIONS = "Player 1: Please enter a word (player 2, look away)\n"
P2_INSTRUCTIONS = "Player 2: You may start guessing\n"
```

Now update the `main()` function like this:

```python
def main():
    allowed_guesses = 6
    used_guesses = 0

    console = Console()
    console.print(WELCOME_MESSAGE)
    console.print(P1_INSTRUCTIONS)
    answer_word = Prompt.ask("Enter a word")
    console.clear()
    console.print(WELCOME_MESSAGE)
    console.print(P2_INSTRUCTIONS)

    all_emojied = []
    all_scored = []
    while used_guesses < allowed_guesses:
        used_guesses += 1
        guess = Prompt.ask("Enter your guess")
        scored, emojied = score_guess(guess, answer_word)
        all_scored.append(scored)
        all_emojied.append(emojied)
        console.clear()
        console.print(WELCOME_MESSAGE)
        for scored in all_scored:
            console.print(scored)
        if guess == answer_word:
            break
    print(f"\n\nTWORDLE {used_guesses}/{allowed_guesses}\n")
    for em in all_emojied:
        console.print(em)
```

Now our welcome message stays at the top, and the players are prompted by simple instructions. Have fun playing it with your friends!

## Where next?

The basics of the game are in place, but there is still a lot you could build from here. Some ideas:

- Fix the logic for handling duplicate letters.
- Fix the fact that the game crashes if player 2 enters the wrong number of letters.
- The game still says `6/6`, even if player 2 has not guessed the word after six tries. Have the game print out `X/6` in this case, as in classic _Wordle_.
- Give player 2 more guesses based on the length of the word player 1 enters.
- [CHALLENGING] Make the game work over the internet instead of requiring both players to be in same room.

You can find the code for this tutorial here:

<iframe height="400px" width="100%" src="https://replit.com/@ritza/Wordle?embed=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
