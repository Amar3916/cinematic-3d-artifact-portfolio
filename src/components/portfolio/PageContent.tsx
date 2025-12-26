"use client";

import { Html, Text, Float } from "@react-three/drei";
import * as THREE from "three";
import { usePortfolioStore } from "@/lib/store";

interface PageContentProps {
  index: number;
  side: "front" | "back";
}

export function PageContent({ index, side }: PageContentProps) {
  if (side === "back") {
    return (
      <group>
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[2.2, 3]} />
          <meshStandardMaterial color="#f0f0f0" roughness={1} />
        </mesh>
        {/* Subtle page texture or "next chapter" hint could go here */}
      </group>
    );
  }

  return (
    <group>
      {/* Background Plane to prevent seeing through and provide a surface for Html */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[2.2, 3]} />
        <meshStandardMaterial color="#fcfcfc" roughness={1} />
      </mesh>

      {/* Content Container */}
      <Html
        transform
        distanceFactor={1.5}
        position={[0, 0, 0.01]}
        className="select-none pointer-events-none"
        occlude="blending" // Better occlusion handling
      >
        <div className="w-[440px] h-[600px] p-10 flex flex-col font-serif text-[#1a1a1a] bg-white/50 backdrop-blur-sm">
          {getContent(index)}
        </div>
      </Html>

      {/* 3D Elements for the page */}
      <group position={[0, 0, 0.15]}>
        {get3DElements(index)}
      </group>
    </group>
  );
}

