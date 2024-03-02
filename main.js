import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.querySelector("#app").appendChild(renderer.domElement);

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  500
);
camera.position.set(-90, 140, 200);

// Orbit Controls
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();

// Textures
const textureLoader = new THREE.TextureLoader();
const cubeLoader = new THREE.CubeTextureLoader();
const starsTexture = cubeLoader.load([
  "img/stars.jpg",
  "img/stars.jpg",
  "img/stars.jpg",
  "img/stars.jpg",
  "img/stars.jpg",
  "img/stars.jpg",
]);
scene.background = starsTexture;

// Lights
const ambientLight = new THREE.AmbientLight(0x333333, 3);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 500, 300, 1);
pointLight.position.set(0, 0, 0);
pointLight.castShadow = true;
scene.add(pointLight);

// Sun
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(16, 30, 30),
  new THREE.MeshBasicMaterial({
    map: textureLoader.load("img/sun.jpg"),
  })
);
scene.add(sun);
pointLight.position.copy(sun.position);

// Mercury
const mercury = createPlanet("img/mercury.jpg", 3.2);
const mercuryObj = createPlanetOrbit(mercury, 28);
scene.add(mercuryObj);

// Venus
const venus = createPlanet("img/venus.jpg", 5.8);
const venusObj = createPlanetOrbit(venus, 44);
scene.add(venusObj);

// Earth
const earth = createPlanet("img/earth.jpg", 6);
const earthObj = createPlanetOrbit(earth, 62);
scene.add(earthObj);

// Mars
const mars = createPlanet("img/mars.jpg", 4);
const marsObj = createPlanetOrbit(mars, 78);
scene.add(marsObj);

// Jupiter
const jupiter = createPlanet("img/jupiter.jpg", 12);
const jupiterObj = createPlanetOrbit(jupiter, 100);
scene.add(jupiterObj);

//Saturn
const saturn = createPlanet("img/saturn.jpg", 10);
const saturnObj = createPlanetOrbit(saturn, 138);
const saturnRing = new THREE.Mesh(
  new THREE.RingGeometry(10, 20, 32),
  new THREE.MeshBasicMaterial({
    map: textureLoader.load("img/saturn ring.png"),
    side: THREE.DoubleSide,
  })
);
saturnRing.rotation.x = -Math.PI / 2;
saturnRing.position.x = 138;
saturnObj.add(saturnRing);
scene.add(saturnObj);

// Uranus
const uranus = createPlanet("img/uranus.jpg", 7);
const uranusObj = createPlanetOrbit(uranus, 176);
scene.add(uranusObj);

//Neptune
const neptune = createPlanet("img/neptune.jpg", 7);
const neptuneObj = createPlanetOrbit(neptune, 200);
scene.add(neptuneObj);

//pluto
const pluto = createPlanet("img/pluto.jpg", 2.8);
const plutoObj = createPlanetOrbit(pluto, 216);
scene.add(plutoObj);

// Animation
function animate() {
  requestAnimationFrame(animate);

  sun.rotation.y += 0.004;

  mercury.rotation.y += 0.004;
  mercuryObj.rotation.y += 0.04;

  venus.rotation.y += 0.002;
  venusObj.rotation.y += 0.015;

  earth.rotation.y += 0.02;
  earthObj.rotation.y += 0.01;

  mars.rotation.y += 0.018;
  marsObj.rotation.y += 0.008;

  jupiter.rotation.y += 0.04;
  jupiterObj.rotation.y += 0.002;

  saturn.rotation.y += 0.038;
  saturnObj.rotation.y += 0.0009;

  uranus.rotation.y += 0.03;
  uranusObj.rotation.y += 0.0004;

  neptune.rotation.y += 0.032;
  neptuneObj.rotation.y += 0.0001;

  pluto.rotation.y += 0.008;
  plutoObj.rotation.y += 0.00007;

  renderer.render(scene, camera);
}

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();

// Helper functions
function createPlanet(texturePath, radius) {
  const planet = new THREE.Mesh(
    new THREE.SphereGeometry(radius, 32, 32),
    new THREE.MeshStandardMaterial({ map: textureLoader.load(texturePath) })
  );
  planet.castShadow = true;
  planet.receiveShadow = true;
  return planet;
}

function createPlanetOrbit(planet, distance) {
  const planetObj = new THREE.Object3D();
  planetObj.add(planet);
  planet.position.x = distance;
  return planetObj;
}
