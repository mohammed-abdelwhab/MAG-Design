import { PortfolioGridSection } from "@/components/sections/PortfolioGridSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Explore MAG Design's portfolio of luxury residential interiors.",
};

export default function PortfolioPage() {
  return (
    <>
      <PortfolioGridSection />
    </>
  );
}
