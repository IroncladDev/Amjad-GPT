---
title: Tic-tac-toe with Kaboom.js & WebSockets
---

# Building tic-tac-toe with WebSocket and Kaboom.js

Tic-tac-toe, or noughts and crosses, or Xs and Os, is a simple classic game for 2 players. It's usually played with paper and pen, but it also makes a good first game to write for networked multiplayer.

In this tutorial, we'll create a 2-player online tic-tac-toe game using a [Node.js](https://nodejs.org/en/) server. [Socket.IO](https://socket.io) will enable realtime gameplay across the internet. We'll use Kaboom.js to create the game interface.

![Game play](https://docimg.replit.com/images/tutorials/27-tictactoe-kaboom/gameplay.gif)

## How do multiplayer games work?

Multiplayer games have an architecture that typically looks something like this:

![Game server architecture](https://docimg.replit.com/images/tutorials/27-tictactoe-kaboom/architecture.png)

Players (clients) connect to a _game server_ over the internet. The game runs on the game server, where all the game rules, scores and other data are processed. The players' computers render the graphics for the game, and send player commands (from the keyboard, mouse, gamepad, or other input device) back to the game server. The game server checks if these commands are valid, and then updates the _game state_. The game state is a representation of all the variables, players, data and information about the game. This game state is then transmitted back to all the players and the graphics are updated.

A lot of communication needs to happen between a player's computer and the game server in online multiplayer games. This generally requires a 2-way, or _bidirectional_, link so that the game server can send data and notify players of updates to the game state. This link should ideally be quick too, so a more permanent connection is better.

With the [HTTP](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) protocol that websites usually use, a browser opens a connection to a server, then makes a request to the server, and the server sends back data, and closes the connection. There is no way for the server to initiate sending data to the browser. HTTP is also heavy on overhead, since it opens and closes a connection each time data is requested and sent.

[WebSocket](https://en.wikipedia.org/wiki/WebSocket) is an advanced internet protocol that allows us to create a 2-way, persistent connection between a browser and a server. We'll use the [Socket.IO](https://socket.io) package to help us manage WebSocket connections in this project.

## Creating a new project

For this project, we'll need to create 2 repls - 1 using Node.js for the game server, and 1 using Kaboom for the players. Head over to [Replit](https://replit.com) and create a two new repls:

- To create the server project, choose "Node.js" as your project type. Give this repl a name, like "tic-tac-toe-server".
  ![Server repl](https://docimg.replit.com/images/tutorials/27-tictactoe-kaboom/server-new-repl.png)
- To create the player project, choose "Kaboom" as your project type. Give this repl a name, like "tic-tac-toe".
  ![New Player repl](https://docimg.replit.com/images/tutorials/27-tictactoe-kaboom/player-new-repl.png)

We'll code in the server repl to start, and then switch between repls as we build the game.

## Setting up Socket.IO on the server

Add the following code to the file called `index.js` in the server project to import Socket.IO:

```js
const http = require("http");
const sockets = require("socket.io");

const server = http.createServer();
const io = sockets(server, {
  cors: {
    origin: "https://tic-tac-toe--<YOUR-USER-NAME>.repl.co",
    methods: ["GET", "POST"],
  },
});

server.listen(3000, function () {
  console.log("listening on 3000");
});
```

*Note: Please refer to [these docs](/hosting/hosting-web-pages.md#end-of-dot-style-domains) to ensure that you are using the correct repl.co domain format.*

In the first 2 lines, we import the built-in node [`http`](https://nodejs.org/api/http.html) package and the [`socket.io`](https://socket.io) package. The `http` package enables us to run a simple HTTP server. The `socket.io` package extends that server to add [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) functionality.

To create the HTTP server, we use the `http.createServer();` method. Then we set up Socket.IO by creating a new `io` object. We pass in the HTTP server object along with some configuration for [CORS](https://developer.mozilla.org/en-US/docs/Glossary/CORS). CORS stands for "Cross Origin Resource Sharing", and it's a system that tells the server which other sites are allowed to connect to it and access it. We set `origin` to allow our player repl to connect. Replace the `origin` value with the URL of the player project repl you set up earlier.

In the last 2 lines, we start the server up by calling its `listen` method, along with a port to listen on. We use 3000, as this is a standard for Node.js. If it starts successfully, we write a message to the console to let us know.

We'll add the rest of the server code above the `server.listen` line, as we only want to start the server up after all the other code is ready.

## Tracking the game state

Now that we have a server, lets think a bit about how we will represent, or model, the game. Our tic-tac-toe game will have a few different properties to track:

- The status of the game: What is currently happening? Are we waiting for players to join, are the players playing, or is the game over?
- The current positions on the tic-tac-toe board. Is there a player in a grid block, or is it empty?
- All the players. What are their names, and which symbol are they using, X or O?
- The current player. Whose turn is it to go?
- If the game ends in a win, who won it?

For the status of the game, we'll add an [enumeration](https://masteringjs.io/tutorials/fundamentals/enum) of the possible states we can expect. This makes it easier to track and use them as we go through the different phases of the game.

```js
const Statuses = {
  WAITING: "waiting",
  PLAYING: "playing",
  DRAW: "draw",
  WIN: "win",
};
```

- WAITING: We are waiting for all the players to join the game.
- PLAYING: The players can make moves on the board.
- DRAW: The game has ended in a draw.
- WIN: A player has won the game.

Now let's add a game state object to track everything:

```js
let gameState = {
  board: new Array(9).fill(null),
  currentPlayer: null,
  players: [],
  result: {
    status: Statuses.WAITING,
  },
};
```

First, we have a representation of the tic-tac-toe board as an array with 9 elements. This is how the array elements are mapped to the board:

![Tic Tac Toe board mapped to array indices](https://docimg.replit.com/images/tutorials/27-tictactoe-kaboom/board.png)

Each number in the blocks represents the index at which the board position is represented in the array. Initially, we fill all the elements of the array with `null` to indicate that the block is open. When players make a move to occupy an open space, we'll add a reference to the player instead. That way we can keep track of which blocks are empty, and which are occupied by which player.

Next, we have `currentPlayer`, which we will alternately set to each player when it's their turn to move.

Then there is an array called `players`, which will hold references to both of the players in the game. This will allow us to show the names of the players on screen, as well as generally keep track of the players.

The `result` field is updated after every move. This field will contain the status of the game (as we defined above). As it's represented as an object, it will also be able to hold extra fields. We'll use that functionality to add a reference to the winner of the game, if the game ends in a win.

## Accepting connections

When a player connects via WebSocket, Sockets.IO will fire a [`connection`](https://socket.io/docs/v4/server-instance/#connection) event. We can listen for this event and handle tracking the connection, as well as creating listeners for other custom events. There are a few [custom events](https://socket.io/docs/v4/emitting-events/) we can define here, that our players will emit:

- `addPlayer`: We'll use this event for a player to request joining the game.
- `action`: This is used when a player wants to make a move.
- `rematch`: Used when a game is over, but the players want to play again.

We can also listen for the built-in [`disconnect`](https://socket.io/docs/v4/server-socket-instance/#disconnect) event, which will alert us if a player leaves the game (for example, by closing the browser window or if their internet connection is lost).

Let's add the code that will hook up our listeners to the events:

```js
io.on("connection", function (connection) {
  connection.on("addPlayer", addPlayer(connection.id));
  connection.on("action", action(connection.id));
  connection.on("rematch", rematch(connection.id));
  connection.on("disconnect", disconnect(connection.id));
});
```

Next we'll implement each of these listener functions, starting with `addPlayer`.

**Side Note:** Normally in examples for custom listeners, you'll see the handler code added immediately with an anonymous function, like this:

```js
io.on("connection", function (connection) {
  connection.on("addPlayer", (data) => {
    // some code here
  });

  connection.on("action", (data) => {
    // some code here
  });

  // etc ...
});
```

This is convenient, especially when there are a couple of handlers, each with only a small amount of code. It's also handy because in each of the handler functions, you still have access to the `connection` object, which is not passed on each event. However, it can get a little messy and unwieldy if there are many event handlers, with more complex logic in each.

We're doing it differently so that we can separate the handlers into functions elsewhere in the code base. We do have one problem to solve though: if they are separate functions, how will they access the `connection` parameter in such a way that we can tell which player sent the command? With the concept of [_closures_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures), which are well-supported in Javascript, we can make functions that return another function. In this way, we can pass in the `connection.id` parameter to the first wrapping function, and it can return another function that takes the data arguments from the Socket.IO event caller. Because the second function is within the _closure_ of the first, it will have access to the `connection.id` parameter. The pattern looks like this:

```js
io.on("connection", function (connection) {
  connection.on("addPlayer", addPlayer(connection.id));
  connection.on("action", action(connection.id));
  // etc ...
});

function addPlayer(socketId) {
  return (data) => {
    // code here
  };
}

function action(socketId) {
  return (data) => {
    // code here
  };
}
```

## Handling new players

Add the following function to handle adding players:

```js
function addPlayer(socketId) {
  return (data) => {
    const numberOfPlayers = gameState.players.length;
    if (numberOfPlayers >= 2) {
      return;
    }

    let nextSymbol = "X";
    if (numberOfPlayers === 1) {
      if (gameState.players[0].symbol === "X") {
        nextSymbol = "O";
      }
    }

    const newPlayer = {
      playerName: data.playerName,
      id: socketId,
      symbol: nextSymbol,
    };

    gameState.players.push(newPlayer);
    if (gameState.players.length === 2) {
      gameState.result.status = Statuses.PLAYING;
      gameState.currentPlayer = newPlayer;
    }
    io.emit("gameState", gameState);
  };
}
```

This function does quite a bit. Let's go through the main features.

- First it checks to see how many players are already in the game. If there are already 2 players, it returns early without changing anything. If this check passes, it goes on to add a new player. Note that even when there is no space in the game for a new player, we don't disconnect the player - they still get updates and can watch the match.
- Next, the function figures out which symbol, _X_ or _O_, the new player should be. It will assign _X_ to the first player. If there is already a player, and the existing player's symbol is _X_, then it will assign _O_ to the new player. Note that there is a possible case where there is only one player, and their symbol is _O_. This would occur if there are 2 players, and the player with the _X_ symbol disconnects from the game, leaving only the player with the _O_ symbol. This is why we always check what symbol the existing player in the game has.
- Then the function constructs a new player object with some identifying information, including the name that the player sends through, the `socketId` they connected on, and their symbol. When a new player requests to join, we expect them to send an object with a field `playerName` to tell us their handle.
- Now we add the new player to the player array in our `gameState` object, so that they are part of the game.
- We go on to check if we have 2 players, and start playing if we do. We begin by updating the status of the game to `PLAYING`, and set the `currentPlayer`, i.e. the player who is first to go, as the latest player to have joined.
- Finally, we use the Socket.IO [`emit`](https://socket.io/docs/v4/emitting-events/) function to send the updated `gameState` to all connections. This will allow them to update the players' displays.

## Handling player actions

The next handler takes care of the moves players make. We expect that the incoming data from the player will have a property called `gridIndex` to indicate which block on the board the player wants to mark. This should be a number that maps to the numbers for each block in the board, as in the picture earlier on.

```js
function action(socketId) {
  return (data) => {
    if (
      gameState.result.status === Statuses.PLAYING &&
      gameState.currentPlayer.id === socketId
    ) {
      const player = gameState.players.find((p) => p.id === socketId);
      if (gameState.board[data.gridIndex] == null) {
        gameState.board[data.gridIndex] = player;
        gameState.currentPlayer = gameState.players.find((p) => p !== player);
        checkForEndOfGame();
      }
    }
    io.emit("gameState", gameState);
  };
}
```

In this function, we check a couple of things first:

- The game status must be `PLAYING` - players can't make moves if the game is in any other state.
- The player attempting to make the move must be the `currentPlayer`, i.e. the player whose turn it is to go.

If these conditions are met, we find the player in the `gameState.players` array using the built-in [`find`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find) method on arrays, by looking for the player by their `socketId`.

Now we can check if the board position (`gridIndex`) requested by the player is available. We check that the value for that position in the `gameState.board` array is `null`, and if it is, we assign the player to it.

The player has made a successful move, so we give the other player a turn. We switch the `gameState.currentPlayer` to the other player by using the array [`find`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find) method again, to get the player who _does not_ match the current player.

We also need to check if the move the player made changed the status of the game. Did that move make them win the game, or is it a draw, or is the game still in play? We call out to a function `checkForEndOfGame` to check for this. We'll implement this function a little later, after we're done with all the handlers.

Finally, we send out the latest `gameState` to all the players (and spectators) to update the game UI.

## Handling a rematch request

Let's make it possible for a player to challenge their opponent to a rematch when the game has ended:

```js
function rematch(socketId) {
  return (data) => {
    if (gameState.players.findIndex((p) => p.id === socketId) < 0) return; // Don't let spectators rematch
    if (
      gameState.result.status === Statuses.WIN ||
      gameState.result.status === Statuses.DRAW
    ) {
      resetGame();
      io.emit("gameState", gameState);
    }
  };
}
```

This function first checks if the connection sending the rematch request is actually one of the players, and not just a spectator. If we can't find a match for a player, we return immediately, making no changes.

Then we check if the game is in one of the final states, either `WIN` or `DRAW`. If it is, we call out to a function `resetGame` to set up the game again. Finally, we send out the latest `gameState` to all the players.

Let's implement the `resetGame` function:

```js
function resetGame() {
  gameState.board = new Array(9).fill(null);

  if (gameState.players.length === 2) {
    gameState.result.status = Statuses.PLAYING;
    const randPlayer = Math.floor(Math.random() * gameState.players.length);
    gameState.currentPlayer = gameState.players[randPlayer];
  } else {
    gameState.result.status = Statuses.WAITING;
    gameState.currentPlayer = null;
  }
}
```

Let's take a look at what we're doing here:

- First, our function creates a new array for the `gameState` board. This effectively clears the board, setting all the positions back to `null`, or empty.
- Then it checks that there are still 2 players connected. If there are, it sets the game status back to `PLAYING` and chooses at random which player's turn it is to go. We choose the first player randomly so that there isn't one player getting an advantage by going first every time.

If there is only one player remaining, we set the game status to `WAITING` instead, and listen for any new players who want to join. We also set the `currentPlayer` to null, as we will choose which player should go once the new player has joined.

## Handling disconnects

The last handler we need to implement is if a connection to a player is lost. This could be because the player has exited the game (by closing the browser tab), or has other internet issues.

```js
function disconnect(socketId) {
  return (reason) => {
    gameState.players = gameState.players.filter((p) => p.id != socketId);
    if (gameState.players !== 2) {
      resetGame();
      io.emit("gameState", gameState);
    }
  };
}
```

This function uses the built-in array [`filter`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) function to remove the player that disconnected from the server. Since it's possible that the disconnect event isn't from a player but from a spectator, we check the number of players left after filtering the disconnecting socket from the player list. If there aren't 2 players remaining after filtering, we reset the game and send out the updated game state.

## Checking for the end of the game

Now we can get back to implementing the `checkForEndOfGame()` function we referenced in the `action` handler.

We're only interested in detecting 2 cases: A win or a draw.

There are just 8 patterns that determine if a player has won at tic-tac-toe. Let's map them to our board with its indexed blocks:

![All possible win lines](https://docimg.replit.com/images/tutorials/27-tictactoe-kaboom/allwins.png)

We can encode each of these winning patterns into an array of 3 numbers each. Then we can add each of those patterns to a larger array, like this:

```js
const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
```

Now that we have each winning pattern in an array, we can loop through each of them to see if there is a player that has positions that match any of the patterns.

Since the players are also in an array in `gameState.players`, we can loop through that array, and check each player against the winning pattern array. If a player matches any of these patterns, we can change the game status to `WIN` and set that player as the winner in the results.

Here is the code to do that:

```js
function checkForEndOfGame() {
  // Check for a win
  gameState.players.forEach((player) => {
    winPatterns.forEach((seq) => {
      if (
        gameState.board[seq[0]] == player &&
        gameState.board[seq[1]] == player &&
        gameState.board[seq[2]] == player
      ) {
        gameState.result.status = Statuses.WIN;
        gameState.result.winner = player;
      }
    });
  });

  // Check for a draw
  if (gameState.result.status != Statuses.WIN) {
    const emptyBlock = gameState.board.indexOf(null);
    if (emptyBlock == -1) {
      gameState.result.status = Statuses.DRAW;
    }
  }
}
```

We also check for a draw in this function. A draw is defined as when all the blocks are occupied (no more moves can be made), but no player has matched one of the win patterns. To check if there are no more empty blocks, we use the array method [`indexOf`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf) to find any `null` values in `gameState.board` array. Remember that `null` means an empty block here. The `indexOf` method will return `-1` if it can't find any `null` values. In that case, we set the game status to `DRAW`, ending the game.

Now we have all the functionality we need on the server, let's move on to building the Kaboom website the players will use to play the game.

## Setting up Kaboom

To start, we need to set up Kaboom with the screen size and colors we want for the game window. Replace the code in `main.js` with the code below:

```js
import kaboom from "kaboom";

kaboom({
  background: [0, 0, 0],
  width: 1000,
  height: 600,
});
```

This creates a new Kaboom canvas with a black background.

## Setting up Kaboom with Socket.IO

Now we can add a reference to Socket.IO. Normally, in a plain HTML project, we could add a [`<script>`](https://www.w3schools.com/tags/tag_script.asp) tag and reference the Socket.IO [client script](https://socket.io/docs/v4/client-installation/#Installation), hosted automatically on our game server. However, here we will add the script programmatically. We can do this by accessing the [`document`](https://developer.mozilla.org/en-US/docs/Web/API/Document) object available in every browser, and insert a new element with our script. Add the following code to the `main.js` file below the code to initialise Kaboom.

```js
let script = document.createElement("script");
script.src =
  "https://tic-tac-toe-server--<YOUR_USER_NAME>.repl.co" +
  "/socket.io/socket.io.js";
document.head.appendChild(script);
```

Replace the `<YOUR_USER_NAME>` part of the URL with your Replit username. This code inserts the new `<script>` tag into the [`<head>`](https://www.w3schools.com/tags/tag_head.asp) section of the underlying HTML page that Kaboom runs in.

Let's move on to creating the relevant scenes for our game. Kaboom ["scenes"](https://kaboomjs.com/#scene) allow us to group logic and levels together. In this game we'll have 2 scenes:

- A "startGame" scene that will prompt for the player's name.
- A "main" scene, which will contain all the logic to play the tic-tac-toe game.

Let's move on to the code to prompt the player to enter their name.

```js
scene("startGame", () => {
  const SCREEN_WIDTH = 1000;
  const SCREEN_HEIGHT = 600;

  add([
    text("What's your name? ", { size: 32, font: "sinko" }),
    pos(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 3),
    origin("center"),
  ]);

  const nameField = add([
    text("", { size: 32, font: "sinko" }),
    pos(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2),
    origin("center"),
  ]);

  charInput((ch) => {
    nameField.text += ch;
  });

  keyRelease("enter", () => {
    go("main", { playerName: nameField.text });
  });
});

go("startGame");
```

To keep the calculations for the UI layout simpler, we'll use a fixed size for the screen. That's where the 2 constants for the screen width and height come in.

We use the Kaboom [`add`](https://kaboomjs.com/doc#add) function to display the prompt "What's your name?" on the screen, using the [`text`](https://kaboomjs.com/doc#text) component. We choose a position halfway across the screen, `SCREEN_WIDTH / 2`, and about a third of the way down the screen, `SCREEN_HEIGHT / 3`. We add the [`origin`](https://kaboomjs.com/doc#origin) component, set to `center`, to indicate that the positions we set must be in the center of the text field.

Then we add another object with an empty `""` text component. This will display the characters the player types in. We position it exactly halfway down and across the screen. We also hold a reference to the object in the constant `nameField`.

To get the user's keyboard input, we use the Kaboom function [`charInput`](https://kaboomjs.com/doc#charInput). This function calls an event handler each time a key on the keyboard is pressed. We take that character and append it to the text in the `nameField` object. Now, when a player presses a key to enter their name, it will show up on the screen.

Finally, we use the Kaboom function [`keyRelease`](https://kaboomjs.com/doc#keyRelease) to listen for when the player pushes the `enter` key. We'll take that as meaning they have finished entering their name and want to start the game. In the handler, we use the Kaboom [`go`](https://kaboomjs.com/doc#go) function to redirect to the main scene of the game.

## Adding the game board

Now we can add the UI elements for the game itself. Create the "main" scene in your Kaboom repl by adding the following code to draw the tic-tac-toe board:

```js
scene("main", ({ playerName }) => {
  // Board
  add([rect(1, 400), pos(233, 100)]);

  add([rect(1, 400), pos(366, 100)]);

  add([rect(400, 1), pos(100, 233)]);

  add([rect(400, 1), pos(100, 366)]);
});
```

This adds 4 rectangles with a width of 1 pixel and length of 400 pixels to the screen - each rectangle is more like a line. This is how we draw the lines that create the classic tic-tac-toe board shape. The first 2 rectangles are the vertical lines, and the second 2 are the horizontal lines. We place the board closer to the left side of the screen, instead of the center, to save space for game information to be displayed on the right hand side of the screen.

If you run the game, and enter your name, you should see the board layout like this:

![board layout](https://docimg.replit.com/images/tutorials/27-tictactoe-kaboom/boardLayout.png)

Now we need to add a way to draw the _X_ and _O_ symbols in each block. To do this, we'll add objects with text components in each block of the board. First, we'll make an array containing the location and size of each block. Add the following code snippets within the "main" scene we created above:

```js
const boardSquares = [
  { index: 0, x: 100, y: 100, width: 133, height: 133 },
  { index: 1, x: 233, y: 100, width: 133, height: 133 },
  { index: 2, x: 366, y: 100, width: 133, height: 133 },
  { index: 3, x: 100, y: 233, width: 133, height: 133 },
  { index: 4, x: 233, y: 233, width: 133, height: 133 },
  { index: 5, x: 366, y: 233, width: 133, height: 133 },
  { index: 6, x: 100, y: 366, width: 133, height: 133 },
  { index: 7, x: 233, y: 366, width: 133, height: 133 },
  { index: 8, x: 366, y: 366, width: 133, height: 133 },
];
```

We can run through this array and create a text object that we can write to when we want to update the symbols on the board. Let's create a function to do that.

```js
function createTextBoxesForGrid() {
  boardSquares.forEach((square) => {
    let x = square.x + square.width * 0.5;
    let y = square.y + square.height * 0.5;
    square.textBox = add([text("", 40), pos(x, y), origin("center")]);
  });
}

createTextBoxesForGrid();
```

This function uses the array [`forEach`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) method to loop through each "square" definition in the `boardSquares` array. We then find the center `x` and `y` of the square, and [`add`](https://kaboomjs.com/doc#add) a new text object to the screen, and also add it to the square definition on the field `textBox` so we can access it later to update it. We use the `origin` component to ensure the text is centered in the square.

Finally, we call the function to create the text boxes.

## Adding player names and game status

Now let's add some areas for the player's names and for the current status of the game (whose turn it is to play, if someone has won, or if it's a draw).

```js
// Players and game status elements
const playerOneLabel = add([
  text("", { size: 20, font: "sinko" }),
  pos(600, 100),
]);

const playerTwoLabel = add([
  text("", { size: 20, font: "sinko" }),
  pos(600, 150),
]);

const statusLabel = add([
  text("", { size: 20, font: "sinko" }),
  pos(600, 200),
  color(0, 255, 0),
]);
```

Here we add 3 objects with [`text`](https://kaboomjs.com/doc#text) components. The first 2 are placeholders for the player names and symbols. The third one is for the game status. They are positioned to the right of the screen, and contain empty text to start. We'll change the contents as we receive new game states from the server. The last object has a `color` component to set the color of the text to green. This is to make the status message stand out from the rest of the text.

## Connecting to the server

To connect to the game server, we need to initialize the Socket.IO library we dynamically added earlier. We need to provide the URL to the server repl, so copy that from the output window of the server repl:

![Copying server url](https://docimg.replit.com/images/tutorials/27-tictactoe-kaboom/server-url.png)

Now add this code along with the server URL to the "main" scene in the player repl:

```js
var socket = io("https://tic-tac-toe-server--<YOUR_USER_NAME>.repl.co");

socket.on("connect", function () {
  socket.emit("addPlayer", {
    playerName: playerName,
  });
});
```

In the first line, we initialize the [Socket.IO client library](https://socket.io/docs/v4/client-initialization/) to connect to the server. Then we add a listener to the [`connect`](https://socket.io/docs/v4/client-socket-instance/#Socket-connected) event. This lets us know when we have established a connection to the server.

If we have a connection, we then [`emit`](https://socket.io/docs/v4/emitting-events/) an event to the server, with our custom event type `addPlayer`. We also add in the player name, which we passed to this scene from the `startGame` scene. Emitting the `addPlayer` event to the server will cause the `addPlayer` event handler to fire on the server side, adding the player to the game, and emitting back the game state.

## Handling updated game state

Remember that our server emits a `gameState` event whenever something changes in the game. We'll listen for that event, and update all the UI elements in an event handler.

First, we need to add the definitions of each status as we have done on the server side, so that we can easily reference them in the code:

```js
const Statuses = {
  WAITING: "waiting",
  PLAYING: "playing",
  DRAW: "draw",
  WIN: "win",
};
```

Now we can add a listener and event handler:

```js
socket.on("gameState", function (state) {
  for (let index = 0; index < state.board.length; index++) {
    const player = state.board[index];
    if (player != null) {
      boardSquares[index].textBox.text = player.symbol;
    } else {
      boardSquares[index].textBox.text = "";
    }
  }

  statusLabel.text = "";
  switch (state.result.status) {
    case Statuses.WAITING:
      statusLabel.text = "Waiting for players....";
      break;
    case Statuses.PLAYING:
      statusLabel.text = state.currentPlayer.playerName + " to play";
      break;
    case Statuses.DRAW:
      statusLabel.text = "Draw! \nPress R for rematch";
      break;
    case Statuses.WIN:
      statusLabel.text =
        state.result.winner.playerName + " Wins! \nPress R for rematch";
      break;
    default:
      break;
  }

  playerOneLabel.text = "";
  playerTwoLabel.text = "";
  if (state.players.length > 0) {
    playerOneLabel.text =
      state.players[0].symbol + ": " + state.players[0].playerName;
  }

  if (state.players.length > 1) {
    playerTwoLabel.text =
      state.players[1].symbol + ": " + state.players[1].playerName;
  }
});
```

This function looks quite long, but it's mainly just updating the text boxes we added.

First, we loop through the board positions array that is passed from the server on the `state` payload, to check each block for a player positioned on it. If there is a player on a block, we write that player's symbol to the corresponding text box, found in the `boardSquares` array we created above. If there is no player in the block, i.e it's a `null` value, we write an empty string to the text block.

Then we update the `statusLabel` to show what is currently happening in the game. We use a [`switch`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch) statement to create logic for each of the possibilities. We write a different message to the `statusLabel` text box depending on the status, drawing from data in the `gameState` object.

Next we update the player name text boxes. First we reset them, in case one of the players has dropped out. Then we update the text boxes with the players' symbols and names. Note that we first check if there are the corresponding players in the array.

Now that we're done with updating from the game state, let's try running the game again. Open the game window in a new tab so that requests to the repl server don't get blocked by the browser due to the CORS header 'Access-Control-Allow-Origin' not matching in the embedded window.

![Open in new tab](https://docimg.replit.com/images/tutorials/27-tictactoe-kaboom/open-in-new-tab.png)

Make sure the server is also running, and enter your name. You should see something like this:

![Waiting for another player](https://docimg.replit.com/images/tutorials/27-tictactoe-kaboom/waiting.png)

You can connect to your game in another browser tab, and enter another name. Then you should see both names come up, and the status message change to allow a player to make a move. Of course, we haven't yet implemented the code to enable making a move from the UI, so let's do that now.

## Handling player moves

We want a player to be able to click on a block to place their move. Kaboom has a function [`onMouseRelease`](https://kaboomjs.com/doc#onMouseRelease) that we can use to handle mouse click events. All we need then is the position the mouse cursor is at, and we can map that to one of the board positions using our `boardSquares` array to do the lookup. We'll use the Kaboom function [`mousePos`](https://kaboomjs.com/doc#mousePos) to get the coordinates of the mouse:

```js
onMouseRelease(() => {
  const mpos = mousePos();
  // find the square we clicked on
  for (let index = 0; index < boardSquares.length; index++) {
    const square = boardSquares[index];
    if (
      mpos.x > square.x &&
      mpos.x < square.x + square.width &&
      mpos.y > square.y &&
      mpos.y < square.y + square.height
    ) {
      socket.emit("action", {
        gridIndex: square.index,
      });
      break;
    }
  }
});
```

If we find a 'hit' on one of the board squares, we emit our `action` event. We pass the index of the square that was clicked on as the payload data. The server listens for this event, and runs the logic we added for the `action` event on the server side. If the action changes the game state, the server will send back the new game state, and the UI elements update.

The only other input we need to implement is to check if the player wants a rematch. To do that, we'll assign the `r` key as the rematch command. We can use the Kaboom function [`charInput`](https://kaboomjs.com/doc#charInput) to listen for key press events. We'll check if the key is `r`, or `R`, then emit the `rematch` event. We don't have any data to pass with that, so we'll just pass `null`.

```js
charInput((ch) => {
  if (ch === "r" || ch === "R") {
    socket.emit("rematch", null);
  }
});
```

Now you can run the game (and the server), and open the game in another tab, and you should be able to play tic-tac-toe against yourself! Send a link to the game to a friend, and see if they can join and play against you.

![playing tic tac toe](https://docimg.replit.com/images/tutorials/27-tictactoe-kaboom/playing.png)

## Next Steps

Now that you know the basics of creating a multiplayer online game, try your hand at making some different games, like checkers or chess or go.

Happy coding!

## Tic-tac-toe repl

<iframe height="400px" width="100%" src="https://replit.com/@ritza/tic-tac-toe-new?embed=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Tic-tac-toe server repl

<iframe height="400px" width="100%" src="https://replit.com/@ritza/tic-tac-toe-server-new?embed=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
