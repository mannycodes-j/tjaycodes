import { Footer } from "./components/Footer";
import "./App.css";

import FollowingFluidAmoeba from "./components/woodsprite3";
import OrbitalRingLast from "./components/woodspritelast";
import { useScrollInertia } from "./hooks/useScrollInertia";
import { Header } from "./components/header";
import { useRef } from "react";
import logo from "../src/assets/logobig.svg";
import { Apple } from "iconsax-reactjs";
import { TypingEffect } from "./components/typingeffect";

function App() {
  const ref = useScrollInertia(0.025, 0.008);
  const heroParticleRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <Header />
      <div ref={ref} className="scroll-animate">
        <section ref={heroParticleRef}>
          <div className="flex justify-center items-center h-dvh relative z-10">
            <div className=" flex flex-col justify-center items-center">
              <img src={logo} alt="logo" />
              <div className=" mx-8 mt-8 mb-16 text-center">
                <h1 className=" text-5xl font-[450] leading-14">
                  <span className=" block text-[#121317]">
                    Experience liftoff
                  </span>
                  <span className=" text-[2rem] text-[#45474d] block">
                    with the next-generation IDE
                  </span>
                </h1>
              </div>
              <div className=" flex flex-col gap-1 justify-center items-center">
                <button className=" bg-[#121317] text-white text-lg font-[430] inline-flex py-2.5 px-6 border border-transparent rounded-full transition-all duration-150 ease-out items-center hover:bg-[#2f3034] cursor-pointer">
                  <Apple
                    color="#ffffff"
                    variant="Bold"
                    className=" mr-2"
                    size={20}
                  />{" "}
                  Download for MacOS{" "}
                </button>
                <button className=" bg-[#b7bfd91a] text-[#121317] text-lg font-[430] inline-flex py-2.5 px-6 border border-[#2122260f] rounded-full transition-all duration-150 ease-out items-center hover:bg-[#f0f1f5] cursor-pointer backdrop-blur-2xl">
                  Explore use cases
                </button>
              </div>
            </div>
          </div>
          <OrbitalRingLast
            particleCount={400}
            innerRadius={1.5}
            breathAmount={0}
            breathSpeed={0}
            wrapper={heroParticleRef as React.RefObject<HTMLDivElement>}
          />
        </section>

        <section className=" py-12">
          <div className=" w-full aspect-video px-4">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/SVCBA-pBgt0?si=cQTNSKchYHzfTHqN"
              title="YouTube video player"
              // frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="aspect-video rounded-4xl"
            ></iframe>
          </div>
        </section>

        <section className=" pt-10 pb-20 px-7">
          <TypingEffect
            text="Google Antigravity is our agentic development platform, evolving the IDE into the agent-first era."
            className="text-[28px] font-normal"
            cursorSpeed={400}
          />
        </section>
        {/* <OrbitalRing particleCount={200} /> */}
        {/* <FollowingFluidAmoeba particleCount={200} /> */}

        <Footer />
      </div>
    </>
  );
}

export default App;

// import { useEffect, useRef } from "react";
// import * as THREE from "three";

// // Woodsprite React component (TypeScript + three.js)
// // Refined to use distinct particles (PointsMaterial) and ensure single canvas rendering.

// type Props = {
//     width?: number;
//     height?: number;
//     particleCount?: number; // number of visible particles (countable)
//     baseRadius?: number; // radius of the sphere
//     breathSpeed?: number; // cycles per second multiplier
//     breathAmount?: number; // max radial expansion fraction (e.g. 0.08 = 8%)
// };

// export default function Woodsprite({
//     width = 800,
//     height = 600,
//     particleCount = 120,
//     baseRadius = 0.75,
//     breathSpeed = 0.6,
//     breathAmount = 0.09,
// }: Props) {
//     const containerRef = useRef<HTMLDivElement | null>(null);
//     const animationRef = useRef<number | null>(null);

//     useEffect(() => {
//         if (!containerRef.current) return;

//         // Clean up any existing canvas to prevent duplicates
//         while (containerRef.current.firstChild) {
//             containerRef.current.removeChild(containerRef.current.firstChild);
//         }

//         const canvas = document.createElement("canvas");
//         containerRef.current.appendChild(canvas);

//         const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
//         renderer.setSize(width, height);
//         renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

//         const scene = new THREE.Scene();
//         const camera = new THREE.PerspectiveCamera(50, width / height, 0.01, 100);
//         camera.position.z = 3.5;

//         const group = new THREE.Group();
//         scene.add(group);

