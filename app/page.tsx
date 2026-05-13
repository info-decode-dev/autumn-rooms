import HeroSection from "@/sections/HeroSection";
import DestinationsSection from "@/sections/DestinationsSection";
import TrendingSection from "@/sections/TrendingSection";
import TestimonialSection from "@/sections/TestimonialSection";

export default function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      <DestinationsSection />
      <TrendingSection />
      <TestimonialSection />
    </div>
  );
}
