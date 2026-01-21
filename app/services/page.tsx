"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getSortedServices, getAllTags, type Service } from "../data/services";
import { AnimatedSection, TiltCard } from "../components/AnimationProvider";

// アイコンコンポーネント
function ServiceIcon({ icon }: { icon?: string }) {
  const iconMap: Record<string, React.ReactNode> = {
    document: (
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
    chart: (
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    code: (
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    globe: (
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    mobile: (
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    )
  };

  return (
    <div className="w-10 h-10 md:w-12 md:h-12 text-[#fdc700]">
      {iconMap[icon || "code"] || iconMap.code}
    </div>
  );
}

// サービスカードコンポーネント
function ServiceCard({ service, index }: { service: Service; index: number }) {
  const href = service.externalUrl || `/services/${service.slug}`;
  const isExternal = !!service.externalUrl;

  return (
    <AnimatedSection animation="fade-up" delay={index * 100}>
      <TiltCard maxTilt={5} className="h-full">
        <div className="service-card bg-white rounded-2xl shadow-lg p-6 md:p-8 h-full group hover:shadow-2xl transition-all duration-500 relative overflow-hidden border border-[#e5e7eb]/50">
          {/* Shimmer effect */}
          <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
          
          {/* Icon */}
          <div className="bg-[#fffef0] rounded-xl w-14 h-14 md:w-16 md:h-16 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
            <ServiceIcon icon={service.icon} />
          </div>
          
          {/* Title */}
          <h3 className="text-xl md:text-2xl font-bold text-[#1a1a1a] mb-2 group-hover:text-[#fdc700] transition-colors">
            {service.title}
          </h3>
          
          {/* Catch */}
          <p className="text-base md:text-lg text-[#1a1a1a] font-medium mb-3">
            {service.catch}
          </p>
          
          {/* Summary */}
          <p className="text-sm md:text-base text-[#6b7280] mb-5 leading-relaxed">
            {service.summary}
          </p>
          
          {/* Tags */}
          <div className="flex gap-2 flex-wrap mb-6">
            {service.tags.slice(0, 4).map((tag, j) => (
              <span 
                key={j} 
                className="text-xs md:text-sm px-3 py-1 bg-[#f3f4f6] text-[#6b7280] rounded-full group-hover:bg-[#fff100] group-hover:text-[#1a1a1a] transition-colors duration-300"
                style={{ transitionDelay: `${j * 50}ms` }}
              >
                {tag}
              </span>
            ))}
          </div>
          
          {/* CTA Button */}
          <Link
            href={href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="inline-flex items-center gap-2 bg-[#fff100] hover:bg-[#fdc700] text-[#1a1a1a] font-medium px-6 py-3 rounded-full transition-all hover:scale-105 group/btn"
          >
            {service.primaryCtaLabel}
            {isExternal ? (
              <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            ) : (
              <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            )}
          </Link>
        </div>
      </TiltCard>
    </AnimatedSection>
  );
}

export default function ServicesPage() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const allServices = getSortedServices();
  const allTags = getAllTags();
  
  const filteredServices = selectedTag 
    ? allServices.filter(s => s.tags.includes(selectedTag))
    : allServices;

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />
      
      <main className="pt-14 md:pt-16">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-[#0b1220] via-[#1e293b] to-[#0b1220] py-20 md:py-32 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }} />
          </div>
          
          {/* Gradient Orbs */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#fff100]/10 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-[#fdc700]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
          
          <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 text-center">
            <AnimatedSection animation="fade-up">
              <p className="text-[#fff100] text-sm md:text-base font-medium mb-4 tracking-wider">
                SERVICES
              </p>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                製造業の&quot;現場で使える&quot;DXを、<br className="hidden md:block" />
                最短で形にします。
              </h1>
              <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
                図面管理／受発注・販売管理／Webアプリ／iPhoneデモ搭載LPまで一気通貫。
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Tag Filter */}
        <section className="bg-[#fafafa] py-8 border-b border-[#e5e7eb] sticky top-14 md:top-16 z-40">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
              <span className="text-sm text-[#6b7280] whitespace-nowrap font-medium">絞り込み:</span>
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedTag === null 
                    ? 'bg-[#fff100] text-[#1a1a1a]' 
                    : 'bg-white text-[#6b7280] hover:bg-[#f3f4f6] border border-[#e5e7eb]'
                }`}
              >
                すべて
              </button>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    selectedTag === tag 
                      ? 'bg-[#fff100] text-[#1a1a1a]' 
                      : 'bg-white text-[#6b7280] hover:bg-[#f3f4f6] border border-[#e5e7eb]'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 md:py-24 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            {filteredServices.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-[#6b7280] text-lg">該当するサービスがありません</p>
                <button
                  onClick={() => setSelectedTag(null)}
                  className="mt-4 text-[#fdc700] hover:underline"
                >
                  フィルターをクリア
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {filteredServices.map((service, index) => (
                  <ServiceCard key={service.slug} service={service} index={index} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#0b1220] py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#fff100] rounded-full blur-[100px]" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#fdc700] rounded-full blur-[120px]" />
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 text-center">
            <AnimatedSection animation="fade-up">
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-6">
                まずは無料相談から
              </h2>
              <p className="text-base md:text-lg text-white/70 mb-8 max-w-2xl mx-auto">
                「こんなこと実現できる？」という段階からOK。<br />
                課題を整理するところから、一緒にスタートしましょう。
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-[#fff100] hover:bg-[#fdc700] text-[#1a1a1a] font-medium px-8 py-4 rounded-full transition-all hover:scale-105"
                >
                  無料相談する
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link 
                  href="/strengths"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-4 rounded-full border border-white/30 transition-all hover:scale-105"
                >
                  マクセラスの強みを見る
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
