"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { usePortfolioStore } from "@/lib/store";
import * as THREE from "three";
import gsap from "gsap";

interface AnimatedArtifactProps {
  children: React.ReactNode;
  pageIndex: number;
}

export function AnimatedArtifact({ children, pageIndex }: AnimatedArtifactProps) {
  const { currentPage } = usePortfolioStore();
  const groupRef = useRef<THREE.Group>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    // We want to trigger the animation when the user turns to the page where this object is visible.
    // In our book, page content is shown on the left (back side of index) and right (front side of index).
    // The objects are usually on the left page, which shows content for 'index + 1' or 'nextPageIndex'.
    
    const isVisible = currentPage === pageIndex || currentPage === pageIndex - 1;

    if (isVisible && !hasAnimated.current) {
      if (groupRef.current) {
        // Reset state for animation
        groupRef.current.position.set(0, 0, 10); // Start far behind camera
        groupRef.current.rotation.set(Math.PI * 2, Math.PI * 2, 0); // Spinning
        groupRef.current.scale.set(0, 0, 0); // Scale up from zero

        gsap.to(groupRef.current.position, {
          z: 0.4, // Final position relative to parent
          duration: 1.5,
          ease: "power3.out",
          delay: 0.2,
        });

        gsap.to(groupRef.current.rotation, {
          x: 0,
          y: 0,
          z: 0,
          duration: 1.8,
          ease: "back.out(1.7)",
          delay: 0.2,
        });

        gsap.to(groupRef.current.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 1.2,
          ease: "elastic.out(1, 0.5)",
          delay: 0.3,
        });

        hasAnimated.current = true;
      }
    } else if (!isVisible) {
      // Reset when not visible so it can animate again if we return
      hasAnimated.current = false;
    }
  }, [currentPage, pageIndex]);

  return <group ref={groupRef}>{children}</group>;
}
