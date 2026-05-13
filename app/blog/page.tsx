"use client";

import { motion } from "framer-motion";
import blogsData from "@/data/blogs.json";
import { ArrowRight, Clock } from "lucide-react";
import Link from "next/link";

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-[var(--color-off-white)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="font-serif text-5xl md:text-6xl font-semibold mb-6 text-[var(--color-charcoal-black)]">
            Student Living Insights
          </h1>
          <p className="text-gray-500 text-lg">
            Discover tips, city guides, and stories to make the most of your study abroad experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogsData.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow group flex flex-col h-full border border-gray-100"
            >
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={blog.image || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"} 
                  alt={blog.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {blog.tags.map(tag => (
                    <span key={tag} className="bg-white/90 backdrop-blur text-[var(--color-charcoal-black)] text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                  <span className="font-medium">{blog.date}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{blog.readTime}</span>
                  </div>
                </div>
                <h3 className="font-serif text-2xl font-semibold text-[var(--color-charcoal-black)] mb-3 line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-gray-600 mb-6 flex-1 line-clamp-3">
                  {blog.excerpt}
                </p>
                <Link href={`/blog/${blog.id}`} className="inline-flex items-center gap-2 text-[var(--color-soft-gold)] font-medium hover:text-[var(--color-warm-brown)] transition-colors mt-auto">
                  Read Article <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
