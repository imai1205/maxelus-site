"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "../components/Footer";
import ServiceDetailPanel from "../components/ServiceDetailPanel";
import { Reveal, StaggerGroup } from "@/components/ui";
import {
  getServicesByCategory,
  categoryNames,
  categoryOrder,
  type Service,
  type ServiceCategory,
} from "../data/servicesData";

// サービスカード (編集デザイン路線: 番号タイポグラフィ + 細罫線 + 左ボーダー)
function ServiceCard({
  service,
  index,
  isOpen,
  onToggle,
}: {
  service: Service;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="w-full">
      <button
        onClick={onToggle}
        className={`w-full text-left border-l-2 pl-6 py-6 transition-colors ${
          isOpen
            ? "border-l-[#fdc700]"
            : "border-l-[#e5e7eb] hover:border-l-[#fdc700]"
        }`}
      >
        <div className="flex items-baseline gap-4 mb-2">
          <span className="text-sm font-bold text-[#fdc700] tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="text-lg md:text-xl font-bold text-[#1a1a1a]">
            {service.title}
          </h3>
        </div>
        <p className="text-sm md:text-base text-[#1a1a1a] font-medium mb-2">
          {service.catch}
        </p>
        <p className="text-xs md:text-sm text-[#6b7280] leading-relaxed mb-3">
          {service.shortDesc}
        </p>
        {service.metric && (
          <p className="text-xs text-[#6b7280]">
            {service.metric.label}{" "}
            <span className="text-base font-bold text-[#1a1a1a]">
              {service.metric.value}
              {service.metric.suffix}
            </span>
          </p>
        )}
        <p className="text-sm text-[#1a1a1a] font-medium mt-3">
          {isOpen ? "閉じる −" : "詳細を開く +"}
        </p>
      </button>

      {isOpen && (
        <ServiceDetailPanel service={service} isOpen={isOpen} onClose={onToggle} />
      )}
    </div>
  );
}

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] =
    useState<ServiceCategory>("web-creation");
  const [openServiceSlug, setOpenServiceSlug] = useState<string | null>(null);

  const handleCategoryClick = (category: ServiceCategory) => {
    setActiveCategory(category);
    setOpenServiceSlug(null);
  };

  const handleServiceToggle = (slug: string) => {
    setOpenServiceSlug(openServiceSlug === slug ? null : slug);
  };

  const activeServices = getServicesByCategory(activeCategory);

  return (
    <div className="min-h-screen bg-white font-sans">
      <main className="pt-14 md:pt-16">
        {/* Hero */}
        <section className="py-16 md:py-24 px-4 md:px-8 border-b border-[#e5e7eb]">
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <p className="text-sm tracking-widest text-[#6b7280] mb-4">
                Services
              </p>
              <h1 className="text-3xl md:text-5xl font-bold text-[#1a1a1a] mb-6 leading-tight">
                アプリ開発とWeb制作で、
                <br />
                ビジネスを最短で形にします。
              </h1>
              <p className="text-base md:text-lg text-[#6b7280] max-w-3xl leading-relaxed">
                Web制作からWebアプリ開発、業務効率化支援、自社プロダクトまで。
                課題に合わせて最適な形を提案します。
              </p>
            </Reveal>
          </div>
        </section>

        {/* カテゴリタブ */}
        <div className="sticky top-14 md:top-16 z-40 bg-white/95 border-b border-[#e5e7eb]">
          <div className="max-w-5xl mx-auto px-4 md:px-8">
            <div className="flex items-center gap-6 md:gap-10 overflow-x-auto scrollbar-hide">
              {categoryOrder.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`py-4 text-sm md:text-base font-medium whitespace-nowrap border-b-2 -mb-px transition-colors ${
                    activeCategory === category
                      ? "border-[#fdc700] text-[#1a1a1a]"
                      : "border-transparent text-[#6b7280] hover:text-[#1a1a1a]"
                  }`}
                >
                  {categoryNames[category]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* サービス一覧 */}
        <section className="py-12 md:py-20 px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <StaggerGroup key={activeCategory} className="space-y-2">
              {activeServices.map((service, index) => (
                <ServiceCard
                  key={service.slug}
                  service={service}
                  index={index}
                  isOpen={openServiceSlug === service.slug}
                  onToggle={() => handleServiceToggle(service.slug)}
                />
              ))}
            </StaggerGroup>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 px-4 md:px-8 bg-[var(--bg-navy)]">
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-6">
                まずは無料相談から
              </h2>
              <p className="text-base md:text-lg text-white/70 mb-8 max-w-2xl mx-auto">
                「こんなこと実現できる？」という段階からOK。
                <br />
                課題を整理するところから、一緒にスタートしましょう。
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-[#fff100] hover:bg-[#fdc700] text-[#1a1a1a] font-medium px-8 py-4 rounded-full transition-all hover:scale-105"
              >
                無料相談する
              </Link>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
