//code to import 3d model with three js

import './style.css'
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { TextureLoader } from 'three';

const Shoe1 = new THREE.Scene();
const Shoe2 = new THREE.Scene();
const Shoe3 = new THREE.Scene();

const canvas1 = document.querySelector('#shoe_image1');
const canvas2 = document.querySelector('#shoe_image2');
const canvas3 = document.querySelector('#shoe_image3');

const camera1 = new THREE.PerspectiveCamera(75, canvas1.clientWidth / canvas1.clientHeight, 0.1, 1000);
const camera2 = new THREE.PerspectiveCamera(75, canvas2.clientWidth / canvas2.clientHeight, 0.1, 1000);
const camera3 = new THREE.PerspectiveCamera(75, canvas3.clientWidth / canvas3.clientHeight, 0.1, 1000);

const renderer1 = new THREE.WebGLRenderer({canvas: canvas1});
const renderer2 = new THREE.WebGLRenderer({canvas: canvas2});
const renderer3 = new THREE.WebGLRenderer({canvas: canvas3});

const ambientLight1 = new THREE.AmbientLight(0x404040,20); 
const ambientLight2 = new THREE.AmbientLight(0x404040,20); 
const ambientLight3 = new THREE.AmbientLight(0x404040,20); 

Shoe1.add(ambientLight1);
Shoe2.add(ambientLight2);
Shoe3.add(ambientLight3);

renderer1.setSize(canvas1.clientWidth, canvas1.clientHeight, false);
renderer2.setSize(canvas2.clientWidth, canvas2.clientHeight, false);
renderer3.setSize(canvas3.clientWidth, canvas3.clientHeight, false);

camera1.position.z = 0.35;
camera1.position.x = 0.10; 
camera1.position.y = 0.25;

camera2.position.z = .030;
camera2.position.x = -.20;
camera2.position.y = 0.15;

camera3.position.y = 2.312342644285457;
camera3.position.z = 0.39994557505145324;
camera3.position.x = -3.2744101142760904;


const modelPath1 = '/shoevieww/shoe_models/nike_air_max_skor/scene.gltf';
const modelPath2 = '/shoevieww/shoe_models/nike_sb_charge_cnvs/scene.gltf';
const modelPath3 = '/shoevieww/shoe_models/nike_shoe/scene.gltf';

const loader = new GLTFLoader();

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(100,0,10);
Shoe1.add(light);
Shoe2.add(light.clone());
Shoe3.add(light.clone());

const textureLoader = new TextureLoader();
const texture = textureLoader.load('/shoevieww/shoe_models/nike_air_max_skor/textures/NikeAirMaxSkor_100k_tex_fix_u1_v1_diffuse.png'); 

loader.load(
  modelPath1,
  function (gltf) {
    gltf.scene.traverse(function (node) {
      if (node.isMesh) {
        node.material.map = texture;
      }
    });
    Shoe1.add(gltf.scene);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

loader.load(
  modelPath2,
  function (gltf) {
    Shoe2.add(gltf.scene);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

loader.load(
  modelPath3,
  function (gltf) {
    Shoe3.add(gltf.scene);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

const controls1 = new OrbitControls(camera1, renderer1.domElement);
const controls2 = new OrbitControls(camera2, renderer2.domElement);
const controls3 = new OrbitControls(camera3, renderer3.domElement);

controls1.enablePan = true;
controls2.enablePan = true;
controls3.enablePan = true;

function logCameraPosition(camera) {
  console.log(`Camera Position: x = ${camera.position.x}, y = ${camera.position.y}, z = ${camera.position.z}`);
}

function animate() {
  if (canvas1.width !== canvas1.clientWidth || canvas1.height !== canvas1.clientHeight) {
    renderer1.setSize(canvas1.clientWidth, canvas1.clientHeight, false);
    camera1.aspect = canvas1.clientWidth / canvas1.clientHeight;
    camera1.updateProjectionMatrix();
  }
  if (canvas2.width !== canvas2.clientWidth || canvas2.height !== canvas2.clientHeight) {
    renderer2.setSize(canvas2.clientWidth, canvas2.clientHeight, false);
    camera2.aspect = canvas2.clientWidth / canvas2.clientHeight;
    camera2.updateProjectionMatrix();
  }
  if (canvas3.width !== canvas3.clientWidth || canvas3.height !== canvas3.clientHeight) {
    renderer3.setSize(canvas3.clientWidth, canvas3.clientHeight, false);
    camera3.aspect = canvas3.clientWidth / canvas3.clientHeight;
    camera3.updateProjectionMatrix();
  }

  renderer1.render(Shoe1, camera1);
  renderer2.render(Shoe2, camera2);
  renderer3.render(Shoe3, camera3);

  requestAnimationFrame(animate);
}
animate();

// //changeing the background on click

// let colors = ['red', 'blue', 'yellow', 'purple'];
// let pixelSize = 10;
// let intervalId;
// let radius = 1;
// let color = getRandomItem(colors); 
// let time = 1000;

// background.addEventListener('click', (event) => {
//   const mouseX = event.clientX;
//   const mouseY = event.clientY;

//   if (intervalId) {
//     clearInterval(intervalId);
//   }

//   changePixelsAround(mouseX, mouseY, radius);

//   intervalId = setInterval(() => {
//     radius++;
//     changePixelsAround(mouseX, mouseY, radius);
//   }, time);
// });

// function changePixelsAround(x, y, radius) {
//   for (let i = -radius; i <= radius; i++) {
//     for (let j = -radius; j <= radius; j++) {
//       const pixel = document.createElement('div');
//       pixel.style.position = 'absolute';
//       pixel.style.left = `${x + i * pixelSize}px`;
//       pixel.style.top = `${y + j * pixelSize}px`;
//       pixel.style.width = `${pixelSize}px`;
//       pixel.style.height = `${pixelSize}px`;
//       pixel.style.backgroundColor = color;
//       background.appendChild(pixel);
//     }
//   }
// }

// function getRandomItem(arr) {
//   const randomIndex = Math.floor(Math.random() * arr.length);
//   const item = arr[randomIndex];
//   return item;
// }
