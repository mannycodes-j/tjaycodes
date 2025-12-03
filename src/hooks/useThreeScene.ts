import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const useThreeScene = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const frameIdRef = useRef<number>(0);

    useEffect(() => {
        if (!containerRef.current) return;

        // Initialize Scene
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        // Initialize Camera
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.z = 50;
        cameraRef.current = camera;

        // Initialize Renderer
        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: "high-performance"
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for performance
        containerRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Handle Resize
        const handleResize = () => {
            if (!cameraRef.current || !rendererRef.current) return;

            cameraRef.current.aspect = window.innerWidth / window.innerHeight;
            cameraRef.current.updateProjectionMatrix();
            rendererRef.current.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(frameIdRef.current);

            if (containerRef.current && rendererRef.current) {
                containerRef.current.removeChild(rendererRef.current.domElement);
            }

            if (rendererRef.current) {
                rendererRef.current.dispose();
            }
        };
    }, []);

    return {
        containerRef,
        sceneRef,
        cameraRef,
        rendererRef,
        frameIdRef
    };
};




// import { useEffect, useRef } from "react";
// import * as THREE from "three";

// // Combined Component: "OrbitalRing"
// // Features: 
// // - Component 1: Donut/Annulus shape distribution
// // - Component 2: Soft particles, organic ripple animation, mouse trailing, additive blending
// // - Update: Switched to InstancedMesh for particle rotation

// type Props = {
//     width?: number;
//     height?: number;
//     particleCount?: number;
//     innerRadius?: number; // Size of the "hole"
//     outerRadius?: number; // Size of the total ring
//     breathSpeed?: number;
//     breathAmount?: number;
// };

// export default function OrbitalRingLast({
//     width = window.innerWidth,
//     height = window.innerHeight,
//     particleCount = 900, // Increased count to define the ring shape better 120
//     innerRadius = 1.5,    // Scaled down from Comp 1's "10" to fit Comp 2's camera
//     outerRadius = 3.5,    // Scaled down from Comp 1's "30"
//     breathSpeed = 0.3,
//     breathAmount = 0.1,
// }: Props) {
//     const containerRef = useRef<HTMLDivElement | null>(null);
//     const animationRef = useRef<number | null>(null);

//     useEffect(() => {
//         if (!containerRef.current) return;

//         // Cleanup previous
//         while (containerRef.current.firstChild) {
//             containerRef.current.removeChild(containerRef.current.firstChild);
//         }

//         // 1. Setup Renderer & Scene (From Comp 2)
//         const canvas = document.createElement("canvas");
//         containerRef.current.appendChild(canvas);

//         const renderer = new THREE.WebGLRenderer({
//             canvas,
//             alpha: true, // Transparent background 
//             antialias: true
//         });
//         renderer.setSize(width, height);
//         renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

//         const scene = new THREE.Scene();

//         // Camera setup (Using Comp 2's scale logic, but pulled back slightly to see the whole ring)
//         const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
//         camera.position.z = 8;

//         const group = new THREE.Group();
//         scene.add(group);

//         // 2. Create Texture (From Comp 2 - Soft Glow)
//         const getTexture = () => {
//             const size = 64; // Increased size for better resolution on planes
//             const c = document.createElement("canvas");
//             c.width = size;
//             c.height = size;
//             const ctx = c.getContext("2d");
//             if (ctx) {
//                 const centerX = size / 2;
//                 const centerY = size / 2;

//                 // Draw a rounded rectangle
//                 const w = size * 0.1;
//                 const h = size * 0.2;
//                 const x = centerX - w / 2;
//                 const y = centerY - h / 2;
//                 const radius = size * 0.01; // Corner radius


//                 ctx.fillStyle = "rgba(255, 255, 255, 1)";
//                 ctx.beginPath();
//                 ctx.moveTo(x + radius, y);
//                 ctx.lineTo(x + w - radius, y);
//                 ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
//                 ctx.lineTo(x + w, y + h - radius);
//                 ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
//                 ctx.lineTo(x + radius, y + h);
//                 ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
//                 ctx.lineTo(x, y + radius);
//                 ctx.quadraticCurveTo(x, y, x + radius, y);
//                 ctx.closePath();
//                 ctx.fill();
//             }
//             const t = new THREE.Texture(c);
//             t.needsUpdate = true;
//             return t;
//         };

//         const texture = getTexture();

