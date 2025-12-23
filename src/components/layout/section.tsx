"use client";

import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { ReactNode, useRef } from "react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  background?: "pearl" | "white" | "gold-light" | "midnight";
  animate?: boolean;
  stagger?: boolean;
}

const backgroundStyles = {
  pearl: "bg-pearl",
  white: "bg-white",
  "gold-light": "bg-gradient-subtle",
  midnight: "bg-midnight text-white",
};

export function Section({
  children,
  className,
  id,
  background = "pearl",
  animate = true,
  stagger = false,
}: SectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const bgClass = backgroundStyles[background];

  if (!animate) {
    return (
      <section
        id={id}
        className={cn("py-16 md:py-24", bgClass, className)}
      >
        {children}
      </section>
    );
  }

  return (
    <motion.section
      ref={ref}
      id={id}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      variants={stagger ? staggerContainer : fadeInUp}
      className={cn("py-16 md:py-24", bgClass, className)}
    >
      {children}
    </motion.section>
  );
}
