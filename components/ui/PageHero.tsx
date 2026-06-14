"use client";

import { ReactNode } from "react";
import { AnimatedSection } from "@/app/components/AnimationProvider";

interface PageHeroProps {
  /** 英字キッカー (例: Services) */
  kicker: string;
  /** 見出し */
  title: ReactNode;
  /** リード文 */
  lead?: ReactNode;
  /** 背景の大きな英字。省略時は kicker を大文字化 */
  bgText?: string;
}

/**
 * 下層ページ共通のヒーロー。ネイビーグラデ背景 + キッカー + 見出し + リード。
 * ホーム以外の全ページで使う。
 */
export function PageHero({ kicker, title, lead, bgText }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0b1220] via-[#1e293b] to-[#0b1220] pt-32 pb-20 md:pt-44 md:pb-28 px-4">
      {/* ドットパターン */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* 背景の大きな英字 */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span className="text-[90px] sm:text-[150px] md:text-[220px] font-bold text-white/[0.03] tracking-wider whitespace-nowrap select-none">
          {bgText ?? kicker.toUpperCase()}
        </span>
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        <AnimatedSection animation="fade-up">
          <p className="mb-5 text-xs md:text-sm font-medium tracking-[0.25em] text-[#fdc700]">{kicker}</p>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight break-keep">{title}</h1>
        </AnimatedSection>
        {lead && (
          <AnimatedSection animation="fade-up" delay={150}>
            <p className="mx-auto mt-6 max-w-2xl text-sm md:text-base text-white/70 leading-relaxed break-keep">{lead}</p>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
}
