"use client";

import { Reveal } from "@/components/ui";
import { ScrollSlide } from "@/components/effects/scroll-slide";

// 旧 Challenge セクションの Before/After を「考え方」として再構成。
// data-cms-key は旧トップから移植 (CMS 復旧時の識別用)
const perspectives = [
  { before: "仕様が固まらない", after: "触れるデモで合意" },
  { before: "途中で手戻りが出る", after: "設計確定→開発" },
  { before: "追加費用が怖い", after: "予算と範囲が明確" },
];

export default function Approach() {
  return (
    <section className="px-4 md:px-8 py-16 md:py-28">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <p className="text-sm tracking-[0.25em] uppercase text-[var(--accent-honey)] mb-4">
            Approach
          </p>
          <h2
            data-cms-key="site.challenge_title"
            className="text-2xl md:text-4xl font-bold text-white leading-snug mb-6"
          >
            課題は、ツール不足ではなく、
            <br className="hidden md:block" />
            業務のズレから起きる。
          </h2>
          <p
            data-cms-key="site.challenge_subtitle"
            className="text-base md:text-lg text-white/60 leading-relaxed max-w-2xl mb-12 md:mb-16"
          >
            だから私たちは、いきなり作り始めません。業務の流れを見て、ズレの正体をたしかめてから、最適な形を設計します。
          </p>
        </Reveal>
        <div className="space-y-4">
          {perspectives.map((item, i) => (
            <ScrollSlide
              key={i}
              direction={i % 2 === 0 ? "left" : "right"}
              distance="30vw"
              rotate={i % 2 === 0 ? -4 : 4}
              fade
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-8 bg-[#060913]/70 backdrop-blur-xl border border-white/10 py-6 md:py-8 px-5 md:px-8">
                <p
                  data-cms-key={`site.challenge_before_${i}`}
                  className="text-sm md:text-base text-white/50 border-l-2 border-l-white/20 pl-4"
                >
                  {item.before}
                </p>
                <p
                  data-cms-key={`site.challenge_after_${i}`}
                  className="text-sm md:text-base font-medium text-white border-l-2 border-l-[var(--accent-honey)] pl-4"
                >
                  {item.after}
                </p>
              </div>
            </ScrollSlide>
          ))}
        </div>
      </div>
    </section>
  );
}
