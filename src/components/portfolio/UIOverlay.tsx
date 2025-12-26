"use client";

import { usePortfolioStore } from "@/lib/store";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export function UIOverlay() {
  const { currentPage, totalPages, nextPage, prevPage, setPage } = usePortfolioStore();

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
            <p className="text-[#d4af37] text-[10px] tracking-[0.4em] uppercase font-bold">Agentic AI Engineer</p>
          </div>
        </motion.div>

          <div className="flex gap-3 pointer-events-auto bg-black/20 p-4 backdrop-blur-md rounded-full border border-white/5">
            {chapters.map((chapter, index) => {
              const isActive = currentPage === index;
              return (
                <button
                  key={chapter}
                  onClick={() => setPage(index)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-700 ${
                    isActive ? "bg-[#d4af37] scale-[2] shadow-[0_0_10px_#d4af37]" : "bg-white/20 hover:bg-white/50"
                  }`}
                  title={chapter}
                />
              );
            })}
          </div>
        </div>

        <div className="flex justify-between items-center pointer-events-auto">
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            className="group flex items-center gap-4 text-white/40 hover:text-white transition-all disabled:opacity-0"
          >
            <div className="p-4 rounded-full border border-white/10 group-hover:border-[#d4af37] transition-colors">
              <ChevronLeft size={20} />
            </div>
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold hidden sm:block">Previous Chapter</span>
          </button>

          <div className="flex flex-col items-center gap-2">
            <div className="h-12 w-[1px] bg-gradient-to-b from-transparent via-[#d4af37]/50 to-transparent" />
            <div className="text-white/40 text-[10px] font-bold tracking-[0.6em] uppercase flex items-center gap-4">
              <span>Chapter</span>
              <span className="text-[#d4af37] text-lg font-serif tracking-normal">{currentPage + 1}</span>
              <span className="opacity-20">/</span>
              <span>{totalPages}</span>
            </div>
          </div>

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages - 1}
            className="group flex items-center gap-4 text-white/40 hover:text-white transition-all disabled:opacity-0 text-right"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold hidden sm:block">Next Chapter</span>
            <div className="p-4 rounded-full border border-white/10 group-hover:border-[#d4af37] transition-colors">
              <ChevronRight size={20} />
            </div>
          </button>
      </div>
    </div>
  );
}
