import type { Variants } from "framer-motion";

// ============================================
// FRAMER MOTION ANIMATION VARIANTS
// MAG Design — Premium slow/smooth animations
// ============================================

/**
 * Fade up reveal — primary entrance animation
 */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/**
 * Fade in — subtle opacity reveal
 */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

/**
 * Fade from left
 */
export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/**
 * Fade from right
 */
export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/**
 * Scale up — for cards and images
 */
export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/**
 * Container stagger — wraps staggered children
 */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

/**
 * Fast stagger for dense grids
 */
export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

/**
 * Stagger item — child of stagger container
 */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/**
 * Hero text reveal — large cinematic entrance
 */
export const heroReveal: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.0,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/**
 * Slide up from bottom — for overlays and panels
 */
export const slideUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] },
  },
  exit: {
    opacity: 0,
    y: 60,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

/**
 * Navbar hide/show on scroll
 */
export const navbarVariants: Variants = {
  visible: { y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  hidden: { y: -100, transition: { duration: 0.3, ease: "easeIn" } },
};

/**
 * Mobile menu overlay
 */
export const mobileMenuVariants: Variants = {
  closed: {
    opacity: 0,
    clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)",
    transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] },
  },
  open: {
    opacity: 1,
    clipPath: "circle(150% at calc(100% - 2.5rem) 2.5rem)",
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

/**
 * Lightbox entrance
 */
export const lightboxVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

/**
 * Page transition wrapper
 */
export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

/**
 * Progress bar fill animation
 */
export const progressBarVariants = (progress: number): Variants => ({
  hidden: { width: "0%" },
  visible: {
    width: `${progress}%`,
    transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 },
  },
});

/**
 * Counter animation (use with useMotionValue)
 */
export const counterTransition = {
  duration: 2,
  ease: [0.25, 0.46, 0.45, 0.94],
};

/**
 * Card hover (use on motion.div)
 */
export const cardHover = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -6,
    scale: 1.01,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};
