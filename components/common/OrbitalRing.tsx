'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

type OrbitalRingProps = {
  width?: number
  height?: number
  particleCount?: number
  innerRadius?: number
  outerRadius?: number
  breathSpeed?: number
  breathAmount?: number
  wrapper?: React.RefObject<HTMLDivElement | null>
}

export default function OrbitalRing({
  width,
  height,
  particleCount = 900,
  innerRadius = 1.5,
  outerRadius = 3.5,
  breathSpeed = 0.3,
  breathAmount = 0.1,
  wrapper,
}: OrbitalRingProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const animationRef = useRef<number | null>(null)

  const initialWidth =
    width ?? (typeof window !== 'undefined' ? window.innerWidth : 1920)
  const initialHeight =
    height ?? (typeof window !== 'undefined' ? window.innerHeight : 1080)

  useEffect(() => {
    if (!containerRef.current) return

    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild)
    }

    const canvas = document.createElement('canvas')
    containerRef.current.appendChild(canvas)

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    })
    renderer.setSize(initialWidth, initialHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      50,
      initialWidth / initialHeight,
      0.1,
      100,
    )
    camera.position.z = 8

    const group = new THREE.Group()
    scene.add(group)

    const getTexture = () => {
      const size = 64
      const c = document.createElement('canvas')
      c.width = size
      c.height = size
      const ctx = c.getContext('2d')
      if (ctx) {
        const centerX = size / 2
        const centerY = size / 2
        const w = size * 0.1
        const h = size * 0.2
        const x = centerX - w / 2
        const y = centerY - h / 2
        const radius = size * 0.01

        ctx.fillStyle = 'rgba(255, 255, 255, 1)'
        ctx.beginPath()
        ctx.moveTo(x + radius, y)
        ctx.lineTo(x + w - radius, y)
        ctx.quadraticCurveTo(x + w, y, x + w, y + radius)
        ctx.lineTo(x + w, y + h - radius)
        ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h)
        ctx.lineTo(x + radius, y + h)
        ctx.quadraticCurveTo(x, y + h, x, y + h - radius)
        ctx.lineTo(x, y + radius)
        ctx.quadraticCurveTo(x, y, x + radius, y)
        ctx.closePath()
        ctx.fill()
      }
      const texture = new THREE.Texture(c)
      texture.needsUpdate = true
      return texture
    }

    const texture = getTexture()
    const total = particleCount
    const geometry = new THREE.PlaneGeometry(0.2, 0.2)
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    })

    const instancedMesh = new THREE.InstancedMesh(geometry, material, total)
    group.add(instancedMesh)

    const basePositions = new Float32Array(total * 3)
    const phase = new Float32Array(total)
    const speeds = new Float32Array(total)
    const colorA = new THREE.Color('#3b82f6')
    const colorB = new THREE.Color('#0ea5e9')
    const dummy = new THREE.Object3D()

    for (let i = 0; i < total; i++) {
      const theta = Math.random() * Math.PI * 12
      const radius = innerRadius + Math.random() * (outerRadius - innerRadius)

      const x = radius * Math.cos(theta)
      const y = radius * Math.sin(theta)
      const z = (Math.random() - 0.05) * 1.5

      basePositions[i * 3] = x
      basePositions[i * 3 + 1] = y
      basePositions[i * 3 + 2] = z

      const hueBlend = (Math.sin(theta) + 1) / 2
      const color = colorA.clone().lerp(colorB, hueBlend)
      instancedMesh.setColorAt(i, color)

      phase[i] = Math.random() * Math.PI * 2
      speeds[i] = 0.1 + Math.random() * 0.1

      dummy.position.set(x, y, z)
      dummy.updateMatrix()
      instancedMesh.setMatrixAt(i, dummy.matrix)
    }

    instancedMesh.instanceMatrix.needsUpdate = true

    const target = new THREE.Vector3(0, 0, 0)
    const spritePos = new THREE.Vector3(0, 0, 0)
    const velocity = new THREE.Vector3(0, 0, 0)

    function onPointerMove(event: Event) {
      const e = event as PointerEvent
      const rect = renderer.domElement.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1

      const vec = new THREE.Vector3(x, y, 0.5)
      vec.unproject(camera)
      const dir = vec.sub(camera.position).normalize()
      const distance = -camera.position.z / dir.z
      const pos = camera.position.clone().add(dir.multiplyScalar(distance))
      target.copy(pos)
    }

    const pointerTarget: Window | HTMLDivElement = wrapper?.current ?? window
    pointerTarget.addEventListener('pointermove', onPointerMove)

    function animate() {
      const now = performance.now()
      const t = now * 0.001

      const drift = new THREE.Vector3(
        Math.sin(t * 0.1) * 0.1,
        Math.cos(t * 0.05) * 0.1,
        Math.sin(t * 0.08) * 0.05,
      )
      const targetWithDrift = target.clone().add(drift)
      spritePos.lerp(targetWithDrift, 0.007)

      const currentVel = targetWithDrift
        .clone()
        .sub(spritePos)
        .multiplyScalar(1.0)
      velocity.lerp(currentVel, 0.001)

      group.position.copy(spritePos)
      group.rotation.z += 0.0002
      group.rotation.x = Math.sin(t * 0.05) * 0.1
      group.rotation.y = Math.cos(t * 0.05) * 0.1

      const breathPhase = t * breathSpeed * Math.PI * 2
      const breathNorm = (1 - Math.cos(breathPhase)) * 0.5
      const globalScale = 1 + breathAmount * breathNorm

      for (let i = 0; i < total; i++) {
        const bx = basePositions[i * 3]
        const by = basePositions[i * 3 + 1]
        const bz = basePositions[i * 3 + 2]

        let x = bx * globalScale
        let y = by * globalScale
        let z = bz * globalScale

        const dist = Math.sqrt(x * x + y * y + z * z)
        const rippleFreq = 3.0
        const rippleSpeed = 0.5
        const rippleAmp = 0.2
        const wave = Math.sin(dist * rippleFreq - t * rippleSpeed + phase[i])

        x += x * wave * rippleAmp
        y += y * wave * rippleAmp
        z += z * wave * rippleAmp

        const phaseOffset = phase[i]
        x += Math.sin(t * speeds[i] + phaseOffset) * 0.05
        y += Math.cos(t * speeds[i] * 0.8 + phaseOffset) * 0.05
        z += Math.sin(t * speeds[i] * 1.2 + phaseOffset) * 0.05

        x -= velocity.x * 0.15 * (1 + Math.random() * 0.2)
        y -= velocity.y * 0.15 * (1 + Math.random() * 0.2)
        z -= velocity.z * 0.15 * (1 + Math.random() * 0.2)

        dummy.position.set(x, y, z)

        const angle = Math.atan2(y, x)
        dummy.rotation.set(0, 0, 0)
        dummy.rotation.z = angle + Math.PI / 2
        dummy.rotation.x = Math.sin(t + i) * 0.2
        dummy.rotation.y = Math.cos(t + i) * 0.2

        dummy.updateMatrix()
        instancedMesh.setMatrixAt(i, dummy.matrix)
      }

      instancedMesh.instanceMatrix.needsUpdate = true
      renderer.render(scene, camera)
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    function handleResize() {
      const w = containerRef.current?.clientWidth || initialWidth
      const h = containerRef.current?.clientHeight || initialHeight
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }

    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(containerRef.current)

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      pointerTarget.removeEventListener('pointermove', onPointerMove)
      resizeObserver.disconnect()
      geometry.dispose()
      material.dispose()
      texture.dispose()
      renderer.dispose()
      if (containerRef.current && containerRef.current.contains(canvas)) {
        containerRef.current.removeChild(canvas)
      }
    }
  }, [
    initialWidth,
    initialHeight,
    particleCount,
    innerRadius,
    outerRadius,
    breathSpeed,
    breathAmount,
    wrapper,
  ])

  return (
    <div
      ref={containerRef}
      style={{
        width: width ?? '100vw',
        height: height ?? '100vh',
        touchAction: 'none',
        backgroundColor: 'transparent',
        position: 'absolute',
        inset: '0',
      }}
    />
  )
}
