"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { usePortfolioStore } from "@/lib/store";
import * as THREE from "three";
import { BookPage } from "./BookPage";

export function PortfolioBook() {
  const { currentPage, totalPages } = usePortfolioStore();
  const group = useRef<THREE.Group>(null);

  // Rotation logic for the whole book
  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = Math.sin(t * 0.2) * 0.1;
    group.current.rotation.x = Math.cos(t * 0.1) * 0.05;
  });

  const pages = useMemo(() => {
    const p = [];
    for (let i = 0; i < totalPages; i++) {
      p.push(i);
    }
    return p;
  }, [totalPages]);

  return (
    <group ref={group}>
      {/* Book Spine */}
      <mesh position={[0, 0, -0.05]}>
        <boxGeometry args={[0.1, 3.2, 0.1]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Pages */}
      {pages.map((index) => (
        <BookPage 
          key={index} 
          index={index} 
          currentPage={currentPage}
        />
      ))}
    </group>
  );
}
