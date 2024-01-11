---
title: Asteroids game with Kaboom.js
---

# Building Asteroids in Kaboom.js

Following our [previous tutorial on building Snake](/tutorials/kaboom/build-snake-with-kaboom), and cover the following topics:

- Getting set up in Kaboom.js.
- Calculating movement angles for our spaceship and bullet mechanics.
- Random generation of asteroid placement.
- Defining the effects of object collisions.
- Developing a polished game with animation and sound effects.

Our finished game will look like this:

![Complete game](https://docimg.replit.com/images/tutorials/23-asteroids-kaboom/asteroids-game.gif)

We will use these [Asteroids sprites](https://opengameart.org/content/asteroids-game-sprites-atlas) and this [space background](https://opengameart.org/content/space-background) from OpenGameArt.org, and the following sounds from FreeSound.org:

- [Laser](https://freesound.org/people/Daleonfire/sounds/376694/)
- [Explosion](https://freesound.org/people/deleted_user_5405837/sounds/399303/)
- [Rocket thrust](https://freesound.org/people/MATRIXXX_/sounds/515122/)

We will also be using [music by Eric Matyas of Soundimage.org](https://soundimage.org/sci-fi/).

We've created a single ZIP file with the sprites and sounds you will need for this tutorial, which you can download [here](https://tutorial-files.util.repl.co/asteroids-kaboom/asteroids-resources.zip).

## Creating a new project and loading assets

Log into your [Replit](https://replit.com) account and create a new repl. Choose **Kaboom** as your project type. Give this repl a name, like "asteroids".

![Creating an REPL](https://docimg.replit.com/images/tutorials/23-asteroids-kaboom/create-repl.png)

Kaboom repls are quite different from other kinds of repls you may have seen before: instead of dealing directly with files in folders, you'll be dealing with scenes, sounds and sprites.

Before we start coding, we need to upload our sprites and sounds. Download [this ZIP file](https://tutorial-files.util.repl.co/asteroids-kaboom/asteroids-resources.zip) and extract it on your computer. Click the "Files" icon on the sidebar then, upload everything in Sounds folder to the "sounds" section of your repl, and everything in the Sprites folder to the "sprites" section of your repl.

![](https://docimg.replit.com/images/tutorials/23-asteroids-kaboom/upload-sprites.gif)

Once you've uploaded the files, you can click on the "Kaboom" icon in the sidebar, and return to the "main" code file.

## Setting up Kaboom

To start, we need to initialise and set up Kaboom with the scale we want for the game window. Replace the code in `main.js` with the code below:

```javascript
import kaboom from "kaboom";

kaboom({
  scale: 1.5,
});
```

This will give us a blank canvas with a nice checkerboard pattern.

Now, let's load up the sprites and sound files to make them available in the game. This code loads each of the graphic elements we'll use, and gives them a name so we can refer to them when we build the game objects:

```javascript
loadRoot("sprites/");
loadSprite("space", "space.jpg");
loadSprite("rocket1", "rocket1.png");
loadSprite("rocket2", "rocket2.png");
loadSprite("rocket3", "rocket3.png");
loadSprite("rocket4", "rocket4.png");
loadSprite("ship", "ship.png");
loadSprite("bullet", "bullet.png");
loadSprite("asteroid", "asteroid.png");
loadSprite("asteroid_small1", "asteroid_small1.png");
loadSprite("asteroid_small2", "asteroid_small2.png");
loadSprite("asteroid_small3", "asteroid_small3.png");
loadSprite("asteroid_small4", "asteroid_small4.png");

loadRoot("sounds/");
loadSound("rocket_thrust", "rocket_thrust.wav");
loadSound("laser", "laser.wav");
loadSound("explosion", "explosion.mp3");
loadSound("Steamtech-Mayhem_Looping", "Steamtech-Mayhem_Looping.mp3");
```

The first line, [`loadRoot`](https://kaboomjs.com/#loadRoot), specifies which folder to load all the sprites and game elements from, so we don't have to keep typing it in for each sprite. Then each line loads a game sprite and gives it a name so that we can refer to it in code later. We also use similar code to load sound elements for our game using the [`loadSound`](https://kaboomjs.com/#loadSound) function.

## Setting the scene

A Kaboom.js game is made up of scenes, which you can think of as different screens, levels or stages. You can use scenes for game levels, menus, cut-scenes and any other screens your game might contain. In this tutorial, we'll just use one scene, which will contain the entire game logic.

Scenes are further divided into layers, which are populated by game objects (also called sprites). The layer an object is on will determine when it gets drawn and which other objects it can collide with. In this game, we'll use three layers: the background layer (`bg`), the object layer (`obj`), and UI layer (`ui`). To initialize these layers, add the code below to the bottom of the `main.js` file:

```javascript
scene("main", () => {
  layers(["bg", "obj", "ui"], "obj");

  // add more scene code here
});

go("main");
```

On the first line we define the `main` scene, and then we declare the game layers.
These layers will be drawn in the order declared. The majority of gameplay will happen in the `obj` layer, so we've set that as the default layer. Any objects we create will be placed in this layer, unless we specify a different layer when we create the object.

**Note:** The code snippets in the sections that follow should be added within the body of the main scene unless specified otherwise.

The `bg` layer will be drawn first, beneath everything else, and we'll use that to specify a background image for our game. Do that now by adding the following code to within the body of the main scene.

```javascript
// Background
add([sprite("space"), layer("bg")]);
```

Here we're adding a very simple game object: the space sprite we uploaded earlier on the background layer. Later game objects, such as the player's ship and the asteroids, will be more complicated.

The final layer, `ui`, is where we will display information such as the player's remaining lives and total score. Let's draw the score now. First, we have to declare a global variable named `score`, with the following line:

```javascript
let score = 0;
```

Now we'll create an empty object on the UI layer, as follows:

```javascript
// UI
ui = add([layer("ui")]);
```

Although Kaboom allows us to [create objects that display text](https://kaboomjs.com/doc#text), this text is set once at object creation and has to be updated manually, which doesn't really make sense for a real-time UI. Instead of doing that, we'll use our `ui` object's [draw event](https://kaboomjs.com/doc#on) [callback](<https://en.wikipedia.org/wiki/Callback_(computer_programming)>) to draw text containing the current score. Add the following code:

```javascript
ui.on("draw", () => {
  drawText({
    text: "Score: " + score,
    size: 14,
    font: "sink",
    pos: vec2(8, 24),
  });
});
```

Callbacks are a key concept in JavaScript and Kaboom makes heavy use of them. Some callbacks, such as the one above, are called on every frame of the game (around 60 times a second). Others are called when specific events happen, such as user keypresses. Because this callback will be invoked so often, our score will always be up to date.

Run your repl now and marvel at the vast emptiness of space.

![Empty with score](https://docimg.replit.com/images/tutorials/23-asteroids-kaboom/empty-with-score.png)

## The player's ship

Now let's populate that empty space. Enter the following code below the UI drawing code to create the player:

```javascript
// The ship
const player = add([
  sprite("ship"),
  pos(160, 120),
  rotate(0),
  origin("center"),
  solid(),
  area(),
  "player",
  "mobile",
  "wraps",
  {
    turn_speed: 4.58,
    speed: 0,
    max_thrust: 48,
    acceleration: 2,
    deceleration: 4,
    lives: 3,
    can_shoot: true,
    laser_cooldown: 0.5,
    invulnerable: false,
    invulnerablity_time: 3,
    animation_frame: 0,
    thrusting: false,
  },
]);
```

Here we're creating a game object with a number of [components](https://kaboomjs.com/doc#add), each of which give our object some data or behavior. These are:

- The [`sprite`](https://kaboomjs.com/#sprite) component, which draws the `ship` sprite.
- The [`pos`](https://kaboomjs.com/#pos) (position) component, which places the player near the center of the screen in the Replit browser.
- The [`rotate`](https://kaboomjs.com/#rotate) component, which will allow the player to turn the ship with the left and right arrow keys.
- The [`origin`](https://kaboomjs.com/#origin) component, which sets the sprite's _origin_ to "center", so that when we rotate the ship, it will rotate around the middle of its sprite rather than the default top-left corner.
- The [`area`](https://kaboomjs.com/#area) component, which generates the collision area for the ship to detect collisions.

Following that initial configuration, we're giving the player object three tags: `player`, `mobile` and `wraps`. Kaboom uses a tagging system to apply behavior to objects -- you can think of this as similar to [multiple inheritance](https://en.wikipedia.org/wiki/Multiple_inheritance). By tagging objects with shared behavior, we can save ourselves from duplicating code.

Finally, we assign a number of custom properties to our player object. We'll use these properties to handle a variety of gameplay functions, such as moving and shooting.

If you run your repl now, you should see the ship sprite in the middle of a blank screen. In the next section, we'll implement movement controls.

![Ship in space](https://docimg.replit.com/images/tutorials/23-asteroids-kaboom/ship-in-space.png)

### Movement controls

In this game, our player will turn the nose of the spaceship with the left and right arrow keys, and thrust forward and backward with the up and down arrow keys. We'll handle movement in two phases: user input, and actually moving the ship. First, let's allow the player to turn their ship to the left and right. Add the following code:

```javascript
// Movement keys
onKeyDown("left", () => {
  player.angle -= player.turn_speed;
});
onKeyDown("right", () => {
  player.angle += player.turn_speed;
});
```

Run your repl now, and you should be able to turn the ship to the left and right by pressing the respective arrow keys. If you think it turns too fast or too slow, change the value of `turn_speed` in the player creation code.

Now let's implement the up and down keys, so the player can move around the scene. Enter the following code beneath the player turning code:

```javascript
onKeyDown("up", () => {
  player.speed = Math.min(
    player.speed + player.acceleration,
    player.max_thrust
  );
  play("rocket_thrust", {
    volume: 0.1,
    speed: 2.0,
  });
});
```

Rather than having the spaceship go from zero to max speed immediately, we want to simulate a gradual acceleration to our max speed. To achieve this, we use [Math.min()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/min) to set the player's speed to the minimum value between current speed plus acceleration and its maximum speed. This will make the ship gradually increase in speed until it reaches `max_thrust`. Play around with the values of `acceleration` and `max_thrust` in the player creation code and see what feels right to you.

Additionally, we set our rocket thrust sound to [play](https://kaboomjs.com/doc#play) while accelerating. Kaboom allows us to manipulate sounds in a few different ways, such as changing their speed and volume.

We'll handle deceleration by doing the opposite to acceleration, using [Math.max()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max) to choose the maximum between the player's speed minus their deceleration, and their maximum speed in reverse (i.e. negative). Add the following code below the acceleration controls:

```javascript
onKeyDown("down", () => {
  player.speed = Math.max(
    player.speed - player.deceleration,
    -player.max_thrust
  );
  play("rocket_thrust", {
    volume: 0.2,
    speed: 2.0,
  });
});
```

If you run your repl now and try to accelerate or decelerate, the sound will play, but the ship will go nowhere. This is because we're manipulating `player.speed`, which is a custom property that Kaboom hasn't attached any special behavior to (unlike `player.angle`). Let's add some movement parameters now.

### Movement

Movement in Kaboom and most other 2D game development systems is handled using X and Y coordinates on a plane. To move an object left, you subtract from its X coordinate, and to move it right, you add to its X coordinate. To move an object up, you subtract from its Y coordinate, and to move it down, you add to its Y coordinate. Therefore, basic four-directional movement in games like Snake or Pacman is quite straightforward. The directional movement we need for Asteroids (commonly called [tank controls](https://en.wikipedia.org/wiki/Tank_controls)) is more complex, requiring some calculations.

At a high level, we want to move a given distance (`player.speed`) in a given direction (`player.angle`). As a first step, let's create an `onUpdate` callback for our `mobile` tag. This code, like our UI drawing code above, will be run by every object with the "mobile" tag on every frame of the game, so we can use it for more than just the player object. Add the following code at the bottom of your main scene:

```javascript
// Movement
onUpdate("mobile", (e) => {
  e.move(pointAt(e.speed, e.angle));
});
```

First, we move our object, using the function `pointAt()`, which takes a speed and an angle and returns the corresponding X and Y co-ordinates as a [`vec2`](https://kaboomjs.com/doc#vec2) object, Kaboom's 2D vector type. This data type is provided by Kaboom specifically for working with X and Y coordinates, and comes with a number of useful functions, such as addition and subtraction.

Now we need to create the `pointAt()` function. Before we jump into the code, let's think about the problem. Our movement can be drawn as an angled line on a plane, and its X and Y coordinates as horizontal and vertical lines connected to it, giving us a right-angled triangle.

![Triangle](https://docimg.replit.com/images/tutorials/23-asteroids-kaboom/triangle.png)

We know the values of the triangle's angles: one is 90 degrees, and the other two are equal to `player.angle`. The length of the triangle's hypotenuse (the red line in the diagram above) is `player.speed`: this is the _distance_ our ship will be traveling.

We now need to calculate the lengths of the other two sides to get the X and Y values for our movement vector. We can do this using [the trigonometric sine and cosine functions](https://www2.clarku.edu/faculty/djoyce/trig/formulas.html), like so:

```
sine(angle) = y / distance
y = distance * sin(angle)

cosine(angle) = x / distance
x = distance * cos(angle)
```

Remember, in Kaboom and most other 2D game development platforms, the Y axis is inverted, so we have to make it negative. Add the `pointAt()` function below, at the top of the main scene code.

```javascript
function pointAt(distance, angle) {
  let radians = -1 * deg2rad(angle);
  return vec2(distance * Math.cos(radians), -distance * Math.sin(radians));
}
```

Run your repl now and take the ship for a spin. You should be able to thrust forward and backward, moving according to where the ship's nose is pointing.

There's one little problem though: thrust too long, and you'll fly off the screen. In any other game, we might solve that by enclosing the play area with walls, but that doesn't seem quite right in the infinite expanse of space. The original _Asteroids_ solved this by having the player and other key objects wrap around the screen, i.e. appear at the bottom after going over the top, or at the left edge after going past the right edge. Let's implement that now, using the "wraps" tag we assigned to our player object when we created it. Add the following code to the bottom of your main scene:

```javascript
// Wrap around the screen
onUpdate("wraps", (e) => {
  if (e.pos.x > width()) {
    e.pos.x = 0;
  }
  if (e.pos.x < 0) {
    e.pos.x = width();
  }
  if (e.pos.y > height()) {
    e.pos.y = 0;
  }
  if (e.pos.y < 0) {
    e.pos.y = height();
  }
});
```

This is a fairly straightforward piece of code that checks whether an object's position is outside of the room and, if so, places it on the other side. The [`width()`](https://kaboomjs.com/doc#width) and [`height()`](https://kaboomjs.com/doc#height) functions are Kaboom built-ins that return the size of the game canvas. Run your repl now and try it out.

### Rocket animation

Our ship can move now, but it would be nice to see its rockets firing when the player presses the up arrow key, as well as hear them. Reactive animations like these make games feel more responsive and look more dynamic.

Kaboom has methods for handling animations when a game object uses an animated sprite (i.e. one with multiple images), but this isn't quite what we want here. Rather than animating the player's ship, we need to animate the rocket thrust that appears behind it when a thrusting key is pressed, so we'll need to handle all the animation code ourselves. Luckily, Kaboom makes this fairly simple.

First, let's create an array with our four rocket sprites. Add the following code at the bottom of your main scene:

```javascript
// Animate rocket
const thrust_animation = ["rocket1", "rocket2", "rocket3", "rocket4"];
```

Then we need some way to indicate when to start and stop the animation. We can use Kaboom's [`onKeyPress`](https://kaboomjs.com/doc#onKeyPress) and [`onKeyRelease`](https://kaboomjs.com/doc#onKeyRelease) events for this, as well as two of the properties we defined for our player (`thrusting` and `animation_frame`). Add the following code:

```javascript
// rocket animation helpers
onKeyPress("up", () => {
  player.thrusting = true;
  player.animation_frame = 0;
});
onKeyRelease("up", () => {
  player.thrusting = false;
});
```

Now let's draw the animation. We'll use a draw event callback, which lets us make the player draw other things in addition to its own sprite. Add the following code:

```javascript
// draw current rocket animation frame
onDraw("player", (p) => {
  if (player.thrusting) {
    // draw current frame
    drawSprite({
      sprite: thrust_animation[p.animation_frame],
      pos: p.pos.add(pointAt(-p.height / 2, p.angle)),
      origin: "center",
      angle: p.angle,
    });
  }
});

/*
NOTE: starting from kaboom v2000.2 the coordinate system in onDraw("player") will be relative to the current "player" object, it's an unintended breaking change but will be the default behavior starting on the next major release. If you're on v2000.2, change the drawSprite code to

drawSprite( {
    sprite: thrust_animation[p.animation_frame],
    // use a fixed position because it's going to be relative to the current player's coordinate system
    pos: vec2(-p.width / 2, 0),
    origin: "center",
});
*/
```

Here we're using our `pointAt` function again, but this time we're looking for the rocket end of the ship, rather than its nose. We use our `thrust_animation` array in conjunction with the player's `animation_frame` value to figure out which rocket image to draw.

To actually make the rocket animate (i.e. cycle through animation frames), we'll use Kaboom's [`onUpdate`](https://kaboomjs.com#onUpdate) function, and create a callback that changes the animation frame every 0.1 seconds. Add the following code:

```javascript
let move_delay = 0.1;
let timer = 0;
// loop rocket animation
onUpdate(() => {
  timer += dt();
  if (timer < move_delay) return;
  timer = 0;

  if (player.thrusting) {
    player.animation_frame++;
    if (player.animation_frame >= thrust_animation.length) {
      // wrap to start
      player.animation_frame = 0;
    }
  }
});
```

That's it! Run your repl and move your ship around.

![Ship thrusting](https://docimg.replit.com/images/tutorials/23-asteroids-kaboom/ship-thrusting.png)

### Shooting

To make our ship fire laser bullets, we need to create bullet objects just in front of the ship's nose, and have them travel in the same direction the ship is pointing. Here we can reuse our new `pointAt()` function. Add the following code beneath the existing movement control code:

```javascript
// Shooting
onKeyDown("space", () => {
  add([
    sprite("bullet"),
    pos(player.pos.add(pointAt(player.width / 2, player.angle))),
    rotate(player.angle),
    origin("center"),
    area(),
    "bullet",
    "mobile",
    "destructs",
    {
      speed: 100,
    },
  ]);
  play("laser");
});
```

Here we're creating a bullet object at the tip of the ship's nose. We calculate the position of the tip by running our `pointAt()` function with a distance of half the ship sprite's width, and the sprite's angle. We use half the sprite's width because the ship sprite's origin is at its center. Additionally, we rotate the bullet according to the ship's angle (again using center as the origin) and assign a number of tags to it. Note that because we're tagging it with "mobile" and giving it both a `rotate` component and a speed property, it will use the same movement code we wrote for our player object.

Try the game out now, and hold down the spacebar to shoot. Do you notice anything about your ship's firing rate?

![Too many bullets](https://docimg.replit.com/images/tutorials/23-asteroids-kaboom/too-many-bullets.png)

At the moment, a bullet object will be created in every frame while space is down. That's a lot of bullets, and might make the game too easy, as well as slowing it to a crawl on less capable devices. We need to add a cooldown period, and we can do so by altering our shooting code to look like this:

```javascript
// Shooting
onKeyDown("space", () => {
  if (player.can_shoot) {
    // new if statement
    add([
      sprite("bullet"),
      pos(player.pos.add(pointAt(player.width / 2, player.angle))),
      rotate(player.angle),
      origin("center"),
      area(),
      "bullet",
      "mobile",
      "destructs",
      {
        speed: 100,
      },
    ]);
    play("laser");
    player.can_shoot = false; //
    wait(player.laser_cooldown, () => {
      player.can_shoot = true;
    });
  }
});
```

Here, we use two of the properties we defined in the player object above, `can_shoot` and `laser_cooldown`, to implement a cooldown mechanism. We will only create a bullet if `can_shoot` is true, and we set it to false immediately after each shot. Then we use Kaboom's [`wait`](https://kaboomjs.com/doc#wait) timer to set it to true after `laser_cooldown` number of seconds. Because this timer is an [asynchronous callback](<https://en.wikipedia.org/wiki/Callback_(computer_programming)>), the rest of the game can continue while the laser cooldown period passes.

Run your repl and test whether the ship's laser fires at the expected intervals.

![Laser rate](https://docimg.replit.com/images/tutorials/23-asteroids-kaboom/laser.png)

## The asteroids

Now that we've added shooting, we need to add something to shoot at. It's time to create the asteroids this game gets its name from.

### Creation

Add the following code at the bottom of the main scene:

```javascript
// Asteroids
const NUM_ASTERIODS = 5;

for (let i = 0; i < NUM_ASTERIODS; i++) {
  var spawnPoint = asteroidSpawnPoint();
  var a = add([
    sprite("asteroid"),
    pos(spawnPoint),
    rotate(rand(1, 90)),
    origin("center"),
    area(),
    solid(),
    "asteroid",
    "mobile",
    "wraps",
    {
      speed: rand(5, 10),
      initializing: true,
    },
  ]);

  a.pushOutAll();
}
```

Here we're creating a constant number of asteroids, and assigning them a random position, direction of movement and speed. The asteroid creation code is largely similar to our player creation code, but with fewer custom properties. One key difference is the presence of the [`solid`](https://kaboomjs.com/doc#solid) component, which marks the asteroid as a solid object that other objects shouldn't be able to pass through.

The one custom property that's unique to asteroids is `initializing`. Because we're spawning each asteroid in a random position, there's a chance we might spawn one on top of another, or on top of the player.

One approach to avoiding this might be to ensure we don't spawn any two asteroids at the same coordinates, but we might still end up spawning them close enough to overlap with each other. We would then need to take into account the size of asteroids and prevent asteroids from spawning at any of those coordinates, and our code would quickly become complicated.

Instead of doing that, we can leverage Kaboom's collision detection to achieve the same effect. Right after we create the asteroid, we can check if it's overlapping with another "mobile"-tagged object (i.e. another asteroid, or the player's ship), and if so, we randomise its position again. We can use a while loop to repeat this action until our asteroid lands up in a free space. Add the following code inside the asteroid creation for-loop, below the `add` function:

```javascript
while (a.isColliding("mobile")) {
  spawnPoint = asteroidSpawnPoint();
  a.pos = spawnPoint;
  a.pushOutAll();
}

a.initializing = false;
```

We want the asteroid to be in an "initializing" state while we're finding its starting position. When we implement its actions later on, we'll check the value of its `initializing` property to prevent it from harming the player or affecting other asteroids while it's still spawning.

Before we move on, let's implement the `asteroidSpawnPoint()` function. Add the following code near the top of the main scene, just beneath the `pointAt()` function:

```javascript
function asteroidSpawnPoint() {
  // spawn randomly at the edge of the scene
  return choose([
    rand(vec2(0), vec2(width(), 0)),
    rand(vec2(0), vec2(0, height())),
    rand(vec2(0, height()), vec2(width(), height())),
    rand(vec2(width(), 0), vec2(width(), height())),
  ]);
}
```

This function uses Kaboom's [`choose()`](https://kaboomjs.com/doc#choose) and [`rand()`](https://kaboomjs.com/doc#rand) functions to choose a random location on the edge of the scene to spawn an asteroid.

### Collisions

If you've seen any movies set in outer space, you'll know that the main thing asteroids do is crash into spaceships and each other, even though the [real-life asteroid belt](https://en.wikipedia.org/wiki/Asteroid_belt) in our solar system is not nearly dense enough for asteroid collisions to be a frequent occurrence.

There are three types of collisions we need to account for:

- Player and asteroid, which damages the player, causing them to lose a life.
- Bullet and asteroid, which destroys the asteroid.
- Asteroid and asteroid, which causes both asteroids to bounce off each other.

Let's go through the code for each of these, adding it to our main scene just below the code we wrote to make objects wrap around the screen. First, player and asteroid:

```javascript
// Collisions
onCollide("player", "asteroid", (p, a) => {
  if (!a.initializing) {
    p.lives--;
  }
});
```

This code reduces the player's lives by one as long as the asteroid is not initializing.

Next, add the code for collisions between a bullet and an asteroid:

```javascript
onCollide("bullet", "asteroid", (b, a) => {
  if (!a.initializing) {
    destroy(b);
    destroy(a);
    play("explosion");
    score++;
  }
});
```

This very simple code destroys both the bullet and the asteroid, plays an explosion sound, and increments the game score.

Finally, add the following to handle asteroid collisions.

```javascript
onCollide("asteroid", "asteroid", (a1, a2) => {
  if (!(a1.initializing || a2.initializing)) {
    a1.speed = -a1.speed;
    a2.speed = -a2.speed;
  }
});
```

This code makes the asteroids appear to bounce off each other by reversing their movement direction.

Run the game now and see what happens when you ram your ship into some asteroids!

![Asteroids](https://docimg.replit.com/images/tutorials/23-asteroids-kaboom/asteroids.png)

## Ending the game

The player's ship can now lose lives by crashing into asteroids, but this doesn't mean much at the moment, as we haven't added any code to end the game if the player runs out of lives, or even to display the lives remaining. Let's do that now. First, let's change the code in the player–asteroid collision to [trigger](https://kaboomjs.com/doc#obj.trigger) a custom "damage" event instead of just subtracting a life.

```javascript
// Collisions
onCollide("player", "asteroid", (p, a) => {
  if (!a.initializing) {
    p.trigger("damage"); // previously lives--
  }
});
```

Now we can add the code to handle this event just below the collision code:

```javascript
// Take damage
player.on("damage", () => {
  player.lives--;

  // destroy ship if lives finished
  if (player.lives <= 0) {
    destroy(player);
  }
});
```

When objects are destroyed in Kaboom, the "destroy" event is triggered. We'll use this event to show a game over screen with the player's score by adding the following code:

```javascript
// End game on player destruction
player.on("destroy", () => {
  add([
    text(`GAME OVER\n\nScore: ${score}\n\n[R]estart?`, { size: 20 }),
    pos(width() / 2, height() / 2),
    layer("ui"),
  ]);
});
```

We need to give the player a way to restart the game and try again. Add the following code just below the previous block:

```javascript
// Restart game
onKeyPress("r", () => {
  go("main");
});
```

The `go` function is a Kaboom built-in for moving between scenes. As this game only has one scene, we can use it to reset the scene and thus the game to its initial state.

Lastly, we need to add the player's lives to the game UI, so they know how much more damage they can afford to take. Find the `ui` object code near the top of the main scene and alter it to resemble the below:

```javascript
ui.on("draw", () => {
  drawText({
    text: "Score: " + score,
    size: 14,
    font: "sink",
    pos: vec2(8, 24),
  });

  // lives (new code below)
  drawText({
    text: "Lives: ",
    size: 12,
    font: "sink",
    pos: vec2(8),
  });
  for (let x = 64; x < 64 + 16 * player.lives; x += 16) {
    drawSprite({
      sprite: "ship",
      pos: vec2(x, 12),
      angle: -90,
      origin: "center",
      scale: 0.5,
    });
  }
});
```

This code draws a number of scaled down player spaceships equal to the number of remaining lives.

![Lives](https://docimg.replit.com/images/tutorials/23-asteroids-kaboom/lives.png)

## Final touches

Our game is fully playable now, but it's still missing some niceties, and one core gameplay feature that you should be able to identify if you've played _Asteroids_ before. In this final section, we'll add the following:

- Some background music.
- Smaller, faster asteroids that our large asteroids break into when destroyed.
- Temporary invulnerability for the player for a few seconds after they take damage.

### Background music

Add the following code somewhere in your main scene.

```javascript
// Background music
const music = play("Steamtech-Mayhem_Looping");
music.loop();
```

The first line [plays](https://kaboomjs.com/doc#play) the piece [Steamtech Mayhem from Soundimage.org](https://soundimage.org/sci-fi/) and the second line will ensure that it repeats as long as the game is running.

### Smaller asteroids

To create smaller asteroids when a large asteroid is destroyed, we'll use a destroy event callback, which will run every time an asteroid is destroyed. Add the following code to the bottom of your main scene:

```javascript
// Asteroid destruction
on("destroy", "asteroid", (a) => {
  if (!a.is("small")) {
    // create four smaller asteroids at each corner of the large one
    positions = [
      a.pos.add(vec2(a.width / 4, -a.height / 4)),
      a.pos.add(vec2(-a.width / 4, -a.height / 4)),
      a.pos.add(vec2(-a.width / 4, a.height / 4)),
      a.pos.add(vec2(a.width / 4, a.height / 4)),
    ];

    // small asteroids move out from the center of the explosion
    rotations = [16, 34, 65, 87];

    for (let i = 0; i < positions.length; i++) {
      var s = add([
        sprite(`asteroid_small${i + 1}`),
        pos(positions[i]),
        rotate(rotations[i]),
        origin("center"),
        area(),
        solid(),
        "asteroid",
        "small",
        "mobile",
        "wraps",
        {
          speed: rand(15, 25),
          initializing: false,
        },
      ]);

      s.pushOutAll();
    }
  }
});
```

Our small asteroids are mostly similar to our large ones. Differences include the addition of the `small` tag, the less random approach to initial placement, the higher speed, and the selection of one of four different possible small asteroid sprites.

To make our game true to the original _Asteroids_, we should give the player more points for destroying these fast, small asteroids. Find and modify the bullet–asteroid collision code as below:

```javascript
onCollide("bullet", "asteroid", (b, a) => {
  if (!a.initializing) {
    destroy(b);
    destroy(a);
    play("explosion");
    score = a.is("small") ? score + 2 : score++; // 2 points for small, 1 for big
  }
});
```

![Small asteroids](https://docimg.replit.com/images/tutorials/23-asteroids-kaboom/small-asteroids.png)

### Temporary invulnerability

A nice touch to make our game a little more forgiving is temporary invulnerability for the player after they lose a life. We can add this by finding and altering the player's damage event callback as follows:

```javascript
// Take damage
player.on("damage", () => {
  if (!player.invulnerable) {
    // new if statement
    player.lives--;
  }

  // destroy ship if lives finished
  if (player.lives <= 0) {
    destroy(player);
  } // new code
  else {
    // Temporary invulnerability
    player.invulnerable = true;

    wait(player.invulnerablity_time, () => {
      player.invulnerable = false;
      player.hidden = false;
    });
  }
});
```

Here we're making the player invulnerable and then using a `wait` callback to make them vulnerable again after a given number of seconds, similar to what we did for the laser timeout. We're also making sure the player is visible by setting [`player.hidden`](https://kaboomjs.com/doc#add) to false, because the way we're going to indicate the player's invulnerability is by having their ship flash rapidly. Find and update the `onUpdate` event callback we added earlier for rocket thrust animation :

```javascript
onUpdate(() => {
  timer += dt();
  if (timer < move_delay) return;
  timer = 0;

  if (player.thrusting) {
    player.animation_frame++;
    if (player.animation_frame >= thrust_animation.length) {
      // wrap to start
      player.animation_frame = 0;
    }
  }

  // new if statement
  if (player.invulnerable) {
    player.hidden = !player.hidden;
  }
});
```

## Where to next?

We've covered a lot of ground in this tutorial and touched on a lot of Kaboom's features. From here, you can start making your own games with Kaboom, or if you want to extend this one, here are some ideas:

- Power-ups, such as extra lives and time-limited weapon upgrades.
- Enemy spaceships that fire at the player.
- A third, even smaller size of asteroid.
- More animations, for explosions and laser firing.

You can find the game repl below:

<iframe height="400px" width="100%" src="https://replit.com/@ritza/Asteroids-new?embed=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
