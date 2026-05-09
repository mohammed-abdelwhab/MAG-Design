import type { Metadata } from "next";
import "@/styles/globals.css";
import { AppProviders } from "@/providers/AppProviders";

export const metadata: Metadata = {
  title: {
    default: "MAG Design — Luxury Interior Design",
    template: "%s | MAG Design",
  },
  description:
    "MAG Design is a luxury interior design studio under Al Khaleeg Group. We design premium residential spaces across Cairo, New Cairo, Sheikh Zayed, and the North Coast.",
  keywords: ["interior design", "luxury", "Egypt", "New Cairo", "MAG Design", "تصميم داخلي", "فاخر"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://magdesign.com",
    siteName: "MAG Design",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
