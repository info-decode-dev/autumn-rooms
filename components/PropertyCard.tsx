"use client";

import { motion } from "framer-motion";
import { Star, MapPin, Heart, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PropertyProps {
  property: {
    id: string;
    title: string;
    city: string;
    country: string;
    price: string;
    rating: number;
    availableBeds: number;
    tags: string[];
    images: string[];
    isBooked: boolean;
  };
}

export default function PropertyCard({ property }: PropertyProps) {
  // Use a placeholder image for now
  const imageSrc = property.images[0] || "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";

  return (
    <motion.div 
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white dark:bg-zinc-900 rounded-[2rem] overflow-hidden border border-[var(--foreground)]/5 shadow-sm hover:shadow-xl transition-all cursor-pointer h-full flex flex-col"
    >
      <Link href={`/property/${property.id}`} className="block h-full flex flex-col">
        {/* Image Section */}
        <div className="relative h-64 w-full p-3 pb-0">
          <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden">
            <img 
              src={imageSrc} 
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Top Badges */}
            <div className="absolute top-3 left-3 flex flex-wrap gap-2">
              {property.isBooked ? (
                <span className="bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
                  Fully Booked
                </span>
              ) : (
                property.tags.map((tag) => (
                  <span key={tag} className="bg-[var(--color-soft-gold)]/95 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
                    {tag}
                  </span>
                ))
              )}
            </div>

            {/* Action Buttons */}
            <div className="absolute top-3 right-3 flex gap-2">
              <button 
                className="bg-white/90 dark:bg-black/50 backdrop-blur-md p-2 rounded-full text-[var(--foreground)] hover:text-red-500 transition-colors shadow-sm" 
                onClick={(e) => { e.preventDefault(); /* Add to wishlist logic */ }}
              >
                <Heart className="w-4 h-4" />
              </button>
            </div>
            
            {/* Bottom Gradient */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
            
            {/* Carousel dots mock */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-white opacity-100" />
              <div className="w-1.5 h-1.5 rounded-full bg-white opacity-50" />
              <div className="w-1.5 h-1.5 rounded-full bg-white opacity-50" />
              <div className="w-1.5 h-1.5 rounded-full bg-white opacity-50" />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5 pt-4 flex flex-col flex-1">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-serif text-xl font-bold text-[var(--foreground)] line-clamp-1 pr-2">
              {property.title}
            </h3>
            <div className="flex items-center gap-1 mt-1 flex-shrink-0">
              <Star className="w-3.5 h-3.5 text-[var(--color-soft-gold)] fill-[var(--color-soft-gold)]" />
              <span className="text-sm font-bold text-[var(--foreground)]">{property.rating}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[var(--foreground)]/60 text-sm mb-4 font-medium">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{property.city}, {property.country}</span>
          </div>

          <div className="flex items-end justify-between mt-auto pt-4 border-t border-[var(--foreground)]/10">
            <div>
              <span className="text-[10px] font-bold text-[var(--foreground)]/40 uppercase tracking-widest block mb-0.5">Starting from</span>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-serif font-bold text-[var(--foreground)]">{property.price}</span>
              </div>
            </div>
            
            {!property.isBooked ? (
              <span className="text-xs text-green-600 dark:text-green-400 font-bold bg-green-500/10 px-3 py-1.5 rounded-full">
                {property.availableBeds} spaces left
              </span>
            ) : (
              <span className="text-xs text-[var(--foreground)]/50 font-bold bg-[var(--foreground)]/5 px-3 py-1.5 rounded-full">
                Waitlist only
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
