"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import PropertyCard from "../components/PropertyCard";
import propertiesData from "../data/properties.json";

export default function TrendingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="trending" ref={ref} className="py-24 bg-[var(--background)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex justify-between items-end mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-4 text-[var(--foreground)]">
              Trending Properties
            </h2>
            <p className="text-[var(--foreground)]/70 max-w-lg text-lg">
              Explore our most sought-after luxury accommodations around the world. Designed for comfort and focus.
            </p>
          </motion.div>

          {/* Custom Navigation Buttons */}
          <div className="hidden md:flex gap-3">
            <button className="trending-prev w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[var(--color-soft-gold)] hover:text-white hover:border-transparent transition-all">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="trending-next w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[var(--color-soft-gold)] hover:text-white hover:border-transparent transition-all">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Swiper
            modules={[Navigation, A11y]}
            spaceBetween={32}
            slidesPerView={1}
            navigation={{
              prevEl: ".trending-prev",
              nextEl: ".trending-next",
            }}
            breakpoints={{
              640: { slidesPerView: 1.5 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="!pb-12"
          >
            {propertiesData.map((property) => (
              <SwiperSlide key={property.id}>
                <PropertyCard property={property} />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
