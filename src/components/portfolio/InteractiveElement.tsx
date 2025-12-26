"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";

interface InteractiveElementProps {
  children: React.ReactNode;
  position: [number, number, number];
  scale?: number;
}

export function InteractiveElement({ children, position, scale = 1 }: InteractiveElementProps) {
  const meshRef = useRef<THREE.Group>(null);
  const { viewport, mouse, raycaster, camera } = useThree();
  
  const [isDragging, setIsDragging] = useState(false);
  const [isReturning, setIsReturning] = useState(false);
  
  const homePosition = new THREE.Vector3(...position);
  const targetPosition = useRef(new THREE.Vector3(...position));
  const velocity = useRef(new THREE.Vector3(0, 0, 0));
  const lastMousePos = useRef(new THREE.Vector2(0, 0));

  useFrame((state) => {
    if (!meshRef.current) return;

    if (isDragging) {
      // Follow mouse
      const vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
      vector.unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));
      
      // Calculate velocity
      velocity.current.lerp(pos.clone().sub(meshRef.current.position), 0.2);
      meshRef.current.position.copy(pos);
      
      // Gentle rotation while dragging
      meshRef.current.rotation.x += velocity.current.y * 0.1;
      meshRef.current.rotation.y += velocity.current.x * 0.1;
    } else if (!isReturning) {
      // Apply velocity and friction
      meshRef.current.position.add(velocity.current);
      velocity.current.multiplyScalar(0.95);
      
      // Auto-rotation
      meshRef.current.rotation.y += 0.01;

      // If it goes too far or velocity is low, return home
      const dist = meshRef.current.position.distanceTo(homePosition);
      if (dist > 5 || (velocity.current.length() < 0.001 && dist > 0.1)) {
        returnHome();
      }
    }
  });

  const returnHome = () => {
    if (isReturning || !meshRef.current) return;
    setIsReturning(true);
    velocity.current.set(0, 0, 0);

    gsap.to(meshRef.current.position, {
      x: homePosition.x,
      y: homePosition.y,
      z: homePosition.z,
      duration: 1.2,
      ease: "elastic.out(1, 0.6)",
      onComplete: () => setIsReturning(false)
    });

    gsap.to(meshRef.current.rotation, {
      x: 0,
      y: 0,
      z: 0,
      duration: 1.2,
      ease: "power2.out"
    });
  };

  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    setIsDragging(true);
    setIsReturning(false);
    velocity.current.set(0, 0, 0);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <group
      ref={meshRef}
      position={position}
      scale={scale}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {children}
    </group>
  );
}
