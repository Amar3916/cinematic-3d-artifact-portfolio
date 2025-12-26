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
  
  // A page is visible if:
  // 1. It's the current page (back side visible on left)
  // 2. It's the next page (front side visible on right)
  const isVisible = index === currentPage || index === currentPage + 1;
  
  // Z-fighting prevention: slightly offset based on index, but keep visible pages on top
  const zPos = isVisible ? 0.05 : index * 0.005;

  useEffect(() => {
    if (!group.current) return;
    
    const targetRotation = isOpen ? -Math.PI : 0;
    
    gsap.to(group.current.rotation, {
      y: targetRotation,
      duration: 1.5,
      ease: "power4.inOut",
      delay: Math.abs(index - currentPage) * 0.05
    });
  }, [isOpen, index, currentPage]);

  return (
    <group ref={group} position={[0, 0, zPos]}>
      {/* Page Base - Making it opaque and using multi-material for edges */}
      <mesh position={[1.1, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 3, 0.02]} />
        <meshStandardMaterial 
          color="#f5f5f0" 
          roughness={1}
          metalness={0}
        />
      </mesh>

      {/* Page Content (Front) - Only show if on the right side and visible */}
      {isVisible && !isOpen && (
        <group position={[1.1, 0, 0.011]}>
          <PageContent index={index} side="front" />
        </group>
      )}

      {/* Page Content (Back) - Only show if on the left side and visible */}
      {isVisible && isOpen && (
        <group position={[1.1, 0, -0.011]} rotation={[0, Math.PI, 0]}>
          <PageContent index={index} side="back" />
        </group>
      )}
    </group>
  );
}
