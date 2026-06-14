"use client";

import Link from "next/link";
import { AnimatedSection } from "@/app/components/AnimationProvider";

/**
 * サイト共通のお問い合わせ CTA セクション。全ページの末尾で使う。
 * 黄色はボタンのみ。背景はネイビー。
 */
export function ContactCTA() {
  return (
    <section className="relative overflow-hidden bg-[#0b1220] py-20 md:py-32 px-4">
      {/* 背景の大きな英字 */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <span className="text-[80px] sm:text-[140px] md:text-[220px] font-bold text-white/[0.03] tracking-wider whitespace-nowrap select-none">
          CONTACT
        </span>
      </div>

      <div className="relative max-w-3xl mx-auto text-center">
        <AnimatedSection animation="fade-up">
          <p className="mb-4 text-xs md:text-sm font-medium tracking-[0.25em] text-[#fdc700]">
            READY TO START
          </p>
          <h2 className="text-[26px] md:text-[40px] font-bold text-white leading-tight">
            業務を整えて、
            <br className="sm:hidden" />
            新しい時間を生み出しませんか。
          </h2>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={150}>
          <p className="mt-6 text-sm md:text-base text-white/70 leading-relaxed">
            Webサイト・LP制作、アプリ開発、業務効率化、AI活用まで。
            <br />
            まだ内容が固まっていない段階でも、お気軽にご相談ください。
          </p>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={300}>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
            <Link
              href="/contact"
              prefetch={true}
              className="inline-flex items-center justify-center bg-[#fff100] hover:bg-[#fdc700] text-[#1a1a1a] font-medium px-8 py-4 rounded-full text-sm md:text-base transition-all hover:scale-105 shadow-lg"
            >
              お問い合わせ
            </Link>
            <Link
              href="/services"
              prefetch={true}
              className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-4 rounded-full text-sm md:text-base border border-white/20 backdrop-blur-sm transition-all hover:scale-105"
            >
              サービスを見る
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
