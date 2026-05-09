"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { navigation, siteConfig } from "@/config/site";
import { useUIStore } from "@/store/uiStore";

// Custom SVG Icons
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

export function Footer() {
  const { locale } = useUIStore();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--dark-deep)] text-white">
      {/* Main footer */}
      <div className="border-b border-white/8">
        <Container className="py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">

            {/* Brand column */}
            <div className="lg:col-span-1 flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10">
                  <Image src="/images/logo/logo.png" alt="MAG Design" fill className="object-contain" />
                </div>
                <div>
                  <div className="font-display font-bold text-xl text-white">MAG</div>
                  <div className="font-body text-[10px] tracking-[0.25em] uppercase text-[var(--gold-primary)]">Design</div>
                </div>
              </div>
              <p className="font-body text-sm text-white/60 leading-relaxed max-w-xs">
                {locale === "en"
                  ? "A luxury interior design studio under Al Khaleeg Group. Creating exceptional spaces across Egypt."
                  : "استوديو تصميم داخلي فاخر تحت مظلة مجموعة الخليج. نصنع مساحات استثنائية في جميع أنحاء مصر."}
              </p>
              <div className="flex gap-3 mt-1">
                {[
                  { icon: InstagramIcon, href: siteConfig.instagram, label: "Instagram" },
                  { icon: FacebookIcon, href: siteConfig.facebook, label: "Facebook" },
                  { icon: LinkedinIcon, href: siteConfig.linkedin, label: "LinkedIn" },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-[var(--gold-primary)] hover:border-[var(--gold-primary)] transition-colors"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-[var(--gold-primary)] mb-5">
                {locale === "en" ? "Navigate" : "التنقل"}
              </h4>
              <ul className="flex flex-col gap-3">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="font-body text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {item.label[locale]}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/book" className="font-body text-sm text-white/60 hover:text-white transition-colors">
                    {locale === "en" ? "Book Consultation" : "احجز استشارة"}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-[var(--gold-primary)] mb-5">
                {locale === "en" ? "Services" : "الخدمات"}
              </h4>
              <ul className="flex flex-col gap-3">
                {[
                  { en: "Interior Design", ar: "التصميم الداخلي", href: "/services#interior-design" },
                  { en: "Full Finishing", ar: "التشطيب الكامل", href: "/services#full-finishing" },
                  { en: "Technical Installation", ar: "التركيبات التقنية", href: "/services#technical-installation" },
                  { en: "Facade Design", ar: "تصميم الواجهات", href: "/services#facade-design" },
                ].map((s) => (
                  <li key={s.href}>
                    <Link href={s.href} className="font-body text-sm text-white/60 hover:text-white transition-colors">
                      {s[locale]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-[var(--gold-primary)] mb-5">
                {locale === "en" ? "Contact" : "تواصل"}
              </h4>
              <ul className="flex flex-col gap-4">
                <li>
                  <a href={`tel:${siteConfig.phone}`} className="flex items-start gap-3 text-white/60 hover:text-white transition-colors group">
                    <Phone size={14} className="mt-0.5 flex-shrink-0 group-hover:text-[var(--gold-primary)]" />
                    <span className="font-body text-sm">{siteConfig.phone}</span>
                  </a>
                </li>
                <li>
                  <a href={`mailto:${siteConfig.email}`} className="flex items-start gap-3 text-white/60 hover:text-white transition-colors group">
                    <Mail size={14} className="mt-0.5 flex-shrink-0 group-hover:text-[var(--gold-primary)]" />
                    <span className="font-body text-sm">{siteConfig.email}</span>
                  </a>
                </li>
                <li>
                  <div className="flex items-start gap-3 text-white/60">
                    <MapPin size={14} className="mt-0.5 flex-shrink-0 text-[var(--gold-primary)]" />
                    <span className="font-body text-sm">
                      {locale === "en" ? "90 South, 5th Settlement, New Cairo" : "90 الجنوبي، التجمع الخامس، القاهرة الجديدة"}
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom bar */}
      <Container className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-body text-xs text-white/35">
          © {year} MAG Design. {locale === "en" ? "All rights reserved." : "جميع الحقوق محفوظة."}
        </p>
        <p className="font-body text-xs text-white/25">
          {locale === "en" ? "Under Al Khaleeg Group" : "تحت مظلة مجموعة الخليج"}
        </p>
        <div className="flex gap-4">
          <Link href="/client/login" className="font-body text-xs text-white/30 hover:text-white/60 transition-colors">
            {locale === "en" ? "Client Portal" : "بوابة العملاء"}
          </Link>
        </div>
      </Container>
    </footer>
  );
}
