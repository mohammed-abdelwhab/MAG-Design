"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { useUIStore } from "@/store/uiStore";
import { siteConfig } from "@/config/site";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";

export function ContactSection() {
  const { locale, dir } = useUIStore();

  return (
    <section className="pt-32 pb-24 bg-[var(--bg-primary)] min-h-screen">
      <Container>
        <SectionHeader
          eyebrow={locale === "en" ? "Get In Touch" : "تواصل معنا"}
          title={locale === "en" ? "Contact Us" : "اتصل بنا"}
          subtitle={
            locale === "en"
              ? "We would love to hear about your upcoming project. Visit our studio or reach out to our team."
              : "نود أن نسمع عن مشروعك القادم. قم بزيارة استوديو التصميم الخاص بنا أو تواصل مع فريقنا."
          }
          className="mb-16"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Details */}
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-10">
            <motion.div variants={staggerItem} className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full bg-[var(--gold-primary)]/10 flex items-center justify-center text-[var(--gold-primary)] flex-shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-display text-xl font-semibold text-[var(--text-primary)] mb-2">
                  {locale === "en" ? "Our Studio" : "الاستوديو"}
                </h4>
                <p className="font-body text-[var(--text-muted)] leading-relaxed">
                  {locale === "en" 
                    ? "Al Khaleeg Group Tower, 15th Floor" 
                    : "برج مجموعة الخليج، الطابق 15"}
                  <br />
                  {locale === "en" ? "New Cairo, Egypt" : "القاهرة الجديدة، مصر"}
                </p>
              </div>
            </motion.div>

            <motion.div variants={staggerItem} className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full bg-[var(--gold-primary)]/10 flex items-center justify-center text-[var(--gold-primary)] flex-shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="font-display text-xl font-semibold text-[var(--text-primary)] mb-2">
                  {locale === "en" ? "Phone" : "الهاتف"}
                </h4>
                <p className="font-body text-[var(--text-muted)] leading-relaxed">
                  <a href={`tel:${siteConfig.phone}`} className="hover:text-[var(--gold-primary)] transition-colors">
                    {siteConfig.phone}
                  </a>
                  <br />
                  <a href={`https://wa.me/${siteConfig.whatsapp}`} className="hover:text-[var(--gold-primary)] transition-colors">
                    WhatsApp: {siteConfig.whatsapp}
                  </a>
                </p>
              </div>
            </motion.div>

            <motion.div variants={staggerItem} className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full bg-[var(--gold-primary)]/10 flex items-center justify-center text-[var(--gold-primary)] flex-shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="font-display text-xl font-semibold text-[var(--text-primary)] mb-2">
                  {locale === "en" ? "Email" : "البريد الإلكتروني"}
                </h4>
                <p className="font-body text-[var(--text-muted)] leading-relaxed">
                  <a href={`mailto:${siteConfig.email}`} className="hover:text-[var(--gold-primary)] transition-colors">
                    {siteConfig.email}
                  </a>
                </p>
              </div>
            </motion.div>

            <motion.div variants={staggerItem} className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full bg-[var(--gold-primary)]/10 flex items-center justify-center text-[var(--gold-primary)] flex-shrink-0">
                <Clock size={24} />
              </div>
              <div>
                <h4 className="font-display text-xl font-semibold text-[var(--text-primary)] mb-2">
                  {locale === "en" ? "Working Hours" : "ساعات العمل"}
                </h4>
                <p className="font-body text-[var(--text-muted)] leading-relaxed">
                  {locale === "en" ? "Sunday - Thursday" : "الأحد - الخميس"}
                  <br />
                  {locale === "en" ? "09:00 AM - 05:00 PM" : "09:00 صباحاً - 05:00 مساءً"}
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="bg-white p-8 md:p-10 rounded-[var(--radius-2xl)] border border-[var(--border-light)] shadow-sm">
            <h3 className="font-display text-2xl font-semibold text-[var(--text-primary)] mb-6">
              {locale === "en" ? "Send us a message" : "أرسل لنا رسالة"}
            </h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-body text-sm font-medium text-[var(--text-primary)]">
                    {locale === "en" ? "First Name" : "الاسم الأول"}
                  </label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-[var(--border-light)] focus:border-[var(--gold-primary)] focus:ring-1 focus:ring-[var(--gold-primary)] outline-none transition-colors bg-[var(--bg-primary)]" />
                </div>
                <div className="space-y-2">
                  <label className="font-body text-sm font-medium text-[var(--text-primary)]">
                    {locale === "en" ? "Last Name" : "اسم العائلة"}
                  </label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-[var(--border-light)] focus:border-[var(--gold-primary)] focus:ring-1 focus:ring-[var(--gold-primary)] outline-none transition-colors bg-[var(--bg-primary)]" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="font-body text-sm font-medium text-[var(--text-primary)]">
                  {locale === "en" ? "Email Address" : "البريد الإلكتروني"}
                </label>
                <input type="email" className="w-full px-4 py-3 rounded-lg border border-[var(--border-light)] focus:border-[var(--gold-primary)] focus:ring-1 focus:ring-[var(--gold-primary)] outline-none transition-colors bg-[var(--bg-primary)]" />
              </div>
              <div className="space-y-2">
                <label className="font-body text-sm font-medium text-[var(--text-primary)]">
                  {locale === "en" ? "Message" : "الرسالة"}
                </label>
                <textarea rows={5} className="w-full px-4 py-3 rounded-lg border border-[var(--border-light)] focus:border-[var(--gold-primary)] focus:ring-1 focus:ring-[var(--gold-primary)] outline-none transition-colors bg-[var(--bg-primary)] resize-none" />
              </div>
              <button type="submit" className="btn-primary w-full justify-center">
                {locale === "en" ? "Send Message" : "إرسال الرسالة"}
              </button>
            </form>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
