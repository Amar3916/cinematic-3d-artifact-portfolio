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
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.12, 3.02, 0.12]} />
        <meshStandardMaterial color="#1a130f" roughness={0.4} metalness={0.5} />
        {/* Spine Details */}
        {[...Array(5)].map((_, i) => (
          <mesh key={i} position={[0, i * 0.5 - 1, 0.061]}>
            <boxGeometry args={[0.08, 0.01, 0.01]} />
            <meshStandardMaterial color="#d4af37" metalness={1} roughness={0.1} />
          </mesh>
        ))}
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
