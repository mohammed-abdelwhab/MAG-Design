"use client";

import { useUIStore } from "@/store/uiStore";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  className?: string;
  light?: boolean;
}

export function LanguageSwitcher({ className, light = false }: LanguageSwitcherProps) {
  const { locale, toggleLocale } = useUIStore();

  return (
    <button
      onClick={toggleLocale}
      id="language-switcher"
      aria-label="Switch language"
      className={cn(
        "flex items-center gap-1.5 font-body text-xs font-semibold tracking-widest uppercase transition-colors duration-300 border rounded-full px-3 py-1.5",
        light
          ? "border-white/30 text-white hover:border-white hover:bg-white/10"
          : "border-[var(--border-gold)] text-[var(--gold-primary)] hover:bg-[var(--gold-primary)] hover:text-white",
        className
      )}
    >
      <span>{locale === "en" ? "عربي" : "EN"}</span>
    </button>
  );
}
