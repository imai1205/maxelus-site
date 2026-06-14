"use client";

import Link from "next/link";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import Footer from "./components/Footer";
import { AnimatedSection } from "./components/AnimationProvider";
import { SectionHeader, ContactCTA } from "../components/ui";
import ScrollFrameSequence from "./components/ScrollFrameSequence";
import { usePrefersReducedMotion } from "./components/usePrefersReducedMotion";
import { serviceCategories } from "./data/serviceCategories";
import { homeCases } from "./data/caseStudies";
import { approachSteps } from "./data/approach";

// ① ヒーロー — 現フォーマット(ネイビーグラデ + 余白 + アニメーション)を踏襲した新規ヒーロー
function HeroSection() {
  return (
    <section className="relative min-h-[78vh] md:min-h-[84vh] flex items-center overflow-hidden bg-gradient-to-b from-[#0b1220] via-[#1e293b] to-[#0b1220]">
      {/* ドットパターン */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* ぼかしオーブ */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#fff100]/10 rounded-full blur-[100px] animate-pulse" />
      <div
        className="absolute bottom-10 right-20 w-96 h-96 bg-[#fdc700]/10 rounded-full blur-[120px] animate-pulse"
        style={{ animationDelay: "1s" }}
      />
      {/* 背景の大きな英字 */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span className="text-[110px] sm:text-[180px] md:text-[260px] font-bold text-white/[0.03] tracking-wider whitespace-nowrap select-none">
          MAXELUS
        </span>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <AnimatedSection animation="fade-up" duration={800}>
          <p className="mb-6 text-xs md:text-sm font-medium tracking-[0.3em] text-[#fdc700]">MAXELUS INC.</p>
        </AnimatedSection>
        <AnimatedSection animation="fade-up" delay={150} duration={800}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.25] mb-8">
            大切なことに、
            <br />
            時間を使える世界へ。
          </h1>
        </AnimatedSection>
        <AnimatedSection animation="fade-up" delay={300} duration={800}>
          <p className="mx-auto mb-10 max-w-2xl text-sm md:text-lg text-white/70 leading-relaxed">
            マクセラスは、Web制作・アプリ開発・業務効率化支援を通じて、日々の仕事に余白を生み出す会社です。
            <br className="hidden md:block" />
            ただシステムを作るのではなく、業務の流れを整え、使われ続ける仕組みを設計します。
          </p>
        </AnimatedSection>
        <AnimatedSection animation="fade-up" delay={450} duration={800}>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/services"
              prefetch={true}
              className="inline-flex items-center justify-center bg-[#fff100] hover:bg-[#fdc700] text-[#1a1a1a] font-medium px-8 py-4 rounded-full text-sm md:text-base transition-all hover:scale-105 shadow-lg"
            >
              事業内容を見る
            </Link>
            <Link
              href="/contact"
              prefetch={true}
              className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-4 rounded-full text-sm md:text-base border border-white/20 backdrop-blur-sm transition-all hover:scale-105"
            >
              お問い合わせ
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ② 事業内容プレビュー
function BusinessPreview() {
  return (
    <section className="bg-white py-20 md:py-32 px-4 md:px-8">
      <div className="max-w-[1100px] mx-auto">
        <SectionHeader
          kicker="Business"
          title="時間を生み出す、効率的な仕組みをつくる。"
          body="Webサイトやアプリを作るだけでなく、業務の流れを整理し、必要な情報が必要なタイミングで使える状態をつくります。"
          bgText="BUSINESS"
          className="mb-12 md:mb-20"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {serviceCategories.map((cat, i) => {
            const Card = (
              <div className="group h-full bg-white border border-[#e5e7eb] rounded-2xl p-6 md:p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <span className="text-sm font-bold tracking-[0.25em] text-[#fdc700] tabular-nums">{cat.no}</span>
                <div className="mt-3 mb-5 h-px w-10 bg-[#e5e7eb] group-hover:w-16 group-hover:bg-[#fdc700] transition-all duration-300" />
                <h3 className="text-lg md:text-xl font-bold text-[#1a1a1a] mb-3">{cat.title}</h3>
                <p className="text-sm text-[#6b7280] leading-relaxed">{cat.summary}</p>
                {cat.href && (
                  <span className="mt-5 inline-block text-sm font-medium text-[#1a1a1a] group-hover:translate-x-1 transition-transform">
                    詳しく見る
                  </span>
                )}
              </div>
            );
            return (
              <AnimatedSection key={cat.id} animation="fade-up" delay={(i % 2) * 100}>
                {cat.href ? (
                  <Link href={cat.href} prefetch={true} className="block h-full">
                    {Card}
                  </Link>
                ) : (
                  Card
                )}
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ③ 代表事例プレビュー
function CasesPreview() {
  return (
    <section className="bg-[#fafafa] py-20 md:py-32 px-4 md:px-8">
      <div className="max-w-[1100px] mx-auto">
        <SectionHeader
          kicker="Cases"
          title="業務改善の具体例"
          body="公開できる情報は一部に限られますが、製造業向けのデータ検索、OCR、AIチャットボット、管理システムなど、実際の業務課題に合わせた仕組みづくりに取り組んでいます。"
          bgText="CASES"
          className="mb-12 md:mb-20"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {homeCases.map((c, i) => (
            <AnimatedSection key={c.id} animation={i % 2 === 0 ? "fade-right" : "fade-left"} delay={(i % 2) * 100}>
              <div className="group h-full bg-white border border-[#e5e7eb] rounded-2xl p-6 md:p-8 hover:shadow-xl transition-all duration-300">
                <span className="text-sm font-bold tracking-[0.25em] text-[#fdc700] tabular-nums">{c.no}</span>
                <div className="mt-3 mb-5 h-px w-10 bg-[#e5e7eb] group-hover:w-16 group-hover:bg-[#fdc700] transition-all duration-300" />
                <h3 className="text-base md:text-lg font-bold text-[#1a1a1a] mb-3 leading-snug">{c.title}</h3>
                <p className="text-sm text-[#6b7280] leading-relaxed">{c.summary}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
        <AnimatedSection animation="fade-up" delay={150} className="mt-12 text-center">
          <Link
            href="/services"
            prefetch={true}
            className="inline-flex items-center justify-center border border-[#1a1a1a]/20 text-[#1a1a1a] font-medium px-8 py-4 rounded-full text-sm md:text-base hover:bg-[#1a1a1a] hover:text-white transition-all"
          >
            事業内容を見る
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ④ マクセラスの進め方
function ApproachSection() {
  return (
    <section className="bg-white py-20 md:py-32 px-4 md:px-8">
      <div className="max-w-[900px] mx-auto">
        <SectionHeader
          kicker="Approach"
          title="いきなり作らず、まず業務を整える。"
          body="システム開発で大切なのは、最初から機能を増やすことではありません。まず現在の業務がどのように回っているのかを整理し、どこを変えると効果が出るのかを見極めることが重要です。"
          bgText="APPROACH"
          align="left"
          className="mb-12 md:mb-20"
        />
        <div className="space-y-px">
          {approachSteps.map((step, i) => (
            <AnimatedSection key={step.no} animation="fade-right" delay={i * 80}>
              <div className="group flex gap-5 md:gap-8 border-t border-[#e5e7eb] py-6 md:py-8 hover:bg-[#fafafa] transition-colors">
                <span className="shrink-0 text-2xl md:text-3xl font-bold text-[#fdc700] tabular-nums tracking-wider">
                  {step.no}
                </span>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-[#1a1a1a] mb-2">{step.title}</h3>
                  <p className="text-sm md:text-base text-[#6b7280] leading-relaxed">{step.body}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
          <div className="border-t border-[#e5e7eb]" />
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  // reduced-motion のユーザーには Lenis（慣性スクロール）を適用しない
  const reduceMotion = usePrefersReducedMotion();

  const content = (
    <div className="min-h-screen font-sans overflow-x-hidden">
      <main className="pt-14 md:pt-16">
        <HeroSection />
        {/* スクロール同期のブランドロゴ演出（白背景） */}
        <ScrollFrameSequence frameCount={96} />
        <BusinessPreview />
        <CasesPreview />
        <ApproachSection />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );

  // Lenis はトップページにいる間だけマウント（他ページは現状のネイティブスクロールを維持）
  return reduceMotion ? (
    content
  ) : (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }}>
      {content}
    </ReactLenis>
  );
}