//         // 3. Geometry Generation (From Comp 1 - The Donut Shape)
//         // We adapt Component 1's math to fit Component 2's data structures
//         const total = particleCount;

//         // Use PlaneGeometry for InstancedMesh to allow rotation
//         const geometry = new THREE.PlaneGeometry(0.2, 0.2); // Base size, will be scaled
//         const material = new THREE.MeshBasicMaterial({
//             map: texture,
//             transparent: true,
//             opacity: 0.9,
//             blending: THREE.AdditiveBlending,
//             depthWrite: false,
//             side: THREE.DoubleSide
//         });

//         const instancedMesh = new THREE.InstancedMesh(geometry, material, total);
//         group.add(instancedMesh);

//         const basePositions = new Float32Array(total * 3);
//         const phase = new Float32Array(total);
//         const speeds = new Float32Array(total);

//         // Using Comp 1's Blue, but mixing with Comp 2's Teal for a nicer gradient
//         const colorA = new THREE.Color("#4285F4"); // Comp 1 Blue
//         const colorB = new THREE.Color("#7afcff"); // Comp 2 Cyan

//         const dummy = new THREE.Object3D();

//         for (let i = 0; i < total; i++) {
//             // --- SHAPE LOGIC FROM COMPONENT 1 ---
//             // const theta = Math.random() * Math.PI * 2;
//             const theta = Math.random() * Math.PI * 12;


//             // Random radius between inner and outer (The "Donut" meat)
//             // Comp 1 Logic: const r = 10 + Math.random() * 20;
//             // Adapted Logic:
//             const r = innerRadius + Math.random() * (outerRadius - innerRadius);

//             const x = r * Math.cos(theta);
//             const y = r * Math.sin(theta);

//             // Random Z depth (Comp 1: (Math.random() - 0.5) * 10)
//             // We scale it down so it's not too thick
//             // const z = (Math.random() - 0.5) * 1.5;
//             const z = (Math.random() - 0.05) * 1.5;

//             // --- STORAGE LOGIC FROM COMPONENT 2 ---
//             basePositions[i * 3] = x;
//             basePositions[i * 3 + 1] = y;
//             basePositions[i * 3 + 2] = z;

//             // Color gradient based on angle (makes the ring look nicer)
//             const hueBlend = (Math.sin(theta) + 1) / 2; // 0 to 1 based on angle
//             const c = colorA.clone().lerp(colorB, hueBlend);
//             instancedMesh.setColorAt(i, c);

//             phase[i] = Math.random() * Math.PI * 2;
//             speeds[i] = 0.5 + Math.random() * 0.5;

//             // Initial dummy update
//             dummy.position.set(x, y, z);
//             dummy.updateMatrix();
//             instancedMesh.setMatrixAt(i, dummy.matrix);
//         }

//         instancedMesh.instanceMatrix.needsUpdate = true;

//         // 4. Interaction & Animation (From Comp 2)
//         const target = new THREE.Vector3(0, 0, 0);
//         const spritePos = new THREE.Vector3(0, 0, 0);
//         const velocity = new THREE.Vector3(0, 0, 0);

//         function onPointerMove(e: PointerEvent) {
//             const rect = renderer.domElement.getBoundingClientRect();
//             const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
//             const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

//             const vec = new THREE.Vector3(x, y, 0.5);
//             vec.unproject(camera);
//             const dir = vec.sub(camera.position).normalize();
//             const distance = -camera.position.z / dir.z;
//             const pos = camera.position.clone().add(dir.multiplyScalar(distance));
//             target.copy(pos);
//         }
//         window.addEventListener("pointermove", onPointerMove);

//         let lastTime = performance.now();

//         function animate() {
//             const now = performance.now();
//             const t = now * 0.001;
//             const dt = Math.min((now - lastTime) * 0.001, 0.1);
//             lastTime = now;

//             // Mouse Following Logic (Comp 2)
//             const drift = new THREE.Vector3(
//                 Math.sin(t * 0.5) * 0.1,
//                 Math.cos(t * 0.3) * 0.1,
//                 Math.sin(t * 0.4) * 0.05
//             );
//             const targetWithDrift = target.clone().add(drift);
//             spritePos.lerp(targetWithDrift, 0.009); // Smooth follow

//             // Trailing Logic
//             const currentVel = targetWithDrift.clone().sub(spritePos).multiplyScalar(1.0);
//             velocity.lerp(currentVel, 0.001);

