---
title: Card game with pygame
---

# Building a card game with pygame

Card games are a great way to learn how to program. We get to build a model of the game, game logic, and a visual interface.

![Playing SnaPy](https://replit-docs-images.bardia.repl.co/images/tutorials/card-game-pygame/gameplay.gif)

A classic card game is Snap. The rules are pretty simple, which makes it great for building a first card game. We can spend more time on the modelling and visualization, which can be used on other card games too.

## The game rules

To simplify this tutorial, we'll limit our game to 2 players. Here's the rules for our 2 player game:

- The deck is shuffled, and dealt evenly between the two players.
- Each player takes turns drawing a card and places it face up on top of the last card drawn.
- If the card placed is a match (by value) of the previous card, the first player to call "Snap!" wins the entire pile of cards. These cards are added to their hand.
- If a player calls "Snap!" and the card placed is not a match (i.e. falsely calls "Snap!"), then the other player takes the pile of cards.
- The first player to run out of cards loses, and the other player wins.

## Creating a new project

Let's head over to [Replit](https://replit.com) and create a new repl. Choose **Pygame** as the template to create a repl from. Now, give this repl a name, like "SnaPy".

![Creating a new repl](https://replit-docs-images.bardia.repl.co/images/tutorials/card-game-pygame/new-repl.png)

After the repl has booted up, you should see a `main.py` file. We'll use this file for the main game loop, but we'll create other files for the game models and logic.

For our Snap game, we'll need some images of cards to display. Create a folder called `images` in the file explorer of your repl.

Now download [these card images](https://tutorial-files.util.repl.co/card-game-pygame/snapy-resources.zip) to your computer. Unzip the file, and drag and drop the images it contains to the `images` folder in your repl.

## Getting started with pygame

A popular game framework in Python is [pygame](https://www.pygame.org/). It has functionality to draw shapes and images to the screen, get user input, play sounds and more. We'll use some of the basic functionality in this game to see how it works.

We can import it into our project by adding the following line to our `main.py` file:

```python
import pygame
```

To get the pygame framework started, we need to add some initialization code:

```python
pygame.init()
bounds = (1024, 768)
window = pygame.display.set_mode(bounds)
pygame.display.set_caption("SnaPy")
```

- **Line 1** starts up the pygame system, by [initializing](https://www.pygame.org/docs/ref/pygame.html?highlight=init#pygame.init) its modules (for example, the font, sound and graphics code).
- **Line 2** creates a new tuple called `bounds`. This tuple contains the dimensions of the window that we'll run our Snap game in.
- **Line 3** creates a new window for us to display our game in.
- **Line 4** gives the window a caption, or title. This can be whatever you'd like to call the game.

If you run the project, using the "Run" button at the top center of the Repl, you should see a small blank window come up. That means everything is initialized and working so far. Not much, but it's our blank canvas to get started with!

## Designing the game model

Python is an object-oriented language. With object-oriented programming, we identify different parts and entities of the game and model them as classes and objects. Let's draw the game, and see what parts we need to model.

![Game objects](https://replit-docs-images.bardia.repl.co/images/tutorials/card-game-pygame/game-objects.png)

From the above image, we can see that we can model the following:

- Individual cards
- A deck of cards, which is a collection of all the cards
- Players, with their hand of cards and name
- A pile of cards, which is a collection of cards that are face up on the table

Note that this is one way to group the game parts, but it is not the only way. There are many ways to identify individual objects, and a big factor is how granular you need to be, and how responsibilities are assigned. This is part art, part experience and part computer science. Often we start with a model design, and then refine it over time as we learn more about the game and the dynamics of the model.

We'll also need logic to control the rules and the state of the game. Often this part of the program is known as the "game engine". We'll model this as a class as well.

Here is a diagram of all the classes we'll build.

![Class model](https://replit-docs-images.bardia.repl.co/images/tutorials/card-game-pygame/class-model.png)

The classes have some of the key properties and methods that they will need.

## Building the game model

Let's start by building the Card class. This class will represent a single card.

Create a new file called `models.py` in Replit. Inside this file we can define the Card class.

At the top of the file, add in some package imports:

- `Enum` for enumerations (which we'll use for defining the card suits).
- `pygame`, to load up the card images.
- `random`, to use when we shuffle the deck.

```python
from enum import Enum
import pygame
import random
```

Now let's add in the suits we'll need for the cards. We'll use the [Enum](https://docs.python.org/3/library/enum.html) class to define the different suits.

```python
class Suits(Enum):
  CLUB = 0
  SPADE = 1
  HEART = 2
  DIAMOND = 3
```

Alright, the boilerplate is out of the way. Now, lets define the Card class.

```python
class Card:
  suit = None
  value = None
  image = None

  def __init__(self, suit, value):
    self.suit = suit
    self.value = value
    self.image = pygame.image.load('images/' + self.suit.name + '-' + str(self.value) + '.svg')
```

From this small class, we can see the various parts of a Python class. The first line is the class definition. The next 3 lines are the class properties (variables that are controlled by objects made from the class). Then we have the `__init__` method, which is called the constructor method. This is where we initialize the class. In this case, we'll initialize the suit and value properties for the card. We'll also load the image for the card using Pygame's [`image.load`](https://www.pygame.org/docs/ref/image.html?highlight=load#pygame.image.load) function, with the filepath constructed from the suit and value. This implies that all the card images are all actually named according to the suit and value.

Now that we have suits and cards, let's create a Deck of cards.

```python
class Deck:
  cards = None

  def __init__(self):
    self.cards = []
    for suit in Suits:
      for value in range(1,14):
        self.cards.append(Card(suit, value))

  def shuffle(self):
    random.shuffle(self.cards)

  def deal(self):
    return self.cards.pop()

  def length(self):
    return len(self.cards)
```

The Deck class is a collection of cards. It has a list of `cards`, and a few methods to manipulate the list.

The constructor, `__init__` initializes the `cards` list, and populates it with all the cards in a deck, using 2 `for` loops. The first loop iterates over the `Suits` enum, and the second loop iterates over the values 1 through 13, which is all the cards in a deck.

Every deck of cards needs to be shuffled before it is used, so we've defined a `shuffle` method. Python's [random](https://docs.python.org/3/library/random.html) module has a very handy `shuffle` function built in that we can use. `shuffle` takes a list and rearranges the contents of that list in place (i.e. it doesn't return a new list).

Then we have the `deal` method, which removes the last card from the list and returns it. We'll use this to deal the cards to the players.

We have a `length` method that we'll use to determine if there are any cards left in the deck. This will be useful when dealing out cards to know when to stop.

The Deck class is now complete.

Let's move to the `Pile` class. This class models the pile of cards face up on the table, that each player adds to when playing.

```python
class Pile:
  cards = None

  def __init__(self):
    self.cards = []

  def add(self, card):
    self.cards.append(card)

  def peek(self):
    if (len(self.cards) > 0):
      return self.cards[-1]
    else:
      return None

  def popAll(self):
    return self.cards

  def clear(self):
    self.cards = []

  def isSnap(self):
    if (len(self.cards) > 1):
      return (self.cards[-1].value == self.cards[-2].value)
    return False
```

The `Pile` class has one main property: a list of cards, which is initialized in the constructor.

The `add` method is used when a player plays a card, i.e. adds it to the pile.

The `peek` method returns the top card of the pile, while still keeping it on the pile. We'll use this to draw the top card, as it is face up. If there are no cards on the pile, indicated by the length of the card array being 0, we'll return `None`.

When a player wins, they get all the cards on the pile. The `popAll` method handles this by returning the list of cards. Then we can call the `clear` method to remove all the cards from the pile.

If a player calls "Snap!", we need to check if the top two cards are the same value. We'll use the `isSnap` method to check this. Python has a handy feature of negative indices. This means an index of `-1` returns the last element in the list, `-2` returns the second last, and so on. This allows us to easily get the last 2 cards added to the pile, and check if they are the same value. Note that in the rules of Snap, only the value is important - the suit is not used.

The last of the models is the `Player` class.

```python
class Player:
  hand = None
  flipKey = None
  snapKey = None
  name = None

  def __init__(self, name, flipKey, snapKey):
    self.hand = []
    self.flipKey = flipKey
    self.snapKey = snapKey
    self.name = name

  def draw(self, deck):
    self.hand.append(deck.deal())

  def play(self):
    return self.hand.pop(0)
```

The `Player` class has a few properties. The `hand` property is a list of cards that the player has.

The `flipKey` and `snapKey` properties are the keys assigned to player that they use to flip and snap cards.

The `name` property is the name of the player.

The `draw` method is used to draw a card from the `deck` passed in the arguments. The `draw` method calls the `deal` method on the `deck`, and adds the card to the `hand` list.

The `play` method [`pop`](https://docs.python.org/3/library/stdtypes.html#mutable-sequence-types)s a card off the hand list, used when the player plays a card.

## Building the game engine

Ok, time to build the game engine that will coordinate the interactions between the models we created.

Make a new file called `engine.py`. Let's start by adding the libraries we'll need.

```python
from enum import Enum
import pygame
from models import *
```

Besides the `Enum` and `pygame` libraries, we import everything, `*`, from our `models.py` file. This way we can use all the classes that we defined in models.

A common element in game engines is keeping track of the state of the game. We'll define a `GameState` enumeration to keep track of the state of the game.

```python
class GameState(Enum):
  PLAYING = 0
  SNAPPING = 1
  ENDED = 2
```

We only have 3 states, or phases, of the game that we will track. The first is `PLAYING`, which is the main phase of the game, where the players take turns putting down cards. The second is `SNAPPING`. This is the state the game is in when a player calls "Snap!". In this state, we check if the snap is valid, and also wait until the players are ready to resume playing. The third is `ENDED`, which is the phase where the game is over, i.e. one player has no more cards to play.

Now, let's start with the engine itself. First, let's add the definition, properties and constructor:

```python
class SnapEngine:
  deck = None
  player1 = None
  player2 = None
  pile = None
  state = None
  currentPlayer = None
  result = None

  def __init__(self):
    self.deck = Deck()
    self.deck.shuffle()
    self.player1 = Player("Player 1", pygame.K_q, pygame.K_w)
    self.player2 = Player("Player 2", pygame.K_o,pygame.K_p)
    self.pile = Pile()
    self.deal()
    self.currentPlayer = self.player1
    self.state = GameState.PLAYING
```

In the properties, we define the `deck` of cards, `players`, `pile` of cards, and the `state` of the game. We also have a `currentPlayer` property, which keeps track of the player whose turn it is. The `result` property is used to communicate the outcome of a round, or the entire game.

The constructor initializes objects and stores them in the properties. Note that we assign default names and keys to the players.

We also call a method we have yet to define, `deal`, to deal the cards to the players.

We start off the game by setting the `state` to `PLAYING`, and the `currentPlayer` to `player1`.

Let's add some more methods and logic to the engine. To start, the `deal` method:

```python
  def deal(self):
    half = self.deck.length() // 2
    for i in range(0, half):
      self.player1.draw(self.deck)
      self.player2.draw(self.deck)
```

The deal method is in charge of making sure each player gets half the deck of cards. There are a few ways to do this - this code takes a bit of a literal translation of dealing, by dealing one card to each player alternately. In practice, we'll use a for loop to do this, and in the loop we'll call the `draw` method on each of the `player`s to draw a card.

Since each round of the `for` loop takes a card for each player, 2 cards per loop, we only need to loop for half the number of cards in the deck.

To find the middle of the deck, we get the length of the deck, and divide it by 2. Note that we use the `//` integer division operator to get back an integer after division, as the meaning of the middle is the index of the middle card. A number with decimals wouldn't make any sense here.

Next, we can add a helper method to switch the current player. We'll use this after each player plays a card to indicate that it's the next player's turn.

```python
  def switchPlayer(self):
    if self.currentPlayer == self.player1:
      self.currentPlayer = self.player2
    else:
      self.currentPlayer = self.player1
```

Here we check which player is the current player and switch `currentPlayer` to the other player.

The last helper method we need on the engine is one that handles a player winning a round (by calling "Snap!" correctly, or the other player falsely calling "Snap!"). This method will change the state of the game. It will also add all the cards on the pile to the winner's hand. Then it will clear out the pile so the next round can start:

```python
  def winRound(self, player):
    self.state = GameState.SNAPPING
    player.hand.extend(self.pile.popAll())
    self.pile.clear()
```

Now we get to the main logic of the engine. This method will be called from our main game loop, which we will define later. Let's start with the method definition and some basic checks. Then we'll add the logic in sections. Start by adding this method to the engine:

```python
  def play(self, key):
    if key == None:
      return

    if self.state == GameState.ENDED:
      return
```

We'll call this main logic method `play`. It takes whatever key is currently pressed, and processes the logic for that. The first thing we check is if a key has actually been pressed. If it hasn't, we return, as there is nothing to update with the game state.

The next check to make is if the game is over. If it is, we return, as again, there is nothing to do. If you want to improve the game, you could listen for a key press to restart the game.

Now let's add some of the logic. The first thing is to check if the current player has pressed the key to play, or flip a card onto the pile. If they have pressed their `flipKey`, we call their play method and add the returned card to the pile. Then we switch turn to the next player, by calling our `switchPlayer` method.

```python
    if key == self.currentPlayer.flipKey:
      self.pile.add(self.currentPlayer.play())
      self.switchPlayer()
```

Next, let's check if any of the players have called "Snap!". We'll need to keep track of a few things: who called "Snap!", who didn't call "Snap!", and if there is a valid snap condition on the pile. Add this logic to the `play` method:

```python
    snapCaller = None
    nonSnapCaller = None
    isSnap = self.pile.isSnap()

    if (key == self.player1.snapKey):
      snapCaller = self.player1
      nonSnapCaller = self.player2
    elif (key == self.player2.snapKey):
      snapCaller = self.player2
      nonSnapCaller = self.player1
```

Here we create two variables, `snapCaller` and `nonSnapCaller`, which keep track of the player who called "Snap!" and the player who didn't call "Snap!". We also create a variable `isSnap` to keep track of whether there is a valid snap condition on the pile. Then we check if either of the players has called "Snap!". If they have, then we set the `snapCaller` and `nonSnapCaller` variables as applicable.

We now know if "Snap!" has been called and which player called it. Let's add the logic to see if the player that called "Snap!" wins or loses. Add this logic to the `play` method:

```python
    if isSnap and snapCaller:
      self.winRound(snapCaller)
      self.result = {
        "winner": snapCaller,
        "isSnap": True,
        "snapCaller": snapCaller
      }
      self.winRound(snapCaller)
    elif not isSnap and snapCaller:
      self.result = {
        "winner": nonSnapCaller,
        "isSnap": False,
        "snapCaller": snapCaller
      }
      self.winRound(nonSnapCaller)
```

We have two cases: one for a valid snap, and one for an invalid snap.

If the pile is a valid snap, we call the `winRound` method on the player who called "Snap!". Then we set the `result` property to a dictionary with the winner, whether it was a valid snap, and the player who called "Snap!". This will be used for information when we make the game user interface (UI).

Likewise, for an invalid snap, we call the `winRound` method on the player who didn't call "Snap!". Then we set the `result` property to a dictionary with the winner as the `nonSnapCaller`.

In both cases, we call the `winRound` method with whichever player won the cards. Recall in the `winRound` method we assign the pile to the player's hand. Then we clear the pile, and set the `gameState` to `SNAPPING`.

We've got just one last thing to check: if any player has run out of cards. If they have, then it means the other player wins. Add this logic to the `play` method:

```python
    if len(self.player1.hand) == 0:
      self.result = {
        "winner": self.player2,
      }
      self.state = GameState.ENDED
    elif len(self.player2.hand) == 0:
      self.result = {
        "winner": self.player1,
      }
      self.state = GameState.ENDED

```

If one of the players has run out of cards, then we set the `result` property to a dictionary with the winner as the other player. Then we set the `state` property to `GameState.ENDED`.

## Setting up the game loop

We've built the model and the logic in the engine to play a game of Snap. Now we need to define the game loop to run the game.

Open up the `main.py` file again. We'll start by adding references to the models and engine, so that we can access them when building the UI. Add the following imports right under the `import pygame` line:

```python
from models import *
from engine import *
```

We'll start by creating a new game engine object. Add this to the `main.py` file, underneath the Pygame initialization code:

```python
gameEngine = SnapEngine()
```

Now the game loop. The game loop's job is to listen for user input, call the engine's `play` method to process that input, and update the UI with the result. Add this to the `main.py` file:

```python
run = True
while run:
  key = None;
  for event in pygame.event.get():
    if event.type == pygame.QUIT:
      run = False
    if event.type == pygame.KEYDOWN:
      key = event.key

  gameEngine.play(key)
  renderGame(window)
  pygame.display.update()

  if gameEngine.state == GameState.SNAPPING:
    pygame.time.delay(3000)
    gameEngine.state = GameState.PLAYING
```

We start off by defining a variable `run`. Then we use this as a condition for a `while` loop. As long as `run` is true, the loop will continuously run the code inside.

In Pygame, we listen for events on the event queue. We use the `pygame.event.get()` method to get all the events that have happened since the last time we checked. We then iterate through the events, checking if any of them is a `QUIT` event. If they are, we set `run` to false, and break out of the loop to end the program. A `QUIT` event is sent if the user clicks the close button on the window.

If any of the events is a `KEYDOWN` event, we set the `key` variable to the key that was pressed.

Then we call out to the game engine to process the key that was pressed.

Once that is done, we can update the UI. We call the `renderGame` method, which we'll get to next.

After the UI has been updated, we call the `pygame.display.update()` method to draw it to the screen.

The final check is to see if the game is in the `SNAPPING` state. If it is, we wait 3 seconds before switching back to the `PLAYING` state. This is so that there is enough time for the players to pause and see what happened. Remember the game loop will go around very quickly, so the delay will help them to see any messages we display in the `renderGame` method.

## Rendering the game

The last main task is to render the game through a UI. This is where we'll use Pygame to draw the game to the screen.

In the game loop, we call the `renderGame` method. This method takes a `window` parameter, which is the Pygame window we created in the `main.py` file. The window is the graphics surface that we will draw to. The `renderGame` method will look at the state and result of the `gameEngine`, as well as the players, and draw the appropriate UI to the window.

Let's implement that method now. We'll start by clearing the window, and drawing some fixed UI elements. Add the following code to the `main.py` file, above the game loop.

```python
cardBack = pygame.image.load('images/BACK.png')
cardBack = pygame.transform.scale(cardBack, (int(238*0.8), int(332*0.8)))

def renderGame(window):
  window.fill((15,0,169))
  font = pygame.font.SysFont('comicsans',60, True)

  window.blit(cardBack, (100, 200))
  window.blit(cardBack, (700, 200))

  text = font.render(str(len(gameEngine.player1.hand)) + " cards", True, (255,255,255))
  window.blit(text, (100, 500))

  text = font.render(str(len(gameEngine.player2.hand)) + " cards", True, (255,255,255))
  window.blit(text, (700, 500))

  topCard = gameEngine.pile.peek()
  if (topCard != None):
    window.blit(topCard.image, (400, 200))
```

Firstly we load an image of the back of a card outside the function. We do this to avoid loading it each time the screen is rendered - this way it is only loaded once. We will use this image to represent the cards in the players' hands, which are face down. pygame's `transform.scale` function is used to scale the image to `0.8` the size of the regular card size. This is just to indicate visually that they are in the background to the main part of the UI, which will be the card at top of the pile.

Inside the `renderGame` function, we first clear the window. We use the `fill` method to fill the window with a color, `(15,0,169)` in RGB (Red Green Blue) color notation, which is a dark blue color.

Then we choose a font to use. We use the `SysFont` method to load a font from the system. We pass in the font name, the font size, and a boolean value indicating whether the font should be bold.

Next is to draw the card backs representing the players' hands. We use the [`blit`](https://www.pygame.org/docs/ref/surface.html?highlight=blit#pygame.Surface.blit) method to draw the card back to the window. We pass in the card back image we loaded outside the function, and the screen coordinates we want to draw it at. We draw two card backs, one for each player, one on the far left of the screen, and the other on the far right. We'll draw the pile between these two hands.

To indicate the current score of the game, we render text showing the number of cards each player currently holds. First, we construct a text object using the font's [`render`](https://www.pygame.org/docs/ref/font.html?highlight=font.sysfont#pygame.font.SysFont) method. We pass in the text we want to render (which is the player's card count and the word 'cards'), and the color we want to use. We then draw the text to the screen by blitting it to the window.

The last part of the code draws the card at the top of the pile. We use the `peek` method we implemented on the `Pile` class to get the top card. If there is no top card, we don't draw anything. Recall that for each card, we loaded its image in the constructor. This means we can get the image object from the `image` property on the card, without loading it here. Once again we blit the card image to the screen, this time passing in coordinates between the two hands.

The next part of the UI to draw is some indication of the current state of the game, and whose turn it is. We'll use the `state` property of the `gameEngine` to determine what to draw. We'll use `if` statements to draw the appropriate UI, based on the game state. There are three states to consider:

- **PLAYING** The game is in progress, and we are waiting for the current player to flip a card, or either player to call "Snap!". In this case, we render the current player's name and a message to indicate that it is their turn to flip. This message is written in white `(255,255,255)` near the top left of the window.
- **SNAPPING** A player has called snap. In this case, the message rendered depends on if the snap was valid or not. We can get this information from the `result` property of the `gameEngine`.
- **ENDING** The game is over. In this case, we render the winner's name, and a message to indicate that they won.

Add this code to the `renderGame` function, to implement the above logic:

```python
  if gameEngine.state == GameState.PLAYING:
    text = font.render(gameEngine.currentPlayer.name + " to flip", True, (255,255,255))
    window.blit(text, (20,50))

  if gameEngine.state == GameState.SNAPPING:
    result = gameEngine.result
    if result["isSnap"] == True:
      message = "Winning Snap! by " + result["winner"].name
    else:
      message = "False Snap! by " + result["snapCaller"].name + ". " + result["winner"].name + " wins!"
    text = font.render(message, True, (255,255,255))
    window.blit(text, (20,50))

  if gameEngine.state == GameState.ENDED:
    result = gameEngine.result
    message = "Game Over! " + result["winner"].name + " wins!"
    text = font.render(message, True, (255,255,255))
    window.blit(text, (20,50))
```

## Running the game

Now that we have implemented the game, we can give it a test run. Click the big green "Run" button at the top of your repl. You should see the game start up, prompting "Player 1" to flip a card.

![Playing SnaPy](https://replit-docs-images.bardia.repl.co/images/tutorials/card-game-pygame/gameplay.gif)

Player 1's keys are `q` to flip a card, and `w` to call snap.
Player 2's keys are `o` to flip a card, and `p` to call snap.

Call over a friend and see who's the quickest finger on calling "Snap!".

## Next steps

Congratulations! You've implemented a card game. You can use the ideas and principles from this tutorial to implement a card game of your own.

Some ideas to add features to this game are:

- Add a timer to the game, so that the player has a limited amount of time to flip a card.
- Add some sound effects, using the Pygame [`mixer`](https://www.pygame.org/docs/ref/mixer.html) module.
- Add a key to restart the game after it ends. Currently, at the end of the game, the players would need to close the window and start the game to play again.
- Try with different cards. For example, you could use a simplified card set, perhaps themed on something you love, like Pokemons, dinosaurs, cars, celebrities, etc.

You can find our repl below:

<iframe height="400px" width="100%" src="https://replit.com/@ritza/SnaPy?embed=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
