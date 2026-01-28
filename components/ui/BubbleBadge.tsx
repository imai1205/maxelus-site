"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface BubbleBadgeProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "large" | "small";
  style?: React.CSSProperties;
}

export function BubbleBadge({
  children,
  className = "",
  variant = "default",
  style,
}: BubbleBadgeProps) {
  const shouldReduceMotion = useReducedMotion();

  const sizeClasses = {
    small: "px-2 py-0.5 text-xs",
    default: "px-3 py-1 text-sm",
    large: "px-4 py-1.5 text-base",
  };

  const baseClasses = `
    inline-block
    rounded-full
    bg-[rgba(255,230,120,0.35)]
    text-[#111]
    font-medium
    ${sizeClasses[variant]}
    ${className}
  `;

  const motionProps = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: {
      duration: shouldReduceMotion ? 0 : 0.3,
      type: "spring" as const,
      stiffness: 300,
      damping: 20,
    },
    whileHover: shouldReduceMotion
      ? {}
      : {
          scale: 1.05,
          transition: {
            type: "spring" as const,
            stiffness: 400,
            damping: 17,
          },
        },
  };

  return (
    <motion.span className={baseClasses} style={style} {...motionProps}>
      {children}
    </motion.span>
  );
}
