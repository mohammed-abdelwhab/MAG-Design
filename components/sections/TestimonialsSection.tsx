"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedReveal } from "@/components/shared/AnimatedReveal";
import { useUIStore } from "@/store/uiStore";
import { Star, Quote } from "lucide-react";
import Image from "next/image";
import { testimonials } from "@/data/testimonials";

export function TestimonialsSection() {
  const { locale } = useUIStore();

  return (
    <section id="testimonials" className="section-padding bg-[var(--dark-luxury)] overflow-hidden">
      <Container>
        <SectionHeader
          eyebrow={locale === "en" ? "Client Stories" : "قصص عملائنا"}
          title={locale === "en" ? "What Our Clients Say" : "ما يقوله عملاؤنا"}
          light
          className="mb-14"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <AnimatedReveal key={t.id} delay={i * 0.08}>
              <div className="testimonial-card h-full flex flex-col" style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(212,175,55,0.2)" }}>
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star key={s} size={14} fill="var(--gold-primary)" className="text-[var(--gold-primary)]" />
                  ))}
                </div>
                {/* Quote */}
                <p className="font-body text-sm text-white/75 leading-relaxed flex-1 mb-6">
                  &ldquo;{t.quote[locale]}&rdquo;
                </p>
                {/* Client */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/8">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <Image src={t.avatar} alt={t.name[locale]} fill className="object-cover" sizes="40px" />
                  </div>
                  <div>
                    <div className="font-body text-sm font-semibold text-white">{t.name[locale]}</div>
                    <div className="font-body text-[11px] text-[var(--gold-light)]">{t.projectType[locale]}</div>
                  </div>
                </div>
              </div>
            </AnimatedReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
