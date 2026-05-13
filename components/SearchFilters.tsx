"use client";

import { useState } from "react";
import { Search, MapPin, Calendar, Bed, GraduationCap } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SearchFilters() {
  const router = useRouter();
  const [location, setLocation] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?location=${location}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl md:rounded-full p-2 md:p-3 shadow-2xl relative z-20 text-left">
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center">
        
        {/* Filter 1: Location/University */}
        <div className="flex-1 w-full flex items-center gap-3 px-6 py-3 md:py-2 md:border-r border-gray-200 hover:bg-gray-50 rounded-full md:rounded-r-none transition-colors cursor-text">
          <GraduationCap className="text-[var(--color-soft-gold)] w-6 h-6 flex-shrink-0" />
          <div className="flex flex-col flex-1">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">City or University</span>
            <input
              type="text"
              placeholder="e.g. London, UCL..."
              className="bg-transparent border-none outline-none text-gray-900 font-bold w-full placeholder-gray-300 focus:ring-0 p-0 text-base"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>
        
        {/* Filter 2: Intake */}
        <div className="flex-1 w-full flex items-center gap-3 px-6 py-3 md:py-2 md:border-r border-gray-200 hover:bg-gray-50 md:rounded-none rounded-full transition-colors cursor-pointer">
          <Calendar className="text-[var(--color-soft-gold)] w-6 h-6 flex-shrink-0" />
          <div className="flex flex-col flex-1">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Intake</span>
            <select className="bg-transparent border-none outline-none text-gray-900 font-bold w-full focus:ring-0 p-0 cursor-pointer appearance-none text-base">
              <option value="" className="text-gray-900">Any Time</option>
              <option value="sep26" className="text-gray-900">Sep 2026 (Fall)</option>
              <option value="jan27" className="text-gray-900">Jan 2027 (Spring)</option>
              <option value="summer" className="text-gray-900">Summer 2026</option>
            </select>
          </div>
        </div>

        {/* Filter 3: Room Type */}
        <div className="flex-1 w-full flex items-center gap-3 px-6 py-3 md:py-2 hover:bg-gray-50 rounded-full md:rounded-l-none transition-colors cursor-pointer">
          <Bed className="text-[var(--color-soft-gold)] w-6 h-6 flex-shrink-0" />
          <div className="flex flex-col flex-1">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Room Type</span>
            <select className="bg-transparent border-none outline-none text-gray-900 font-bold w-full focus:ring-0 p-0 cursor-pointer appearance-none text-base">
              <option value="" className="text-gray-900">Any Type</option>
              <option value="ensuite" className="text-gray-900">En-suite</option>
              <option value="studio" className="text-gray-900">Private Studio</option>
              <option value="shared" className="text-gray-900">Shared Room</option>
            </select>
          </div>
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="w-full md:w-auto bg-[var(--color-soft-gold)] text-white p-4 md:px-8 md:py-4 rounded-full font-bold hover:bg-[var(--color-charcoal-black)] transition-all flex items-center justify-center gap-2 mt-2 md:mt-0 md:ml-2 shadow-lg shadow-[var(--color-soft-gold)]/30 hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <Search className="w-5 h-5" />
          <span className="md:hidden">Search Spaces</span>
        </button>
      </form>
    </div>
  );
}
