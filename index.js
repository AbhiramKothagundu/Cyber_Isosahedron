import * as THREE from "three";
import { OrbitControls } from "./node_modules/three/examples/jsm/controls/OrbitControls.js";

const w = window.innerWidth;
const h = window.innerHeight;
const fov = 75;
const near = 0.1;
const far = 100;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( fov, w/h, near, far );
const renderer = new THREE.WebGLRenderer({canvas: document.getElementById('bg') , antialias: true});
renderer.setSize(w, h);
renderer.setPixelRatio(window.devicePixelRatio);
camera.position.setZ(20);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.2;

const geo = new THREE.IcosahedronGeometry(6,2);
const mat = new THREE.MeshStandardMaterial({
    color : 0x2a2a2a,
    flatShading: true
})

const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

const wireMat = new THREE.MeshStandardMaterial({
    color : 0xffffff,
    wireframe: true
});
const wireMesh = new THREE.Mesh(geo, wireMat);
wireMesh.scale.setScalar(1.01);
mesh.add(wireMesh);

const donutGeo = new THREE.TorusGeometry(10,1.5,10,30);

const donutWireMat = new THREE.MeshStandardMaterial({
    color : 0xbababa,
    wireframe: true
});

const donutWireMesh = new THREE.Mesh(donutGeo, donutWireMat);
// scene.add(donutWireMesh);

const hemiLight = new THREE.HemisphereLight(0xff11aa, 0xaa11ff);
scene.add(hemiLight);

function animate() {
    requestAnimationFrame(animate);

    mesh.rotation.y +=  0.005;
    donutWireMesh.rotation.x += 0.002;
    donutWireMesh.rotation.z += 0.0005;
    donutWireMesh.rotation.y += -1* 0.02;

    renderer.render(scene, camera);
    controls.update();
}

animate();