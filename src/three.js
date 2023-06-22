import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import * as dat from "lil-gui";

//
const menu = document.querySelector("#menu");
const btn = document.querySelector("#btn");
btn.addEventListener("click", () => {
  btn.classList.add("hide");
  menu.classList.remove("hide");
  scene.remove.apply(scene, scene.children);
});

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

//Axes helper
const axesHelper = new THREE.AxesHelper();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const glitterTexture = textureLoader.load("/textures/glitter/glitter.jpeg");
glitterTexture.minFilter = THREE.NearestFilter;
const silverGlitter = textureLoader.load("/textures/glitter/silver.jpeg");
silverGlitter.magFilter = THREE.NearestFilter;

// Font
const loader = new FontLoader();
const font = loader.load(
  // resource URL
  "fonts/helvetiker_regular.typeface.json",

  // onLoad callback
  function (font) {
    const textGeometry = new TextGeometry("THREE.JS", {
      font: font,
      size: 0.3,
      height: 0.2,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.01,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 5,
    });

    const textGeometry2 = new TextGeometry("ROCKS", {
      font: font,
      size: 0.3,
      height: 0.2,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.01,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 5,
    });

    textGeometry.computeBoundingBox();
    textGeometry2.computeBoundingBox();

    textGeometry.translate(
      -textGeometry.boundingBox.max.x * 0.5,
      -textGeometry.boundingBox.max.y * 0.5,
      -textGeometry.boundingBox.max.z * 0.5
    );
    textGeometry2.translate(
      -textGeometry.boundingBox.max.x * 0.5,
      -textGeometry.boundingBox.max.y * 0.5,
      -textGeometry.boundingBox.max.z * 0.2
    );

    const textMaterial = new THREE.MeshNormalMaterial();

    const fontText = new THREE.Mesh(textGeometry, textMaterial);
    const text2 = new THREE.Mesh(textGeometry2, textMaterial);

    text2.position.x = -0.6;
    text2.position.y = -0.65;
    text2.position.z = -0.1;

    scene.add(fontText, text2);
  }
);
/**
 * Object

 */

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(0.3, 0.3, 0.3),
  new THREE.MeshNormalMaterial()
);

const donut = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 20, 45),
  new THREE.MeshNormalMaterial()
);

for (let i = 0; i < 80; i++) {
  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.3, 0.3),
    new THREE.MeshNormalMaterial()
  );

  const donut = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 20, 45),
    new THREE.MeshNormalMaterial()
  );

  donut.position.x = (Math.random() - 0.5) * 10;
  donut.position.y = (Math.random() - 0.5) * 10;
  donut.position.z = (Math.random() - 0.5) * 10;

  cube.position.x = (Math.random() - 0.5) * 10;
  cube.position.y = (Math.random() - 0.5) * 10;
  cube.position.z = (Math.random() - 0.5) * 10;

  const scale = Math.random();
  donut.scale.set(scale, scale, scale);
  cube.scale.set(scale, scale, scale);

  scene.add(cube, donut);
}

let numberOfShapes = document.querySelector("#number");
let numberSubmit = document.querySelector("#number-submit");

const shapeSubmit = document.querySelector("#shape-submit");
const radioButtons = document.querySelectorAll('input[name="shape"]');

shapeSubmit.addEventListener("click", e => {
  e.preventDefault();
  let shape;
  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
      shape = radioButton.value;
      break;
    }
  }

  getRightShape(shape);
});

let test;
const getRightShape = shape => {
  if (shape === "box") {
    test = cube;
  } else if (shape === "donut") {
    test = donut;
  }
  return test;
};

numberSubmit.addEventListener("click", e => {
  e.preventDefault();
  if (test?.geometry?.type === "TorusGeometry") {
    for (let i = 0; i < numberOfShapes.value; i++) {
      const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
      const donutMaterial = new THREE.MeshBasicMaterial({
        map: glitterTexture,
      });
      const donut = new THREE.Mesh(donutGeometry, donutMaterial);

      donut.position.x = (Math.random() - 0.5) * 10;
      donut.position.y = (Math.random() - 0.5) * 10;
      donut.position.z = (Math.random() - 0.5) * 10;

      const scale = Math.random();
      donut.scale.set(scale, scale, scale);

      scene.add(donut);
    }
  } else {
    for (let i = 0; i < numberOfShapes.value; i++) {
      const cube = new THREE.Mesh(
        new THREE.BoxGeometry(0.3, 0.3, 0.3),
        new THREE.MeshBasicMaterial({ map: silverGlitter })
      );

      cube.position.x = (Math.random() - 0.5) * 10;
      cube.position.y = (Math.random() - 0.5) * 10;
      cube.position.z = (Math.random() - 0.5) * 10;

      const scale = Math.random();
      cube.scale.set(scale, scale, scale);

      scene.add(cube);
    }
  }

  //
});

const text = document.querySelector("#custom-text");
const textSubmit = document.querySelector("#text-submit");
console.log(text.value);

textSubmit.addEventListener("click", e => {
  e.preventDefault();
  let newText = text.value;

  const font = loader.load(
    // resource URL
    "fonts/helvetiker_regular.typeface.json",

    // onLoad callback
    function (font) {
      // do something with the font
      const textGeometry = new TextGeometry(newText, {
        font: font,
        size: 0.3,
        height: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.01,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5,
      });

      const textMaterial = new THREE.MeshBasicMaterial({ map: glitterTexture });

      const text = new THREE.Mesh(textGeometry, textMaterial);

      scene.add(text);
    }
  );
});

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
  // height: 700,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  100,
  sizes.width / sizes.height,
  0.5,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 1;
scene.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Controls
const controls = new OrbitControls(camera, canvas);
// controls.enableZoom = false;
controls.enableDamping = true;
controls.minDistance = -100;
controls.maxDistance = 5;

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Update objects
  camera.position.x = Math.cos(elapsedTime / 100);
  camera.position.y = Math.sin(elapsedTime / 10);
  // camera.position.z = Math.cos(elapsedTime / 10);

  // camera.lookAt(axesHelper.position);
  //
  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
