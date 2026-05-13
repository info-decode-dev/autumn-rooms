"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, MapPin, ChevronDown } from "lucide-react";
import propertiesData from "@/data/properties.json";
import countriesData from "@/data/countries.json";
import PropertyCard from "@/components/PropertyCard";

export default function SearchPage() {
  const [selectedCountry, setSelectedCountry] = useState("All");

  const filteredProperties = selectedCountry === "All" 
    ? propertiesData 
    : propertiesData.filter(p => p.country === selectedCountry);

  return (
    <div className="min-h-screen pt-32 pb-24 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          {/* Sidebar Filters */}
          <aside className="w-full md:w-80 flex-shrink-0 sticky top-32 z-10">
            <div className="bg-white dark:bg-zinc-900 rounded-[2rem] p-6 shadow-sm border border-[var(--foreground)]/5">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[var(--foreground)]/10">
                <div className="w-10 h-10 rounded-full bg-[var(--foreground)]/5 flex items-center justify-center">
                  <SlidersHorizontal className="w-5 h-5 text-[var(--foreground)]" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[var(--foreground)]">Filters</h3>
              </div>

              {/* Country Chips */}
              <div className="mb-8">
                <h4 className="text-[10px] font-bold text-[var(--foreground)]/40 uppercase tracking-widest mb-4">Location</h4>
                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={() => setSelectedCountry("All")}
                    className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                      selectedCountry === "All" 
                        ? "bg-[var(--foreground)] text-[var(--background)] shadow-md" 
                        : "bg-[var(--foreground)]/5 text-[var(--foreground)]/70 hover:bg-[var(--foreground)]/10"
                    }`}
                  >
                    All
                  </button>
                  {countriesData.map(country => (
                    <button 
                      key={country.code}
                      onClick={() => setSelectedCountry(country.name)}
                      className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                        selectedCountry === country.name 
                          ? "bg-[var(--foreground)] text-[var(--background)] shadow-md" 
                          : "bg-[var(--foreground)]/5 text-[var(--foreground)]/70 hover:bg-[var(--foreground)]/10"
                      }`}
                    >
                      {country.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <h4 className="text-[10px] font-bold text-[var(--foreground)]/40 uppercase tracking-widest mb-4">Weekly Budget</h4>
                <input type="range" min="100" max="1000" className="w-full accent-[var(--color-soft-gold)]" />
                <div className="flex justify-between text-xs font-bold text-[var(--foreground)]/50 mt-2">
                  <span>£100</span>
                  <span>£1000+</span>
                </div>
              </div>

              {/* Availability Toggle */}
              <div>
                <h4 className="text-[10px] font-bold text-[var(--foreground)]/40 uppercase tracking-widest mb-4">Availability</h4>
                <label className="flex items-center justify-between cursor-pointer group">
                  <span className="text-sm font-bold text-[var(--foreground)]/80 group-hover:text-[var(--foreground)] transition-colors">Show Available Only</span>
                  <div className="relative">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-[var(--foreground)]/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-soft-gold)]"></div>
                  </div>
                </label>
              </div>
            </div>
          </aside>

          {/* Listings */}
          <div className="flex-1 w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-1">
                  {selectedCountry === "All" ? "Global Properties" : `${selectedCountry} Properties`}
                </h1>
                <p className="text-[var(--foreground)]/60 font-medium text-sm">
                  Showing {filteredProperties.length} handpicked {filteredProperties.length === 1 ? 'space' : 'spaces'}
                </p>
              </div>
              
              <div className="relative">
                <select className="appearance-none bg-white dark:bg-zinc-900 border border-[var(--foreground)]/10 text-sm font-bold rounded-full pl-5 pr-10 py-3 outline-none text-[var(--foreground)] cursor-pointer shadow-sm hover:shadow-md transition-all">
                  <option>Recommended</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Highest Rated</option>
                </select>
                <ChevronDown className="w-4 h-4 text-[var(--foreground)]/50 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredProperties.map((property, index) => (
                  <motion.div
                    key={property.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <PropertyCard property={property} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredProperties.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="text-center py-32 bg-[var(--foreground)]/5 rounded-[2rem] border border-[var(--foreground)]/10 mt-6"
              >
                <div className="w-24 h-24 bg-white dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-[var(--foreground)]/5">
                  <MapPin className="w-10 h-10 text-[var(--foreground)]/30" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[var(--foreground)] mb-2">No spaces found</h3>
                <p className="text-[var(--foreground)]/60 max-w-md mx-auto">We couldn't find any properties matching your current filters. Try selecting a different location.</p>
                <button 
                  onClick={() => setSelectedCountry("All")}
                  className="mt-6 px-6 py-3 bg-[var(--color-charcoal-black)] dark:bg-[var(--color-soft-gold)] text-white font-bold rounded-full hover:shadow-lg transition-all"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
