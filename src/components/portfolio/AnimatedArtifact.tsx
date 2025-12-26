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
    const isVisible = currentPage === pageIndex || currentPage === pageIndex - 1;

    if (isVisible && !hasAnimated.current) {
      if (groupRef.current) {
        // KILL any existing animations to prevent conflicts
        gsap.killTweensOf(groupRef.current.position);
        gsap.killTweensOf(groupRef.current.rotation);
        gsap.killTweensOf(groupRef.current.scale);

        // INITIAL STATE: Completely hidden and far away
        groupRef.current.visible = true;
        groupRef.current.position.set(0, 5, 15); // Start above and behind
        groupRef.current.rotation.set(Math.PI * 4, Math.PI * 2, Math.PI); // More spins
        groupRef.current.scale.set(0.001, 0.001, 0.001);

        gsap.to(groupRef.current.position, {
          x: 0,
          y: 0,
          z: 0.4,
          duration: 2.2,
          ease: "expo.out",
          delay: 0.4, // Slight delay to wait for page to open
        });

        gsap.to(groupRef.current.rotation, {
          x: 0,
          y: 0,
          z: 0,
          duration: 2.5,
          ease: "power4.out",
          delay: 0.4,
        });

        gsap.to(groupRef.current.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 1.8,
          ease: "elastic.out(1, 0.6)",
          delay: 0.5,
        });

        hasAnimated.current = true;
      }
    } else if (!isVisible && groupRef.current) {
      hasAnimated.current = false;
      groupRef.current.visible = false;
    }
  }, [currentPage, pageIndex]);

  return (
    <group ref={groupRef} visible={false}>
      {children}
    </group>
  );
}
