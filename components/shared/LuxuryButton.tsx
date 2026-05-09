"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "gold" | "outline-gold" | "outline-white" | "ghost";
type Size = "sm" | "md" | "lg";

interface LuxuryButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  size?: Size;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  id?: string;
}

const variantClasses: Record<Variant, string> = {
  "gold": "btn-gold",
  "outline-gold": "btn-outline-gold",
  "outline-white": "btn-outline-white",
  "ghost": "font-body text-sm font-semibold tracking-widest uppercase text-[var(--gold-primary)] hover:text-[var(--gold-accent)] transition-colors",
};

const sizeClasses: Record<Size, string> = {
  sm: "!py-2.5 !px-5 !text-xs",
  md: "",
  lg: "!py-4 !px-8 !text-base",
};

export function LuxuryButton({
  children,
  href,
  onClick,
  variant = "gold",
  size = "md",
  className,
  disabled,
  type = "button",
  id,
}: LuxuryButtonProps) {
  const classes = cn(variantClasses[variant], sizeClasses[size], disabled && "opacity-50 pointer-events-none", className);

  if (href) {
    return (
      <Link href={href} className={classes} id={id}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled} id={id}>
      {children}
    </button>
  );
}