function getContent(index: number) {
  switch (index) {
    case 0:
      return (
        <div className="flex-1 flex flex-col justify-center items-center text-center space-y-8">
          <div className="space-y-2">
            <h1 className="text-5xl font-bold tracking-tighter text-[#1a1a1a] drop-shadow-sm">B. Amarendra Nadh</h1>
            <div className="flex items-center justify-center gap-4">
              <div className="h-[1px] w-8 bg-[#d4af37]" />
              <p className="text-[10px] uppercase tracking-[0.4em] text-[#d4af37] font-sans font-semibold">Agentic AI Engineer</p>
              <div className="h-[1px] w-8 bg-[#d4af37]" />
            </div>
          </div>
          
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.2em] opacity-40 font-sans">Full-Stack Developer</p>
            <p className="text-[10px] opacity-20 italic">"An AI engineer's mind visualized as a living artifact."</p>
          </div>
        </div>
      );
    case 1:
      return (
        <div className="flex-1 flex flex-col">
          <div className="mb-10">
            <h2 className="text-[10px] uppercase tracking-[0.5em] text-[#d4af37] mb-2 font-sans font-bold">Genesis</h2>
            <h3 className="text-3xl font-bold border-b border-black/5 pb-4">Professional Summary</h3>
          </div>
          <div className="space-y-6">
            <p className="text-sm leading-relaxed text-justify opacity-80 first-letter:text-4xl first-letter:font-bold first-letter:mr-2 first-letter:float-left">
              Dynamic Agentic AI Engineer and Full-Stack Developer passionate about building intelligent, 
              autonomous systems and scalable automation workflows. Adept at integrating AI reasoning 
              with real-world tools to deliver adaptive, production-ready applications.
            </p>
            <div className="flex gap-3 flex-wrap pt-4">
              {["LLMs", "LangChain", "MERN", "n8n", "LangGraph"].map(tag => (
                <span key={tag} className="px-3 py-1.5 border border-black/5 text-[9px] uppercase tracking-widest font-sans font-medium hover:bg-black/5 transition-colors">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      );
    case 2:
      return (
        <div className="flex-1">
          <div className="mb-10">
            <h2 className="text-[10px] uppercase tracking-[0.5em] text-[#d4af37] mb-2 font-sans font-bold">Arsenal</h2>
            <h3 className="text-3xl font-bold border-b border-black/5 pb-4">Core Skills</h3>
          </div>
          <div className="space-y-8 mt-6">
            <div className="group">
              <h4 className="text-[10px] uppercase tracking-[0.3em] opacity-40 mb-3 font-sans font-bold">Foundations</h4>
              <p className="text-sm font-semibold tracking-tight">Python, Java (OOP), C, JavaScript (ES6+)</p>
            </div>
            <div className="group">
              <h4 className="text-[10px] uppercase tracking-[0.3em] opacity-40 mb-3 font-sans font-bold">Architecture</h4>
              <p className="text-sm font-semibold tracking-tight">MERN Stack (React, Node.js, Express, MongoDB)</p>
            </div>
            <div className="group">
              <h4 className="text-[10px] uppercase tracking-[0.3em] opacity-40 mb-3 font-sans font-bold">Intelligence</h4>
              <p className="text-sm font-semibold tracking-tight text-[#d4af37]">Agentic AI, LangChain, LangGraph, AI Automation</p>
            </div>
          </div>
        </div>
      );
    case 3:
      return (
        <div className="flex-1">
          <div className="mb-8">
            <h2 className="text-[10px] uppercase tracking-[0.5em] text-[#d4af37] mb-2 font-sans font-bold">Artifacts</h2>
            <h3 className="text-3xl font-bold border-b border-black/5 pb-4">Key Projects</h3>
          </div>
          <div className="space-y-8">
            <div className="relative pl-6">
              <div className="absolute left-0 top-1.5 w-1.5 h-1.5 bg-[#d4af37]" />
              <h4 className="text-sm font-bold uppercase tracking-wide mb-1">Automated YouTube Workflow</h4>
              <p className="text-[11px] leading-relaxed opacity-60 italic">Automated 70% of video preparation using n8n and custom LLM agents.</p>
            </div>
            <div className="relative pl-6">
              <div className="absolute left-0 top-1.5 w-1.5 h-1.5 bg-[#d4af37]" />
              <h4 className="text-sm font-bold uppercase tracking-wide mb-1">WebNavigator AI</h4>
              <p className="text-[11px] leading-relaxed opacity-60 italic">Autonomous web navigation agent; reduced manual research time by 60%.</p>
            </div>
            <div className="relative pl-6">
              <div className="absolute left-0 top-1.5 w-1.5 h-1.5 bg-[#d4af37]" />
              <h4 className="text-sm font-bold uppercase tracking-wide mb-1">Vignan Marketplace</h4>
              <p className="text-[11px] leading-relaxed opacity-60 italic">Full-stack student platform with real-time chat and secure JWT auth.</p>
            </div>
          </div>
        </div>
      );
    case 4:
      return (
        <div className="flex-1">
          <div className="mb-10">
            <h2 className="text-[10px] uppercase tracking-[0.5em] text-[#d4af37] mb-2 font-sans font-bold">Chronicles</h2>
            <h3 className="text-3xl font-bold border-b border-black/5 pb-4">Experience</h3>
          </div>
          <div className="space-y-10">
            <div className="relative pl-6 border-l-2 border-[#d4af37]/20">
              <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-[#d4af37]" />
              <h4 className="text-sm font-bold">Founder — Digital Marketing Startup</h4>
              <p className="text-[9px] uppercase tracking-widest opacity-40 font-sans mt-1">Jan 2022 – Present</p>
              <p className="text-[11px] mt-2 opacity-70">Scaled marketing operations; content strategy led to a 60% increase in engagement.</p>
            </div>
            <div className="relative pl-6 border-l-2 border-[#d4af37]/20">
              <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-[#d4af37]" />
              <h4 className="text-sm font-bold">Secretary, E-Cell — Vignan Univ.</h4>
              <p className="text-[9px] uppercase tracking-widest opacity-40 font-sans mt-1">Aug 2023 – Present</p>
              <p className="text-[11px] mt-2 opacity-70">Organized 20+ technical events. Spearheaded campaigns resulting in 70% boost in reach.</p>
            </div>
          </div>
        </div>
      );
    case 5:
      return (
        <div className="flex-1">
          <div className="mb-10">
            <h2 className="text-[10px] uppercase tracking-[0.5em] text-[#d4af37] mb-2 font-sans font-bold">Foundation</h2>
            <h3 className="text-3xl font-bold border-b border-black/5 pb-4">Education</h3>
          </div>
          <div className="space-y-10 mt-6">
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider mb-1">B.Tech in CSE</h4>
              <p className="text-xs opacity-60">Vignan's Foundation for Science & Tech</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] bg-black/5 px-2 py-0.5 font-sans font-bold">GPA: 8.0</span>
                <span className="text-[10px] opacity-40 font-sans">2022 – 2026</span>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider mb-1">Intermediate (MPC)</h4>
              <p className="text-xs opacity-60">NRI Junior College, Tenali</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] bg-black/5 px-2 py-0.5 font-sans font-bold">70.1%</span>
                <span className="text-[10px] opacity-40 font-sans">2020 – 2022</span>
              </div>
            </div>
          </div>
        </div>
      );
    case 6:
      return (
        <div className="flex-1">
          <div className="mb-10">
            <h2 className="text-[10px] uppercase tracking-[0.5em] text-[#d4af37] mb-2 font-sans font-bold">Laurels</h2>
            <h3 className="text-3xl font-bold border-b border-black/5 pb-4">Achievements</h3>
          </div>
          <ul className="space-y-6">
            <li className="flex gap-4">
              <span className="text-[#d4af37] text-lg">✦</span>
              <div>
                <p className="text-sm font-bold leading-tight">2× Winner – Cisco ThingQbator</p>
                <p className="text-[10px] opacity-50 mt-1 font-sans">Innovation and Technical Excellence</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-[#d4af37] text-lg">✦</span>
              <div>
                <p className="text-sm font-bold leading-tight">Local LLM Orchestration</p>
                <p className="text-[10px] opacity-50 mt-1 font-sans">Hosted DeepSeek/OpenAI models locally, reducing API costs by 40%</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-[#d4af37] text-lg">✦</span>
              <div>
                <p className="text-sm font-bold leading-tight">Educational Impact</p>
                <p className="text-[10px] opacity-50 mt-1 font-sans">Created platforms adopted by 150+ students</p>
              </div>
            </li>
          </ul>
        </div>
      );
    case 7:
      return (
        <div className="flex-1">
          <div className="mb-10">
            <h2 className="text-[10px] uppercase tracking-[0.5em] text-[#d4af37] mb-2 font-sans font-bold">Credentials</h2>
            <h3 className="text-3xl font-bold border-b border-black/5 pb-4">Certifications</h3>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {["CCNA 1, 2, 3", "Cybersecurity Essentials", "Data Visualization", "HR Analytics"].map((cert, i) => (
              <div key={cert} className="p-4 bg-black/5 border border-black/5 rounded-sm flex flex-col justify-between aspect-square hover:bg-[#d4af37]/5 hover:border-[#d4af37]/20 transition-all group">
                <span className="text-[10px] opacity-20 font-sans font-bold">0{i+1}</span>
                <p className="text-[11px] font-bold leading-tight tracking-tight uppercase">{cert}</p>
                <div className="w-2 h-2 bg-[#d4af37]/20 group-hover:bg-[#d4af37] transition-colors rounded-full" />
              </div>
            ))}
          </div>
        </div>
      );
    case 8:
      return (
        <div className="flex-1 flex flex-col justify-center items-center text-center">
          <div className="mb-12">
            <h2 className="text-[10px] uppercase tracking-[0.6em] text-[#d4af37] mb-4 font-sans font-bold">Initiation</h2>
            <h3 className="text-4xl font-bold drop-shadow-sm">Let's build intelligent systems together.</h3>
          </div>
          <div className="space-y-6 w-full max-w-[280px]">
            <div className="space-y-1">
              <p className="text-[10px] opacity-30 uppercase tracking-[0.3em] font-sans font-bold">Transmission</p>
              <p className="text-md font-bold text-[#1a1a1a]">221fa04394@gmail.com</p>
              <p className="text-md font-bold text-[#1a1a1a]">+91 9618562549</p>
            </div>
            <div className="flex gap-4 justify-center pt-4 border-t border-black/5">
              <span className="text-[9px] uppercase tracking-widest font-sans font-bold opacity-40 hover:opacity-100 transition-opacity cursor-pointer">LinkedIn</span>
              <span className="text-[9px] uppercase tracking-widest font-sans font-bold opacity-40 hover:opacity-100 transition-opacity cursor-pointer">GitHub</span>
            </div>
          </div>
          <div className="mt-20">
            <p className="text-[10px] opacity-20 uppercase tracking-[0.5em] font-sans">Amar — 2025</p>
          </div>
        </div>
      );
    default:
      return null;
  }
}

function get3DElements(index: number) {
  switch (index) {
    case 0:
      return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
          <mesh>
            <sphereGeometry args={[0.08, 32, 32]} />
            <meshStandardMaterial 
              color="#d4af37" 
              emissive="#d4af37" 
              emissiveIntensity={4} 
              roughness={0} 
              metalness={1} 
            />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.15, 0.005, 16, 100]} />
            <meshStandardMaterial color="#d4af37" emissive="#d4af37" emissiveIntensity={2} />
          </mesh>
          <mesh rotation={[0, Math.PI / 2, 0]}>
            <torusGeometry args={[0.2, 0.005, 16, 100]} />
            <meshStandardMaterial color="#d4af37" emissive="#d4af37" emissiveIntensity={2} />
          </mesh>
        </Float>
      );
    case 1:
      // AI Neural network core
      return (
        <group>
          <mesh>
            <icosahedronGeometry args={[0.1, 1]} />
            <meshStandardMaterial color="#4080ff" wireframe />
          </mesh>
          {[...Array(12)].map((_, i) => (
            <mesh key={i} position={[
              Math.sin(i) * 0.2,
              Math.cos(i) * 0.2,
              Math.sin(i * 2) * 0.1
            ]}>
              <sphereGeometry args={[0.01, 8, 8]} />
              <meshStandardMaterial color="#4080ff" emissive="#4080ff" emissiveIntensity={2} />
            </mesh>
          ))}
        </group>
      );
    case 2:
      // Modular skill blocks
      return (
        <group>
          {[-0.3, 0, 0.3].map((x, i) => (
            <Float key={i} speed={2} delay={i * 0.5}>
              <mesh position={[x, Math.sin(x) * 0.2, 0]}>
                <boxGeometry args={[0.1, 0.1, 0.1]} />
                <meshStandardMaterial color={i === 0 ? "#61dafb" : i === 1 ? "#339933" : "#f7df1e"} />
              </mesh>
            </Float>
          ))}
        </group>
      );
    case 3:
      // Project Diorama: YouTube robot arm + screen
      return (
        <group scale={0.5}>
          {/* Base */}
          <mesh position={[0, -0.2, 0]}>
            <cylinderGeometry args={[0.2, 0.2, 0.05, 32]} />
            <meshStandardMaterial color="#333" />
          </mesh>
          {/* Screen */}
          <mesh position={[0, 0.2, -0.1]} rotation={[-0.2, 0, 0]}>
            <boxGeometry args={[0.4, 0.25, 0.02]} />
            <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0.5} />
          </mesh>
          {/* Arm segments */}
          <mesh position={[0, 0, 0]} rotation={[0, 0, 0.5]}>
            <capsuleGeometry args={[0.02, 0.2, 4, 8]} />
            <meshStandardMaterial color="#666" />
          </mesh>
        </group>
      );
    case 4:
      // Startup/Experience globe
      return (
        <group rotation={[0.4, 0, 0]}>
          <mesh>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color="#222" wireframe opacity={0.3} transparent />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.1, 32, 32]} />
            <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={1} />
          </mesh>
        </group>
      );
    case 6:
      // Trophy
      return (
        <Float speed={3} floatIntensity={2}>
          <mesh position={[0, 0.1, 0]}>
            <cylinderGeometry args={[0.05, 0.02, 0.2, 32]} />
            <meshStandardMaterial color="#d4af37" metalness={1} roughness={0.1} />
          </mesh>
          <mesh position={[0, -0.1, 0]}>
            <cylinderGeometry args={[0.08, 0.1, 0.05, 32]} />
            <meshStandardMaterial color="#333" />
          </mesh>
        </Float>
      );
    default:
      return null;
  }
}
