"use client";

import { Html, Float, MeshDistortMaterial, MeshWobbleMaterial } from "@react-three/drei";
import * as THREE from "three";
import { InteractiveElement } from "./InteractiveElement";

interface PageContentProps {
  index: number;
  side: "front" | "back";
  nextPageIndex?: number;
}

export function PageContent({ index, side, nextPageIndex }: PageContentProps) {
  // BACK SIDE: The Left Page (Dioramas only)
  if (side === "back") {
    const dioramaIndex = nextPageIndex ?? index + 1;
    return (
      <group>
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[2.2, 3]} />
          <meshStandardMaterial color="#f2f2f0" roughness={1} />
        </mesh>
        
        {/* Glass Pedestal for the Left Page */}
        <mesh position={[0, 0, 0.01]} rotation={[0, 0, 0]}>
          <planeGeometry args={[1.8, 2.6]} />
          <meshStandardMaterial color="#fff" transparent opacity={0.05} metalness={1} roughness={0} />
        </mesh>

        <group position={[0, 0, 0.5]} scale={1.8}>
          {get3DElements(dioramaIndex)}
        </group>
      </group>
    );
  }

  // FRONT SIDE: The Right Page (Text Content or Cover)
  
  // 1. Cover Page Special Case
  if (index === 0 && side === "front") {
    return (
      <group>
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[2.2, 3]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.8} />
        </mesh>
        <Html transform position={[0, 0, 0.02]} distanceFactor={1.5} className="pointer-events-none">
          <div className="w-[440px] h-[600px] flex flex-col justify-center items-center text-[#d4af37] border-[12px] border-[#d4af37]/10 m-4 bg-gradient-to-br from-black/20 to-transparent">
            <h1 className="text-7xl font-serif font-bold text-center px-10 leading-[0.9] tracking-tighter uppercase mb-6">
              THE AI<br/>ARCHITECT
            </h1>
            <div className="w-24 h-[1px] bg-[#d4af37] mb-10" />
            <p className="text-[10px] tracking-[0.8em] uppercase font-sans font-light opacity-60 mb-2">B. Amarendra Nadh</p>
            <p className="text-[8px] tracking-[0.4em] uppercase font-sans font-bold opacity-30">Portfolio — Vol. 2025</p>
          </div>
        </Html>
      </group>
    );
  }

  // 2. Standard Content Page
  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[2.2, 3]} />
        <meshStandardMaterial color="#fcfcfc" roughness={1} />
      </mesh>

      <Html
        transform
        distanceFactor={1.5}
        position={[0, 0, 0.01]}
        className="select-none pointer-events-none"
        occlude="blending"
      >
        <div className="w-[440px] h-[600px] p-14 flex flex-col font-serif text-[#1a1a1a] bg-white/40 backdrop-blur-sm">
          {getContent(index)}
        </div>
      </Html>
    </group>
  );
}

