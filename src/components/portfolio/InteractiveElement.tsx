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
  const { mouse, camera, scene } = useThree();
  
  const [isDragging, setIsDragging] = useState(false);
  const [isReturning, setIsReturning] = useState(false);
  
  const homePosition = new THREE.Vector3(...position);
    const velocity = useRef(new THREE.Vector3(0, 0, 0));
    const angularVelocity = useRef(new THREE.Vector3(0, 0, 0));
    const lastMousePos = useRef(new THREE.Vector2());
    const dragPlane = useRef(new THREE.Plane());
  
    useFrame((state) => {
      if (!meshRef.current) return;
  
      if (isDragging) {
        // Create a plane at the object's depth facing the camera
        const normal = new THREE.Vector3(0, 0, 1).applyQuaternion(camera.quaternion);
        dragPlane.current.setFromNormalAndCoplanarPoint(normal, meshRef.current.position);
  
        const raycaster = state.raycaster;
        raycaster.setFromCamera(mouse, camera);
        
        const intersection = new THREE.Vector3();
        if (raycaster.ray.intersectPlane(dragPlane.current, intersection)) {
          // Calculate translation velocity based on movement
          const currentPos = meshRef.current.position.clone();
          velocity.current.subVectors(intersection, currentPos).multiplyScalar(0.4);
          meshRef.current.position.copy(intersection);
        }
  
        // 360 Rotation logic (Globe-like with momentum)
        const deltaX = mouse.x - lastMousePos.current.x;
        const deltaY = mouse.y - lastMousePos.current.y;
        
        // Apply rotation - use a slightly smaller multiplier for smoother feel
        meshRef.current.rotation.y += deltaX * 8;
        meshRef.current.rotation.x -= deltaY * 8;
  
        // Update angular velocity for the "throw" with smoothing
        angularVelocity.current.y = THREE.MathUtils.lerp(angularVelocity.current.y, deltaX * 0.5, 0.2);
        angularVelocity.current.x = THREE.MathUtils.lerp(angularVelocity.current.x, -deltaY * 0.5, 0.2);
        
        lastMousePos.current.set(mouse.x, mouse.y);
      } else if (!isReturning) {
        // Apply translation velocity and friction
        meshRef.current.position.add(velocity.current);
        velocity.current.multiplyScalar(0.95);
        
        // Apply angular velocity and friction
        meshRef.current.rotation.x += angularVelocity.current.x;
        meshRef.current.rotation.y += angularVelocity.current.y;
        
        angularVelocity.current.multiplyScalar(0.97);
  
        // Subtle ambient rotation when stationary
        if (angularVelocity.current.lengthSq() < 0.00001) {
          meshRef.current.rotation.y += 0.003;
        }
  
        // If it goes too far or stops moving, return home
        const dist = meshRef.current.position.distanceTo(homePosition);
        const speed = velocity.current.length();
        
        if (dist > 10 || (speed < 0.001 && dist > 0.05)) {
          returnHome();
        }
      }
    });

  const returnHome = () => {
    if (isReturning || !meshRef.current) return;
    setIsReturning(true);
    velocity.current.set(0, 0, 0);
    angularVelocity.current.set(0, 0, 0);

    gsap.to(meshRef.current.position, {
      x: homePosition.x,
      y: homePosition.y,
      z: homePosition.z,
      duration: 1.5,
      ease: "elastic.out(1, 0.5)",
      onComplete: () => setIsReturning(false)
    });

    gsap.to(meshRef.current.rotation, {
      x: 0,
      y: 0,
      z: 0,
      duration: 1.5,
      ease: "power2.out"
    });
  };

  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setIsDragging(true);
    setIsReturning(false);
    velocity.current.set(0, 0, 0);
    lastMousePos.current.set(mouse.x, mouse.y);
  };

  const handlePointerUp = (e: any) => {
    e.stopPropagation();
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    setIsDragging(false);
    
    // Check for "throw" - if velocity is high enough, let it fly
    if (velocity.current.length() < 0.01) {
      returnHome();
    }
  };

  const handleWheel = (e: any) => {
    e.stopPropagation();
    
      if (isReturning) {
        setIsReturning(false);
        if (meshRef.current) {
          gsap.killTweensOf(meshRef.current.position);
          gsap.killTweensOf(meshRef.current.rotation);
        }
      }

    // Apply scroll to angular velocity for a smooth spin
    // Increase sensitivity for a more responsive feel
    const scrollSensitivity = 0.002;
    angularVelocity.current.y += e.deltaY * scrollSensitivity;
    angularVelocity.current.x += e.deltaX * scrollSensitivity;
  };

  return (
    <group
      ref={meshRef}
      position={position}
      scale={scale}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onWheel={handleWheel}
      onPointerEnter={() => { document.body.style.cursor = 'grab'; }}
      onPointerLeave={() => { document.body.style.cursor = 'default'; }}
    >
      {children}
    </group>
  );
}
