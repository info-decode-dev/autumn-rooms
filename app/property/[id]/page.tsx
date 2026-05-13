"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, MapPin, Check, ChevronRight, ShieldCheck, Wifi, Coffee, 
  Dumbbell, Gift, Zap, Droplets, Flame, Bus, GraduationCap, ChevronDown 
} from "lucide-react";
import Link from "next/link";
import propertiesData from "@/data/properties.json";

// Mock FAQ Component
const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-[var(--foreground)]/10">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full py-5 flex justify-between items-center text-left focus:outline-none"
      >
        <h4 className="font-semibold text-lg text-[var(--foreground)]">{question}</h4>
        <ChevronDown className={`w-5 h-5 text-[var(--foreground)]/50 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: "auto", opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-[var(--foreground)]/70">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function PropertyDetailsPage() {
  const params = useParams();
  const propertyId = params.id as string;
  const property = propertiesData.find(p => p.id === propertyId) || propertiesData[0];

  const imageSrc1 = property.images[0] || "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";
  const imageSrc2 = property.images[1] || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";
  const imageSrc3 = "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";
  const imageSrc4 = "https://images.unsplash.com/photo-1600566753086-00f18efc2291?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";
  const imageSrc5 = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";

  return (
    <div className="min-h-screen pt-24 pb-24 bg-[var(--background)]">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-6">
        <div className="flex items-center gap-2 text-sm text-[var(--foreground)]/60 font-medium">
          <Link href="/" className="hover:text-[var(--color-soft-gold)] transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/search" className="hover:text-[var(--color-soft-gold)] transition-colors">{property.country}</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-[var(--foreground)] font-semibold">{property.title}</span>
        </div>
      </div>

      {/* Hero Gallery */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-3 h-[50vh] md:h-[65vh] rounded-3xl overflow-hidden shadow-xl">
          <div className="md:col-span-2 md:row-span-2 w-full h-full relative group cursor-pointer overflow-hidden rounded-l-3xl md:rounded-none">
            <img src={imageSrc1} alt="Property Exterior Main" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500"></div>
          </div>
          <div className="w-full h-full relative group hidden md:block cursor-pointer overflow-hidden">
            <img src={imageSrc2} alt="Property Interior 1" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500"></div>
          </div>
          <div className="w-full h-full relative group hidden md:block cursor-pointer overflow-hidden rounded-tr-3xl">
            <img src={imageSrc3} alt="Property Interior 2" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500"></div>
          </div>
          <div className="w-full h-full relative group hidden md:block cursor-pointer overflow-hidden">
            <img src={imageSrc4} alt="Property Interior 3" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500"></div>
          </div>
          <div className="w-full h-full relative group hidden md:block cursor-pointer overflow-hidden rounded-br-3xl">
            <img src={imageSrc5} alt="Property Interior 4" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Main Content */}
          <div className="flex-1">
            
            {/* Header & Offers */}
            <div className="mb-10">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-serif text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-4 leading-tight"
              >
                {property.title}
              </motion.h1>
              <div className="flex flex-wrap items-center gap-6 text-[var(--foreground)]/80 font-medium text-lg mb-8">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-5 h-5 text-[var(--color-muted-terracotta)]" />
                  <span>{property.city}, {property.country}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-[var(--foreground)]/5 px-3 py-1 rounded-full border border-[var(--color-soft-gold)]/30">
                  <Star className="w-4 h-4 text-[var(--color-soft-gold)] fill-[var(--color-soft-gold)]" />
                  <span className="font-bold text-[var(--foreground)]">{property.rating} <span className="text-[var(--foreground)]/50 font-normal text-sm">/ 5.0</span></span>
                </div>
              </div>

              {/* Exclusive Offers Banner */}
              <div className="bg-[var(--color-soft-gold)]/10 border border-[var(--color-soft-gold)]/30 rounded-2xl p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="w-12 h-12 bg-[var(--color-soft-gold)] rounded-full flex flex-shrink-0 items-center justify-center text-white">
                  <Gift className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-[var(--foreground)] text-lg mb-1">Exclusive Student Offers</h3>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[var(--foreground)]/80">
                    <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-[var(--color-soft-gold)]" /> Grab £500 Cashback for 2026/27</span>
                    <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-[var(--color-soft-gold)]" /> Free Amazon Prime Membership</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-[var(--foreground)]/10 py-10 mb-8">
              <h3 className="font-serif text-2xl font-bold mb-6 text-[var(--foreground)]">About the Property</h3>
              <p className="text-[var(--foreground)]/80 leading-relaxed text-lg mb-8 bg-white dark:bg-zinc-900/50 p-6 rounded-2xl shadow-sm border border-[var(--foreground)]/5">
                Experience unparalleled luxury and convenience at <strong>{property.title}</strong>. Located in the heart of {property.city}, this premium accommodation places you right where you need to be. Designed specifically for modern students, it combines scandinavian minimalism with state-of-the-art facilities, offering a perfect environment for both studying and socializing. 
              </p>
              
              <h4 className="font-semibold text-lg text-[var(--foreground)] mb-4">What's Included in Your Rent</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <div className="bg-white dark:bg-zinc-900/80 p-5 rounded-2xl flex flex-col items-center justify-center text-center gap-3 border border-[var(--foreground)]/5 shadow-sm">
                  <Wifi className="w-6 h-6 text-blue-500" />
                  <span className="text-sm font-bold text-[var(--foreground)]">Superfast Wi-Fi</span>
                </div>
                <div className="bg-white dark:bg-zinc-900/80 p-5 rounded-2xl flex flex-col items-center justify-center text-center gap-3 border border-[var(--foreground)]/5 shadow-sm">
                  <Zap className="w-6 h-6 text-yellow-500" />
                  <span className="text-sm font-bold text-[var(--foreground)]">Electricity</span>
                </div>
                <div className="bg-white dark:bg-zinc-900/80 p-5 rounded-2xl flex flex-col items-center justify-center text-center gap-3 border border-[var(--foreground)]/5 shadow-sm">
                  <Droplets className="w-6 h-6 text-cyan-500" />
                  <span className="text-sm font-bold text-[var(--foreground)]">Water Supply</span>
                </div>
                <div className="bg-white dark:bg-zinc-900/80 p-5 rounded-2xl flex flex-col items-center justify-center text-center gap-3 border border-[var(--foreground)]/5 shadow-sm">
                  <Flame className="w-6 h-6 text-orange-500" />
                  <span className="text-sm font-bold text-[var(--foreground)]">Gas Heating</span>
                </div>
              </div>

              <h4 className="font-semibold text-lg text-[var(--foreground)] mb-4">Premium Facilities</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-[var(--foreground)]/5 p-5 rounded-2xl flex flex-col items-center justify-center text-center gap-3 border-2 border-transparent hover:border-[var(--color-soft-gold)] transition-colors">
                  <ShieldCheck className="w-8 h-8 text-[var(--color-soft-gold)]" />
                  <span className="text-sm font-bold text-[var(--foreground)]">24/7 Security</span>
                </div>
                <div className="bg-[var(--foreground)]/5 p-5 rounded-2xl flex flex-col items-center justify-center text-center gap-3 border-2 border-transparent hover:border-[var(--color-soft-gold)] transition-colors">
                  <Coffee className="w-8 h-8 text-[var(--color-soft-gold)]" />
                  <span className="text-sm font-bold text-[var(--foreground)]">Study Lounges</span>
                </div>
                <div className="bg-[var(--foreground)]/5 p-5 rounded-2xl flex flex-col items-center justify-center text-center gap-3 border-2 border-transparent hover:border-[var(--color-soft-gold)] transition-colors">
                  <Dumbbell className="w-8 h-8 text-[var(--color-soft-gold)]" />
                  <span className="text-sm font-bold text-[var(--foreground)]">Fitness Center</span>
                </div>
                <div className="bg-[var(--foreground)]/5 p-5 rounded-2xl flex flex-col items-center justify-center text-center gap-3 border-2 border-transparent hover:border-[var(--color-soft-gold)] transition-colors">
                  <Bus className="w-8 h-8 text-[var(--color-soft-gold)]" />
                  <span className="text-sm font-bold text-[var(--foreground)]">Transit Links</span>
                </div>
              </div>
            </div>

            {/* Common Amenities */}
            <div className="border-t border-[var(--foreground)]/10 py-10">
              <h3 className="font-serif text-2xl font-bold mb-8 text-[var(--foreground)]">Common Building Amenities</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4">
                {property.amenities.map((amenity: string) => (
                  <li key={amenity} className="flex items-center gap-4 text-[var(--foreground)] font-medium text-lg bg-white dark:bg-zinc-900 px-4 py-3 rounded-xl border border-[var(--foreground)]/5 shadow-sm">
                    <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-5 h-5 text-green-500" />
                    </div>
                    {amenity}
                  </li>
                ))}
              </ul>
            </div>

            {/* Commute & Location */}
            <div className="border-t border-[var(--foreground)]/10 py-10">
              <h3 className="font-serif text-2xl font-bold mb-8 text-[var(--foreground)]">Location & Universities</h3>
              <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-[var(--foreground)]/10 p-6">
                <ul className="space-y-4">
                  <li className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 text-blue-600 p-2 rounded-lg"><GraduationCap className="w-5 h-5" /></div>
                      <span className="font-medium text-[var(--foreground)]">Main University Campus</span>
                    </div>
                    <span className="text-sm font-bold text-[var(--foreground)]/60 bg-[var(--foreground)]/5 px-3 py-1 rounded-full">10 min walk</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-100 text-purple-600 p-2 rounded-lg"><GraduationCap className="w-5 h-5" /></div>
                      <span className="font-medium text-[var(--foreground)]">School of Arts & Design</span>
                    </div>
                    <span className="text-sm font-bold text-[var(--foreground)]/60 bg-[var(--foreground)]/5 px-3 py-1 rounded-full">15 min bus</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-100 text-green-600 p-2 rounded-lg"><Bus className="w-5 h-5" /></div>
                      <span className="font-medium text-[var(--foreground)]">Central Train Station</span>
                    </div>
                    <span className="text-sm font-bold text-[var(--foreground)]/60 bg-[var(--foreground)]/5 px-3 py-1 rounded-full">5 min walk</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* FAQs */}
            <div className="border-t border-[var(--foreground)]/10 py-10">
              <h3 className="font-serif text-2xl font-bold mb-6 text-[var(--foreground)]">Frequently Asked Questions</h3>
              <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-[var(--foreground)]/10 px-6">
                <FAQItem 
                  question="What does the rent include?" 
                  answer="Your rent is all-inclusive! It covers high-speed Wi-Fi, electricity, water, and gas. There are no hidden utility bills, allowing you to easily manage your student budget."
                />
                <FAQItem 
                  question="Are international students accepted?" 
                  answer="Absolutely. We welcome students from all over the world. International students may need to provide a UK Guarantor or use a guarantor service, but the process is completely streamlined."
                />
                <FAQItem 
                  question="What is the cancellation policy?" 
                  answer="We offer a 'No Visa, No Pay' and 'No Place, No Pay' policy. If you don't get your visa or your university spot, you can cancel your booking penalty-free before the specified deadline."
                />
                <FAQItem 
                  question="Is the property secure?" 
                  answer="Safety is our top priority. The property features 24/7 CCTV, secure key-fob entry systems, and on-site staff available around the clock."
                />
              </div>
            </div>

          </div>

          {/* Sidebar Booking Card */}
          <div className="w-full lg:w-[420px]">
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-[var(--foreground)]/10 sticky top-32">
              <div className="mb-6">
                <span className="text-sm text-[var(--foreground)]/60 uppercase tracking-widest font-bold block mb-2">Starting from</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-serif font-bold text-[var(--foreground)]">{property.price}</span>
                  <span className="text-[var(--foreground)]/50 font-medium">/ week</span>
                </div>
              </div>

              {/* Bills Included Trust Badge */}
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 mb-8 flex items-center gap-3">
                <div className="bg-green-500 rounded-full p-1.5 text-white">
                  <Check className="w-4 h-4" />
                </div>
                <p className="text-sm font-bold text-green-700 dark:text-green-400">All Utility Bills Included</p>
              </div>

              <div className="bg-[var(--foreground)]/5 rounded-2xl p-5 mb-8 border border-[var(--foreground)]/10">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-bold text-[var(--foreground)]">Current Availability</span>
                  {property.isBooked ? (
                    <span className="text-sm font-bold text-red-500 bg-red-500/10 px-3 py-1 rounded-full">Fully Booked</span>
                  ) : (
                    <span className="text-sm font-bold text-green-600 bg-green-500/10 px-3 py-1 rounded-full">{property.availableBeds} spaces left</span>
                  )}
                </div>
                <div className="w-full bg-[var(--foreground)]/10 rounded-full h-2.5 overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-1000 ${property.isBooked ? 'bg-red-500 w-full' : 'bg-green-500 w-[65%]'}`}></div>
                </div>
              </div>

              <Link 
                href={property.isBooked ? "#" : "/booking"}
                className={`w-full py-5 rounded-2xl font-bold text-lg flex items-center justify-center transition-all ${
                  property.isBooked 
                    ? "bg-[var(--foreground)]/10 text-[var(--foreground)]/50 cursor-not-allowed" 
                    : "bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                }`}
              >
                {property.isBooked ? "Join Waitlist" : "Select Room & Book"}
              </Link>

              <div className="text-center mt-6 flex flex-col gap-2">
                <p className="text-sm font-medium text-[var(--foreground)]/60">Free Cancellation (T&Cs Apply)</p>
                <div className="flex items-center justify-center gap-1.5 text-xs text-[var(--foreground)]/50 mt-1">
                  <ShieldCheck className="w-4 h-4 text-green-500" />
                  <span>Verified Property Manager</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