function get3DElements(index: number) {
  switch (index) {
    case 1: // Genesis / Summary
      return (
        <Float speed={2} rotationIntensity={2}>
          <group>
            <mesh>
              <icosahedronGeometry args={[0.2, 2]} />
              <meshStandardMaterial color="#4080ff" emissive="#4080ff" emissiveIntensity={2} wireframe />
            </mesh>
            <mesh rotation={[Math.PI / 4, 0, 0]}>
              <torusGeometry args={[0.35, 0.005, 16, 100]} />
              <meshStandardMaterial color="#4080ff" transparent opacity={0.5} />
            </mesh>
            <mesh rotation={[0, Math.PI / 3, 0]}>
              <torusGeometry args={[0.45, 0.005, 16, 100]} />
              <meshStandardMaterial color="#4080ff" transparent opacity={0.2} />
            </mesh>
          </group>
        </Float>
      );
    case 2: // Arsenal / Skills
      return (
        <group>
          {[-0.35, 0, 0.35].map((x, i) => (
            <Float key={i} speed={2 + i} rotationIntensity={1.5} floatIntensity={2}>
              <mesh position={[x, Math.sin(x + i) * 0.1, 0]} rotation={[i, i, i]}>
                <octahedronGeometry args={[0.18, 0]} />
                <meshStandardMaterial 
                  color={i === 0 ? "#61dafb" : i === 1 ? "#339933" : "#f7df1e"} 
                  metalness={0.9} 
                  roughness={0.1}
                  emissive={i === 0 ? "#61dafb" : i === 1 ? "#339933" : "#f7df1e"}
                  emissiveIntensity={0.5}
                />
              </mesh>
            </Float>
          ))}
        </group>
      );
    case 3: // Artifacts / Projects
      return (
        <group scale={1.2}>
          <Float speed={1.5} rotationIntensity={0.5}>
            <mesh position={[0, 0.1, 0]}>
              <boxGeometry args={[0.5, 0.35, 0.05]} />
              <meshStandardMaterial color="#111" metalness={0.9} roughness={0.1} />
            </mesh>
            <mesh position={[0, 0.1, 0.03]}>
              <planeGeometry args={[0.45, 0.3]} />
              <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={3} />
            </mesh>
            {/* Robot arm base */}
            <mesh position={[0, -0.2, 0]}>
              <cylinderGeometry args={[0.15, 0.2, 0.05, 32]} />
              <meshStandardMaterial color="#333" metalness={1} />
            </mesh>
          </Float>
        </group>
      );
    case 4: // Chronicles / Experience
      return (
        <Float speed={1.2} rotationIntensity={2}>
          <group>
            <mesh>
              <sphereGeometry args={[0.3, 32, 32]} />
              <meshStandardMaterial color="#d4af37" metalness={1} roughness={0.1} />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.4, 0.01, 16, 100]} />
              <meshStandardMaterial color="#d4af37" emissive="#d4af37" emissiveIntensity={1} />
            </mesh>
            <mesh rotation={[Math.PI / 4, 0, 0]}>
              <torusGeometry args={[0.5, 0.005, 16, 100]} />
              <meshStandardMaterial color="#d4af37" transparent opacity={0.3} />
            </mesh>
          </group>
        </Float>
      );
    case 5: // Foundation / Education
      return (
        <Float speed={2} rotationIntensity={0.8} floatIntensity={1.5}>
          <group>
            {[...Array(5)].map((_, i) => (
              <mesh key={i} position={[0, i * 0.08 - 0.2, 0]} rotation={[0, i * 0.1, 0]}>
                <boxGeometry args={[0.5 - i * 0.04, 0.06, 0.4 - i * 0.04]} />
                <meshStandardMaterial color="#fcfcfc" roughness={0.4} />
              </mesh>
            ))}
            <mesh position={[0, 0.25, 0]} rotation={[0.2, 0, 0]}>
              <boxGeometry args={[0.3, 0.02, 0.3]} />
              <meshStandardMaterial color="#1a1a1a" />
            </mesh>
          </group>
        </Float>
      );
    case 6: // Laurels / Achievements
      return (
        <Float speed={3} rotationIntensity={3}>
          <group>
            <mesh position={[0, 0.1, 0]}>
              <coneGeometry args={[0.2, 0.4, 32]} />
              <meshStandardMaterial color="#d4af37" metalness={1} roughness={0} emissive="#d4af37" emissiveIntensity={0.5} />
            </mesh>
            <mesh position={[0, -0.15, 0]}>
              <cylinderGeometry args={[0.15, 0.15, 0.1, 32]} />
              <meshStandardMaterial color="#222" />
            </mesh>
          </group>
        </Float>
      );
    case 7: // Credentials / Certifications
      return (
        <group>
          {[...Array(3)].map((_, i) => (
            <Float key={i} speed={2} delay={i * 0.5}>
              <mesh position={[0, 0, i * -0.15]} rotation={[0, 0, i * 0.15]}>
                <planeGeometry args={[0.6, 0.4]} />
                <meshStandardMaterial color="#fff" side={THREE.DoubleSide} transparent opacity={0.8} />
                <mesh position={[0, 0, 0.001]}>
                  <planeGeometry args={[0.5, 0.3]} />
                  <meshStandardMaterial color="#d4af37" transparent opacity={0.1} />
                </mesh>
              </mesh>
            </Float>
          ))}
        </group>
      );
    case 8: // Initiation / Contact
      return (
        <Float speed={4} rotationIntensity={4} floatIntensity={2}>
          <mesh>
            <dodecahedronGeometry args={[0.3, 0]} />
            <meshStandardMaterial 
              color="#d4af37" 
              emissive="#d4af37" 
              emissiveIntensity={2} 
              wireframe 
              transparent 
              opacity={0.8}
            />
          </mesh>
        </Float>
      );
    default:
      return null;
  }
}

