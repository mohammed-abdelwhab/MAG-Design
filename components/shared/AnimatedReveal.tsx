"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import type { Variants } from "framer-motion";
import { fadeUp } from "@/lib/animations";

interface AnimatedRevealProps {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
  once?: boolean;
  threshold?: number;
}

export function AnimatedReveal({
  children,
  className,
  variants = fadeUp,
  delay = 0,
  once = true,
  threshold = 0.15,
}: AnimatedRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
