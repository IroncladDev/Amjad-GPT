---
title: 3D game with Kaboom.js
---

# Building a pseudo-3D game in Kaboom.js

Three-dimensional games became popular in the late 80's and early 90's with games like the early Flight Simulator and Wolfenstein 3D. But these early games were really [2.5D, or pseudo-3D](https://en.wikipedia.org/wiki/2.5D): the action takes place in 2 dimensions, and the world only appears to be 3D.

[Kaboom.js](https://kaboomjs.com) is a 2D game engine, but we can use some of those early game designers' techniques to create a pseudo-3D game. This game is roughly based on our [2D space shooter game tutorial](/tutorials/build-space-shooter-with-kaboom), but we'll use a view from the cockpit of the spaceship instead of the side-scrolling view.

![Game functionality](https://docimg.replit.com/images/tutorials/3d-game-kaboom/gameplay.gif)

You can download this [zip file](https://tutorial-files.util.repl.co/3d-game-kaboom/3d-game-resources.zip) with all the sprites and sounds you'll need for this tutorial.

## Game design

Here's what we want from this game:

- A sense of depth to give the illusion of 3D
- The feeling of freedom of movement throughout space

We'll make use of Kaboom's [scale component](https://kaboomjs.com/doc#scale) to achieve the sense of depth, representing our sprites as smaller if they are meant to be further away, and larger when they are closer. We'll create a feeling of moving through space using an algorithm to generate a star field, like the early Windows screensavers.

## Creating a new project

Head over to [Replit](https://replit.com) and create a new repl. Choose **Kaboom** as your project type. Give this repl a name, like "3D Space Shooter".

![New repl](https://docimg.replit.com/images/tutorials/25-3d-game-kaboom/new-repl.png)

After the repl has booted up, you should see a `main.js` file under the "Code" section. This is where we'll start coding.

## Setting up the Kaboom environment

The Kaboom interface on Replit is specialised for game-making. Besides the Space Invader icon, you'll notice a few special folders in the file try, like "Code", '"Sprites", and "Sounds". These special folders take care of loading up assets, and all the necessary code to start scenes and direct the game. You can read up more about the Kaboom interface [here](/tutorials/kaboom/kaboom-editor).

If you haven't already, download this [zip file](https://tutorial-files.util.repl.co/3d-game-kaboom/3d-game-resources.zip) containing all the sprites and sounds for the game. Extract the file on your computer, then add the sprites to the "Sprites" folder, and the sounds to the "Sounds" folder.

![Uploading sprites](https://docimg.replit.com/images/tutorials/25-3d-game-kaboom/upload-sprites.gif)

To set up the game play environment, we need to set up Kaboom with the screen size and colors we want for the game window. Replace the code in `main.js` with the code below:

```javascript
import kaboom from "kaboom";

kaboom({
  background: [0, 0, 0],
  width: 320,
  height: 200,
  scale: 2,
});
```

Here we import the kaboom library, and then initialize the context by calling `kaboom({ ... })`. We set the size of the view to 320x200 pixels and `scale` to make the background twice the size on screen.
Now, let's load up the sprites and sounds we will need in this game. The code below loads each of the graphic elements we'll use, and gives them a name, so we can refer to them when we build the game characters:

```javascript
loadRoot("sprites/");
loadSprite("cockpit", "cockpit.png");
loadSprite("alien", "alien.png");

loadRoot("sounds/");
loadSound("shoot", "shoot.wav");
loadSound("explosion", "explosion.wav");
```

The first line, [`loadRoot`](https://kaboomjs.com/#loadRoot), specifies which folder to load all the sprites and game elements from, so we don't have to keep typing it in for each sprite. Then each line loads a game sprite and gives it a name so that we can refer to it in code later. We use similar code to load the sounds we will need in this game, but instead of [`loadSprite`](https://kaboomjs.com/#loadSprite) we use [`loadSound`](https://kaboomjs.com/#loadSound) to load sounds.

## Creating the interface layers

Kaboom games are made up of "Scenes", which are like levels, or different parts and stages of a game. The IDE has a default "main" scene already, which we can use for our main game code. Each scene has multiple "Layers", allowing us to have backgrounds that don't affect the game, main game objects (like the player, bullets, enemies, and so on), and UI elements (like the current score and health).

Add the following code to the `main.js` file to create the 3 layers "Background (`bg`)", "Object (`obj`)", "User Interface (`ui`)":

```javascript
layers(["bg", "obj", "ui"], "obj");
```

The `obj` layer is set as the default layer and that's where the game action will take place. We'll use the `bg` layer to draw the star field, as we don't interact with the objects on that layer. Then we'll use the `ui` layer to draw fixed foreground objects, like the cockpit of the spaceship the player is travelling in.

## Creating alien bugs

As in the [2D version of this game](/tutorials/kaboom/build-space-shooter-with-kaboom), the point of our game is to avoid and shoot down exploding alien bugs. This time, instead of the bugs coming from the left and right of the screen, we'll make it appear as though they are coming toward the player from "inside" the screen.

To create this effect, we'll start by making the alien bugs small and spread out over the screen, and have them get bigger and loom toward the center of the screen as they get closer.

We need a 3D coordinate system to work out how our elements should move. We'll create a system like the one in the image below, with 0 for all three dimension axes in the center. This is how we'll track the movements of the aliens in code. When we draw them to the screen, we'll convert these coordinates into the 2D screen coordinate system.

![3D co-ordinate system](https://docimg.replit.com/images/tutorials/25-3d-game-kaboom/3d-system.png)

Let's add the following code to the `main` scene file to achieve this:

```js
const SCREEN_WIDTH = 320;
const SCREEN_HEIGHT = 200;
const ALIEN_SPEED = 200;

let aliens = [];

function spawnAlien() {
  const x = rand(0, SCREEN_WIDTH);
  const y = rand(0, SCREEN_HEIGHT);

  var newAlien = add([
    sprite("alien"),
    pos(x, y),
    scale(0.2),
    area(),
    rotate(0),
    {
      xpos: rand((-1 * SCREEN_WIDTH) / 2, SCREEN_WIDTH / 2),
      ypos: rand((-1 * SCREEN_HEIGHT) / 2, SCREEN_HEIGHT / 2),
      zpos: 1000,
      speed: ALIEN_SPEED + rand(-0.5 * ALIEN_SPEED, 0.5 * ALIEN_SPEED),
    },
    "alien",
  ]);

  aliens.push(newAlien);
}

loop(0.8, spawnAlien);
```

First, we define some general constants for the size of the screen and the speed at which aliens will move. This way, we don't have to keep remembering and typing numbers, and it's easier to change these aspects later if we need to. We also create an array to hold each alien object we create so that we can keep track of all of them. This will be especially important when we add movement to the aliens.

The function `spawnAlien` creates a new alien at a random location on the screen. The first lines calculate a random x and y position to place the alien on the screen initially. This isn't logically needed, as we'll calculate the alien's actual position later from our 3D coordinate system and calculate the projected screen position on each frame. But we need to pass a position [`pos`](https://kaboomjs.com/doc#pos) component to the [`add`](https://kaboomjs.com/doc#add) method when we create a new object, so any random position will do.

There are two more components we include when constructing the alien object:

- [`scale`](https://kaboomjs.com/doc#scale), allowing us to adjust the size of the alien over time as if it's getting closer, and
- [`rotate`](https://kaboomjs.com/doc#rotate), allowing us to rotate the aliens so we can simulate 'rolling' when changing the spaceship's direction.

We also add the coordinates of the alien's position in the 3D system to the alien object as custom properties. We start with a fixed `zpos`, or position on the Z axis, far from the screen.

Then we set the alien's speed, varied by a random amount of up to half the base speed faster or slower so that there's some variety in the way aliens approach the ship. We'll use these custom values when we calculate the alien's position on each frame.

Finally, we add the new alien to the `aliens` array we created earlier to keep track of it.

Outside the function, we make use of the Kaboom [`loop`](https://kaboomjs.com/doc#loop) functionality to call the `spawnAlien` function to create new aliens at regular intervals.

## Moving the alien bugs

Now we need to have the aliens we've generated move with each frame. Here's the code:

```js
onUpdate("alien", (alien) => {
  alien.zpos -= alien.speed * dt();

  alien.scale = 2 - alien.zpos * 0.002;

  const centerX = SCREEN_WIDTH * 0.5;
  const centerY = SCREEN_HEIGHT * 0.25;

  alien.pos.x = centerX + alien.xpos * (alien.zpos * 0.001);
  alien.pos.y = centerY + alien.ypos * (alien.zpos * 0.001);

  if (alien.zpos <= 1) {
    destroyAlien(alien);
  }
});

function destroyAlien(alien) {
  aliens = aliens.filter((a) => a != alien);
  destroy(alien);
}
```

First we add a new event handler onto the [`onUpdate`](https://kaboomjs.com/doc#onUpdate) event, and filter for any objects tagged `alien`. The `onUpdate` event handler is fired for each frame. In this event handler function, we adjust the `zpos` of the alien to make it 'move' a little closer to the screen. We use the [`dt()`](https://kaboomjs.com/doc#dt) function to get the time from the last frame, together with the speed per second we assigned to the alien when we constructed it, to calculate the alien's new `zpos` in our 3D coordinate system. We then translate that value to screen coordinates, and mimic the z-axis position by adjusting the size, or `scale`, of the alien sprite.

Remember that screen coordinates start with (0,0) in the top left corner of the screen, and our 3D coordinate system starts with (0,0,0) in the 'center' of the system. To translate between the 2 systems, we need to find the center of the screen so that we can center the 3D system over it. We do this by by halving the screen `WIDTH` and `HEIGHT` by 2. The screen is the red rectangle in the image below, showing how the 3D system will be centered on it.

![overlay 3d system over 2d system](https://docimg.replit.com/images/tutorials/25-3d-game-kaboom/overlay.png)

Now we can add the alien's `x` and `y` positions in 3D coordinate space relative to the center point of the screen. We bias the center point "up" a bit, as this will seem to be the center of the spaceship's view when we add the cockpit later. We also modify each of these `x` and `y` positions by a factor relating to the alien's `z` position: As the alien approaches, its `zpos` value decreases, and our factor uses this value to draw the alien nearer to the center of the screen. This enhances the depth illusion and makes it feel to the player that the aliens are coming at them.

Finally, we see if the alien is very close by seeing if the `zpos < 1`. If it is, we destroy the alien to remove it from the scene, as it's either gone past our spaceship or crashed into it. We create a small helper function, `destroyAlien`, to manage this, so that we also remove the alien from the tracking array.

If you run the code now, you should see the aliens start to move toward you.

![aliens coming at you](https://docimg.replit.com/images/tutorials/25-3d-game-kaboom/alieans-coming.gif)

## Adding a star field

Now that we have the aliens moving and coming at us, let's add another element to give a further sense of depth and show that we are in outer space: the star field generator. We can implement the star field in a similar way as we did for the aliens' movement. One difference will be that we will use color, or more specifically _intensity_, instead of scaling to proxy for the `z-axis`. Another difference is that we'll have the stars spread away from the center rather than towards it, as if the ship is going past them. This also makes it seem like we're travelling at warp speed, which is cool.

```js
const STAR_COUNT = 1000;
const STAR_SPEED = 5;
var stars = [];

function spawnStars() {
  for (let i = 0; i < STAR_COUNT; i++) {
    const newStar = {
      xpos: rand(-0.5 * SCREEN_WIDTH, 0.5 * SCREEN_WIDTH),
      ypos: rand(-0.5 * SCREEN_HEIGHT, 0.5 * SCREEN_HEIGHT),
      zpos: rand(1000),
    };
    stars.push(newStar);
  }
}

spawnStars();

onUpdate(() => {
  const centerX = SCREEN_WIDTH * 0.5;
  const centerY = SCREEN_HEIGHT * 0.5;

  stars.forEach((star) => {
    star.zpos -= STAR_SPEED;
    if (star.zpos <= 1) {
      star.zpos = 1000;
    }
    const x = centerX + star.xpos / (star.zpos * 0.001);
    const y = centerY + star.ypos / (star.zpos * 0.001);

    if (x >= 0 && x <= SCREEN_WIDTH && y >= 0 && y <= SCREEN_HEIGHT) {
      const scaled_z = star.zpos * 0.0005;
      const intensity = (1 - scaled_z) * 255;

      drawRect({
        width: 1,
        height: 1,
        pos: vec2(x, y),
        color: rgb(intensity, intensity, intensity),
      });
    }
  });
});
```

While this is very similar to the code we added above for the alien bugs, you'll notice the `spawnStars` function has a few differences to the `spawnAlien` function, such as:

- We create all the stars at once. This is because we need a significant star field to start with, not just a few stars every second.
- We don't create a Kaboom object for each star. This is because we don't need the collision handling and other overhead that comes with a Kaboom object, especially since we are generating a lot of stars (`const STAR_COUNT = 1000; `). Instead, we store the stars' info in custom [object literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#object_literals), and add each of these to the `stars` array.
- We set the initial `z-pos` of the stars to a random value from 0 to 1000, using the Kaboom [`rand`](https://kaboomjs.com/doc#rand) function. We do this because we create all the stars at once, so we seed the stars at random positions on the z-axis to give the feeling of depth to the star field. If the stars were all initialised to the same `z-pos`, they would move in unison, and it would look like a mass of pixels were coming at us - a bit weird!

Now take a look at the [`onUpdate`](https://kaboomjs.com/doc#onUpdate) event handler for our stars. It differs from the event handler for our alien bugs in a few ways:

- We don't use an object filter to look for the stars, as we didn't create them as Kaboom objects. Instead, we just cycle through each star in the `stars` array.
- Instead of destroying the star and removing it from the array when it reaches the 'front' of the screen, we recycle it by resetting its `z-pos` back to 1000.
- We also check if the star is out of the screen view. If it is, we don't draw it, to save a bit of overhead.
- Instead of using the `z-pos` to calculate a value by which to scale the star, we use it to calculate the star's intensity, or brightness. Kaboom uses color values in the range 0-255. So we first scale the `z-pos` down to below 1. Then we subtract it from 1 to create an inverse relationship between `z-pos` and intensity. We then multiply the intensity value by 255 to scale it to a value that is within the range 0-255. In other words, stars further away from us have higher `zpos` values, giving us lower color intensity. This makes stars far away glow dimly, while those closer to our view look brighter.
- Finally, we use the Kaboom's [drawRect](https://kaboomjs.com/doc#drawRect) method to directly draw the star to the screen. As there is no pixel level drawing function in Kaboom, we create a rectangle of size 1 to draw just one pixel.

## Adding the spaceship cockpit

Now that we have a star field to fly through, let's add the player's spaceship. Our game uses the spaceship pilot's point of view. Add the following code to add a view from the spaceship cockpit.

```js
const cockpit = add([
  sprite("cockpit"),
  layer("ui"),
  rotate(0),
  pos(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2),
  origin("center"),
  scale(0.275),
]);
```

This adds the `cockpit` sprite (image) to the `ui` layer. We also add the [`rotate`](https://kaboomjs.com/doc#rotate) component to it, so that we can add some rotation effects when the spaceship is flying. We use the [`origin`](https://kaboomjs.com/doc#origin) component to center the image in the middle of the screen, which also provides the axis to rotate the sprite around when banking (turning) the spaceship. Then we use a scaling factor to [`scale`](https://kaboomjs.com/doc#scale) the image down to the size of the screen. We scale the image as it's much larger (1334×834) than the size of the game screen (320x200). We could resize the image in an image editing programme, but we would lose some detail and sharpness. Note that the factor of the scale means that the image is still a little larger than the screen size. This gives us a bit of overlap available for when we rotate the image when banking the spaceship.

Run the game now and you should see the view from inside the spaceship.

![spaceship view](https://docimg.replit.com/images/tutorials/25-3d-game-kaboom/spaceship-view.gif)

## Creating the spaceship's movement controls

Our basic game world is up and running, now let's add some controls so we can move around in it. We'll allow a few different moves for the spaceship: bank left or right, and fly up or down.

Consider for a moment how the spaceship moves through the game world. We can't move the cockpit left or right, up or down - it would just disappear off the screen. One way of simulating movement from the point of view of the cockpit is to keep it stationary and move all the other game elements.

To achieve this, let's add some helper functions to move the game objects. Here's the code:

```js
function shiftAliens(x, y) {
  aliens.forEach((alien) => {
    alien.xpos += x / (alien.zpos * 0.01);
    alien.ypos += y / (alien.zpos * 0.01);
  });
}

function shiftStars(x, y) {
  stars.forEach((star) => {
    star.xpos += x * 0.01;
    star.ypos += y * 0.01;
  });
}
```

These 2 functions take `x` and `y` values for the amount we want to "move" by, and uses these to move the aliens and the stars. In each case, we loop through the arrays holding the alien or star game objects. We make some adjustments to the values supplied to the functions to account for the perception that, when we move, objects further away appear to move "less" than objects close to us. In the case of the stars, we assume they are all in the far distance, so we scale down the amounts to move by a constant factor. In the case of the aliens, some are far away, while others are right up against the spaceship. To account for this variance, we adjust the amount to move an alien by a factor related to its distance from us, or `zpos`. Aliens close by will appear to move more than those far away.

Now we can add some event handlers for keyboard input:

```js
const MOVE_DELTA = 2000;

onKeyDown("left", () => {
  const delta = MOVE_DELTA * dt();
  shiftAliens(delta, 0);
  shiftStars(delta * 0.01, 0);
  camRot(5.7);
});

onKeyDown("right", () => {
  const delta = -1 * MOVE_DELTA * dt();
  shiftAliens(delta, 0);
  shiftStars(delta * 0.01, 0);
  camRot(-5.7);
});

onKeyDown("up", () => {
  const delta = MOVE_DELTA * dt();
  shiftAliens(0, delta);
  shiftStars(0, delta * 0.01);
});

onKeyDown("down", () => {
  const delta = -1 * MOVE_DELTA * dt();
  shiftAliens(0, delta);
  shiftStars(0, delta * 0.01);
});

onKeyRelease("left", () => {
  camRot(0);
});

onKeyRelease("right", () => {
  camRot(0);
});
```

Because we're moving the aliens and stars to make it appear as if the spaceship is moving, these elements must move in the opposite direction to that of the arrow key being used. When we use the left key to move the spaceship, our scene moves to the right. We use the Kaboom events [`onKeyDown`](https://kaboomjs.com/doc#onKeyDown) and [`onKeyRelease`](https://kaboomjs.com/doc#onKeyRelease) to attach event handlers for direction controls to the arrow keys on the keyboard. In each of the `onKeyDown` event handlers, we get the time elapsed from the last frame by calling the [`dt()`](https://kaboomjs.com/doc#dt) function, and multiply it by a constant `MOVE_DELTA`, representing the amount to move by each second. For the `right` and `up` keys, our elements move left and down respectively, so we make the amount to move negative - recall that we are moving the objects in our 3D coordinate system. Then we call the 2 helper functions we defined above with the amount to move the objects in the `x` and `y` dimensions.

In the event handlers for `left` and `right` keys, we also make use of the Kaboom [`camRot`](https://kaboomjs.com/doc#camRot) effect. This effect rotates all objects by the amount we specify, giving the perception of the spaceship banking hard while turning. We add in two additional event handlers on [`onKeyRelease`](https://kaboomjs.com/doc#onKeyRelease) for the `left` and `right` keys to reset the rotation when the player stops turning.

Give the game a run, and you should be able to control the spaceship.

![flying controls](https://docimg.replit.com/images/tutorials/25-3d-game-kaboom/fly-controls.gif)

## Adding weapons

Now we're flying through the alien bug field, but if an alien makes contact with our spaceship, it will explode and damage us. We need some weapons to shoot the aliens with and protect ourselves. For this, we need to implement some lasers. First, let's add cross hairs to aim with:

```js
const vertical_crosshair = add([
  rect(1, 10),
  origin("center"),
  pos(SCREEN_WIDTH * 0.5, SCREEN_HEIGHT * 0.33),
  color(0, 255, 255),
  layer("ui"),
]);

const horizontal_crosshair = add([
  rect(10, 1),
  origin("center"),
  pos(SCREEN_WIDTH * 0.5, SCREEN_HEIGHT * 0.33),
  color(0, 255, 255),
  layer("ui"),
]);
```

This adds 2 lines at a point halfway across the screen, and about 1/3 down the screen, which is roughly the center of the view out of the spaceship window. Since Kaboom doesn't have a line component, we use [`rect`](https://kaboomjs.com/doc#rect) to draw rectangles with a width of 1 pixel, effectively a line. We add the cross hairs to the UI layer, so they are always on top of the aliens and stars.

Now we have a point to aim at, let's add the lasers. Our player will shoot using the spacebar, and we want a classic laser effect: 2 lasers, one shooting from each side of the ship towards the same point to give the effect of shooting into the distance, towards a vanishing point.

```js
const BULLET_SPEED = 10;
function spawnBullet() {
  const BULLET_ORIGIN_LEFT = vec2(
    SCREEN_WIDTH * 0.25,
    SCREEN_HEIGHT - SCREEN_HEIGHT * 0.33
  );
  const BULLET_ORIGIN_RIGHT = vec2(
    SCREEN_WIDTH - SCREEN_WIDTH * 0.25,
    SCREEN_HEIGHT - SCREEN_HEIGHT * 0.33
  );

  const BULLET_VANISHING_POINT = vec2(SCREEN_WIDTH * 0.5, SCREEN_HEIGHT * 0.33);

  add([
    rect(1, 1),
    pos(BULLET_ORIGIN_LEFT),
    area(),
    color(255, 0, 0),
    "bullet",
    {
      bulletSpeed: BULLET_SPEED,
      targetPos: BULLET_VANISHING_POINT,
    },
  ]);

  add([
    rect(1, 1),
    pos(BULLET_ORIGIN_RIGHT),
    color(255, 0, 0),
    "bullet",
    {
      bulletSpeed: -1 * BULLET_SPEED,
      targetPos: BULLET_VANISHING_POINT,
    },
  ]);

  play("shoot", {
    volume: 0.2,
    detune: rand(-1200, 1200),
  });
}
```

When the player fires, we call the `spawnBullet` function to create a new set of laser bullets. First, we calculate the position the bullets will be coming from. To make it seem as though they're coming from under the spaceship either side, we calculate our bullets' starting positions a quarter way from each side of the screen and about a third of the way from the bottom using the multipliers `0.25` and `0.33` respectively.

Then we calculate where we want the bullets to end up. This is the same position as the cross hairs.

Using these values, we create 2 bullet objects - simple 1 pixel objects with the tag `bullet` and color set to red `(255,0,0)` so they look menacing. We also add custom properties to the object: A speed for the bullet to move at, and the vanishing point where its course ends.

As a final detail, we set our "shoot" sound to play as each bullet is created, adjusting the volume and applying a randomly generated detune value so that the pitch of the sound is slightly different each time it's played.

We've got our bullets, their sounds and their trajectories, so let's make them go from their origin point to the vanishing point at the cross hairs by moving them with each frame:

```js
onUpdate("bullet", (b) => {
  const m = (b.pos.y - b.targetPos.y) / (b.pos.x - b.targetPos.x);
  const c = b.targetPos.y - m * b.targetPos.x;

  let newX = b.pos.x + b.bulletSpeed;
  let newY = m * newX + c;
  b.pos.x = newX;
  b.pos.y = newY;
  // Remove the bullet once it has hit the vanishing point y line
  if (b.pos.y < SCREEN_HEIGHT * 0.33) {
    destroy(b);
  }
});

onKeyDown("space", () => {
  spawnBullet();
});
```

Here we use the [`onUpdate`](https://kaboomjs.com/doc#onUpdate) event handler, filtered to `bullet` objects.

To calculate the bullet's next position on its trajectory for each frame, we need to find the values for the slope (`m`) and y-intercept (in this case, `c`) of the straight line between the bullet's current position and its end position. Our first 2 lines of the function express those variable parameters as formulas. Let's take a moment to see how we came to those formulas.

We began with the [equation for a straight line](https://www.mathsisfun.com/equation_of_line.html):

```js
y = m * x + c;
```

Since we have the `x` and `y` coordinates for the start and end of the trajectory, we can use them to find the values of the unknowns `m` and `c` by solving simultaneous equations:

```
y_start = m*x_start + c         (1)
y_target = m*x_target + c       (2)

re-arranging (2):
c = y_target - m*x_target

Substitute (2) into (1) for c:
y_start = m*x_start + (y_target - m*x_target)
y_start - y_target  = m*x_start - m*x_target
                    = m*(x_start - x_target)
so m = (y_start - y_target) / (x_start - x_target)

Now we can solve for c:
c = y_target - m*x_target

```

Now that we can express `m` and `c` as formulas, we use them in our code to calculate the parameters.

Our code goes on to advance the bullet's current `x` position by the bullet speed amount, and we can figure out the corresponding new `y` position using the `m` and `c` values calculated above with our new `x` position. We then update the bullet's new position (`pos`) with these new values.

We want the bullets to disappear once they hit the target at the vanishing point, so we go on to check if the bullet has crossed the horizontal cross hairs. If it has, we remove the bullet from the scene using the [`destroy`](https://kaboomjs.com/doc#destroy) function.

Finally, we have an event handler for the `space` key, which calls the `spawnBullet` function whenever it is pressed.

Try this out now, and you should be able to shoot some laser bullets into space.

![Shooting](https://docimg.replit.com/images/tutorials/25-3d-game-kaboom/shooting.gif)

## Checking for collisions with bullets

Now that we can shoot bullets, we need to check if they hit an alien bug. If they did, we explode the alien.

```js
const BULLET_SLACK = 10;
onCollide("alien", "bullet", (alien, bullet) => {
  if (bullet.pos.y > SCREEN_HEIGHT * 0.33 + BULLET_SLACK) return;
  makeExplosion(bullet.pos, 5, 5, 5);
  destroy(alien);
  destroy(bullet);
});
```

We make use of the Kaboom event [`onCollide`](https://kaboomjs.com/doc#onCollide) which is fired when 2 game objects are overlapping or touching each other. We pass in the tags for the aliens and bullets, so we know when they collide.

We want to limit bullet hits to only be around the target area, so that the 3D perspective is kept. But because they could collide at any point along the path the bullet takes, we check if the collision has taken place at around the cross hairs area. Then, if is in the target zone, we remove both the bullet and the alien from the scene, and call a function to create an explosion effect. This is the same code used in the [2D Space Shooter tutorial](/tutorials/kaboom/build-space-shooter-with-kaboom).

```js
function makeExplosion(p, n, rad, size) {
  for (let i = 0; i < n; i++) {
    wait(rand(n * 0.1), () => {
      for (let i = 0; i < 2; i++) {
        add([
          pos(p.add(rand(vec2(-rad), vec2(rad)))),
          rect(1, 1),
          scale(1 * size, 1 * size),
          lifespan(0.1),
          grow(rand(48, 72) * size),
          origin("center"),
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

We won't explain this code here, but if you'd like to know how it works, visit the [2D Space Shooter tutorial](/tutorials/kaboom/build-space-shooter-with-kaboom) to learn more.

Run this now, and you should be able to shoot the alien bugs down.

![Shooting explosions](https://docimg.replit.com/images/tutorials/25-3d-game-kaboom/shooting-explosion.gif)

## Checking if alien bugs hit the spaceship

Now we can add functionality to check if an alien bug makes it past our laser and explodes into the spaceship. Since the cockpit covers the entire screen, we can't make use of the [`onCollide`](https://kaboomjs.com/doc#onCollide) function to check if an alien has hit the cockpit, as it would always be colliding. Instead, we can check the `z` value of the alien, plus if it is within an area of the spacecraft that would cause damage. We'll use a "strike zone" in the center of the cockpit view as the area that aliens can do damage to the craft. Outside that area, we'll assume that the aliens go around or up and over the spacecraft.

To implement this scheme, add a definition for the strike zone:

```js
const STRIKE_ZONE = { x1: 80, x2: 240, y1: 20, y2: 100 };
```

Then we can modify the `onUpdate("alien",....)` event handler that we added earlier in **"Moving the Alien Bugs"** section. In the part of the function where we check if the alien is close to us (`if (alien.zpos <= 1 )`), update the code as follows:

```js
if (alien.zpos < 1) {
  //check if the alien has hit the craft
  if (
    alien.pos.x >= STRIKE_ZONE.x1 &&
    alien.pos.x <= STRIKE_ZONE.x2 &&
    alien.pos.y >= STRIKE_ZONE.y1 &&
    alien.pos.y <= STRIKE_ZONE.y2
  ) {
    shake(20);
    makeExplosion(alien.pos, 10, 10, 10);
  }
  destroyAlien(alien);
}
```

We've modified the code to check if the alien is really close to us (`alien.zpos < 1 `), and if it is, we check if it is within the bounds of the `STRIKE_ZONE` area. The strike zone is a rectangle - you could implement more complex shapes if you wanted to be more accurate about where the alien can hit. However, a rectangle approximation is OK for this game.

If the alien is close enough, and within our strike zone, we use the [`shake`](https://kaboomjs.com#shake) effect to make it "feel" like we've been hit. Then we create an explosion at the point of impact for some visual effects.

![Colliding](https://docimg.replit.com/images/tutorials/25-3d-game-kaboom/colliding.gif)

## Finishing up the game

Congratulations, we've got all the main elements of flying and shooting and damage in the game. The next thing to do would be to add a scoring system, and a way to reduce the spaceship's health or shield when it gets hit. You can look at the [tutorial for the 2D version of this game](/tutorials/kaboom/build-space-shooter-with-kaboom), and copy the scoring and health code from there into this game. You can also copy the code for background music and more sound effects.

Happy coding and have fun!

## Credits

The game art and sounds used in this tutorial are from the following sources:

Laser : https://freesound.org/people/sunnyflower/sounds/361471/

Explosion: https://freesound.org/people/tommccann/sounds/235968/

Alien Bug: https://opengameart.org/content/8-bit-alien-assets

The spaceship cockpit was made by Ritza.

Thank you to all the creators for putting their assets up with a Creative Commons license and allowing us to use them.

<iframe height="400px" width="100%" src="https://replit.com/@ritza/3d-space-shooter-new?embed=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
