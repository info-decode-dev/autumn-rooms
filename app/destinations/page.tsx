"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import destinationsData from "@/data/destinations.json";
import countriesData from "@/data/countries.json";
import propertiesData from "@/data/properties.json";

export default function DestinationsPage() {
  const getPropertyCount = (countryName: string) =>
    propertiesData.filter((p) => p.country === countryName).length;

  const getCountryMeta = (countryName: string) =>
    countriesData.find((c) => c.name === countryName);

  return (
    <div className="min-h-screen pt-28 md:pt-32 pb-24 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-4 text-[var(--foreground)]">
            Explore Destinations
          </h1>
          <p className="text-[var(--foreground)]/70 text-lg">
            Discover student cities across the globe. Each destination offers handpicked properties with all-inclusive living and verified managers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {destinationsData.map((dest, i) => {
            const country = getCountryMeta(dest.name);
            const listedCount = getPropertyCount(dest.name);

            return (
              <motion.div
                key={dest.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`group relative rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all bg-white dark:bg-zinc-900 border border-[var(--foreground)]/5 ${dest.colSpan}`}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <h2 className="absolute bottom-5 left-6 font-serif text-3xl font-bold text-white drop-shadow-md">
                    {dest.name}
                  </h2>
                </div>

                <div className="p-6">
                  <p className="text-[var(--foreground)]/70 text-sm leading-relaxed mb-4">
                    {dest.description}
                  </p>

                  {country && (
                    <div className="flex items-start gap-2 text-sm text-[var(--foreground)]/60 mb-4">
                      <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[var(--color-soft-gold)]" />
                      <span>{country.popularCities.join(" · ")}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-bold text-[var(--foreground)]/80">
                      {listedCount} {listedCount === 1 ? "property" : "properties"} listed
                    </span>
                    <Link
                      href={`/search?country=${encodeURIComponent(dest.name)}`}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--color-soft-gold)] hover:opacity-80 transition-opacity"
                    >
                      Browse spaces
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
