"use client";

import { cn } from "@/lib/utils";
import { AnimatedReveal } from "./AnimatedReveal";
import { fadeUp } from "@/lib/animations";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  light?: boolean;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
  className,
}: SectionHeaderProps) {
  const alignClass = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  }[align];

  return (
    <AnimatedReveal className={cn("flex flex-col gap-4", alignClass, className)} variants={fadeUp}>
      {eyebrow && (
        <span
          className={cn(
            "font-body text-xs font-semibold tracking-[0.2em] uppercase",
            light ? "text-[var(--gold-light)]" : "text-[var(--gold-primary)]"
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight",
          light ? "text-white" : "text-[var(--text-primary)]"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "font-body text-base md:text-lg max-w-2xl leading-relaxed",
            light ? "text-white/70" : "text-[var(--text-muted)]"
          )}
        >
          {subtitle}
        </p>
      )}
      <div className={cn("gold-divider", align === "center" && "mx-auto", align === "right" && "ml-auto")} />
    </AnimatedReveal>
  );
}
