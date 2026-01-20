"use client";

import { useState } from "react";
import InteractiveDemo from "./components/InteractiveDemo";
import StorySlider from "./components/StorySlider";
import { 
  AnimatedSection, 
  StaggeredContainer, 
  TextReveal, 
  AnimatedCounter, 
  FloatingElement,
  Magnetic,
  TiltCard,
  ParallaxProvider,
  CursorFollower,
  ParticleBackground
} from "./components/AnimationProvider";

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
const imgLogo = "https://www.figma.com/api/mcp/asset/bab5858e-9bd6-4cc7-9783-62ba4339b159";

// Header Component
function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-[#e5e7eb] sticky top-0 z-50">
      <div className="flex items-center justify-between h-14 md:h-16 px-4 md:px-8 max-w-[1200px] mx-auto">
        <Magnetic>
          <a href="/" className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imgLogo} alt="マクセラス" className="h-8 md:h-10 w-auto" />
          </a>
        </Magnetic>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="/" className="text-sm text-[#0b1220] nav-link font-medium relative group">
            ホーム
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#fff100] transition-all duration-300 group-hover:w-full" />
          </a>
          <a href="/works" className="text-sm text-[#666] nav-link relative group">
            実績
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#fff100] transition-all duration-300 group-hover:w-full" />
          </a>
          <a href="/contact" className="text-sm text-[#666] nav-link relative group">
            お問い合わせ
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#fff100] transition-all duration-300 group-hover:w-full" />
          </a>
          <Magnetic strength={0.2}>
            <a href="/contact" className="btn-primary px-6 py-2 text-base font-normal animate-pulse-glow">
              無料相談する
            </a>
          </Magnetic>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-[#e5e7eb] animate-fade-in">
          <nav className="flex flex-col p-4 gap-4">
            <a href="/" className="text-base text-[#0b1220] font-medium py-2" onClick={() => setMobileMenuOpen(false)}>
              ホーム
            </a>
            <a href="/works" className="text-base text-[#666] py-2" onClick={() => setMobileMenuOpen(false)}>
              実績
            </a>
            <a href="/contact" className="text-base text-[#666] py-2" onClick={() => setMobileMenuOpen(false)}>
              お問い合わせ
            </a>
            <a href="/contact" className="btn-primary px-6 py-3 text-base font-normal text-center" onClick={() => setMobileMenuOpen(false)}>
              無料相談する
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

// Hero Section Component
function HeroSection() {
  return (
    <section className="relative bg-hero-gradient overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-[0.02] grid-pattern" />
      <div className="absolute top-20 left-10 w-48 md:w-72 h-48 md:h-72 bg-[#fff100]/10 rounded-full blur-[80px] md:blur-[100px] animate-morph" />
      <div className="absolute bottom-10 right-10 w-64 md:w-96 h-64 md:h-96 bg-[#fdc700]/10 rounded-full blur-[100px] md:blur-[120px] animate-morph" style={{ animationDelay: "-4s" }} />
      
      {/* Floating decorative elements - hidden on mobile */}
      <FloatingElement className="absolute top-32 right-20 opacity-20 hidden md:block" amplitude={15} duration={4}>
        <div className="w-4 h-4 bg-[#fff100] rounded-full" />
      </FloatingElement>
      <FloatingElement className="absolute top-48 left-32 opacity-20 hidden md:block" amplitude={12} duration={3.5} delay={0.5}>
        <div className="w-3 h-3 bg-[#fdc700] rounded-full" />
      </FloatingElement>
      <FloatingElement className="absolute bottom-40 left-20 opacity-15 hidden md:block" amplitude={18} duration={4.5} delay={1}>
        <div className="w-5 h-5 bg-[#fff100] rotate-45" />
      </FloatingElement>
      
      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-28">
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
          {/* Left content */}
          <div className="flex-1 max-w-full lg:max-w-[450px] space-y-4 md:space-y-6 text-center lg:text-left">
            <AnimatedSection animation="fade-up" duration={800}>
              <h1 className="text-[28px] sm:text-[36px] md:text-[44px] lg:text-[52px] font-bold leading-[36px] sm:leading-[46px] md:leading-[54px] lg:leading-[62px] tracking-tight text-[#1a1a1a]">
                そのソフト、現場に合わせて
                <br />
                <span className="animate-text-gradient">&quot;我慢して&quot;</span>
                使っていませんか？
              </h1>
            </AnimatedSection>
            <AnimatedSection animation="fade-up" delay={300} duration={800}>
              <p className="text-base md:text-lg text-[#6b7280] leading-[26px] md:leading-[29px]">
                業務にソフトを合わせる時代は終わり。<br className="hidden sm:block" />
                まずは&quot;触れるデモ&quot;で、最短ルートを見える化します。
              </p>
            </AnimatedSection>
            <AnimatedSection animation="fade-up" delay={500} duration={800}>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 md:pt-4 justify-center lg:justify-start">
                <a href="/contact" className="btn-primary flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg group relative overflow-hidden">
                  <span className="relative z-10">無料相談する</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imgArrowIcon} alt="" className="w-5 md:w-6 h-5 md:h-6 relative z-10 transition-transform group-hover:translate-x-1" />
                  <div className="absolute inset-0 bg-[#fdc700] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
                </a>
                <a href="/works" className="btn-outline flex items-center justify-center px-6 md:px-8 py-3 md:py-4 text-base md:text-lg hover:bg-[#1a1a1a] hover:text-white transition-all duration-300">
                  実績を見る
                </a>
              </div>
            </AnimatedSection>
          </div>
          {/* Right content - Demo image */}
          <AnimatedSection animation="fade-up" delay={200} duration={1000} className="flex-1 relative w-full max-w-[500px] lg:max-w-none">
            <div className="absolute inset-0 blur-[64px] bg-gradient-to-br from-[rgba(255,241,0,0.2)] via-[rgba(255,215,0,0.1)] to-transparent animate-morph" />
            <TiltCard maxTilt={8} className="relative bg-white border border-[#e5e7eb] rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imgHeroDemo} alt="アプリ開発デモ画面" className="w-full h-auto" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
            </TiltCard>
          </AnimatedSection>
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
    <section className="bg-[#fafafa] py-12 md:py-24 px-4 md:px-12 overflow-hidden">
      <div className="max-w-[1100px] mx-auto">
        {/* Section heading */}
        <AnimatedSection animation="fade-up" className="relative text-center mb-8 md:mb-12">
          <span className="section-bg-text left-1/2 -translate-x-1/2 -top-6 md:-top-12 text-[40px] md:text-[80px]">CHALLENGE</span>
          <h2 className="relative text-[24px] md:text-[32px] font-bold text-[#1a1a1a] tracking-tight">
            課題は&quot;ズレ&quot;から起きる
          </h2>
        </AnimatedSection>
        
        {/* Before/After comparison */}
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
          {/* Before */}
          <AnimatedSection animation="fade-up" className="flex-1 w-full">
            <p className="text-sm font-bold text-[#6b7280] uppercase tracking-wide mb-3 md:mb-4 text-center md:text-left">Before</p>
            <StaggeredContainer className="space-y-3 md:space-y-4" staggerDelay={150}>
              {beforeItems.map((item, i) => (
                <div key={i} className="before-card bg-white border border-[#ffe2e2] rounded-[12px] md:rounded-[14px] flex items-center gap-3 md:gap-4 px-3 md:px-4 py-3 md:py-4 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 hover:border-red-300">
                  <div className="before-icon-bg rounded-full w-7 md:w-8 h-7 md:h-8 flex items-center justify-center animate-scale-pulse flex-shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imgXIcon} alt="" className="w-4 md:w-[18px] h-4 md:h-[18px]" />
                  </div>
                  <span className="text-sm md:text-base text-[#1a1a1a]">{item}</span>
                </div>
              ))}
            </StaggeredContainer>
          </AnimatedSection>
          
          {/* Arrow */}
          <AnimatedSection animation="zoom-in" delay={400} className="my-2 md:my-0">
            <div className="bg-[#fff100] rounded-full w-12 md:w-16 h-12 md:h-16 flex items-center justify-center shadow-lg animate-pulse-glow hover:rotate-180 transition-transform duration-700 cursor-pointer rotate-90 md:rotate-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imgArrowTransform} alt="" className="w-6 md:w-8 h-6 md:h-8" />
            </div>
          </AnimatedSection>
          
          {/* After */}
          <AnimatedSection animation="fade-up" className="flex-1 w-full">
            <p className="text-sm font-bold text-[#6b7280] uppercase tracking-wide mb-3 md:mb-4 text-center md:text-left">After</p>
            <StaggeredContainer className="space-y-3 md:space-y-4" staggerDelay={150}>
              {afterItems.map((item, i) => (
                <div key={i} className="after-card bg-white border border-[#dcfce7] rounded-[12px] md:rounded-[14px] flex items-center gap-3 md:gap-4 px-3 md:px-4 py-3 md:py-4 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 hover:border-green-400">
                  <div className="after-icon-bg rounded-full w-7 md:w-8 h-7 md:h-8 flex items-center justify-center animate-scale-pulse flex-shrink-0" style={{ animationDelay: `${i * 200}ms` }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imgCheckIcon} alt="" className="w-4 md:w-[18px] h-4 md:h-[18px]" />
                  </div>
                  <span className="text-sm md:text-base text-[#1a1a1a]">{item}</span>
                </div>
              ))}
            </StaggeredContainer>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// Solution Section Component
function SolutionSection() {
  return (
    <section className="bg-white py-12 md:py-24 px-4 md:px-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-gradient-to-bl from-[#fff100]/5 to-transparent rounded-full blur-3xl" />
      
      <div className="max-w-[1100px] mx-auto">
        <AnimatedSection animation="zoom-in" className="relative text-center">
          <span className="section-bg-text left-1/2 -translate-x-1/2 -top-6 md:-top-12 text-[40px] md:text-[80px]">SOLUTION</span>
          <div className="relative space-y-4 md:space-y-6">
            <h2 className="text-[24px] sm:text-[30px] md:text-[40px] font-bold text-[#1a1a1a] leading-[34px] sm:leading-[42px] md:leading-[52px] tracking-tight px-2">
              その業務、システム化して
              <br />
              <span className="animate-text-gradient">&quot;人を増やさず&quot;</span>
              回すのはどうですか？
            </h2>
            <AnimatedSection animation="fade-up" delay={500}>
              <p className="text-base md:text-lg text-[#6b7280]">
                日々のムダを減らして、現場の処理速度を上げる。
              </p>
            </AnimatedSection>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// Services Section Component
function ServicesSection() {
  const services = [
    {
      icon: imgWebIcon,
      title: "HP制作",
      description: "普通のHPも、3D/アニメーションみたいな『尖った表現』も対応。",
      tags: ["3D", "アニメ", "CMS"]
    },
    {
      icon: imgAppIcon,
      title: "Webアプリ開発",
      description: "新規事業のSaaSも、社内ツールも。まずはMVPから最短で形に。",
      tags: ["MVP", "DB", "認証"]
    },
    {
      icon: imgDxIcon,
      title: "業務DXアプリ",
      description: "散らばった業務を一元管理。集計・分析まで『すぐ見える化』。",
      tags: ["一元管理", "分析", "ワークフロー"]
    },
    {
      icon: imgCloudIcon,
      title: "クラウド連携",
      description: "SaaS同士をAPIで接続して、二重入力をゼロに。",
      tags: ["API", "自動同期", "運用設計"]
    },
    {
      icon: imgMobileIcon,
      title: "iOS/Androidアプリ",
      description: "あなたのアイデアをアプリ化。Web連携・DB連携もまとめて対応。",
      tags: ["Swift", "Flutter", "ストア申請"]
    },
    {
      icon: "✨",
      title: "AI活用・自動化",
      description: "資料・図面・問い合わせ対応をAIで自動化。検索も爆速に。",
      tags: ["OCR", "AI検索", "自動化"],
      isEmoji: true
    }
  ];

  return (
    <section className="bg-white py-12 md:py-24 px-4 md:px-12 lg:px-24 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute -top-40 -left-40 w-60 md:w-80 h-60 md:h-80 bg-[#fff100]/5 rounded-full blur-3xl animate-morph" />
      <div className="absolute -bottom-40 -right-40 w-72 md:w-96 h-72 md:h-96 bg-[#fdc700]/5 rounded-full blur-3xl animate-morph" style={{ animationDelay: "-3s" }} />
      
      <div className="max-w-[1100px] mx-auto relative">
        {/* Section heading */}
        <AnimatedSection animation="fade-up" className="relative text-center mb-8 md:mb-16">
          <span className="section-bg-text left-1/2 -translate-x-1/2 -top-6 md:-top-12 text-[40px] md:text-[80px]">SERVICES</span>
          <h2 className="relative text-[24px] md:text-[32px] font-bold text-[#1a1a1a] tracking-tight">
            対応できる内容
          </h2>
        </AnimatedSection>
        
        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {services.map((service, i) => (
            <AnimatedSection key={i} animation="fade-up" delay={i * 100}>
              <TiltCard maxTilt={6} className="h-full">
                <div className="service-card bg-white rounded-[12px] md:rounded-[14px] shadow-md p-5 md:p-8 h-full group hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="bg-[#fffef0] rounded-lg w-10 md:w-12 h-10 md:h-12 flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    {"isEmoji" in service && service.isEmoji ? (
                      <span className="text-xl md:text-2xl">{service.icon}</span>
                    ) : (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={service.icon as string} alt="" className="w-5 md:w-6 h-5 md:h-6" />
                    )}
                  </div>
                  <h3 className="text-lg md:text-xl text-[#1a1a1a] mb-1 md:mb-2 group-hover:text-[#fdc700] transition-colors font-bold">{service.title}</h3>
                  <p className="text-xs md:text-sm text-[#6b7280] mb-3 md:mb-4 line-clamp-2">{service.description}</p>
                  <div className="flex gap-1.5 md:gap-2 flex-wrap">
                    {service.tags.map((tag, j) => (
                      <span key={j} className="tag text-xs md:text-sm px-2 md:px-3 py-0.5 md:py-1 group-hover:bg-[#fff100] group-hover:text-[#1a1a1a] transition-colors duration-300" style={{ transitionDelay: `${j * 50}ms` }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// Works Section Component
function WorksSection() {
  const works = [
    {
      image: imgWorks1,
      category: "製造業",
      title: "製造業向け図面・案件管理DXシステム",
      description: "Excelでの図面管理や案件情報の手作業転記により、情報の検索に時間がかかり、更新漏れやバージョン違いが頻発していました。"
    },
    {
      image: imgWorks2,
      category: "医療・ヘルスケア",
      title: "医療機関向け予約・問診システム",
      description: "電話予約の対応に多くの時間を取られ、受付業務が圧迫。問診票の記入漏れも課題でした。"
    },
    {
      image: imgWorks3,
      category: "建設・不動産",
      title: "建設業向け顧客・進捗管理システム",
      description: "複数の現場案件を紙とExcelで管理しており、進捗状況の共有が遅れ、顧客への報告が手間でした。"
    }
  ];

  return (
    <section id="works" className="bg-[#fafafa] py-12 md:py-24 px-4 md:px-12 lg:px-24 relative overflow-hidden">
      <div className="max-w-[1100px] mx-auto">
        {/* Section heading */}
        <AnimatedSection animation="fade-up" className="relative text-center mb-8 md:mb-16">
          <span className="section-bg-text left-1/2 -translate-x-1/2 -top-6 md:-top-12 text-[40px] md:text-[80px]">WORKS</span>
          <div className="relative space-y-2 md:space-y-4">
            <h2 className="text-[24px] md:text-[32px] font-bold text-[#1a1a1a] tracking-tight">
              実績
            </h2>
            <p className="text-sm md:text-lg text-[#6b7280] px-4">
              製造業、医療、建設など、幅広い業界で実績があります
            </p>
          </div>
        </AnimatedSection>
        
        {/* Stats */}
        <AnimatedSection animation="fade-up" delay={200} className="flex justify-center gap-6 sm:gap-10 md:gap-16 mb-8 md:mb-12">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a1a1a]">
              <AnimatedCounter end={50} suffix="+" className="animate-text-gradient" />
            </div>
            <p className="text-xs md:text-sm text-[#6b7280] mt-1 md:mt-2">プロジェクト実績</p>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a1a1a]">
              <AnimatedCounter end={98} suffix="%" className="animate-text-gradient" />
            </div>
            <p className="text-xs md:text-sm text-[#6b7280] mt-1 md:mt-2">顧客満足度</p>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a1a1a]">
              <AnimatedCounter end={15} suffix="+" className="animate-text-gradient" />
            </div>
            <p className="text-xs md:text-sm text-[#6b7280] mt-1 md:mt-2">業界対応</p>
          </div>
        </AnimatedSection>
        
        {/* Works grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
          {works.map((work, i) => (
            <AnimatedSection key={i} animation="fade-up" delay={i * 150}>
              <TiltCard maxTilt={5} className="h-full">
                <a href="#" className="works-card bg-white border border-[#e5e7eb] rounded-lg md:rounded-xl overflow-hidden block h-full group">
                  <div className="aspect-video overflow-hidden relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={work.image} alt={work.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                      <span className="text-white text-sm">詳細を見る →</span>
                    </div>
                  </div>
                  <div className="p-4 md:p-6">
                    <p className="text-xs md:text-sm text-[#fff100] mb-1 md:mb-2 font-medium">{work.category}</p>
                    <h3 className="text-base md:text-lg font-bold text-[#0b1220] mb-1 md:mb-2 group-hover:text-[#fdc700] transition-colors line-clamp-2">{work.title}</h3>
                    <p className="text-xs md:text-sm text-[#666] mb-3 md:mb-4 line-clamp-2">{work.description}</p>
                    <div className="flex items-center text-[#fff100] text-xs md:text-sm group-hover:translate-x-2 transition-transform">
                      詳細を見る
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={imgArrowRight} alt="" className="w-3 md:w-4 h-3 md:h-4 ml-1" />
                    </div>
                  </div>
                </a>
              </TiltCard>
            </AnimatedSection>
          ))}
        </div>
        
        {/* View all button */}
        <AnimatedSection animation="fade-up" delay={500} className="text-center">
          <a href="#" className="btn-outline inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 text-base md:text-lg group relative overflow-hidden">
            <span className="relative z-10 group-hover:text-white transition-colors">実績一覧へ</span>
            <div className="absolute inset-0 bg-[#1a1a1a] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </a>
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
    <section className="bg-[#fafafa] py-12 md:py-24 px-4 md:px-12 lg:px-40 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-40 md:w-64 h-40 md:h-64 bg-[#fff100]/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-40 md:w-64 h-40 md:h-64 bg-[#fdc700]/5 rounded-full blur-3xl -translate-y-1/2" />
      
      <div className="max-w-[900px] mx-auto relative">
        {/* Section heading */}
        <AnimatedSection animation="fade-up" className="relative text-center mb-8 md:mb-16">
          <span className="section-bg-text left-1/2 -translate-x-1/2 -top-6 md:-top-12 text-[40px] md:text-[80px]">FAQ</span>
          <h2 className="relative text-[24px] md:text-[32px] font-bold text-[#1a1a1a] tracking-tight">
            よくある質問
          </h2>
        </AnimatedSection>
        
        {/* FAQ list */}
        <StaggeredContainer className="space-y-3 md:space-y-4" staggerDelay={100}>
          {faqs.map((faq, i) => (
            <div key={i} className="faq-card p-4 md:p-6 group hover:shadow-lg transition-all duration-300 hover:border-[#fff100] cursor-pointer">
              <h3 className="text-base md:text-xl text-[#1a1a1a] mb-2 md:mb-3 flex items-start md:items-center gap-2 md:gap-3">
                <span className="w-6 md:w-8 h-6 md:h-8 bg-[#fff100] rounded-full flex items-center justify-center text-xs md:text-sm font-bold text-[#1a1a1a] group-hover:scale-110 transition-transform flex-shrink-0 mt-0.5 md:mt-0">
                  Q
                </span>
                <span className="group-hover:text-[#fdc700] transition-colors">{faq.question}</span>
              </h3>
              <p className="text-sm md:text-base text-[#6b7280] leading-6 pl-8 md:pl-11">{faq.answer}</p>
            </div>
          ))}
        </StaggeredContainer>
      </div>
    </section>
  );
}

// CTA Section Component
function CTASection() {
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
          <h2 className="text-[24px] sm:text-[32px] md:text-[44px] font-bold text-white leading-tight mb-4 md:mb-6 px-2">
            既製品に合わせるのをやめて、
            <br />
            <span className="animate-text-gradient">&quot;自社に最適化&quot;</span>
            しませんか？
          </h2>
          <AnimatedSection animation="fade-up" delay={500}>
            <p className="text-base md:text-xl text-white/70 mb-6 md:mb-10 px-4">
              まずは無料相談で、課題整理→触れるデモ提示まで一緒に進めます。
            </p>
          </AnimatedSection>
          <AnimatedSection animation="fade-up" delay={700}>
            <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 px-4">
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center gap-2 md:gap-3 bg-[#fff100] hover:bg-[#fdc700] text-[#1a1a1a] font-medium px-6 md:px-10 py-3 md:py-5 rounded-xl text-base md:text-lg transition-all hover:scale-105 shadow-lg animate-pulse-glow group"
              >
                無料相談する
                <svg className="w-4 md:w-5 h-4 md:h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a 
                href="/works" 
                className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-medium px-6 md:px-10 py-3 md:py-5 rounded-xl text-base md:text-lg border border-white/30 transition-all hover:scale-105 backdrop-blur-sm"
              >
                実績を見る
              </a>
            </div>
          </AnimatedSection>
        </AnimatedSection>
      </div>
    </section>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-[#f6f8fb] border-t border-black pt-8 md:pt-12 px-4 md:px-8 relative overflow-hidden">
      {/* Subtle gradient */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#fff100]/5 to-transparent pointer-events-none" />
      
      <div className="max-w-[1200px] mx-auto relative">
        <AnimatedSection animation="fade-up">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
            {/* Company info */}
            <div className="text-center sm:text-left">
              <h3 className="text-base md:text-lg font-bold text-[#0b1220] mb-3 md:mb-4">株式会社マクセラス</h3>
              <p className="text-xs md:text-sm text-[#666] leading-6">
                ホームページ制作からWebアプリ開発、業務DX支援まで、お客様の課題を解決します。
              </p>
            </div>
            
            {/* Sitemap */}
            <div className="text-center sm:text-left">
              <h3 className="text-base md:text-lg font-bold text-[#0b1220] mb-3 md:mb-4">サイトマップ</h3>
              <ul className="space-y-2">
                <li><a href="/" className="footer-link text-xs md:text-sm hover:text-[#fdc700] transition-colors">ホーム</a></li>
                <li><a href="/works" className="footer-link text-xs md:text-sm hover:text-[#fdc700] transition-colors">実績</a></li>
                <li><a href="/contact" className="footer-link text-xs md:text-sm hover:text-[#fdc700] transition-colors">お問い合わせ</a></li>
              </ul>
            </div>
            
            {/* Contact */}
            <div className="text-center sm:text-left sm:col-span-2 md:col-span-1">
              <h3 className="text-base md:text-lg font-bold text-[#0b1220] mb-3 md:mb-4">お問い合わせ</h3>
              <p className="text-xs md:text-sm text-[#666]">
                お気軽にご相談ください。<br />
                初回相談は無料です。
              </p>
            </div>
          </div>
        </AnimatedSection>
        
        {/* Copyright */}
        <div className="border-t border-[#e5e7eb] py-6 md:py-8 text-center">
          <p className="text-xs md:text-sm text-[#666]">
            © 2026 株式会社マクセラス All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// Main Page Component
export default function Home() {
  return (
    <ParallaxProvider>
      <div className="min-h-screen bg-white font-sans relative overflow-x-hidden">
        {/* Particle Background - hidden on mobile for performance */}
        <div className="hidden md:block">
          <ParticleBackground />
        </div>
        
        {/* Custom Cursor - only on desktop */}
        <CursorFollower />
        
        <Header />
        <main>
          <HeroSection />
          <ChallengeSection />
          <SolutionSection />
          <ServicesSection />
          <InteractiveDemo />
          <WorksSection />
          <StorySlider />
          <FAQSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </ParallaxProvider>
  );
}
