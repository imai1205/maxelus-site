"use client";

import { useState, memo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import Footer from "./components/Footer";
import { 
  AnimatedSection, 
  StaggeredContainer, 
  TextReveal, 
  AnimatedCounter, 
  FloatingElement,
  Magnetic,
  TiltCard,
  ParallaxProvider,
  GradientOrbs
} from "./components/AnimationProvider";
import { homeCasesData, type HomeCase } from "./data/homeCasesData";
import HeroAppSlider from "./components/hero/HeroAppSlider";
import { GlassCard, BubbleBadge, MotionPress, Section } from "../components/ui";

// Dynamic imports for heavy components - improves initial page load
// const InteractiveDemo = dynamic(() => import("./components/InteractiveDemo"), {
//   loading: () => <div className="h-[600px] flex items-center justify-center bg-[#0b1220]"><div className="animate-pulse text-white/25">読み込み中...</div></div>,
//   ssr: false // クライアントサイドのみでレンダリング（初期表示を高速化）
// });

// サロン予約アプリのデモ
const SalonReservationAppMockup = dynamic(() => import("./components/SalonReservationAppMockup"), {
  loading: () => <div className="h-[600px] flex items-center justify-center bg-white"><div className="animate-pulse text-[#6a7282]">読み込み中...</div></div>,
  ssr: false
});

const StorySlider = dynamic(() => import("./components/StorySlider"), {
  loading: () => <div className="h-[500px] flex items-center justify-center bg-[#0b1220]"><div className="animate-pulse text-white/25">読み込み中...</div></div>,
  ssr: false // クライアントサイドのみでレンダリング（初期表示を高速化）
});

// Image URLs from Figma
const imgHeroDemo = "https://www.figma.com/api/mcp/asset/7e73c5ad-1bad-40df-8921-ce35139c9ade";
const imgArrowIcon = "https://www.figma.com/api/mcp/asset/7ec4195f-a9ee-4a40-9cee-fdd834f0cb73";
const imgXIcon = "https://www.figma.com/api/mcp/asset/984861da-4551-4062-ba81-41e6831ccaf8";
const imgCheckIcon = "https://www.figma.com/api/mcp/asset/65695e2f-13d2-4156-8363-ac17b640f3c0";
const imgArrowTransform = "https://www.figma.com/api/mcp/asset/f64d698b-c6cb-4fef-9a71-5853011032c2";
const imgWebIcon = "https://www.figma.com/api/mcp/asset/255d631b-ad89-466c-95b4-c50f43d66859";
const imgAppIcon = "https://www.figma.com/api/mcp/asset/2e37d1b0-14e3-4732-a06f-9afca402eee0";
const imgDxIcon = "https://www.figma.com/api/mcp/asset/73ced661-043d-4ff9-8929-4a0d44f7fb9d";
const imgCloudIcon = "https://www.figma.com/api/mcp/asset/0226501b-da52-458c-928a-a3290c5eea2e";
const imgMobileIcon = "https://www.figma.com/api/mcp/asset/71acee49-6838-4b21-8024-587de2838e59";
const imgWorks1 = "https://www.figma.com/api/mcp/asset/a4f37e6a-2130-4808-9dc3-92b33fb7ce6f";
const imgWorks2 = "https://www.figma.com/api/mcp/asset/a97c9aa5-1dca-404b-97f1-f2c77a69af4b";
const imgWorks3 = "https://www.figma.com/api/mcp/asset/9039d5eb-93bd-427d-9fdf-937454afea3d";
const imgArrowRight = "https://www.figma.com/api/mcp/asset/dff0d741-b040-4a48-9c0c-9c756232f4c2";


// Hero Section Component - シンプルな実装
function HeroSection({ settings }: { settings: { cta_primary_text?: string; cta_primary_href?: string; cta_secondary_text?: string; cta_secondary_href?: string } | null }) {
  const primaryHref = settings?.cta_primary_href || '/contact';
  const secondaryHref = settings?.cta_secondary_href || '/cases';
  const primaryText = settings?.cta_primary_text || '無料相談する';
  const secondaryText = settings?.cta_secondary_text || '事例を見る';

  return (
    <section className="relative min-h-[90vh] md:min-h-screen overflow-hidden bg-gradient-to-b from-[#0b1220] via-[#1e293b] to-[#0b1220]">
      <div className="absolute inset-0 opacity-10" style={{ zIndex: 0 }}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="absolute top-20 left-10 w-72 h-72 bg-[#fff100]/10 rounded-full blur-[100px] animate-pulse" style={{ zIndex: 0 }} />
      <div
        className="absolute bottom-10 right-20 w-96 h-96 bg-[#fdc700]/10 rounded-full blur-[120px] animate-pulse"
        style={{ animationDelay: "1s", zIndex: 0 }}
      />

      <HeroAppSlider />

      <div className="absolute top-0 left-0 right-0 max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-32 flex flex-col pointer-events-none" style={{ zIndex: 200 }}>
        <div className="flex-1 flex flex-col justify-center">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-[85%] lg:max-w-[520px] space-y-5 md:space-y-6 text-center lg:text-left relative pointer-events-none px-5 py-5 md:px-6 md:py-6 rounded-2xl backdrop-blur-md bg-[#2d3a4f]/60 border border-white/12 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]" style={{ zIndex: 500, background: 'rgba(45, 58, 79, 0.6)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
              <div className="pointer-events-auto relative z-10">
              <AnimatedSection animation="fade-up" duration={800}>
                <span className="section-bg-text left-0 -top-6 md:-top-12 text-[30px] sm:text-[40px] md:text-[60px] lg:text-[80px] xl:text-[100px] text-white/10 absolute" style={{ zIndex: 0 }}>HOME</span>
                <div className="mb-3 md:mb-4 relative" style={{ zIndex: 100 }}>
                  <div className="relative inline-block">
                    {/* バッジの後ろに光る効果 - より大きく、より明るく */}
                    <div className="absolute -inset-2 bg-[#fff100] blur-2xl opacity-80 rounded-full" style={{ zIndex: -1 }} />
                    <div className="absolute -inset-1 bg-[#fff100] blur-lg opacity-60 rounded-full" style={{ zIndex: -1 }} />
                    <BubbleBadge className="relative bg-[#fff100] text-[#1a1a1a] font-bold shadow-2xl border-2 border-[#fdc700]/50" style={{ zIndex: 100, background: '#fff100', boxShadow: '0 0 30px rgba(255, 241, 0, 0.6), 0 4px 20px rgba(0, 0, 0, 0.3)' }}>
                      AI × 最新手法
                    </BubbleBadge>
                  </div>
                </div>
                {/* 大見出し */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 md:mb-3 leading-tight relative z-50">
                  完全オーダーメイドで
                  <br />
                  課題解決
                </h1>
                {/* 中見出し */}
                <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-white/90 mb-3 md:mb-4 relative z-50">
                  WEB・アプリ制作
                </h2>
              </AnimatedSection>
              <AnimatedSection animation="fade-up" delay={300} duration={800}>
                {/* サブテキスト - 1-2行に圧縮 */}
                <p className="text-sm md:text-base text-white/80 mb-4 md:mb-5 relative z-50 leading-relaxed">
                  ユーザーに使われる、成果につながるプロダクトを企画から運用まで伴走してお届けします
                </p>
                {/* CTAボタン - カード内に配置 */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <Link 
                    href={primaryHref} 
                    prefetch={true} 
                    className="inline-flex items-center justify-center gap-2 bg-[#fff100] hover:bg-[#fdc700] text-[#1a1a1a] font-medium px-5 md:px-6 py-2.5 md:py-3 rounded-full text-sm md:text-base transition-all hover:scale-105 shadow-lg"
                  >
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    {primaryText}
                  </Link>
                  <Link 
                    href={secondaryHref} 
                    prefetch={true} 
                    className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-5 md:px-6 py-2.5 md:py-3 rounded-full text-sm md:text-base transition-all hover:scale-105 backdrop-blur-sm border border-white/20"
                  >
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {secondaryText}
                  </Link>
                </div>
              </AnimatedSection>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Challenge Section Component
function ChallengeSection() {
  const beforeItems = [
    "仕様が固まらない",
    "途中で手戻りが出る",
    "追加費用が怖い"
  ];
  
  const afterItems = [
    "触れるデモで合意",
    "設計確定→開発",
    "予算と範囲が明確"
  ];

  return (
    <section className="relative py-16 md:py-32 px-4 md:px-12 overflow-hidden bg-white dark:bg-[#0b1220]">
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed opacity-5 dark:opacity-10"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1920&q=80')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#fafafa] via-[#f5f5f5] to-[#fafafa] dark:from-[#0b1220] dark:via-[#0b1220] dark:to-[#0b1220]" />
      <div className="relative max-w-[1100px] mx-auto">
        {/* Section heading */}
        <AnimatedSection animation="fade-up" className="relative text-center mb-10 md:mb-16">
          <p className="text-sm md:text-base text-[#fdc700] font-medium tracking-widest mb-2">PROBLEM</p>
          <div className="relative inline-block">
            <span className="section-bg-text left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 text-[32px] sm:text-[48px] md:text-[64px] lg:text-[96px] xl:text-[120px] text-[#0b1220]/25 dark:text-white/25 absolute" style={{ opacity: 0.25 }}>CHALLENGE</span>
            <h2 
              data-cms-key="site.challenge_title"
              className="relative text-[26px] md:text-[36px] lg:text-[42px] font-bold text-[#1a1a1a] dark:text-[#f9fafb] tracking-tight"
            >
              課題は&quot;ズレ&quot;から起きる
            </h2>
          </div>
          <p 
            data-cms-key="site.challenge_subtitle"
            className="text-sm md:text-base text-[#6b7280] dark:text-[#9ca3af] mt-3 max-w-xl mx-auto"
          >
            開発の失敗の多くは、認識のズレから生まれます。
          </p>
        </AnimatedSection>
        
        {/* Before/After comparison */}
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
          {/* Before */}
          <AnimatedSection animation="fade-up" className="flex-1 w-full">
            <p className="text-sm font-bold text-[#6b7280] uppercase tracking-wide mb-3 md:mb-4 text-center md:text-left">Before</p>
            <StaggeredContainer className="space-y-3 md:space-y-4" staggerDelay={150}>
              {beforeItems.map((item, i) => (
                <MotionPress key={i}>
                  <GlassCard
                    variant="light"
                    padding="sm"
                    className="flex items-center gap-3 md:gap-4 border-[#ffe2e2] hover:border-red-300"
                    data-cms-key={`site.challenge_before_${i}`}
                  >
                    <div className="before-icon-bg rounded-full w-7 md:w-8 h-7 md:h-8 flex items-center justify-center flex-shrink-0 bg-red-100 dark:bg-red-900/30">
                      <svg className="w-4 md:w-5 h-4 md:h-5 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <span className="text-sm md:text-base text-[#1a1a1a] dark:text-[#f9fafb]">{item}</span>
                  </GlassCard>
                </MotionPress>
              ))}
            </StaggeredContainer>
          </AnimatedSection>
          
          {/* Arrow */}
          <AnimatedSection animation="zoom-in" delay={400} className="my-2 md:my-0">
            <MotionPress className="bg-[#fff100] rounded-full w-12 md:w-16 h-12 md:h-16 flex items-center justify-center shadow-lg animate-pulse-glow hover:rotate-180 transition-transform duration-700 cursor-pointer rotate-90 md:rotate-0">
              <svg className="w-6 md:w-8 h-6 md:h-8 text-[#1a1a1a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </MotionPress>
          </AnimatedSection>
          
          {/* After */}
          <AnimatedSection animation="fade-up" className="flex-1 w-full">
            <p className="text-sm font-bold text-[#6b7280] uppercase tracking-wide mb-3 md:mb-4 text-center md:text-left">After</p>
            <StaggeredContainer className="space-y-3 md:space-y-4" staggerDelay={150}>
              {afterItems.map((item, i) => (
                <MotionPress key={i}>
                  <GlassCard
                    variant="light"
                    padding="sm"
                    className="flex items-center gap-3 md:gap-4 border-[#dcfce7] hover:border-green-400"
                    data-cms-key={`site.challenge_after_${i}`}
                  >
                    <div className="after-icon-bg rounded-full w-7 md:w-8 h-7 md:h-8 flex items-center justify-center flex-shrink-0 bg-green-100 dark:bg-green-900/30">
                      <svg className="w-4 md:w-5 h-4 md:h-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm md:text-base text-[#1a1a1a] dark:text-[#f9fafb]">{item}</span>
                  </GlassCard>
                </MotionPress>
              ))}
            </StaggeredContainer>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// Solution Section Component - 新しい内容
function SolutionSection() {
  return (
    <section className="relative py-16 md:py-32 px-4 md:px-12 overflow-hidden bg-white dark:bg-[#0b1220]">
      <div className="relative max-w-[1100px] mx-auto">
        <AnimatedSection animation="zoom-in" className="relative text-center mb-12">
          <div className="relative space-y-4 md:space-y-6">
            <p className="text-sm md:text-base text-[#fdc700] font-medium tracking-widest">OUR APPROACH</p>
            <div className="relative inline-block">
              <span className="section-bg-text left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 text-[32px] sm:text-[48px] md:text-[64px] lg:text-[96px] xl:text-[120px] text-[#0b1220]/25 dark:text-white/25 absolute" style={{ opacity: 0.25 }}>APPROACH</span>
              <h2 className="text-[26px] sm:text-[32px] md:text-[42px] lg:text-[48px] font-bold text-[#1a1a1a] dark:text-[#f9fafb] leading-[36px] sm:leading-[44px] md:leading-[54px] lg:leading-[60px] tracking-tight px-2 relative">
                MAXELUSは
                <br />
                <span className="animate-text-gradient">オーダーメイド × 伴走</span>
                <br />
                で成果から逆算します
              </h2>
            </div>
          </div>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              ),
              title: "完全オーダーメイド",
              description: "テンプレートではなく、お客様のビジネス課題に合わせた完全カスタム設計",
            },
            {
              icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              ),
              title: "企画から運用まで伴走",
              description: "リリースして終わりではなく、運用・改善まで継続的にサポート",
            },
            {
              icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              ),
              title: "成果から逆算",
              description: "KPIを明確にし、ビジネス成果につながる機能を優先して開発",
            },
          ].map((item, i) => (
            <AnimatedSection key={i} animation="fade-up" delay={i * 100}>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#fff100] to-[#fdc700] rounded-full flex items-center justify-center text-[#1a1a1a] mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-[#1a1a1a] dark:text-[#f9fafb] mb-2">{item.title}</h3>
                <p className="text-[#6b7280] dark:text-[#9ca3af]">{item.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// Services Section Component - 新しい内容
function ServicesSection() {
  const services = [
    {
      title: "完全オーダーメイドアプリ開発",
      description: "AI × 最新手法。企画から運用まで伴走",
      link: "/lp/full-order-app-development"
    },
    {
      title: "業務DX設計・開発",
      description: "業務の「型」を見つけて、システム化の道筋を",
      link: "/lp/business-dx-design"
    },
    {
      title: "AI機能組込み・自動化",
      description: "要約/分類/検索/生成/動画分析。AIで業務を自動化",
      link: "/services"
    },
    {
      title: "ホームページ制作",
      description: "普通のHPも、3D/アニメーションみたいな『尖った表現』も対応",
      link: "/services"
    },
    {
      title: "プロダクト開発",
      description: "図面コネクト、インタラクティブWeb3Dなど",
      link: "/services"
    }
  ];

  return (
    <section className="bg-[#fafafa] dark:bg-[#1e293b] py-12 md:py-24 px-4 md:px-12 lg:px-24 relative overflow-hidden">
      <div className="max-w-[1100px] mx-auto relative">
        {/* Section heading */}
        <AnimatedSection animation="fade-up" className="relative text-center mb-8 md:mb-16">
          <div className="relative inline-block">
            <span className="section-bg-text left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 text-[32px] sm:text-[48px] md:text-[64px] lg:text-[96px] xl:text-[120px] text-[#0b1220]/25 dark:text-white/25 absolute" style={{ opacity: 0.25 }}>SERVICES</span>
            <h2 className="relative text-[24px] md:text-[32px] font-bold text-[#1a1a1a] dark:text-[#f9fafb] tracking-tight">
              対応できる内容
            </h2>
          </div>
        </AnimatedSection>
        
        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 justify-items-center sm:justify-items-stretch">
          {services.map((service, i) => (
            <AnimatedSection key={i} animation="fade-up" delay={i * 100} className="w-full sm:w-auto">
              <Link href={service.link} className="block w-full sm:w-auto">
                <GlassCard variant="light" padding="md" className="h-full w-full sm:max-w-[320px] group">
                  {/* Icon */}
                  <div className="mb-4 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-[#fff100]/10 rounded-xl group-hover:bg-[#fff100]/20 transition-colors">
                    <svg className="w-6 h-6 md:w-7 md:h-7 text-[#fff100]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-lg md:text-xl font-bold text-[#1a1a1a] dark:text-[#f9fafb] mb-2 md:mb-3 group-hover:text-[#fdc700] transition-colors">
                    {service.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-xs md:text-sm text-[#6b7280] dark:text-[#9ca3af] mb-4">
                    {service.description}
                  </p>
                  
                  {/* Arrow */}
                  <div className="flex items-center text-[#111] text-xs md:text-sm font-medium group-hover:translate-x-2 transition-transform">
                    <BubbleBadge variant="small">詳しく見る</BubbleBadge>
                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </GlassCard>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ServiceTypes Section Component - ホームページ・Webアプリ・iOSアプリ、全部できます
function ServiceTypesSection() {
  const [showDemoModal, setShowDemoModal] = useState(false);

  return (
    <>
      <section className="py-16 md:py-24 px-4 md:px-8 bg-[#fafafa] dark:bg-[#1e293b]">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="fade-up" className="relative">
            <div className="relative flex justify-center">
              <div className="relative inline-block">
                <span className="section-bg-text left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 text-[32px] sm:text-[48px] md:text-[64px] lg:text-[96px] xl:text-[120px] text-[#0b1220]/25 dark:text-white/25 absolute" style={{ opacity: 0.25 }}>SHOWCASE</span>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#1a1a1a] dark:text-[#f9fafb] text-center mb-3 md:mb-4 px-2 relative">
                  ホームページ・Webアプリ・iOSアプリ、全部できます
                </h2>
              </div>
            </div>
            <p className="text-sm sm:text-base text-[#6b7280] dark:text-[#9ca3af] text-center mb-8 sm:mb-12 md:mb-16 max-w-2xl mx-auto px-2 relative">
              実際のデモ画面で、完成イメージを体験してください。
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            {/* ホームページ */}
            <AnimatedSection animation="fade-up" delay={0} className="flex w-full">
              <TiltCard maxTilt={5} className="h-full w-full">
                <Link
                  href="/services"
                  className="bg-white dark:bg-[#0b1220] rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-full w-full block group flex flex-col"
                >
                  <div className="aspect-video bg-[#fafafa] dark:bg-[#1e293b] overflow-hidden relative flex items-center justify-center flex-shrink-0">
                    <Image 
                      src="/cases/homepage.png" 
                      alt="ホームページ"
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-contain hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4 md:p-6 flex-1 flex flex-col">
                    <h3 className="text-base sm:text-lg font-bold text-[#1a1a1a] dark:text-[#f9fafb] mb-2 group-hover:text-[#fdc700] transition-colors">ホームページ</h3>
                    <p className="text-xs sm:text-sm text-[#6b7280] dark:text-[#9ca3af] flex-1">WordPressではできない体験型Web</p>
                    <div className="mt-3 text-xs text-[#fff100] font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      詳しく見る
                      <svg className="w-3 h-3 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </TiltCard>
            </AnimatedSection>

            {/* Webアプリ */}
            <AnimatedSection animation="fade-up" delay={50} className="flex w-full">
              <TiltCard maxTilt={5} className="h-full w-full">
                <button
                  onClick={() => setShowDemoModal(true)}
                  className="bg-white dark:bg-[#0b1220] rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-full w-full block group text-left flex flex-col"
                >
                  <div className="aspect-video bg-[#fafafa] dark:bg-[#1e293b] overflow-hidden relative flex items-center justify-center flex-shrink-0">
                    <Image 
                      src="/cases/nail.png" 
                      alt="Webアプリ"
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-contain hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4 md:p-6 flex-1 flex flex-col">
                    <h3 className="text-base sm:text-lg font-bold text-[#1a1a1a] dark:text-[#f9fafb] mb-2 group-hover:text-[#fdc700] transition-colors">Webアプリ</h3>
                    <p className="text-xs sm:text-sm text-[#6b7280] dark:text-[#9ca3af] flex-1">業務効率化・DXアプリ</p>
                    <div className="mt-3 text-xs text-[#fff100] font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      デモを表示
                      <svg className="w-3 h-3 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </button>
              </TiltCard>
            </AnimatedSection>

            {/* iOSアプリ */}
            <AnimatedSection animation="fade-up" delay={100} className="flex w-full">
              <TiltCard maxTilt={5} className="h-full w-full">
                <Link
                  href="/lp/full-order-app-development"
                  className="bg-white dark:bg-[#0b1220] rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-full w-full block group flex flex-col"
                >
                  <div className="aspect-video bg-[#fafafa] dark:bg-[#1e293b] overflow-hidden relative flex items-center justify-center flex-shrink-0">
                    <Image 
                      src="/cases/IPhoneFrame-car.png" 
                      alt="iOSアプリ"
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-contain hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4 md:p-6 flex-1 flex flex-col">
                    <h3 className="text-base sm:text-lg font-bold text-[#1a1a1a] dark:text-[#f9fafb] mb-2 group-hover:text-[#fdc700] transition-colors">iOSアプリ</h3>
                    <p className="text-xs sm:text-sm text-[#6b7280] dark:text-[#9ca3af] flex-1">ネイティブアプリ開発</p>
                    <div className="mt-3 text-xs text-[#fff100] font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      詳しく見る
                      <svg className="w-3 h-3 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </TiltCard>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Demo Modal */}
      {showDemoModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setShowDemoModal(false)}
        >
          <div 
            className="relative bg-white dark:bg-[#0b1220] rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowDemoModal(false)}
              className="absolute top-4 right-4 z-10 bg-white/90 dark:bg-[#0b1220]/90 hover:bg-white dark:hover:bg-[#0b1220] rounded-full p-2 shadow-lg transition-all hover:scale-110"
              aria-label="閉じる"
            >
              <svg className="w-6 h-6 text-[#1a1a1a] dark:text-[#f9fafb]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-[#1a1a1a] dark:text-[#f9fafb] mb-4 text-center">サロン予約アプリデモ</h3>
              <SalonReservationAppMockup />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Works Section Component
function WorksSection() {
  const works = homeCasesData;

  return (
    <section id="works" className="bg-[#fafafa] dark:bg-[#1e293b] py-12 md:py-24 px-4 md:px-12 lg:px-24 relative overflow-hidden">
      <div className="max-w-[1100px] mx-auto">
        {/* Section heading */}
        <AnimatedSection animation="fade-up" className="relative text-center mb-8 md:mb-16">
          <div className="relative inline-block">
            <span className="section-bg-text left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 text-[32px] sm:text-[48px] md:text-[64px] lg:text-[96px] xl:text-[120px] text-[#0b1220]/25 dark:text-white/25 absolute" style={{ opacity: 0.25 }}>CASES</span>
            <div className="relative space-y-2 md:space-y-4">
              <h2 
                data-cms-key="site.works_title"
                className="text-[24px] md:text-[32px] font-bold text-[#1a1a1a] dark:text-[#f9fafb] tracking-tight"
              >
              事例
            </h2>
            <p 
              data-cms-key="site.works_subtitle"
              className="text-sm md:text-lg text-[#6b7280] dark:text-[#9ca3af] px-4"
            >
              製造業、医療、建設など、幅広い業種で実績があります
            </p>
            </div>
          </div>
        </AnimatedSection>
        
        {/* Stats */}
        <AnimatedSection animation="fade-up" delay={200} className="flex justify-center gap-6 sm:gap-10 md:gap-16 mb-8 md:mb-12">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a1a1a] dark:text-[#f9fafb]">
              <AnimatedCounter end={50} suffix="+" className="animate-text-gradient" />
            </div>
            <p 
              data-cms-key="site.works_stat_1_label"
              className="text-xs md:text-sm text-[#6b7280] dark:text-[#9ca3af] mt-1 md:mt-2"
            >
              プロジェクト実績
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a1a1a] dark:text-[#f9fafb]">
              <AnimatedCounter end={98} suffix="%" className="animate-text-gradient" />
            </div>
            <p 
              data-cms-key="site.works_stat_2_label"
              className="text-xs md:text-sm text-[#6b7280] dark:text-[#9ca3af] mt-1 md:mt-2"
            >
              顧客満足度
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a1a1a] dark:text-[#f9fafb]">
              <AnimatedCounter end={15} suffix="+" className="animate-text-gradient" />
            </div>
            <p 
              data-cms-key="site.works_stat_3_label"
              className="text-xs md:text-sm text-[#6b7280] dark:text-[#9ca3af] mt-1 md:mt-2"
            >
              業界対応
            </p>
          </div>
        </AnimatedSection>
        
        {/* Works grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
          {works.map((work, i) => (
            <AnimatedSection key={work.id} animation="fade-up" delay={i * 150}>
              <TiltCard maxTilt={5} className="h-full">
                {work.hasLP && work.lpHref ? (
                  <Link 
                    href={work.lpHref} 
                    className="works-card block h-full group relative z-10 cursor-pointer"
                    prefetch={true}
                  >
                    <GlassCard variant="light" padding="none" className="h-full overflow-hidden">
                      <div className="aspect-video overflow-hidden relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={work.image} alt={work.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="eager" decoding="async" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                          <span className="text-white text-sm">詳しく見る →</span>
                        </div>
                      </div>
                      <div className="p-4 md:p-6">
                      <div className="mb-1 md:mb-2">
                        <BubbleBadge variant="small">{work.category}</BubbleBadge>
                      </div>
                      <h3 className="text-base md:text-lg font-bold text-[#0b1220] mb-1 md:mb-2 group-hover:text-[#fdc700] transition-colors line-clamp-2">{work.title}</h3>
                      <p className="text-xs md:text-sm text-[#666] mb-2 line-clamp-2">{work.description}</p>
                      {work.outcome && (
                        <div className="mb-3">
                          <BubbleBadge variant="small">{work.outcome}</BubbleBadge>
                        </div>
                      )}
                      {work.serviceTags && work.serviceTags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {work.serviceTags.slice(0, 3).map((tag, j) => (
                            <span key={j} className="text-xs px-2 py-0.5 bg-[#fafafa] dark:bg-[#0b1220] text-[#6b7280] dark:text-[#9ca3af] rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center text-[#111] text-xs md:text-sm group-hover:translate-x-2 transition-transform">
                        <BubbleBadge variant="small">詳しく見る</BubbleBadge>
                        <svg className="w-3 md:w-4 h-3 md:h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                      </div>
                    </GlassCard>
                  </Link>
                ) : (
                  <GlassCard variant="light" padding="none" className="h-full overflow-hidden">
                    <div className="aspect-video overflow-hidden relative">
                      <Image 
                        src={work.image} 
                        alt={work.title} 
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-700" 
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-4 md:p-6">
                      <div className="mb-1 md:mb-2">
                        <BubbleBadge variant="small">{work.category}</BubbleBadge>
                      </div>
                      <h3 className="text-base md:text-lg font-bold text-[#0b1220] mb-1 md:mb-2 group-hover:text-[#fdc700] transition-colors line-clamp-2">{work.title}</h3>
                      <p className="text-xs md:text-sm text-[#666] mb-2 line-clamp-2">{work.description}</p>
                      {work.outcome && (
                        <div className="mb-3">
                          <BubbleBadge variant="small">{work.outcome}</BubbleBadge>
                        </div>
                      )}
                      {work.serviceTags && work.serviceTags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {work.serviceTags.slice(0, 3).map((tag, j) => (
                            <span key={j} className="text-xs px-2 py-0.5 bg-[#fafafa] dark:bg-[#0b1220] text-[#6b7280] dark:text-[#9ca3af] rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center text-[#6b7280] text-xs md:text-sm">
                        準備中
                      </div>
                    </div>
                  </GlassCard>
                )}
              </TiltCard>
            </AnimatedSection>
          ))}
        </div>
        
        {/* View all button */}
        <AnimatedSection animation="fade-up" delay={500} className="text-center">
          <Link href="/cases" className="btn-outline inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 text-base md:text-lg group relative overflow-hidden">
            <span className="relative z-10 group-hover:text-white transition-colors">事例一覧へ</span>
            <div className="absolute inset-0 bg-[#1a1a1a] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}

// FAQ Section Component
function FAQSection() {
  const faqs = [
    {
      question: "料金はどれくらいかかりますか？",
      answer: "30万円〜対応可能です。内容や規模により異なりますので、まずは無料相談でご要望をお聞かせください。お見積りを提示いたします。"
    },
    {
      question: "開発期間はどれくらいですか？",
      answer: "プロジェクト規模により異なりますが、シンプルなLPなら2週間〜、Webアプリなら1〜3ヶ月が目安です。デモ提示後に正確なスケジュールをご提示します。"
    },
    {
      question: "途中で仕様変更できますか？",
      answer: "デモ提示の段階で認識を合わせるため、大きな手戻りは発生しにくい仕組みです。軽微な修正は柔軟に対応しますが、大幅な変更は追加費用が発生する場合があります。"
    },
    {
      question: "運用・保守もお願いできますか？",
      answer: "はい、運用・保守も対応可能です。月額での保守契約や、都度対応など、ご要望に合わせてプランをご提案します。"
    },
    {
      question: "契約の流れを教えてください",
      answer: "無料相談 → デモ提示 → お見積り → 契約 → 開発 → 納品 の流れです。各ステップで確認しながら進めるため、安心してご依頼いただけます。"
    },
    {
      question: "業界は問わず対応できますか？",
      answer: "はい、製造業、医療、建設、不動産、飲食など、業界問わず対応可能です。お客様の業務内容をヒアリングし、最適なソリューションをご提案します。"
    }
  ];

  return (
    <section className="bg-[#fafafa] dark:bg-[#1e293b] py-12 md:py-24 px-4 md:px-12 lg:px-40 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-40 md:w-64 h-40 md:h-64 bg-[#fff100]/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-40 md:w-64 h-40 md:h-64 bg-[#fdc700]/5 rounded-full blur-3xl -translate-y-1/2" />
      
      <div className="max-w-[900px] mx-auto relative">
        {/* Section heading */}
        <AnimatedSection animation="fade-up" className="relative text-center mb-8 md:mb-16">
          <div className="relative inline-block">
            <span className="section-bg-text left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 text-[32px] sm:text-[48px] md:text-[64px] lg:text-[96px] xl:text-[120px] text-[#0b1220]/25 dark:text-white/25 absolute" style={{ opacity: 0.25 }}>FAQ</span>
            <h2 
              data-cms-key="site.faq_title"
              className="relative text-[24px] md:text-[32px] font-bold text-[#1a1a1a] dark:text-[#f9fafb] tracking-tight"
            >
              よくある質問
            </h2>
          </div>
        </AnimatedSection>
        
        {/* FAQ list */}
        <StaggeredContainer className="space-y-3 md:space-y-4" staggerDelay={100}>
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className="faq-card p-4 md:p-6 group hover:shadow-lg transition-all duration-300 hover:border-[#fff100] cursor-pointer bg-white dark:bg-[#0b1220] border border-[#e5e7eb] dark:border-[#374151] rounded-lg"
            >
              <h3 className="text-base md:text-xl text-[#1a1a1a] dark:text-[#f9fafb] mb-2 md:mb-3 flex items-start md:items-center gap-2 md:gap-3">
                <span className="w-6 md:w-8 h-6 md:h-8 bg-[#fff100] rounded-full flex items-center justify-center text-xs md:text-sm font-bold text-[#1a1a1a] group-hover:scale-110 transition-transform flex-shrink-0 mt-0.5 md:mt-0">
                  Q
                </span>
                <span 
                  data-cms-key={`site.faq_${i}_q`}
                  className="group-hover:text-[#fdc700] transition-colors"
                >
                  {faq.question}
                </span>
              </h3>
              <p 
                data-cms-key={`site.faq_${i}_a`}
                className="text-sm md:text-base text-[#6b7280] dark:text-[#9ca3af] leading-6 pl-8 md:pl-11"
              >
                {faq.answer}
              </p>
            </div>
          ))}
        </StaggeredContainer>
      </div>
    </section>
  );
}

// CTA Section Component - 新しい内容
function CTASection({ settings }: { settings: { cta_section_title?: string; cta_section_subtitle?: string; cta_primary_text?: string; cta_primary_href?: string; cta_secondary_text?: string; cta_secondary_href?: string } | null }) {
  const primaryHref = settings?.cta_primary_href || '/contact';
  const secondaryHref = settings?.cta_secondary_href || '/cases';
  const primaryText = settings?.cta_primary_text || '無料相談する';
  const secondaryText = settings?.cta_secondary_text || '事例を見る';
  const sectionTitle = settings?.cta_section_title || '今、動かないことが\n最大の機会損失です';
  const sectionSubtitle = settings?.cta_section_subtitle || 'デジタル市場は日々変化し、競合は着実に前進しています。「いつか作ろう」と先延ばしにしている間に、ユーザーは他社のサービスに流れていきます。\n\n今すぐ始めれば、3ヶ月後には成果が見え始めます。\n\nまずは無料相談で、あなたのビジネス課題を聞かせてください。\n具体的な解決策と概算お見積りをご提案します。';

  return (
    <section className="relative min-h-[400px] md:min-h-[600px] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1920&q=80')`,
        }}
      />
      
      {/* Dark Overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/80 via-[#0f172a]/85 to-[#0f172a]/90" />
      
      {/* Animated particles - fewer on mobile */}
      <div className="absolute inset-0 hidden md:block">
        {[...Array(20)].map((_, i) => (
          <FloatingElement 
            key={i}
            className="absolute"
            amplitude={Math.random() * 30 + 10}
            duration={Math.random() * 3 + 3}
            delay={Math.random() * 2}
          >
            <div 
              className="w-1 h-1 bg-[#fff100] rounded-full opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          </FloatingElement>
        ))}
      </div>
      
      {/* Background Text */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <span className="text-[60px] sm:text-[100px] md:text-[180px] font-bold text-white/[0.03] tracking-wider whitespace-nowrap select-none">
          DECISION
        </span>
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[400px] md:min-h-[600px] px-4 md:px-8 py-12 md:py-20">
        <AnimatedSection animation="zoom-in" className="max-w-[800px] mx-auto text-center">
          <h2 
            data-cms-key="site.cta_section_title"
            className="text-[24px] sm:text-[32px] md:text-[44px] font-bold text-white leading-tight mb-4 md:mb-6 px-2"
          >
            {sectionTitle.split('\n').map((line, i) => (
              <span key={i}>
                {line.includes('"自社に最適化"') ? (
                  <>
                    {line.split('"自社に最適化"')[0]}
                    <span className="animate-text-gradient">&quot;自社に最適化&quot;</span>
                    {line.split('"自社に最適化"')[1]}
                  </>
                ) : line}
                {i < sectionTitle.split('\n').length - 1 && <br />}
              </span>
            ))}
          </h2>
          <AnimatedSection animation="fade-up" delay={500}>
            <p 
              data-cms-key="site.cta_section_subtitle"
              className="text-base md:text-xl text-white/70 mb-6 md:mb-10 px-4"
            >
              {sectionSubtitle}
            </p>
          </AnimatedSection>
          <AnimatedSection animation="fade-up" delay={700}>
            <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 px-4">
              <Link 
                href={primaryHref} 
                prefetch={true}
                className="inline-flex items-center justify-center gap-2 md:gap-3 bg-[#fff100] hover:bg-[#fdc700] text-[#1a1a1a] font-medium px-6 md:px-10 py-3 md:py-5 rounded-xl text-base md:text-lg transition-all hover:scale-105 shadow-lg animate-pulse-glow group"
              >
                {primaryText}
                <svg className="w-4 md:w-5 h-4 md:h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link 
                href={secondaryHref} 
                prefetch={true}
                className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-medium px-6 md:px-10 py-3 md:py-5 rounded-xl text-base md:text-lg border border-white/30 transition-all hover:scale-105 backdrop-blur-sm"
              >
                {secondaryText}
              </Link>
            </div>
          </AnimatedSection>
        </AnimatedSection>
      </div>
    </section>
  );
}

// Main Page Component
export default function Home() {
  // CMS機能をコメントアウト（将来の復旧用）
  // データベースから取得する代わりに、デフォルト値を直接使用
  const [settings] = useState<{ 
    cta_primary_text?: string; 
    cta_primary_href?: string; 
    cta_secondary_text?: string; 
    cta_secondary_href?: string;
    cta_section_title?: string;
    cta_section_subtitle?: string;
  } | null>({
    cta_primary_text: '無料相談する',
    cta_primary_href: '/contact',
    cta_secondary_text: '事例を見る',
    cta_secondary_href: '/cases',
    cta_section_title: '社内業務の効率化と\n売上拡大を加速させませんか？',
    cta_section_subtitle: 'オーダーメイドのアプリとホームページで、競合に差をつけ、成長を加速させましょう。\n\nまずは無料相談で、課題整理→触れるデモ提示まで一緒に進めます。',
  });

  // CMS機能をコメントアウト（将来の復旧用）
  // useEffect(() => {
  //   const fetchSettings = async () => {
  //     try {
  //       const res = await fetch('/api/cms/site');
  //       const result = await res.json();
  //       if (result.ok && result.data) {
  //         setSettings({
  //           cta_primary_text: result.data.cta_primary_text,
  //           cta_primary_href: result.data.cta_primary_href,
  //           cta_secondary_text: result.data.cta_secondary_text,
  //           cta_secondary_href: result.data.cta_secondary_href,
  //           cta_section_title: result.data.cta_section_title,
  //           cta_section_subtitle: result.data.cta_section_subtitle,
  //         });
  //       }
  //     } catch (error) {
  //       console.error('Failed to fetch site settings:', error);
  //     }
  //   };
  //   fetchSettings();
  // }, []);

  return (
    <ParallaxProvider>
      <div className="min-h-screen font-sans relative overflow-x-hidden">
        {/* Lightweight Gradient Orbs - CSS only, no JS */}
        <GradientOrbs />
        
        <main className="pt-14 md:pt-16">
          <HeroSection settings={settings} />
          <SolutionSection />
          <ServicesSection />
          <ChallengeSection />
          {/* <InteractiveDemo /> */}
          {/* サロン予約アプリのデモ */}
          <section className="bg-white dark:bg-[#0b1220] py-12 md:py-32 px-4 md:px-8 relative overflow-hidden">
            <div className="max-w-[1200px] mx-auto relative">
              <div className="text-center mb-8 md:mb-12">
                <div className="relative inline-block">
                  <span className="section-bg-text left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 text-[32px] sm:text-[48px] md:text-[64px] lg:text-[96px] xl:text-[120px] text-[#0b1220]/25 dark:text-white/25 absolute" style={{ opacity: 0.25 }}>DEMO</span>
                  <h2 className="text-2xl md:text-4xl font-bold text-[#0a0a0a] dark:text-[#f9fafb] mb-4 relative">
                    触れるデモで合意
                  </h2>
                </div>
                <p className="text-sm md:text-base text-[#6a7282] dark:text-[#9ca3af] max-w-2xl mx-auto relative">
                  実際に動くデモアプリで、完成イメージを共有します。<br className="hidden sm:block" />
                  デザインと機能の両方を体験いただけます。
                </p>
              </div>
              <div className="relative bg-gradient-to-b from-[#fafafa] dark:from-[#1e293b] via-white dark:via-[#0b1220] to-[#fffef0] dark:to-[#0a0a0a] rounded-2xl md:rounded-3xl p-2 sm:p-4 md:p-6 lg:p-8 shadow-xl md:shadow-2xl hover:shadow-3xl transition-shadow duration-500 overflow-hidden">
                <div className="w-full overflow-x-auto">
                  <SalonReservationAppMockup />
                </div>
                <p className="text-center text-xs md:text-sm text-[#6a7282] dark:text-[#9ca3af] mt-4 md:mt-6 px-2">
                  ※上記はインタラクティブなデモUIです。タップ/クリックして動作をお試しください。<br className="hidden sm:block" />
                  実案件では要件に合わせて最適化します
                </p>
              </div>
            </div>
          </section>
          <WorksSection />
          <StorySlider />
          <ServiceTypesSection />
          <FAQSection />
          <CTASection settings={settings} />
        </main>
        <Footer />
      </div>
    </ParallaxProvider>
  );
}
