import { ContactSection } from "@/components/sections/ContactSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with MAG Design to discuss your upcoming luxury interior project.",
};

export default function ContactPage() {
  return <ContactSection />;
}
