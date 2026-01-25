"use client";

import { motion, useReducedMotion, MotionProps } from "framer-motion";
import { ReactNode } from "react";

interface MotionPressProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  as?: "div" | "button" | "a";
  disabled?: boolean;
}

export function MotionPress({
  children,
  className = "",
  onClick,
  href,
  as: Component = "div",
  disabled = false,
}: MotionPressProps) {
  const shouldReduceMotion = useReducedMotion();

  const motionProps: MotionProps = {
    whileHover: shouldReduceMotion || disabled
      ? {}
      : {
          scale: 1.02,
          transition: {
            type: "spring" as const,
            stiffness: 400,
            damping: 17,
          },
        },
    whileTap: shouldReduceMotion || disabled
      ? {}
      : {
          scale: 0.98,
          transition: {
            type: "spring" as const,
            stiffness: 400,
            damping: 17,
          },
        },
  };

  if (href) {
    return (
      <motion.a
        href={href}
        className={className}
        {...motionProps}
      >
        {children}
      </motion.a>
    );
  }

  if (Component === "button") {
    return (
      <motion.button
        className={className}
        onClick={onClick}
        disabled={disabled}
        {...motionProps}
      >
        {children}
      </motion.button>
    );
  }

  return (
    <motion.div
      className={className}
      onClick={onClick}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}
