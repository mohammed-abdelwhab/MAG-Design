import { HeroSection } from "@/components/sections/HeroSection";
import { IntroSection } from "@/components/sections/IntroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { PortfolioPreviewSection } from "@/components/sections/PortfolioPreviewSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CTASection } from "@/components/sections/CTASection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MAG Design — Luxury Interior Design Studio",
  description: "A luxury interior design studio under Al Khaleeg Group. Premium residential interiors across Cairo, New Cairo, Sheikh Zayed, and the North Coast of Egypt.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <ServicesSection />
      <PortfolioPreviewSection />
      <ProcessSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
