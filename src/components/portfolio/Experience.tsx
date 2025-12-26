"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
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
      let targetZ = currentPage === 0 ? 4.5 : 5.2;
      let targetX = 0;
      let targetY = 0;
      
      if (isPortrait) {
        // In portrait, we need much more distance to see the book
        // Adjust based on aspect to keep it centered and visible
        targetZ = (currentPage === 0 ? 5.5 : 6.5) / Math.min(1, aspect * 1.2);
        // Slightly tilt for better mobile viewing
        targetY = 0.2;
      } else if (aspect < 1.5) {
        // Squarer screens (tablets in landscape)
        targetZ = 5.5 / aspect;
      }

      // Cinematic camera movements
      gsap.to(camera.position, {
        x: targetX,
        y: targetY,
        z: targetZ,
        duration: 1.5,
        ease: "power3.inOut"
      });
      
      // Dynamic FOV adjustment for narrow screens
      if (camera instanceof THREE.PerspectiveCamera) {
        const targetFov = isPortrait ? 50 : 45;
        gsap.to(camera, {
          fov: targetFov,
          duration: 1.5,
          onUpdate: () => camera.updateProjectionMatrix()
        });
      }
    }, [currentPage, camera, size]);

  return null;
}

export function Experience() {
  return (
    <div className="fixed inset-0 bg-[#020202]">
        <Canvas
          shadows
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={[1, 2]}
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
          <SoftShadows size={25} samples={10} focus={0.5} />
          <CameraController />
          <color attach="background" args={["#000000"]} />
          <fog attach="fog" args={["#000000", 4, 15]} />
          
          <Suspense fallback={<Loader />}>
            <Environment preset="night" intensity={0.4} />
            <ambientLight intensity={0.15} />
            
            {/* Dramatic Key Light */}
            <spotLight
              position={[5, 10, 5]}
              angle={0.2}
              penumbra={1}
              intensity={1000}
              castShadow
              color="#fff"
              shadow-mapSize={[1024, 1024]}
            />
            
            {/* Artifact Highlight Light (Left Side) */}
            <pointLight position={[-3, 0.5, 3]} intensity={100} color="#d4af37" decay={2} />
            
            {/* Rim Light (Right Side) */}
            <pointLight position={[4, 1, 3]} intensity={50} color="#4080ff" decay={2} />

            <group position={[0, -0.1, 0]}>
              <Float 
                speed={2} 
                rotationIntensity={0.05} 
                floatIntensity={0.15}
                floatingRange={[-0.04, 0.04]}
              >
                <PortfolioBook />
              </Float>
            </group>

            {/* Premium Obsidian Floor with Reflection (Simulated) */}
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
