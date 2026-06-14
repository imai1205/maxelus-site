"use client";

import { ReactNode } from "react";
import { Reveal } from "@/components/ui";

interface PageHeroProps {
  /* 背景に大きく敷く英字 (例: ABOUT) */
  bgText: string;
  /* 見出し上の英字キッカー (例: ABOUT US) */
  kicker: string;
  title: ReactNode;
  description?: ReactNode;
  /* breadcrumb や CTA など追加要素 */
  children?: ReactNode;
}

// 下層ページ共通のダークヒーロー (/about の様式を共通化)
export default function PageHero({
  bgText,
  kicker,
  title,
  description,
  children,
}: PageHeroProps) {
  return (
    <section className="relative bg-gradient-to-b from-[#0b1220] via-[#1e293b] to-[#0b1220] py-20 md:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--accent-honey)]/10 rounded-full blur-[100px] animate-pulse" />
      <div
        className="absolute bottom-10 right-20 w-96 h-96 bg-[var(--accent-honey)]/10 rounded-full blur-[120px] animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 text-center">
        <Reveal className="relative">
          <div className="relative inline-block">
            <span
              className="section-bg-text left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 text-[32px] sm:text-[48px] md:text-[64px] lg:text-[96px] xl:text-[120px] text-white/25 absolute"
              style={{ opacity: 0.25 }}
            >
              {bgText}
            </span>
            <div className="relative">
              <p className="text-[var(--accent-honey)] text-sm md:text-base font-medium mb-4 tracking-wider relative uppercase">
                {kicker}
              </p>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight relative">
                {title}
              </h1>
            </div>
          </div>
          {description && (
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed relative">
              {description}
            </p>
          )}
          {children && <div className="relative mt-8">{children}</div>}
        </Reveal>
      </div>
    </section>
  );
}
