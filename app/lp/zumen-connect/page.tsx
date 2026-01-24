"use client";

import Link from "next/link";
import Footer from "@/app/components/Footer";
import { AnimatedSection } from "@/app/components/AnimationProvider";

export default function ZumenConnectLP() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <main className="pt-14 md:pt-16">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-[#0b1220] via-[#1e293b] to-[#0b1220] py-20 md:py-32 overflow-hidden">
          <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 text-center">
            <AnimatedSection animation="fade-up">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                図面コネクト
                <br />
                図面が「資産」になる
              </h1>
              <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed mb-8">
                OCRで読み取り、AIで項目整理。
                <br />
                図番・会社・材質などで探せる状態にして、現場のムダを削減します。
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-[#fff100] hover:bg-[#fdc700] text-[#1a1a1a] font-medium px-8 py-4 rounded-full transition-all hover:scale-105"
              >
                無料相談する
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </AnimatedSection>
          </div>
        </section>

        {/* 価値（3つ） */}
        <section className="py-16 md:py-24 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection animation="fade-up" className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-[#1a1a1a] mb-4">
                選ばれる理由
              </h2>
              <div className="w-20 h-1 bg-[#fff100] rounded-full mx-auto" />
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "OCRで自動読み取り",
                  description:
                    "PDFや画像の図面をOCRで自動読み取り。手作業での入力が不要に。",
                },
                {
                  title: "AIで項目自動抽出",
                  description:
                    "図番・会社名・材質・寸法などをAIが自動抽出。検索可能な状態に。",
                },
                {
                  title: "類似図面検索",
                  description:
                    "過去の図面から類似を発見。設計の参考や再利用が簡単に。",
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
            <AnimatedSection animation="fade-up" className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-[#1a1a1a] mb-4">
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
            <AnimatedSection animation="fade-up" className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-[#1a1a1a] mb-4">
                進め方
              </h2>
              <div className="w-20 h-1 bg-[#fff100] rounded-full mx-auto" />
            </AnimatedSection>

            <div className="space-y-6">
              {[
                {
                  step: 1,
                  title: "無料相談・デモ提示",
                  description:
                    "現状の課題をヒアリングし、触れるデモで完成イメージを共有します。",
                },
                {
                  step: 2,
                  title: "設計・開発",
                  description:
                    "既存図面の取り込み方法を設計し、検索機能を実装します。",
                },
                {
                  step: 3,
                  title: "運用開始・サポート",
                  description:
                    "導入後も使い方のサポートや機能追加に対応します。",
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
                30万円〜（図面数・機能要件により変動）
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
            <AnimatedSection animation="fade-up" className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-[#1a1a1a] mb-4">
                よくある質問
              </h2>
              <div className="w-20 h-1 bg-[#fff100] rounded-full mx-auto" />
            </AnimatedSection>

            <div className="space-y-4">
              {[
                {
                  question: "既存の図面データは取り込めますか？",
                  answer:
                    "はい、PDFや画像形式の図面を一括でアップロードできます。OCRで自動的にテキスト化し、検索可能な状態にします。",
                },
                {
                  question: "類似図面検索はどの程度正確ですか？",
                  answer:
                    "AI技術により、図面の形状や構造から類似度を判定します。精度は約85%以上で、さらに改善を続けています。",
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
                図面管理の課題を解決したい、お気軽にご相談ください。
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-[#fff100] hover:bg-[#fdc700] text-[#1a1a1a] font-medium px-8 py-4 rounded-full transition-all hover:scale-105"
              >
                無料相談する
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </AnimatedSection>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
