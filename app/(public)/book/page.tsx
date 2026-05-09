import { BookingFormSection } from "@/components/sections/BookingFormSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Consultation",
  description: "Schedule a complimentary interior design consultation with MAG Design.",
};

export default function BookPage() {
  return <BookingFormSection />;
}
