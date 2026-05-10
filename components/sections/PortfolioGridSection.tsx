"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { useUIStore } from "@/store/uiStore";
import { useAdminStore } from "@/store/adminStore";
import { portfolioProjects } from "@/data/portfolio";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";

type Category = "all" | "villa" | "apartment" | "penthouse" | "commercial" | "chalet";

export function PortfolioGridSection() {
  const { locale } = useUIStore();
  const { portfolioItems, deletedStaticProjects, staticProjectOverrides } = useAdminStore();
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const categories: { id: Category; label: { en: string; ar: string } }[] = [
    { id: "all", label: { en: "All Projects", ar: "جميع المشاريع" } },
    { id: "villa", label: { en: "Villas", ar: "فيلات" } },
    { id: "penthouse", label: { en: "Penthouses", ar: "بنتهاوس" } },
    { id: "apartment", label: { en: "Apartments", ar: "شقق" } },
    { id: "chalet", label: { en: "Chalets", ar: "شاليهات" } },
  ];

  const allProjects = [
    ...portfolioItems,
    ...portfolioProjects
      .filter(p => !deletedStaticProjects?.includes(p.id))
      .map(p => ({
        ...p,
        ...(staticProjectOverrides?.[p.id] || {})
      }))
  ];

  const filteredProjects = allProjects.filter(
    (p) => activeCategory === "all" || p.category === activeCategory
  );

  return (
    <section className="section-padding bg-[var(--bg-primary)] min-h-screen pt-32">
      <Container>
        <SectionHeader
          eyebrow={locale === "en" ? "Our Legacy" : "إرثنا"}
          title={locale === "en" ? "Portfolio" : "المعرض"}
          subtitle={
            locale === "en"
              ? "Explore our collection of meticulously crafted luxury interiors across Egypt."
              : "استكشف مجموعتنا من التصميمات الداخلية الفاخرة المصممة بدقة في جميع أنحاء مصر."
          }
          className="mb-12"
        />

        {/* Filter Tabs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2 rounded-full font-body text-xs font-semibold tracking-widest uppercase transition-all duration-300 border ${
                activeCategory === cat.id
                  ? "bg-[var(--gold-primary)] border-[var(--gold-primary)] text-white"
                  : "bg-transparent border-[var(--border-gold)] text-[var(--text-muted)] hover:text-[var(--gold-primary)] hover:border-[var(--gold-primary)]"
              }`}
            >
              {cat.label[locale]}
            </button>
          ))}
        </motion.div>

        {/* Masonry Grid */}
        <motion.div
          layout
          className="portfolio-masonry"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="portfolio-masonry-item"
              >
                <Link href={`/portfolio/${project.slug}`} className="group relative block rounded-[var(--radius-xl)] overflow-hidden cursor-pointer bg-[var(--dark-deep)]">
                  {/* Image wrapper - let image height naturally dictate aspect ratio for masonry */}
                  <div className="relative w-full h-auto overflow-hidden">
                    <Image
                      src={project.heroImage}
                      alt={project.title[locale]}
                      width={800}
                      height={project.category === "penthouse" || project.category === "chalet" ? 1000 : 600}
                      className="object-cover w-full h-auto transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-90" />
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[var(--gold-primary)]/0 group-hover:bg-[var(--gold-primary)]/20 transition-colors duration-500" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between gap-4">
                    <div className="flex-1">
                      <div className="font-body text-[10px] text-[var(--gold-light)] tracking-[0.2em] uppercase mb-2">
                        {project.location[locale]}
                      </div>
                      <h3 className="font-display text-xl md:text-2xl font-semibold text-white leading-tight mb-3">
                        {project.title[locale]}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="font-body text-[10px] text-white/70 bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-full capitalize">
                          {project.category}
                        </span>
                        <span className="font-body text-[10px] text-white/70 bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-full capitalize">
                          {project.style}
                        </span>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0 group-hover:bg-[var(--gold-primary)] group-hover:border-[var(--gold-primary)]">
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20 font-body text-[var(--text-muted)]">
            {locale === "en" ? "No projects found in this category." : "لا توجد مشاريع في هذه الفئة."}
          </div>
        )}
      </Container>
    </section>
  );
}
