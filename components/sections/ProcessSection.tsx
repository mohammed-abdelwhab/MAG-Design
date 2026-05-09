"use client";

import { Container } from "@/components/shared/Container";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedReveal } from "@/components/shared/AnimatedReveal";
import { useUIStore } from "@/store/uiStore";

const steps = [
  {
    number: "01",
    title: { en: "Discovery", ar: "الاكتشاف" },
    description: { en: "We begin by listening. A deep consultation to understand your vision, lifestyle, and aspirations.", ar: "نبدأ بالاستماع. استشارة عميقة لفهم رؤيتك وأسلوب حياتك وطموحاتك." },
  },
  {
    number: "02",
    title: { en: "Design Concept", ar: "مفهوم التصميم" },
    description: { en: "We develop a singular design vision — mood boards, material palettes, and spatial layouts presented in photorealistic 3D.", ar: "نطور رؤية تصميمية فريدة — لوحات مزاجية وتشكيلات مواد وتخطيطات مكانية مقدمة بتصور ثلاثي الأبعاد." },
  },
  {
    number: "03",
    title: { en: "Approval & Refinement", ar: "الموافقة والتحسين" },
    description: { en: "Your feedback shapes the design. We iterate until every detail is exactly right.", ar: "ملاحظاتك تشكل التصميم. نكرر حتى تكون كل تفصيلة صحيحة تماماً." },
  },
  {
    number: "04",
    title: { en: "Execution", ar: "التنفيذ" },
    description: { en: "Our trusted network of specialist craftsmen bring the design to life — supervised daily by our technical team.", ar: "شبكتنا من الحرفيين المتخصصين تُحيي التصميم — تحت إشراف يومي من فريقنا التقني." },
  },
  {
    number: "05",
    title: { en: "Handover", ar: "التسليم" },
    description: { en: "A meticulous snagging process followed by a memorable handover. Your home, perfected.", ar: "عملية دقيقة لمعالجة العيوب تتبعها عملية تسليم لا تُنسى. منزلك، مكتملاً." },
  },
];

export function ProcessSection() {
  const { locale } = useUIStore();

  return (
    <section id="process" className="section-padding bg-[var(--bg-primary)]">
      <Container>
        <SectionHeader
          eyebrow={locale === "en" ? "How We Work" : "كيف نعمل"}
          title={locale === "en" ? "Our Process" : "عمليتنا"}
          subtitle={locale === "en"
            ? "A structured, transparent journey from first meeting to final handover."
            : "رحلة منظمة وشفافة من الاجتماع الأول إلى التسليم النهائي."}
          className="mb-16"
        />
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-px bg-[var(--border-gold)] -translate-x-1/2 hidden sm:block" />

          <div className="flex flex-col gap-10">
            {steps.map((step, i) => (
              <AnimatedReveal key={step.number} delay={i * 0.1}>
                <div className={`flex gap-6 md:gap-12 items-start ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  {/* Step number bubble */}
                  <div className="flex-shrink-0 relative z-10">
                    <div className="w-10 h-10 rounded-full bg-[var(--gold-primary)] flex items-center justify-center shadow-[var(--shadow-gold)]">
                      <span className="font-body text-xs font-bold text-white">{step.number}</span>
                    </div>
                  </div>
                  {/* Content */}
                  <div className={`flex-1 luxury-card p-6 md:max-w-md ${i % 2 !== 0 ? "md:ml-auto" : ""}`}>
                    <h3 className="font-display text-xl font-semibold text-[var(--text-primary)] mb-2">{step.title[locale]}</h3>
                    <p className="font-body text-sm text-[var(--text-muted)] leading-relaxed">{step.description[locale]}</p>
                  </div>
                </div>
              </AnimatedReveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
