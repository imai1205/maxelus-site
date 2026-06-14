"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui";
import { ScrollSlide } from "@/components/effects/scroll-slide";

export default function ContactCta() {
  return (
    <section className="px-4 md:px-8 py-24 md:py-36">
      <ScrollSlide direction="up" distance="120px" fade>
        <div className="max-w-4xl mx-auto text-center bg-[#060913]/70 backdrop-blur-xl border border-white/10 px-6 py-16 md:py-24">
          <Reveal distance={40}>
            <h2
              data-cms-key="site.cta_section_title"
              className="text-2xl md:text-4xl font-bold text-white mb-6"
            >
              まずは無料相談から
            </h2>
            <p
              data-cms-key="site.cta_section_subtitle"
              className="text-base md:text-lg text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Web制作・LP制作、Webアプリ開発、業務効率化、自社サービスに関するご相談は、お気軽にお問い合わせください。
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-[var(--accent-honey)] hover:brightness-110 text-[#1a1a1a] font-medium px-10 py-5 rounded-full text-base md:text-lg transition-all hover:scale-105"
            >
              無料相談する
            </Link>
          </Reveal>
        </div>
      </ScrollSlide>
    </section>
  );
}
