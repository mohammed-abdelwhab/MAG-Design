"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, X, Maximize2 } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { useUIStore } from "@/store/uiStore";
import { portfolioProjects } from "@/data/portfolio";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";

export function ProjectDetailSection({ slug }: { slug: string }) {
  const { locale, dir } = useUIStore();
  const project = portfolioProjects.find((p) => p.slug === slug);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  if (!project) return notFound();

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === project.gallery.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? project.gallery.length - 1 : prev - 1));
  };

  return (
    <>
      {/* Hero Header */}
      <section className="relative pt-32 pb-20 bg-[var(--dark-deep)] text-white">
        <Container>
          <div className="mb-8">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 font-body text-xs font-semibold tracking-widest uppercase text-white/60 hover:text-[var(--gold-primary)] transition-colors"
            >
              {dir === "rtl" ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}
              {locale === "en" ? "Back to Portfolio" : "العودة إلى المعرض"}
            </Link>
          </div>
          
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-end"
          >
            <div>
              <motion.div variants={staggerItem} className="font-body text-xs text-[var(--gold-light)] tracking-[0.2em] uppercase mb-4">
                {project.location[locale]}
              </motion.div>
              <motion.h1 variants={staggerItem} className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] mb-6">
                {project.title[locale]}
              </motion.h1>
              <motion.div variants={staggerItem} className="flex flex-wrap gap-3">
                <span className="font-body text-xs text-white/70 bg-white/10 px-3 py-1.5 rounded-full capitalize">
                  {project.category}
                </span>
                <span className="font-body text-xs text-white/70 bg-white/10 px-3 py-1.5 rounded-full capitalize">
                  {project.style}
                </span>
              </motion.div>
            </div>
            
            <motion.div variants={staggerItem} className="grid grid-cols-2 gap-x-8 gap-y-6">
              <div>
                <div className="font-body text-xs text-white/50 tracking-widest uppercase mb-1">
                  {locale === "en" ? "Area" : "المساحة"}
                </div>
                <div className="font-display text-xl text-white">{project.area} sqm</div>
              </div>
              <div>
                <div className="font-body text-xs text-white/50 tracking-widest uppercase mb-1">
                  {locale === "en" ? "Duration" : "المدة"}
                </div>
                <div className="font-display text-xl text-white">{project.duration}</div>
              </div>
              <div>
                <div className="font-body text-xs text-white/50 tracking-widest uppercase mb-1">
                  {locale === "en" ? "Year" : "العام"}
                </div>
                <div className="font-display text-xl text-white">{project.year}</div>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Main Hero Image */}
      <section className="bg-[var(--dark-deep)]">
        <div className="w-full h-[50vh] md:h-[70vh] relative">
          <Image
            src={project.heroImage}
            alt={project.title[locale]}
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Project Details */}
      <section className="section-padding bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Main Content */}
            <div className="lg:col-span-8">
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <h3 className="font-display text-2xl font-semibold mb-4 text-[var(--text-primary)]">
                  {locale === "en" ? "The Vision" : "الرؤية"}
                </h3>
                <p className="font-body text-[var(--text-muted)] leading-relaxed mb-10 text-lg">
                  {project.description[locale]}
                </p>

                <h3 className="font-display text-2xl font-semibold mb-4 text-[var(--text-primary)]">
                  {locale === "en" ? "The Challenge" : "التحدي"}
                </h3>
                <p className="font-body text-[var(--text-muted)] leading-relaxed mb-10">
                  {project.challenge[locale]}
                </p>

                <h3 className="font-display text-2xl font-semibold mb-4 text-[var(--text-primary)]">
                  {locale === "en" ? "The Solution" : "الحل"}
                </h3>
                <p className="font-body text-[var(--text-muted)] leading-relaxed">
                  {project.solution[locale]}
                </p>
              </motion.div>
            </div>

            {/* Sidebar Materials */}
            <div className="lg:col-span-4">
              <motion.div 
                variants={fadeUp} 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }}
                className="bg-[var(--bg-primary)] p-8 rounded-[var(--radius-xl)] border border-[var(--border-light)] sticky top-32"
              >
                <h4 className="font-body text-xs font-semibold tracking-widest uppercase text-[var(--gold-primary)] mb-6">
                  {locale === "en" ? "Key Materials" : "المواد الرئيسية"}
                </h4>
                <ul className="flex flex-col gap-4">
                  {project.materials.map((mat, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--gold-accent)] mt-2 flex-shrink-0" />
                      <span className="font-body text-sm text-[var(--text-primary)]">{mat[locale]}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </Container>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-[var(--bg-primary)]">
        <Container>
          <div className="mb-12 flex justify-between items-end">
            <h2 className="font-display text-3xl font-semibold text-[var(--text-primary)]">
              {locale === "en" ? "Project Gallery" : "معرض المشروع"}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {project.gallery.map((img, i) => (
              <motion.div
                key={img.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className={`relative group cursor-pointer overflow-hidden rounded-[var(--radius-lg)] ${
                  i % 3 === 0 ? "md:col-span-2 aspect-[21/9]" : "aspect-[4/3]"
                }`}
                onClick={() => openLightbox(i)}
              >
                <Image
                  src={img.src}
                  alt={img.alt[locale]}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-75 group-hover:scale-100">
                    <Maximize2 size={20} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox-overlay"
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-50"
            >
              <X size={24} />
            </button>

            {/* Navigation */}
            <button
              onClick={prevImage}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-50"
            >
              <ArrowLeft size={24} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-50"
            >
              <ArrowRight size={24} />
            </button>

            {/* Image */}
            <div className="relative w-full max-w-6xl aspect-[16/9] mx-12">
              <Image
                src={project.gallery[currentImageIndex].src}
                alt={project.gallery[currentImageIndex].alt[locale]}
                fill
                className="object-contain"
              />
              <div className="absolute -bottom-10 left-0 right-0 text-center text-white/70 font-body text-sm">
                {currentImageIndex + 1} / {project.gallery.length} — {project.gallery[currentImageIndex].alt[locale]}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
