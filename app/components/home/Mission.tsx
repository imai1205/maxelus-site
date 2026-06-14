"use client";

import { Reveal, StaggerGroup } from "@/components/ui";

const values = [
  {
    label: "Design",
    description: "見えにくい業務の流れを整理し、迷いを減らす。",
  },
  {
    label: "Build",
    description: "必要な仕組みを、使われ続ける形で実装する。",
  },
  {
    label: "Refine",
    description: "運用しながら改善し、事業の速度を上げていく。",
  },
];

export default function Mission() {
  return (
    // 白背景サイトの中で唯一の濃紺セクション (演出方針で許容済み)
    <section className="px-4 md:px-8 py-24 md:py-40 bg-[var(--bg-navy)]">
      <div className="max-w-5xl mx-auto">
        <Reveal distance={40}>
          <p className="text-sm tracking-widest text-[var(--accent-honey)] mb-6">
            Mission
          </p>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-snug mb-8">
            業務を効率化し、本当に大切なことに
            <br className="hidden md:block" />
            時間を使える世界をつくる。
          </h2>
        </Reveal>
        <Reveal delay={0.2} distance={40}>
          <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-3xl mb-16 md:mb-24">
            目の前の作業をただ置き換えるのではなく、業務の流れそのものを見直し、事業が自然に前へ進む状態を設計する。マクセラスは、Web・システム・自動化・AIなどを必要な形で組み合わせ、人と会社に余白を生む仕組みをつくります。
          </p>
        </Reveal>
        <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {values.map((value, index) => (
            <div
              key={value.label}
              className="border-t border-white/20 pt-6"
            >
              <p className="text-sm font-bold text-[var(--accent-honey)] tabular-nums mb-3">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="text-xl font-bold text-white mb-3">
                {value.label}
              </h3>
              <p className="text-sm text-white/70 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
