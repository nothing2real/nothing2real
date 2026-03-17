"use client";

import React, { useRef } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import {
  Text,
  Float,
  MeshDistortMaterial,
  Sphere,
  Box,
  Torus,
  shaderMaterial,
} from "@react-three/drei";
import * as THREE from "three";


/* =========================
   ✅ Custom Shader Material (FIXED - Moved inside component)
========================= */

const AnimatedGrid = () => {
  const materialRef = useRef();

  // Create shader material inside the component
  const GlowingGridMaterial = useMemo(() => {
    return shaderMaterial(
      {
        uTime: 0,
        uResolution: new THREE.Vector2(1920, 1080),
      },
      // Vertex Shader
      `
        varying vec2 vUv;
        varying vec3 vPosition;

        void main() {
          vUv = uv;
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      // Fragment Shader
      `
        uniform float uTime;
        uniform vec2 uResolution;
        varying vec2 vUv;
        varying vec3 vPosition;

        void main() {
          vec2 st = vUv;

          float gridSize = 20.0;
          vec2 grid = fract(st * gridSize);
          float line = step(0.02, grid.x) * step(0.02, grid.y);

          float glow = sin(uTime * 2.0 + vPosition.x * 0.1 + vPosition.y * 0.1) * 0.5 + 0.5;
          glow = pow(glow, 2.0);

          vec3 color1 = vec3(0.2, 0.8, 1.0);
          vec3 color2 = vec3(1.0, 0.4, 0.8);
          vec3 finalColor = mix(color1, color2, sin(uTime + vPosition.x * 0.01) * 0.5 + 0.5);

          float alpha = (1.0 - line) * glow * 0.3;

          gl_FragColor = vec4(finalColor, alpha);
        }
      `
    );
  }, []);

  // Extend only when component mounts
  useMemo(() => {
    extend({ GlowingGridMaterial });
  }, [GlowingGridMaterial]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh position={[0, 0, -5]}>
      <planeGeometry args={[20, 20, 50, 50]} />
      <glowingGridMaterial
        ref={materialRef}
        transparent
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

/* =========================
   ✅ Floating Elements
========================= */

const FloatingElements = () => {
  const mesh1 = useRef();
  const mesh2 = useRef();
  const mesh3 = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (mesh1.current) {
      mesh1.current.rotation.x = t * 0.2;
      mesh1.current.rotation.y = t * 0.3;
      mesh1.current.position.y = Math.sin(t * 0.5) * 0.5;
    }

    if (mesh2.current) {
      mesh2.current.rotation.x = -t * 0.1;
      mesh2.current.rotation.z = t * 0.2;
      mesh2.current.position.x = Math.cos(t * 0.3) * 0.8;
    }

    if (mesh3.current) {
      mesh3.current.rotation.y = t * 0.15;
      mesh3.current.position.z = Math.sin(t * 0.4) * 0.3;
    }
  });

  return (
    <>
      <Float>
        <Torus ref={mesh1} args={[1, 0.3, 16, 100]} position={[-3, 1, -2]}>
          <MeshDistortMaterial color="#4f46e5" distort={0.4} speed={2} />
        </Torus>
      </Float>

      <Float>
        <Sphere ref={mesh2} args={[0.8, 32, 32]} position={[3, -1, -1]}>
          <MeshDistortMaterial color="#ec4899" distort={0.3} speed={1.5} />
        </Sphere>
      </Float>

      <Float>
        <Box ref={mesh3} args={[1.2, 1.2, 1.2]} position={[0, 2, -3]}>
          <MeshDistortMaterial color="#10b981" distort={0.5} speed={2} />
        </Box>
      </Float>
    </>
  );
};

/* =========================
   ✅ Scene
========================= */

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4f46e5" />

      <AnimatedGrid />
      <FloatingElements />

      <Float>
        <Text
          position={[0, 3, -2]}
          fontSize={0.8}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          CREATIVE
        </Text>
      </Float>
    </>
  );
};

/* =========================
   ✅ Canvas (FINAL)
========================= */

const ThreeCanvas = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      gl={{ alpha: true, antialias: true }}
    >
      <Scene />
    </Canvas>
  );
};

export default ThreeCanvas;