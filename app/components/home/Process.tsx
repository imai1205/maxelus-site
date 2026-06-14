"use client";

import { Reveal, StaggerGroup } from "@/components/ui";

const steps = [
  {
    title: "課題整理",
    description: "現状の業務と課題を整理し、目指す状態を言語化します。",
  },
  {
    title: "設計",
    description: "成果から逆算して、仕組みと画面を設計します。",
  },
  {
    title: "デモ",
    description:
      "打ち合わせ後すぐに、触れるデモで完成イメージを共有します。",
  },
  {
    title: "開発",
    description: "設計を確定してから開発。週次で進捗を確認できます。",
  },
  {
    title: "改善",
    description: "リリース後も運用しながら改善し、事業の速度を上げます。",
  },
];

export default function Process() {
  return (
    <section className="px-4 md:px-8 py-16 md:py-28">
      <div className="max-w-5xl mx-auto bg-[#060913]/70 backdrop-blur-xl border border-white/10 p-8 md:p-14">
        <Reveal>
          <p className="text-sm tracking-[0.25em] uppercase text-[var(--accent-honey)] mb-4">
            Process
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-12 md:mb-16">
            成果から逆算する設計プロセス
          </h2>
        </Reveal>
        <StaggerGroup className="space-y-0">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="flex gap-6 py-5 border-b border-white/10 last:border-b-0"
            >
              <span className="text-sm font-bold text-[var(--accent-honey)] tabular-nums pt-1">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-base md:text-lg font-bold text-white mb-1">
                  {step.title}
                </h3>
                <p className="text-sm md:text-base text-white/60 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
