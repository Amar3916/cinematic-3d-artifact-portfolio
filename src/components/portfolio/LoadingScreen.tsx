"use client";

import { motion } from "framer-motion";

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative flex flex-col items-center"
      >
        <div className="relative h-24 w-24">
          {/* Circular Loader */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-2 border-t-[#d4af37] border-r-transparent border-b-transparent border-l-transparent"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-2 rounded-full border-2 border-b-[#4080ff] border-t-transparent border-r-transparent border-l-transparent opacity-50"
          />
          
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="h-1 w-1 bg-[#d4af37] rounded-full shadow-[0_0_10px_#d4af37]" />
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex flex-col items-center gap-2"
        >
          <span className="text-[12px] tracking-[0.6em] text-[#d4af37] uppercase font-bold">Initializing</span>
          <span className="text-white/60 text-[10px] tracking-[0.4em] uppercase font-bold">AI Architect Portfolio</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
