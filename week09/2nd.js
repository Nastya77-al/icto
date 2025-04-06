import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Спробуємо імпортувати BufferGeometryUtils явно
import { BufferGeometryUtils } from 'three/addons/utils/BufferGeometryUtils.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xCBEFFF, 1);

document.body.appendChild(renderer.domElement);

var lightOne = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(lightOne);

var lightTwo = new THREE.PointLight(0xffffff, 0.5);
scene.add(lightTwo);
lightTwo.position.set(-1.5, 0, -1);

const light3 = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(light3);

camera.position.z = 3;

const progress = document.getElementById("progress");

const loader = new GLTFLoader();

loader.load(
    'https://threejs.org/examples/models/gltf/Duck/glTF/Duck.gltf',
    function (gltf) {
        console.log(gltf);
        scene.add(gltf.scene);
        gltf.scene.rotation.set(0, -Math.PI / 2, 0);
        gltf.scene.position.set(0, 0, 0); // Центруємо модель
        gltf.scene.scale.set(0.5, 0.5, 0.5); // Зменшуємо масштаб, щоб модель була видимою
    },
    function (xhr) {
        progress.innerHTML = (xhr.loaded / xhr.total * 100) + '% loaded';
        if (xhr.loaded == xhr.total)
            progress.innerHTML = "";
    },
    function (error) {
        console.error(error);
    }
);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
