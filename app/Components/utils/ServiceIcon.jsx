"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const LERP_SPEED = 0.1;

// Separate the Mesh component to ensure it's strictly within the Canvas context
const Scene = ({ serviceId, isHovered }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Smooth scaling
    const targetScale = isHovered ? 1.3 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), LERP_SPEED);
    
    // Idle rotation
    meshRef.current.rotation.y = time * 0.4;
    meshRef.current.rotation.x = time * 0.2;
  });

  // Decide parameters based on ID
  const config = {
    "01": { color: "#6366f1", distort: 0.4, type: 'box' },
    "02": { color: "#06b6d4", distort: 0.5, type: 'sphere' },
    "03": { color: "#10b981", distort: 0.3, type: 'torus', wireframe: true },
    "04": { color: "#f59e0b", distort: 0.3, type: 'octahedron' },
  }[serviceId] || { color: "#ffffff", distort: 0.3, type: 'box' };

  return (
    <>
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh ref={meshRef}>
          {config.type === 'box' && <boxGeometry args={[1.2, 1.2, 1.2]} />}
          {config.type === 'sphere' && <sphereGeometry args={[0.8, 64, 64]} />}
          {config.type === 'torus' && <torusGeometry args={[0.7, 0.25, 20, 100]} />}
          {config.type === 'octahedron' && <octahedronGeometry args={[1]} />}

          {config.wireframe ? (
            <meshStandardMaterial color={config.color} wireframe emissive={config.color} emissiveIntensity={0.5} />
          ) : (
            <MeshDistortMaterial
              color={config.color}
              speed={2}
              distort={config.distort}
              roughness={0.1}
              metalness={0.8}
            />
          )}
        </mesh>
      </Float>
      <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={5} blur={2} far={4.5} />
    </>
  );
};

const ServiceIcon = ({ serviceId, isHovered }) => {
  return (
    <div className="w-24 h-24 md:w-32 md:h-32 transition-transform duration-500 ease-out pointer-events-none">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.7} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} color={isHovered ? "#fff" : "#4f46e5"} intensity={0.5} />
        
        <Scene serviceId={serviceId} isHovered={isHovered} />
      </Canvas>
    </div>
  );
};

export default ServiceIcon;