//         // Generate a simple circle texture for distinct particles
//         const getTexture = () => {
//             const size = 32;
//             const c = document.createElement("canvas");
//             c.width = size;
//             c.height = size;
//             const ctx = c.getContext("2d");
//             if (ctx) {
//                 const center = size / 2;
//                 ctx.beginPath();
//                 ctx.arc(center, center, center * 0.4, 0, Math.PI * 2); // Distinct circle
//                 ctx.fillStyle = "rgba(255, 255, 255, 1)";
//                 ctx.fill();

//                 // Optional: soft glow around it
//                 const grad = ctx.createRadialGradient(center, center, center * 0.4, center, center, center);
//                 grad.addColorStop(0, "rgba(255, 255, 255, 0.2)");
//                 grad.addColorStop(1, "rgba(255, 255, 255, 0)");
//                 ctx.fillStyle = grad;
//                 ctx.fill();
//             }
//             const t = new THREE.Texture(c);
//             t.needsUpdate = true;
//             return t;
//         };

//         const texture = getTexture();

//         // Buffer attributes
//         const total = particleCount;
//         const basePositions = new Float32Array(total * 3);
//         const positions = new Float32Array(total * 3);
//         const colors = new Float32Array(total * 3);
//         const sizes = new Float32Array(total);
//         const phase = new Float32Array(total);

//         const colorA = new THREE.Color("#7afcff");
//         const colorB = new THREE.Color("#8affc2");

//         for (let i = 0; i < total; i++) {
//             const u = Math.random();
//             const v = Math.random();
//             const theta = 2 * Math.PI * u;
//             const phi = Math.acos(2 * v - 1);

//             const r = baseRadius * (0.92 + Math.random() * 0.16);
//             const x = r * Math.sin(phi) * Math.cos(theta);
//             const y = r * Math.sin(phi) * Math.sin(theta);
//             const z = r * Math.cos(phi);

//             basePositions[i * 3] = x;
//             basePositions[i * 3 + 1] = y;
//             basePositions[i * 3 + 2] = z;

//             positions[i * 3] = x;
//             positions[i * 3 + 1] = y;
//             positions[i * 3 + 2] = z;

//             const c = colorA.clone().lerp(colorB, Math.random() * 0.6);
//             colors[i * 3] = c.r;
//             colors[i * 3 + 1] = c.g;
//             colors[i * 3 + 2] = c.b;

//             // sizes: uniform but slightly varied
//             sizes[i] = 1.0;

//             phase[i] = Math.random() * Math.PI * 2;
//         }

//         const geometry = new THREE.BufferGeometry();
//         geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
//         geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
//         // We don't need 'size' attribute for PointsMaterial unless we use a shader,
//         // but we can keep it if we want to switch back later.
//         // For PointsMaterial, size is global, but we can't easily do per-particle size without a shader.
//         // The user asked for "distinct particles", so uniform size is usually fine or we use the shader.
//         // BUT the user specifically said "instead of that shader".
//         // So we will use standard PointsMaterial.
//         // Note: Standard PointsMaterial does NOT support per-vertex size.
//         // If we want distinct particles with varying sizes, we NEED a shader or multiple systems.
//         // However, the user said "distinct particles" which might just mean "crisp dots".
//         // I'll stick to PointsMaterial with a global size.

//         const material = new THREE.PointsMaterial({
//             map: texture,
//             size: 0.12, // Global size
//             sizeAttenuation: true,
//             vertexColors: true,
//             transparent: true,
//             opacity: 0.9,
//             blending: THREE.AdditiveBlending,
//             depthWrite: false,
//         });

//         const points = new THREE.Points(geometry, material);
//         group.add(points);

//         const target = new THREE.Vector3(0, 0, 0);
//         const spritePos = new THREE.Vector3(0, 0, 0);

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
//             const dt = (now - lastTime) * 0.001;
//             lastTime = now;

//             spritePos.lerp(target, 0.07);
//             group.position.copy(spritePos);

//             group.rotation.y += 0.06 * dt;
//             group.rotation.z += 0.02 * dt;

//             const breathPhase = t * breathSpeed * Math.PI * 2;
//             const breathNorm = (1 - Math.cos(breathPhase)) * 0.5;
//             const globalScale = 1 + breathAmount * breathNorm;

//             const posAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
//             const posArray = posAttr.array as Float32Array;

//             for (let i = 0; i < total; i++) {
//                 const bx = basePositions[i * 3];
//                 const by = basePositions[i * 3 + 1];
//                 const bz = basePositions[i * 3 + 2];

