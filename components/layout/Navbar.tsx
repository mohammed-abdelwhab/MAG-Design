"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { navigation, siteConfig } from "@/config/site";
import { useUIStore } from "@/store/uiStore";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { LuxuryButton } from "@/components/shared/LuxuryButton";
import { mobileMenuVariants, staggerContainer, staggerItem } from "@/lib/animations";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();
  const { locale } = useUIStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const sectionIds = ["hero", "portfolio", "services", "about", "contact"];
    
    // We add a tiny delay to ensure DOM is ready on initial load
    setTimeout(() => {
      sectionIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.observe(element);
      });
    }, 100);

    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  const isLight = !scrolled && !menuOpen;

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // If the href is a hash link (e.g. "/#services") and we are on the homepage
    if (href.startsWith("/#")) {
      const targetId = href.replace("/#", "");
      if (pathname === "/") {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
          const offset = 80; // Navbar height offset
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
          setMenuOpen(false);
        }
      }
    } else {
      setMenuOpen(false);
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,0.08)] py-3"
            : "bg-transparent py-5"
        )}
      >
        <div className="section-container flex items-center justify-between">
          {/* Logo */}
          <Link href="/" id="navbar-logo" className="flex items-center gap-3 flex-shrink-0">
            <div className="relative w-10 h-10">
              <Image
                src="/images/logo/logo.png"
                alt="MAG Design Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col leading-none">
              <span
                className={cn(
                  "font-display font-bold text-lg tracking-wide transition-colors",
                  isLight ? "text-white" : "text-[var(--dark-luxury)]"
                )}
              >
                MAG
              </span>
              <span
                className={cn(
                  "font-body text-[10px] tracking-[0.25em] uppercase transition-colors",
                  isLight ? "text-white/80" : "text-[var(--gold-primary)]"
                )}
              >
                Design
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navigation.map((item) => {
              const targetId = item.href === "/" ? "hero" : item.href.replace("/#", "");
              const isActive = (pathname === "/" && activeSection === targetId) || (pathname === item.href && pathname !== "/");

              return (
                <div key={item.href} className="relative">
                  <Link
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href === "/" ? "/#hero" : item.href)}
                    id={`nav-${targetId}`}
                    className={cn(
                      "nav-link font-body text-sm font-medium tracking-wide transition-colors relative block py-2",
                      isLight ? "text-white/90 hover:text-white" : "text-[var(--text-primary)] hover:text-[var(--gold-primary)]",
                      isActive && (isLight ? "text-white" : "text-[var(--gold-primary)]")
                    )}
                  >
                    {item.label[locale]}
                  </Link>
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--gold-primary)] rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </div>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher light={isLight} />
            <LuxuryButton href="/book" variant={isLight ? "outline-white" : "gold"} size="sm" id="navbar-book-cta">
              {locale === "en" ? "Book Consultation" : "احجز استشارة"}
            </LuxuryButton>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-3">
            <LanguageSwitcher light={isLight} />
            <button
              id="mobile-menu-toggle"
              aria-label="Toggle menu"
              onClick={() => setMenuOpen(!menuOpen)}
              className={cn(
                "w-10 h-10 flex items-center justify-center rounded-full transition-colors",
                isLight ? "text-white hover:bg-white/10" : "text-[var(--dark-luxury)] hover:bg-gray-100"
              )}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu-overlay"
            className="fixed inset-0 z-40 bg-[var(--dark-deep)] flex flex-col"
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
          >
            <div className="flex flex-col justify-center items-center h-full gap-2 px-8">
              {/* Gold divider top */}
              <div className="gold-divider mb-8" />

              <motion.div
                className="flex flex-col items-center gap-6 w-full"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {navigation.map((item) => (
                  <motion.div key={item.href} variants={staggerItem} className="w-full text-center">
                    <Link
                      href={item.href}
                      id={`mobile-nav-${item.href.replace(/[\/#]/g, "") || "home"}`}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={cn(
                        "font-display text-3xl font-semibold text-white/80 hover:text-white hover:text-[var(--gold-primary)] transition-colors block py-2",
                        (pathname === item.href || (pathname === "/" && item.href === "/")) && "text-[var(--gold-primary)]"
                      )}
                    >
                      {item.label[locale]}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              <div className="gold-divider mt-8 mb-6" />

              <motion.div variants={staggerItem} initial="hidden" animate="visible">
                <LuxuryButton
                  href="/book"
                  variant="gold"
                  size="lg"
                  onClick={() => setMenuOpen(false)}
                  id="mobile-book-cta"
                >
                  {locale === "en" ? "Book Consultation" : "احجز استشارة"}
                </LuxuryButton>
              </motion.div>

              <p className="mt-8 font-body text-xs text-white/30 tracking-widest uppercase">
                {siteConfig.phone}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
