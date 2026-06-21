import Link from "next/link";
import Image from "next/image";
import { Globe, MessageCircle, Camera, Briefcase } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-charcoal-black)] text-[var(--color-off-white)] pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/images/logo-with-text.png"
                alt="Autumn Rooms"
                width={200}
                height={52}
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              A premium luxury accommodation platform finding your perfect living space abroad. Experience scandinavian minimalism combined with modern convenience.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-[var(--color-soft-gold)] transition-colors">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[var(--color-soft-gold)] transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[var(--color-soft-gold)] transition-colors">
                <Camera className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[var(--color-soft-gold)] transition-colors">
                <Briefcase className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-white mb-6">Explore</h4>
            <ul className="flex flex-col gap-4 text-sm text-gray-400">
              <li><Link href="/search" className="hover:text-[var(--color-soft-gold)] transition-colors">Find a Room</Link></li>
              <li><Link href="/destinations" className="hover:text-[var(--color-soft-gold)] transition-colors">Destinations</Link></li>
              <li><Link href="/trending" className="hover:text-[var(--color-soft-gold)] transition-colors">Trending Properties</Link></li>
              <li><Link href="/blog" className="hover:text-[var(--color-soft-gold)] transition-colors">Student Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-white mb-6">Support</h4>
            <ul className="flex flex-col gap-4 text-sm text-gray-400">
              <li><Link href="/faq" className="hover:text-[var(--color-soft-gold)] transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-[var(--color-soft-gold)] transition-colors">Contact Us</Link></li>
              <li><Link href="/how-it-works" className="hover:text-[var(--color-soft-gold)] transition-colors">How it Works</Link></li>
              <li><Link href="/terms" className="hover:text-[var(--color-soft-gold)] transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-white mb-6">Localization</h4>
            <div className="flex flex-col gap-4 text-sm text-gray-400">
              <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                <span>Currency</span>
                <select className="bg-transparent text-white outline-none">
                  <option value="GBP">GBP (£)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="USD">USD ($)</option>
                  <option value="AUD">AUD ($)</option>
                </select>
              </div>
              <div className="flex justify-between items-center border-b border-gray-700 pb-2 mt-2">
                <span>Language</span>
                <select className="bg-transparent text-white outline-none">
                  <option value="en">English</option>
                  <option value="de">German</option>
                  <option value="es">Spanish</option>
                  <option value="zh">Chinese</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Autumn Rooms. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
