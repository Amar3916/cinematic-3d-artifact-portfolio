"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Environment, Float, Stars, ContactShadows } from "@react-three/drei";
import { PortfolioBook } from "./PortfolioBook";

export function Experience() {
  return (
    <div className="fixed inset-0 bg-[#0a0a0a]">
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["#0a0a0a"]} />
        <fog attach="fog" args={["#0a0a0a", 5, 15]} />

        <Suspense fallback={null}>
          <Environment preset="night" />
          <ambientLight intensity={0.2} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={1.5}
            castShadow
          />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />

          <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
            <PortfolioBook />
          </Float>

          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.4}
            scale={10}
            blur={2}
            far={4.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
