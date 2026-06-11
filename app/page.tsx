"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import Footer from "./components/Footer";
import {
  AnimatedSection,
  StaggeredContainer,
  FloatingElement,
  TiltCard,
  ParallaxProvider,
  GradientOrbs
} from "./components/AnimationProvider";
import HeroAppSlider from "./components/hero/HeroAppSlider";
import { GlassCard, BubbleBadge, MotionPress } from "../components/ui";

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

// Hero Section Component - シンプルな実装
function HeroSection({ settings }: { settings: { cta_primary_text?: string; cta_primary_href?: string; cta_secondary_text?: string; cta_secondary_href?: string } | null }) {
  const primaryHref = settings?.cta_primary_href || '/contact';
  const secondaryHref = settings?.cta_secondary_href || '/services';
  const primaryText = settings?.cta_primary_text || '無料相談する';
  const secondaryText = settings?.cta_secondary_text || 'サービスを見る';

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
                    className="inline-flex items-center justify-center bg-[#fff100] hover:bg-[#fdc700] text-[#1a1a1a] font-medium px-5 md:px-6 py-2.5 md:py-3 rounded-full text-sm md:text-base transition-all hover:scale-105 shadow-lg"
                  >
                    {primaryText}
                  </Link>
                  <Link
                    href={secondaryHref}
                    prefetch={true}
                    className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-medium px-5 md:px-6 py-2.5 md:py-3 rounded-full text-sm md:text-base transition-all hover:scale-105 backdrop-blur-sm border border-white/20"
                  >
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
    <section className="relative py-16 md:py-32 px-4 md:px-12 overflow-hidden bg-white">
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed opacity-5"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1920&q=80')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#fafafa] via-[#f5f5f5] to-[#fafafa]" />
      <div className="relative max-w-[1100px] mx-auto">
        {/* Section heading */}
        <AnimatedSection animation="fade-up" className="relative text-center mb-10 md:mb-16">
          <p className="text-sm md:text-base text-[#fdc700] font-medium tracking-widest mb-2">PROBLEM</p>
          <div className="relative inline-block">
            <span className="section-bg-text left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 text-[32px] sm:text-[48px] md:text-[64px] lg:text-[96px] xl:text-[120px] text-[#0b1220]/25 absolute" style={{ opacity: 0.25 }}>CHALLENGE</span>
            <h2 
              data-cms-key="site.challenge_title"
              className="relative text-[26px] md:text-[36px] lg:text-[42px] font-bold text-[#1a1a1a] tracking-tight"
            >
              課題は&quot;ズレ&quot;から起きる
            </h2>
          </div>
          <p 
            data-cms-key="site.challenge_subtitle"
            className="text-sm md:text-base text-[#6b7280] mt-3 max-w-xl mx-auto"
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
                    className="border-l-4 border-l-red-300 hover:border-red-300"
                    data-cms-key={`site.challenge_before_${i}`}
                  >
                    <span className="text-sm md:text-base text-[#1a1a1a]">{item}</span>
                  </GlassCard>
                </MotionPress>
              ))}
            </StaggeredContainer>
          </AnimatedSection>
          
          {/* Arrow */}
          <AnimatedSection animation="zoom-in" delay={400} className="my-2 md:my-0">
            <span className="block text-3xl md:text-4xl font-bold text-[#fdc700] rotate-90 md:rotate-0 select-none" aria-hidden="true">→</span>
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
                    className="border-l-4 border-l-green-400 hover:border-green-400"
                    data-cms-key={`site.challenge_after_${i}`}
                  >
                    <span className="text-sm md:text-base text-[#1a1a1a]">{item}</span>
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
    <section className="relative py-16 md:py-32 px-4 md:px-12 overflow-hidden bg-white">
      <div className="relative max-w-[1100px] mx-auto">
        <AnimatedSection animation="zoom-in" className="relative text-center mb-12">
          <div className="relative space-y-4 md:space-y-6">
            <p className="text-sm md:text-base text-[#fdc700] font-medium tracking-widest">OUR APPROACH</p>
            <div className="relative inline-block">
              <span className="section-bg-text left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 text-[32px] sm:text-[48px] md:text-[64px] lg:text-[96px] xl:text-[120px] text-[#0b1220]/25 absolute" style={{ opacity: 0.25 }}>APPROACH</span>
              <h2 className="text-[26px] sm:text-[32px] md:text-[42px] lg:text-[48px] font-bold text-[#1a1a1a] leading-[36px] sm:leading-[44px] md:leading-[54px] lg:leading-[60px] tracking-tight px-2 relative">
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
              title: "完全オーダーメイド",
              description: "テンプレートではなく、お客様のビジネス課題に合わせた完全カスタム設計",
            },
            {
              title: "企画から運用まで伴走",
              description: "リリースして終わりではなく、運用・改善まで継続的にサポート",
            },
            {
              title: "成果から逆算",
              description: "KPIを明確にし、ビジネス成果につながる機能を優先して開発",
            },
          ].map((item, i) => (
            <AnimatedSection key={i} animation="fade-up" delay={i * 100}>
              <div className="text-center">
                <p className="text-3xl font-bold text-[#fdc700] tracking-[0.2em] tabular-nums">0{i + 1}</p>
                <div className="mx-auto mt-3 mb-4 h-px w-10 bg-[#e5e7eb]" />
                <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">{item.title}</h3>
                <p className="text-[#6b7280]">{item.description}</p>
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
    <section className="bg-[#fafafa] py-12 md:py-24 px-4 md:px-12 lg:px-24 relative overflow-hidden">
      <div className="max-w-[1100px] mx-auto relative">
        {/* Section heading */}
        <AnimatedSection animation="fade-up" className="relative text-center mb-8 md:mb-16">
          <div className="relative inline-block">
            <span className="section-bg-text left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 text-[32px] sm:text-[48px] md:text-[64px] lg:text-[96px] xl:text-[120px] text-[#0b1220]/25 absolute" style={{ opacity: 0.25 }}>SERVICES</span>
            <h2 className="relative text-[24px] md:text-[32px] font-bold text-[#1a1a1a] tracking-tight">
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
                  {/* Number */}
                  <div className="mb-4">
                    <span className="text-sm font-bold tracking-[0.25em] text-[#fdc700] tabular-nums">0{i + 1}</span>
                    <div className="mt-3 h-px w-10 bg-[#e5e7eb] group-hover:w-16 group-hover:bg-[#fdc700] transition-all duration-300" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg md:text-xl font-bold text-[#1a1a1a] mb-2 md:mb-3 group-hover:text-[#fdc700] transition-colors">
                    {service.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-xs md:text-sm text-[#6b7280] mb-4">
                    {service.description}
                  </p>
                  
                  {/* Link label */}
                  <div className="flex items-center text-[#111] text-xs md:text-sm font-medium group-hover:translate-x-1 transition-transform">
                    <BubbleBadge variant="small">詳しく見る</BubbleBadge>
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
      <section className="py-16 md:py-24 px-4 md:px-8 bg-[#fafafa]">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="fade-up" className="relative">
            <div className="relative flex justify-center">
              <div className="relative inline-block">
                <span className="section-bg-text left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 text-[32px] sm:text-[48px] md:text-[64px] lg:text-[96px] xl:text-[120px] text-[#0b1220]/25 absolute" style={{ opacity: 0.25 }}>SHOWCASE</span>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#1a1a1a] text-center mb-3 md:mb-4 px-2 relative">
                  ホームページ・Webアプリ・iOSアプリ、全部できます
                </h2>
              </div>
            </div>
            <p className="text-sm sm:text-base text-[#6b7280] text-center mb-8 sm:mb-12 md:mb-16 max-w-2xl mx-auto px-2 relative">
              実際のデモ画面で、完成イメージを体験してください。
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            {/* ホームページ */}
            <AnimatedSection animation="fade-up" delay={0} className="flex w-full">
              <TiltCard maxTilt={5} className="h-full w-full">
                <Link
                  href="/services"
                  className="bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-full w-full block group flex flex-col"
                >
                  <div className="aspect-video bg-[#fafafa] overflow-hidden relative flex items-center justify-center flex-shrink-0">
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
                    <h3 className="text-base sm:text-lg font-bold text-[#1a1a1a] mb-2 group-hover:text-[#fdc700] transition-colors">ホームページ</h3>
                    <p className="text-xs sm:text-sm text-[#6b7280] flex-1">WordPressではできない体験型Web</p>
                    <div className="mt-3 text-xs text-[#fff100] font-medium group-hover:translate-x-1 transition-transform">
                      詳しく見る
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
                  className="bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-full w-full block group text-left flex flex-col"
                >
                  <div className="aspect-video bg-[#fafafa] overflow-hidden relative flex items-center justify-center flex-shrink-0">
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
                    <h3 className="text-base sm:text-lg font-bold text-[#1a1a1a] mb-2 group-hover:text-[#fdc700] transition-colors">Webアプリ</h3>
                    <p className="text-xs sm:text-sm text-[#6b7280] flex-1">業務効率化・DXアプリ</p>
                    <div className="mt-3 text-xs text-[#fff100] font-medium group-hover:translate-x-1 transition-transform">
                      デモを表示
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
                  className="bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-full w-full block group flex flex-col"
                >
                  <div className="aspect-video bg-[#fafafa] overflow-hidden relative flex items-center justify-center flex-shrink-0">
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
                    <h3 className="text-base sm:text-lg font-bold text-[#1a1a1a] mb-2 group-hover:text-[#fdc700] transition-colors">iOSアプリ</h3>
                    <p className="text-xs sm:text-sm text-[#6b7280] flex-1">ネイティブアプリ開発</p>
                    <div className="mt-3 text-xs text-[#fff100] font-medium group-hover:translate-x-1 transition-transform">
                      詳しく見る
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
            className="relative bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={() => setShowDemoModal(false)}
                className="bg-white/90 hover:bg-white rounded-full px-4 py-2 text-sm font-medium text-[#1a1a1a] shadow-lg transition-all hover:scale-105"
              >
                閉じる
              </button>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4 text-center">サロン予約アプリデモ</h3>
              <SalonReservationAppMockup />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// CTA Section Component - 新しい内容
function CTASection({ settings }: { settings: { cta_section_title?: string; cta_section_subtitle?: string; cta_primary_text?: string; cta_primary_href?: string; cta_secondary_text?: string; cta_secondary_href?: string } | null }) {
  const primaryHref = settings?.cta_primary_href || '/contact';
  const secondaryHref = settings?.cta_secondary_href || '/services';
  const primaryText = settings?.cta_primary_text || '無料相談する';
  const secondaryText = settings?.cta_secondary_text || 'サービスを見る';
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
                className="inline-flex items-center justify-center bg-[#fff100] hover:bg-[#fdc700] text-[#1a1a1a] font-medium px-6 md:px-10 py-3 md:py-5 rounded-xl text-base md:text-lg transition-all hover:scale-105 shadow-lg animate-pulse-glow"
              >
                {primaryText}
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
    cta_secondary_text: 'サービスを見る',
    cta_secondary_href: '/services',
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
          <section className="bg-white py-12 md:py-32 px-4 md:px-8 relative overflow-hidden">
            <div className="max-w-[1200px] mx-auto relative">
              <div className="text-center mb-8 md:mb-12">
                <div className="relative inline-block">
                  <span className="section-bg-text left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 text-[32px] sm:text-[48px] md:text-[64px] lg:text-[96px] xl:text-[120px] text-[#0b1220]/25 absolute" style={{ opacity: 0.25 }}>DEMO</span>
                  <h2 className="text-2xl md:text-4xl font-bold text-[#0a0a0a] mb-4 relative">
                    触れるデモで合意
                  </h2>
                </div>
                <p className="text-sm md:text-base text-[#6a7282] max-w-2xl mx-auto relative">
                  実際に動くデモアプリで、完成イメージを共有します。<br className="hidden sm:block" />
                  デザインと機能の両方を体験いただけます。
                </p>
              </div>
              <div className="relative bg-gradient-to-b from-[#fafafa] via-white to-[#fffef0] rounded-2xl md:rounded-3xl p-2 sm:p-4 md:p-6 lg:p-8 shadow-xl md:shadow-2xl hover:shadow-3xl transition-shadow duration-500 overflow-hidden">
                <div className="w-full overflow-x-auto">
                  <SalonReservationAppMockup />
                </div>
                <p className="text-center text-xs md:text-sm text-[#6a7282] mt-4 md:mt-6 px-2">
                  ※上記はインタラクティブなデモUIです。タップ/クリックして動作をお試しください。<br className="hidden sm:block" />
                  実案件では要件に合わせて最適化します
                </p>
              </div>
            </div>
          </section>
          <StorySlider />
          <ServiceTypesSection />
          <CTASection settings={settings} />
        </main>
        <Footer />
      </div>
    </ParallaxProvider>
  );
}
