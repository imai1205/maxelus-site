"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui";

export default function Hero() {
  return (
    <section className="relative px-4 md:px-8 py-24 md:py-40 overflow-hidden">
      {/* 背景演出 (Hero 限定): ゆっくり現れる罫線で奥行きを出す */}
      <Reveal className="absolute inset-y-0 left-4 md:left-8" delay={0.6} distance={0}>
        <div className="h-full w-px bg-[#e5e7eb]" />
      </Reveal>
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#1a1a1a] leading-tight tracking-tight mb-8">
            業務を整え、
            <br />
            大切なことに時間を使える世界へ。
          </h1>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="text-base md:text-lg text-[#6b7280] leading-relaxed max-w-2xl mb-10">
            MAXELUSは、Webサイト制作・業務アプリ開発・AI活用支援を通じて、現場で使われる仕組みを設計・開発する会社です。
          </p>
        </Reveal>
        <Reveal delay={0.45}>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-[#fff100] hover:bg-[#fdc700] text-[#1a1a1a] font-medium px-8 py-4 rounded-full transition-all hover:scale-105"
            >
              無料相談する
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center bg-white hover:bg-[#fafafa] text-[#1a1a1a] font-medium px-8 py-4 rounded-full border border-[#e5e7eb] transition-all hover:scale-105"
            >
              サービスを見る
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
