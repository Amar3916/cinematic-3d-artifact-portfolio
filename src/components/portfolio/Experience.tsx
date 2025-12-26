"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import { Environment, Float, Stars, ContactShadows } from "@react-three/drei";
import { PortfolioBook } from "./PortfolioBook";
import { usePortfolioStore } from "@/lib/store";
import gsap from "gsap";
import * as THREE from "three";

function CameraController() {
  const { camera } = useThree();
  const currentPage = usePortfolioStore((state) => state.currentPage);

  useEffect(() => {
    // Cinematic camera movements
    if (currentPage === 0) {
      // Cover view
      gsap.to(camera.position, {
        x: 0,
        y: 0,
        z: 5,
        duration: 2,
        ease: "power3.inOut"
      });
    } else {
      // Open book view (slightly to the left to see the pages better)
      gsap.to(camera.position, {
        x: -1,
        y: 0,
        z: 4,
        duration: 1.5,
        ease: "power2.inOut"
      });
    }
    
    // Slight look-at adjustment
    const target = new THREE.Vector3(currentPage === 0 ? 0 : 0.5, 0, 0);
    gsap.to(camera.rotation, {
      y: currentPage === 0 ? 0 : 0.1,
      duration: 1.5,
      ease: "power2.inOut"
    });
  }, [currentPage, camera]);

  return null;
}

export function Experience() {
  return (
    <div className="fixed inset-0 bg-[#050505]">
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
      >
        <CameraController />
        <color attach="background" args={["#050505"]} />
        <fog attach="fog" args={["#050505", 5, 15]} />

        <Suspense fallback={null}>
          <Environment preset="city" />
          <ambientLight intensity={0.1} />
          
          <spotLight
            position={[5, 5, 5]}
            angle={0.3}
            penumbra={1}
            intensity={2}
            castShadow
            color="#fffcf0"
          />
          
          <pointLight position={[-5, -2, -5]} intensity={0.5} color="#4080ff" />

          <Float 
            speed={1.2} 
            rotationIntensity={0.2} 
            floatIntensity={0.3}
            floatingRange={[-0.1, 0.1]}
          >
            <PortfolioBook />
          </Float>

          <Stars 
            radius={50} 
            depth={50} 
            count={3000} 
            factor={4} 
            saturation={0} 
            fade 
            speed={0.5} 
          />
          
          <ContactShadows
            position={[0, -2, 0]}
            opacity={0.3}
            scale={15}
            blur={2.5}
            far={10}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
