"use client";

import { Html, Text, Float } from "@react-three/drei";
import * as THREE from "three";
import { usePortfolioStore } from "@/lib/store";

interface PageContentProps {
  index: number;
  side: "front" | "back";
}

export function PageContent({ index, side }: PageContentProps) {
  // If we are looking at the front of page N, we see content for chapter N
  // If we are looking at the back of page N, we see content for chapter N (or empty)
  // Actually, usually a book has content on both sides.
  // Let's simplify: Front side of page i shows Chapter i. Back side is plain paper or empty.
  
  if (side === "back") {
    return (
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[2.2, 3]} />
        <meshStandardMaterial color="#f0f0f0" roughness={1} />
      </mesh>
    );
  }

  return (
    <group>
      {/* Content Container */}
      <Html
        transform
        distanceFactor={1.5}
        position={[0, 0, 0.01]}
        className="select-none pointer-events-none"
      >
        <div className="w-[400px] h-[545px] p-8 flex flex-col font-serif text-[#1a1a1a]">
          {getContent(index)}
        </div>
      </Html>

      {/* 3D Elements for the page */}
      <group position={[0, 0, 0.2]}>
        {get3DElements(index)}
      </group>
    </group>
  );
}

function getContent(index: number) {
  switch (index) {
    case 0:
      return (
        <div className="flex-1 flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-2">B. Amarendra Nadh</h1>
          <div className="w-12 h-1 bg-gold mb-4" />
          <p className="text-sm uppercase tracking-[0.3em] opacity-60">Agentic AI Engineer & Full-Stack Developer</p>
          <p className="mt-8 text-xs italic opacity-40">"An AI engineer's mind visualized as a living artifact."</p>
        </div>
      );
    case 1:
      return (
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-6 border-b border-black/10 pb-2">Professional Summary</h2>
          <p className="text-sm leading-relaxed text-justify">
            Dynamic Agentic AI Engineer and Full-Stack Developer passionate about building intelligent, 
            autonomous systems and scalable automation workflows. Adept at integrating AI reasoning 
            with real-world tools to deliver adaptive, production-ready applications.
          </p>
          <div className="mt-6 flex gap-2 flex-wrap">
            {["LLMs", "LangChain", "MERN", "n8n"].map(tag => (
              <span key={tag} className="px-2 py-1 bg-black/5 text-[10px] uppercase tracking-widest">{tag}</span>
            ))}
          </div>
        </div>
      );
    case 2:
      return (
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-6 border-b border-black/10 pb-2">Skills</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xs uppercase tracking-widest opacity-60 mb-1">Languages</h3>
              <p className="text-sm font-medium">Python, Java (OOP), C</p>
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-widest opacity-60 mb-1">Web Stack</h3>
              <p className="text-sm font-medium">MERN (React, Node, Express, MongoDB)</p>
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-widest opacity-60 mb-1">AI & Automation</h3>
              <p className="text-sm font-medium">Agentic AI, LangChain, LangGraph, n8n</p>
            </div>
          </div>
        </div>
      );
    case 3:
      return (
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-6 border-b border-black/10 pb-2">Projects</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold">Automated YouTube Workflow</h3>
              <p className="text-[11px] opacity-70">Automated 70% of video prep using n8n and LLM agents; saved 10+ hours/week.</p>
            </div>
            <div>
              <h3 className="text-sm font-bold">WebNavigator (AI Agent)</h3>
              <p className="text-[11px] opacity-70">Autonomous web research agent using LangChain; reduced research time by 60%.</p>
            </div>
            <div>
              <h3 className="text-sm font-bold">Vignan Marketplace</h3>
              <p className="text-[11px] opacity-70">MERN platform for students with JWT auth and real-time chat.</p>
            </div>
          </div>
        </div>
      );
    case 4:
      return (
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-6 border-b border-black/10 pb-2">Experience</h2>
          <div className="space-y-6">
            <div className="relative pl-4 border-l border-black/10">
              <span className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-black/20" />
              <h3 className="text-sm font-bold">Founder — Digital Marketing Startup</h3>
              <p className="text-[10px] opacity-50 mb-1">Jan 2022 – Present</p>
              <p className="text-[11px]">Led content strategy resulting in 60% increase in engagement.</p>
            </div>
            <div className="relative pl-4 border-l border-black/10">
              <span className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-black/20" />
              <h3 className="text-sm font-bold">Secretary, E-Cell — Vignan Univ.</h3>
              <p className="text-[10px] opacity-50 mb-1">Aug 2023 – Present</p>
              <p className="text-[11px]">Organized 20+ events, boosted reach by 70% via campaigns.</p>
            </div>
          </div>
        </div>
      );
    case 5:
      return (
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-6 border-b border-black/10 pb-2">Education</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wide">B.Tech in CSE</h3>
              <p className="text-xs">Vignan's Foundation for Science & Tech</p>
              <p className="text-xs opacity-50">CGPA: 8.0/10 | 2022–2026</p>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wide">Intermediate (MPC)</h3>
              <p className="text-xs">NRI Junior College, Tenali</p>
              <p className="text-xs opacity-50">70.1% | 2020–2022</p>
            </div>
          </div>
        </div>
      );
    case 6:
      return (
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-6 border-b border-black/10 pb-2">Achievements</h2>
          <ul className="space-y-4">
            <li className="flex gap-2">
              <span className="text-gold">★</span>
              <p className="text-xs font-medium leading-relaxed">2× Winner – Cisco ThingQbator</p>
            </li>
            <li className="flex gap-2">
              <span className="text-gold">★</span>
              <p className="text-xs font-medium leading-relaxed">Hosted DeepSeek & OpenAI models locally (saved 40% API costs)</p>
            </li>
            <li className="flex gap-2">
              <span className="text-gold">★</span>
              <p className="text-xs font-medium leading-relaxed">Created platforms adopted by 150+ students</p>
            </li>
          </ul>
        </div>
      );
    case 7:
      return (
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-6 border-b border-black/10 pb-2">Certifications</h2>
          <div className="grid grid-cols-2 gap-4">
            {["CCNA 1, 2, 3", "Cybersecurity Essentials", "Data Visualization", "HR Analytics"].map(cert => (
              <div key={cert} className="p-3 bg-black/5 rounded flex flex-col justify-center items-center text-center">
                <div className="w-4 h-4 rounded-full border border-black/20 mb-2" />
                <p className="text-[10px] font-bold leading-tight">{cert}</p>
              </div>
            ))}
          </div>
        </div>
      );
    case 8:
      return (
        <div className="flex-1 flex flex-col justify-center items-center text-center">
          <h2 className="text-2xl font-bold mb-8">Let's build together</h2>
          <div className="space-y-3">
            <p className="text-xs opacity-60 uppercase tracking-widest">Connect</p>
            <p className="text-sm font-bold">+91 9618562549</p>
            <p className="text-sm font-bold">221fa04394@gmail.com</p>
            <div className="flex gap-4 justify-center mt-6">
              <span className="text-[10px] uppercase tracking-tighter border border-black/10 px-2 py-1">LinkedIn</span>
              <span className="text-[10px] uppercase tracking-tighter border border-black/10 px-2 py-1">GitHub</span>
            </div>
          </div>
          <p className="mt-12 text-[10px] opacity-30 italic">Amar — 2025</p>
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
        <Float speed={2}>
          <mesh>
            <sphereGeometry args={[0.05, 32, 32]} />
            <meshStandardMaterial color="#d4af37" emissive="#d4af37" emissiveIntensity={2} />
          </mesh>
        </Float>
      );
    case 1:
      // Neural network lines
      return (
        <group>
          {[...Array(5)].map((_, i) => (
            <mesh key={i} position={[Math.random() - 0.5, Math.random() - 0.5, 0]}>
              <sphereGeometry args={[0.02, 16, 16]} />
              <meshStandardMaterial color="#888" />
            </mesh>
          ))}
        </group>
      );
    case 2:
      // Floating glyphs
      return (
        <group>
           <mesh position={[-0.3, 0.4, 0]}>
            <boxGeometry args={[0.1, 0.1, 0.1]} />
            <meshStandardMaterial color="#61dafb" />
          </mesh>
          <mesh position={[0.3, -0.4, 0]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshStandardMaterial color="#4caf50" />
          </mesh>
        </group>
      );
    case 3:
      // Project diorama (simplified)
      return (
        <mesh>
          <torusGeometry args={[0.2, 0.02, 16, 100]} />
          <meshStandardMaterial color="#ff0000" />
        </mesh>
      );
    default:
      return null;
  }
}
