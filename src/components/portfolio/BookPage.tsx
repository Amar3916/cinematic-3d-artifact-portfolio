"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Html, Text } from "@react-three/drei";
import gsap from "gsap";
import { PageContent } from "@/components/portfolio/PageContent";

interface BookPageProps {
  index: number;
  currentPage: number;
}

export function BookPage({ index, currentPage }: BookPageProps) {
  const group = useRef<THREE.Group>(null);
  
    // A page is "open" if its index is less than the current page
    const isOpen = index < currentPage;
    
    // A page is visible if:
    // 1. It's the current page (front side visible on right)
    // 2. It's the previous page (back side visible on left)
    const isVisible = index === currentPage || index === currentPage - 1;
    
    const isCover = index === 0;
    
    // Z-fighting prevention
    const zPos = isVisible ? 0.1 : index * 0.005;
  
    useEffect(() => {
      if (!group.current) return;
      
      // Rotate if the page has been flipped (index < currentPage)
      const targetRotation = index < currentPage ? -Math.PI : 0;

    
    gsap.to(group.current.rotation, {
      y: targetRotation,
      duration: 1.5,
      ease: "power2.inOut",
      delay: Math.abs(index - currentPage) * 0.1
    });
  }, [index, currentPage]);

  return (
    <group ref={group} position={[0, 0, zPos]}>
        {/* Page Base */}
        <mesh position={[1.1, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.2, 3, 0.04]} />
          <meshStandardMaterial 
            color={isCover ? "#1a130f" : "#fefefe"} 
            roughness={isCover ? 0.4 : 0.8}
            metalness={isCover ? 0.3 : 0}
          />
          {/* Cover Design - Gold Engravings */}
          {isCover && (
            <group position={[0, 0, 0.021]}>
              {/* Border */}
              <mesh>
                <ringGeometry args={[0.95, 1, 4, 1, Math.PI / 4]} />
                <meshStandardMaterial color="#d4af37" metalness={1} roughness={0.1} />
              </mesh>
              <mesh position={[0, 0, 0.001]}>
                <planeGeometry args={[1.8, 2.6]} />
                <meshStandardMaterial color="#d4af37" transparent opacity={0.05} />
              </mesh>
            </group>
          )}
        </mesh>


      {/* Front Side: Show content if this page is on the right */}
      {isVisible && !isOpen && (
        <group position={[1.1, 0, 0.011]}>
          <PageContent index={index} side="front" />
        </group>
      )}

      {/* Back Side: Show objects if this page is on the left */}
      {isVisible && isOpen && (
        <group position={[1.1, 0, -0.011]} rotation={[0, Math.PI, 0]}>
          <PageContent index={index} side="back" nextPageIndex={index + 1} />
        </group>
      )}
    </group>
  );
}
