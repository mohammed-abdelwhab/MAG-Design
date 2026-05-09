"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { AnimatedReveal } from "@/components/shared/AnimatedReveal";
import { LuxuryButton } from "@/components/shared/LuxuryButton";
import { useUIStore } from "@/store/uiStore";
import { companyStats } from "@/data/team";
import { fadeLeft, fadeRight, staggerContainer, staggerItem } from "@/lib/animations";

export function IntroSection() {
  const { locale } = useUIStore();

  return (
    <section id="about" className="section-padding bg-white overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image side */}
          <AnimatedReveal variants={fadeLeft} className="relative">
            <div className="relative aspect-[4/5] rounded-[var(--radius-xl)] overflow-hidden img-hover-scale">
              <Image
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=900&q=85"
                alt="MAG Design luxury interior"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-6 -right-6 glass-dark rounded-[var(--radius-lg)] p-5 min-w-[160px] shadow-xl">
              <div className="font-display text-3xl font-bold text-[var(--gold-primary)]">12+</div>
              <div className="font-body text-xs text-white/60 mt-1 uppercase tracking-wider">
                {locale === "en" ? "Years of Excellence" : "سنوات من التميز"}
              </div>
            </div>
            {/* Gold border accent */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-[var(--gold-accent)] rounded-tl-[var(--radius-lg)]" />
          </AnimatedReveal>

          {/* Text side */}
          <AnimatedReveal variants={fadeRight}>
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.span variants={staggerItem} className="font-body text-xs font-semibold tracking-[0.25em] uppercase text-[var(--gold-primary)]">
                {locale === "en" ? "Our Philosophy" : "فلسفتنا"}
              </motion.span>

              <motion.h2 variants={staggerItem} className="font-display text-3xl md:text-4xl font-semibold text-[var(--text-primary)] mt-4 mb-6 leading-snug">
                {locale === "en"
                  ? "Every space should feel like it was designed for you."
                  : "كل مساحة يجب أن تشعر أنها صُممت خصيصاً لك."}
              </motion.h2>

              <div className="gold-divider mb-6" />

              <motion.p variants={staggerItem} className="font-body text-[var(--text-muted)] leading-relaxed mb-4">
                {locale === "en"
                  ? "MAG Design is a luxury interior design studio under Al Khaleeg Group. We work with a carefully selected roster of discerning clients who understand that great design is not about trends — it's about creating environments that are deeply personal, architecturally rigorous, and built to last."
                  : "MAG Design هو استوديو تصميم داخلي فاخر تحت مظلة مجموعة الخليج. نعمل مع قائمة مختارة بعناية من العملاء الذين يدركون أن التصميم الرائع لا يتعلق بالاتجاهات — بل يتعلق بخلق بيئات عميقة الشخصية ومحكمة معمارياً ومصممة لتدوم."}
              </motion.p>
              <motion.p variants={staggerItem} className="font-body text-[var(--text-muted)] leading-relaxed mb-8">
                {locale === "en"
                  ? "From the first consultation to the final handover, we are partners in realising your vision — with precision, care, and an uncompromising commitment to quality."
                  : "من الاستشارة الأولى إلى التسليم النهائي، نحن شركاؤك في تحقيق رؤيتك — بدقة واهتمام والتزام لا هوادة فيه بالجودة."}
              </motion.p>

              <motion.div variants={staggerItem}>
                <LuxuryButton href="/about" variant="outline-gold" id="intro-learn-more">
                  {locale === "en" ? "Our Story" : "قصتنا"}
                </LuxuryButton>
              </motion.div>
            </motion.div>
          </AnimatedReveal>
        </div>

        {/* Stats row */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-[var(--border-light)]">
          {companyStats.map((stat, i) => (
            <AnimatedReveal key={stat.label.en} delay={i * 0.1} className="text-center">
              <div className="font-display text-4xl font-bold text-[var(--gold-primary)]">
                {stat.value}{stat.suffix}
              </div>
              <div className="font-body text-sm text-[var(--text-muted)] mt-2">{stat.label[locale]}</div>
            </AnimatedReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
