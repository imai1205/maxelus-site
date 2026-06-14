"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import { useRef, ReactNode, Children } from "react";

interface StaggerGroupProps {
  children: ReactNode;
  className?: string;
  /** 各子要素の表示間隔 (秒) */
  interval?: number;
  /** 浮き上がり距離 (px) */
  distance?: number;
}

/**
 * 直下の子要素をスクロール到達時に「少し遅れて順番に」表示するラッパー。
 * カード群 (Business / Works / 開発スタイル) の表示に使う。
 */
export function StaggerGroup({
  children,
  className = "",
  interval = 0.12,
  distance = 24,
}: StaggerGroupProps) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className}>
      {Children.map(children, (child, index) => (
        <motion.div
          initial={{ opacity: 0, y: distance }}
          animate={
            isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: distance }
          }
          transition={{
            duration: 0.6,
            delay: index * interval,
            ease: "easeOut",
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
