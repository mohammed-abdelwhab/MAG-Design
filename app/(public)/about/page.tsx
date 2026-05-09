import { AboutSection } from "@/components/sections/AboutSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about the philosophy, legacy, and team behind MAG Design.",
};

export default function AboutPage() {
  return <AboutSection />;
}
