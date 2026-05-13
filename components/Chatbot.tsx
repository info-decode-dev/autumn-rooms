"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send } from "lucide-react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[var(--color-charcoal-black)] text-[var(--color-soft-gold)] rounded-full shadow-2xl flex items-center justify-center hover:scale-105 transition-transform z-50 border border-gray-700"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-[350px] h-[500px] glass-dark rounded-3xl shadow-2xl overflow-hidden z-50 flex flex-col"
          >
            {/* Header */}
            <div className="bg-[var(--color-charcoal-black)]/80 backdrop-blur px-6 py-4 flex justify-between items-center border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-semibold text-white font-serif">Autumn Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--color-soft-gold)] flex items-center justify-center flex-shrink-0 text-white font-serif">A</div>
                <div className="bg-white/10 backdrop-blur text-white p-3 rounded-2xl rounded-tl-sm text-sm border border-white/5">
                  Hello! How can I help you find your perfect living space today?
                </div>
              </div>
              
              <div className="flex items-start justify-end gap-3">
                <div className="bg-[var(--color-soft-gold)] text-white p-3 rounded-2xl rounded-tr-sm text-sm shadow-sm">
                  I'm looking for a room in London.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--color-soft-gold)] flex items-center justify-center flex-shrink-0 text-white font-serif">A</div>
                <div className="bg-white/10 backdrop-blur text-white p-3 rounded-2xl rounded-tl-sm text-sm border border-white/5">
                  Great choice! We have 12 premium properties available in London. Are you looking for an en-suite or a studio?
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/10 bg-[var(--color-charcoal-black)]/50 backdrop-blur">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Type your message..." 
                  className="w-full bg-white/10 border border-white/20 rounded-full pl-4 pr-12 py-3 text-sm outline-none text-white placeholder-gray-400 focus:border-[var(--color-soft-gold)] transition-colors"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-[var(--color-soft-gold)] text-white rounded-full flex items-center justify-center hover:bg-white hover:text-[var(--color-charcoal-black)] transition-colors">
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
