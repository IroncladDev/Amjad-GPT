---
title: 3D rendering with three.js
slug: /tutorials/3D-rendering-with-threejs
---

# Rendering 3D scenes with three.js

Three.js is a JavaScript library for rendering 3D worlds in web browsers. With three.js you can make a website using 3D elements and advanced animation, or even complex 3D games in JavaScript. To get a feeling for the kind of renders three.js is capable of, have a look at their [examples page](https://threejs.org/examples).

Using three.js with Replit requires a little extra setup, but your site will be online immediately, making it easy to share with your friends.

## Creating a new project in Replit

Head over to [Replit](https://replit.com) and create a new repl. Choose **HTML, CSS, JS** as your project type. Give this repl a name, like "3D rendering".

![creating a new replit project](https://docimg.replit.com/images/tutorials/38-3drendering-threejs/new-project.png)

## Importing three.js to the project

Open the `script.js` file in your repl. We'll import three.js by referencing it from a content distribution network (CDN). There are other ways of using three.js in a project, but this one will get us up and running the quickest.

Add the following line to the script file to import three.js from the Skypack CDN:

```javascript
import * as THREE from "https://cdn.skypack.dev/three@0.136.0";
```

You'll notice that we're using the [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) keyword. This is a way of importing a new [JavaScript `module`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) package. To make this work, we need to change the default `script` tag in the `index.html` file to the following:

```html
<script type="module" src="script.js"></script>
```

Notice we added the `type=module` attribute to the script tag, which allows us to use module features in our script.

Now we are ready to use three.js in our project.

## Creating a basic scene

To start, we'll add some basic built-in 3D shapes to a scene. The main steps are:

1. Create a renderer, and attach it to an element on the web page.
2. Create a new `Scene` container to hold all our 3D objects. We'll pass this scene to the `renderer` whenever we want to draw it.
3. Create the geometry, or points that make up the "frame" of the object we want to render.
4. Create a material, which is color and texture, to cover the frame of the object.
5. Add the geometry and material to a "mesh" object, which is a 3D object that can be rendered.
6. Add the mesh to the scene.
7. Add a camera to the scene, which determines what we see rendered.

That's quite a few steps, so let's start by creating a renderer. Add the following lines to the `script.js` file:

```javascript
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
```

This sets up a new [`WebGL`](https://developer.mozilla.org/en-US/docs/Glossary/WebGL) renderer. WebGL is a browser technology that gives web developers access to the graphics cards in computers. The `setSize` method sets the size of the renderer output to the size of the browser window by using the width and height values from the [`window`](https://developer.mozilla.org/en-US/docs/Web/API/Window) object. This way our scene will take up the entire browser window.

Next we'll create a new `Scene` container. Add the following line to the `script.js` file:

```javascript
const scene = new THREE.Scene();
```

Its' time to create some 3D objects. We'll start with a cube. To create a cube, we'll need to create a `Geometry` object. Add the following line to the `script.js` file:

```javascript
const boxGeometry = new THREE.BoxGeometry(3, 3, 3);
```

This gives us the geometry of a cube. The `BoxGeometry` constructor takes three arguments: the width, height, and depth of the cube. Three.js has more built-in geometries, so let's add another shape to the scene. This time we'll add a torus, or donut shape. They always look cool in 3D:

```javascript
const torusGeometry = new THREE.TorusGeometry(10, 3, 16, 100);
```

We've got the geometry, or points, of the 3D objects. Now we need to create a material to cover them with. You can think of the material as the skin of the object. Add the following line to the `script.js` file:

```javascript
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
```

The MeshBasicMaterial is a simple material that covers the geometry with a solid color, in this case using the hexadecimal RGB code for pure green. You can also use a [`Texture`](https://threejs.org/docs/index.html#api/en/textures/Texture) to cover the geometry with a texture.

The next step is combining the geometries and the material to make a mesh. Add the following lines to the `script.js` file:

```javascript
const cube = new THREE.Mesh(boxGeometry, material);
const torus = new THREE.Mesh(torusGeometry, material);
```

These meshes are what we'll add to the scene. We'll add the cube first, then the torus.

```javascript
scene.add(cube);
scene.add(torus);
```

A camera determines what we see rendered, depending on where it is placed and where it is aimed. Add the following line to the `script.js` file:

```javascript
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 25;
```

We've got all the pieces we need to start rendering the scene. Now we just need to tell the renderer to draw the scene. Add the following line to the `script.js` file:

```javascript
renderer.render(scene, camera);
```

Now try running the code, by pushing the `Run` button at the top of the Replit window. You should see your first scene, a green cube and torus:

![static-scene](https://docimg.replit.com/images/tutorials/38-3drendering-threejs/static-scene.png)

Our scene doesn't look very "3D" yet, but we'll get there soon.

## Animating a scene

Animating a scene or moving the camera can create more of a 3D effect. Let's add a little animation to our scene by rotating the torus and cube. In the `script.js` file, replace `renderer.render(scene, camera);` with the following lines:

```javascript
function animate() {
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();
```

This creates a new function, `animate()`, that will be called on every frame. We rotate the torus and cube by 0.01 radians around the objects' x and y axes using the [`rotation`](https://threejs.org/docs/index.html?q=rotation#api/en/core/Object3D.rotation) property of each mesh. This is a handy method that saves us from calculating the rotation ourselves.

After we rotate the objects, we call the `renderer.render(scene, camera);` method to draw the scene. This will cause the scene to be redrawn every frame, with the updated rotations.

The `requestAnimationFrame` function is a built-in browser API call that will fire the `animate()` function on the next frame. Each time `animate()` is called, `requestAnimationFrame` will call it again for the next frame. We call this function so that we can keep the animation running.

To kick off the animation for the first time, we call the `animate()` function ourselves. Thereafter, it will keep itself running.

Press the "Run" button again and you should see the torus and cube rotating in the Replit window:

![animated-scene](https://docimg.replit.com/images/tutorials/38-3drendering-threejs/animated-scene.gif)

That looks a lot more 3D now!

Try changing up the material color and see what happens. You can also define different materials for the torus and cube, to make them look different.

## Adding a model to the scene

We've created some basic 3D shapes programmatically. As you can imagine, building up a complex 3D world or character using this method would be very tedious. Fortunately, there are many 3D models available online, or perhaps you or a friend have played with making models in 3D animation applications like [Blender](https://www.blender.org). Three.js has a built-in loader to load these models into the scene.

To add the model loading functionality, we need to import it into our script. At the top of the `script.js` file, just below the existing `import` line, add the following:

```javascript
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/GLTFLoader.js";
```

This gives us the `GLTFLoader` class, which we'll use to load the model. "glTF" stands for Graphics Language Transmission Format, and is widely used as a way to import and export 3D models from various 3D applications. All we need to know is that we can import any model that is saved in this format into our three.js applications. If you search for "free GLTF 3D models" on the web, you'll find a lot of sites where creators upload their models. Many are free to use in your projects, and some you need to pay for. We'll look for some free ones to experiment with.

Let's use this [model of soda cans](https://sketchfab.com/3d-models/soda-cans-4e0be610db9646929d8be84491f1a72f) to start. Download the model, choosing the `glTF` format. We've also included the model [here](https://tutorial-files.util.repl.co/3d-rendering-threejs/soda_cans.zip), so you can download it easily.

Add the model to your repl by dragging the folder into the "Files" panel on the left.

![add-model](https://docimg.replit.com/images/tutorials/38-3drendering-threejs/add-model.gif)

We'll need to remove or comment out the previous code that drew the cube and torus. Remove the lines that create the cube and torus geometries, materials, and meshes, as well as the animation code. You should have only the following lines remaining:

```javascript
import * as THREE from "https://cdn.skypack.dev/three@0.136.0";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/GLTFLoader.js";

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
```

We need to add a few extra steps when loading a model. First, we need to create a new `GLTFLoader` object. Add the following line to the `script.js` file, just below the `scene` variable line:

```javascript
const loader = new GLTFLoader();
const fileName = "./soda_cans/scene.gltf";
let model;
```

Here we've created a new loader object, and we've created a variable `fileName` with the path to the soda can model we want to load. We also have a variable `model` that will hold the loaded model, which we can manipulate later.

Now for the actual loading code. We'll use the `load` method of the loader. Add the following lines to the `script.js` file, below the code we've just added:

```javascript
loader.load(
  fileName,
  function (gltf) {
    model = gltf.scene;
    scene.add(model);
  },
  undefined,
  function (e) {
    console.error(e);
  }
);
```

The `load` method takes a few parameters:

- the path to the model,
- a callback function that will be called when the model is loaded,
- a loading progress callback function, and
- an error callback function that will be called if there is an error loading the model.

We supply the `undefined` value for the progress callback, as we don't need it for this example, although it is a nice touch in a production application to give feedback to the user.

This alone won't always make a model visible on the screen. This is because a model may have no lighting, or the material may not be self-illuminating, or the model may be too large or too small to be visible from our default camera angle. To account for these possibilities, we'll include some helper functions to add lighting, adjust the model's position, and set the camera's position and angle.

Let's start with adding some lighting. Add the following function to the `script.js` file:

```javascript
function addLight() {
  const light = new THREE.DirectionalLight(0xffffff, 4);
  light.position.set(0.5, 0, 0.866);
  camera.add(light);
}
```

This function will add a directional light with a white color to the scene, at a position slightly offset from the camera. We attach the light to the camera so that it is always shining at whatever the camera is looking at.

The second helper function adjusts the positions of the model and the camera. Add the following function to the `script.js` file:

```javascript
function adjustModelAndCamera() {
  const box = new THREE.Box3().setFromObject(model);
  const size = box.getSize(new THREE.Vector3()).length();
  const center = box.getCenter(new THREE.Vector3());

  model.position.x += model.position.x - center.x;
  model.position.y += model.position.y - center.y;
  model.position.z += model.position.z - center.z;

  camera.near = size / 100;
  camera.far = size * 100;
  camera.updateProjectionMatrix();

  camera.position.copy(center);
  camera.position.x += size / 0.2;
  camera.position.y += size / 2;
  camera.position.z += size / 100;
  camera.lookAt(center);
}
```

This function works by finding the bounding box of the model. The bounding box is the smallest box that can contain all the vertices of the model. We can then use this box to set the camera's near and far clipping planes, and also to adjust the position of the model and the camera. Clipping planes are used to determine what is visible in the camera's view. The near plane is the closest distance from the model that the camera can "see". The far plane is the furthest distance the camera can "see". This is used to determine what is visible in the camera's view. We use `camera.updateProjectionMatrix` to recalculate the camera's internal parameters.

We center the camera on the model, and then adjust the camera's position and angle to make sure the model is visible. We also point the camera to the center of the model using the `lookAt` method.

Now let's call these new functions from the loader's callback function. We'll also render the scene after this setup. Update the `loader.load` callback function as follows:

```javascript
loader.load(
  fileName,
  function (gltf) {
    model = gltf.scene;
    scene.add(model);
    addLight();
    adjustModelAndCamera();
    scene.add(camera);
    renderer.render(scene, camera);
  },
  undefined,
  function (e) {
    console.error(e);
  }
);
```

You'll notice that, along with calls to the new function, we added in an extra line `scene.add(camera)`. This is because we added the light to the camera to follow it around. A light is part of the scene, so we add the camera with the light attached to our scene.

If you run the code, you'll see that the model is now visible in the scene. However, it's a side-on view and a bit far away.

![model-side-view](https://docimg.replit.com/images/tutorials/38-3drendering-threejs/model-side-view.png)

## Adding controls to the scene

To be able to see and inspect the model better, we can add some mouse controls to the scene so that we can zoom in or rotate the model. Three.js has a built-in `OrbitControls` class that we can use.

First, add the following import code to the top of the `script.js` file, along with the other import statements:

```javascript
import { OrbitControls } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js";
```

To initiate the orbit controls, we'll need to add the following code to the `script.js` file, after the renderer and camera have been created:

```javascript
const controls = new OrbitControls(camera, renderer.domElement);
controls.screenSpacePanning = true;
```

This creates a new controls object, and specifies what object it controls, the `camera`, and the DOM element the controls should listen to mouse inputs from. We also set the `screenSpacePanning` property to `true`, which allows us to pan the camera around the model.

The controls change the view of the model as we move around it, so we need to add a modified `animate` function to redraw the scene each frame. Add the following code to the `script.js` file:

```javascript
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
```

Now replace the `renderer.render(scene, camera);` line in the `loader.load` callback function with the following call to the `animate` function to start it off;

```javascript
animate();
```

Save and run the project. Now you can try using the mouse to rotate the model and zoom in and out.

![model-orbit-controls](https://docimg.replit.com/images/tutorials/38-3drendering-threejs/model-orbit-controls.gif)

## Next Steps

Now that you know how to build a simple 3D scene using three.js, you might like to explore three.js and 3D rendering a little more. Head over to the [three.js documentation](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) to learn more about the tool and see other examples of what you can do with it. You can also download and try [Blender](https://www.blender.org/) to create your own 3D models.

<iframe height="400px" width="100%" src="https://replit.com/@ritza/3D-rendering?embed=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
