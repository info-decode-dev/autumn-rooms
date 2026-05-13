"use client";

import { motion } from "framer-motion";
import { Settings, Server, Database, ArrowRightLeft, CheckCircle2 } from "lucide-react";

export default function ArchitecturePage() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-[var(--background)]">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Settings className="w-8 h-8 text-[var(--color-soft-gold)]" />
            <h1 className="font-serif text-4xl font-semibold text-[var(--color-charcoal-black)]">System Architecture</h1>
          </div>
          <p className="text-gray-500 text-lg max-w-2xl">
            Configure the primary source of truth for property listings and booking management. This affects how data flows between the website, CRM, and PMS.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Option 1: Crib PMS */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-8 border-2 border-[var(--color-soft-gold)] shadow-lg relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 bg-[var(--color-soft-gold)] text-white text-xs font-bold px-4 py-1 rounded-bl-xl uppercase tracking-wider">
              Recommended
            </div>
            
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <Database className="w-7 h-7" />
            </div>
            
            <h2 className="text-2xl font-serif font-semibold text-[var(--color-charcoal-black)] mb-2">Option 1: Crib as Primary Source</h2>
            <p className="text-gray-500 mb-8 text-sm leading-relaxed">
              Website pulls property and rent data directly from Crib (PMS). Crib then syncs booking and lead data backwards to Odoo ERP.
            </p>

            <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">Data Flow</h3>
              <div className="flex items-center justify-between text-sm font-medium text-gray-600">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center mb-2 shadow-sm">Crib</div>
                </div>
                <ArrowRightLeft className="w-5 h-5 text-[var(--color-soft-gold)]" />
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-[var(--color-charcoal-black)] text-white rounded-full flex items-center justify-center mb-2 shadow-sm">Web</div>
                </div>
                <ArrowRightLeft className="w-5 h-5 text-gray-400" />
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center mb-2 shadow-sm">ERP</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <p className="text-sm text-gray-700">Real-time inventory mapping directly from the PMS.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <p className="text-sm text-gray-700">Faster booking confirmations (no ERP lag).</p>
              </div>
            </div>
            
            <button className="w-full mt-8 bg-[var(--color-charcoal-black)] text-white py-3 rounded-full font-medium hover:bg-black transition-colors">
              Set as Active Architecture
            </button>
          </motion.div>

          {/* Option 2: Odoo ERP */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm opacity-80 hover:opacity-100 transition-opacity"
          >
            <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
              <Server className="w-7 h-7" />
            </div>
            
            <h2 className="text-2xl font-serif font-semibold text-[var(--color-charcoal-black)] mb-2">Option 2: ERP as Primary Source</h2>
            <p className="text-gray-500 mb-8 text-sm leading-relaxed">
              Odoo ERP acts as the central hub. It controls the website content and availability. Crib pulls its data from the ERP.
            </p>

            <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">Data Flow</h3>
              <div className="flex items-center justify-between text-sm font-medium text-gray-600">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center mb-2 shadow-sm">ERP</div>
                </div>
                <ArrowRightLeft className="w-5 h-5 text-purple-500" />
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-[var(--color-charcoal-black)] text-white rounded-full flex items-center justify-center mb-2 shadow-sm">Web</div>
                </div>
                <ArrowRightLeft className="w-5 h-5 text-gray-400" />
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center mb-2 shadow-sm">Crib</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <p className="text-sm text-gray-700">Centralized accounting and billing from day one.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full border-2 border-red-500 flex items-center justify-center text-red-500 mt-0.5 shrink-0 font-bold text-xs">!</div>
                <p className="text-sm text-gray-700">Potential synchronization delays for property availability.</p>
              </div>
            </div>

            <button className="w-full mt-8 bg-white border border-gray-300 text-gray-700 py-3 rounded-full font-medium hover:bg-gray-50 transition-colors">
              Switch to this Architecture
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
