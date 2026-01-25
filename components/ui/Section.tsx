"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg" | "xl";
  background?: "transparent" | "light" | "dark" | "gradient";
  animateOnScroll?: boolean;
}

export function Section({
  children,
  className = "",
  padding = "md",
  background = "transparent",
  animateOnScroll = true,
}: SectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const paddingClasses = {
    sm: "py-8 md:py-12",
    md: "py-12 md:py-16",
    lg: "py-16 md:py-24",
    xl: "py-24 md:py-32",
  };

  const backgroundClasses = {
    transparent: "",
    light: "bg-[#fafafa]",
    dark: "bg-[#0b1220]",
    gradient: "bg-gradient-to-b from-[#fafafa] to-white",
  };

  const baseClasses = `
    ${paddingClasses[padding]}
    ${backgroundClasses[background]}
    ${className}
  `;

  const motionProps = {
    initial: animateOnScroll && !shouldReduceMotion
      ? { opacity: 0, y: 20 }
      : { opacity: 1, y: 0 },
    animate: animateOnScroll && !shouldReduceMotion
      ? isInView
        ? { opacity: 1, y: 0 }
        : { opacity: 0, y: 20 }
      : { opacity: 1, y: 0 },
    transition: {
      duration: shouldReduceMotion ? 0 : 0.5,
      ease: "easeOut" as const,
    },
  };

  return (
    <motion.section
      ref={ref}
      className={baseClasses}
      {...motionProps}
    >
      {children}
    </motion.section>
  );
}
