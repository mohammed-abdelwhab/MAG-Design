import { ServicesDetailSection } from "@/components/sections/ServicesDetailSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description: "Comprehensive interior design and full finishing services by MAG Design.",
};

export default function ServicesPage() {
  return <ServicesDetailSection />;
}
