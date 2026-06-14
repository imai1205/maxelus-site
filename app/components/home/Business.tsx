"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui";
import { ConvergeCard } from "@/components/effects/converge-card";
import { GlowCard } from "@/components/ui/glow-card";

const businessItems = [
  {
    no: "01",
    title: "Web制作・LP制作 / Webアプリ開発",
    description:
      "Webサイト、LP、Webアプリ、業務システムなど、事業の成長と日々の運用を支える仕組みを設計・開発します。",
    href: "/services?category=web-creation",
    direction: "left" as const,
  },
  {
    no: "02",
    title: "業務効率化支援",
    description:
      "業務の流れを整理し、手作業や属人化を減らすことで、本当に大切なことに時間を使える状態をつくります。",
    href: "/services?category=efficiency",
    direction: "top" as const,
  },
  {
    no: "03",
    title: "自社プロダクト",
    description:
      "現場や事業の中で見えた課題をもとに、業務効率化や新しい体験につながる自社サービスを開発しています。",
    href: "/services?category=products",
    direction: "right" as const,
  },
];

export default function Business() {
  return (
    <section className="px-4 md:px-8 py-16 md:py-28">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <p className="text-sm tracking-[0.25em] uppercase text-[var(--accent-honey)] mb-4">
            Business
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-12 md:mb-16">
            時間を生み出す、効率的な仕組みをつくる。
          </h2>
        </Reveal>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 list-none p-0 m-0">
          {businessItems.map((item, index) => (
            <ConvergeCard
              key={item.no}
              direction={item.direction}
              delay={index * 120}
            >
              <GlowCard
                as={Link}
                href={item.href}
                className="flex flex-col gap-4 h-full p-8 bg-[#060913]/70 backdrop-blur-xl border border-white/10 group"
              >
                <p className="text-sm font-bold text-[var(--accent-honey)] tabular-nums">
                  {item.no}
                </p>
                <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-[var(--accent-honey)] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  {item.description}
                </p>
                <span className="text-sm font-medium text-white/80 mt-auto">
                  詳しく見る →
                </span>
              </GlowCard>
            </ConvergeCard>
          ))}
        </ul>
      </div>
    </section>
  );
}
