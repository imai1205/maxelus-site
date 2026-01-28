"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Footer from "../components/Footer";
import { AnimatedSection, TiltCard } from "../components/AnimationProvider";
import {
  industries,
  cases,
  getCasesByIndustry,
  type Industry,
  type Case,
} from "../data/casesData";

// 業種カードコンポーネント
function IndustryCard({
  industry,
  onClick,
  isActive,
}: {
  industry: Industry;
  onClick: () => void;
  isActive: boolean;
}) {
  return (
    <div
      onClick={onClick}
      className={`relative aspect-video rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 w-full ${
        isActive
          ? "ring-4 ring-[#fff100] scale-105"
          : "hover:scale-105 hover:shadow-2xl"
      }`}
    >
      <Image
        src={industry.heroImage}
        alt={industry.label}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover group-hover:scale-110 transition-transform duration-700"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
          {industry.label}
        </h3>
        <p className="text-sm md:text-base text-white/90">{industry.description}</p>
      </div>
      {isActive && (
        <div className="absolute top-4 right-4 bg-[#fff100] text-[#1a1a1a] px-3 py-1 rounded-full text-sm font-bold">
          選択中
        </div>
      )}
    </div>
  );
}

// 事例カードコンポーネント
function CaseCard({
  caseItem,
  onClick,
}: {
  caseItem: Case;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-[#1e293b] border border-[#e5e7eb] dark:border-[#374151] rounded-xl overflow-hidden cursor-pointer group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 w-full"
    >
      <div className="aspect-video overflow-hidden relative">
        <Image
          src={caseItem.image}
          alt={caseItem.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
          <span className="text-white text-sm font-medium">詳細を見る →</span>
        </div>
      </div>
      <div className="p-4 md:p-6">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          {caseItem.tags.slice(0, 3).map((tag, i) => (
            <span
              key={i}
              className="text-xs md:text-sm text-[#fff100] font-medium bg-[#1a1a1a] px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-base md:text-lg font-bold text-[#0b1220] dark:text-[#f9fafb] mb-2 group-hover:text-[#fdc700] transition-colors line-clamp-2">
          {caseItem.title}
        </h3>
        <p className="text-xs md:text-sm text-[#666] dark:text-[#9ca3af] line-clamp-2">
          {caseItem.summary}
        </p>
      </div>
    </div>
  );
}

// 事例詳細モーダル
function CaseDetailModal({
  caseItem,
  onClose,
}: {
  caseItem: Case;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-[#1e293b] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image */}
        <div className="relative aspect-video">
          <Image
            src={caseItem.image}
            alt={caseItem.title}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority={false}
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 dark:bg-[#1e293b]/90 hover:bg-white dark:hover:bg-[#374151] rounded-full flex items-center justify-center transition-colors text-[#1a1a1a] dark:text-[#f9fafb]"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <div className="flex gap-2 mb-2 flex-wrap">
              {caseItem.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs text-[#fff100] font-medium bg-[#1a1a1a]/80 px-2 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white mt-1">
              {caseItem.title}
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Summary */}
          <p className="text-[#6b7280] dark:text-[#9ca3af] mb-6">{caseItem.summary}</p>

          {/* Details */}
          <div className="space-y-6">
            <div className="bg-[#fef2f2] border border-[#fecaca] rounded-xl p-4">
              <h3 className="font-bold text-[#991b1b] mb-2 flex items-center gap-2">
                <span className="text-lg">😰</span> 課題
              </h3>
              <p className="text-sm text-[#7f1d1d]">{caseItem.problem}</p>
            </div>

            <div className="bg-[#fffbeb] border border-[#fde68a] rounded-xl p-4">
              <h3 className="font-bold text-[#92400e] mb-2 flex items-center gap-2">
                <span className="text-lg">💡</span> 施策
              </h3>
              <p className="text-sm text-[#78350f]">{caseItem.solution}</p>
            </div>

            <div className="bg-[#ecfdf5] border border-[#a7f3d0] rounded-xl p-4">
              <h3 className="font-bold text-[#065f46] mb-2 flex items-center gap-2">
                <span className="text-lg">🎉</span> 効果
              </h3>
              <p className="text-sm text-[#064e3b]">{caseItem.impact}</p>
            </div>
          </div>

          {/* Technologies */}
          {caseItem.technologies && caseItem.technologies.length > 0 && (
            <div className="mt-6 pt-6 border-t border-[#e5e7eb]">
              <p className="text-xs text-[#6b7280] dark:text-[#9ca3af] mb-2">使用技術</p>
              <div className="flex flex-wrap gap-2">
                {caseItem.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="text-sm bg-[#1a1a1a] text-white px-3 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Screenshots */}
          {caseItem.screenshots && caseItem.screenshots.length > 0 && (
            <div className="mt-6 pt-6 border-t border-[#e5e7eb]">
              <p className="text-xs text-[#6b7280] dark:text-[#9ca3af] mb-4">画面イメージ</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {caseItem.screenshots.map((screenshot, i) => (
                  <div key={i} className="aspect-video rounded-lg overflow-hidden relative">
                    <Image
                      src={screenshot}
                      alt={`画面イメージ ${i + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-8 text-center">
            <p className="text-sm text-[#6b7280] dark:text-[#9ca3af] mb-4">
              同様の課題をお持ちですか？
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#fff100] hover:bg-[#fdc700] text-[#1a1a1a] font-medium px-8 py-3 rounded-xl transition-all hover:scale-105"
              >
                無料相談する
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
              {caseItem.lpHref && (
                <Link
                  href={caseItem.lpHref}
                  className="inline-flex items-center gap-2 bg-white dark:bg-[#1e293b] hover:bg-[#fafafa] dark:hover:bg-[#374151] text-[#1a1a1a] dark:text-[#f9fafb] font-medium px-8 py-3 rounded-xl border border-[#e5e7eb] dark:border-[#374151] transition-all hover:scale-105"
                >
                  LPを見る
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CasesPage() {
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(
    null
  );
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [filteredCases, setFilteredCases] = useState<Case[]>([]);

  // 業種選択時の処理
  useEffect(() => {
    if (selectedIndustry) {
      const cases = getCasesByIndustry(selectedIndustry.id);
      setFilteredCases(cases);

      // スムーススクロールで事例一覧へ
      setTimeout(() => {
        const element = document.getElementById("cases-list");
        if (element) {
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 100);
    } else {
      setFilteredCases([]);
    }
  }, [selectedIndustry]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0b1220] font-sans">
      <main className="pt-14 md:pt-16">
        {/* Hero Section */}
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
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#fff100]/10 rounded-full blur-[100px] animate-pulse" />
          <div
            className="absolute bottom-10 right-20 w-96 h-96 bg-[#fdc700]/10 rounded-full blur-[120px] animate-pulse"
            style={{ animationDelay: "1s" }}
          />

          <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 text-center">
            <AnimatedSection animation="fade-up" className="relative">
              <div className="relative inline-block">
                <span className="section-bg-text left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-[40px] sm:text-[60px] md:text-[80px] lg:text-[120px] xl:text-[150px] text-white/18 absolute" style={{ opacity: 0.18 }}>CASES</span>
                <div className="relative">
                  <p className="text-[#fff100] text-sm md:text-base font-medium mb-4 tracking-wider relative">
                    CASES
                  </p>
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight relative">
                    事例紹介
                  </h1>
                </div>
              </div>
              <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed relative">
                製造業、医療、建設など、幅広い業種で実績があります
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Industry Cards Section */}
        <section className="py-16 md:py-24 px-4 md:px-8 bg-[#fafafa] dark:bg-[#1e293b]">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection animation="fade-up" className="text-center mb-12 relative">
              <div className="relative inline-block">
                <span className="section-bg-text left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-[40px] sm:text-[60px] md:text-[80px] lg:text-[120px] xl:text-[150px] text-[#0b1220]/18 dark:text-white/18 absolute" style={{ opacity: 0.18 }}>INDUSTRY</span>
                <h2 className="text-2xl md:text-4xl font-bold text-[#1a1a1a] dark:text-[#f9fafb] mb-4 relative">
                  業種から探す
                </h2>
              </div>
              <div className="w-20 h-1 bg-[#fff100] rounded-full mx-auto relative" />
            </AnimatedSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 w-full">
              {industries.map((industry, i) => (
                <AnimatedSection
                  key={industry.id}
                  animation="fade-up"
                  delay={i * 100}
                >
                  <IndustryCard
                    industry={industry}
                    onClick={() => setSelectedIndustry(industry)}
                    isActive={selectedIndustry?.id === industry.id}
                  />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Cases List Section */}
        {selectedIndustry && (
          <section
            id="cases-list"
            className="py-16 md:py-24 px-4 md:px-8 scroll-mt-20 bg-white dark:bg-[#0b1220]"
          >
            <div className="max-w-6xl mx-auto">
              <AnimatedSection animation="fade-up" className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] dark:text-[#f9fafb] mb-2">
                      {selectedIndustry.label}の事例
                    </h2>
                    <p className="text-[#6b7280] dark:text-[#9ca3af]">
                      {filteredCases.length}件の事例
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedIndustry(null)}
                    className="text-sm text-[#6b7280] dark:text-[#9ca3af] hover:text-[#1a1a1a] dark:hover:text-[#f9fafb] transition-colors"
                  >
                    すべての業種を見る
                  </button>
                </div>
              </AnimatedSection>

              {filteredCases.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
                  {filteredCases.map((caseItem) => (
                    <CaseCard
                      key={caseItem.id}
                      caseItem={caseItem}
                      onClick={() => setSelectedCase(caseItem)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-[#6b7280] dark:text-[#9ca3af]">
                  <p>該当する事例がありません</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Case Detail Modal */}
        {selectedCase && (
          <CaseDetailModal
            caseItem={selectedCase}
            onClose={() => setSelectedCase(null)}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
