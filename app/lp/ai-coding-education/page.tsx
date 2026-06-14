"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "@/app/components/Footer";
import { AnimatedSection } from "@/app/components/AnimationProvider";
import { LpLogo } from "@/components/ui";

// Figmaから取得した画像URL
const imgImageWithFallback = "https://www.figma.com/api/mcp/asset/0f1b84c5-eff2-4f99-9883-8f2fcbf08767";
const imgImageWithFallback1 = "https://www.figma.com/api/mcp/asset/034ebee1-9179-4af6-be6c-f1a872a8065c";
const imgImageWithFallback2 = "https://www.figma.com/api/mcp/asset/d3cb16d4-eca5-4eae-972e-007cad9fdffc";
const imgImageWithFallback3 = "https://www.figma.com/api/mcp/asset/06ada03b-db4a-451a-88f1-bcf066d78883";
const imgImageWithFallback4 = "https://www.figma.com/api/mcp/asset/7312061d-c5b1-4043-9185-e8c4fbfb9c60";
const imgImageWithFallback5 = "https://www.figma.com/api/mcp/asset/bbf49972-a72c-4ab4-8214-760437bffa66";

export default function AICodingEducationLP() {
  return (
    <div className="min-h-screen bg-white font-sans overflow-x-clip">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-[#e5e7eb]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
          <LpLogo />
          <nav className="hidden md:flex items-center gap-6">
            <a href="#curriculum" className="text-sm text-[#6b7280] hover:text-[#1a1a1a]">
              カリキュラム
            </a>
            <a href="#cases" className="text-sm text-[#6b7280] hover:text-[#1a1a1a]">
              事例
            </a>
            <a href="#pricing" className="text-sm text-[#6b7280] hover:text-[#1a1a1a]">
              料金
            </a>
            <Link
              href="#contact"
              className="bg-[#fff100] hover:bg-[#fdc700] text-[#1a1a1a] font-medium px-5 py-2 rounded-full text-sm transition-all"
            >
              無料講座を見る
            </Link>
          </nav>
        </div>
      </header>

      <main className="pt-14">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-[#ff6900] via-[#f54900] to-[#ff6900] py-20 md:py-32 overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#fff100]/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-[#ffdf20]/10 rounded-full blur-[120px]" />
          <div className="absolute top-40 right-1/3 w-64 h-64 bg-[#fff100]/5 rounded-full blur-[80px]" />
          <div className="absolute inset-0 opacity-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imgImageWithFallback4} alt="" className="w-full h-full object-cover" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center">
              <AnimatedSection animation="fade-up" className="relative">
                <span className="section-bg-text left-1/2 -translate-x-1/2 -top-6 md:-top-12 text-[30px] sm:text-[40px] md:text-[60px] lg:text-[80px] xl:text-[100px] text-white/10">EDUCATION</span>
                <div className="flex flex-wrap justify-center gap-3 mb-6">
                  <span className="bg-white border border-[#ff6900] text-[#f54900] px-3 py-1 rounded-full text-sm font-bold">
                    業務効率化ツール
                  </span>
                  <span className="bg-white border border-[#ff6900] text-[#f54900] px-3 py-1 rounded-full text-sm font-bold">
                    アプリ
                  </span>
                  <span className="bg-white border border-[#ff6900] text-[#f54900] px-3 py-1 rounded-full text-sm font-bold">
                    GAS/Python
                  </span>
                </div>
                <div className="bg-[#ffdf20] border-2 border-black rounded-lg shadow-lg px-4 py-2 mb-6 inline-block">
                  <p className="text-black font-bold text-sm md:text-base">
                    初めてのAI Coding 0円キャンペーン
                  </p>
                </div>
                <div className="mb-8">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <span className="text-[#ffdf20] font-bold text-sm md:text-base">\\</span>
                    <p className="text-white font-bold text-lg md:text-xl">知識</p>
                    <span className="text-[#ffdf20] font-bold text-4xl md:text-5xl">0</span>
                    <p className="text-white font-bold text-lg md:text-xl">から始める</p>
                    <span className="text-[#ffdf20] font-bold text-sm md:text-base">//</span>
                  </div>
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight break-keep">
                    かんたんすぎる！
                    <br />
                    プログラミング×AI
                  </h1>
                </div>
                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 max-w-4xl mx-auto">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-[#ff6900] rounded px-3 py-1">
                      <p className="text-white font-bold text-sm md:text-base">AI Coding/I</p>
                    </div>
                    <h2 className="text-2xl md:text-4xl font-bold text-[#1a1a1a]">
                      1day 講座
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { text: "3日はかかっていた仕事" },
                      { text: "毎日必要な面倒な作業" },
                      { text: "誰でもできるような単純作業" },
                    ].map((item, i) => (
                      <div key={i} className="bg-white border border-[#e5e7eb] border-l-2 border-l-[#ff6900] rounded-lg p-4 shadow-md flex items-start gap-3">
                        <p className="text-sm font-bold text-[#1a1a1a]">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <Link
                    href="#contact"
                    className="bg-[#ffdf20] hover:bg-[#fdc700] border-2 border-black text-[#101828] font-bold px-8 py-4 rounded-xl text-base md:text-lg transition-all hover:scale-105 shadow-lg"
                  >
                    公式LINEを友だち追加して 無料講座を見る
                  </Link>
                </div>
                <p className="text-white/80 text-sm">多数の方が参加しています</p>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-16 md:py-24 px-4 md:px-8 bg-[#fffbeb]">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection animation="fade-up" className="mb-8">
              <div className="bg-black text-white px-4 py-2 rounded-lg inline-block mb-4">
                <p className="text-sm font-bold">え、</p>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#0a0a0a] mb-6">
                プログラミングって
                <br />
                エンジニアになりたい人が
                <br />
                学ぶものじゃない？
              </h2>
              <div className="bg-white rounded-xl p-4 mb-6">
                <ul className="space-y-2">
                  {['エンジニア転職', 'IT企業', '副業・独立'].map((item, i) => (
                    <li key={i} className="border-l-2 border-l-[#ff6900] pl-3">
                      <span className="text-[#0a0a0a]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={200} className="mb-8">
              <div className="bg-black text-white px-4 py-2 rounded-lg inline-block mb-4">
                <p className="text-sm font-bold">しかも…</p>
              </div>
              <p className="text-[#0a0a0a] mb-4">
                プログラミング言語は選ぶだけでも
                <br />
                多岐に渡りますし
              </p>
              <div className="bg-white rounded-xl p-4 mb-4">
                <ul className="space-y-2">
                  <li className="text-[#0a0a0a]">知識をインプットする学習時間</li>
                  <li className="text-[#0a0a0a]">実際にプログラムを書く時間</li>
                </ul>
              </div>
              <p className="text-[#0a0a0a]">
                これらを考えると
                <br />
                <span className="bg-[#fff085] px-1 font-bold">膨大な時間</span>
                が必要
              </p>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={400}>
              <div className="bg-black text-white px-4 py-2 rounded-lg inline-block mb-4">
                <p className="text-sm font-bold">つまり</p>
              </div>
              <div className="space-y-2">
                <p className="text-[#0a0a0a]">今更無理…</p>
                <p className="text-[#0a0a0a]">ハードルが高い…</p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* AI Revolution Section */}
        <section className="py-16 md:py-24 px-4 md:px-8 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection animation="fade-up" className="relative">
              <span className="section-bg-text left-1/2 -translate-x-1/2 -top-6 md:-top-12 text-[30px] sm:text-[40px] md:text-[60px] lg:text-[80px]">REVOLUTION</span>
              <div className="bg-[#ff6900] text-white px-6 py-3 rounded-full inline-block mb-6 relative">
                <p className="text-lg font-bold">生成AIの登場によって</p>
                <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-[#ff6900]" />
              </div>
              <div className="bg-gradient-to-b from-[#fffbeb] to-white rounded-3xl p-8 md:p-12 mb-8">
                <p className="text-2xl md:text-3xl font-bold text-[#0a0a0a] mb-4">その常識は</p>
                <p className="text-6xl md:text-7xl font-bold text-[#ff6900] mb-4">180度</p>
                <p className="text-2xl md:text-3xl font-bold text-[#0a0a0a]">変わりました！</p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* What is "No-Code Programming" Section */}
        <section className="py-16 md:py-24 px-4 md:px-8 bg-[#fffbeb]">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection animation="fade-up" className="text-center mb-12 relative">
              <span className="section-bg-text left-1/2 -translate-x-1/2 -top-6 md:-top-12 text-[30px] sm:text-[40px] md:text-[60px] lg:text-[80px]">CONCEPT</span>
              <h2 className="text-2xl md:text-4xl font-bold text-[#0a0a0a] mb-4 relative">
                誰でもすぐに取り組める
                <br />
                <span className="bg-[#fff085] px-2">&quot;書かないプログラミング&quot;</span>
                とは？
              </h2>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={200}>
              <div className="bg-[#364153] text-white px-5 py-2 rounded-lg inline-block mb-6">
                <p className="font-bold">例えば</p>
                <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[5.6px] border-r-[5.6px] border-t-[5.6px] border-transparent border-t-[#364153]" />
              </div>
              <div className="bg-[#fffbeb] rounded-2xl p-6 border border-[#ffd6a7]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <div className="bg-[#4a5565] text-white px-3 py-1 rounded-full inline-block mb-2 text-xs">
                      昔
                    </div>
                    <p className="text-sm font-bold text-[#0a0a0a]">本で調べたり</p>
                  </div>
                  <div className="text-4xl text-center">→</div>
                  <div>
                    <div className="bg-[#ff6900] text-white px-3 py-1 rounded-full inline-block mb-2 text-xs">
                      今
                    </div>
                    <p className="text-sm font-bold text-[#0a0a0a]">
                      スマホ検索で
                      <br />
                      すぐアクセス
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-center text-[#0a0a0a] mt-6">
                AIも同じで、
                <br />
                慣れたら使いこなせる
                <br />
                ただ
                <span className="bg-[#fff085] px-1 font-bold">利用者はまだ少ない</span>
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* AI Usage Rate Section */}
        <section className="py-16 md:py-24 px-4 md:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection animation="fade-up" className="text-center mb-12 relative">
              <span className="section-bg-text left-1/2 -translate-x-1/2 -top-6 md:-top-12 text-[30px] sm:text-[40px] md:text-[60px] lg:text-[80px]">STATS</span>
              <h2 className="text-xl md:text-2xl font-bold text-[#0a0a0a] mb-8 relative">AI使用率</h2>
            </AnimatedSection>
            <div className="bg-white rounded-2xl p-6 border border-[#e5e7eb] shadow-lg">
              <div className="space-y-8">
                <div>
                  <p className="text-sm text-[#4a5565] mb-2">海外</p>
                  <div className="flex items-center gap-4">
                    <p className="text-4xl md:text-5xl font-bold text-[#ff6900]">50%</p>
                    <div className="flex-1 bg-[#e5e7eb] h-4 rounded-full overflow-hidden">
                      <div className="bg-[#ff6900] h-full w-1/2 rounded-full" />
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-[#4a5565] mb-2">日本</p>
                  <div className="flex items-center gap-4">
                    <p className="text-4xl md:text-5xl font-bold text-[#99a1af]">約9%</p>
                    <div className="flex-1 bg-[#e5e7eb] h-4 rounded-full overflow-hidden">
                      <div className="bg-[#99a1af] h-full w-[9%] rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-[#6a7282] text-center mt-4">※参考：公的統計データより</p>
            </div>
          </div>
        </section>

        {/* What You Can Build Section */}
        <section className="py-16 md:py-24 px-4 md:px-8 bg-[#fffbeb]">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection animation="fade-up" className="text-center mb-12 relative">
              <span className="section-bg-text left-1/2 -translate-x-1/2 -top-6 md:-top-12 text-[30px] sm:text-[40px] md:text-[60px] lg:text-[80px]">PROJECTS</span>
              <h2 className="text-2xl md:text-4xl font-bold text-[#ff6900] mb-8 relative">作れるもの</h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {[
                { title: "業務管理ダッシュボード", image: imgImageWithFallback },
                { title: "AIコンテンツ生成ツール", image: imgImageWithFallback1 },
                { title: "AIメンターBot（チャット連携）", image: imgImageWithFallback2 },
                { title: "在庫/注文管理システム", image: imgImageWithFallback3 },
              ].map((item, i) => (
                <AnimatedSection key={i} animation="fade-up" delay={i * 100}>
                  <div className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden shadow-lg">
                    <div className="aspect-video relative bg-gradient-to-br from-[#ffedd4] to-[#fff7ed]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(255,105,0,0.2)] to-transparent" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-[#0a0a0a]">{item.title}</h3>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              {['YouTube分析', '習慣記録', '文字起こし', '画像生成', 'スクレイピング', 'Markdownエディタ'].map((tag, i) => (
                <span key={i} className="bg-[#fff7ed] border border-[#ffd6a7] text-[#0a0a0a] px-4 py-2 rounded-lg text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Cases Section */}
        <section id="cases" className="py-16 md:py-24 px-4 md:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection animation="fade-up" className="text-center mb-12 relative">
              <span className="section-bg-text left-1/2 -translate-x-1/2 -top-6 md:-top-12 text-[30px] sm:text-[40px] md:text-[60px] lg:text-[80px]">CASES</span>
              <h2 className="text-2xl md:text-4xl font-bold text-[#ff6900] mb-8 relative">CASE</h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  case: "CASE.1",
                  title: "エクセル作業を数分で完了",
                  metric: "3h → 10分",
                  description: "毎週の作業が自動化された",
                },
                {
                  case: "CASE.2",
                  title: "レポート作成を自動化",
                  metric: "10時間/月 → 3分",
                  description: "月の業が数分に",
                },
              ].map((item, i) => (
                <AnimatedSection key={i} animation="fade-up" delay={i * 100}>
                  <div className="bg-white border-2 border-[#ffd6a7] rounded-xl p-6">
                    <p className="text-sm font-bold text-[#f54900] mb-2">{item.case}</p>
                    <h3 className="text-lg font-bold text-[#0a0a0a] mb-4">{item.title}</h3>
                    <p className="text-4xl md:text-5xl font-bold text-[#ff6900] mb-4 text-center">{item.metric}</p>
                    <p className="text-[#0a0a0a] mb-4">{item.description}</p>
                    <div className="bg-[#fef9c2] border border-[#ffdf20] rounded-lg p-2">
                      <p className="text-xs text-[#364153]">※効果を保証するものではありません</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 md:py-24 px-4 md:px-8 bg-[#fafafa]">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection animation="fade-up" className="text-center mb-12 relative">
              <span className="section-bg-text left-1/2 -translate-x-1/2 -top-6 md:-top-12 text-[30px] sm:text-[40px] md:text-[60px] lg:text-[80px]">VOICES</span>
              <h2 className="text-2xl md:text-4xl font-bold text-[#ff6900] mb-8 relative">実践者の声</h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  name: "実践者A",
                  role: "製造業 / 会社員",
                  comment: "率直に「楽しい」が一番の感想です。エラーで詰まる時間が減り、1ヶ月で複数のツールを作れました。自分の成長を実感できて、副業相談も増えました。",
                },
                {
                  name: "実践者B",
                  role: "営業職 / 会社員",
                  comment: "プログラミングに挫折した経験がありましたが、AIを使うことで驚くほど短時間で成果が出ました。今では業務効率化のツールを自作できるまでになりました。",
                },
                {
                  name: "実践者C",
                  role: "事務職 / フリーランス",
                  comment: "毎月の定型作業が自動化され、時間に余裕ができました。その時間でスキルアップに取り組めるようになり、キャリアの選択肢が広がったと感じています。",
                },
              ].map((item, i) => (
                <AnimatedSection key={i} animation="fade-up" delay={i * 100}>
                  <div className="bg-[#f9fafb] rounded-xl p-6">
                    <div className="mb-4">
                      <p className="font-bold text-[#0a0a0a]">{item.name}</p>
                      <p className="text-xs text-[#4a5565]">{item.role}</p>
                    </div>
                    <p className="text-sm text-[#0a0a0a] leading-relaxed">{item.comment}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Curriculum Section */}
        <section id="curriculum" className="py-16 md:py-24 px-4 md:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection animation="fade-up" className="text-center mb-12 relative">
              <span className="section-bg-text left-1/2 -translate-x-1/2 -top-6 md:-top-12 text-[30px] sm:text-[40px] md:text-[60px] lg:text-[80px]">CURRICULUM</span>
              <h2 className="text-2xl md:text-4xl font-bold text-[#ff6900] mb-8 relative">学べる内容</h2>
            </AnimatedSection>
            <div className="space-y-4 mb-12">
              {[
                {
                  number: "01",
                  title: "学習時間を大幅カット",
                  description: "従来の学習法との違いを理解し、効率的に学ぶ方法を習得",
                },
                {
                  number: "02",
                  title: "挫折しない学習法",
                  description: "初心者がつまずくポイントを事前に回避する実践的アプローチ",
                },
                {
                  number: "03",
                  title: "AI活用の誤解を解く",
                  description: "よくある勘違いを解消し、正しいAI活用の考え方を習得",
                },
                {
                  number: "04",
                  title: "AIの選び方",
                  description: "適切なツールの見極め方と、避けるべきツールの特徴を解説",
                },
                {
                  number: "05",
                  title: "実演動画",
                  description: "実際の画面を見ながら、ツール作成の全工程を体験",
                },
              ].map((item, i) => (
                <AnimatedSection key={i} animation="fade-up" delay={i * 100}>
                  <div className="bg-white border-2 border-[#ffd6a7] rounded-xl p-6">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="bg-[#ff6900] text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold">
                        {item.number}
                      </div>
                      <h3 className="text-lg font-bold text-[#0a0a0a]">{item.title}</h3>
                    </div>
                    <p className="text-sm text-[#364153] ml-14">{item.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
            <div className="bg-[#f3f4f6] rounded-xl p-6">
              <div className="aspect-video bg-gradient-to-br from-[#ff8904] to-[#f54900] rounded-lg mb-4 relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imgImageWithFallback4} alt="" className="w-full h-full object-cover" loading="lazy" decoding="async" />
                <div className="absolute inset-0 bg-black/50" />
              </div>
              <button className="w-full bg-[#ff6900] text-white font-bold py-3 rounded-lg mb-2">
                見る
              </button>
              <p className="text-sm text-[#4a5565] text-center">この動画の全貌は講座内で！</p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 md:py-24 px-4 md:px-8 bg-[#fffbeb]">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection animation="fade-up" className="text-center mb-12 relative">
              <span className="section-bg-text left-1/2 -translate-x-1/2 -top-6 md:-top-12 text-[30px] sm:text-[40px] md:text-[60px] lg:text-[80px]">BENEFITS</span>
              <h2 className="text-2xl md:text-4xl font-bold text-[#ff6900] mb-8 relative">5大特典</h2>
            </AnimatedSection>
            <div className="space-y-4">
              {[
                {
                  number: "01",
                  title: "生成AI最新レポート",
                  description: "最新のAI動向と活用事例をまとめたレポートを提供",
                },
                {
                  number: "02",
                  title: "業務改善事例集",
                  description: "実際の業務改善事例を豊富に掲載したケーススタディ",
                },
                {
                  number: "03",
                  title: "AIツールコレクション",
                  description: "日本未上陸のツールを含む、厳選されたツール集",
                },
                {
                  number: "04",
                  title: "海外ソロプレナー事例集",
                  description: "一人でビジネスを展開する事例から学ぶ実践的なノウハウ",
                },
                {
                  number: "05",
                  title: "キャリアパスガイド",
                  description: "AI時代に求められる人材像と、具体的なキャリア戦略",
                },
              ].map((item, i) => (
                <AnimatedSection key={i} animation="fade-up" delay={i * 100}>
                  <div className="bg-gradient-to-r from-[#fefce8] to-[#fff7ed] border-2 border-[#ffdf20] rounded-xl p-6">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="bg-[#fdc700] text-[#101828] w-10 h-10 rounded-lg flex items-center justify-center font-bold">
                        {item.number}
                      </div>
                      <h3 className="text-lg font-bold text-[#0a0a0a]">{item.title}</h3>
                    </div>
                    <p className="text-sm text-[#364153] ml-14">{item.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Why Free Section */}
        <section className="py-16 md:py-24 px-4 md:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection animation="fade-up" className="text-center mb-12 relative">
              <span className="section-bg-text left-1/2 -translate-x-1/2 -top-6 md:-top-12 text-[30px] sm:text-[40px] md:text-[60px] lg:text-[80px]">WHY</span>
              <h2 className="text-2xl md:text-4xl font-bold text-[#0a0a0a] mb-4 relative">
                なぜ
                <span className="text-[#ff6900]">無料</span>
                で
                <br />
                公開するのか？
              </h2>
              <p className="text-xl font-bold text-[#0a0a0a]">理由は2つあります</p>
            </AnimatedSection>
            <div className="space-y-6">
              <div>
                <p className="font-bold text-[#0a0a0a] mb-2">1つ目：</p>
                <p className="text-[#0a0a0a]">
                  業務効率化したい人にも
                  <span className="bg-[#fff085] px-1 font-bold">最適</span>
                  な学習内容だから
                </p>
              </div>
              <div>
                <p className="font-bold text-[#0a0a0a] mb-2">2つ目：</p>
                <p className="text-[#0a0a0a]">
                  ビジネス人材の
                  <span className="bg-[#fff085] px-1 font-bold">市場価値を上げる</span>
                  ため
                </p>
              </div>
              <p className="text-[#0a0a0a]">
                大手ではできない
                <br />
                学習環境を整えたい
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="py-16 md:py-24 px-4 md:px-8 bg-gradient-to-b from-[#ff6900] to-[#f54900]">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection animation="fade-up" className="relative">
              <span className="section-bg-text left-1/2 -translate-x-1/2 -top-6 md:-top-12 text-[30px] sm:text-[40px] md:text-[60px] lg:text-[80px] text-white/10">CONTACT</span>
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 relative">
                今すぐ
                <span className="text-[#ffdf20]">ご視聴</span>
                ください！
              </h2>
              <p className="text-white mb-8 relative">
                いつまで公開できるか
                <br />
                わかりません…
              </p>
              <div className="bg-white rounded-xl p-4 mb-6">
                <ul className="space-y-2 text-left">
                  <li className="border-l-2 border-l-[#ff6900] pl-3">
                    <span className="text-[#0a0a0a]">友だち追加だけで視聴できる</span>
                  </li>
                  <li className="border-l-2 border-l-[#ff6900] pl-3">
                    <span className="text-[#0a0a0a]">後回しにせず、今すぐ！</span>
                  </li>
                </ul>
              </div>
              <Link
                href="#"
                className="bg-[#ffdf20] border-2 border-black text-[#101828] font-bold px-8 py-4 rounded-xl text-base md:text-lg inline-flex items-center shadow-lg hover:scale-105 transition-all"
              >
                無料講座を見る（LINEで受け取る）
              </Link>
              <p className="text-white/80 text-sm mt-4">多数の方が参加しています</p>
            </AnimatedSection>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
