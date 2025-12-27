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
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 md:p-8 lg:p-12 z-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-black/40 backdrop-blur-md border border-white/5 p-3 md:p-6 rounded-sm pointer-events-auto"
          >
            <h1 className="text-white font-serif text-sm md:text-2xl tracking-[0.2em] uppercase">B. AMARENDRA NADH</h1>
            <div className="flex items-center gap-3 mt-1">
              <div className="h-[1px] w-3 md:w-4 bg-[#d4af37]" />
              <p className="text-[#d4af37] text-[8px] md:text-[12px] tracking-[0.2em] uppercase font-bold">Agentic AI Engineer</p>
            </div>
          </motion.div>
  
          <div className="flex gap-1.5 md:gap-3 pointer-events-auto bg-black/40 p-2 md:p-4 backdrop-blur-md rounded-full border border-white/5 relative max-w-full overflow-hidden">
            <div className="flex gap-1.5 md:gap-3 px-2 overflow-x-auto no-scrollbar scroll-smooth">
              {chapters.map((chapter, index) => {
                const isActive = currentPage === index;
                return (
                  <div
                    key={chapter}
                    className="relative flex flex-col items-center flex-shrink-0"
                    onMouseEnter={() => setHoveredChapter(index)}
                    onMouseLeave={() => setHoveredChapter(null)}
                  >
                    <button
                      onClick={() => setPage(index)}
                      className={`w-1 h-1 md:w-1.5 md:h-1.5 rounded-full transition-all duration-500 relative ${
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
                      {(hoveredChapter === index || (isActive && hoveredChapter === null)) && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 5, scale: 0.9 }}
                          className="absolute top-8 md:top-10 whitespace-nowrap bg-black/90 border border-[#d4af37]/30 px-2 py-1 md:px-3 md:py-1.5 rounded-sm z-20 pointer-events-none hidden sm:block"
                        >
                          <span className="text-[9px] md:text-[11px] text-[#d4af37] tracking-[0.2em] uppercase font-bold">
                            {chapter}
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
  
        <div className="flex justify-between items-center pointer-events-auto mb-2 md:mb-0">
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            className="group flex items-center gap-2 md:gap-4 text-white/70 hover:text-white transition-all disabled:opacity-0"
          >
            <div className="p-3 md:p-4 rounded-full border border-white/5 group-hover:border-[#d4af37] transition-colors bg-black/20 backdrop-blur-sm">
              <ChevronLeft size={16} className="md:w-5 md:h-5" />
            </div>
            <span className="text-[10px] md:text-[12px] uppercase tracking-[0.2em] font-bold hidden md:block">Prev</span>
          </button>
  
          <div className="flex flex-col items-center gap-1 md:gap-2">
            <div className="h-8 md:h-12 w-[1px] bg-gradient-to-b from-transparent via-[#d4af37]/50 to-transparent" />
            <div className="text-white/70 text-[10px] md:text-[12px] font-bold tracking-[0.2em] md:tracking-[0.4em] uppercase flex items-center gap-2 md:gap-4">
              <div className="flex items-center gap-1 md:gap-2">
                <span className="opacity-50 text-[8px] md:text-[10px]">CH</span>
                <span className="text-[#d4af37] text-lg md:text-xl font-serif tracking-normal">{currentPage + 1}</span>
              </div>
              <span className="opacity-40">/</span>
              <span className="opacity-50">{totalPages}</span>
            </div>
          </div>
  
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages - 1}
            className="group flex items-center gap-2 md:gap-4 text-white/70 hover:text-white transition-all disabled:opacity-0 text-right"
          >
            <span className="text-[10px] md:text-[12px] uppercase tracking-[0.2em] font-bold hidden md:block">Next</span>
            <div className="p-3 md:p-4 rounded-full border border-white/5 group-hover:border-[#d4af37] transition-colors bg-black/20 backdrop-blur-sm">
              <ChevronRight size={16} className="md:w-5 md:h-5" />
            </div>
          </button>
        </div>
      </div>
    );
}
