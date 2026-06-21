"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import destinationsData from "@/data/destinations.json";
import propertiesData from "@/data/properties.json";

export default function DestinationsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const getPropertyCount = (countryName: string) =>
    propertiesData.filter((p) => p.country === countryName).length;

  return (
    <section id="destinations" ref={ref} className="py-24 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 gap-6"
        >
          <div>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-4 text-[var(--foreground)]">
              Global Destinations
            </h2>
            <p className="text-[var(--foreground)]/70 max-w-lg text-lg">
              Find your home away from home in the world&apos;s most vibrant student cities.
            </p>
          </div>
          <Link href="/destinations" className="inline-flex items-center gap-2 text-[var(--color-soft-gold)] font-bold hover:opacity-80 transition-opacity">
            View all destinations <ArrowUpRight className="w-5 h-5" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {destinationsData.map((dest, i) => (
            <motion.div
              key={dest.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`group relative h-80 rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all ${dest.colSpan}`}
            >
              <Link href={`/search?country=${encodeURIComponent(dest.name)}`}>
                <img 
                  src={dest.image} 
                  alt={dest.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end pointer-events-none">
                  <h3 className="text-white font-serif text-3xl font-bold mb-1 drop-shadow-md">{dest.name}</h3>
                  <p className="text-white/90 font-medium drop-shadow-sm">
                    {getPropertyCount(dest.name)} properties listed
                  </p>
                </div>
                
                <div className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <ArrowUpRight className="w-6 h-6" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
