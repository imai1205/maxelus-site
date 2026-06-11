"use client";

import Link from "next/link";
import { Reveal, StaggerGroup } from "@/components/ui";

const businessItems = [
  {
    no: "01",
    title: "Web制作・LP制作 / Webアプリ開発",
    description:
      "Webサイト、LP、Webアプリ、業務システムなど、事業の成長と日々の運用を支える仕組みを設計・開発します。",
    href: "/services?category=web-creation",
  },
  {
    no: "02",
    title: "業務効率化支援",
    description:
      "業務の流れを整理し、手作業や属人化を減らすことで、本当に大切なことに時間を使える状態をつくります。",
    href: "/services?category=efficiency",
  },
  {
    no: "03",
    title: "自社プロダクト",
    description:
      "現場や事業の中で見えた課題をもとに、業務効率化や新しい体験につながる自社サービスを開発しています。",
    href: "/services?category=products",
  },
];

export default function Business() {
  return (
    <section className="px-4 md:px-8 py-16 md:py-28 border-t border-[#e5e7eb]">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <p className="text-sm tracking-widest text-[#6b7280] mb-4">Business</p>
          <h2 className="text-2xl md:text-4xl font-bold text-[#1a1a1a] mb-12 md:mb-16">
            時間を生み出す、効率的な仕組みをつくる。
          </h2>
        </Reveal>
        <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {businessItems.map((item) => (
            <Link
              key={item.no}
              href={item.href}
              className="block border-t-2 border-t-[#1a1a1a] pt-6 group"
            >
              <p className="text-sm font-bold text-[#fdc700] tabular-nums mb-3">
                {item.no}
              </p>
              <h3 className="text-lg md:text-xl font-bold text-[#1a1a1a] mb-3 group-hover:text-[#fdc700] transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-[#6b7280] leading-relaxed mb-4">
                {item.description}
              </p>
              <span className="text-sm font-medium text-[#1a1a1a]">
                詳しく見る →
              </span>
            </Link>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