function getContent(index: number) {
  switch (index) {
    case 1:
      return (
        <div className="flex-1 flex flex-col">
          <div className="mb-12">
            <h2 className="text-[10px] uppercase tracking-[0.6em] text-[#d4af37] mb-3 font-sans font-bold">Genesis</h2>
            <h3 className="text-4xl font-bold tracking-tight border-b border-black/10 pb-6">Professional Summary</h3>
          </div>
          <div className="space-y-8">
            <p className="text-base leading-[1.7] text-justify opacity-90 first-letter:text-5xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-[#d4af37]">
              Dynamic Agentic AI Engineer and Full-Stack Developer passionate about building intelligent, 
              autonomous systems and scalable automation workflows. Adept at integrating AI reasoning 
              with real-world tools to deliver production-ready applications.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-6">
              {["Agentic AI", "LangChain", "MERN Stack", "n8n"].map(tag => (
                <div key={tag} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-[#d4af37]" />
                  <span className="text-[10px] uppercase tracking-widest font-sans font-bold opacity-60">{tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    case 2:
      return (
        <div className="flex-1">
          <div className="mb-12">
            <h2 className="text-[10px] uppercase tracking-[0.6em] text-[#d4af37] mb-3 font-sans font-bold">Arsenal</h2>
            <h3 className="text-4xl font-bold tracking-tight border-b border-black/10 pb-6">Core Skills</h3>
          </div>
          <div className="space-y-10 mt-8">
            <div className="group">
              <h4 className="text-[9px] uppercase tracking-[0.4em] opacity-30 mb-4 font-sans font-bold">Foundations</h4>
              <p className="text-lg font-medium tracking-tight">Python, Java (OOP), C, JavaScript (ES6+)</p>
            </div>
            <div className="group">
              <h4 className="text-[9px] uppercase tracking-[0.4em] opacity-30 mb-4 font-sans font-bold">Architecture</h4>
              <p className="text-lg font-medium tracking-tight">MERN Stack (React, Node.js, Express, MongoDB)</p>
            </div>
            <div className="group">
              <h4 className="text-[9px] uppercase tracking-[0.4em] opacity-30 mb-4 font-sans font-bold">Intelligence</h4>
              <p className="text-lg font-bold tracking-tight text-[#d4af37]">Agentic AI, LangChain, LangGraph, AI Automation</p>
            </div>
          </div>
        </div>
      );
    case 3:
      return (
        <div className="flex-1">
          <div className="mb-10">
            <h2 className="text-[10px] uppercase tracking-[0.6em] text-[#d4af37] mb-3 font-sans font-bold">Artifacts</h2>
            <h3 className="text-4xl font-bold tracking-tight border-b border-black/10 pb-6">Key Projects</h3>
          </div>
          <div className="space-y-10 mt-6">
            <div className="relative pl-8">
              <div className="absolute left-0 top-2 w-2 h-2 bg-[#d4af37]" />
              <h4 className="text-base font-bold uppercase tracking-wider mb-2">Automated YouTube Workflow</h4>
              <p className="text-xs leading-relaxed opacity-60 italic">Automated 70% of video preparation using n8n and custom LLM agents.</p>
            </div>
            <div className="relative pl-8">
              <div className="absolute left-0 top-2 w-2 h-2 bg-[#d4af37]" />
              <h4 className="text-base font-bold uppercase tracking-wider mb-2">WebNavigator AI Agent</h4>
              <p className="text-xs leading-relaxed opacity-60 italic">Autonomous navigation agent; reduced manual research time by 60%.</p>
            </div>
            <div className="relative pl-8">
              <div className="absolute left-0 top-2 w-2 h-2 bg-[#d4af37]" />
              <h4 className="text-base font-bold uppercase tracking-wider mb-2">Vignan Marketplace</h4>
              <p className="text-xs leading-relaxed opacity-60 italic">Full-stack student platform with real-time chat and secure JWT auth.</p>
            </div>
          </div>
        </div>
      );
    case 4:
      return (
        <div className="flex-1">
          <div className="mb-12">
            <h2 className="text-[10px] uppercase tracking-[0.6em] text-[#d4af37] mb-3 font-sans font-bold">Chronicles</h2>
            <h3 className="text-4xl font-bold tracking-tight border-b border-black/10 pb-6">Experience</h3>
          </div>
          <div className="space-y-12 mt-8">
            <div className="relative pl-8 border-l-2 border-[#d4af37]/20">
              <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-[#d4af37]" />
              <h4 className="text-base font-bold">Founder — Digital Marketing Startup</h4>
              <p className="text-[9px] uppercase tracking-widest opacity-40 font-sans mt-2 mb-3">Jan 2022 – Present</p>
              <p className="text-xs leading-relaxed opacity-70">Scaled marketing operations; content strategy led to a 60% increase in engagement.</p>
            </div>
            <div className="relative pl-8 border-l-2 border-[#d4af37]/20">
              <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-[#d4af37]" />
              <h4 className="text-base font-bold uppercase">Secretary, E-Cell</h4>
              <p className="text-[9px] uppercase tracking-widest opacity-40 font-sans mt-2 mb-3">Aug 2023 – Present</p>
              <p className="text-xs leading-relaxed opacity-70">Organized 20+ technical events. Spearheaded campaigns resulting in 70% boost in reach.</p>
            </div>
          </div>
        </div>
      );
    case 5:
      return (
        <div className="flex-1">
          <div className="mb-12">
            <h2 className="text-[10px] uppercase tracking-[0.6em] text-[#d4af37] mb-3 font-sans font-bold">Foundation</h2>
            <h3 className="text-4xl font-bold tracking-tight border-b border-black/10 pb-6">Education</h3>
          </div>
          <div className="space-y-12 mt-10">
            <div>
              <h4 className="text-base font-bold uppercase tracking-widest mb-2">B.Tech in CSE</h4>
              <p className="text-xs opacity-50 mb-4 tracking-tight">Vignan's Foundation for Science & Tech</p>
              <div className="flex items-center gap-4">
                <span className="text-[11px] bg-black/5 px-3 py-1 font-sans font-bold border border-black/5">CGPA: 8.0</span>
                <span className="text-[10px] opacity-40 uppercase tracking-widest font-sans">2022 – 2026</span>
              </div>
            </div>
            <div>
              <h4 className="text-base font-bold uppercase tracking-widest mb-2">Intermediate (MPC)</h4>
              <p className="text-xs opacity-50 mb-4 tracking-tight">NRI Junior College, Tenali</p>
              <div className="flex items-center gap-4">
                <span className="text-[11px] bg-black/5 px-3 py-1 font-sans font-bold border border-black/5">70.1%</span>
                <span className="text-[10px] opacity-40 uppercase tracking-widest font-sans">2020 – 2022</span>
              </div>
            </div>
          </div>
        </div>
      );
    case 6:
      return (
        <div className="flex-1">
          <div className="mb-12">
            <h2 className="text-[10px] uppercase tracking-[0.6em] text-[#d4af37] mb-3 font-sans font-bold">Laurels</h2>
            <h3 className="text-4xl font-bold tracking-tight border-b border-black/10 pb-6">Achievements</h3>
          </div>
          <ul className="space-y-8 mt-8">
            <li className="flex gap-5">
              <span className="text-[#d4af37] text-xl">✦</span>
              <div>
                <p className="text-base font-bold leading-snug">2× Winner – Cisco ThingQbator</p>
                <p className="text-[10px] opacity-40 mt-2 font-sans uppercase tracking-widest">Innovation and Excellence</p>
              </div>
            </li>
            <li className="flex gap-5">
              <span className="text-[#d4af37] text-xl">✦</span>
              <div>
                <p className="text-base font-bold leading-snug">Local LLM Orchestration</p>
                <p className="text-[10px] opacity-40 mt-2 font-sans uppercase tracking-widest">Reduced API costs by 40%</p>
              </div>
            </li>
            <li className="flex gap-5">
              <span className="text-[#d4af37] text-xl">✦</span>
              <div>
                <p className="text-base font-bold leading-snug">Educational Platforms</p>
                <p className="text-[10px] opacity-40 mt-2 font-sans uppercase tracking-widest">Adopted by 150+ students</p>
              </div>
            </li>
          </ul>
        </div>
      );
    case 7:
      return (
        <div className="flex-1">
          <div className="mb-10">
            <h2 className="text-[10px] uppercase tracking-[0.6em] text-[#d4af37] mb-3 font-sans font-bold">Credentials</h2>
            <h3 className="text-4xl font-bold tracking-tight border-b border-black/10 pb-6">Certifications</h3>
          </div>
          <div className="grid grid-cols-2 gap-5 mt-8">
            {["CCNA 1, 2, 3", "Cybersecurity", "Data Vis", "HR Analytics"].map((cert, i) => (
              <div key={cert} className="p-5 bg-black/[0.02] border border-black/[0.05] flex flex-col justify-between aspect-square hover:bg-[#d4af37]/5 hover:border-[#d4af37]/20 transition-all group">
                <span className="text-[9px] opacity-20 font-sans font-bold tracking-tighter">CERT_ID_0{i+1}</span>
                <p className="text-[11px] font-bold leading-tight tracking-tight uppercase group-hover:text-[#d4af37] transition-colors">{cert}</p>
                <div className="w-6 h-[1px] bg-[#d4af37]/20 group-hover:w-full transition-all" />
              </div>
            ))}
          </div>
        </div>
      );
    case 8:
      return (
        <div className="flex-1 flex flex-col justify-center items-center text-center">
          <div className="mb-14">
            <h2 className="text-[10px] uppercase tracking-[0.8em] text-[#d4af37] mb-6 font-sans font-bold">Initiation</h2>
            <h3 className="text-5xl font-bold tracking-tighter leading-[1.1]">Let's build<br/>intelligent systems.</h3>
          </div>
          <div className="space-y-8 w-full max-w-[300px]">
            <div className="space-y-2">
              <p className="text-[9px] opacity-30 uppercase tracking-[0.4em] font-sans font-bold">Transmission</p>
              <p className="text-lg font-bold tracking-tight text-[#1a1a1a]">221fa04394@gmail.com</p>
              <p className="text-lg font-bold tracking-tight text-[#1a1a1a]">+91 9618562549</p>
            </div>
            <div className="flex gap-8 justify-center pt-8 border-t border-black/10">
              <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-bold opacity-40 hover:opacity-100 hover:text-[#d4af37] transition-all cursor-pointer">LinkedIn</span>
              <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-bold opacity-40 hover:opacity-100 hover:text-[#d4af37] transition-all cursor-pointer">GitHub</span>
            </div>
          </div>
          <div className="mt-20">
            <p className="text-[9px] opacity-10 uppercase tracking-[0.6em] font-sans font-bold">Terminal Sequence — 2025</p>
          </div>
        </div>
      );
    default:
      return null;
  }
}
