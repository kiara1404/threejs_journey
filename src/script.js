import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
//import gsap from 'gsap';

//cursor
const cursor = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove', (event) => {
   cursor.x = event.clientX / sizes.width - 0.5
   cursor.y = -(event.clientY / sizes.height - 0.5)
})

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: "red" })
const mesh = new THREE.Mesh(geometry, material)

scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
// const aspectRatio = sizes.width / sizes.height
// const camera = new THREE.OrthographicCamera(- 1 * aspectRatio, 1 * aspectRatio, 1, - 1, 0.1, 100)

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
//camera.position.x = 1
//camera.position.y = 2
camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)
const canvas = document.querySelector('.webgl')
// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
console.log("test", controls)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('canvas.webgl')
})
renderer.setSize(sizes.width, sizes.height) 

// Clock
const clock = new THREE.Clock()


// Animations
const tick = () => {
    // Clock
    const elapsedTime = clock.getElapsedTime()
    controls.update()
    
    // // Update objects
   // mesh.rotation.y = elapsedTime

   //Update camera
//    camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
//    camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
//    camera.position.y = cursor.y * 5
//    camera.lookAt(mesh.position)
   

    // render object
    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}
tick()