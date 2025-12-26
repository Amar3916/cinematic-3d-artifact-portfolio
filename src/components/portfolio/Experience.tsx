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
    gsap.to(camera.position, {
      x: 0,
      y: 0,
      z: currentPage === 0 ? 4 : 4.5,
      duration: 2,
      ease: "power3.inOut"
    });
    
    // Always look at center
    const target = new THREE.Vector3(0, 0, 0);
    camera.lookAt(target);
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
          gl={{ antialias: true, stencil: false, depth: true }}
        >
          <CameraController />
          <color attach="background" args={["#0a0a0a"]} />
          <fog attach="fog" args={["#0a0a0a", 5, 12]} />
          
          <Suspense fallback={null}>
            <Environment preset="night" intensity={0.5} />
            <ambientLight intensity={0.2} />
            
            <spotLight
              position={[2, 5, 2]}
              angle={0.4}
              penumbra={1}
              intensity={4}
              castShadow
              color="#fff"
            />
            
            <pointLight position={[-3, 2, 4]} intensity={2} color="#d4af37" />
            <pointLight position={[3, -2, 4]} intensity={1} color="#4080ff" />

            <group position={[0, -0.2, 0]}>
              <Float 
                speed={1.5} 
                rotationIntensity={0.1} 
                floatIntensity={0.2}
                floatingRange={[-0.05, 0.05]}
              >
                <PortfolioBook />
              </Float>
            </group>

            {/* Premium Floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]} receiveShadow>
              <planeGeometry args={[50, 50]} />
              <meshStandardMaterial 
                color="#050505" 
                roughness={0.1} 
                metalness={0.8}
              />
            </mesh>


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
