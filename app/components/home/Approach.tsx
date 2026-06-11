"use client";

import { Reveal, StaggerGroup } from "@/components/ui";

// 旧 Challenge セクションの Before/After を「考え方」として再構成。
// data-cms-key は旧トップから移植 (CMS 復旧時の識別用)
const perspectives = [
  { before: "仕様が固まらない", after: "触れるデモで合意" },
  { before: "途中で手戻りが出る", after: "設計確定→開発" },
  { before: "追加費用が怖い", after: "予算と範囲が明確" },
];

export default function Approach() {
  return (
    <section className="px-4 md:px-8 py-16 md:py-28 bg-[#fafafa]">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <p className="text-sm tracking-widest text-[#6b7280] mb-4">Approach</p>
          <h2
            data-cms-key="site.challenge_title"
            className="text-2xl md:text-4xl font-bold text-[#1a1a1a] leading-snug mb-6"
          >
            課題は、ツール不足ではなく、
            <br className="hidden md:block" />
            業務のズレから起きる。
          </h2>
          <p
            data-cms-key="site.challenge_subtitle"
            className="text-base md:text-lg text-[#6b7280] leading-relaxed max-w-2xl mb-12 md:mb-16"
          >
            だから私たちは、いきなり作り始めません。業務の流れを見て、ズレの正体をたしかめてから、最適な形を設計します。
          </p>
        </Reveal>
        <StaggerGroup className="space-y-px">
          {perspectives.map((item, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-8 bg-white border-b border-[#e5e7eb] py-6 md:py-8 px-5 md:px-8"
            >
              <p
                data-cms-key={`site.challenge_before_${i}`}
                className="text-sm md:text-base text-[#6b7280] border-l-2 border-l-[#e5e7eb] pl-4"
              >
                {item.before}
              </p>
              <p
                data-cms-key={`site.challenge_after_${i}`}
                className="text-sm md:text-base font-medium text-[#1a1a1a] border-l-2 border-l-[#fdc700] pl-4"
              >
                {item.after}
              </p>
            </div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
