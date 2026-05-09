"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { useUIStore } from "@/store/uiStore";
import { teamMembers } from "@/data/team";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";

export function AboutSection() {
  const { locale } = useUIStore();

  const partners = [
    { id: 1, name: "Emaar", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Emaar_Properties_Logo.svg/512px-Emaar_Properties_Logo.svg.png" },
    { id: 2, name: "Sodic", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/SODIC_Logo.svg/512px-SODIC_Logo.svg.png" },
    { id: 3, name: "Palm Hills", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Palm_Hills_Developments_Logo.svg/512px-Palm_Hills_Developments_Logo.svg.png" },
    { id: 4, name: "Orascom", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/ef/Orascom_Construction_logo.svg/512px-Orascom_Construction_logo.svg.png" },
    { id: 5, name: "Talaat Moustafa Group", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/07/TMG_Holding_logo.svg/512px-TMG_Holding_logo.svg.png" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-[var(--dark-deep)] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>
        <Container className="relative z-10">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="max-w-4xl mx-auto text-center">
            <motion.div variants={staggerItem} className="font-body text-xs text-[var(--gold-primary)] tracking-[0.2em] uppercase mb-6">
              {locale === "en" ? "Our Story" : "قصتنا"}
            </motion.div>
            <motion.h1 variants={staggerItem} className="font-display text-4xl md:text-5xl lg:text-7xl font-semibold leading-[1.1] mb-8">
              {locale === "en" ? "Designing spaces that tell your story." : "نصمم مساحات تروي قصتك."}
            </motion.h1>
            <motion.p variants={staggerItem} className="font-body text-lg text-white/70 leading-relaxed max-w-2xl mx-auto">
              {locale === "en"
                ? "Founded on the belief that environment shapes human experience, MAG Design is a premium interior architecture studio dedicated to crafting exceptional residential and commercial spaces across Egypt."
                : "تأسست MAG Design على إيمان بأن البيئة تشكل التجربة الإنسانية، وهي استوديو هندسة معمارية داخلية فاخر مكرس لصياغة مساحات سكنية وتجارية استثنائية في جميع أنحاء مصر."}
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* Philosophy */}
      <section className="py-24 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <div className="relative aspect-[4/5] rounded-[var(--radius-2xl)] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1000&q=80"
                  alt="Philosophy"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
            
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.h2 variants={staggerItem} className="font-display text-3xl md:text-4xl font-semibold text-[var(--text-primary)] mb-6">
                {locale === "en" ? "The Al Khaleeg Group Legacy" : "إرث مجموعة الخليج"}
              </motion.h2>
              <motion.p variants={staggerItem} className="font-body text-[var(--text-muted)] text-lg leading-relaxed mb-6">
                {locale === "en"
                  ? "As a proud subsidiary of Al Khaleeg Group, we inherit a legacy of excellence, uncompromising quality, and visionary ambition. Our connection to the group provides us with unparalleled access to premium materials, robust logistics, and financial stability."
                  : "كشركة تابعة فخورة لمجموعة الخليج، نرث إرثاً من التميز والجودة التي لا تقبل المساومة والطموح الرؤيوي. يوفر لنا ارتباطنا بالمجموعة وصولاً لا مثيل له إلى المواد الفاخرة والخدمات اللوجستية القوية والاستقرار المالي."}
              </motion.p>
              <motion.p variants={staggerItem} className="font-body text-[var(--text-muted)] text-lg leading-relaxed mb-10">
                {locale === "en"
                  ? "We don't just decorate rooms; we architect atmospheres. Every decision, from spatial flow to the texture of a custom bronze handle, is meticulously considered to create harmony."
                  : "نحن لا نزين الغرف فحسب؛ بل نصمم الأجواء. كل قرار، من التدفق المكاني إلى نسيج مقبض برونزي مخصص، يُدرس بدقة لخلق الانسجام."}
              </motion.p>
              
              <motion.div variants={staggerItem} className="grid grid-cols-2 gap-8">
                <div>
                  <div className="font-display text-4xl text-[var(--gold-primary)] mb-2">12+</div>
                  <div className="font-body text-sm font-semibold text-[var(--text-primary)]">
                    {locale === "en" ? "Years Experience" : "سنوات الخبرة"}
                  </div>
                </div>
                <div>
                  <div className="font-display text-4xl text-[var(--gold-primary)] mb-2">180+</div>
                  <div className="font-body text-sm font-semibold text-[var(--text-primary)]">
                    {locale === "en" ? "Projects Delivered" : "مشروع منجز"}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Team */}
      <section className="py-24 bg-[var(--bg-primary)]">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-[var(--text-primary)] mb-4">
              {locale === "en" ? "Meet The Visionaries" : "تعرف على أصحاب الرؤية"}
            </h2>
            <p className="font-body text-[var(--text-muted)]">
              {locale === "en"
                ? "The creative minds and technical experts behind MAG Design."
                : "العقول المبدعة والخبراء التقنيون وراء MAG Design."}
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {teamMembers.map((member) => (
              <motion.div key={member.id} variants={staggerItem} className="group cursor-pointer">
                <div className="relative aspect-[3/4] rounded-[var(--radius-xl)] overflow-hidden mb-6 bg-white shadow-sm border border-[var(--border-light)]">
                  <Image
                    src={member.avatar}
                    alt={member.name[locale]}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="text-center">
                  <h3 className="font-display text-xl font-semibold text-[var(--text-primary)] mb-1">
                    {member.name[locale]}
                  </h3>
                  <div className="font-body text-sm text-[var(--gold-primary)] tracking-widest uppercase mb-3">
                    {member.role[locale]}
                  </div>
                  <p className="font-body text-sm text-[var(--text-muted)] max-w-xs mx-auto">
                    {member.bio[locale]}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Partners/Clients */}
      <section className="py-24 bg-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl font-semibold text-[var(--text-primary)] mb-4">
              {locale === "en" ? "Trusted By" : "موثوق بنا من قبل"}
            </h2>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-60">
            {partners.map((partner) => (
              <div key={partner.id} className="relative h-12 w-32 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
