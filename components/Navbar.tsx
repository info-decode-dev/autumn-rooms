"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, User, Search } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Destinations", href: "/destinations" },
    { name: "Properties", href: "/properties" },
    { name: "How it Works", href: "/how-it-works" },
    { name: "Blog", href: "/blog" },
  ];

  const isHomePage = pathname === '/';
  const useLightLogo = (!isScrolled && isHomePage) || isMobileMenuOpen;
  // Text is white on home page (due to dark hero) or if mobile menu is open. Otherwise, adapt to theme.
  const textColor = useLightLogo
    ? "text-white" 
    : "text-[var(--foreground)]";

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed left-0 right-0 z-50 transition-all duration-500 flex justify-center ${
        isScrolled ? "top-4 px-4 md:px-0" : "top-0 px-0"
      }`}
    >
      <div 
        className={`w-full flex justify-between items-center transition-all duration-500 ${
          isScrolled 
            ? "max-w-5xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-[var(--foreground)]/10 rounded-full py-3 px-6 md:px-8 shadow-xl" 
            : "max-w-7xl mx-auto py-6 px-6 md:px-12 bg-transparent drop-shadow-lg"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center z-50">
          <Image
            src="/images/logo-with-text.png"
            alt="Autumn Rooms"
            width={200}
            height={52}
            priority
            className="h-11 w-auto object-contain"
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-[var(--color-soft-gold)] ${textColor}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/search" className={`hover:text-[var(--color-soft-gold)] transition-colors ${textColor}`}>
            <Globe className="w-5 h-5" />
          </Link>
          <Link href="/search" className={`hover:text-[var(--color-soft-gold)] transition-colors ${textColor}`}>
            <Search className="w-5 h-5" />
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 bg-[var(--color-soft-gold)] text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-md hover:shadow-lg hover:opacity-90 transition-all transform hover:-translate-y-0.5"
          >
            <User className="w-4 h-4" />
            Sign In
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={`md:hidden z-50 transition-colors ${textColor}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-[var(--color-charcoal-black)] z-[60] flex flex-col md:hidden"
          >
            <div className="flex items-center justify-between px-6 pt-6 pb-4 shrink-0">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center">
                <Image
                  src="/images/logo-with-text.png"
                  alt="Autumn Rooms"
                  width={200}
                  height={52}
                  className="h-11 w-auto object-contain"
                />
              </Link>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-center items-center gap-8 px-6 pb-12">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.3 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-serif text-white hover:text-[var(--color-soft-gold)] transition-colors"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex gap-6 mt-8"
            >
              <Link href="/search" onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-[var(--color-soft-gold)] transition-colors">
                <Globe className="w-6 h-6" />
              </Link>
              <Link
                href="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-[var(--color-soft-gold)] text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-white hover:text-[var(--color-charcoal-black)] transition-colors"
              >
                Sign In
              </Link>
            </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
