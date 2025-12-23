import { Variants } from "framer-motion";

// Fade in up animation - most common pattern
export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  },
  exit: { opacity: 0, y: 20 }
};

// Fade in animation
export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" }
  },
  exit: { opacity: 0 }
};

// Scale up animation
export const scaleUp: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" }
  },
  exit: { opacity: 0, scale: 0.95 }
};

// Slide in from left
export const slideInLeft: Variants = {
  initial: { opacity: 0, x: -30 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  },
  exit: { opacity: 0, x: -30 }
};

// Slide in from right
export const slideInRight: Variants = {
  initial: { opacity: 0, x: 30 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  },
  exit: { opacity: 0, x: 30 }
};

// Stagger container for children
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

// Stagger container with faster stagger
export const staggerContainerFast: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05
    }
  }
};

// Card hover effect
export const cardHover = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 10px 30px rgba(0,0,0,0.08)"
  },
  hover: {
    scale: 1.02,
    y: -4,
    boxShadow: "0 4px 12px rgba(0,0,0,0.1), 0 20px 40px rgba(0,0,0,0.12)",
    transition: { duration: 0.2, ease: "easeOut" as const }
  }
};

// Button hover effect
export const buttonHover = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -2,
    transition: { duration: 0.2, ease: "easeOut" as const }
  },
  tap: { scale: 0.98, y: 0 }
};

// Page transition
export const pageTransition: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: "easeIn" }
  }
};

// Timeline item animation
export const timelineItem: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// Counter animation helper
export const counterAnimation = {
  duration: 2,
  ease: "easeOut" as const
};

// Viewport settings for scroll animations
export const scrollViewport = {
  once: true,
  margin: "-100px",
  amount: 0.3 as const
};

// Default transition
export const defaultTransition = {
  duration: 0.4,
  ease: [0.4, 0, 0.2, 1] as const
};

// Spring transition for bouncy animations
export const springTransition = {
  type: "spring" as const,
  stiffness: 400,
  damping: 30
};