//                 let x = bx * globalScale;
//                 let y = by * globalScale;
//                 let z = bz * globalScale;

//                 const w = 0.01;
//                 const p = phase[i];
//                 x += Math.sin(t * (0.7 + (i % 7) * 0.01) + p) * w;
//                 y += Math.cos(t * (0.75 + (i % 5) * 0.01) + p * 1.1) * w;
//                 z += Math.sin(t * (0.9 + (i % 11) * 0.01) + p * 0.7) * w;

//                 posArray[i * 3] = x;
//                 posArray[i * 3 + 1] = y;
//                 posArray[i * 3 + 2] = z;
//             }

//             posAttr.needsUpdate = true;

//             const breatheScale = 1 + breathAmount * 0.35 * breathNorm;
//             group.scale.set(breatheScale, breatheScale, breatheScale);

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
//     }, [width, height, particleCount, baseRadius, breathSpeed, breathAmount]);

//     return (
//         <div
//             ref={containerRef}
//             style={{ width: width, height: height, touchAction: "none", display: "block" }}
//         />
//     );
// }

// latest

// import { useEffect, useRef } from "react";
// import * as THREE from "three";

// // Woodsprite React component (TypeScript + three.js)
// // Enhanced with organic movement, imperfect sphere shape, and ripple effects.

// // Define the props interface for the Woodsprite component
// type Props = {
//     width?: number;
//     height?: number;
//     particleCount?: number;
//     baseRadius?: number;
//     breathSpeed?: number;
//     breathAmount?: number;
// };

// // Main Woodsprite component function with default parameter values
// export default function Woodsprite({
//     width = 800,
//     height = 600,
//     particleCount = 160, // Increased slightly for better density
//     baseRadius = 0.75,
//     breathSpeed = 0.4, // Slower, more organic breathing
//     breathAmount = 0.15, // More pronounced breathing
// }: Props) {
//     // Refs to store DOM element and animation frame ID
//     const containerRef = useRef<HTMLDivElement | null>(null);
//     const animationRef = useRef<number | null>(null);

//     // Main useEffect hook that runs when component mounts or dependencies change
//     useEffect(() => {
//         // Early return if container ref is not set
//         if (!containerRef.current) return;

//         // Clean up any existing canvas elements before creating new one
//         while (containerRef.current.firstChild) {
//             containerRef.current.removeChild(containerRef.current.firstChild);
//         }

//         // Create canvas element for Three.js rendering
//         const canvas = document.createElement("canvas");
//         containerRef.current.appendChild(canvas);

//         // Initialize Three.js WebGL renderer with transparency and antialiasing
//         const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
//         renderer.setSize(width, height);
//         renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

//         // Create scene and camera
//         const scene = new THREE.Scene();
//         const camera = new THREE.PerspectiveCamera(50, width / height, 0.01, 100);
//         camera.position.z = 3.5; // Position camera back from scene

//         // Create main group to hold all particles
//         const group = new THREE.Group();
//         scene.add(group);

//         // Function to generate particle texture with radial gradient
//         const getTexture = () => {
//             const size = 32; // Texture size in pixels
//             const c = document.createElement("canvas");
//             c.width = size;
//             c.height = size;
//             const ctx = c.getContext("2d");
//             if (ctx) {
//                 const center = size / 2;
//                 // Draw solid circle in center
//                 ctx.beginPath();
//                 ctx.arc(center, center, center * 0.4, 0, Math.PI * 2);
//                 ctx.fillStyle = "rgba(255, 255, 255, 1)";
//                 ctx.fill();

//                 // Add radial gradient for soft edges
//                 const grad = ctx.createRadialGradient(center, center, center * 0.4, center, center, center);
//                 grad.addColorStop(0, "rgba(255, 255, 255, 0.2)");
//                 grad.addColorStop(1, "rgba(255, 255, 255, 0)");
//                 ctx.fillStyle = grad;
//                 ctx.fill();
//             }
//             const t = new THREE.Texture(c);
//             t.needsUpdate = true; // Mark texture for update
//             return t;
//         };

//         const texture = getTexture();

//         // Initialize arrays for particle data storage
//         const total = particleCount;
//         const basePositions = new Float32Array(total * 3); // Original positions
//         const positions = new Float32Array(total * 3);     // Current positions (animated)
//         const colors = new Float32Array(total * 3);        // Particle colors
//         const phase = new Float32Array(total);             // Phase offsets for individual animation
//         const speeds = new Float32Array(total);            // Individual movement speeds

