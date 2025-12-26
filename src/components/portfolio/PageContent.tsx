"use client";

import { Html, Float, MeshDistortMaterial, MeshWobbleMaterial, PresentationControls } from "@react-three/drei";
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
          <meshStandardMaterial color="#f8f8f6" roughness={1} />
        </mesh>
        
        {/* Decorative elements on the left page */}
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[1.8, 2.6]} />
          <meshStandardMaterial color="#d4af37" transparent opacity={0.03} />
        </mesh>

        <group position={[0, 0, 0.4]} scale={1.8}>
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
            <meshStandardMaterial color="#0c0c0c" roughness={0.1} metalness={0.9} />
          </mesh>
          
          {/* Cover Title Glow */}
          <mesh position={[0, 0.5, 0.01]}>
            <planeGeometry args={[1.8, 1]} />
            <meshStandardMaterial color="#d4af37" transparent opacity={0.1} emissive="#d4af37" emissiveIntensity={0.5} />
          </mesh>
  
          <Html transform position={[0, 0, 0.025]} distanceFactor={1.5} className="pointer-events-none">
            <div className="w-[440px] h-[600px] flex flex-col justify-center items-center text-[#d4af37] border-[20px] border-[#d4af37]/20 bg-gradient-to-br from-black/80 via-black/40 to-transparent backdrop-blur-md p-10">
              <div className="border-4 border-[#d4af37]/40 p-8 flex flex-col items-center w-full h-full justify-center relative overflow-hidden">
                {/* Decorative Corner */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#d4af37]" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#d4af37]" />
                
                <h1 className="text-7xl font-serif font-black text-center leading-[1.1] tracking-tighter uppercase mb-10 drop-shadow-[0_0_30px_rgba(212,175,55,0.6)] text-white">
                  THE AI<br/><span className="text-[#d4af37]">ARCHITECT</span>
                </h1>
                <div className="w-48 h-[3px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mb-12" />
                <div className="space-y-6 text-center">
                  <p className="text-[22px] tracking-[0.5em] uppercase font-sans font-black text-white drop-shadow-md mb-2">
                    Amarendra Nadh
                  </p>
                  <p className="text-[12px] tracking-[0.4em] uppercase font-sans font-bold text-[#d4af37] bg-black/40 px-4 py-2 border border-[#d4af37]/30">
                    Portfolio — Vol. 2025
                  </p>
                </div>
              </div>
            </div>
          </Html>
        </group>
      );
    }
  
    // 2. Standard Content Page (Updated to Premium Dark Theme)
    return (
      <group>
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[2.2, 3]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.1} metalness={0.8} />
        </mesh>
  
        {/* Page Highlight */}
        <mesh position={[0, 0, 0.005]}>
          <planeGeometry args={[2, 2.8]} />
          <meshStandardMaterial color="#d4af37" transparent opacity={0.02} />
        </mesh>
  
        {/* Professional Summary Page Special Layout */}
        {index === 1 && side === "front" && (
          <group position={[0.7, 0.8, 0.05]} scale={0.7}>
             {get3DElements(1)}
          </group>
        )}
  
        <Html
          transform
          distanceFactor={1.5}
          position={[0, 0, 0.015]}
          className="select-none pointer-events-none"
          occlude="blending"
        >
          <div className="w-[440px] h-[600px] p-16 flex flex-col font-serif text-white bg-black/80 backdrop-blur-2xl border-l border-white/5 shadow-2xl">
            {getContent(index)}
          </div>
        </Html>
      </group>
    );
}

