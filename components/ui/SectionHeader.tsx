"use client";

import { ReactNode } from "react";
import { AnimatedSection } from "@/app/components/AnimationProvider";

interface SectionHeaderProps {
  /** 英字キッカー (例: Business / Approach) */
  kicker?: string;
  /** 見出し */
  title: ReactNode;
  /** 補足本文 */
  body?: ReactNode;
  /** 背景に薄く敷く大きな英字 */
  bgText?: string;
  /** 配置 */
  align?: "center" | "left";
  /** ダーク背景上で使う場合 true (白文字) */
  light?: boolean;
  className?: string;
}

/**
 * サイト共通のセクション見出し。
 * キッカー(英字) + 見出し + 本文 を統一トーンで描画する。アイコンは使わない。
 */
export function SectionHeader({
  kicker,
  title,
  body,
  bgText,
  align = "center",
  light = false,
  className = "",
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <AnimatedSection
      animation="fade-up"
      className={`relative flex flex-col ${isCenter ? "items-center text-center" : "items-start text-left"} ${className}`}
    >
      <div className="relative inline-block">
        {bgText && (
          <span
            aria-hidden="true"
            className={`section-bg-text top-0 -translate-y-1/2 text-[34px] sm:text-[52px] md:text-[72px] lg:text-[104px] absolute ${
              isCenter ? "left-1/2 -translate-x-1/2" : "left-0"
            } ${light ? "text-white/10" : "text-[#0b1220]/[0.06]"}`}
          >
            {bgText}
          </span>
        )}
        {kicker && (
          <p className="relative mb-3 text-xs md:text-sm font-medium tracking-[0.25em] text-[#fdc700]">
            {kicker}
          </p>
        )}
        <h2
          className={`relative text-[26px] md:text-[36px] lg:text-[42px] font-bold tracking-tight leading-tight ${
            light ? "text-white" : "text-[#1a1a1a]"
          }`}
        >
          {title}
        </h2>
      </div>
      {body && (
        <p
          className={`relative mt-4 max-w-2xl text-sm md:text-base leading-relaxed ${
            light ? "text-white/70" : "text-[#6b7280]"
          } ${isCenter ? "mx-auto" : ""}`}
        >
          {body}
        </p>
      )}
    </AnimatedSection>
  );
}
