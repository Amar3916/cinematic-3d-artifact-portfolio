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
          <meshStandardMaterial color="#0a0a0a" roughness={0.1} metalness={0.8} />
        </mesh>
        
        {/* Decorative elements on the left page */}
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[1.8, 2.6]} />
          <meshStandardMaterial color="#d4af37" transparent opacity={0.02} />
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
            <div className="w-[440px] h-[600px] flex flex-col justify-center items-center text-[#d4af37] border-[20px] border-[#d4af37]/20 bg-gradient-to-br from-black/80 via-black/40 to-transparent backdrop-blur-md p-8">
              <div className="border-4 border-[#d4af37]/40 p-6 flex flex-col items-center w-full h-full justify-center relative overflow-hidden">
                {/* Decorative Corner */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#d4af37]" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#d4af37]" />
                
                  <h1 className="text-5xl font-serif font-black text-center leading-[1.05] tracking-tight uppercase mb-6 drop-shadow-[0_0_30px_rgba(212,175,55,0.6)] text-white">
                    THE AI<br/><span className="text-[#d4af37]">ARCHITECT</span>
                  </h1>
                  <div className="w-32 h-[3px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mb-8" />
                  <div className="space-y-4 text-center">
                    <p className="text-[18px] tracking-[0.5em] uppercase font-sans font-black text-white drop-shadow-md mb-2">
                      Amarendra Nadh
                    </p>
                    <p className="text-[10px] tracking-[0.4em] uppercase font-sans font-bold text-[#d4af37] bg-black/40 px-4 py-2 border border-[#d4af37]/30">
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
              className="select-none pointer-events-auto"
            >
              <div className="w-[440px] h-[600px] p-10 flex flex-col font-serif text-white bg-black/80 backdrop-blur-2xl border-l border-white/5 shadow-2xl overflow-y-auto custom-scrollbar">
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
          <div className="mb-8">
            <h2 className="text-[11px] uppercase tracking-[0.6em] text-[#d4af37] mb-2 font-sans font-bold">Genesis</h2>
            <h3 className="text-4xl font-bold tracking-tighter border-b-2 border-white/5 pb-4">Professional Summary</h3>
          </div>
          <div className="space-y-6">
            <p className="text-[16px] leading-[1.6] text-justify text-white/80 first-letter:text-5xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-[#d4af37] first-letter:font-serif">
              Dynamic Agentic AI Engineer and Full-Stack Developer passionate about building intelligent, 
              autonomous systems and scalable automation workflows. Adept at integrating AI reasoning 
              with real-world tools to deliver production-ready applications that redefine human-machine interaction.
            </p>
            <div className="grid grid-cols-2 gap-y-4 pt-6 border-t border-white/5">
              {["Agentic AI", "LangChain", "MERN Stack", "n8n Automation"].map(tag => (
                <div key={tag} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-[#d4af37] rotate-45" />
                  <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-white/60">{tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    case 2:
      return (
        <div className="flex-1">
          <div className="mb-8">
            <h2 className="text-[11px] uppercase tracking-[0.6em] text-[#d4af37] mb-2 font-sans font-bold">Arsenal</h2>
            <h3 className="text-4xl font-bold tracking-tighter border-b-2 border-white/5 pb-4">Core Skills</h3>
          </div>
          <div className="space-y-6 mt-6">
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-2 font-sans font-bold">Languages</h4>
              <p className="text-lg font-medium tracking-tight text-white/90">C, Python, Java (OOP)</p>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-2 font-sans font-bold">Web Development</h4>
              <p className="text-lg font-medium tracking-tight text-white/90">HTML, CSS, React.js, Node.js, Express.js, MongoDB (MERN)</p>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.4em] text-[#d4af37] mb-2 font-sans font-bold">AI & Machine Learning</h4>
              <p className="text-xl font-bold tracking-tight text-[#d4af37]">Local LLMs, Agentic AI, LangChain, LangGraph, AI Automation</p>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-2 font-sans font-bold">Tools & Integrations</h4>
              <p className="text-[14px] font-medium text-white/80 leading-relaxed">n8n, VS Code, Postman, Notion, LLM Studio, Canva, REST APIs, Webhooks</p>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-2 font-sans font-bold">Others</h4>
              <p className="text-[14px] font-medium text-white/80 leading-relaxed">Digital Marketing, Workflow Automation, Cloud Deployment Basics</p>
            </div>
          </div>
        </div>
      );
    case 3:
      return (
        <div className="flex-1">
          <div className="mb-6">
            <h2 className="text-[11px] uppercase tracking-[0.6em] text-[#d4af37] mb-2 font-sans font-bold">Artifacts</h2>
            <h3 className="text-4xl font-bold tracking-tighter border-b-2 border-white/5 pb-4">Key Projects</h3>
          </div>
          <div className="space-y-6 mt-4 pb-10">
            {[
              { title: "Automated YouTube Workflow", year: "2024", desc: "Devised content pipeline automating 70% of video prep using n8n and LLM agents; saved 10+ hours/week." },
              { title: "Speech Emotion Recognition (AI)", year: "2024", desc: "Trained audio classification model (MFCC, SVM) to detect 6 emotions with 85%+ accuracy." },
              { title: "Vignan Marketplace (MERN)", year: "2024", desc: "Student marketplace with secure JWT login and real-time chat (<300ms latency)." },
              { title: "WebNavigator (AI Agent)", year: "2025", desc: "Autonomous web navigation agent using LangChain; reduced research time by 60%." },
              { title: "Finance ERP Module (MERN)", year: "2023", desc: "Digitized paperwork workflows, reducing manual processes by 40%." },
              { title: "Network Simulation", year: "2023", desc: "Configured enterprise network topologies with VLAN and OSPF using Packet Tracer." }
            ].map((proj, i) => (
              <div key={i} className="relative pl-6 border-l border-[#d4af37]/20 hover:border-[#d4af37] transition-colors pb-4">
                <div className="absolute left-[-4px] top-1.5 w-2 h-2 rounded-full bg-[#d4af37]/30 border border-[#d4af37]" />
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="text-[15px] font-bold uppercase tracking-wide text-white/90">{proj.title}</h4>
                  <span className="text-[10px] text-[#d4af37] font-bold font-sans">{proj.year}</span>
                </div>
                <p className="text-[12px] leading-relaxed text-white/60 font-medium">{proj.desc}</p>
              </div>
            ))}
          </div>
        </div>
      );
    case 4:
      return (
        <div className="flex-1">
          <div className="mb-8">
            <h2 className="text-[11px] uppercase tracking-[0.6em] text-[#d4af37] mb-2 font-sans font-bold">Chronicles</h2>
            <h3 className="text-4xl font-bold tracking-tighter border-b-2 border-white/5 pb-4">Experience</h3>
          </div>
          <div className="space-y-8 mt-6">
            <div className="relative pl-8 border-l-[2px] border-white/10 hover:border-[#d4af37] transition-colors">
              <div className="absolute left-[-6px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#d4af37] shadow-[0_0_8px_#d4af37]" />
              <h4 className="text-[18px] font-bold text-white/90">Founder — Digital Marketing Startup</h4>
              <p className="text-[9px] uppercase tracking-[0.3em] text-white/40 font-sans mt-2 mb-3 font-bold">Jan 2022 – Present</p>
              <p className="text-[13px] leading-relaxed text-white/70 font-medium text-justify">Launched and scaled marketing operations; the content strategy led to a 60% increase in client engagement.</p>
            </div>
            <div className="relative pl-8 border-l-[2px] border-white/10 hover:border-[#d4af37] transition-colors">
              <div className="absolute left-[-6px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#d4af37] shadow-[0_0_8px_#d4af37]" />
              <h4 className="text-[18px] font-bold text-white/90 uppercase leading-tight">Secretary, E-Cell — Vignan University</h4>
              <p className="text-[9px] uppercase tracking-[0.3em] text-white/40 font-sans mt-2 mb-3 font-bold">Aug 2023 – Present</p>
              <p className="text-[13px] leading-relaxed text-white/70 font-medium text-justify">Organized 20+ technical and outreach events. Spearheaded social media campaigns resulting in a 70% boost in reach.</p>
            </div>
            <div className="relative pl-8 border-l-[2px] border-white/10 hover:border-[#d4af37] transition-colors">
              <div className="absolute left-[-6px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#d4af37] shadow-[0_0_8px_#d4af37]" />
              <h4 className="text-[18px] font-bold text-white/90 uppercase leading-tight">MERN & AI Automation Architect</h4>
              <p className="text-[9px] uppercase tracking-[0.3em] text-white/40 font-sans mt-2 mb-3 font-bold">2023 – 2024</p>
              <p className="text-[13px] leading-relaxed text-white/70 font-medium text-justify">Built and deployed full-stack apps in 24-hour hackathons. Led teams to build Farmer Support and University Admin portals.</p>
            </div>
          </div>
        </div>
      );
    case 5:
      return (
        <div className="flex-1">
          <div className="mb-8">
            <h2 className="text-[11px] uppercase tracking-[0.6em] text-[#d4af37] mb-2 font-sans font-bold">Foundation</h2>
            <h3 className="text-4xl font-bold tracking-tighter border-b-2 border-white/5 pb-4">Education</h3>
          </div>
          <div className="space-y-10 mt-8">
            <div>
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-xl font-bold uppercase tracking-tight text-white/90">B.Tech in CSE</h4>
                <span className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-sans font-bold">2022 – 2026</span>
              </div>
              <p className="text-[14px] text-white/50 mb-4 font-medium tracking-tight italic">Vignan's Foundation for Science, Technology and Research</p>
              <span className="text-[12px] bg-white text-black px-4 py-1.5 font-sans font-bold border-l-4 border-[#d4af37]">CGPA: 8.0/10</span>
            </div>
            <div>
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-xl font-bold uppercase tracking-tight text-white/90">Intermediate (MPC)</h4>
                <span className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-sans font-bold">2020 – 2022</span>
              </div>
              <p className="text-[14px] text-white/50 mb-4 font-medium tracking-tight italic">NRI Junior College, Tenali</p>
              <span className="text-[12px] bg-white text-black px-4 py-1.5 font-sans font-bold border-l-4 border-[#d4af37]">Percentage: 70.1%</span>
            </div>
            <div>
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-xl font-bold uppercase tracking-tight text-white/90">10th Grade (SSC)</h4>
                <span className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-sans font-bold">2019 – 2020</span>
              </div>
              <p className="text-[14px] text-white/50 mb-4 font-medium tracking-tight italic">Dr. KKR Gowtham School, Tenali</p>
              <span className="text-[12px] bg-white text-black px-4 py-1.5 font-sans font-bold border-l-4 border-[#d4af37]">GPA: 10.0/10</span>
            </div>
          </div>
        </div>
      );
    case 6:
      return (
        <div className="flex-1">
          <div className="mb-8">
            <h2 className="text-[11px] uppercase tracking-[0.6em] text-[#d4af37] mb-2 font-sans font-bold">Laurels</h2>
            <h3 className="text-4xl font-bold tracking-tighter border-b-2 border-white/5 pb-4">Achievements</h3>
          </div>
          <ul className="space-y-6 mt-6">
            {[
              { title: "2× Winner – Cisco ThingQbator", subtitle: "Excellence in technical innovation and design" },
              { title: "Digital Marketing Startup Founder", subtitle: "Launched and scaled operational content strategy" },
              { title: "Local LLM Orchestration", subtitle: "Hosted DeepSeek/OpenAI locally, cutting costs by 40%" },
              { title: "Educational Platforms", subtitle: "Created solutions adopted by 150+ students" },
              { title: "Open-Source Contributor", subtitle: "AI & ML projects and MERN stack web applications" }
            ].map((item, i) => (
              <li key={i} className="flex gap-6 items-start">
                <span className="text-[#d4af37] text-2xl leading-none">✦</span>
                <div>
                  <p className="text-[17px] font-bold leading-tight text-white/90 mb-1">{item.title}</p>
                  <p className="text-[10px] text-white/40 font-sans uppercase tracking-[0.2em] font-bold">{item.subtitle}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      );
    case 7:
      return (
        <div className="flex-1">
          <div className="mb-8">
            <h2 className="text-[11px] uppercase tracking-[0.6em] text-[#d4af37] mb-2 font-sans font-bold">Credentials</h2>
            <h3 className="text-4xl font-bold tracking-tighter border-b-2 border-white/5 pb-4">Certifications</h3>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-6">
            {[
              "Tata STRIVE: Visualization",
              "Deloitte: Cybersecurity",
              "Cisco: CCNA 1, 2, 3",
              "NPTEL: Data Visualization",
              "NPTEL: HR Analytics"
            ].map((cert, i) => (
              <div key={cert} className="p-4 bg-white/[0.03] border-l-2 border-[#d4af37]/20 hover:border-[#d4af37] hover:bg-[#d4af37]/10 transition-all group backdrop-blur-sm border border-white/5 flex flex-col justify-center">
                <p className="text-[12px] font-bold leading-tight tracking-tight uppercase group-hover:text-[#d4af37] transition-colors text-white/80">{cert}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 pt-8 border-t border-white/5">
             <h2 className="text-[11px] uppercase tracking-[0.6em] text-[#d4af37] mb-4 font-sans font-bold">Lexicon</h2>
             <div className="space-y-4">
               {[
                 { lang: "English", level: "Intermediate (B1 Certified)" },
                 { lang: "Telugu", level: "Native" },
                 { lang: "Hindi", level: "Intermediate" }
               ].map(l => (
                 <div key={l.lang} className="flex justify-between items-center">
                   <span className="text-[14px] font-bold text-white/90 uppercase tracking-wider">{l.lang}</span>
                   <span className="text-[10px] text-[#d4af37] font-sans font-bold uppercase tracking-tight">{l.level}</span>
                 </div>
               ))}
             </div>
          </div>
        </div>
      );
    case 8:
      return (
        <div className="flex-1 flex flex-col justify-center items-center text-center">
          <div className="mb-10">
            <h2 className="text-[11px] uppercase tracking-[0.8em] text-[#d4af37] mb-6 font-sans font-bold">Initiation</h2>
            <h3 className="text-5xl font-bold tracking-tighter leading-[1] text-white/90">Let's build<br/>intelligence.</h3>
          </div>
          <div className="space-y-8 w-full max-w-[300px]">
            <div className="space-y-3">
              <p className="text-[9px] text-white/30 uppercase tracking-[0.4em] font-sans font-bold">Contact Sequence</p>
              <p className="text-lg font-bold tracking-tight text-white hover:text-[#d4af37] transition-colors cursor-pointer">221fa04394@gmail.com</p>
              <p className="text-lg font-bold tracking-tight text-white">+91 9618562549</p>
            </div>
            <div className="flex gap-8 justify-center pt-8 border-t border-white/10">
              {["LinkedIn", "GitHub", "Twitter"].map(link => (
                <span key={link} className="text-[10px] uppercase tracking-[0.3em] font-sans font-bold text-white/40 hover:text-[#d4af37] hover:scale-110 transition-all cursor-pointer">
                  {link}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-16">
            <p className="text-[9px] text-white/10 uppercase tracking-[0.6em] font-sans font-bold">Terminal Protocol — 2025</p>
          </div>
        </div>
      );
    default:
      return null;
  }
}