function get3DElements(index: number) {
  switch (index) {
    case 1: // Professional Summary - Neural Core
      return (
        <InteractiveElement position={[0, 0, 0]}>
          <group>
            {/* Inner Core */}
            <mesh>
              <sphereGeometry args={[0.2, 32, 32]} />
              <meshStandardMaterial 
                color="#d4af37" 
                metalness={1} 
                roughness={0} 
                emissive="#d4af37"
                emissiveIntensity={2}
              />
            </mesh>
            {/* Glowing Rings */}
            {[0, 1, 2].map((i) => (
              <mesh key={i} rotation={[Math.PI * Math.random(), Math.PI * Math.random(), 0]}>
                <torusGeometry args={[0.35 + i * 0.05, 0.005, 16, 100]} />
                <meshStandardMaterial color="#d4af37" emissive="#d4af37" emissiveIntensity={5} transparent opacity={0.6} />
              </mesh>
            ))}
            {/* Floating Particles */}
            {[...Array(12)].map((_, i) => (
              <mesh key={i} position={[
                Math.sin(i * 0.5) * 0.4,
                Math.cos(i * 0.5) * 0.4,
                Math.sin(i * 0.8) * 0.2
              ]}>
                <sphereGeometry args={[0.01, 8, 8]} />
                <meshStandardMaterial color="#d4af37" emissive="#d4af37" emissiveIntensity={10} />
              </mesh>
            ))}
            <pointLight position={[0, 0, 0]} color="#d4af37" intensity={8} distance={2} />
          </group>
        </InteractiveElement>
      );
    case 2: // Skills - Crystalline Power
      return (
        <group>
          {[-0.5, 0, 0.5].map((x, i) => (
            <InteractiveElement key={i} position={[x, 0, 0]}>
              <mesh rotation={[i * 0.5, i, 0]}>
                <octahedronGeometry args={[0.22, 0]} />
                <meshStandardMaterial 
                  color={i === 0 ? "#00f2ff" : i === 1 ? "#d4af37" : "#ff00ea"} 
                  metalness={1} 
                  roughness={0.05}
                  envMapIntensity={2}
                  emissive={i === 0 ? "#00f2ff" : i === 1 ? "#d4af37" : "#ff00ea"}
                  emissiveIntensity={2}
                />
              </mesh>
              <pointLight color={i === 0 ? "#00f2ff" : i === 1 ? "#d4af37" : "#ff00ea"} intensity={2} distance={1} />
            </InteractiveElement>
          ))}
        </group>
      );
    case 3: // Projects - Digital Monoliths
      return (
        <group>
          <InteractiveElement position={[0, 0, 0]}>
            <group>
              <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.45, 0.7, 0.08]} />
                <meshStandardMaterial color="#050505" metalness={1} roughness={0.1} />
              </mesh>
              {/* Screen Glow */}
              <mesh position={[0, 0, 0.041]}>
                <planeGeometry args={[0.4, 0.65]} />
                <meshStandardMaterial 
                  color="#d4af37" 
                  emissive="#d4af37" 
                  emissiveIntensity={2} 
                  transparent 
                  opacity={0.9}
                />
              </mesh>
              {/* Floating Data Bits */}
              {[...Array(8)].map((_, i) => (
                <mesh key={i} position={[
                  (Math.random() - 0.5) * 0.6,
                  (Math.random() - 0.5) * 1,
                  0.1
                ]}>
                  <boxGeometry args={[0.02, 0.02, 0.02]} />
                  <meshStandardMaterial color="#d4af37" emissive="#d4af37" emissiveIntensity={5} />
                </mesh>
              ))}
            </group>
          </InteractiveElement>
        </group>
      );
    case 4: // Experience - Orbital Spheres
      return (
        <InteractiveElement position={[0, 0, 0]}>
          <group>
            <mesh>
              <sphereGeometry args={[0.25, 64, 64]} />
              <meshStandardMaterial color="#d4af37" metalness={1} roughness={0} emissive="#d4af37" emissiveIntensity={0.5} />
            </mesh>
            {[0.4, 0.5, 0.6].map((radius, i) => (
              <mesh key={i} rotation={[Math.PI / 2, i * 0.5, 0]}>
                <torusGeometry args={[radius, 0.005, 32, 200]} />
                <meshStandardMaterial color="#d4af37" emissive="#d4af37" emissiveIntensity={2} transparent opacity={0.4} />
              </mesh>
            ))}
            <pointLight position={[0, 0, 0]} color="#d4af37" intensity={4} distance={2} />
          </group>
        </InteractiveElement>
      );
    case 5: // Education - Knowledge Stack
      return (
        <InteractiveElement position={[0, 0, 0]}>
          <group>
            {[...Array(6)].map((_, i) => (
              <mesh key={i} position={[0, i * 0.08 - 0.2, 0]} rotation={[0, i * 0.1, 0]}>
                <boxGeometry args={[0.6 - i * 0.05, 0.06, 0.45 - i * 0.05]} />
                <meshStandardMaterial 
                  color={i % 2 === 0 ? "#ffffff" : "#d4af37"} 
                  metalness={i % 2 === 0 ? 0.2 : 1} 
                  roughness={0.1}
                  emissive={i % 2 === 0 ? "#ffffff" : "#d4af37"}
                  emissiveIntensity={i % 2 === 0 ? 0.1 : 0.5}
                />
              </mesh>
            ))}
          </group>
        </InteractiveElement>
      );
    case 6: // Achievements - Golden Relic
      return (
        <InteractiveElement position={[0, 0, 0]}>
          <group>
            <mesh position={[0, 0.15, 0]}>
              <octahedronGeometry args={[0.25, 0]} />
              <meshStandardMaterial color="#d4af37" metalness={1} roughness={0} emissive="#d4af37" emissiveIntensity={1} />
            </mesh>
            <mesh position={[0, -0.15, 0]}>
              <cylinderGeometry args={[0.2, 0.22, 0.1, 32]} />
              <meshStandardMaterial color="#0a0a0a" metalness={1} roughness={0.1} />
            </mesh>
            <pointLight position={[0, 0.2, 0]} color="#d4af37" intensity={5} distance={1} />
          </group>
        </InteractiveElement>
      );
    case 7: // Certifications - Glass Slates
      return (
        <group>
          {[-0.3, 0, 0.3].map((x, i) => (
            <InteractiveElement key={i} position={[x, i * 0.1 - 0.1, i * -0.1]}>
              <mesh rotation={[0.2, 0, 0]}>
                <boxGeometry args={[0.4, 0.3, 0.01]} />
                <meshStandardMaterial 
                  color="#ffffff" 
                  transparent 
                  opacity={0.3} 
                  metalness={1} 
                  roughness={0}
                  envMapIntensity={2}
                />
              </mesh>
              <mesh position={[0, 0, 0.006]}>
                <planeGeometry args={[0.35, 0.25]} />
                <meshStandardMaterial color="#d4af37" transparent opacity={0.1} />
              </mesh>
            </InteractiveElement>
          ))}
        </group>
      );
    case 8: // Contact - Radiant Node
      return (
        <InteractiveElement position={[0, 0, 0]}>
          <group>
            <mesh>
              <dodecahedronGeometry args={[0.35, 0]} />
              <meshStandardMaterial 
                color="#d4af37" 
                emissive="#d4af37" 
                emissiveIntensity={5} 
                wireframe 
                transparent 
                opacity={0.8}
              />
            </mesh>
            <mesh>
              <sphereGeometry args={[0.12, 32, 32]} />
              <meshStandardMaterial color="#d4af37" emissive="#d4af37" emissiveIntensity={15} metalness={1} roughness={0} />
            </mesh>
            <pointLight position={[0, 0, 0]} color="#d4af37" intensity={10} distance={3} />
          </group>
        </InteractiveElement>
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
          <div className="mb-14">
            <h2 className="text-[11px] uppercase tracking-[0.6em] text-[#d4af37] mb-4 font-sans font-bold">Genesis</h2>
            <h3 className="text-5xl font-bold tracking-tighter border-b-2 border-black/5 pb-8">Professional Summary</h3>
          </div>
          <div className="space-y-10">
            <p className="text-lg leading-[1.75] text-justify text-black/80 first-letter:text-6xl first-letter:font-bold first-letter:mr-4 first-letter:float-left first-letter:text-[#d4af37] first-letter:font-serif">
              Dynamic Agentic AI Engineer and Full-Stack Developer passionate about building intelligent, 
              autonomous systems and scalable automation workflows. Adept at integrating AI reasoning 
              with real-world tools to deliver production-ready applications that redefine human-machine interaction.
            </p>
            <div className="grid grid-cols-2 gap-y-6 pt-10 border-t border-black/5">
              {["Agentic AI", "LangChain", "MERN Stack", "n8n Automation"].map(tag => (
                <div key={tag} className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-[#d4af37] rotate-45" />
                  <span className="text-[11px] uppercase tracking-[0.2em] font-sans font-bold text-black/60">{tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    case 2:
      return (
        <div className="flex-1">
          <div className="mb-14">
            <h2 className="text-[11px] uppercase tracking-[0.6em] text-[#d4af37] mb-4 font-sans font-bold">Arsenal</h2>
            <h3 className="text-5xl font-bold tracking-tighter border-b-2 border-black/5 pb-8">Core Skills</h3>
          </div>
          <div className="space-y-12 mt-10">
            <div className="group">
              <h4 className="text-[10px] uppercase tracking-[0.4em] text-black/30 mb-5 font-sans font-bold">Foundations</h4>
              <p className="text-xl font-medium tracking-tight text-black/90">Python, Java (OOP), C, JavaScript (ES6+)</p>
            </div>
            <div className="group">
              <h4 className="text-[10px] uppercase tracking-[0.4em] text-black/30 mb-5 font-sans font-bold">Architecture</h4>
              <p className="text-xl font-medium tracking-tight text-black/90">MERN Stack (React, Node.js, Express, MongoDB)</p>
            </div>
            <div className="group">
              <h4 className="text-[10px] uppercase tracking-[0.4em] text-[#d4af37] mb-5 font-sans font-bold">Intelligence</h4>
              <p className="text-2xl font-bold tracking-tight text-[#d4af37] drop-shadow-sm">Agentic AI, LangChain, LangGraph, AI Automation</p>
            </div>
          </div>
        </div>
      );
    case 3:
      return (
        <div className="flex-1">
          <div className="mb-12">
            <h2 className="text-[11px] uppercase tracking-[0.6em] text-[#d4af37] mb-4 font-sans font-bold">Artifacts</h2>
            <h3 className="text-5xl font-bold tracking-tighter border-b-2 border-black/5 pb-8">Key Projects</h3>
          </div>
          <div className="space-y-12 mt-10">
            {[
              { title: "Automated YouTube Workflow", desc: "Automated 70% of video preparation using n8n and custom LLM agents." },
              { title: "WebNavigator AI Agent", desc: "Autonomous navigation agent; reduced manual research time by 60%." },
              { title: "Vignan Marketplace", desc: "Full-stack student platform with real-time chat and secure JWT auth." }
            ].map((proj, i) => (
              <div key={i} className="relative pl-10">
                <div className="absolute left-0 top-1 w-3 h-3 bg-[#d4af37]/30 border border-[#d4af37]" />
                <h4 className="text-lg font-bold uppercase tracking-wider mb-3 text-black/90">{proj.title}</h4>
                <p className="text-[13px] leading-relaxed text-black/60 italic font-medium">{proj.desc}</p>
              </div>
            ))}
          </div>
        </div>
      );
    case 4:
      return (
        <div className="flex-1">
          <div className="mb-14">
            <h2 className="text-[11px] uppercase tracking-[0.6em] text-[#d4af37] mb-4 font-sans font-bold">Chronicles</h2>
            <h3 className="text-5xl font-bold tracking-tighter border-b-2 border-black/5 pb-8">Experience</h3>
          </div>
          <div className="space-y-14 mt-10">
            <div className="relative pl-10 border-l-[3px] border-[#d4af37]/10 hover:border-[#d4af37] transition-colors">
              <div className="absolute left-[-7px] top-1.5 w-3 h-3 rounded-full bg-[#d4af37] shadow-[0_0_8px_#d4af37]" />
              <h4 className="text-lg font-bold text-black/90">Founder — Digital Marketing Startup</h4>
              <p className="text-[10px] uppercase tracking-[0.3em] text-black/40 font-sans mt-3 mb-4 font-bold">Jan 2022 – Present</p>
              <p className="text-[13px] leading-relaxed text-black/70 font-medium">Scaled marketing operations; content strategy led to a 60% increase in client engagement and conversion.</p>
            </div>
            <div className="relative pl-10 border-l-[3px] border-[#d4af37]/10 hover:border-[#d4af37] transition-colors">
              <div className="absolute left-[-7px] top-1.5 w-3 h-3 rounded-full bg-[#d4af37] shadow-[0_0_8px_#d4af37]" />
              <h4 className="text-lg font-bold text-black/90 uppercase">Secretary, E-Cell</h4>
              <p className="text-[10px] uppercase tracking-[0.3em] text-black/40 font-sans mt-3 mb-4 font-bold">Aug 2023 – Present</p>
              <p className="text-[13px] leading-relaxed text-black/70 font-medium">Organized 20+ technical events. Spearheaded digital campaigns resulting in 70% boost in regional reach.</p>
            </div>
          </div>
        </div>
      );
    case 5:
      return (
        <div className="flex-1">
          <div className="mb-14">
            <h2 className="text-[11px] uppercase tracking-[0.6em] text-[#d4af37] mb-4 font-sans font-bold">Foundation</h2>
            <h3 className="text-5xl font-bold tracking-tighter border-b-2 border-black/5 pb-8">Education</h3>
          </div>
          <div className="space-y-16 mt-14">
            <div>
              <h4 className="text-xl font-bold uppercase tracking-widest mb-3 text-black/90">B.Tech in CSE</h4>
              <p className="text-sm text-black/50 mb-6 font-medium tracking-tight">Vignan's Foundation for Science & Tech</p>
              <div className="flex items-center gap-6">
                <span className="text-[12px] bg-black text-white px-4 py-1.5 font-sans font-bold">CGPA: 8.0</span>
                <span className="text-[11px] text-black/40 uppercase tracking-[0.3em] font-sans font-bold">2022 – 2026</span>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-bold uppercase tracking-widest mb-3 text-black/90">Intermediate (MPC)</h4>
              <p className="text-sm text-black/50 mb-6 font-medium tracking-tight">NRI Junior College, Tenali</p>
              <div className="flex items-center gap-6">
                <span className="text-[12px] bg-black text-white px-4 py-1.5 font-sans font-bold">70.1%</span>
                <span className="text-[11px] text-black/40 uppercase tracking-[0.3em] font-sans font-bold">2020 – 2022</span>
              </div>
            </div>
          </div>
        </div>
      );
    case 6:
      return (
        <div className="flex-1">
          <div className="mb-14">
            <h2 className="text-[11px] uppercase tracking-[0.6em] text-[#d4af37] mb-4 font-sans font-bold">Laurels</h2>
            <h3 className="text-5xl font-bold tracking-tighter border-b-2 border-black/5 pb-8">Achievements</h3>
          </div>
          <ul className="space-y-10 mt-10">
            {[
              { title: "2× Winner – Cisco ThingQbator", subtitle: "National level innovation excellence" },
              { title: "Local LLM Orchestration", subtitle: "Optimized inference, reduced API costs by 40%" },
              { title: "Educational Platforms", subtitle: "Deployed solutions adopted by 150+ students" }
            ].map((item, i) => (
              <li key={i} className="flex gap-8 items-start">
                <span className="text-[#d4af37] text-3xl leading-none">✦</span>
                <div>
                  <p className="text-xl font-bold leading-tight text-black/90 mb-2">{item.title}</p>
                  <p className="text-[11px] text-black/40 font-sans uppercase tracking-[0.25em] font-bold">{item.subtitle}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      );
    case 7:
      return (
        <div className="flex-1">
          <div className="mb-12">
            <h2 className="text-[11px] uppercase tracking-[0.6em] text-[#d4af37] mb-4 font-sans font-bold">Credentials</h2>
            <h3 className="text-5xl font-bold tracking-tighter border-b-2 border-black/5 pb-8">Certifications</h3>
          </div>
          <div className="grid grid-cols-2 gap-6 mt-10">
            {["CCNA 1, 2, 3", "Cybersecurity", "Data Visualization", "HR Analytics"].map((cert, i) => (
              <div key={cert} className="p-7 bg-black/[0.03] border-l-4 border-black/5 hover:border-[#d4af37] hover:bg-[#d4af37]/5 transition-all group aspect-square flex flex-col justify-between">
                <span className="text-[10px] text-black/20 font-sans font-bold tracking-tight uppercase">License_00{i+1}</span>
                <p className="text-[14px] font-bold leading-tight tracking-tight uppercase group-hover:text-[#d4af37] transition-colors text-black/80">{cert}</p>
                <div className="w-8 h-[2px] bg-[#d4af37] opacity-20 group-hover:opacity-100 group-hover:w-full transition-all" />
              </div>
            ))}
          </div>
        </div>
      );
    case 8:
      return (
        <div className="flex-1 flex flex-col justify-center items-center text-center">
          <div className="mb-16">
            <h2 className="text-[11px] uppercase tracking-[1em] text-[#d4af37] mb-8 font-sans font-bold">Initiation</h2>
            <h3 className="text-6xl font-bold tracking-tighter leading-[1] text-black/90">Let's build<br/>intelligence.</h3>
          </div>
          <div className="space-y-10 w-full max-w-[320px]">
            <div className="space-y-4">
              <p className="text-[10px] text-black/30 uppercase tracking-[0.4em] font-sans font-bold">Contact Sequence</p>
              <p className="text-xl font-bold tracking-tight text-black">221fa04394@gmail.com</p>
              <p className="text-xl font-bold tracking-tight text-black">+91 9618562549</p>
            </div>
            <div className="flex gap-10 justify-center pt-10 border-t border-black/10">
              {["LinkedIn", "GitHub"].map(link => (
                <span key={link} className="text-[11px] uppercase tracking-[0.3em] font-sans font-bold text-black/40 hover:text-[#d4af37] hover:scale-110 transition-all cursor-pointer">
                  {link}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-24">
            <p className="text-[10px] text-black/10 uppercase tracking-[0.8em] font-sans font-bold">Terminal Protocol — 2025</p>
          </div>
        </div>
      );
    default:
      return null;
  }
}
