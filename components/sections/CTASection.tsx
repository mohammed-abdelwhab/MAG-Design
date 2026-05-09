"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useUIStore } from "@/store/uiStore";
import { LuxuryButton } from "@/components/shared/LuxuryButton";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";

export function CTASection() {
  const { locale } = useUIStore();

  return (
    <section id="contact" className="relative overflow-hidden py-28 md:py-36">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=1920&q=80"
          alt="Luxury interior"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[var(--dark-deep)]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--dark-deep)]/90 to-[var(--dark-luxury)]/70" />
      </div>

      <div className="relative z-10 section-container text-center text-white">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col items-center gap-6 max-w-2xl mx-auto"
        >
          <motion.span variants={staggerItem} className="font-body text-xs tracking-[0.3em] uppercase text-[var(--gold-light)]">
            {locale === "en" ? "Begin Your Journey" : "ابدأ رحلتك"}
          </motion.span>
          <motion.h2 variants={staggerItem} className="font-display text-3xl md:text-5xl font-semibold leading-tight">
            {locale === "en"
              ? "Ready to design your dream space?"
              : "هل أنت مستعد لتصميم مساحة أحلامك؟"}
          </motion.h2>
          <motion.p variants={staggerItem} className="font-body text-base text-white/70 leading-relaxed">
            {locale === "en"
              ? "Book a complimentary consultation and let's explore what's possible."
              : "احجز استشارة مجانية ولنستكشف معاً ما هو ممكن."}
          </motion.p>
          <motion.div variants={staggerItem} className="flex flex-col sm:flex-row gap-4 mt-2">
            <LuxuryButton href="/book" variant="gold" size="lg" id="cta-book">
              <Calendar size={16} />
              {locale === "en" ? "Book Free Consultation" : "احجز استشارة مجانية"}
            </LuxuryButton>
            <LuxuryButton href="/portfolio" variant="outline-white" size="lg" id="cta-portfolio">
              {locale === "en" ? "View Our Work" : "شاهد أعمالنا"}
            </LuxuryButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
