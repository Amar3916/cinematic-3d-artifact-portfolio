"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { usePortfolioStore } from "@/lib/store";
import * as THREE from "three";
import { BookPage } from "./BookPage";

const playPageTurnSound = () => {
  if (typeof window === "undefined") return;
  
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    
    const ctx = new AudioContextClass();
    const duration = 0.6;
    
    // 1. Paper Friction (High-pass filtered noise)
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "highpass";
    noiseFilter.frequency.setValueAtTime(1000, ctx.currentTime);
    noiseFilter.frequency.exponentialRampToValueAtTime(3000, ctx.currentTime + duration);
    
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0, ctx.currentTime);
    noiseGain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.1);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
    
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    
    // 2. The "Thump" (Low frequency sine sweep)
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    
    osc.type = "sine";
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + duration);
    
    oscGain.gain.setValueAtTime(0, ctx.currentTime);
    oscGain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.05);
    oscGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
    
    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    
    noise.start();
    osc.start();
    
    noise.stop(ctx.currentTime + duration);
    osc.stop(ctx.currentTime + duration);
    
    // Cleanup context
    setTimeout(() => {
      if (ctx.state !== 'closed') ctx.close();
    }, (duration + 0.1) * 1000);
    
  } catch (e) {
    console.error("Sound synthesis failed", e);
  }
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
