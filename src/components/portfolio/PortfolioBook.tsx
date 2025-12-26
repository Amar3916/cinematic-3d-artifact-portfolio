"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { usePortfolioStore } from "@/lib/store";
import * as THREE from "three";
import { BookPage } from "./BookPage";

let pageTurnAudio: HTMLAudioElement | null = null;

if (typeof window !== "undefined") {
  pageTurnAudio = new Audio("https://www.soundjay.com/misc/sounds/page-flip-01a.mp3");
  pageTurnAudio.load();
}

const playPageTurnSound = () => {
  if (!pageTurnAudio) return;
  
  // Clone to allow overlapping sounds if clicking fast
  const sound = pageTurnAudio.cloneNode() as HTMLAudioElement;
  sound.volume = 0.5;
  sound.play().catch(e => console.warn("Audio playback blocked or failed:", e));
};

export function PortfolioBook() {
  const { currentPage, totalPages } = usePortfolioStore();
  const group = useRef<THREE.Group>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    playPageTurnSound();
  }, [currentPage]);

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
        <boxGeometry args={[0.12, 3.82, 0.12]} />
        <meshStandardMaterial color="#1a130f" roughness={0.4} metalness={0.5} />
        {/* Spine Details */}
        {[...Array(5)].map((_, i) => (
          <mesh key={i} position={[0, i * 0.7 - 1.4, 0.061]}>
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
