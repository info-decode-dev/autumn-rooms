"use client";

import { motion } from "framer-motion";
import SearchFilters from "../components/SearchFilters";

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden">
      {/* Background Image / Video Mock */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transform origin-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80')" }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[var(--background)] pointer-events-none" />

      <div className="relative z-10 text-center px-6 mt-20 w-full">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif text-white max-w-5xl mx-auto leading-tight tracking-tight mb-6 drop-shadow-2xl"
        >
          Find Your Perfect <br className="hidden md:block"/> Living Space Abroad
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-gray-200 font-sans max-w-2xl mx-auto mb-12"
        >
          Experience premium student accommodation with scandinavian minimalism and modern convenience.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="w-full max-w-4xl mx-auto"
        >
          <SearchFilters />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/70"
      >
        <span className="text-xs uppercase tracking-widest font-medium">Scroll to explore</span>
        <div className="w-[1px] h-12 bg-white/30 relative overflow-hidden">
          <motion.div 
            animate={{ y: [0, 48] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-white"
          />
        </div>
      </motion.div>
    </section>
  );
}
