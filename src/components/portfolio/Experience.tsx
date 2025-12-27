"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Environment, Float, Stars, ContactShadows, SoftShadows, Html } from "@react-three/drei";
import { PortfolioBook } from "./PortfolioBook";
import { usePortfolioStore } from "@/lib/store";
import { LoadingScreen } from "./LoadingScreen";
import gsap from "gsap";
import * as THREE from "three";

function Loader() {
  return (
    <Html center>
      <LoadingScreen />
    </Html>
  );
}

function CameraController() {
  const { camera, size } = useThree();
  const currentPage = usePortfolioStore((state) => state.currentPage);

    useEffect(() => {
      const isPortrait = size.width < size.height;
      const aspect = size.width / size.height;
      
      // Target position
      let targetZ = currentPage === 0 ? 4.8 : 5.5;
      let targetX = 0;
      let targetY = 0;
      
      if (isPortrait) {
        // In portrait, move closer if it's the cover, further for pages
        // But adjust for the very narrow aspect ratios
        const fovCorrection = Math.max(1, 0.8 / aspect);
        targetZ = (currentPage === 0 ? 5.0 : 6.2) * fovCorrection;
        targetY = 0.1;
      } else if (aspect < 1.4) {
        // Tablets / Square screens
        targetZ = 5.5 / Math.min(1, aspect * 0.9);
      }

      gsap.to(camera.position, {
        x: targetX,
        y: targetY,
        z: targetZ,
        duration: 1.2,
        ease: "power2.out"
      });
      
      if (camera instanceof THREE.PerspectiveCamera) {
        // Wider FOV on mobile helps the "zoom" feel and perspective
        const targetFov = isPortrait ? 60 : 45;
        gsap.to(camera, {
          fov: targetFov,
          duration: 1.2,
          onUpdate: () => camera.updateProjectionMatrix()
        });
      }
    }, [currentPage, camera, size]);

  return null;
}

export function Experience() {
  const [bookScale, setBookScale] = useState(1);
  
  return (
    <div className="fixed inset-0 bg-[#020202]">
        <Canvas
          shadows
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={[1, 2]} // Support high-DPI screens and browser zoom
          performance={{ min: 0.5 }}
          gl={{ 
            antialias: true, 
            stencil: false, 
            depth: true,
            toneMapping: THREE.ReinhardToneMapping,
            toneMappingExposure: 1.2,
            powerPreference: "high-performance"
          }}
        >
          <AdaptiveScale setScale={setBookScale} />
          <SoftShadows size={25} samples={10} focus={0.5} />
          <CameraController />
          <color attach="background" args={["#000000"]} />
          <fog attach="fog" args={["#000000", 4, 15]} />
          
          <Suspense fallback={<Loader />}>
            <Environment preset="night" intensity={0.4} />
            <ambientLight intensity={0.15} />
            
            <spotLight
              position={[5, 10, 5]}
              angle={0.2}
              penumbra={1}
              intensity={1000}
              castShadow
              color="#fff"
              shadow-mapSize={[1024, 1024]}
            />
            
            <pointLight position={[-3, 0.5, 3]} intensity={100} color="#d4af37" decay={2} />
            <pointLight position={[4, 1, 3]} intensity={50} color="#4080ff" decay={2} />

            <group position={[0, -0.1, 0]} scale={[bookScale, bookScale, bookScale]}>
              <Float 
                speed={2} 
                rotationIntensity={0.05} 
                floatIntensity={0.15}
                floatingRange={[-0.04, 0.04]}
              >
                <PortfolioBook />
              </Float>
            </group>

            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]} receiveShadow>
              <planeGeometry args={[100, 100]} />
              <meshStandardMaterial 
                color="#020202" 
                roughness={0.05} 
                metalness={0.9}
              />
            </mesh>

          <Stars 
            radius={100} 
            depth={50} 
            count={5000} 
            factor={4} 
            saturation={0} 
            fade 
            speed={0.3} 
          />
          
          <ContactShadows
            position={[0, -2.5, 0]}
            opacity={0.4}
            scale={20}
            blur={3}
            far={10}
            color="#000"
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

function AdaptiveScale({ setScale }: { setScale: (s: number) => void }) {
  const { size, viewport } = useThree();
  
  useEffect(() => {
    const isPortrait = size.width < size.height;
    
    // We want the book to stay a relatively consistent size relative to the viewport height
    // on desktop, and fill width on mobile.
    // By using viewport dimensions (which are in Three.js units), we get more stability.
    
    let scale = 1;
    if (isPortrait) {
      // On mobile, scale so it fills about 85% of viewport width
      // The book's width is roughly 4 units (when open)
      // viewport.width is the width in 3D units at distance 0
      scale = (viewport.width * 0.85) / 4;
      scale = Math.max(0.6, Math.min(scale, 1.2));
    } else {
      // On desktop, keep it a good size relative to viewport height
      // The book's height is roughly 4 units
      scale = (viewport.height * 0.7) / 4;
      scale = Math.max(0.8, Math.min(scale, 1.3));
    }
    
    setScale(scale);
  }, [size, viewport, setScale]);
  
  return null;
}

