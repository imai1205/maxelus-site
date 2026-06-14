"use client";

import Link from "next/link";
import { LpLogo } from "@/components/ui";
import Footer from "@/app/components/Footer";
import { AnimatedSection } from "@/app/components/AnimationProvider";

export default function AIOCRAutomationLP() {
  return (
    <div className="min-h-screen bg-white font-sans overflow-x-clip">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-[#e5e7eb]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
          <LpLogo />
          <Link href="/contact" className="bg-[#fff100] hover:bg-[#fdc700] text-[#1a1a1a] font-medium px-5 py-2 rounded-full text-sm transition-all">無料相談</Link>
        </div>
      </header>
      <main className="pt-14 md:pt-16">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-[#0b1220] via-[#1e293b] to-[#0b1220] py-20 md:py-32 overflow-hidden">
          <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 text-center">
            <AnimatedSection animation="fade-up">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight break-keep">
                AI機能組込み
                <br />
                業務を自動化する
              </h1>
              <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed mb-8 break-keep">
                要約/分類/検索/生成/動画分析。
                <br className="md:hidden" />
                AI技術を活用して、
                <br className="hidden md:block" />
                業務効率を大幅に向上させます。
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-[#fff100] hover:bg-[#fdc700] text-[#1a1a1a] font-medium px-8 py-4 rounded-full transition-all hover:scale-105"
              >
                無料相談する
              </Link>
            </AnimatedSection>
          </div>
        </section>

        {/* 価値（3つ） */}
        <section className="py-16 md:py-24 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection animation="fade-up" className="text-center mb-12 relative">
              <span className="section-bg-text left-1/2 -translate-x-1/2 -top-6 md:-top-12 text-[30px] sm:text-[40px] md:text-[60px] lg:text-[80px]">REASONS</span>
              <h2 className="text-2xl md:text-4xl font-bold text-[#1a1a1a] mb-4 relative">
                選ばれる理由
              </h2>
              <div className="w-20 h-1 bg-[#fff100] rounded-full mx-auto relative" />
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "文書の要約・分類",
                  description:
                    "自然言語処理により、大量の文書を自動で要約・分類。検索も爆速に。",
                },
                {
                  title: "画像・動画の分析",
                  description:
                    "コンピュータビジョンで画像や動画を分析。OCRや物体検出などに対応。",
                },
                {
                  title: "予測分析・レコメンデーション",
                  description:
                    "データから予測や分析を行い、最適な提案を自動で生成します。",
                },
              ].map((value, i) => (
                <AnimatedSection
                  key={i}
                  animation="fade-up"
                  delay={i * 100}
                >
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h3 className="text-xl font-bold text-[#1a1a1a] mb-3">
                      {value.title}
                    </h3>
                    <p className="text-[#6b7280]">{value.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* 事例枠（カード3つ：ダミー） */}
        <section className="py-16 md:py-24 px-4 md:px-8 bg-[#fafafa]">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection animation="fade-up" className="text-center mb-12 relative">
              <span className="section-bg-text left-1/2 -translate-x-1/2 -top-6 md:-top-12 text-[30px] sm:text-[40px] md:text-[60px] lg:text-[80px]">CASES</span>
              <h2 className="text-2xl md:text-4xl font-bold text-[#1a1a1a] mb-4 relative">
                導入事例
              </h2>
              <div className="w-20 h-1 bg-[#fff100] rounded-full mx-auto" />
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <AnimatedSection
                  key={i}
                  animation="fade-up"
                  delay={i * 100}
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                    <div className="aspect-video bg-[#e5e7eb] flex items-center justify-center">
                      <span className="text-[#6b7280]">事例画像 {i}</span>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-[#1a1a1a] mb-2">
                        事例タイトル {i}
                      </h3>
                      <p className="text-[#6b7280] text-sm">
                        事例の説明文が入ります。後からFigmaデザインで差し替えます。
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* 進め方（3ステップ） */}
        <section className="py-16 md:py-24 px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection animation="fade-up" className="text-center mb-12 relative">
              <span className="section-bg-text left-1/2 -translate-x-1/2 -top-6 md:-top-12 text-[30px] sm:text-[40px] md:text-[60px] lg:text-[80px]">FLOW</span>
              <h2 className="text-2xl md:text-4xl font-bold text-[#1a1a1a] mb-4 relative">
                進め方
              </h2>
              <div className="w-20 h-1 bg-[#fff100] rounded-full mx-auto" />
            </AnimatedSection>

            <div className="space-y-6">
              {[
                {
                  step: 1,
                  title: "要件定義・AI選定",
                  description:
                    "どのようなAI機能が必要かヒアリングし、最適なAI技術を選定します。",
                },
                {
                  step: 2,
                  title: "実装・学習",
                  description:
                    "AI機能を実装し、必要に応じて学習データを準備して精度を向上させます。",
                },
                {
                  step: 3,
                  title: "運用・改善",
                  description:
                    "実際に運用しながら、精度を改善し、機能を追加します。",
                },
              ].map((step, i) => (
                <AnimatedSection
                  key={i}
                  animation="fade-up"
                  delay={i * 100}
                >
                  <div className="flex gap-4 p-6 bg-[#fafafa] rounded-xl">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#fff100] rounded-full flex items-center justify-center text-[#1a1a1a] font-bold text-lg">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-[#1a1a1a] mb-2 text-lg">
                        {step.title}
                      </h3>
                      <p className="text-[#6b7280]">{step.description}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* 料金目安 */}
        <section className="py-16 md:py-24 px-4 md:px-8 bg-[#fafafa]">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection animation="fade-up">
              <h2 className="text-2xl md:text-4xl font-bold text-[#1a1a1a] mb-6">
                料金目安
              </h2>
              <p className="text-lg font-medium text-[#1a1a1a] bg-[#fffef0] px-6 py-4 rounded-lg border border-[#fff100] inline-block">
                40万円〜（AI機能の複雑さ・データ量により変動）
              </p>
              <p className="text-[#6b7280] mt-4">
                詳しくは無料相談でご提案させていただきます。
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24 px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection animation="fade-up" className="text-center mb-12 relative">
              <span className="section-bg-text left-1/2 -translate-x-1/2 -top-6 md:-top-12 text-[30px] sm:text-[40px] md:text-[60px] lg:text-[80px]">FAQ</span>
              <h2 className="text-2xl md:text-4xl font-bold text-[#1a1a1a] mb-4 relative">
                よくある質問
              </h2>
              <div className="w-20 h-1 bg-[#fff100] rounded-full mx-auto" />
            </AnimatedSection>

            <div className="space-y-4">
              {[
                {
                  question: "どの程度の精度が出ますか？",
                  answer:
                    "AI機能により異なりますが、一般的には80%以上の精度を目指します。学習データを増やすことでさらに向上します。",
                },
                {
                  question: "既存システムに組み込めますか？",
                  answer:
                    "はい、API形式で提供するため、既存システムに組み込むことができます。",
                },
              ].map((faq, i) => (
                <AnimatedSection
                  key={i}
                  animation="fade-up"
                  delay={i * 100}
                >
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="font-bold text-[#1a1a1a] mb-2">
                      Q. {faq.question}
                    </h3>
                    <p className="text-[#6b7280]">A. {faq.answer}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#0b1220] py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#fff100] rounded-full blur-[100px]" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#fdc700] rounded-full blur-[120px]" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 text-center">
            <AnimatedSection animation="fade-up">
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-6">
                まずは無料相談から
              </h2>
              <p className="text-base md:text-lg text-white/70 mb-8 max-w-2xl mx-auto">
                どのようなAI機能を組み込みたいか、お気軽にご相談ください。
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-[#fff100] hover:bg-[#fdc700] text-[#1a1a1a] font-medium px-8 py-4 rounded-full transition-all hover:scale-105"
              >
                無料相談する
              </Link>
            </AnimatedSection>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
