"use client";

import { usePortfolioStore } from "@/lib/store";
import { ChevronLeft, ChevronRight, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export function UIOverlay() {
  const { currentPage, totalPages, nextPage, prevPage, setPage } = usePortfolioStore();
  const [hoveredChapter, setHoveredChapter] = useState<number | null>(null);

  const chapters = [
    "Cover",
    "Summary",
    "Skills",
    "Projects",
    "Experience",
    "Education",
    "Achievements",
    "Certifications",
    "Contact"
  ];

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-12 z-10">
      <div className="flex justify-between items-start">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-sm pointer-events-auto"
        >
          <h1 className="text-white font-serif text-2xl tracking-[0.2em] uppercase">B. AMARENDRA NADH</h1>
          <div className="flex items-center gap-3 mt-1">
            <div className="h-[1px] w-4 bg-[#d4af37]" />
            <p className="text-[#d4af37] text-[12px] tracking-[0.2em] uppercase font-bold">Agentic AI Engineer</p>
          </div>
        </motion.div>

          <div className="flex gap-3 pointer-events-auto bg-black/40 p-4 backdrop-blur-xl rounded-full border border-white/10 relative">
            {chapters.map((chapter, index) => {
              const isActive = currentPage === index;
              return (
                <div
                  key={chapter}
                  className="relative flex flex-col items-center"
                  onMouseEnter={() => setHoveredChapter(index)}
                  onMouseLeave={() => setHoveredChapter(null)}
                >
                  <button
                    onClick={() => setPage(index)}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-500 relative ${
                      isActive ? "bg-[#d4af37] scale-[2.5]" : "bg-white/20 hover:bg-white/50"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-dot"
                        className="absolute inset-0 rounded-full bg-[#d4af37] blur-[4px] opacity-60"
                      />
                    )}
                  </button>

                  <AnimatePresence>
                    {hoveredChapter === index && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.9 }}
                        className="absolute top-10 whitespace-nowrap bg-black/90 border border-[#d4af37]/30 px-3 py-1.5 rounded-sm"
                      >
                        <span className="text-[11px] text-[#d4af37] tracking-[0.2em] uppercase font-bold">
                          {chapter}
                        </span>
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black border-l border-t border-[#d4af37]/30 rotate-45" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>

        <div className="flex justify-between items-center pointer-events-auto">
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            className="group flex items-center gap-4 text-white/70 hover:text-white transition-all disabled:opacity-0"
          >
            <div className="p-4 rounded-full border border-white/10 group-hover:border-[#d4af37] transition-colors">
              <ChevronLeft size={20} />
            </div>
            <span className="text-[12px] uppercase tracking-[0.2em] font-bold hidden sm:block">Previous Chapter</span>
          </button>

              <div className="flex flex-col items-center gap-2">
                <div className="h-12 w-[1px] bg-gradient-to-b from-transparent via-[#d4af37]/50 to-transparent" />
                <div className="text-white/70 text-[12px] font-bold tracking-[0.4em] uppercase flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span>Chapter</span>
                    <span className="text-[#d4af37] text-xl font-serif tracking-normal">{currentPage + 1}</span>
                  </div>
                  {currentPage === 0 && (
                    <span className="text-[#d4af37]/80 text-[10px] tracking-[0.2em] border-l border-white/10 pl-4">Cover</span>
                  )}
                  <span className="opacity-40">/</span>
                  <span>{totalPages}</span>
                </div>
              </div>

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages - 1}
            className="group flex items-center gap-4 text-white/70 hover:text-white transition-all disabled:opacity-0 text-right"
          >
            <span className="text-[12px] uppercase tracking-[0.2em] font-bold hidden sm:block">Next Chapter</span>
            <div className="p-4 rounded-full border border-white/10 group-hover:border-[#d4af37] transition-colors">
              <ChevronRight size={20} />
            </div>
          </button>
      </div>
    </div>
  );
}
