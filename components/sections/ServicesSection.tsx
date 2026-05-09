"use client";

import { Container } from "@/components/shared/Container";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedReveal } from "@/components/shared/AnimatedReveal";
import { LuxuryButton } from "@/components/shared/LuxuryButton";
import { useUIStore } from "@/store/uiStore";
import { services } from "@/data/services";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function ServicesSection() {
  const { locale } = useUIStore();

  return (
    <section id="services" className="section-padding bg-white">
      <Container>
        <SectionHeader
          eyebrow={locale === "en" ? "What We Do" : "ما نقدمه"}
          title={locale === "en" ? "Our Services" : "خدماتنا"}
          subtitle={locale === "en"
            ? "From concept to completion — every phase of your project, handled with precision."
            : "من المفهوم إلى الاكتمال — كل مرحلة من مشروعك، تتم بدقة."}
          className="mb-14"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, i) => (
            <AnimatedReveal key={service.id} delay={i * 0.1}>
              <Link href={`/services#${service.slug}`} id={`service-card-${service.id}`} className="group block">
                <div className="relative rounded-[var(--radius-xl)] overflow-hidden aspect-[16/9] img-hover-scale">
                  <Image
                    src={service.heroImage}
                    alt={service.title[locale]}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--dark-deep)]/90 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                    <div>
                      <h3 className="font-display text-xl font-semibold text-white mb-1">{service.title[locale]}</h3>
                      <p className="font-body text-sm text-white/65 max-w-xs">{service.subtitle[locale]}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-white/25 flex items-center justify-center text-white group-hover:bg-[var(--gold-primary)] group-hover:border-[var(--gold-primary)] transition-all duration-300 flex-shrink-0">
                      <ArrowRight size={15} />
                    </div>
                  </div>
                </div>
              </Link>
            </AnimatedReveal>
          ))}
        </div>
        <AnimatedReveal className="flex justify-center mt-10">
          <LuxuryButton href="/services" variant="outline-gold" id="services-view-all">
            {locale === "en" ? "Explore All Services" : "استكشف جميع الخدمات"}
          </LuxuryButton>
        </AnimatedReveal>
      </Container>
    </section>
  );
}
