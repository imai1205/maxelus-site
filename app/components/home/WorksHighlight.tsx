"use client";

import Link from "next/link";
import { Reveal, StaggerGroup } from "@/components/ui";
import { cases } from "@/app/data/casesData";

// 3 本柱に対応する代表事例 (casesData.ts から選定)
const highlightCaseIds = [
  "case-manufacturing-1", // 図面・案件管理DX (自社プロダクト系)
  "case-manufacturing-2", // 販売管理 (業務効率化系)
  "case-beauty-1", // まつげサロン向けホームページ (Web制作系)
];

export default function WorksHighlight() {
  const highlights = highlightCaseIds
    .map((id) => cases.find((c) => c.id === id))
    .filter((c) => c !== undefined);

  return (
    <section className="px-4 md:px-8 py-16 md:py-28">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <p className="text-sm tracking-widest text-[#6b7280] mb-4">Works</p>
          <h2 className="text-2xl md:text-4xl font-bold text-[#1a1a1a] mb-12 md:mb-16">
            課題と、その解決の形。
          </h2>
        </Reveal>
        <StaggerGroup className="space-y-2 mb-12">
          {highlights.map((c, index) => (
            <article
              key={c.id}
              className="border-l-2 border-l-[#e5e7eb] hover:border-l-[#fdc700] pl-6 py-5 transition-colors"
            >
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-sm font-bold text-[#fdc700] tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg md:text-xl font-bold text-[#1a1a1a]">
                  {c.title}
                </h3>
              </div>
              <p className="text-sm text-[#6b7280] leading-relaxed mb-2">
                {c.problem}
              </p>
              <p className="text-sm font-medium text-[#1a1a1a]">{c.impact}</p>
            </article>
          ))}
        </StaggerGroup>
        <Reveal>
          <Link
            href="/works"
            className="inline-flex items-center justify-center bg-white hover:bg-[#fafafa] text-[#1a1a1a] font-medium px-8 py-4 rounded-full border border-[#e5e7eb] transition-all hover:scale-105"
          >
            実績一覧を見る →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