//             group.position.copy(spritePos);

//             // Rotation (Comp 2 + Comp 1 auto-rotation styles mixed)
//             group.rotation.z += 0.001; // Rotate the ring like a wheel
//             group.rotation.x = Math.sin(t * 0.2) * 0.1; // Slight tilt
//             group.rotation.y = Math.cos(t * 0.2) * 0.1;

//             // Breath Calculation
//             const breathPhase = t * breathSpeed * Math.PI * 2;
//             const breathNorm = (1 - Math.cos(breathPhase)) * 0.5;
//             const globalScale = 1 + breathAmount * breathNorm;

//             for (let i = 0; i < total; i++) {
//                 const bx = basePositions[i * 3];
//                 const by = basePositions[i * 3 + 1];
//                 const bz = basePositions[i * 3 + 2];

//                 let x = bx * globalScale;
//                 let y = by * globalScale;
//                 let z = bz * globalScale;

//                 // Ripple Effect (Comp 2)
//                 // In a ring, distance is radius. This creates waves radiating outward.
//                 const dist = Math.sqrt(x * x + y * y + z * z);
//                 const rippleFreq = 3.0;
//                 const rippleSpeed = 2.0;
//                 const rippleAmp = 0.2;
//                 const wave = Math.sin(dist * rippleFreq - t * rippleSpeed + phase[i]);

//                 x += x * wave * rippleAmp;
//                 y += y * wave * rippleAmp;
//                 z += z * wave * rippleAmp;

//                 // Individual Float
//                 const p = phase[i];
//                 x += Math.sin(t * speeds[i] + p) * 0.05;
//                 y += Math.cos(t * speeds[i] * 0.8 + p) * 0.05;
//                 z += Math.sin(t * speeds[i] * 1.2 + p) * 0.05;

//                 // Drag/Trail Effect
//                 x -= velocity.x * 0.15 * (1 + Math.random() * 0.2);
//                 y -= velocity.y * 0.15 * (1 + Math.random() * 0.2);
//                 z -= velocity.z * 0.15 * (1 + Math.random() * 0.2);

//                 dummy.position.set(x, y, z);

//                 // --- ROTATION LOGIC START ---
//                 // Calculate the angle based on current 2D position (x, y)
//                 // This ensures the particle tilts to follow the circle's tangent
//                 const angle = Math.atan2(y, x);

//                 // Reset rotation
//                 dummy.rotation.set(0, 0, 0);

//                 // Apply tangential rotation (align with circumference)
//                 // +/- Math.PI/2 aligns the "top" of the rectangle to the flow direction
//                 dummy.rotation.z = angle + Math.PI / 2;

//                 // Optional: Add slight organic tilt on X/Y so they aren't perfectly flat
//                 dummy.rotation.x = (Math.sin(t + i) * 0.2);
//                 dummy.rotation.y = (Math.cos(t + i) * 0.2);
//                 // --- ROTATION LOGIC END ---

//                 dummy.updateMatrix();
//                 instancedMesh.setMatrixAt(i, dummy.matrix);
//             }

//             instancedMesh.instanceMatrix.needsUpdate = true;
//             renderer.render(scene, camera);
//             animationRef.current = requestAnimationFrame(animate);
//         }

//         animate();

//         function handleResize() {
//             const w = containerRef.current?.clientWidth || width;
//             const h = containerRef.current?.clientHeight || height;
//             renderer.setSize(w, h);
//             camera.aspect = w / h;
//             camera.updateProjectionMatrix();
//         }

//         const ro = new ResizeObserver(handleResize);
//         ro.observe(containerRef.current);

//         return () => {
//             if (animationRef.current) cancelAnimationFrame(animationRef.current);
//             window.removeEventListener("pointermove", onPointerMove);
//             ro.disconnect();
//             geometry.dispose();
//             material.dispose();
//             texture.dispose();
//             renderer.dispose();
//             if (containerRef.current && containerRef.current.contains(canvas)) {
//                 containerRef.current.removeChild(canvas);
//             }
//         };
//     }, [width, height, particleCount, innerRadius, outerRadius, breathSpeed, breathAmount]);

//     return (
//         <div
//             ref={containerRef}
//             style={{
//                 width: width,
//                 height: height,
//                 touchAction: "none",
//                 backgroundColor: "#050505" // Dark BG to show off the additive blending
//             }}
//         />
//     );
// }