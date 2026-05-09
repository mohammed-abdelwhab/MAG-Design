"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { LuxuryButton } from "@/components/shared/LuxuryButton";
import { useUIStore } from "@/store/uiStore";
import { services } from "@/data/services";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";

export function ServicesDetailSection() {
  const { locale, dir } = useUIStore();

  return (
    <>
      <section className="pt-32 pb-16 bg-[var(--bg-primary)]">
        <Container>
          <SectionHeader
            eyebrow={locale === "en" ? "Our Expertise" : "خبراتنا"}
            title={locale === "en" ? "Services" : "الخدمات"}
            subtitle={
              locale === "en"
                ? "Comprehensive interior design and finishing services tailored to the highest standards of luxury."
                : "خدمات تصميم داخلي وتشطيب شاملة مصممة وفق أعلى معايير الرفاهية."
            }
          />
        </Container>
      </section>

      {services.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className={`py-20 ${index % 2 === 0 ? "bg-white" : "bg-[var(--bg-primary)]"}`}
        >
          <Container>
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
              index % 2 === 1 && dir === "ltr" ? "" : ""
            }`}>
              {/* Image Column */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className={`relative h-[60vh] min-h-[500px] rounded-[var(--radius-2xl)] overflow-hidden ${
                  index % 2 === 1 ? "lg:order-2" : "lg:order-1"
                }`}
              >
                <Image
                  src={service.heroImage}
                  alt={service.title[locale]}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/10" />
              </motion.div>

              {/* Text Column */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className={index % 2 === 1 ? "lg:order-1" : "lg:order-2"}
              >
                <motion.div variants={staggerItem} className="font-body text-xs text-[var(--gold-primary)] tracking-[0.2em] uppercase mb-4">
                  0{index + 1} {"//"} {service.title[locale]}
                </motion.div>
                
                <motion.h2 variants={staggerItem} className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-[var(--text-primary)] leading-tight mb-6">
                  {service.subtitle[locale]}
                </motion.h2>
                
                <motion.p variants={staggerItem} className="font-body text-[var(--text-muted)] text-lg leading-relaxed mb-10">
                  {service.description[locale]}
                </motion.p>

                <motion.div variants={staggerItem} className="mb-10">
                  <h4 className="font-display text-xl font-semibold text-[var(--text-primary)] mb-5">
                    {locale === "en" ? "Our Process" : "عمليتنا"}
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                    {service.process.map((step, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-[var(--gold-primary)]/10 flex items-center justify-center flex-shrink-0 mt-0.5 text-[var(--gold-primary)]">
                          <Check size={12} strokeWidth={3} />
                        </div>
                        <span className="font-body text-sm text-[var(--text-muted)]">{step[locale]}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div variants={staggerItem}>
                  <LuxuryButton href="/book" variant="gold">
                    {service.ctaText[locale]}
                  </LuxuryButton>
                </motion.div>
              </motion.div>
            </div>
          </Container>
        </section>
      ))}
    </>
  );
}
