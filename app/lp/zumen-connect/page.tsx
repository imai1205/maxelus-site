"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "@/app/components/Footer";
import { AnimatedSection } from "@/app/components/AnimationProvider";

export default function ZumenConnectLP() {
  const [formData, setFormData] = useState({
    company: "",
    name: "",
    department: "",
    position: "",
    email: "",
    phone: "",
    message: "",
    privacy: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // フォーム送信処理（後で実装）
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-[#e5e7eb]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-[#1a1a1a]">
            図面コネクト
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm text-[#6b7280] hover:text-[#1a1a1a]">
              機能
            </a>
            <a href="#outcomes" className="text-sm text-[#6b7280] hover:text-[#1a1a1a]">
              効果
            </a>
            <a href="#pricing" className="text-sm text-[#6b7280] hover:text-[#1a1a1a]">
              料金
            </a>
            <Link
              href="#contact"
              className="bg-[#fff100] hover:bg-[#fdc700] text-[#1a1a1a] font-medium px-5 py-2 rounded-full text-sm transition-all"
            >
              無料デモを見る
            </Link>
          </nav>
        </div>
      </header>

      <main className="pt-14">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-[#fffef0] via-white to-white py-20 md:py-32 overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#fff100]/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-[#fdc700]/10 rounded-full blur-[120px]" />
          <div className="absolute top-40 right-1/3 w-64 h-64 bg-[#fff100]/5 rounded-full blur-[80px]" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div>
                <AnimatedSection animation="fade-up" className="relative">
                  <span className="section-bg-text left-0 -top-6 md:-top-12 text-[30px] sm:text-[40px] md:text-[60px] lg:text-[80px] xl:text-[100px]">PRODUCT</span>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a1a1a] mb-6 leading-tight relative">
                    図面・関連資料・見積を、
                    <br />
                    <span className="text-[#fff100]">探す時間ゼロへ。</span>
                  </h1>
                  <p className="text-lg md:text-xl text-[#6b7280] mb-6 leading-relaxed">
                    OCRで自動整理。AI類似検索で過去実績に即アクセス。
                    <br />
                    見積〜進捗〜原価まで、図面を起点に一気通貫。
                  </p>

                  {/* Feature highlights */}
                  <div className="flex flex-wrap gap-6 mb-8">
                    {[
                      { label: "見積スピード", desc: "類似検索で即参照" },
                      { label: "検索精度", desc: "OCR自動抽出" },
                      { label: "原価管理", desc: "実績比較で精度改善" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <div className="w-5 h-5 bg-[#fff100] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-3 h-3 text-[#1a1a1a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-[#1a1a1a]">{item.label}</div>
                          <div className="text-xs text-[#6b7280]">{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <Link
                      href="#contact"
                      className="inline-flex items-center justify-center gap-2 bg-[#fff100] hover:bg-[#fdc700] text-[#1a1a1a] font-medium px-6 py-3 rounded-full transition-all hover:scale-105"
                    >
                      無料デモを見る
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                    <Link
                      href="#contact"
                      className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#fafafa] text-[#1a1a1a] font-medium px-6 py-3 rounded-full border border-[#e5e7eb] transition-all"
                    >
                      資料をダウンロード
                    </Link>
                  </div>

                  {/* Additional info */}
                  <div className="flex flex-wrap gap-6 text-sm text-[#6b7280]">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      最短即日で運用開始
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      移行支援あり
                    </div>
                  </div>
                </AnimatedSection>
              </div>

              {/* Right Content - Image */}
              <AnimatedSection animation="fade-up" delay={200}>
                <div className="relative">
                  <div className="bg-white rounded-2xl shadow-2xl p-4 border border-[#e5e7eb]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
                      alt="図面コネクト ダッシュボード"
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Problem/Solution Section */}
        <section className="py-16 md:py-24 px-4 md:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection animation="fade-up" className="text-center mb-12 relative">
              <span className="section-bg-text left-1/2 -translate-x-1/2 -top-6 md:-top-12 text-[30px] sm:text-[40px] md:text-[60px] lg:text-[80px]">PROBLEM</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4 relative">
                現場の3つの課題を、一気に解決
              </h2>
              <p className="text-lg text-[#6b7280] relative">
                図面管理の煩雑さを、シンプルな仕組みで効率化します
              </p>
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: "⏱️",
                  title: "見積が遅い",
                  description: "類似図面から「根拠ある見積」を最短で",
                  items: ["過去実績参照", "見積項目自動生成", "対応スピードUP"],
                },
                {
                  icon: "📁",
                  title: "資料が散らばる",
                  description: "図面に、見積・工程・3D・指示書を全部紐づけ",
                  items: ["探す時間削減", "引き継ぎが楽", "ミス防止"],
                },
                {
                  icon: "🔍",
                  title: "検索できない",
                  description: "図面から自動で「検索タグ」を作る",
                  items: ["図番・品名・材質等を抽出", "AND/OR検索", "再利用が増える"],
                },
              ].map((item, i) => (
                <AnimatedSection key={i} animation="fade-up" delay={i * 100}>
                  <div className="bg-white rounded-2xl p-8 shadow-lg border border-[#e5e7eb] hover:shadow-xl transition-shadow">
                    <div className="w-12 h-12 bg-[#fff100] rounded-full flex items-center justify-center text-2xl mb-6">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-[#1a1a1a] mb-3">{item.title}</h3>
                    <p className="text-[#6b7280] mb-6">{item.description}</p>
                    <ul className="space-y-2">
                      {item.items.map((listItem, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-[#fff100] rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm text-[#1a1a1a]">{listItem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 px-4 md:px-8 bg-[#fafafa]">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection animation="fade-up" className="text-center mb-12 relative">
              <span className="section-bg-text left-1/2 -translate-x-1/2 -top-6 md:-top-12 text-[30px] sm:text-[40px] md:text-[60px] lg:text-[80px]">FEATURES</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4 relative">
                必要な機能を、すべて統合
              </h2>
              <p className="text-lg text-[#6b7280]">
                図面管理から見積作成、進捗・原価管理まで一気通貫で対応
              </p>
            </AnimatedSection>

            {/* Feature screenshots */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {[1, 2, 3].map((i) => (
                <AnimatedSection key={i} animation="fade-up" delay={i * 100}>
                  <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80&sig=${i}`}
                      alt={`機能${i}`}
                      className="w-full h-auto"
                    />
                  </div>
                </AnimatedSection>
              ))}
            </div>

            {/* Feature cards grid */}
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { number: "01", title: "自動OCR整理", desc: "図面から図番・品名・材質・処理などを自動抽出。", benefit: "入力工数とミスを削減" },
                { number: "02", title: "AI類似検索", desc: "過去の類似図面を即座に検索・参照可能に。", benefit: "見積スピードUP" },
                { number: "03", title: "関連資料リンク", desc: "図面に見積・工程表・3Dデータ・指示書を紐付け。", benefit: "必要情報が1画面に集約" },
                { number: "04", title: "条件検索", desc: "材質・処理・日付などAND/OR検索でヒット。", benefit: "目的の図面に即到達" },
                { number: "05", title: "見積作成", desc: "抽出情報を反映し、テンプレートと履歴で標準化。", benefit: "作成時間を大幅短縮" },
                { number: "06", title: "進捗管理", desc: "案件のステータス管理、ガント/カレンダー表示。", benefit: "プロジェクトを可視化" },
                { number: "07", title: "原価/実績", desc: "見積と実績を比較し、原価管理の精度を改善。", benefit: "利益率向上に貢献" },
                { number: "08", title: "モバイル", desc: "スマホ・タブレットから現場や出張先でアクセス。", benefit: "場所を選ばず業務継続" },
              ].map((feature, i) => (
                <AnimatedSection key={i} animation="fade-up" delay={i * 50}>
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-[#e5e7eb] hover:shadow-xl transition-shadow h-full">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-bold text-[#1a1a1a]">{feature.number}</span>
                      <svg className="w-5 h-5 text-[#6b7280]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-[#1a1a1a] mb-2">{feature.title}</h3>
                    <p className="text-sm text-[#6b7280] mb-3">{feature.desc}</p>
                    <p className="text-xs text-[#fff100] font-medium">{feature.benefit}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Outcomes Section */}
        <section id="outcomes" className="py-16 md:py-24 px-4 md:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection animation="fade-up" className="text-center mb-12 relative">
              <span className="section-bg-text left-1/2 -translate-x-1/2 -top-6 md:-top-12 text-[30px] sm:text-[40px] md:text-[60px] lg:text-[80px]">OUTCOMES</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4 relative">
                導入企業が実感する効果
              </h2>
              <p className="text-lg text-[#6b7280]">
                時間・コスト・精度、すべてが改善します
              </p>
            </AnimatedSection>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  icon: "⏱️",
                  label: "見積作成時間",
                  before: "数時間",
                  after: "数分",
                  desc: "類似検索で過去実績を即参照",
                },
                {
                  icon: "🔍",
                  label: "検索時間",
                  before: "30分/日",
                  after: "5分/日",
                  desc: "OCR自動抽出で瞬時にヒット",
                },
                {
                  icon: "❌",
                  label: "図面ミス",
                  before: "月数件",
                  after: "ほぼゼロ",
                  desc: "最新版を自動管理・紐付け",
                },
                {
                  icon: "📊",
                  label: "原価精度",
                  before: "感覚頼み",
                  after: "データ根拠",
                  desc: "実績比較で赤字要因を特定",
                },
              ].map((outcome, i) => (
                <AnimatedSection key={i} animation="fade-up" delay={i * 100}>
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-[#e5e7eb] text-center">
                    <div className="w-10 h-10 bg-[#fff100] rounded-full flex items-center justify-center text-xl mx-auto mb-4">
                      {outcome.icon}
                    </div>
                    <div className="text-sm font-medium text-[#6b7280] mb-3">{outcome.label}</div>
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <span className="text-lg font-bold text-[#1a1a1a]">{outcome.before}</span>
                      <span className="text-xl text-[#6b7280]">→</span>
                      <span className="text-2xl font-bold text-[#fff100]">{outcome.after}</span>
                    </div>
                    <p className="text-xs text-[#6b7280]">{outcome.desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            <p className="text-center text-sm text-[#6b7280] mt-8">
              ※効果は導入環境により異なります。まずはデモで体験してください。
            </p>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 md:py-24 px-4 md:px-8 bg-[#fafafa]">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection animation="fade-up" className="text-center mb-12 relative">
              <span className="section-bg-text left-1/2 -translate-x-1/2 -top-6 md:-top-12 text-[30px] sm:text-[40px] md:text-[60px] lg:text-[80px]">PROCESS</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4 relative">
                導入の流れ
              </h2>
              <p className="text-lg text-[#6b7280]">
                ヒアリングから運用開始まで、丁寧にサポートします
              </p>
            </AnimatedSection>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  step: "01",
                  title: "デモ＋ヒアリング",
                  desc: "訪問またはビデオ会議で実際の画面をご確認。課題や運用をお聞かせください。",
                },
                {
                  step: "02",
                  title: "初期設定",
                  desc: "ユーザー権限、テンプレート、運用ルールを一緒に設計します。",
                },
                {
                  step: "03",
                  title: "取り込み支援",
                  desc: "既存の図面・データの移行をサポート。代行取り込みも可能です。",
                },
                {
                  step: "04",
                  title: "運用開始",
                  desc: "専任担当が定着までサポート。随時ご要望をヒアリングし改善します。",
                },
              ].map((step, i) => (
                <AnimatedSection key={i} animation="fade-up" delay={i * 100}>
                  <div className="relative">
                    {i < 3 && (
                      <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-[#e5e7eb] z-0" />
                    )}
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-[#e5e7eb] relative z-10">
                      <div className="w-12 h-12 bg-[#fff100] rounded-full flex items-center justify-center text-lg font-bold text-[#1a1a1a] mb-4">
                        {step.step}
                      </div>
                      <div className="w-10 h-10 bg-[#fafafa] rounded-full flex items-center justify-center mb-4">
                        <svg className="w-5 h-5 text-[#6b7280]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold text-[#1a1a1a] mb-3">{step.title}</h3>
                      <p className="text-sm text-[#6b7280] leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            <p className="text-center text-sm text-[#6b7280] mt-8">
              最短即日から運用開始可能。お急ぎの場合もご相談ください。
            </p>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-16 md:py-24 px-4 md:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection animation="fade-up" className="text-center mb-12 relative">
              <span className="section-bg-text left-1/2 -translate-x-1/2 -top-6 md:-top-12 text-[30px] sm:text-[40px] md:text-[60px] lg:text-[80px]">PRICING</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4 relative">
                シンプルな料金体系
              </h2>
              <p className="text-lg text-[#6b7280]">
                必要な機能をすべて含んだワンプライス
              </p>
            </AnimatedSection>

            <AnimatedSection animation="fade-up">
              <div className="bg-white rounded-2xl border-2 border-[#fff100] shadow-xl overflow-hidden">
                <div className="bg-[#fff100] px-8 py-6">
                  <h3 className="text-2xl font-bold text-[#1a1a1a]">スタンダードプラン</h3>
                  <p className="text-sm text-[#1a1a1a]/70 mt-2">すべての機能が使えるオールインワンプラン</p>
                </div>
                <div className="px-8 py-8 text-center">
                  <div className="flex items-baseline justify-center gap-2 mb-2">
                    <span className="text-5xl font-bold text-[#1a1a1a]">30,000</span>
                    <span className="text-2xl text-[#6b7280]">円〜</span>
                  </div>
                  <p className="text-sm text-[#6b7280] mb-4">月額（税込）</p>
                  <p className="text-xs text-[#6b7280] mb-8">初期費用：要相談（移行内容により変動）</p>

                  <div className="space-y-3 mb-8 text-left">
                    {[
                      "OCR自動抽出",
                      "AI類似検索",
                      "見積作成機能",
                      "進捗・案件管理",
                      "原価・実績管理",
                      "モバイル対応",
                      "チャット・メール・電話サポート",
                      "定期ミーティング",
                    ].map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-[#fff100] rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3 text-[#1a1a1a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-sm text-[#1a1a1a]">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="#contact"
                    className="inline-flex items-center justify-center gap-2 bg-[#fff100] hover:bg-[#fdc700] text-[#1a1a1a] font-medium px-8 py-3 rounded-full transition-all hover:scale-105 w-full"
                  >
                    無料デモを申し込む
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <p className="text-xs text-[#6b7280] mt-4">
                    まずはデモで運用イメージを確認 → その後お見積り
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Support Section */}
        <section className="py-16 md:py-24 px-4 md:px-8 bg-[#fafafa]">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection animation="fade-up" className="text-center mb-12 relative">
              <span className="section-bg-text left-1/2 -translate-x-1/2 -top-6 md:-top-12 text-[30px] sm:text-[40px] md:text-[60px] lg:text-[80px]">SUPPORT</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4 relative">
                安心のサポート体制
              </h2>
              <p className="text-lg text-[#6b7280]">
                導入から定着まで、専任担当がしっかりサポート
              </p>
            </AnimatedSection>

            <div className="grid md:grid-cols-4 gap-6 mb-12">
              {[
                {
                  icon: "📚",
                  title: "操作説明",
                  desc: "ハンズオンセミナーで実際の操作を習得",
                },
                {
                  icon: "💬",
                  title: "日常サポート",
                  desc: "チャット・メール・電話でいつでも質問可能",
                },
                {
                  icon: "📅",
                  title: "定期ミーティング",
                  desc: "運用状況を確認し、改善提案を実施",
                },
                {
                  icon: "🔄",
                  title: "継続改善",
                  desc: "ご要望をヒアリングし、システムを進化",
                },
              ].map((support, i) => (
                <AnimatedSection key={i} animation="fade-up" delay={i * 100}>
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-[#e5e7eb] text-center">
                    <div className="w-16 h-16 bg-[#fff100] rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                      {support.icon}
                    </div>
                    <h3 className="text-lg font-bold text-[#1a1a1a] mb-3">{support.title}</h3>
                    <p className="text-sm text-[#6b7280]">{support.desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg border border-[#e5e7eb] text-center max-w-2xl mx-auto">
              <p className="text-lg text-[#1a1a1a]">
                <span className="font-bold">専任担当制</span>
                で、御社の業務を深く理解。
                <br />
                最適な運用方法を一緒に作り上げます。
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 md:py-24 px-4 md:px-8 bg-[#0b1220] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-96 h-96 bg-[#fff100] rounded-full blur-[100px]" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#fdc700] rounded-full blur-[120px]" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto">
            <AnimatedSection animation="fade-up" className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                まずは、無料デモで&quot;探す時間&quot;が消える体験を。
              </h2>
              <p className="text-lg text-white/70">
                実際の画面を見ながら、御社の課題解決をご提案します
              </p>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={200}>
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-2xl">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
                      会社名 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 border border-[#e5e7eb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fff100]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
                      お名前 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-[#e5e7eb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fff100]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1a1a1a] mb-2">部署</label>
                    <input
                      type="text"
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full px-4 py-3 border border-[#e5e7eb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fff100]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1a1a1a] mb-2">役職</label>
                    <input
                      type="text"
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      className="w-full px-4 py-3 border border-[#e5e7eb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fff100]"
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
                    メールアドレス <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-[#e5e7eb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fff100]"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
                    電話番号 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-[#e5e7eb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fff100]"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
                    お問い合わせ内容（任意）
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="ご質問やご要望がありましたらご記入ください"
                    className="w-full px-4 py-3 border border-[#e5e7eb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fff100]"
                  />
                </div>
                <div className="mb-6">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={formData.privacy}
                      onChange={(e) => setFormData({ ...formData, privacy: e.target.checked })}
                      className="mt-1 w-4 h-4 text-[#fff100] border-[#e5e7eb] rounded focus:ring-[#fff100]"
                    />
                    <span className="text-sm text-[#1a1a1a]">
                      <span className="text-red-500">*</span> 個人情報の取り扱いについて同意します。お預かりした情報は、お問い合わせ対応および製品のご案内のみに使用いたします。
                    </span>
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#fff100] hover:bg-[#fdc700] text-[#1a1a1a] font-medium px-8 py-3 rounded-full transition-all hover:scale-105 flex items-center justify-center gap-2"
                >
                  無料デモを申し込む
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
                <div className="text-center mt-6">
                  <p className="text-sm text-[#6b7280] mb-4">または</p>
                  <Link
                    href="#contact"
                    className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#fafafa] text-[#1a1a1a] font-medium px-6 py-2 rounded-full border border-[#e5e7eb] transition-all"
                  >
                    資料をダウンロード
                  </Link>
                </div>
              </form>
            </AnimatedSection>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
