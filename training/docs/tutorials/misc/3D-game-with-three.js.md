---
title: 3D obstacle avoiding game with three.js
---

# Building a 3D obstacle avoiding game with three.js

[Three.js](https://threejs.org/) is a general-purpose 3D library for browsers. You can use it to create 3D objects, animations, and games. Take a look at the three.js [examples page](https://threejs.org/examples) in the documentation to see what kind of things you can make.

In this tutorial, you will learn the basics of three.js and its game creation capabilities by making a simple obstacle avoiding 3D game. In the game, you will control a box that moves through a 3D course. The goal of the game is to avoid the obstacles and get to the end of the course.

![Game play](https://replit-docs-images.bardia.repl.co/images/tutorials/47-3dgamethreejs/gameplay.gif)

We will create the game in Replit, which is an online integrated development environment (IDE). This means that you can do this tutorial in the browser, and it will be easy to share your game online.

## Creating a new project in Replit

Head over to [Replit](https://replit.com/) and create a new repl. Choose **HTML, CSS, JS** as your project type. Give this repl a name, like "3D obstacle avoiding game".

![creating a new Replit project](https://replit-docs-images.bardia.repl.co/images/tutorials/47-3dgamethreejs/new_repl.png)

## Importing three.js to the project

Open the `script.js` file in your repl. We'll import three.js by referencing it from a content distribution network (CDN) to get us up and running quickly. Add the following line to the `script.js` file to import three.js from the Skypack CDN:

```javascript
import * as THREE from "https://cdn.skypack.dev/three@0.140.2";
```

The [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) keyword is used to import a [JavaScript `module`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules). It will not work as is – we need to indicate that this script file is a module. To make this work, change the default `script` tag in the `index.html` file to the following:

```html
<script type="module" src="script.js"></script>
```

The `type=module` attribute allows us to use module features in our script.

Now we are ready to use three.js in our project.

## Creating a scene with the player box

To display 3D objects on the screen, we need three things: a scene, a camera, and a renderer. Then we will place 3D objects in the scene. Most objects also require lighting to be added to see them.

Let's start by creating a scene and adding a camera. Add the following lines to the `script.js` file:

```javascript
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.1,
  200
);
```

This creates a scene. The scene determines what will be rendered and where it will be rendered. We will add objects, a camera, and lights to our scene.

We are using a perspective camera, which is the most commonly used camera type for 3D scenes. Perspective cameras use [perspective projection](<https://en.wikipedia.org/wiki/Perspective_(graphical)>), which mimics the way human eyes see. The further away objects are from the camera, the smaller they appear.

The four parameters of the `PerspectiveCamera` constructor function define the camera's viewing frustum, which is the field of view of our camera in the 3D world. The parameters are:

1. **fov** - Field of view, the camera frustum vertical field of view, in degrees.
2. **aspect** - Camera frustum aspect ratio.
3. **near** - Camera frustum near plane, in world units.
4. **far** - Camera frustum far plane, in world units.

![creating a new Replit project](https://replit-docs-images.bardia.repl.co/images/tutorials/47-3dgamethreejs/perspective-camera-frustum.png)

The above image shows the camera's viewing frustum. The viewable objects are between the near and far plane. There are two objects in the frustum, a purple stick and an orange stick. The sticks are the same size. The dotted lines show how the sticks are projected onto the near plane, which shows how they will be seen. Their size on the near plane is different. The orange stick, which is further away from the camera, appears smaller. The units used are world units, it can be mapped to any defined unit but it is usually in meters.

Next, we will position our camera in the 3D world and make it look at a specific point. The parameters are the x, y, and z points in the 3D world. Add the following lines of code to the `script.js` file:

```javascript
camera.position.set(4, 4, -4);
camera.lookAt(0, 0, 2);
```

Let's add a renderer so that we can display the scene. We will attach it to a DOM element on our web page. Add the following lines of code:

```javascript
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);
document.body.appendChild(renderer.domElement);
```

This creates a new renderer that will display our scene using [WebGL](https://developer.mozilla.org/en-US/docs/Glossary/WebGL). WebGL (Web Graphics Library) is used for rendering complex graphics, such as 3D scenes, on the web. It does this by accessing the graphics card on the user's device. The `antialias` property is used to determine if anti-aliasing will be used, which is a method that smooths jagged edges on objects. This makes our 3D world look better. The size of the renderer is set to the browser width and height using the `setSize` method so that our scene will take up the entire browser window. We then call the renderer's `render` method to tell the renderer to draw the scene using our created scene and camera. We then add the renderer DOM element, which is a `<canvas>` element, to the HTML document. The renderer uses the `<canvas>` element to display the scene.

Now let's create our first 3D object, the player box. This will be the box that we move around in the game. In three.js, we need three things to create an object:

1. Geometry - An object contains the x, y, z points that make up a shape.

2. Material - The surface of the geometry. Gives the geometry color and texture.

3. Mesh - Geometry + material. This is what we will add to our scene.

Add the following lines above the `renderer` declaration:

```javascript
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xe56956 });
const mesh = new THREE.Mesh(geometry, material);
```

The `0x` in front of the color property value means that it is a hexadecimal value. Most materials require a light source to bounce off of them so that they can be seen. The `MeshBasicMaterial` does not.

Now let's add the mesh to the scene:

```javascript
scene.add(mesh);
```

Run the code now by pushing the "Run" button at the top of the Replit window. You should see your first scene, an orange cube:

![creating a new Replit project](https://replit-docs-images.bardia.repl.co/images/tutorials/47-3dgamethreejs/player_box.png)

The `MeshBasicMaterial` does not look 3D. It would be better to have a material that light can interact with so that we can get some depth to our player box. Replace your material with the following material:

```javascript
const material = new THREE.MeshLambertMaterial({ color: 0xe56956 });
```

The `MeshLambertMaterial` is a relatively simple material that can reflect light. Your player box will not be visible now, we need to add a light source. We will add an ambient light and a directional light.

Add the following lines to the `script.js` file, above the `renderer`:

```javascript
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(10, 20, 0);
scene.add(ambientLight, directionalLight);
```

We add a white directional light that is set along the x-, y-, and z-axes so that it shines on the top and side of the box. The ambient light allows us to see the box better from all angles. The first parameter for the light constructor functions is the color, and the second parameter is the light intensity, which ranges from 0 to 1. You should be able to see your player box now. It will look more 3D, as each side has different lighting. You can use your browser dev tools to check the console logs if you encounter any errors.

Let's also get rid of the window scrollbars. Add the following to the `style.css` file in the `body` selector:

```css
overflow: hidden;
margin: 0;
```

Your player box should now look like this:

![Player box with light](https://replit-docs-images.bardia.repl.co/images/tutorials/47-3dgamethreejs/player_box_light.png)

Try changing the material color, light intensity, and camera position to see what happens.

Before we get our player box moving, let's change our code so that it is nicely structured for the game logic that we will add. Add the following lines to the top of the `script.js` file:

```javascript
let camera, scene, renderer, player;
const boxSideLength = 0.5;

init();
```

The `camera`, `scene`, and `renderer` variables are global variables so that they are available throughout our script. They will be defined in functions we create. Remove the `const` keyword in front of their declarations that we already added.

We also initialize a `player` variable for our created box.

The `boxSideLength` variable is for the x, y and z lengths of our box. Most of our boxes will be squares.

Now let's define the function called `init`. This function will be used to initialize the game, by rendering and setting up the scene and creating our objects. Define an `init` function and move the camera, light, and renderer code into it:

```javascript
function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.1,
    200
  );

  camera.position.set(4, 4, -4);
  camera.lookAt(0, 0, 2);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
  directionalLight.position.set(10, 20, 0);
  scene.add(ambientLight, directionalLight);

  initializeBoxes();

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
  document.body.appendChild(renderer.domElement);
}
```

We also call the `initializeBoxes` function, which we will soon define.

Now let's make a `createBox` function. We will use this function to create our player box, and later to create obstacles. Define the `createBox` function and move the code for creating your player box inside of it:

```javascript
function createBox(x, y, z) {
  const geometry = new THREE.BoxGeometry(
    boxSideLength,
    boxSideLength,
    boxSideLength
  );
  const material = new THREE.MeshLambertMaterial({ color: 0xe56956 });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  scene.add(mesh);
}
```

The `geometry` definition now uses the `boxSideLength` variable to set the lengths of the sides. There is one extra line of code here, the call to the `mesh.position.set` function. This will set the position of the created box in the 3D world based on the arguments passed to the function. This will be useful when we create randomly positioned obstacles.

Now let's create an `initializeBoxes` function that will be used to create all of the boxes at the start of the game. Add the following lines of code:

```javascript
function initializeBoxes() {
  player = createBox(0, 0, 0);
}
```

All this function currently does is create a player box that is positioned in the center of our 3D world. Its x, y, and z positions will be 0. If you run your repl code, you should still be able to see your box.

## Animating the player box

In the final game, the player box moves continuously along the z-axis. We will make use of an animation loop to continuously move the player box and re-render the scene to see the movement. At the bottom of the `script.js` file, add the following lines:

```javascript
function animate() {
  player.mesh.position.z += speed;
  camera.position.z += speed;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
```

The `animate` function will be called on every frame by using the `requestAnimationFrame` function, which is a web API that is used to create animations. It will call the `animate` function before each repaint of the screen by the browser. The number of function calls is usually 60 per second.

For each `animate` function call, we move the player box and the camera by changing their position along the z-axis. The camera will follow the player box. Let's add a global speed variable at the top of our `script.js` file so that we can easily change it later if we want to:

```javascript
let speed = 0.1;
```

To access the player box's `mesh` property, let's return the `mesh` property from the `createBox` function. Add the following to the end of the `createBox` function:

```javascript
return {
  mesh,
};
```

We also need to call our `animate` function initially to get it started. In the `init` function, add the following line below `renderer.render(scene, camera)`:

```javascript
animate();
```

Our player box will now be moving, but we won't be able to see the movement. We are going to add a [`GridHelper`](https://threejs.org/docs/index.html?q=grid#api/en/helpers/GridHelper) so that we can see the movement. A `GridHelper` is an object that defines a grid, which is a two-dimensional array of lines along the x- and y-axes. This will give our 3D world a 2D grid surface. In the `init` function, add the following lines below `initializeBoxes()`:

```javascript
const gridHelper = new THREE.GridHelper(200, 200);
scene.add(gridHelper);
```

You will now be able to see your player box move through the 3D world.

![Animated player box](https://replit-docs-images.bardia.repl.co/images/tutorials/47-3dgamethreejs/animating-the-player-box.gif)

If you wait long enough, the box will move off the grid. Let's restrict the movement of the box so that it can't move off the grid.

## Creating a game course

The first thing we will do to prevent the player box from moving off the grid will be to add another box, the finishing line box. The finishing line box will be added at the boundary of the grid. Our game course will be from the center of the grid to the end of the grid, along the z-axis. Later, we will add collision detection to check if our player box has hit the finishing line box so that we can end the game before the player box leaves the grid.

We will create a new global variable called `courseLength` that will define the distance to the edge of the grid. Our player box starts moving from the center of the grid (x = 0, y = 0, z = 0) so our square grid's length should be double the course length. We will also restrict the movement of the box along the x- and y-axes. Add the following global variables to the top of the `script.js` file:

```javascript
const courseLength = 100;
const gridHelperSize = courseLength * 2;

// limit movement of player box on x and y-axis
const xBoundary = 4 - boxSideLength / 2;
const yBoundary = xBoundary / 4;
```

We set the `courseLength` to `100` world units. We use the `gridHelperSize` to define the length of our square grid along the x- and z-axes. The `xBoundary` and `yBoundary` variables are used to limit the movement of our player box along the x- and y-axes.

Let's update the `gridHelper` to use the `gridHelperSize` variable for its size and number of divisions parameters:

```javascript
const gridHelper = new THREE.GridHelper(gridHelperSize, gridHelperSize);
```

Now we will add the finish line box. Add the following to the `initializeBoxes` function:

```javascript
// create finish line box
const geometry = new THREE.BoxGeometry(
  xBoundary * 2,
  yBoundary * 2,
  boxSideLength
);
const material = new THREE.MeshLambertMaterial({ color: "green" });
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0, 0, courseLength);
scene.add(mesh);
```

This creates a green box that is positioned at the end of the grid. It marks the end of the game course. It's positioned at the end of the course where the z-axis value is equal to the course length. The size of the box along its x- and y-axes marks the x and y boundary. We will restrict the player box's movement so that it can't move past the finish line box. Its size along the x- and y-axes is double the boundary length, because it needs to mark the negative and positive axis boundaries.

You will now be able to see the finish line box at the end of the grid. To reach the end of the grid sooner, you can change the `speed` variable.

![Game course finish line box](https://replit-docs-images.bardia.repl.co/images/tutorials/47-3dgamethreejs/creating-a-game-course.png)

## Controlling the player box

Let's add some controls so that we can move our player box up, down, left, and right. Add the following lines to the bottom of the `script.js` file:

```javascript
// moving player box with arrow keys
window.addEventListener("keydown", (e) => {
  const key = e.key;
  if (key === "ArrowLeft") {
    player.mesh.position.x += speed;
  }
  if (key === "ArrowRight") {
    player.mesh.position.x -= speed;
  }
  if (key === "ArrowUp") {
    player.mesh.position.y += speed;
  }
  if (key === "ArrowDown") {
    player.mesh.position.y -= speed;
  }
});
```

This creates an event listener that listens for a key press event. The player box's mesh (geometry + material) position is increased or decreased along the x- or y-axis, depending on which arrow button is pressed. Run your repl now and you should be able to move your player box with the arrow keys. You will notice that you can move off the screen, and when you reach the edge of the grid, you can avoid hitting the finish line box. Let's restrict the movement of the player box so that it always hits the finish line box. Replace the event listener that you just added with the following code:

```javascript
window.addEventListener("keydown", (e) => {
  const key = e.key;
  const currXPos = player.mesh.position.x;
  const currYPos = player.mesh.position.y;
  if (key === "ArrowLeft") {
    if (currXPos > xBoundary) return;
    player.mesh.position.x += speed;
  }
  if (key === "ArrowRight") {
    if (currXPos < -xBoundary) return;
    player.mesh.position.x -= speed;
  }
  if (key === "ArrowUp") {
    if (currYPos > yBoundary) return;
    player.mesh.position.y += speed;
  }
  if (key === "ArrowDown") {
    if (currYPos < -yBoundary) return;
    player.mesh.position.y -= speed;
  }
});
```

Here we add some extra lines of code to restrict the movement of the player box along the x- and y-axes by getting the current x and y position of the player box and then preventing movement if the position exceeds the current boundary values that we set using our global variables `xBoundary` and `yBoundary`.

Note that if you increased the speed variable to reach the end of the course sooner, you may need to increase the width and height of the finish line box to ensure that the player box always hits it, as the player box will be able to move a bit more along the x- and y-axes.

## Detecting collisions

To determine that we have reached the end of the course, we need to be able to detect collisions. Once the player box has collided with the finish line box, the game is over. Add the following global variables to the top of your `script.js` file:

```javascript
let gameOver = false;
const numOfObstacles = 0;
var obstaclesBoundingBoxes = [];
```

The `gameOver` flag variable will be used to determine when the game is over. This will occur once the finish line is reached, or if the player box collides with an obstacle (we will add obstacles later). The number of obstacles is currently zero. The `obstaclesBoundingBoxes` will store a set of x, y, and z positions of bounding boxes that describe the positions of all of our objects, excluding the player box. We will use these bounding boxes to detect collisions.

In the `initializeBoxes` function, add the following lines at the bottom:

```javascript
const boundingBox = new THREE.Box3().setFromObject(mesh);
obstaclesBoundingBoxes.push(boundingBox);
```

This will create a bounding box for the finish line box `mesh` object. We add this to the `obstaclesBoundingBoxes` array. The [`Box3`](https://threejs.org/docs/index.html?q=box3#api/en/math/Box3) object represents a bounding box in 3D space. It describes a set of coordinates, it does not appear in our 3D world. We use the `setFromObject` method to calculate the bounding box of the finish line box, using the finish line box's `mesh`. Within the bounding box object, there is a `max` and `min` property that describes the upper and lower x, y, and z boundaries of the box. For example, the bounding box of the finish line box contains the following `max` and `min` properties:

```json
max: {x: 3.75, y: 0.9375, z: 100.25}
min: {x: -3.75, y: -0.9375, z: 99.75}
```

Now let's create a function to detect collisions. Add the following function below the `createBox` function:

```javascript
function detectCollisions() {
  const playerBox = new THREE.Box3().setFromObject(player.mesh);
  // Check each object to detect if there is a collision
  for (let i = 0; i < numOfObstacles + 1; i++) {
    // an object was hit
    if (obstaclesBoundingBoxes[i].intersectsBox(playerBox)) {
      gameOver = true;
      alert("You win!");
      return;
    }
  }
}
```

To detect a collision, we first create a bounding box for the player box by creating a `Box3` object. We then loop through the `obstaclesBoundingBoxes` array and use the `intersectsBox` method to check for an intersection – a collision – between the `playerBox` and each obstacle. We currently don't have any obstacles, so we can only check for a collision with the finish line box. Given that we will always hit the finish line box, we set `gameOver` to `true` once it is hit. We will use an alert to let the player know that they have won when they reach the end of the course.

We need to call the `detectCollisions` function in the game loop `animate` function so that we constantly check for a collision. Change your `animate` function so that it is the same as the `animate` function below:

```javascript
function animate() {
  if (gameOver) return;
  player.mesh.position.z += speed;
  camera.position.z += speed;

  detectCollisions();

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
```

The if statement at the start of the `animate` function prevents the function from running if the game is over.

Let's also add `if (gameOver) return;` to the start of the "keydown" `window.addEventListener` callback function to disable the keyboard event if the game is over.

You will now get a "You win!" alert message once you reach the finish line box at the end of the grid.

![Game course finish line box](https://replit-docs-images.bardia.repl.co/images/tutorials/47-3dgamethreejs/detecting-collisions.png)

## Creating obstacles

Now let's add some obstacles for the player box to avoid to make it a game. Set the `numOfObstacles` global variable to 50. We are going to write a `createObstacle` function to generate 50 randomly positioned obstacles. Add the following function below the `createBox` function:

```javascript
function createObstacle() {
  const x = THREE.MathUtils.randFloatSpread(xBoundary * 2);
  const y = THREE.MathUtils.randFloatSpread(yBoundary * 2);
  const z = THREE.MathUtils.randFloat(10, courseLength - boxSideLength);
  const obstacle = createBox(x, y, z);
  const boundingBox = new THREE.Box3().setFromObject(obstacle.mesh);
  obstaclesBoundingBoxes.push(boundingBox);
}
```

We make use of some math utility functions of the three.js [`MathUtils`](https://threejs.org/docs/index.html?q=MathUtils#api/en/math/MathUtils) object to get random x, y, and z points along our course. These will be used to randomly position obstacles. We get random x and y points using our x and y boundaries. The `randFloatSpread` function takes in a range parameter and returns a random float in the interval [- range / 2, range / 2]. We get a random z value using the `randFloat` function. It takes in a low and high parameter and returns a random float in the interval [low, high]. This value is always positive, as our course is positioned on the positive side of the z-axis. The low value starts at 10, as we don't want to place obstacles right in front of or on the player box. The high value is the `courseLength`, so that the obstacles can be positioned all along our course. We subtract the `boxSideLength` to prevent the obstacles from being placed on the finish line box. We then pass these x, y, and z points to the `createBox` function to create an obstacle box. A bounding box is created for each created obstacle, and added to the `obstaclesBoundingBoxes` array so that we can detect collisions between our player box and the obstacles.

We need to call the `createObstacle` function to create the obstacles. In the `initializeBoxes` function, let's add a for loop to create the obstacles:

```javascript
function initializeBoxes() {
  player = createBox(0, 0, 0);

  for (let i = 0; i < numOfObstacles; i++) {
    createObstacle();
  }

  ...

}
```

This will create 50 randomly positioned obstacles. Run your repl to see them:

![Creating random obstacles](https://replit-docs-images.bardia.repl.co/images/tutorials/47-3dgamethreejs/creating-random-obstacles.png)

Each time you reload the page, the obstacles will be randomly positioned.

## Adding win-or-lose logic

Try to collide with an obstacle, and you will see that the alert message is always "You win!". Let's fix that by adding some win-or-lose logic. In the `detectCollisions` function, replace the for loop with the following for loop:

```javascript
for (let i = 0; i < numOfObstacles + 1; i++) {
  // an object was hit
  if (obstaclesBoundingBoxes[i].intersectsBox(playerBox)) {
    gameOver = true;
    if (i !== numOfObstacles) {
      alert("You lose");
    } else {
      // the last box is the finish line box
      alert("You win!");
    }
    return;
  }
}
```

The last object bounding box in the `obstaclesBoundingBoxes` array is the finish line box. Knowing this, we can determine when the player box has reached the finish line without hitting an obstacle. If the player box intersects with the last item in the `obstaclesBoundingBoxes` array, you win. If the player box intersects with any other item, you lose.

The game is now playable. Try make it to the end of the obstacle course.

## Adding restart

There is one big problem with our game: once the game is over we need to refresh the page to play again. That's not a very good user experience. Let's add a "Play" button that will show on page load and when the game is over. It will start the game and reset everything that needs to be reset at the start of a game.

Add the following to the `index.html` file inside of the `<body>` tag to create a button and a screen that covers the window behind the button:

```html
<div id="play-btn-screen">
  <div class="play-btn-container">
    <div>Use the up, down, left and right arrow keys to move</div>
    <button id="play-btn">Play</button>
  </div>
</div>
```

Add the following to the `style.css` file:

```css
#play-btn-screen {
  position: absolute;
  min-width: 100%;
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.play-btn-container {
  color: white;
  text-align: center;
}

#play-btn {
  background-color: red;
  padding: 1rem 1.5rem;
  margin: 0.5rem;
}
```

This will create a play button in the middle of the screen.

Now let's make the button work. Add the following global variables to the top of the `script.js` file:

```javascript
const playBtnScreen = document.getElementById("play-btn-screen");
const playBtn = playBtnScreen.querySelector("#play-btn");
var allObjs = [];
```

This gets the play button screen (background cover behind the button) and play button element from the DOM and stores them in variables. The `allObjs` array will store all of the created objects. We need this array to clear the scene by removing all of the objects at the start of each game. We do this so that we can place new randomly positioned objects in the scene and not have objects in the scene from previous rounds.

Next, add a new click event listener on the `playBtn`. Add the following to the bottom of the `script.js` file:

```javascript
playBtn.addEventListener("click", () => {
  allObjs.forEach((obj) => scene.remove(obj));
  camera.position.set(4, 4, -4);
  camera.lookAt(0, 0, 2);
  initializeBoxes();
  gameOver = false;
  animate();
  playBtnScreen.style.visibility = "hidden";
});
```

The play button is used to start and also re-start the game. The first thing we do when the play button is clicked is to remove all the objects in the scene using the `scene.remove` method. We then reset the camera position and call the `initializeBoxes` function, which creates and positions all of the objects. We set `gameOver` to false so that our `animate` function and `keydown` event listener will work. We then call the `animate` function to start the animation loop, and then we hide the play button screen, which hides the play button as well. We need to make a few more changes in our `script.js` file for the play button to work properly:

- Delete the `animate()` function call in the `init` function. We now call it when the play button is clicked.

- Add `allObjs.push(mesh);` in the `createBox` function above ` scene.add(mesh);`. This adds the created box mesh (object) to the `allObjs` array.

- Add the following lines in the `detectCollisions` function below `gameOver = true;`:

  ```javascript
  playBtnScreen.style.visibility = "visible";
  playBtn.focus();
  ```

  This will make our play button visible at the end of the game and focus the button so that you can easily restart the game by pressing the spacebar or enter key.

- Add the following lines at the start of the `initializeBoxes` function:

  ```javascript
  // make empty at start of a game
  allObjs = [];
  obstaclesBoundingBoxes = [];
  ```

  This clears the `allObjs` array so that it only contains objects created in the current game. We also clear the `obstaclesBoundingBoxes` as we only want to detect collisions with objects in the current game.

- Add `allObjs.push(mesh);` in the `initializeBoxes` function above `scene.add(mesh);`. This adds the finish line box to the `allObjs` array.

Our game is almost complete, all we need to do now is make it mobile-friendly.

## Making the game mobile friendly: Adding on-screen arrow buttons

To make the game mobile friendly, we will add up, down, left, and right buttons to the bottom of the screen.

Add the following to the `index.html` file inside the `<body>` tag, just above the `<script>` tag to create the buttons:

```html
<div id="keys">
  <div class="keys-container">
    <button id="up">
      <svg width="30" height="30" viewBox="0 0 10 10">
        <g transform="rotate(0, 5,5)">
          <path d="M5,4 L7,6 L3,6 L5,4" />
        </g>
      </svg>
    </button>
    <button id="left">
      <svg width="30" height="30" viewBox="0 0 10 10">
        <g transform="rotate(-90, 5,5)">
          <path d="M5,4 L7,6 L3,6 L5,4" />
        </g>
      </svg>
    </button>
    <button id="down">
      <svg width="30" height="30" viewBox="0 0 10 10">
        <g transform="rotate(180, 5,5)">
          <path d="M5,4 L7,6 L3,6 L5,4" />
        </g>
      </svg>
    </button>
    <button id="right">
      <svg width="30" height="30" viewBox="0 0 10 10">
        <g transform="rotate(90, 5,5)">
          <path d="M5,4 L7,6 L3,6 L5,4" />
        </g>
      </svg>
    </button>
  </div>
</div>
```

The up, down, left, and right icons are created using SVGs.

Now let's add some basic styling to our buttons. Add the following to the `style.css` file:

```css
#keys {
  position: absolute;
  min-width: 100%;
  min-height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.keys-container {
  display: grid;
  grid-template-columns: 50px 50px 50px;
  grid-template-rows: auto;
  grid-template-areas:
    ".    up   ."
    "left down right";
  grid-gap: 10px;
  padding-bottom: 3rem;
}

#keys button {
  padding: 0.5rem;
}

#up {
  grid-area: up;
}

#down {
  grid-area: down;
}

#left {
  grid-area: left;
}

#right {
  grid-area: right;
}
```

To see the arrows, click the "Open in a new tab" button in the repl Output tab. This opens the link to the repl in a new tab. You can copy this link to view your repl on your phone or to share it with your friends.

![Replit - open in new tab link](https://replit-docs-images.bardia.repl.co/images/tutorials/47-3dgamethreejs/open_in_new_tab.png)

You should now be able to see the screen arrow buttons.

![Screen arrow buttons](https://replit-docs-images.bardia.repl.co/images/tutorials/47-3dgamethreejs/screen_buttons.png)

Try clicking a button before pressing "Play". You will notice that you can't click the arrow buttons. This is because the play button screen, which covers the whole screen, has a CSS `z-index` property of `1`. Once you click "Play", the play button screen CSS `visibility` property is set to hidden, and you will be able to press the arrow buttons.

Now let's add some JavaScript click event listeners and some functions to make our arrow buttons work on desktop and mobile. Our code is going to look quite complex because we use some extra functions and `setTimeout` to allow the player box to continuously move when the arrow button is held down. This makes for a better user experience than having to continuously tap or click the button to move in one direction. Add the following global variable to the top of the `script.js` file:

```javascript
const keyBtns = document.querySelectorAll(".keys-container button");
```

This gets all the key buttons from the DOM and stores them in a variable.

Now add the following to the bottom of the `script.js` file:

```javascript
let timeoutID = 0;

function moveLeft() {
  const currXPos = player.mesh.position.x;
  if (currXPos > xBoundary) return;
  player.mesh.position.x += speed;
  clearTimeout(timeoutID);
  timeoutID = setTimeout(moveLeft, 50);
}

function moveRight() {
  const currXPos = player.mesh.position.x;
  if (currXPos < -xBoundary) return;
  player.mesh.position.x -= speed;
  clearTimeout(timeoutID);
  timeoutID = setTimeout(moveRight, 50);
}

function moveUp() {
  const currYPos = player.mesh.position.y;
  if (currYPos > yBoundary) return;
  player.mesh.position.y += speed;
  clearTimeout(timeoutID);
  timeoutID = setTimeout(moveUp, 50);
}

function moveDown() {
  const currYPos = player.mesh.position.y;
  if (currYPos < -yBoundary) return;
  player.mesh.position.y -= speed;
  clearTimeout(timeoutID);
  timeoutID = setTimeout(moveDown, 50);
}

function handleKeyDown(e) {
  if (gameOver) return;
  const { id } = e.currentTarget;

  if (id === "left") {
    moveLeft();
  }
  if (id === "right") {
    moveRight();
  }
  if (id === "up") {
    moveUp();
  }
  if (id === "down") {
    moveDown();
  }
}

// moving box - mobile - using screen btns
keyBtns.forEach((keyBtn) => {
  keyBtn.addEventListener("mousedown", handleKeyDown);
  keyBtn.addEventListener("touchstart", handleKeyDown);
  keyBtn.addEventListener("mouseup", () => {
    clearTimeout(timeoutID);
    timeoutID = 0;
  });

  keyBtn.addEventListener("mouseleave", () => {
    clearTimeout(timeoutID);
    timeoutID = 0;
  });
  keyBtn.addEventListener("touchend", () => {
    clearTimeout(timeoutID);
    timeoutID = 0;
  });
  keyBtn.addEventListener("touchcancel", () => {
    clearTimeout(timeoutID);
    timeoutID = 0;
  });
});
```

For each key button, we add `"mousedown"` and `"touchstart"` event listeners. When the button is clicked or touched, the `handleKeyDown` function is called. This function determines which button was clicked or touched by checking the ID of the event's `currentTarget` property. Different functions are called depending on the ID of the button. For each function that handles the movement in a particular direction, we get the current position of the player box, check if it is within the set boundaries, and increase or decrease its position by the `speed` variable value. We then recursively call the function again after 50 ms using [`setTimeout`](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout) so that the movement is continuous when the button is held down.

The `setTimeout` function returns a `timeoutID` that is a positive integer value. It identifies the timer created by the call to `setTimeout()`. This value is passed to [`clearTimeout()`](https://developer.mozilla.org/en-US/docs/Web/API/clearTimeout) to cancel the timeout after each recursive function call so that we don't create unnecessary timeouts.

For each key button, we also add `"mouseleave"`, `"touchend"`, and `"touchcancel"` event listeners. These clear the timeouts when the button is not held down anymore.

> A little cheat in the game: If you have a touchscreen laptop, pressing the arrow key on your keyboard and on the screen will make it move faster than normal!

Save and run your project. Our game is complete!

## Next steps

We learnt the basics of three.js and built a simple 3D game. There are many things that you can do to improve the game. Here are some you might want to try:

- Replace the alert with a nicely styled modal.
- Style the objects, or import or create 3D models. See [rendering 3D scenes with three.js](/tutorials/3D-rendering-with-threejs) for more information.
- Add a nicer surface instead of the grid.
- Add a loading screen while the 3D scene is loading.
- Make the game more challenging by increasing the speed the player box moves at as the game progresses, adding more obstacles, or by making the obstacles move.
- Add a points system. Change the game logic so that you have to hit the boxes to get points.

  - Store the points in local storage.

- Add physics to the collisions using [cannon-es](https://github.com/pmndrs/cannon-es).
- Or for a more advanced challenge: Make a bigger course, try making infinite movement within finite bounds so that you don't use too much of your computer's memory.

You can find our repl below:

<iframe height="400px" width="100%" src="https://replit.com/@ritza/3D-obstacle-avoiding-game?embed=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
