"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "@/app/components/Footer";
import { AnimatedSection } from "@/app/components/AnimationProvider";
import { cases, type Case } from "@/app/data/casesData";
import AppScreensGallery from "@/app/components/AppScreensGallery";
import SalonReservationAppMockup from "@/app/components/SalonReservationAppMockup";

export default function FullOrderAppDevelopmentLP() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // フォーム送信処理（後で実装）
    console.log("Form submitted:", formData);
  };

  // 関連事例を取得（アプリ開発に関連する事例を優先的に表示）
  const relatedCases: Case[] = [
    ...cases.filter(c => c.tags.some(tag => ['アプリ', 'Web', 'UI/UX', 'SaaS'].includes(tag))),
    ...cases.filter(c => !c.tags.some(tag => ['アプリ', 'Web', 'UI/UX', 'SaaS'].includes(tag))),
  ].slice(0, 3);

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-[#e5e7eb]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-[#1a1a1a]">
            Maxeras
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#merits" className="text-sm text-[#6b7280] hover:text-[#1a1a1a]">
              メリット
            </a>
            <a href="#results" className="text-sm text-[#6b7280] hover:text-[#1a1a1a]">
              実績
            </a>
            <a href="#cases" className="text-sm text-[#6b7280] hover:text-[#1a1a1a]">
              事例
            </a>
            <a href="#flow" className="text-sm text-[#6b7280] hover:text-[#1a1a1a]">
              制作フロー
            </a>
            <Link
              href="#contact"
              className="bg-[#fff100] hover:bg-[#fdc700] text-[#1a1a1a] font-medium px-5 py-2 rounded-full text-sm transition-all"
            >
              無料相談
            </Link>
          </nav>
        </div>
      </header>

      <main className="pt-14">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-[#0b1220] via-[#1e293b] to-[#0b1220] py-20 md:py-32 overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#fff100]/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-[#fdc700]/10 rounded-full blur-[120px]" />
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <AnimatedSection animation="fade-up" className="relative">
                <span className="section-bg-text left-0 -top-6 md:-top-12 text-[40px] md:text-[80px] lg:text-[100px] text-white/10">FULL ORDER</span>
                <div className="mb-4">
                  <span className="bg-[#fff100]/20 text-[#fff100] px-3 py-1 rounded-full text-sm font-medium">
                    AI × 最新手法で最短実現
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                  完全オーダーメイド
                  <br />
                  で
                  <br />
                  課題を解決する
                </h1>
                <p className="text-lg md:text-xl text-white/90 mb-2">WEB・アプリ制作</p>
                <p className="text-base md:text-lg text-white/80 mb-8">
                  ユーザーに使われる、成果につながるプロダクトを
                  <br />
                  企画から運用まで伴走してお届けします
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Link
                    href="#contact"
                    className="inline-flex items-center gap-2 bg-[#fff100] hover:bg-[#fdc700] text-[#1a1a1a] font-medium px-6 py-3 rounded-full transition-all hover:scale-105"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    無料相談する
                  </Link>
                  <Link
                    href="#cases"
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3 rounded-full transition-all hover:scale-105"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    事例を見る
                  </Link>
                </div>
                <div className="flex gap-6 text-white">
                  <div className="text-center">
                    <p className="text-2xl font-bold">4.7</p>
                    <p className="text-xs">評価</p>
                    <p className="text-xs text-white/60">2.3から</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">1位</p>
                    <p className="text-xs">獲得</p>
                    <p className="text-xs text-white/60">検索順位</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">8倍</p>
                    <p className="text-xs">以上</p>
                    <p className="text-xs text-white/60">CV率改善</p>
                  </div>
                </div>
              </AnimatedSection>
              <AnimatedSection animation="fade-up" delay={200}>
                <div className="relative w-full max-w-6xl mx-auto">
                  {/* Figmaデザインをそのまま表示 */}
                  <div className="relative flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
                    <div className="relative w-full h-[610px] lg:w-[984px] lg:h-[610px] flex items-center justify-center">
                      <SalonReservationAppMockup />
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Maxelus Approach Section */}
        <section className="py-16 md:py-24 px-4 md:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection animation="fade-up" className="text-center mb-12 relative">
              <span className="section-bg-text left-1/2 -translate-x-1/2 -top-6 md:-top-12 text-[40px] md:text-[80px] text-[#d1d5dc]/10">APPROACH</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4 relative">
                Maxerasは
                <br />
                <span className="text-[#fff100]">オーダーメイド × 伴走</span>
                <br />
                で成果から逆算します
              </h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  ),
                  title: "完全オーダーメイド",
                  description: "テンプレートではなく、お客様のビジネス課題に合わせた完全カスタム設計",
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                  title: "企画から運用まで伴走",
                  description: "リリースして終わりではなく、運用・改善まで継続的にサポート",
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  ),
                  title: "成果から逆算",
                  description: "KPIを明確にし、ビジネス成果につながる機能を優先して開発",
                },
              ].map((item, i) => (
                <AnimatedSection key={i} animation="fade-up" delay={i * 100}>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#fff100] to-[#fdc700] rounded-full flex items-center justify-center text-[#1a1a1a] mx-auto mb-4">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">{item.title}</h3>
                    <p className="text-[#6b7280]">{item.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Problems Section */}
        <section className="py-16 md:py-24 px-4 md:px-8 bg-[#fafafa]">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection animation="fade-up" className="text-center mb-12 relative">
              <span className="section-bg-text left-1/2 -translate-x-1/2 -top-6 md:-top-12 text-[40px] md:text-[80px] text-[#d1d5dc]/10">PROBLEMS</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4 relative">こんなお悩みありませんか？</h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "アイデアはあるが",
                  subtitle: "要件が固まらない",
                  description: "漠然としたビジョンを具体的な設計に落とし込むプロセスで迷っている。何から始めればいいかわからない。",
                },
                {
                  title: "今のアプリが",
                  subtitle: "評価が低すぎる",
                  description: "既存のアプリやサイトはあるがユーザー評価が低く、ダウンロード数やコンバージョンが伸びない。",
                },
                {
                  title: "開発コストが高く",
                  subtitle: "本当に頼んでいいか不安",
                  description: "初期投資が大きく、ROIが見えない。失敗したときのリスクを考えると踏み切れない。",
                },
              ].map((problem, i) => (
                <AnimatedSection key={i} animation="fade-up" delay={i * 100}>
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="w-16 h-16 bg-[#f3f4f6] rounded-lg flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-[#6b7280]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-[#1a1a1a] mb-1">
                      {problem.title}
                      <br />
                      {problem.subtitle}
                    </h3>
                    <p className="text-sm text-[#6b7280] mt-2">{problem.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Merits Section */}
        <section id="merits" className="py-16 md:py-24 px-4 md:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection animation="fade-up" className="text-center mb-12 relative">
              <span className="section-bg-text left-1/2 -translate-x-1/2 -top-6 md:-top-12 text-[40px] md:text-[80px] text-[#d1d5dc]/10">MERIT</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4 relative">Maxerasで開発する5つのメリット</h2>
            </AnimatedSection>
            <div className="space-y-6">
              {[
                {
                  number: "1",
                  title: "AI活用で開発スピード最大2倍",
                  description: "最新のAI技術を活用し、コード生成やテストを自動化。従来なら3ヶ月かかる開発を1.5ヶ月で実現します",
                },
                {
                  number: "2",
                  title: "UXリサーチに基づく設計",
                  description: "ユーザーインタビューやA/Bテストを実施し、データに基づいた設計を行います。「作って終わり」ではなく",
                },
                {
                  number: "3",
                  title: "セキュリティ・パフォーマンス最適化",
                  description: "セキュリティ診断とパフォーマンステストを標準実施。OWASP Top10対策、ページ速度最適化で、安",
                },
                {
                  number: "4",
                  title: "運用・改善まで見据えた設計",
                  description: "リリース後の運用コストを最小化する技術選定と、データ分析基盤の構築を行います。継続的な改善サイクルで",
                },
                {
                  number: "5",
                  title: "透明性の高いコミュニケーション",
                  description: "週次レポートと月次ミーティングで進捗を共有。Slackでいつでも質問可能。「今何が起きているか分から",
                },
              ].map((merit, i) => (
                <AnimatedSection key={i} animation="fade-up" delay={i * 100}>
                  <div className="flex gap-6 items-start bg-white border-2 border-[#e5e7eb] rounded-xl p-6 hover:border-[#fff100] transition-colors">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#fff100] to-[#fdc700] rounded-lg flex items-center justify-center text-[#1a1a1a] font-bold text-xl flex-shrink-0">
                      {merit.number}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">{merit.title}</h3>
                      <p className="text-[#6b7280]">{merit.description}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section id="results" className="py-16 md:py-24 px-4 md:px-8 bg-[#fafafa]">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection animation="fade-up" className="text-center mb-12 relative">
              <span className="section-bg-text left-1/2 -translate-x-1/2 -top-6 md:-top-12 text-[40px] md:text-[80px] text-[#d1d5dc]/10">RESULTS</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-2 relative">実績</h2>
              <p className="text-[#6b7280]">様々な業界のクライアント様にご利用いただいています</p>
            </AnimatedSection>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {[
                { value: "50+", label: "プロジェクト実績" },
                { value: "98%", label: "顧客満足度" },
                { value: "4.8", label: "平均評価" },
                { value: "24h", label: "平均返信時間" },
              ].map((stat, i) => (
                <AnimatedSection key={i} animation="fade-up" delay={i * 100}>
                  <div className="text-center">
                    <p className="text-4xl md:text-5xl font-bold text-[#fff100] mb-2">{stat.value}</p>
                    <p className="text-sm text-[#6b7280]">{stat.label}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
            
            {/* App Screens Gallery - Figmaデザインをそのまま表示 */}
            <div className="bg-white rounded-xl p-6 md:p-8 mb-8">
              <div className="relative w-full max-w-6xl mx-auto">
                <div className="relative flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
                  {/* iPhone */}
                  <div className="relative w-[280px] h-[610px] flex-shrink-0">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[28px] bg-black rounded-b-[20px] flex items-center justify-center">
                      <div className="w-[50px] h-[5px] bg-[#1e2939] rounded-full"></div>
                      <div className="absolute left-[20px] w-[10px] h-[10px] rounded-full border border-[#4a5565] bg-[#364153]"></div>
                    </div>
                    <div className="absolute top-0 left-0 w-[280px] h-[570px] bg-[#101828] rounded-[40px] shadow-[0px_25px_50px_0px_rgba(0,0,0,0.25)] p-3">
                      <div className="w-full h-full bg-black rounded-[32px] overflow-hidden relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="https://www.figma.com/api/mcp/asset/07dbf711-4b5b-4537-9b9b-117c68736604"
                          alt="サロン予約アプリ - iPhone"
                          className="w-full h-full object-contain"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </div>
                    <p className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[#4a5565] text-sm mt-2">iPhone</p>
                  </div>

                  {/* MacBook */}
                  <div className="relative w-[640px] h-[483px] flex-shrink-0 hidden lg:block">
                    <div className="absolute top-0 left-0 w-[640px] h-[435px]">
                      <div className="absolute top-0 left-0 w-[640px] h-[415px] bg-[#1e2939] rounded-t-[12px] shadow-[0px_25px_50px_0px_rgba(0,0,0,0.25)] p-2">
                        <div className="w-full h-full bg-black rounded-t-[8px] overflow-hidden relative">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src="https://www.figma.com/api/mcp/asset/8bf82df4-9242-4f84-a11d-2a6c99aa583d"
                            alt="サロン予約アプリ - MacBook"
                            className="w-full h-full object-contain"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 w-[640px] h-[20px]">
                        <div className="absolute top-0 left-0 w-full h-[4px] bg-[#364153]"></div>
                        <div className="absolute top-[4px] left-0 w-full h-[16px] bg-gradient-to-b from-[#d1d5dc] to-[#99a1af] rounded-b-[8px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] flex items-center justify-center px-[260px] pt-[11px]">
                          <div className="w-full h-[2px] bg-[#6a7282] opacity-50 rounded-full"></div>
                        </div>
                      </div>
                      <div className="absolute -bottom-[8px] left-[10px] w-[620px] h-[8px] bg-black/20 blur-[12px] rounded-full"></div>
                    </div>
                    <p className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[#4a5565] text-sm mt-2">MacBook</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8">
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="aspect-square bg-[#f3f4f6] rounded-lg flex items-center justify-center">
                    <span className="text-xs text-[#6b7280]">Client {i}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-[#6b7280] text-center">※ クライアント様の許可を得たロゴのみ掲載予定</p>
            </div>
          </div>
        </section>

        {/* Cases Section */}
        <section id="cases" className="py-16 md:py-24 px-4 md:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection animation="fade-up" className="text-center mb-12 relative">
              <span className="section-bg-text left-1/2 -translate-x-1/2 -top-6 md:-top-12 text-[40px] md:text-[80px] text-[#d1d5dc]/10">CASES</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-2 relative">導入事例</h2>
              <p className="text-[#6b7280]">実際の課題解決事例をご紹介します</p>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedCases.map((caseItem, i) => (
                <AnimatedSection key={caseItem.id} animation="fade-up" delay={i * 100}>
                  <div className="bg-white border-2 border-[#e5e7eb] rounded-xl overflow-hidden hover:border-[#fff100] transition-all hover:shadow-xl group">
                    <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-[#f3f4f6] to-[#e5e7eb]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={caseItem.image}
                        alt={caseItem.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute top-4 right-4 bg-[#fff100] text-[#1a1a1a] px-3 py-1.5 rounded-full text-xs font-bold shadow-md">
                        {caseItem.tags[0] || '事例'}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg md:text-xl font-bold text-[#1a1a1a] mb-4 leading-tight min-h-[3rem]">
                        {caseItem.title}
                      </h3>
                      <div className="space-y-2.5 text-sm text-[#6b7280] mb-6">
                        <div className="flex items-start gap-2">
                          <span className="font-bold text-[#1a1a1a] flex-shrink-0">課題：</span>
                          <span className="flex-1">{caseItem.problem}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="font-bold text-[#1a1a1a] flex-shrink-0">施策：</span>
                          <span className="flex-1">{caseItem.solution}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="font-bold text-[#1a1a1a] flex-shrink-0">結果：</span>
                          <span className="flex-1 text-[#fff100] font-semibold">{caseItem.impact}</span>
                        </div>
                      </div>
                      {caseItem.lpHref ? (
                        <Link
                          href={caseItem.lpHref}
                          className="inline-flex items-center gap-2 text-[#fff100] font-medium hover:text-[#fdc700] transition-colors group/link"
                        >
                          詳しく見る
                          <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </Link>
                      ) : (
                        <Link
                          href={`/cases#${caseItem.id}`}
                          className="inline-flex items-center gap-2 text-[#fff100] font-medium hover:text-[#fdc700] transition-colors group/link"
                        >
                          詳しく見る
                          <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </Link>
                      )}
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/cases"
                className="inline-flex items-center gap-2 bg-[#fff100] hover:bg-[#fdc700] text-[#1a1a1a] font-medium px-6 py-3 rounded-full transition-all hover:scale-105 shadow-md"
              >
                すべての事例を見る
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Flow Section */}
        <section id="flow" className="py-16 md:py-24 px-4 md:px-8 bg-[#fafafa]">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection animation="fade-up" className="text-center mb-12 relative">
              <span className="section-bg-text left-1/2 -translate-x-1/2 -top-6 md:-top-12 text-[40px] md:text-[80px] text-[#d1d5dc]/10">FLOW</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-2 relative">制作フロー</h2>
              <p className="text-[#6b7280]">企画から運用改善まで、一貫してサポートします</p>
            </AnimatedSection>
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-[#e5e7eb] hidden md:block" />
                <div className="space-y-8">
                  {[
                    {
                      step: "01",
                      title: "ヒアリング",
                      description: "ビジネス課題・目標をじっくりお伺いし、最適な解決策を提案します",
                    },
                    {
                      step: "02",
                      title: "ユーザー調査",
                      description: "ターゲットユーザーのニーズを分析し、ペルソナ・カスタマージャーニーを設計",
                    },
                    {
                      step: "03",
                      title: "要件定義・設計",
                      description: "機能要件・画面設計を明確化し、技術スタック・アーキテクチャを決定",
                    },
                    {
                      step: "04",
                      title: "UI/UXデザイン",
                      description: "ワイヤーフレーム→デザインモックアップ→プロトタイプで検証",
                    },
                    {
                      step: "05",
                      title: "開発・テスト",
                      description: "アジャイル開発で週次デモ。自動テスト・セキュリティ診断を実施",
                    },
                    {
                      step: "06",
                      title: "リリース・運用改善",
                      description: "リリース後もデータ分析し、継続的な改善提案とサポートを実施",
                    },
                  ].map((flow, i) => (
                    <AnimatedSection key={i} animation="fade-up" delay={i * 100}>
                      <div className="flex gap-6 items-start relative">
                        <div className="w-14 h-14 bg-gradient-to-br from-[#fff100] to-[#fdc700] rounded-lg flex items-center justify-center text-[#1a1a1a] font-bold text-lg flex-shrink-0 relative z-10">
                          {flow.step}
                        </div>
                        <div className="flex-1 pt-2">
                          <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">{flow.title}</h3>
                          <p className="text-[#6b7280]">{flow.description}</p>
                        </div>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              </div>
              <div className="mt-8 bg-[#f3f4f6] rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <svg className="w-5 h-5 text-[#fff100] flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="font-bold text-[#1a1a1a] mb-2">標準的な開発期間</h3>
                    <p className="text-sm text-[#6b7280] mb-1">
                      プロジェクト規模により異なりますが、一般的なスマホアプリで2〜4ヶ月、Webサービスで1.5〜3ヶ月
                    </p>
                    <p className="text-xs text-[#6b7280]">
                      ※ AI活用により従来より30〜50%の期間短縮を実現しています
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 px-4 md:px-8 bg-gradient-to-b from-[#ff6900] to-[#f54900]">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection animation="fade-up" className="relative">
              <span className="section-bg-text left-1/2 -translate-x-1/2 -top-6 md:-top-12 text-[40px] md:text-[80px] text-white/10">CTA</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 relative">
                今、動かないことが
                <br />
                最大の機会損失です
              </h2>
              <p className="text-white/90 mb-8 text-lg">
                デジタル市場は日々変化し、競合は着実に前進しています。
                <br />
                「いつか作ろう」と先延ばしにしている間に、ユーザーは他社のサービスに流れていきます。
                <br />
                <br />
                今すぐ始めれば、3ヶ月後には成果が見え始めます。
                <br />
                <br />
                まずは無料相談で、あなたのビジネス課題を聞かせてください。
                <br />
                具体的な解決策と概算お見積りをご提案します。
              </p>
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-[#1a1a1a] font-bold px-8 py-4 rounded-full text-lg transition-all hover:scale-105 shadow-lg mb-4"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                今すぐ無料相談する
              </Link>
              <p className="text-white/80 text-sm">※ 相談したからといって必ず契約する必要はありません</p>
              <div className="mt-8 bg-white/10 rounded-xl p-6 text-left max-w-2xl mx-auto">
                <h3 className="text-white font-bold mb-4 text-center">無料相談でわかること</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white text-sm">
                  {[
                    "あなたのビジネス課題の整理",
                    "最適な技術スタックの提案",
                    "概算スケジュールと費用感",
                    "成功事例と期待できる効果",
                    "リスクと対策の明確化",
                    "次のアクションプラン",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 md:py-24 px-4 md:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection animation="fade-up" className="text-center mb-12 relative">
              <span className="section-bg-text left-1/2 -translate-x-1/2 -top-6 md:-top-12 text-[40px] md:text-[80px] text-[#d1d5dc]/10">CONTACT</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-2 relative">お問い合わせ</h2>
              <p className="text-[#6b7280]">まずはお気軽にご相談ください。24時間以内に返信いたします</p>
            </AnimatedSection>
            <form onSubmit={handleSubmit} className="bg-white border-2 border-[#e5e7eb] rounded-xl p-8">
              <div className="space-y-6">
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
                    placeholder="山田 太郎"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
                    メールアドレス <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-[#e5e7eb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fff100]"
                    placeholder="example@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1a1a1a] mb-2">会社名</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 border border-[#e5e7eb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fff100]"
                    placeholder="株式会社サンプル"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
                    お問い合わせ内容 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-3 border border-[#e5e7eb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fff100]"
                    placeholder="ご相談内容をできるだけ詳しくお書きください。 例：ECサイトのスマホアプリを作りたい、現在の課題は〇〇です..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#fff100] to-[#fdc700] hover:from-[#fdc700] hover:to-[#fff100] text-[#1a1a1a] font-bold px-6 py-4 rounded-lg transition-all hover:scale-105 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  送信する
                </button>
                <p className="text-xs text-[#6b7280] text-center">
                  送信いただいた情報は、弊社の
                  <Link href="/privacy" className="text-[#fff100] underline">
                    プライバシーポリシー
                  </Link>
                  に基づき適切に管理いたします
                </p>
              </div>
            </form>
            <div className="mt-8 text-center">
              <p className="text-[#6b7280] mb-2">お急ぎの方はお電話でも受け付けております</p>
              <p className="text-2xl font-bold text-[#1a1a1a] mb-1">03-XXXX-XXXX</p>
              <p className="text-sm text-[#6b7280]">平日 10:00〜19:00（土日祝除く）</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
