"use client";

import Footer from "../components/Footer";
import { AnimatedSection } from "../components/AnimationProvider";
import { PageHero, SectionHeader, ContactCTA } from "../../components/ui";

const strengths = [
  {
    no: "01",
    title: "触れるデモで、完成イメージを共有できる",
    body: "資料や説明だけでは、完成後のイメージがずれてしまうことがあります。マクセラスでは、必要に応じて実際に触れるデモや画面イメージを作成し、早い段階で認識を合わせます。",
  },
  {
    no: "02",
    title: "業務の流れから整理できる",
    body: "いきなり機能を作るのではなく、まず現在の業務がどのように回っているのかを整理します。As Is / To Be の考え方をもとに、どこを改善すべきか、どこをシステム化すべきかを一緒に判断します。",
  },
  {
    no: "03",
    title: "Web・アプリ・AI・自動化まで一貫対応できる",
    body: "Webサイト、LP、Webアプリ、iOSアプリ、AIチャットボット、OCR、外部サービス連携など、複数の技術領域を組み合わせて支援できます。単体の制作だけでなく、業務全体の流れに合わせて必要な手段を選びます。",
  },
  {
    no: "04",
    title: "小さく作って、あとから拡張できる",
    body: "最初から大きなシステムを作るのではなく、必要な範囲から小さく作り、確認しながら拡張していきます。MVPやプロトタイプを活用することで、方向性を確認しながら無理なく進められます。",
  },
  {
    no: "05",
    title: "運用・改善まで伴走できる",
    body: "システムやサイトは、作って終わりではありません。公開後・導入後の運用状況を見ながら、改善、機能追加、計測、保守まで継続的に支援します。",
  },
];

const domains = [
  "Webアプリ",
  "iOSアプリ",
  "ホームページ・LP",
  "業務効率化",
  "AI活用",
  "OCR",
  "外部サービス連携",
  "管理画面・ダッシュボード",
  "自社プロダクト導入相談",
];

export default function StrengthsPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <main>
        <PageHero
          kicker="Strengths"
          title="MAXELUSが選ばれる理由"
          lead="作るだけでは終わらない。現場で使える・続けられる・改善できる仕組みをつくります。"
        />

        {/* 5つの強み */}
        <section className="bg-white py-20 md:py-32 px-4 md:px-8">
          <div className="max-w-[900px] mx-auto">
            <SectionHeader kicker="Strengths" title="5つの強み" bgText="STRENGTHS" align="left" className="mb-12 md:mb-16" />
            <div>
              {strengths.map((s, i) => (
                <AnimatedSection key={s.no} animation="fade-right" delay={i * 80}>
                  <div className="group flex gap-5 md:gap-8 border-t border-[#e5e7eb] py-6 md:py-8 hover:bg-[#fafafa] transition-colors">
                    <span className="shrink-0 text-2xl md:text-3xl font-bold text-[#fdc700] tabular-nums tracking-wider">
                      {s.no}
                    </span>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-[#1a1a1a] mb-2">{s.title}</h3>
                      <p className="text-sm md:text-base text-[#6b7280] leading-relaxed">{s.body}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
              <div className="border-t border-[#e5e7eb]" />
            </div>
          </div>
        </section>

        {/* 対応領域 */}
        <section className="bg-[#fafafa] py-20 md:py-32 px-4 md:px-8">
          <div className="max-w-[900px] mx-auto">
            <SectionHeader kicker="Capabilities" title="対応領域" bgText="DOMAINS" align="left" className="mb-10 md:mb-14" />
            <AnimatedSection animation="fade-up">
              <div className="flex flex-wrap gap-3">
                {domains.map((d) => (
                  <span
                    key={d}
                    className="px-4 py-2.5 bg-white border border-[#e5e7eb] rounded-full text-sm text-[#1a1a1a]"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}
