import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import * as dat from "lil-gui";

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

//Axes helper
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

/**
 * Object
 */


// scene.add(cube);

// Font

const loader = new FontLoader();
console.log(loader);

const font = loader.load(
  // resource URL
  "fonts/helvetiker_regular.typeface.json",

  // onLoad callback
  function (font) {
    // do something with the font
    console.log("succes");
    const textGeometry = new TextGeometry("KIARA", {
      font: font,
      size: 0.8,
      height: 0.2,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.01,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 5,
    });

    const textGeometryTwo = new TextGeometry("BROEKHUIZEN", {
      font: font,
      size: 0.8,
      height: 0.2,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.01,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 15,
    });
    textGeometry.computeBoundingBox();
    textGeometryTwo.computeBoundingBox();

    console.log(textGeometry.boundingBox);
    textGeometry.translate(
      -textGeometry.boundingBox.max.x * 0.5,
      -textGeometry.boundingBox.max.y * 0.5,
      -textGeometry.boundingBox.max.z * 0.5
    );
    textGeometryTwo.translate(
      -textGeometry.boundingBox.max.x * 0.5,
      -textGeometry.boundingBox.max.y * 0.5,
      -textGeometry.boundingBox.max.z * 0.5
    );
    const textMaterial = new THREE.MeshNormalMaterial();
    const textMaterialNormal = new THREE.MeshNormalMaterial();

    // textMaterial.transparent = true
    // textMaterial.opacity = 0.5
    const text = new THREE.Mesh(textGeometry, textMaterial);
    const textTwo = new THREE.Mesh(textGeometryTwo, textMaterialNormal);
    textTwo.position.y = -1;
    textTwo.position.x = -0.45;
    // textTwo.position.z = -0.45


    
    for (let i = 0; i < 100; i++) {
      const cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial()
      );
    
      cube.position.x = (Math.random() - 0.5) * 10;
      cube.position.y = (Math.random() - 0.5) * 10;
      cube.position.z = (Math.random() - 0.5) * 10;
    
      const scale = Math.random();
      cube.scale.set(scale, scale, scale);
    
      scene.add(cube);
    }

    scene.add(text, textTwo);
  }
);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
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
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
