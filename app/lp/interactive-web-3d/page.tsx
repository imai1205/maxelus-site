"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "@/app/components/Footer";
import { AnimatedSection } from "@/app/components/AnimationProvider";
import dynamic from "next/dynamic";

// iPhoneデモを動的インポート（軽量化）
const IPhoneDemo = dynamic(() => import("@/app/components/InteractiveDemo").then(mod => ({ default: mod.IPhoneDemo })), {
  loading: () => <div className="h-[400px] flex items-center justify-center bg-[#fafafa] rounded-2xl"><div className="animate-pulse text-[#6b7280]">読み込み中...</div></div>,
  ssr: false
});

// 体験デモタブコンポーネント
function DemoTabs() {
  const [activeTab, setActiveTab] = useState<"3d" | "interactive" | "iphone">("3d");

  return (
    <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-lg overflow-hidden">
      {/* タブナビゲーション */}
      <div className="flex border-b border-[#e5e7eb]">
        {[
          { id: "3d" as const, label: "3D表示" },
          { id: "interactive" as const, label: "インタラクション" },
          { id: "iphone" as const, label: "iPhoneデモ" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-6 py-4 text-sm md:text-base font-medium transition-all ${
              activeTab === tab.id
                ? "bg-[#fff100] text-[#1a1a1a] border-b-2 border-[#1a1a1a]"
                : "text-[#6b7280] dark:text-[#9ca3af] hover:bg-[#fafafa] dark:hover:bg-[#374151]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* タブコンテンツ */}
      <div className="p-6 md:p-12 min-h-[500px] flex items-center justify-center">
        {activeTab === "3d" && (
          <div className="w-full max-w-4xl">
            <div className="aspect-video bg-gradient-to-br from-[#0b1220] via-[#1e293b] to-[#0b1220] rounded-xl relative overflow-hidden">
              {/* 3D風UI（軽量ダミー） */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* 3D風のキューブ（CSSのみ） */}
                  <div className="w-32 h-32 md:w-48 md:h-48 relative transform-gpu">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#fff100] to-[#fdc700] rounded-lg shadow-2xl transform rotate-45 hover:rotate-90 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#fdc700] to-[#fff100] rounded-lg shadow-2xl transform -rotate-45 hover:-rotate-90 transition-transform duration-700 opacity-50" />
                  </div>
                  <p className="text-white/70 text-sm md:text-base mt-8 text-center">
                    3Dモデルを操作できます（後で本物に差し替え可能）
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "interactive" && (
          <div className="w-full max-w-4xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <button
                  key={i}
                  className="aspect-square bg-gradient-to-br from-[#fff100] to-[#fdc700] rounded-xl flex items-center justify-center text-[#1a1a1a] font-bold text-lg md:text-xl hover:scale-110 active:scale-95 transition-transform duration-200 shadow-lg hover:shadow-2xl"
                  onClick={(e) => {
                    e.currentTarget.style.transform = "scale(0.9)";
                    setTimeout(() => {
                      e.currentTarget.style.transform = "";
                    }, 150);
                  }}
                >
                  {i}
                </button>
              ))}
            </div>
            <p className="text-[#6b7280] dark:text-[#9ca3af] text-sm md:text-base mt-6 text-center">
              クリックすると反応します（インタラクティブUIの例）
            </p>
          </div>
        )}

        {activeTab === "iphone" && (
          <div className="w-full flex justify-center">
            <IPhoneDemo />
          </div>
        )}
      </div>
    </div>
  );
}

export default function InteractiveWeb3DLP() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0b1220] font-sans">
      <main className="pt-14 md:pt-16">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-[#0b1220] via-[#1e293b] to-[#0b1220] py-20 md:py-32 overflow-hidden">
          <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 text-center">
            <AnimatedSection animation="fade-up">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                WordPressではできない
                <br />
                体験型Webサイト
              </h1>
              <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed mb-8">
                触れる・動く・伝わる
                <br />
                印象に残る「体験型」のWebサイトを制作します。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
                <Link
                  href="#demo"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-4 rounded-full border border-white/30 transition-all hover:scale-105"
                >
                  デモを見る
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
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* 体験デモセクション */}
        <section id="demo" className="py-16 md:py-24 px-4 md:px-8 bg-[#fafafa] dark:bg-[#1e293b] scroll-mt-20">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection animation="fade-up" className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-[#1a1a1a] dark:text-[#f9fafb] mb-4">
                体験デモ
              </h2>
              <p className="text-[#6b7280] dark:text-[#9ca3af] mb-8">
                3つの体験をタブで切り替えてご覧ください
              </p>
            </AnimatedSection>

            <DemoTabs />
          </div>
        </section>

        {/* できること（カード3〜6） */}
        <section className="py-16 md:py-24 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection animation="fade-up" className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-[#1a1a1a] dark:text-[#f9fafb] mb-4">
                できること
              </h2>
              <div className="w-20 h-1 bg-[#fff100] rounded-full mx-auto" />
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  title: "3Dモデルの組み込み",
                  description:
                    "Webブラウザ上で3Dモデルを操作できる。商品の360度確認や、空間の可視化が可能。",
                },
                {
                  title: "インタラクティブアニメーション",
                  description:
                    "スクロールに連動したアニメーションや、マウス操作で動く要素など、動的な体験を提供。",
                },
                {
                  title: "iPhoneデモの組み込み",
                  description:
                    "実際に操作できるiPhoneデモをサイトに組み込み。アプリの体験をそのままWebで。",
                },
                {
                  title: "CTA最適化",
                  description:
                    "ユーザーの行動に合わせてCTAボタンを最適化。コンバージョン率を向上させます。",
                },
                {
                  title: "速度最適化",
                  description:
                    "最新のWeb技術により、3Dやアニメーションでも高速表示を実現。",
                },
                {
                  title: "計測・分析",
                  description:
                    "ユーザーの行動を計測し、分析。継続的な改善を行います。",
                },
              ].map((value, i) => (
                <AnimatedSection
                  key={i}
                  animation="fade-up"
                  delay={i * 100}
                >
                  <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow h-full">
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

        {/* 用途例（業種別） */}
        <section className="py-16 md:py-24 px-4 md:px-8 bg-[#fafafa]">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection animation="fade-up" className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-[#1a1a1a] dark:text-[#f9fafb] mb-4">
                用途例
              </h2>
              <div className="w-20 h-1 bg-[#fff100] rounded-full mx-auto" />
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {[
                {
                  title: "製品紹介",
                  description: "3Dモデルで製品を360度確認",
                  icon: "📦",
                },
                {
                  title: "店舗・物件",
                  description: "空間を3Dで可視化",
                  icon: "🏢",
                },
                {
                  title: "設備・機械",
                  description: "設備の構造を3Dで説明",
                  icon: "⚙️",
                },
                {
                  title: "ブランドサイト",
                  description: "印象に残る体験型サイト",
                  icon: "✨",
                },
              ].map((use, i) => (
                <AnimatedSection
                  key={i}
                  animation="fade-up"
                  delay={i * 100}
                >
                  <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
                    <div className="text-4xl mb-4">{use.icon}</div>
                    <h3 className="text-lg font-bold text-[#1a1a1a] mb-2">
                      {use.title}
                    </h3>
                    <p className="text-sm text-[#6b7280]">{use.description}</p>
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
              <h2 className="text-2xl md:text-4xl font-bold text-[#1a1a1a] dark:text-[#f9fafb] mb-4">
                制作事例
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
              <h2 className="text-2xl md:text-4xl font-bold text-[#1a1a1a] dark:text-[#f9fafb] mb-4">
                進め方
              </h2>
              <div className="w-20 h-1 bg-[#fff100] rounded-full mx-auto" />
            </AnimatedSection>

            <div className="space-y-6">
              {[
                {
                  step: 1,
                  title: "コンセプト設計・デモ",
                  description:
                    "どのような体験を作るか設計し、デモで完成イメージを共有します。",
                },
                {
                  step: 2,
                  title: "制作・実装",
                  description:
                    "3Dやアニメーションを実装し、体験型のサイトを制作します。",
                },
                {
                  step: 3,
                  title: "納品・サポート",
                  description:
                    "サイトを納品し、使い方のサポートや機能追加に対応します。",
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
                50万円〜（機能の複雑さにより変動）
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
              <h2 className="text-2xl md:text-4xl font-bold text-[#1a1a1a] dark:text-[#f9fafb] mb-4">
                よくある質問
              </h2>
              <div className="w-20 h-1 bg-[#fff100] rounded-full mx-auto" />
            </AnimatedSection>

            <div className="space-y-4">
              {[
                {
                  question: "3Dモデルは自分で追加できますか？",
                  answer:
                    "CMSから3Dモデルをアップロードできる機能も実装可能です。詳しくは無料相談でご提案させていただきます。",
                },
                {
                  question: "スマホでも快適に動作しますか？",
                  answer:
                    "はい、最新のWeb技術により、スマホでも快適に動作します。ただし、3Dなどの重い機能は軽量化を心がけています。",
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
                どのような体験型サイトを作りたいか、お気軽にご相談ください。
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
