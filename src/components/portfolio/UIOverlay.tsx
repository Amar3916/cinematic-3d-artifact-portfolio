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
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-8 z-10">
      <div className="flex justify-between items-start">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/20 backdrop-blur-md border border-white/10 p-4 rounded-lg pointer-events-auto"
        >
          <h1 className="text-white font-serif text-xl tracking-wider">B. AMARENDRA NADH</h1>
          <p className="text-white/50 text-xs tracking-[0.2em] uppercase">Agentic AI Engineer</p>
        </motion.div>

        <div className="flex gap-2 pointer-events-auto">
          {chapters.map((chapter, index) => (
            <button
              key={chapter}
              onClick={() => setPage(index)}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                currentPage === index ? "bg-white scale-150" : "bg-white/20 hover:bg-white/50"
              }`}
              title={chapter}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center pointer-events-auto">
        <button
          onClick={prevPage}
          disabled={currentPage === 0}
          className="p-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white disabled:opacity-0 transition-all"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="text-white/30 text-sm font-light tracking-[0.5em] uppercase">
          Chapter {currentPage + 1} / {totalPages}
        </div>

        <button
          onClick={nextPage}
          disabled={currentPage === totalPages - 1}
          className="p-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white disabled:opacity-0 transition-all"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
