"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "../components/Footer";
import { Reveal, StaggerGroup } from "@/components/ui";
import { industries, cases, type Case } from "../data/casesData";

function CaseCard({ caseItem, index }: { caseItem: Case; index: number }) {
  const industry = industries.find((i) => i.id === caseItem.industryId);

  return (
    <article className="border-l-2 border-l-[#e5e7eb] hover:border-l-[#fdc700] pl-6 py-6 transition-colors">
      <div className="flex items-baseline gap-4 mb-2">
        <span className="text-sm font-bold text-[#fdc700] tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>
        {industry && (
          <span className="text-xs tracking-widest text-[#6b7280]">
            {industry.label}
          </span>
        )}
      </div>
      <h2 className="text-lg md:text-xl font-bold text-[#1a1a1a] mb-3">
        {caseItem.title}
      </h2>
      <dl className="space-y-2 mb-4">
        <div>
          <dt className="text-xs tracking-widest text-[#6b7280] mb-0.5">
            課題
          </dt>
          <dd className="text-sm text-[#6b7280] leading-relaxed">
            {caseItem.problem}
          </dd>
        </div>
        <div>
          <dt className="text-xs tracking-widest text-[#6b7280] mb-0.5">
            解決
          </dt>
          <dd className="text-sm text-[#6b7280] leading-relaxed">
            {caseItem.solution}
          </dd>
        </div>
        <div>
          <dt className="text-xs tracking-widest text-[#6b7280] mb-0.5">
            効果
          </dt>
          <dd className="text-sm font-medium text-[#1a1a1a] leading-relaxed">
            {caseItem.impact}
          </dd>
        </div>
      </dl>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        {caseItem.tags.map((tag) => (
          <span key={tag} className="text-xs text-[#6b7280]">
            #{tag}
          </span>
        ))}
        {caseItem.lpHref && (
          <Link
            href={caseItem.lpHref}
            className="text-xs font-medium text-[#1a1a1a] underline underline-offset-4 hover:text-[#fdc700] transition-colors"
          >
            紹介ページを見る
          </Link>
        )}
      </div>
    </article>
  );
}

export default function WorksPage() {
  const [activeIndustryId, setActiveIndustryId] = useState<string | null>(null);

  const filteredCases = activeIndustryId
    ? cases.filter((c) => c.industryId === activeIndustryId)
    : cases;

  return (
    <div className="min-h-screen bg-white font-sans">
      <main className="pt-14 md:pt-16">
        {/* Hero */}
        <section className="py-16 md:py-24 px-4 md:px-8 border-b border-[#e5e7eb]">
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <p className="text-sm tracking-widest text-[#6b7280] mb-4">
                Works
              </p>
              <h1 className="text-3xl md:text-5xl font-bold text-[#1a1a1a] mb-6 leading-tight">
                実績
              </h1>
              <p className="text-base md:text-lg text-[#6b7280] max-w-3xl leading-relaxed">
                製造業の図面管理・販売管理から、店舗・医療・SaaSまで。
                業種ごとの課題と、その解決の形を紹介します。
              </p>
            </Reveal>
          </div>
        </section>

        {/* 業種フィルタ */}
        <div className="sticky top-14 md:top-16 z-40 bg-white/95 border-b border-[#e5e7eb]">
          <div className="max-w-5xl mx-auto px-4 md:px-8">
            <div className="flex items-center gap-6 md:gap-8 overflow-x-auto scrollbar-hide">
              <button
                onClick={() => setActiveIndustryId(null)}
                className={`py-4 text-sm md:text-base font-medium whitespace-nowrap border-b-2 -mb-px transition-colors ${
                  activeIndustryId === null
                    ? "border-[#fdc700] text-[#1a1a1a]"
                    : "border-transparent text-[#6b7280] hover:text-[#1a1a1a]"
                }`}
              >
                すべて
              </button>
              {industries.map((industry) => (
                <button
                  key={industry.id}
                  onClick={() => setActiveIndustryId(industry.id)}
                  className={`py-4 text-sm md:text-base font-medium whitespace-nowrap border-b-2 -mb-px transition-colors ${
                    activeIndustryId === industry.id
                      ? "border-[#fdc700] text-[#1a1a1a]"
                      : "border-transparent text-[#6b7280] hover:text-[#1a1a1a]"
                  }`}
                >
                  {industry.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 事例一覧 */}
        <section className="py-12 md:py-20 px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <StaggerGroup key={activeIndustryId ?? "all"} className="space-y-2">
              {filteredCases.map((caseItem, index) => (
                <CaseCard key={caseItem.id} caseItem={caseItem} index={index} />
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
                似た課題をお持ちの方は、お気軽にご相談ください。
                <br />
                課題を整理するところから、一緒にスタートしましょう。
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center bg-[#fff100] hover:bg-[#fdc700] text-[#1a1a1a] font-medium px-8 py-4 rounded-full transition-all hover:scale-105"
                >
                  無料相談する
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-4 rounded-full border border-white/30 transition-all hover:scale-105"
                >
                  サービスを見る
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