//         // Define color palette for particles
//         const colorA = new THREE.Color("#7afcff"); // Light blue
//         const colorB = new THREE.Color("#8affc2"); // Light green

//         // Generate particles with spherical distribution and organic variations
//         for (let i = 0; i < total; i++) {
//             // Generate random spherical coordinates
//             const u = Math.random();
//             const v = Math.random();
//             const theta = 2 * Math.PI * u; // Azimuth angle (around vertical axis)

//             // Polar angle with bias toward top hemisphere (cut off bottom)
//             const phi = Math.acos(2 * v - 1) * 0.65;

//             // Start with base radius, then add organic distortions
//             let r = baseRadius;
//             // Create lumpy, non-spherical shape using multiple sine waves
//             const nx = Math.sin(theta * 3) * Math.cos(phi * 3);
//             const ny = Math.cos(theta * 2) * Math.sin(phi * 4);
//             r += (nx + ny) * 0.15 * baseRadius; // Apply distortion
//             r *= 0.9 + Math.random() * 0.2;     // Add random size variation

//             // Transform spherical coordinates to Cartesian with flattening and spreading
//             const spread = 1.6;  // Horizontal spread factor
//             const flatten = 0.7; // Vertical flattening factor

//             const x = r * Math.sin(phi) * Math.cos(theta) * spread;
//             const y = r * Math.cos(phi) * flatten - (baseRadius * 0.2); // Shift downward
//             const z = r * Math.sin(phi) * Math.sin(theta) * spread;

//             // Store base and current positions
//             basePositions[i * 3] = x;
//             basePositions[i * 3 + 1] = y;
//             basePositions[i * 3 + 2] = z;

//             positions[i * 3] = x;
//             positions[i * 3 + 1] = y;
//             positions[i * 3 + 2] = z;

//             // Assign random color between colorA and colorB
//             const c = colorA.clone().lerp(colorB, Math.random() * 0.6);
//             colors[i * 3] = c.r;
//             colors[i * 3 + 1] = c.g;
//             colors[i * 3 + 2] = c.b;

//             // Set random phase and speed for individual particle animation
//             phase[i] = Math.random() * Math.PI * 2;
//             speeds[i] = 0.5 + Math.random() * 0.5;
//         }

//         // Create geometry and set up buffer attributes
//         const geometry = new THREE.BufferGeometry();
//         geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
//         geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

//         // Configure particle material with additive blending for glowing effect
//         const material = new THREE.PointsMaterial({
//             map: texture,
//             size: 0.14,
//             sizeAttenuation: true,
//             vertexColors: true,
//             transparent: true,
//             opacity: 0.85,
//             blending: THREE.AdditiveBlending, // Creates glowing, ethereal effect
//             depthWrite: false, // Improves transparency rendering
//         });

//         // Create points system and add to group
//         const points = new THREE.Points(geometry, material);
//         group.add(points);

//         // Animation control variables
//         const target = new THREE.Vector3(0, 0, 0);     // Mouse target position
//         const spritePos = new THREE.Vector3(0, 0, 0);  // Current sprite position
//         const velocity = new THREE.Vector3(0, 0, 0);   // For trailing/smearing effect

//         // Mouse/touch movement handler
//         function onPointerMove(e: PointerEvent) {
//             const rect = renderer.domElement.getBoundingClientRect();
//             // Convert screen coordinates to normalized device coordinates (-1 to +1)
//             const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
//             const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

//             // Convert to 3D world coordinates
//             const vec = new THREE.Vector3(x, y, 0.5);
//             vec.unproject(camera);
//             const dir = vec.sub(camera.position).normalize();
//             const distance = -camera.position.z / dir.z;
//             const pos = camera.position.clone().add(dir.multiplyScalar(distance));
//             target.copy(pos);
//         }
//         window.addEventListener("pointermove", onPointerMove);

//         // Animation timing variables
//         let lastTime = performance.now();

//         // Main animation loop
//         function animate() {
//             const now = performance.now();
//             const t = now * 0.001; // Convert to seconds
//             const dt = Math.min((now - lastTime) * 0.001, 0.1); // Delta time, capped for stability
//             lastTime = now;

//             // Add organic hovering drift to target position
//             const drift = new THREE.Vector3(
//                 Math.sin(t * 0.5) * 0.1,  // X drift
//                 Math.cos(t * 0.3) * 0.1,  // Y drift
//                 Math.sin(t * 0.4) * 0.05  // Z drift
//             );
//             const targetWithDrift = target.clone().add(drift);

