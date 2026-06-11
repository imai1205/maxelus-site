"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** 表示開始までの遅延 (秒) */
  delay?: number;
  /** 浮き上がり距離 (px) */
  distance?: number;
}

/**
 * スクロールで視界に入ったときに「ふわっと表示」する汎用ラッパー。
 * アニメーションはこのコンポーネントと StaggerGroup の 2 種に限定する方針。
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  distance = 24,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: distance }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: distance }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
