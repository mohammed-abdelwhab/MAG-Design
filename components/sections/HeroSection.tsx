"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Calendar } from "lucide-react";
import Image from "next/image";
import { LuxuryButton } from "@/components/shared/LuxuryButton";
import { useUIStore } from "@/store/uiStore";
import { heroReveal, fadeIn, staggerContainer, staggerItem } from "@/lib/animations";

const HERO_IMAGE = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=85";

export function HeroSection() {
  const { locale } = useUIStore();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} id="hero" className="relative h-screen min-h-[680px] overflow-hidden">
      {/* Parallax image */}
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        <Image
          src={HERO_IMAGE}
          alt="MAG Design — Luxury Interior"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="hero-overlay absolute inset-0" />
      </motion.div>

      {/* Subtle grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6"
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6 max-w-4xl"
        >
          {/* Eyebrow */}
          <motion.span
            variants={staggerItem}
            className="font-body text-xs font-semibold tracking-[0.3em] uppercase text-[var(--gold-light)] border border-[rgba(212,175,55,0.4)] px-4 py-1.5 rounded-full backdrop-blur-sm"
          >
            {locale === "en" ? "Under Al Khaleeg Group" : "تحت مظلة مجموعة الخليج"}
          </motion.span>

          {/* Main headline */}
          <motion.h1
            variants={heroReveal}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] tracking-tight"
          >
            {locale === "en" ? (
              <>We design spaces that<br /><span className="text-gold-gradient">move you.</span></>
            ) : (
              <>نصمم مساحات<br /><span className="text-gold-gradient">تلامس روحك.</span></>
            )}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={staggerItem}
            className="font-body text-base md:text-lg text-white/75 max-w-xl leading-relaxed"
          >
            {locale === "en"
              ? "Luxury interior design for discerning clients across Cairo, New Cairo, Sheikh Zayed, and the North Coast."
              : "تصميم داخلي فاخر لعملاء من الذوق الرفيع في القاهرة، القاهرة الجديدة، الشيخ زايد، والساحل الشمالي."}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={staggerItem} className="flex flex-col sm:flex-row gap-4 mt-2">
            <LuxuryButton href="/book" variant="gold" size="lg" id="hero-book-cta">
              <Calendar size={16} />
              {locale === "en" ? "Book Consultation" : "احجز استشارة"}
            </LuxuryButton>
            <LuxuryButton href="/login" variant="outline-white" size="lg" id="hero-track-cta">
              {locale === "en" ? "Track Your Project" : "تتبع مشروعك"}
            </LuxuryButton>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="absolute bottom-8 flex flex-col items-center gap-2 text-white/50"
        >
          <span className="font-body text-[10px] tracking-[0.3em] uppercase">
            {locale === "en" ? "Scroll" : "مرر"}
          </span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
            <ArrowDown size={16} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
