import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xCBEFFF, 1);

document.body.appendChild(renderer.domElement);

// Додаємо освітлення
const lightOne = new THREE.AmbientLight(0xffffff, 0.5); // М'яке загальне освітлення
scene.add(lightOne);

const lightTwo = new THREE.PointLight(0xffffff, 1.0); // Збільшуємо інтенсивність точкового світла
lightTwo.position.set(-1.5, 1, -1); // Піднімаємо світло вгору
scene.add(lightTwo);

const light3 = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(light3);

// Налаштовуємо камеру
camera.position.set(0, 1, 3); // Піднімаємо камеру вгору і відсуваємо
camera.lookAt(0, 0, 0); // Направляємо камеру на центр сцени

const progress = document.getElementById("progress");

const loader = new GLTFLoader();

loader.load(
    'https://threejs.org/examples/models/gltf/Duck/glTF/Duck.gltf',
    function (gltf) {
        console.log(gltf); // Перевіряємо, чи модель завантажилася
        scene.add(gltf.scene);
        gltf.scene.rotation.set(0, -Math.PI / 2, 0); // Поворот моделі
        gltf.scene.position.set(0, 0, 0); // Центруємо модель
        gltf.scene.scale.set(0.5, 0.5, 0.5); // Масштабуємо модель
    },
    function (xhr) {
        progress.innerHTML = (xhr.loaded / xhr.total * 100) + '% loaded';
        if (xhr.loaded == xhr.total)
            progress.innerHTML = "";
    },
    function (error) {
        console.error(error); // Логуємо помилки, якщо вони є
    }
);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
