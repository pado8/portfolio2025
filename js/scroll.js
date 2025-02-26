import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

gsap.registerPlugin(ScrollTrigger);

// Scene, Camera, Renderer 생성
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 3D 오브젝트 (큐브) 생성
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({ color: 0x00ffcc });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 5;

// 조명 추가
const light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(2, 2, 2);
scene.add(pointLight);

// OrbitControls 추가 (마우스로 회전 가능)
const controls = new OrbitControls(camera, renderer.domElement);

// 애니메이션 루프
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// GSAP ScrollTrigger를 사용하여 스크롤 이벤트 기반 3D 애니메이션 추가
ScrollTrigger.create({
  trigger: "#section4", // 마지막 섹션
  start: "top center",
  end: "bottom top",
  scrub: true,
  onUpdate: (self) => {
    cube.rotation.x = self.progress * Math.PI * 2;
    cube.rotation.y = self.progress * Math.PI * 2;
    cube.position.y = -self.progress * 2;
  }
});

// 반응형 처리
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
