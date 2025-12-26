"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Html, Text } from "@react-three/drei";
import gsap from "gsap";
import { PageContent } from "./PageContent";

interface BookPageProps {
  index: number;
  currentPage: number;
}

export function BookPage({ index, currentPage }: BookPageProps) {
  const group = useRef<THREE.Group>(null);
  
  // A page is "open" if its index is less than or equal to the current page
  const isOpen = index <= currentPage;
  
  useEffect(() => {
    if (!group.current) return;
    
    // Animate rotation based on page state
    // If open, rotate -180 degrees (flip to the left)
    // If closed, stay at 0 degrees
    const targetRotation = isOpen ? -Math.PI : 0;
    
    gsap.to(group.current.rotation, {
      y: targetRotation,
      duration: 1.2,
      ease: "power3.inOut",
      delay: index * 0.05 // Staggered flip effect
    });
  }, [isOpen, index]);

  return (
    <group ref={group} position={[0, 0, index * 0.01]}>
      {/* Page Base */}
      <mesh position={[1.1, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 3, 0.02]} />
        <meshStandardMaterial 
          color="#fcfcfc" 
          roughness={0.8}
          // The edge should look like paper
        />
      </mesh>

      {/* Page Content (Front) */}
      <group position={[1.1, 0, 0.011]}>
        <PageContent index={index} side="front" />
      </group>

      {/* Page Content (Back) */}
      <group position={[1.1, 0, -0.011]} rotation={[0, Math.PI, 0]}>
        <PageContent index={index} side="back" />
      </group>
    </group>
  );
}
