"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: "light" | "dark";
  padding?: "none" | "sm" | "md" | "lg";
  onClick?: () => void;
  href?: string;
}

export function GlassCard({
  children,
  className = "",
  variant = "light",
  padding = "md",
  onClick,
  href,
}: GlassCardProps) {
  const shouldReduceMotion = useReducedMotion();

  const paddingClasses = {
    none: "",
    sm: "p-4",
    md: "p-6 md:p-8",
    lg: "p-8 md:p-12",
  };

  const baseClasses = `
    rounded-2xl md:rounded-3xl
    ${variant === "light" 
      ? "bg-white/70 dark:bg-[#1e293b]/70" 
      : "bg-[#1e293b]/70 dark:bg-white/10"
    }
    backdrop-blur-xl
    border border-white/25
    shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]
    relative
    overflow-hidden
    ${onClick || href ? "cursor-pointer" : ""}
    ${paddingClasses[padding]}
    ${className}
  `;

  // 上側のハイライト（ガラス感）
  const highlightGradient = variant === "light"
    ? "from-white/40 via-white/20 to-transparent"
    : "from-white/20 via-white/10 to-transparent";

  const motionProps = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: shouldReduceMotion ? 0 : 0.35,
      ease: "easeOut" as const,
    },
    whileHover: shouldReduceMotion
      ? {}
      : {
          scale: 1.02,
          transition: {
            type: "spring" as const,
            stiffness: 400,
            damping: 17,
          },
        },
    whileTap: shouldReduceMotion
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

  const content = (
    <>
      {/* 上側のハイライト（ガラス感） */}
      <div
        className={`absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b ${highlightGradient} pointer-events-none`}
      />
      
      {/* コンテンツ */}
      <div className="relative z-10">{children}</div>
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={baseClasses}
        {...motionProps}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.div
      className={baseClasses}
      onClick={onClick}
      {...motionProps}
    >
      {content}
    </motion.div>
  );
}
