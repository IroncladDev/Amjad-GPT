---
title: Space Shooter with Kaboom.js
---

# Build a Space Shooter with Kaboom.js

In this tutorial, we'll build a space shooter game with a platformer feel. We'll use [Kaboom.js](https://kaboomjs.com) for the game engine, and we'll code it using [Replit](https://replit.com) online IDE (Integrated Development Environment).

Here's how the game will look when we're done:

![The finished game](https://docimg.replit.com/images/tutorials/24-space-shooter-kaboom/gameplay.gif)

You can download this [zip file](https://tutorial-files.util.repl.co/space-shooter-kaboom/space-shooter-resources.zip) with all the sprites and sounds you'll need for this tutorial.

## Game Design

Here's what we're aiming for in this game:

- Fast action: the player moves around a lot.
- Good sound effects: to immerse the player in the game and contribute to the overall game vibe.
- Lots of shooting opportunities.
- Increasing challenge: the game gets harder and faster as the player gets better.

In our game, a player flies a spaceship around a faraway planet, collecting gems and dodging or shooting alien bugs that explode on contact. The spaceship will lose shield strength each time an alien bug hits it. With every 1000 points the player earns, the game gets faster and more bugs appear.

## Creating a New Project on Replit

Let's head over to [Replit](https://replit.com) and create a new repl. Choose **Kaboom** as your project type. Give this repl a name, like "Space Shooter".

![Creating an Repl](https://docimg.replit.com/images/tutorials/24-space-shooter-kaboom/create-repl.png)

After the repl has booted up, you should see a `main.js` file under the "Code" section. This is where we'll start coding.

## Getting Started with Kaboom.js

[Kaboom.js](https://kaboomjs.com) is a JavaScript library that contains a lot of useful features for making simple browser games. It has functionality to draw shapes and sprites (the images of characters and game elements) to the screen, get user input, play sounds, and more. We'll use some of these features in our game to explore how Kaboom works.

The Replit Kaboom interface is specialised for game-making. Besides the Space Invader icon, you'll notice a few special folders in the file tray, like "Code", "Sprites", and "Sounds". These special folders take care of loading up assets, and all the necessary code to start scenes and direct the game. You can read up more about this interface [here](/tutorials/kaboom/kaboom-editor).

If you haven't already, download this [zip file](https://tutorial-files.util.repl.co/space-shooter-kaboom/space-shooter-resources.zip) which contains all the sprites and sounds for the game. Extract the file on your computer, then add the sprites to the "Sprites" section in the Replit editor, and the sounds to the "Sounds" section.

![Uploading assets](https://docimg.replit.com/images/tutorials/24-space-shooter-kaboom/upload-sprites.gif)

Kaboom makes good use of JavaScript's support for [callbacks](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function): instead of writing loops to read keyboard input and check if game objects have collided, Kaboom uses an event model that tells us when these events have happened. We can then write [callback functions](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function) to act on these events.

A Kaboom game is made up of "scenes", which are like levels, or different parts and stages of a game. Scenes have multiple "layers", allowing us to have game backgrounds, main game objects (like the player, bullets, enemies, etc), and UI elements (like the current score, health, etc).

## Setting up Kaboom

To start, we need to set up Kaboom with the screen size and colors we want for the game window. Replace the code in `main.js` with the code below:

```javascript
import kaboom from "kaboom";

kaboom({
  background: [0, 0, 0],
  width: 440,
  height: 275,
  scale: 1.5,
});
```

Here we import the kaboom library, and then initialize the context by calling `kaboom({ ... })`. We also set the size of the view to 440x275 pixels and `scale` the background by a factor of `1.5` on screen.
Now, let's load up the sprites and sounds we will need in this game. This code loads each of the graphic elements we'll use, and gives them a name, so we can refer to them when we build the game characters:

```javascript
loadRoot("sprites/");
loadSprite("stars", "stars.png");
loadSprite("gem", "gem.png");
loadSprite("spaceship", "spaceship.png");
loadSprite("alien", "alien.png");

loadRoot("sounds/");
loadSound("shoot", "shoot.wav");
loadSound("score", "score.wav");
loadSound("music", "music.mp3");
loadSound("explosion", "explosion.wav");
```

The first line, [`loadRoot`](https://kaboomjs.com/#loadRoot), specifies which folder to load all the sprites and game elements from, so we don't have to keep typing it in for each sprite. Then each line loads a game sprite and gives it a name so that we can refer to it in code later. We use similar code to load the sounds we will need in this game, but instead of [`loadSprite`](https://kaboomjs.com/#loadSprite) we use [`loadSound`](https://kaboomjs.com/#loadSound) to load sounds.

## Adding the main game scene

Kaboom ["scenes"](https://kaboomjs.com/#scene) allow us to group logic and levels together. In this game we'll have 2 scenes:

- A "main" scene, which will contain the game levels and all the logic to move the spaceship.
- An "endGame" scene which will display when the game is over.

```javascript
scene("main", () => {
  layers(["bg", "obj", "ui"], "obj");

  add([sprite("stars"), layer("bg")]);

  // todo.. add main scene code here
});

go("main");
```

We define the scene using the [`scene`](https://kaboomjs.com/#scene) function. This function takes a string as the scene name – we're calling the scene "main".
Then we create 3 layers: "background" (`bg`), "object" (`obj`) and "user interface" (`ui`). The `obj` layer is set as the default layer. We then add the stars sprite to the background layer.

Finally, we use the [`go`](https://kaboomjs.com/#go) function to go to the main scene when the game starts up.

**Note** The code snippets in the sections that follow have to be added within the body of the main scene unless specified otherwise.

## Creating the Game Map

Let's get a scene layout, or _map_, drawn on the screen. This will define the ground and platforms in the game.

Kaboom has built-in support for defining game maps using text and the function [`addLevel`](https://kaboomjs.com/doc#addLevel). This takes away a lot of the hassle normally involved in loading and rendering maps.

The code below creates the game map. Add it to the `main.js` file, within the main scene (below the code to add the stars sprite to the background layer).

```javascript
// Game Parameters
const MAP_WIDTH = 440;
const MAP_HEIGHT = 275;
const BLOCK_SIZE = 11;

const map = addLevel(
  [
    "--------------------------------------------",
    "-                                          -",
    "-                                          -",
    "-                                          -",
    "-                                          -",
    "-                                          -",
    "-                                          -",
    "-                                          -",
    "-                                          -",
    "-                                          -",
    "-                                pppppp    -",
    "-                                          -",
    "-                                          -",
    "-                                          -",
    "-                                          -",
    "-                                          -",
    "-   pppppp                                 -",
    "-                                          -",
    "-                                          -",
    "-                 pppppp                   -",
    "-                                          -",
    "-                                          -",
    "-                                          -",
    "-                                          -",
    "============================================",
    "                                            ",
  ],
  {
    width: BLOCK_SIZE,
    height: BLOCK_SIZE,
    pos: vec2(0, 0),
    "=": () => [
      rect(BLOCK_SIZE, BLOCK_SIZE),
      color(150, 75, 0),
      "ground",
      area(),
      solid(),
    ],
    p: () => [
      rect(BLOCK_SIZE, BLOCK_SIZE),
      color(0, 0, 255),
      "platform",
      area(),
      solid(),
    ],
    "-": () => [
      rect(BLOCK_SIZE / 10, BLOCK_SIZE),
      color(0, 0, 0),
      "boundary",
      area(),
      solid(),
    ],
  }
);
```

First, we add some game parameters, which we'll use when we define the size of the map, and the default block size for map elements.

Next, we create the game map. The map, or level design, is expressed in an array of strings. Each row in the array represents one row on the screen, so we can design visually in text what the map should look like. The width and height parameters specify the size of each of the elements in the map. The `pos` parameter specifies where on the screen the map should be placed – we chose `0,0`, which is the top left of the screen, as the starting point for the map.

Kaboom allows us to specify what to draw for each symbol in the text map. You can make maps out of different elements, e.g. a symbol for a wall, a symbol for ground, a symbol for a hump, and so on. To tell Kaboom what to draw for the symbol, we add the symbol as a key, for example `=`, and then specify parameters for it.

In this code, we have 3 different type of fixed map elements: `=` representing the ground, `p` representing platforms, and `-` representing the invisible boundaries of the screen. Each of the map elements has a tag (`ground`, `platform`, `boundary`) which is the string name grouping the individual pieces together. This allows us to refer to them collectively later.

If we run the code, we should see the game map, like this:

![Game map](https://docimg.replit.com/images/tutorials/24-space-shooter-kaboom/game-map.png)

## Adding the Spaceship

Let's add the spaceship using the [`add`](https://kaboomjs.com/doc#add) function:

```javascript
const player = add([
  sprite("spaceship"),
  pos(100, 200),
  body(),
  area(),
  scale(1),
  rotate(0),
  origin("center"),
  "player",
  {
    score: 0,
    shield: 100,
  },
]);
```

The [`add`](https://kaboomjs.com/doc#add) function constructs a game object using different components, e.g. `pos`, `body`, `scale`, etc. Each of these components gives the object different features.

Notably, the [`body`](https://kaboomjs.com/doc#body) component makes the object react to gravity: the spaceship falls if it's not on the ground or a platform. The [`rotate`](https://kaboomjs.com/doc#rotate) component allows us to tilt the spaceship in the direction the player wants to go, providing good visual feedback. By default, all operations are calculated around the top left corner of game objects. To make the tilt work correctly, we add the [`origin`](https://kaboomjs.com/doc#origin) component and set it to `center`, so that the tilt adjusts the angle from the center of the object.

Kaboom also allows us to attach custom data to a game object. We've added `score` to hold the player's latest score, and `shield` to hold the percentage of the ship's protection shield still available. We can adjust these as the player picks up items or crashes into aliens.

When we created the `map` earlier, we added the [`solid`](https://kaboomjs.com/doc#solid) component to map objects. This component marks objects as solid, meaning other objects can't move past them.

## Moving the Spaceship

We'll allow a few different moves for the spaceship: change direction left or right and fly up. We also need to keep track of which way the spaceship is facing, so that we'll know which side to shoot lasers from later.

To handle the changing and tracking of direction, add the following code:

```javascript
const directions = {
  LEFT: "left",
  RIGHT: "right",
};

let current_direction = directions.RIGHT;

onKeyDown("left", () => {
  player.flipX(-1);
  player.angle = -11;
  current_direction = directions.LEFT;
  player.move(-100, 0);
});

onKeyDown("right", () => {
  player.flipX(1);
  player.angle = 11;
  current_direction = directions.RIGHT;
  player.move(100, 0);
});

onKeyRelease("left", () => {
  player.angle = 0;
});

onKeyRelease("right", () => {
  player.angle = 0;
});
```

First, we create a constant object defining the directions our game allows. Then we create a variable to track the `current_direction` the spaceship is facing.

Then we add the key-handling code. The key names `left` and `right` refer to the left and right arrow keys on the keyboard. Kaboom provides the [`onKeyDown`](https://kaboomjs.com#onKeyDown) event, which lets us know if a certain key is being pressed. We create `onKeyDown` event handlers for each of the arrow keys. As long as the given key is held down, `onKeyDown` calls the event handler repeatedly.

The code inside each `onKeyDown` event does the following:

- The `flipX` function mirrors the player's spaceship image so that it looks different depending on the direction it is facing. We use `-1` to flip it to appear facing the left, `1` the right.
- The function `player.angle` slightly tilts the spaceship while the key is being held down. This is so the spaceship looks like it is about to move in the given direction.
- The `current_direction` tracking variable is updated. We'll use this variable when we add shooting.
- The `move` function moves the spaceship in the given direction.

We also have `onKeyRelease` event handlers for the left and right keys. These reset the spaceship's tilt angle to 0 (i.e. straight up) when the ship is no longer moving in that direction.

Now we want to have the spaceship fly up when we press the `up arrow` key. To do this, we'll take advantage of Kaboom's [`jump`](https://kaboomjs.com/doc#body) attribute (which is part of the [`body`](https://kaboomjs.com/doc#body) component) and repurpose it for flying up. Add the following code to the main scene:

```javascript
onKeyDown("up", () => {
  player.jump(100);
});
```

## Adding Laser Guns

Because the game takes place in outer space, the weapon of choice is a laser gun. We'll need to add functions to create the bullet when the player fires, and to control the direction of the bullets. We'll also need to add another key handler to check when the player presses a key to "fire", which is the space key in this game.

```javascript
const BULLET_SPEED = 400;

onKeyPress("space", () => {
  spawnBullet(player.pos);
});

function spawnBullet(bulletpos) {
  if (current_direction == directions.LEFT) {
    bulletpos = bulletpos.sub(10, 0);
  } else if (current_direction == directions.RIGHT) {
    bulletpos = bulletpos.add(10, 0);
  }
  add([
    rect(6, 2),
    pos(bulletpos),
    origin("center"),
    color(255, 255, 255),
    area(),
    "bullet",
    {
      bulletSpeed:
        current_direction == directions.LEFT ? -1 * BULLET_SPEED : BULLET_SPEED,
    },
  ]);

  play("shoot", {
    volume: 0.2,
    detune: rand(-1200, 1200),
  });
}
```

First, we add a constant `BULLET_SPEED` to define the speed at which the laser "bullets" fly across the screen. Then we use the [`onKeyPress`](https://kaboomjs.com#onKeyPress) event to trigger the shooting. Notice `onKeyPress` only calls the event handler once as the key is pressed, unlike the `onKeyDown` event we used for moving. This is because it's more fun if the player needs to bash the "fire" button as fast as possible to take down an enemy, rather than just having automatic weapons.

The `onKeyPress` handler calls the `spawnBullet` function with the player's current position. This function handles creating a new laser shot in the correct direction. The first few lines of the method adjust the bullet's starting position a little to the left or right of the spaceship's position. This is because the position of the spaceship that gets passed to the function is the center of the spaceship (remember the `origin` component we added to it earlier). We adjust it a little so that the bullet looks like it is coming from the edge of the spaceship.

Then we add a new bullet object to the game using the [`add`](https://kaboomjs.com/doc#add) function. We don't use a sprite for the bullet, but draw a [`rect`](https://kaboomjs.com/doc#rect), or rectangle, with our given color. We tag it `bullet` so we can refer to it later when detecting if it hit something. We also give it a custom property, `bulletSpeed`, which is the distance and direction we want the bullet to move on each frame.

Finally, we add sound effects when the player shoots. The [`play`](https://kaboomjs.com/doc#play) function plays our "shoot.wav" file. We adjust the volume down a bit, so it fits in better with the overall sound mix. We use the `detune` parameter along with a random number generator, [`rand`](https://kaboomjs.com/doc#rand), to change the pitch of the sound each time it's played. This is so the sound doesn't become too repetitive and also because it sounds weird and "spacey".

Now that we've set up the bullet, we need to make it move on each frame. To do this we can use the [`onUpdate`](https://kaboomjs.com/doc#onUpdate) event, using the `bullet` tag to identify the objects we want to update:

```javascript
onUpdate("bullet", (b) => {
  b.move(b.bulletSpeed, 0);
  if (b.pos.x < 0 || b.pos.x > MAP_WIDTH) {
    destroy(b);
  }
});
```

With each frame, the action event updates the objects with the matching tag, in this case `bullet`. We call [`move`](https://kaboomjs.com/doc#pos) on the bullet, using the custom value for `bulletSpeed` that we assigned to it on creation. We also check to see if the bullet has gone off the screen, and if it has, we [`destroy`](https://kaboomjs.com/doc#destroy) it.

We also need to destroy the bullet if it hits a platform. We can do this using the Kaboom [`onCollide`](https://kaboomjs.com/doc#onCollide) event. Add the following code:

```javascript
onCollide("bullet", "platform", (bullet, platform) => {
  destroy(bullet);
});
```

Run the code now, and you should be able to shoot.

![Laser firing](https://docimg.replit.com/images/tutorials/24-space-shooter-kaboom/laser-firing.gif)

## Adding Alien Space Bugs

Now that we have a spacecraft, and it can shoot, we need something to shoot at. Let's add some hostile exploding alien space bugs. We'll want to have them coming in a relatively constant stream to keep the game challenging. We also want them coming in from different sides and angles to keep the player on their toes. We'll add a new function to control the creation of alien space bugs:

```javascript
const ALIEN__BASE_SPEED = 100;
const ALIEN_SPEED_INC = 20;

function spawnAlien() {
  let alienDirection = choose([directions.LEFT, directions.RIGHT]);
  let xpos = alienDirection == directions.LEFT ? 0 : MAP_WIDTH;

  const points_speed_up = Math.floor(player.score / 1000);
  const alien_speed = ALIEN__BASE_SPEED + points_speed_up * ALIEN_SPEED_INC;
  const new_alien_interval = 0.8 - points_speed_up / 20;

  add([
    sprite("alien"),
    pos(xpos, rand(0, MAP_HEIGHT - 20)),
    area(),
    "alien",
    {
      speedX:
        rand(alien_speed * 0.5, alien_speed * 1.5) *
        (alienDirection == directions.LEFT ? 1 : -1),
      speedY: rand(alien_speed * 0.1, alien_speed * 0.5) * choose([-1, 1]),
    },
  ]);

  wait(new_alien_interval, spawnAlien);
}

spawnAlien();
```

We create 2 parameters for the alien's speed: a base rate and an incremental rate. Each time the player gains another 1000 points, we'll add to the incremental rate.

**Tip:** You can put these parameters and all the others we have defined at the top of the file, so that they are easy to find and adjust if you want to tweak the game parameters later.

Then we define the `spawnAlien` function. To randomly choose the side of the screen the alien will fly in from, we use the Kaboom [`choose`](https://kaboomjs.com/doc#choose) function, which picks an element at random from an array. From the chosen direction, we can determine the alien's starting position on the `x axis` (horizontal plane).

Then we go into the calculation to figure out the speed that the alien should move at. First, we check if we need to increase the alien's speed based on the player's score. We divide the player's score by 1000 (since the aliens' speed increases with every 1000 points the player earns). We get rid of decimals by using the [`Math.floor`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor) function, which is built into JavaScript. The result is our `points_speed_up` value.

Next we take the `ALIEN_BASE_SPEED` and add the incremental rate multiplied by our `points_speed_up` value.

We also calculate a new rate at which aliens are spawned, making the aliens not only faster at moving, but also faster at respawning.

Now that we've calculated our basic parameters, we create a new alien using the [`add`](https://kaboomjs.com/doc#add) function again:

- `sprite('alien')` creates the alien with the image `alien`.
- `pos(xpos, rand(0, MAP_HEIGHT-20))` sets the starting position of the alien. We calculated the `x pos` from the randomly chosen direction. We also add a random `y` (vertical) position for the alien, between the top (position `0`) of the map, and the bottom (`MAP_HEIGHT`) of the map (screen co-ordinates start from the top left of the screen). We remove `20` pixels from the bottom bounds, to account for the ground.
- We add the `"alien"` tag to the object, so we can identify and call it in other parts of the code.
- We also add a custom object with the speed of this particular alien, broken into it's speed along the `x` and `y` axis. For the speed along the x-axis `speedX`, we add a random component so that not all aliens move at exactly the same speed. Then we multiply the speed by -1 or 1 depending on whether the alien is meant to be moving left or right across the screen.

Finally, we use Kaboom's [`wait`](https://kaboomjs.com/doc#wait) function to wait a short amount of time before calling `spawnAlien` again to create a new alien. We also have a call to `spawnAlien` to get it started when the game starts.

## Moving the Aliens

To move the aliens, we'll create a handler to attach to the `onUpdate` event, which fires for each alien object on every frame, like we did for the bullets:

```javascript
onUpdate("alien", (alien) => {
  alien.move(alien.speedX, alien.speedY);

  if (alien.pos.y - alien.height > MAP_HEIGHT || alien.pos.y < 0) {
    destroy(alien);
  }
  if (alien.pos.x < -1 * alien.width || alien.pos.x > MAP_WIDTH) {
    destroy(alien);
  }
});
```

First, the function moves the alien by the amount we calculated earlier and saved to the alien's custom data.

Then the function checks to see if the alien has moved out of bounds of the map area. If it has, we destroy it, as it is no longer visible. Having too many active objects can decrease performance, so this step is important.

Run the code now, you should see moving aliens.

![Aliens](https://docimg.replit.com/images/tutorials/24-space-shooter-kaboom/aliens.gif)

## Shooting the Aliens

Now that we have moving aliens, a moving spaceship, and laser bullets, let's add the code to deal with a laser bullet hitting an alien. Of course, we want this to have a cool explosion and sound effect to give good feedback to the player.

```javascript
onCollide("alien", "bullet", (alien, bullet) => {
  makeExplosion(alien.pos, 5, 5, 5);
  destroy(alien);
  destroy(bullet);
  play("explosion", {
    volume: 0.2,
    detune: rand(0, 1200),
  });
});
```

This is similar to the code used before to check if a bullet has hit a platform. We [`destroy`](https://kaboomjs.com/doc#destroy) both the bullet and alien to remove them from the scene. Then we use the [`play`](https://kaboomjs.com/doc#playhttps://kaboomjs.com/doc#play) function to play the explosion sound effect. We set the volume so it fits in the mix, and we also put a random detune (pitch adjust) on the sound, to vary it and make it more interesting when a lot of aliens are being shot at.

We also call out to a function to create an explosion around the area where the alien bug used to be. This code is from the ["shooter" example on the Kaboom examples page](https://kaboomjs.com/demo#shooter) (which is a great game). It makes a series of bright white flashes around the explosion site, giving a cool cartoon or comic-book-like feel to the explosions. Add this code:

```javascript
function makeExplosion(p, n, rad, size) {
  for (let i = 0; i < n; i++) {
    wait(rand(n * 0.1), () => {
      for (let i = 0; i < 2; i++) {
        add([
          pos(p.add(rand(vec2(-rad), vec2(rad)))),
          rect(1, 1),
          color(255, 255, 255),
          origin("center"),
          scale(1 * size, 1 * size),
          grow(rand(48, 72) * size),
          lifespan(0.1),
        ]);
      }
    });
  }
}

function lifespan(time) {
  let timer = 0;
  return {
    update() {
      timer += dt();
      if (timer >= time) {
        destroy(this);
      }
    },
  };
}

function grow(rate) {
  return {
    update() {
      const n = rate * dt();
      this.scale.x += n;
      this.scale.y += n;
    },
  };
}
```

The `makeExplosion` function has four _arguments_ (inputs to the function). These are:

- `p`, the center position to base the explosions around
- `n`, the number of main flashes to make
- `rad`, the radius or distance from `p` to make the flashes in
- `size`, the size of each of the flashes

The function creates a [`for loop`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for) to loop for `n` times (the number of main flashes we want to make). It uses the Kaboom [`wait`](https://kaboomjs.com/doc#wait) function to leave a little bit of time (0.1) seconds between each main flash.

Another `for loop` loops twice to create 2 sub flashes, using the Kaboom [`add`](https://kaboomjs.com/doc#add) function to add a [`rectangle`](https://kaboomjs.com/doc#rect) shape for each flash, and setting the color to bright white (color components in Kaboom go from 0-1). This rectangle starts out at 1 pixel in each dimension. Then the [`scale`](https://kaboomjs.com/doc#scale) component is added to increase the size of the flash to the `size` passed in to the function - we'll use this later when we "grow" the explosion. The [`origin`](https://kaboomjs.com/doc#origin) component is used to set the origin of the rectangle to it's center - this will be used when we "grow" the flash to give the impression that it is starting from a small point and exploding. We set the origin as the center so that scale is calculated from this position, giving it a more natural feel.

To make the flashes appear around the position `p` that we specified, the [`pos`](https://kaboomjs.com/doc#pos) component is adjusted by a random amount, ranging from `-rad` to `rad`, the radius we specified (in other words, the blast area).

Then there are references to two custom components - `lifespan` and `grow`. Kaboom allows us to define our own components to give objects any behaviour or attributes we want. All we need to do is create a function that returns an object with a method called `update`, which is then called for each frame of the object the component is added to.

Let's first look at the custom component `grow`. This is used to create the effect of the flash expanding outwards, like a firework explosion starting at a small point and getting larger until it disappears. In `grow`'s `update` function, the object is scaled up (available because we used the [`scale`](https://kaboomjs.com/doc#scale) component on the object) on each frame. This is calculated from the `rate` passed in - which is the size the object should grow per second, multiplied by the time difference from the last frame, using the Kaboom [`dt`](https://kaboomjs.com/doc#dt) function, which provides that time difference in seconds for us. The explosion flash will keep on growing in each frame, so we need a way to end the explosion before it covers the entire screen.

This brings us to the `lifespan` component. This is implemented to automatically [`destroy`](https://kaboomjs.com/doc#destroy) the object after a short time, to solve the ever-growing explosion problem. It works by having a `timer` variable, which is updated each frame with the difference in time from the last frame, using the Kaboom [`dt`](https://kaboomjs.com/doc#dt) function again. When the `timer` count is more than the `time` parameter passed into the component, the object is automatically [`destroyed`](https://kaboomjs.com/doc#destroy). This creates the impression of a quick explosion blast.

![Shooting Aliens](https://docimg.replit.com/images/tutorials/24-space-shooter-kaboom/shooting-aliens.gif)

## Exploding the Alien Bugs on Contact

When the alien bugs hit something solid, they should explode. To do this, we'll add the following code:

```javascript
onCollide("alien", "platform", (alien, platform) => {
  makeExplosion(alien.pos, 5, 3, 3);
  destroy(alien);
  play("explosion", {
    volume: 0.1,
    detune: rand(-1200, 1200),
  });
});

onCollide("alien", "ground", (alien, ground) => {
  makeExplosion(alien.pos, 5, 3, 3);
  destroy(alien);
  play("explosion", {
    volume: 0.1,
    detune: rand(-1200, 1200),
  });
});
```

Here we have 2 collision handlers: one for aliens hitting a platform, and one for aliens hitting the ground. They both do the same thing. First, since we have a great explosion creating function, we use it gratuitously. Then we [`destroy`](https://kaboomjs.com/doc#destroy) the alien object to remove it from the scene. Finally, we play an explosion sound effect at a lower volume, as this explosion is not caused by the player and doesn't directly affect them. We also add the usual random [`detune`](https://kaboomjs.com/doc#play) function to modify the sound each time and keep it interesting.

## Adding Score and Shield UI

Let's add the UI to show the ship's shield health and the player's overall score.

First, add text for the player's score:

```javascript
add([
  text("SCORE: ", { size: 8, font: "sink" }),
  pos(100, 10),
  origin("center"),
  layer("ui"),
]);

const scoreText = add([
  text("000000", { size: 8, font: "sink" }),
  pos(150, 10),
  origin("center"),
  layer("ui"),
]);
```

Here we add two new objects, rendered with the [`text`](https://kaboomjs.com/doc#text) component. The first is just the static label for the score. The second is the text placeholder for the actual score. Note that the [`layer`](https://kaboomjs.com/doc#layer) component is used in both cases to place the text on the UI layer we created at the start of the tutorial. We haven't had to specify the layer for all our other game objects, because we set the `obj` layer as the default to use when we defined the layers.

Now that we have the UI components for showing the score, we need a function to update the score when it changes, and reflect it on the UI.

```javascript
function updateScore(points) {
  player.score += points;
  scoreText.text = player.score.toString().padStart(6, 0);
  play("score", {
    volume: 0.5,
    detune: rand(-1200, 1200),
  });
}
```

This `updateScore` function takes as its argument the number of points to add to the score and adds them to the player's current score - remember we added `score` as a custom property when we created the player (spaceship) object.

Next we update the `scoreText` UI element we created previously. The player's score is converted to a string using JavaScript's [`toString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString) method, which is part of every object in JavaScript. It is also modified with [`padStart`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart), which makes sure the resulting score string is exactly `6` digits long, using 0s to put in front of the string (`start`) if the number is smaller than 6 digits long. This makes nice placeholders for the score, and gives a cue to the users as to the maximum score they could reach. Finally, we play a little sound to indicate that points have been earned. As before, we vary the pitch each time using [`detune`](https://kaboomjs.com/doc#play) to keep the sound fresh.

To increment the score when the alien bugs get hit by a bullet, update the `onCollide` event we added earlier for a bullet and alien bug as follows:

```javascript
onCollide("alien", "bullet", (alien, bullet) => {
  makeExplosion(alien.pos, 5, 5, 5);
  destroy(alien);
  destroy(bullet);
  play("explosion", {
    volume: 0.2,
    detune: rand(0, 1200),
  });
  updateScore(10); // new line
});
```

The next UI element to add is the ship's shield health. This would be great as a kind of health-bar-style display, that starts out green and turns red when the shield is low. The game should end when the shield is fully depleted, as the spaceship is then totally destroyed.

```javascript
add([
  text("SHIELD: ", { size: 8, font: "sink" }),
  pos(300, 10),
  origin("center"),
  layer("ui"),
]);

const shieldHolder = add([
  rect(52, 12),
  pos(350, 10),
  color(100, 100, 100),
  origin("center"),
  layer("ui"),
]);

const shieldHolderInside = add([
  rect(50, 10),
  pos(350, 10),
  color(0, 0, 0),
  origin("center"),
  layer("ui"),
]);

const shieldBar = add([
  rect(50, 10),
  pos(325, 5),
  color(0, 255, 0),
  layer("ui"),
]);
```

First, we add a text label so that players know what the bar represents. To create the shield bar UI, we use 3 elements :

- A border, or `shieldHolder`, to outline the bar.
- A black inner block to make the holder look like a thin line, `shieldHolderInside`.
- The `shieldBar` itself, which will get shorter as the shield is damaged.

Now we need a function to call when we want to update the shield's health:

```javascript
function updatePlayerShield(shieldPoints) {
  player.shield += shieldPoints;
  player.shield = Math.max(player.shield, 0);
  player.shield = Math.min(player.shield, 100);

  shieldBar.width = 50 * (player.shield / 100);

  if (player.shield < 20) shieldBar.color = rgb(255, 0, 0);
  else if (player.shield < 50) shieldBar.color = rgb(255, 127, 0);
  else shieldBar.color = rgb(0, 255, 0);

  if (player.shield <= 0) {
    destroy(player);
    for (let i = 0; i < 500; i++) {
      wait(0.01 * i, () => {
        makeExplosion(vec2(rand(0, MAP_WIDTH), rand(0, MAP_HEIGHT)), 5, 10, 10);
        play("explosion", {
          detune: rand(-1200, 1200),
        });
      });
    }
    wait(2, () => {
      go("endGame");
    });
  }
}
```

This function has an argument for the number of `shieldPoints` to update the shield by and adjusts the custom `shield` property on the UI layer. It also clamps the minimum and maximum amount the shield can be to between 0 and 100.

The function sets the width of the `shieldBar` (its dimension along the x axis) to the percentage of the shield available (`player.shield / 100`), multiplied by the full width of the bar, `50`.

Then the function updates the color of the bar depending on the health of the shield:

- Less than 20% health, shield bar is red;
- Less than 50% but more than 20% health, shield bar is orange;
- The shield bar is set to green for all other health values, in other words, when health is over 50%.

The final step in the shield health function is to check if the shield health is depleted, and end the game if it is.

When the game ends, we destroy the spaceship to remove it from the scene. Now we have another opportunity to create some more explosions using the `makeExplosion` function we added earlier. This time we can go really big! To make a big impact, we create a `for` loop to set off 500 explosions all over the screen for seriously dramatic effect. We use the Kaboom [`wait`](https://kaboomjs.com/doc#wait) function to have a small delay between each explosion so that they don't all go off at once. Then we make each explosion happen at random positions on the map, passing in other parameters to the `makeExplosion` function to set the blast radius, number of sub-explosions and general size. We also play the `explosion` sound effect using Kaboom's [`play`](https://kaboomjs.com/doc#play) function. This time we don't adjust the volume down, as we want the sound to be as dramatic as possible. We detune it randomly again to create a true cacophony and sense of mayhem.

After setting off all those sound effects and visual fireworks, we [`wait`](https://kaboomjs.com/doc#wait) for 2 seconds for everything to settle down, and then use the Kaboom function [`go`](https://kaboomjs.com/doc#go) to switch to a new scene, `endGame`, and wait for the player to play again. Add the code below to create the `endGame` scene, at the bottom of `main.js` below the line `go("main")`:

```javascript
scene("endGame", () => {
  const MAP_WIDTH = 440;
  const MAP_HEIGHT = 275;

  add([
    text("GAME OVER ", { size: 40, font: "sink" }),
    pos(MAP_WIDTH / 2, MAP_HEIGHT / 3),
    origin("center"),
    layer("ui"),
  ]);

  onKeyRelease("enter", () => {
    go("main");
  });
});
```

This scene [`adds`](https://kaboomjs.com/doc#add) a large "GAME OVER" text over the screen until the player presses and releases the `enter` key. Then the [`onKeyRelease`](https://kaboomjs.com#onKeyRelease) event returns the player to the main scene, and uses [`go`](https://kaboomjs.com/doc#go) to switch scenes and restart the game. Because this is a new scene, in a new scope, we need to add the `MAP_WIDTH` and `MAP_HEIGHT` constants again.

## Allowing the Alien Bugs to Attack

Now that we have mechanisms for updating points and shield health, we can add the code dealing with alien bugs hitting the spaceship to the main scene:

```javascript
const ALIEN_SHIELD_DAMAGE = -15;

onCollide("alien", "player", (alien, player) => {
  shake(20);
  makeExplosion(alien.pos, 8, 8, 8);
  destroy(alien);
  play("explosion", {
    detune: -1200,
    volume: 0.5,
  });
  updatePlayerShield(ALIEN_SHIELD_DAMAGE);
});
```

This is a big event - it's the way the ship shield gets damaged and it can be fatal - so we want to add a bit more dramatic effect. Kaboom can create a cool screen-shaking effect, as if the player has been hit, which we can invoke by calling [`shake`](https://kaboomjs.com/doc#shake) with a number representing how dramatic the shake should be. Then we add some visual effect with the `makeExplosion` function. We also destroy the alien and [`play`](https://kaboomjs.com/doc#play) the `explosion` effect again, this time a bit louder as the alien exploding has directly affected the player. We also detune the effect to the lowest pitch we can, to make it "feel" more direct, particularly if the player has a sub-woofer.

Then we call the `updatePlayerShield` function we defined previously, with a constant that defines by how much a shield is damaged per hit. You can move the constant to the top of the main scene file to keep it neat if you want.

## Raining Gems

It's time to add the element that gives the game its purpose: gems the player can collect to earn points. Add this function to the main scene to create a gem:

```javascript
function spawnGem() {
  let xpos = rand(BLOCK_SIZE, MAP_WIDTH - BLOCK_SIZE);
  add([sprite("gem"), pos(xpos, BLOCK_SIZE), area(), body(), "gem"]);
}

onUpdate("gem", (gem) => {
  if (gem.pos.y > MAP_HEIGHT) {
    destroy(gem);
    spawnGem();
  }
});

spawnGem();
```

On this weird planet in outer space, the gems rain from the sky, which is the top of the map for our purposes. We calculate a random position, `xpos`, along the `x` axis for the gem to appear on by calling the Kaboom [`rand`](https://kaboomjs.com/doc#rand) function. We don't want the gems to fall right at the edge of the screen, as they will be cut off and the spaceship won't be able to get to them because of the `boundary` elements we added all around the screen. So we limit the random `xpos` to one `BLOCK_SIZE` from each edge.

Now we [`add`](https://kaboomjs.com/doc#add) the gem sprite to the scene. The `pos` component is set to the `xpos` we calculated, with the `y` component set to one `BLOCK_SIZE` from the top of the screen. This is to avoid the gem getting stuck on our upper `boundary`. We also give the gem the [`body`](https://kaboomjs.com/doc#body) component, which makes it subject to Kaboom gravity so that it falls down towards the ground. We give it the label `gem` so that we can refer to it later.

Then we add the [`onUpdate`](https://kaboomjs.com/doc#onUpdate) event handler for the gem - we need to do this for all objects with a `body` component so that interactions with [`solid`](https://kaboomjs.com/doc#solid) objects are taken care of. Sometimes, if the frame rate gets too low (if there's a lot of action, or the computer's slow), some `body` and `solid` interaction maybe missed, and the [`object falls through the solid`](https://github.com/replit/kaboom/issues/86). This could cause gems to fall through the ground, out of reach of the player's spaceship. To account for this possibility, we check if the gem's `y` position is beyond the bounds of the map, and destroy it and spawn a new gem if it is.

Finally, we call `spawnGem()` to start the gem raining process.

## Collecting Gems

Now that gems are raining down, we can add a handler to pick up when the player's spaceship moves over a gem. This is how the spaceship "collects" gems, and will earn the player points. Add the following [`onCollide`](https://kaboomjs.com/doc#onCollide) event handler:

```javascript
const POINTS_PER_GEM = 100;

player.onCollide("gem", (gem) => {
  destroy(gem);
  updateScore(POINTS_PER_GEM);
  wait(1, spawnGem);
});
```

This fires whenever the spaceship and a gem collides. We [`destroy`](https://kaboomjs.com/doc#destroy) the gem to remove it from the scene, and call the `updateScore` function we added earlier to update the player's points by the amount declared in the `POINTS_PER_GEM` constant. Then we [`wait`](https://kaboomjs.com/doc#wait) one second before another gem is spawned for the player to collect.

Run the code now and start collecting gems.

![Collecting gems](https://docimg.replit.com/images/tutorials/24-space-shooter-kaboom/collecting-gems.gif)

## Adding Background Music

Having sound effects is cool, but games generally need a soundtrack to tie all the sounds together. Kaboom allows us to play a sound file on loop as constant background music. Add this code to the bottom of `main.js` file to play the track:

```javascript
const music = play("music");
music.loop();
```

The music is a track called "Battle of Pogs" by "Komiku" from ["Free music archive"](https://freemusicarchive.org/music/Komiku/Captain_Glouglous_Incredible_Week_Soundtrack/pog), a good resource for music that you can legally use in your games.

## Playing the Game

Congratulations, you've finished making this Kaboom game! Try running and playing the game to see what score you can get. You can also experiment with adjusting the parameters to see how they change the gameplay.

## Credits

The game art and sounds used in this tutorial are from the following sources:

- Music : https://freemusicarchive.org/music/Komiku/Captain_Glouglous_Incredible_Week_Soundtrack/pog
- Laser : https://freesound.org/people/sunnyflower/sounds/361471/
- Explosion: https://freesound.org/people/tommccann/sounds/235968/
- Point Beep : https://freesound.org/people/LittleRobotSoundFactory/sounds/270303/
- Gem: https://opengameart.org/content/planetcute-gem-bluepng
- Space Background: https://opengameart.org/content/space-background-8
- Alien Bug: https://opengameart.org/content/8-bit-alien-assets

The spaceship was made by Ritza.

Thank you to all the creators for putting their assets up with a Creative Commons license and allowing us to use them.

## Things to Try Next

Here are a few things you can try to add to the game and polish it up:

- Self healing on the shield. Perhaps add back 1 or 2 shield points every 10 seconds, so that players can go further if they dodge the aliens.
- A better ending screen, with the player's score.
- An intro scene, explaining the game and the controls.
- Different types of alien bugs. Perhaps a large "boss" bug that can also shoot back.

You can find the code for this tutorial in the repl below:

<iframe height="400px" width="100%" src="https://replit.com/@ritza/Space-Shooter-new?embed=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