//             // Smooth interpolation toward target (creates floaty movement)
//             const lerpFactor = 0.03; // Lower = more floaty
//             spritePos.lerp(targetWithDrift, lerpFactor);

//             // Calculate velocity for trailing effect
//             const currentVel = targetWithDrift.clone().sub(spritePos).multiplyScalar(2.0);
//             velocity.lerp(currentVel, 0.1);

//             // Update group position
//             group.position.copy(spritePos);

//             // Apply continuous rotation for organic movement
//             group.rotation.y += 0.05 * dt;
//             group.rotation.z += 0.01 * dt;

//             // Calculate breathing animation (pulsing scale)
//             const breathPhase = t * breathSpeed * Math.PI * 2;
//             const breathNorm = (1 - Math.cos(breathPhase)) * 0.5; // 0 to 1 oscillation
//             const globalScale = 1 + breathAmount * breathNorm;

//             // Get reference to position attribute for animation
//             const posAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
//             const posArray = posAttr.array as Float32Array;

//             // Animate each particle individually
//             for (let i = 0; i < total; i++) {
//                 // Get base position
//                 const bx = basePositions[i * 3];
//                 const by = basePositions[i * 3 + 1];
//                 const bz = basePositions[i * 3 + 2];

//                 // 1. Apply global breathing scale
//                 let x = bx * globalScale;
//                 let y = by * globalScale;
//                 let z = bz * globalScale;

//                 // 2. Apply ripple/wave effect (like water droplets)
//                 const dist = Math.sqrt(x * x + y * y + z * z); // Distance from center
//                 const rippleFreq = 4.0;   // Ripple frequency
//                 const rippleSpeed = 2.0;  // Ripple animation speed
//                 const rippleAmp = 0.05;   // Ripple amplitude
//                 // Create propagating wave based on distance and time
//                 const wave = Math.sin(dist * rippleFreq - t * rippleSpeed + phase[i]);

//                 // Directional ripple (vertical movement)
//                 const dirRipple = Math.sin(y * 3.0 + t * 1.5) * 0.03;

//                 // Apply ripple effects
//                 x += x * wave * rippleAmp;
//                 y += y * wave * rippleAmp + dirRipple;
//                 z += z * wave * rippleAmp;

//                 // 3. Individual particle floating animation
//                 const p = phase[i];
//                 const floatAmp = 0.02;
//                 // Each particle floats independently with its own phase and speed
//                 x += Math.sin(t * speeds[i] + p) * floatAmp;
//                 y += Math.cos(t * speeds[i] * 0.8 + p) * floatAmp;
//                 z += Math.sin(t * speeds[i] * 1.2 + p) * floatAmp;

//                 // 4. Velocity-based trailing effect (smearing in movement direction)
//                 x -= velocity.x * 0.1 * (1 + Math.random() * 0.5);
//                 y -= velocity.y * 0.1 * (1 + Math.random() * 0.5);
//                 z -= velocity.z * 0.1 * (1 + Math.random() * 0.5);

//                 // Update particle position
//                 posArray[i * 3] = x;
//                 posArray[i * 3 + 1] = y;
//                 posArray[i * 3 + 2] = z;
//             }

//             // Mark position attribute as needing update
//             posAttr.needsUpdate = true;

//             // Apply additional breathing scale to entire group
//             const breatheScale = 1 + breathAmount * 0.2 * breathNorm;
//             group.scale.set(breatheScale, breatheScale, breatheScale);

//             // Render the scene
//             renderer.render(scene, camera);
//             // Request next animation frame
//             animationRef.current = requestAnimationFrame(animate);
//         }

//         // Start animation loop
//         animate();

//         // Handle window/resize events
//         function handleResize() {
//             const w = containerRef.current?.clientWidth || width;
//             const h = containerRef.current?.clientHeight || height;
//             renderer.setSize(w, h);
//             camera.aspect = w / h;
//             camera.updateProjectionMatrix();
//         }

//         // Set up resize observer for responsive behavior
//         const ro = new ResizeObserver(handleResize);
//         ro.observe(containerRef.current);

//         // Cleanup function when component unmounts or dependencies change
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
//     }, [width, height, particleCount, baseRadius, breathSpeed, breathAmount]);

//     // Render container div that will host the Three.js canvas
//     return (
//         <div
//             ref={containerRef}
//             style={{ width: width, height: height, touchAction: "none", display: "block" }}
//         />
//     );
// }
