"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import testimonialsData from "../data/testimonials.json";

export default function TestimonialSection() {
  return (
    <section className="py-24 bg-[var(--color-off-white)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-4xl md:text-5xl font-semibold mb-6 text-[var(--color-charcoal-black)]"
          >
            Hear From Our Residents
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-500 text-lg"
          >
            Discover what it's like to live in our premium student accommodations across the globe.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white p-8 md:p-10 rounded-3xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[var(--color-soft-gold)] text-[var(--color-soft-gold)]" />
                ))}
              </div>
              
              <p className="text-gray-700 text-lg md:text-xl italic mb-8 leading-relaxed">
                "{testimonial.text}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200">
                  <img src={testimonial.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"} alt={testimonial.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--color-charcoal-black)]">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.university}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
