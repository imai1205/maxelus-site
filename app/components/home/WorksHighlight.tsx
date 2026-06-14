"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui";
import { ScrollSlide } from "@/components/effects/scroll-slide";
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
          <p className="text-sm tracking-[0.25em] uppercase text-[var(--accent-honey)] mb-4">
            Works
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-12 md:mb-16">
            課題と、その解決の形。
          </h2>
        </Reveal>
        <div className="space-y-4 mb-12">
          {highlights.map((c, index) => (
            <ScrollSlide
              key={c.id}
              direction={index % 2 === 0 ? "left" : "right"}
              distance="25vw"
              rotate={index % 2 === 0 ? -3 : 3}
              fade
            >
              <article className="bg-[#060913]/70 backdrop-blur-xl border border-white/10 border-l-2 border-l-white/20 hover:border-l-[var(--accent-honey)] pl-6 pr-6 py-6 transition-colors">
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="text-sm font-bold text-[var(--accent-honey)] tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg md:text-xl font-bold text-white">
                    {c.title}
                  </h3>
                </div>
                <p className="text-sm text-white/60 leading-relaxed mb-2">
                  {c.problem}
                </p>
                <p className="text-sm font-medium text-white">{c.impact}</p>
              </article>
            </ScrollSlide>
          ))}
        </div>
        <Reveal>
          <Link
            href="/works"
            className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-4 rounded-full border border-white/30 transition-all hover:scale-105"
          >
            実績一覧を見る →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
