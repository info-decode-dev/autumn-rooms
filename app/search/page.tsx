"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, MapPin, ChevronDown, X } from "lucide-react";
import propertiesData from "@/data/properties.json";
import countriesData from "@/data/countries.json";
import PropertyCard from "@/components/PropertyCard";
import PropertyFiltersPanel, { getActiveFilterCount } from "@/components/PropertyFiltersPanel";

const DEFAULT_MAX_BUDGET = 2000;

export default function SearchPage() {
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [maxBudget, setMaxBudget] = useState(DEFAULT_MAX_BUDGET);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const activeFilterCount = getActiveFilterCount(selectedCountry, maxBudget, availableOnly, DEFAULT_MAX_BUDGET);

  const filteredProperties = propertiesData.filter((property) => {
    if (selectedCountry !== "All" && property.country !== selectedCountry) return false;
    if (availableOnly && property.isBooked) return false;
    if (property.price > maxBudget) return false;
    return true;
  });

  const clearFilters = () => {
    setSelectedCountry("All");
    setMaxBudget(DEFAULT_MAX_BUDGET);
    setAvailableOnly(false);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const country = params.get("country");
    if (country && countriesData.some((c) => c.name === country)) {
      setSelectedCountry(country);
    }
  }, []);

  useEffect(() => {
    if (!filtersOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [filtersOpen]);

  const filterPanelProps = {
    selectedCountry,
    onCountryChange: setSelectedCountry,
    maxBudget,
    onMaxBudgetChange: setMaxBudget,
    availableOnly,
    onAvailableOnlyChange: setAvailableOnly,
    onClear: clearFilters,
  };

  return (
    <div className="min-h-screen pt-28 md:pt-32 pb-24 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">

          {/* Desktop sidebar */}
          <aside className="hidden md:block w-80 shrink-0 sticky top-32 z-10">
            <div className="bg-white dark:bg-zinc-900 rounded-[2rem] p-6 shadow-sm border border-[var(--foreground)]/5">
              <PropertyFiltersPanel {...filterPanelProps} />
            </div>
          </aside>

          {/* Listings */}
          <div className="flex-1 w-full min-w-0">
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-1">
                    {selectedCountry === "All" ? "Global Properties" : `${selectedCountry} Properties`}
                  </h1>
                  <p className="text-[var(--foreground)]/60 font-medium text-sm">
                    Showing {filteredProperties.length} handpicked {filteredProperties.length === 1 ? "space" : "spaces"}
                  </p>
                </div>

                <div className="relative w-full sm:w-auto">
                  <select className="w-full sm:w-auto appearance-none bg-white dark:bg-zinc-900 border border-[var(--foreground)]/10 text-sm font-bold rounded-full pl-5 pr-10 py-3 outline-none text-[var(--foreground)] cursor-pointer shadow-sm hover:shadow-md transition-all">
                    <option>Recommended</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Highest Rated</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[var(--foreground)]/50 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Mobile quick country filter */}
              <div className="md:hidden -mx-4 sm:-mx-6 px-4 sm:px-6">
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none snap-x snap-mandatory">
                  <button
                    onClick={() => setSelectedCountry("All")}
                    className={`shrink-0 snap-start px-4 py-2 rounded-full text-sm font-bold transition-all ${
                      selectedCountry === "All"
                        ? "bg-[var(--foreground)] text-[var(--background)] shadow-md"
                        : "bg-white dark:bg-zinc-900 border border-[var(--foreground)]/10 text-[var(--foreground)]/70"
                    }`}
                  >
                    All
                  </button>
                  {countriesData.map((country) => (
                    <button
                      key={country.code}
                      onClick={() => setSelectedCountry(country.name)}
                      className={`shrink-0 snap-start px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                        selectedCountry === country.name
                          ? "bg-[var(--foreground)] text-[var(--background)] shadow-md"
                          : "bg-white dark:bg-zinc-900 border border-[var(--foreground)]/10 text-[var(--foreground)]/70"
                      }`}
                    >
                      {country.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile filter trigger */}
              <div className="md:hidden flex items-center gap-3">
                <button
                  onClick={() => setFiltersOpen(true)}
                  className="flex-1 flex items-center justify-center gap-2 bg-white dark:bg-zinc-900 border border-[var(--foreground)]/10 rounded-full py-3 px-4 text-sm font-bold text-[var(--foreground)] shadow-sm active:scale-[0.98] transition-transform"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="min-w-5 h-5 px-1.5 rounded-full bg-[var(--color-soft-gold)] text-white text-xs font-bold flex items-center justify-center">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="shrink-0 text-sm font-bold text-[var(--color-soft-gold)] px-2 py-3"
                  >
                    Clear
                  </button>
                )}
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
                className="text-center py-20 sm:py-32 bg-[var(--foreground)]/5 rounded-[2rem] border border-[var(--foreground)]/10 mt-6"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-[var(--foreground)]/5">
                  <MapPin className="w-8 h-8 sm:w-10 sm:h-10 text-[var(--foreground)]/30" />
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[var(--foreground)] mb-2">No spaces found</h3>
                <p className="text-[var(--foreground)]/60 max-w-md mx-auto px-4 text-sm sm:text-base">
                  We couldn&apos;t find any properties matching your current filters. Try adjusting your filters or selecting a different location.
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-6 px-6 py-3 bg-[var(--color-charcoal-black)] dark:bg-[var(--color-soft-gold)] text-white font-bold rounded-full hover:shadow-lg transition-all"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter bottom sheet */}
      <AnimatePresence>
        {filtersOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close filters"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFiltersOpen(false)}
              className="md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="md:hidden fixed inset-x-0 bottom-0 z-50 bg-white dark:bg-zinc-900 rounded-t-[2rem] shadow-[0_-20px_60px_rgba(0,0,0,0.15)] max-h-[88vh] flex flex-col"
            >
              <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-[var(--foreground)]/10 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--foreground)]/5 flex items-center justify-center">
                    <SlidersHorizontal className="w-5 h-5 text-[var(--foreground)]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[var(--foreground)]">Filters</h3>
                    {activeFilterCount > 0 && (
                      <p className="text-xs text-[var(--foreground)]/50 font-medium">{activeFilterCount} active</p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setFiltersOpen(false)}
                  className="w-10 h-10 rounded-full bg-[var(--foreground)]/5 flex items-center justify-center text-[var(--foreground)]/70"
                  aria-label="Close filters"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="overflow-y-auto px-6 py-6 flex-1">
                <PropertyFiltersPanel {...filterPanelProps} showHeader={false} showClearButton={false} />
              </div>

              <div className="shrink-0 px-4 pb-6 pt-4 border-t border-[var(--foreground)]/10 bg-white dark:bg-zinc-900 flex gap-3">
                <button
                  onClick={clearFilters}
                  className="flex-1 py-3.5 rounded-full text-sm font-bold border border-[var(--foreground)]/10 text-[var(--foreground)]/70"
                >
                  Clear
                </button>
                <button
                  onClick={() => setFiltersOpen(false)}
                  className="flex-[1.4] py-3.5 rounded-full text-sm font-bold bg-[var(--color-soft-gold)] text-white shadow-md"
                >
                  Show {filteredProperties.length} {filteredProperties.length === 1 ? "space" : "spaces"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
