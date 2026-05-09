"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedReveal } from "@/components/shared/AnimatedReveal";
import { LuxuryButton } from "@/components/shared/LuxuryButton";
import { useUIStore } from "@/store/uiStore";
import { portfolioProjects } from "@/data/portfolio";
import { staggerContainer, staggerItem } from "@/lib/animations";

const FEATURED = portfolioProjects.filter((p) => p.featured).slice(0, 6);

export function PortfolioPreviewSection() {
  const { locale } = useUIStore();

  return (
    <section id="portfolio" className="section-padding bg-[var(--bg-primary)]">
      <Container>
        <SectionHeader
          eyebrow={locale === "en" ? "Selected Works" : "أعمال مختارة"}
          title={locale === "en" ? "Portfolio" : "المعرض"}
          subtitle={
            locale === "en"
              ? "A curated selection of our recent luxury residential projects."
              : "مجموعة مختارة من مشاريعنا السكنية الفاخرة الأخيرة."
          }
          className="mb-14"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {FEATURED.map((project, i) => (
            <motion.div key={project.id} variants={staggerItem}>
              <motion.div
                whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } }}
                className="group relative rounded-[var(--radius-xl)] overflow-hidden cursor-pointer bg-[var(--dark-deep)]"
              >
                <Link href={`/portfolio/${project.slug}`} id={`portfolio-card-${project.id}`}>
                  {/* Image */}
                  <div className={`relative overflow-hidden ${i === 0 ? "aspect-[4/5]" : "aspect-[4/3]"}`}>
                    <Image
                      src={project.heroImage}
                      alt={project.title[locale]}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[var(--gold-primary)]/0 group-hover:bg-[var(--gold-primary)]/10 transition-colors duration-500" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <div className="font-body text-[10px] text-[var(--gold-light)] tracking-[0.2em] uppercase mb-1.5">
                          {project.location[locale]}
                        </div>
                        <h3 className="font-display text-lg font-semibold text-white leading-tight">
                          {project.title[locale]}
                        </h3>
                        <div className="flex gap-2 mt-2">
                          <span className="font-body text-[10px] text-white/60 bg-white/10 px-2 py-0.5 rounded-full capitalize">
                            {project.category}
                          </span>
                          <span className="font-body text-[10px] text-white/60 bg-white/10 px-2 py-0.5 rounded-full capitalize">
                            {project.style}
                          </span>
                        </div>
                      </div>
                      <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0 group-hover:bg-[var(--gold-primary)] group-hover:border-[var(--gold-primary)]">
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <AnimatedReveal className="flex justify-center mt-12">
          <LuxuryButton href="/portfolio" variant="outline-gold" id="portfolio-view-all">
            {locale === "en" ? "View All Projects" : "عرض جميع المشاريع"}
          </LuxuryButton>
        </AnimatedReveal>
      </Container>
    </section>
  );
}
