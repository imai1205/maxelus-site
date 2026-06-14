"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LpLogo } from "@/components/ui";
import Footer from "@/app/components/Footer";
import { AnimatedSection } from "@/app/components/AnimationProvider";
import IPhoneFrameSlider from "@/app/components/IPhoneFrameSlider";
import HeroAppSlider from "@/app/components/hero/HeroAppSlider";

// デモ画面画像データ（public/cases/フォルダの画像を使用）
const caseImages = [
  {
    id: 'nail',
    title: 'ネイルサロン管理アプリ',
    iphoneImage: '/cases/nail.png',
    macbookImage: '/cases/nail.png',
  },
  {
    id: 'kiji',
    title: '記事管理アプリ',
    iphoneImage: '/cases/kiji.png',
    macbookImage: '/cases/kiji.png',
  },
  {
    id: 'calc',
    title: '計算アプリ',
    iphoneImage: '/cases/calc.png',
    macbookImage: '/cases/calc.png',
  },
  {
    id: 'item',
    title: 'アイテム管理アプリ',
    iphoneImage: '/cases/item.png',
    macbookImage: '/cases/item.png',
  },
  {
    id: 'draw',
    title: '図面管理アプリ',
    iphoneImage: '/cases/draw.png',
    macbookImage: '/cases/draw.png',
  },
  {
    id: 'car',
    title: '車関連アプリ',
    iphoneImage: '/cases/car.png',
    macbookImage: '/cases/car.png',
  },
  {
    id: 'vegas',
    title: 'ベガス関連アプリ',
    iphoneImage: '/cases/vegas.png',
    macbookImage: '/cases/vegas.png',
  },
  {
    id: 'saron',
    title: 'サロン管理アプリ',
    iphoneImage: '/cases/saron.png',
    macbookImage: '/cases/saron.png',
  },
  {
    id: 'shop',
    title: 'ショッピングアプリ',
    iphoneImage: '/cases/shop.png',
    macbookImage: '/cases/shop.png',
  },
];

export default function FullOrderAppDevelopmentLP() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          company: formData.company || '',
          email: formData.email,
          inquiryType: '完全オーダーメイドアプリ開発',
          budget: '',
          timeline: '',
          message: formData.message,
        }),
      });

      if (!response.ok) {
        throw new Error('送信に失敗しました');
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('送信に失敗しました。もう一度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-[#e5e7eb]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
          <LpLogo />
          <nav className="hidden md:flex items-center gap-6">
            <a href="#merits" className="text-sm text-[#6b7280] hover:text-[#1a1a1a]">
              メリット
            </a>
            <a href="#results" className="text-sm text-[#6b7280] hover:text-[#1a1a1a]">
              事例
            </a>
            <a href="#demo" className="text-sm text-[#6b7280] hover:text-[#1a1a1a]">
              デモ
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
        {/* Hero Section — ホームのヒーロー(HeroAppSlider)を流用 */}
        <section className="relative min-h-[90vh] md:min-h-screen overflow-hidden bg-gradient-to-b from-[#0b1220] via-[#1e293b] to-[#0b1220]">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#fff100]/10 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-[#fdc700]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />

          <HeroAppSlider />

          <div className="absolute top-0 left-0 right-0 max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-32 flex flex-col pointer-events-none" style={{ zIndex: 200 }}>
            <div className="flex-1 flex flex-col justify-center">
              <div className="flex flex-col lg:flex-row items-center gap-12">
                <div
                  className="w-full lg:w-[85%] lg:max-w-[520px] space-y-5 md:space-y-6 text-center lg:text-left relative px-5 py-5 md:px-6 md:py-6 rounded-2xl border border-white/12 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]"
                  style={{ zIndex: 500, background: "rgba(45, 58, 79, 0.6)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
                >
                  <div className="pointer-events-auto relative z-10">
                    <AnimatedSection animation="fade-up" duration={800}>
                      <span className="section-bg-text left-0 -top-6 md:-top-12 text-[30px] sm:text-[40px] md:text-[60px] lg:text-[80px] xl:text-[100px] text-white/10 absolute" style={{ zIndex: 0 }}>APP</span>
                      <div className="mb-3 md:mb-4 relative" style={{ zIndex: 100 }}>
                        <span className="inline-block bg-[#fff100] text-[#1a1a1a] px-4 py-1.5 rounded-full text-sm font-bold">完全オーダーメイドアプリ開発</span>
                      </div>
                      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 md:mb-3 leading-tight relative z-50 break-keep">
                        完全オーダーメイドで
                        <br />
                        課題を解決する
                      </h1>
                      <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-white/90 mb-3 md:mb-4 relative z-50 break-keep">WEB・アプリ制作</h2>
                    </AnimatedSection>
                    <AnimatedSection animation="fade-up" delay={300} duration={800}>
                      <p className="text-sm md:text-base text-white/80 mb-4 md:mb-5 relative z-50 leading-relaxed break-keep">
                        ユーザーに使われる、成果につながるプロダクトを
                        <br className="md:hidden" />
                        企画から運用まで伴走してお届けします
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                        <a href="#contact" className="inline-flex items-center justify-center bg-[#fff100] hover:bg-[#fdc700] text-[#1a1a1a] font-medium px-5 md:px-6 py-2.5 md:py-3 rounded-full text-sm md:text-base transition-all hover:scale-105 shadow-lg">
                          無料相談する
                        </a>
                        <a href="#demo" className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-medium px-5 md:px-6 py-2.5 md:py-3 rounded-full text-sm md:text-base transition-all hover:scale-105 backdrop-blur-sm border border-white/20">
                          デモ画面を見る
                        </a>
                      </div>
                    </AnimatedSection>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Maxelus Approach Section */}
        <section className="py-16 md:py-24 px-4 md:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection animation="fade-up" className="text-center mb-12 relative">
              <div className="relative flex justify-center">
                <div className="relative inline-block">
                  <span className="section-bg-text left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 text-[60px] sm:text-[72px] md:text-[80px] lg:text-[96px] text-[#0b1220]/25 absolute" style={{ opacity: 0.25 }}>APPROACH</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4 relative">
                    MAXELUSは
                    <br />
                    <span className="text-[#fff100]">オーダーメイド × 伴走</span>
                    <br />
                    で成果から逆算します
                  </h2>
                </div>
              </div>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  number: "01",
                  title: "完全オーダーメイド",
                  description: "テンプレートではなく、お客様のビジネス課題に合わせた完全カスタム設計",
                },
                {
                  number: "02",
                  title: "企画から運用まで伴走",
                  description: "リリースして終わりではなく、運用・改善まで継続的にサポート",
                },
                {
                  number: "03",
                  title: "成果から逆算",
                  description: "KPIを明確にし、ビジネス成果につながる機能を優先して開発",
                },
              ].map((item, i) => (
                <AnimatedSection key={i} animation="fade-up" delay={i * 100}>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[#1a1a1a]">{item.number}</p>
                    <div className="mt-3 mb-4 mx-auto h-px w-10 bg-[#e5e7eb]" />
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
              <div className="relative flex justify-center">
                <div className="relative inline-block">
                  <span className="section-bg-text left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 text-[60px] sm:text-[72px] md:text-[80px] lg:text-[96px] text-[#0b1220]/25 absolute" style={{ opacity: 0.25 }}>PROBLEMS</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4 relative">こんなお悩みありませんか？</h2>
                </div>
              </div>
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
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-[#e5e7eb]">
                    <p className="text-2xl font-bold text-[#1a1a1a]">{String(i + 1).padStart(2, "0")}</p>
                    <div className="mt-3 mb-4 h-px w-10 bg-[#e5e7eb]" />
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
              <div className="relative flex justify-center">
                <div className="relative inline-block">
                  <span className="section-bg-text left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 text-[60px] sm:text-[72px] md:text-[80px] lg:text-[96px] text-[#0b1220]/25 absolute" style={{ opacity: 0.25 }}>MERIT</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4 relative">MAXELUSで開発する5つのメリット</h2>
                </div>
              </div>
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

        {/* App Screens Section - アプリ画面イメージ */}
        <section id="app-screens" className="py-16 md:py-24 px-4 md:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection animation="fade-up" className="text-center mb-12 relative">
              <div className="relative flex justify-center">
                <div className="relative inline-block">
                  <span className="section-bg-text left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 text-[60px] sm:text-[72px] md:text-[80px] lg:text-[96px] text-[#0b1220]/25 absolute" style={{ opacity: 0.25 }}>APPS</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-2 relative">アプリ画面イメージ</h2>
                </div>
              </div>
              <p className="text-[#6b7280]">横にスクロールして様々なアプリ画面をご覧ください</p>
            </AnimatedSection>
            
            <div className="bg-white rounded-xl p-6 md:p-8 border border-[#e5e7eb]">
              <IPhoneFrameSlider />
            </div>
          </div>
        </section>

        {/* Results Section - デモ画面 */}
        <section id="demo" className="py-8 md:py-12 px-4 md:px-8 bg-[#fafafa]">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection animation="fade-up" className="text-center mb-8 relative">
              <div className="relative flex justify-center">
                <div className="relative inline-block">
                  <span className="section-bg-text left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 text-[60px] sm:text-[72px] md:text-[80px] lg:text-[96px] text-[#0b1220]/25 absolute" style={{ opacity: 0.25 }}>DEMO</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-2 relative">デモ画面</h2>
                </div>
              </div>
              <p className="text-[#6b7280]">様々な業界のクライアント様にご利用いただいています</p>
            </AnimatedSection>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
              {[
                { value: "50+", label: "プロジェクト実績" },
                { value: "98%", label: "顧客満足度" },
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
            
            {/* Webアプリデモ - 元の画像をそのままスライド */}
            <div className="bg-white rounded-xl p-6 md:p-8 mb-8 border border-[#e5e7eb]">
              <div className="text-center mb-4">
                <h3 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-1">Webアプリデモ</h3>
                <p className="text-[#6b7280] text-sm">様々なWebアプリのデモ画面をご覧ください</p>
              </div>
              <div className="relative w-full max-w-6xl mx-auto">
                {/* スライダーコンテナ */}
                <div className="relative overflow-hidden rounded-lg bg-white">
                  <div 
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                  >
                    {caseImages.map((caseImage, index) => (
                      <div key={caseImage.id} className="min-w-full flex-shrink-0 flex flex-col items-center justify-center">
                        <div className="relative w-full max-w-5xl mx-auto px-4">
                          <div className="text-center mb-1">
                            <h4 className="text-lg md:text-xl font-bold text-[#1a1a1a]">{caseImage.title}</h4>
                            <p className="text-xs text-[#6b7280]">Webアプリデモ</p>
                          </div>
                          {/* 元の画像をそのまま表示 - 余白を最小限に */}
                          <div className="relative w-full flex items-center justify-center">
                            <Image
                              src={caseImage.iphoneImage}
                              alt={caseImage.title}
                              width={800}
                              height={1600}
                              sizes="(max-width: 768px) 100vw, 800px"
                              className="object-contain w-auto h-auto max-h-[500px] md:max-h-[600px]"
                              loading="lazy"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* インジケーターとナビゲーションボタン */}
                <div className="flex items-center justify-center gap-4 mt-4">
                  {/* 左矢印ボタン */}
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : caseImages.length - 1))}
                    className="bg-white/90 hover:bg-white rounded-full p-2.5 shadow-lg transition-all hover:scale-110 border border-[#e5e7eb] text-[#1a1a1a] leading-none w-10 h-10 flex items-center justify-center"
                    aria-label="前の画像"
                  >
                    前へ
                  </button>

                  {/* ページ番号表示 */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[#6b7280]">
                      {currentImageIndex + 1} / {caseImages.length}
                    </span>
                    {/* インジケーター */}
                    <div className="flex gap-2">
                      {caseImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`h-2 rounded-full transition-all ${
                            index === currentImageIndex ? 'bg-[#fff100] w-8' : 'bg-[#d1d5dc] w-2'
                          }`}
                          aria-label={`画像 ${index + 1} に移動`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* 右矢印ボタン */}
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev < caseImages.length - 1 ? prev + 1 : 0))}
                    className="bg-white/90 hover:bg-white rounded-full p-2.5 shadow-lg transition-all hover:scale-110 border border-[#e5e7eb] text-[#1a1a1a] leading-none w-10 h-10 flex items-center justify-center"
                    aria-label="次の画像"
                  >
                    次へ
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Flow Section */}
        <section id="flow" className="py-16 md:py-24 px-4 md:px-8 bg-[#fafafa]">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection animation="fade-up" className="text-center mb-12 relative">
              <div className="relative flex justify-center">
                <div className="relative inline-block">
                  <span className="section-bg-text left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 text-[60px] sm:text-[72px] md:text-[80px] lg:text-[96px] text-[#0b1220]/25 absolute" style={{ opacity: 0.25 }}>FLOW</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-2 relative">制作フロー</h2>
                </div>
              </div>
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
              <div className="mt-8 bg-[#f3f4f6] rounded-xl p-6 border border-[#e5e7eb]">
                <div>
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
              <div className="relative flex justify-center">
                <div className="relative inline-block">
                  <span className="section-bg-text left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 text-[60px] sm:text-[72px] md:text-[80px] lg:text-[96px] text-white/25 absolute" style={{ opacity: 0.25 }}>CTA</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 relative">
                    今、動かないことが
                    <br />
                    最大の機会損失です
                  </h2>
                </div>
              </div>
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
              <div className="relative flex justify-center">
                <div className="relative inline-block">
                  <span className="section-bg-text left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 text-[60px] sm:text-[72px] md:text-[80px] lg:text-[96px] text-[#0b1220]/25 absolute" style={{ opacity: 0.25 }}>CONTACT</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-2 relative">お問い合わせ</h2>
                </div>
              </div>
              <p className="text-[#6b7280]">まずはお気軽にご相談ください。24時間以内に返信いたします</p>
            </AnimatedSection>
            {isSubmitted ? (
              <div className="bg-white border-2 border-[#e5e7eb] rounded-xl p-8 text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-4">
                  お問い合わせありがとうございます
                </h3>
                <p className="text-[#6b7280] mb-8">
                  担当者より2営業日以内にご連絡いたします。<br />
                  しばらくお待ちください。
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-[#fdc700] hover:text-[#e5b400] font-medium transition-colors"
                >
                  トップページに戻る
                </Link>
              </div>
            ) : (
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
                    className="w-full px-4 py-3 border border-[#e5e7eb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fff100] bg-white text-[#1a1a1a]"
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
                    className="w-full px-4 py-3 border border-[#e5e7eb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fff100] bg-white text-[#1a1a1a]"
                    placeholder="example@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1a1a1a] mb-2">会社名</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 border border-[#e5e7eb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fff100] bg-white text-[#1a1a1a]"
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
                    className="w-full px-4 py-3 border border-[#e5e7eb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fff100] bg-white text-[#1a1a1a]"
                    placeholder="ご相談内容をできるだけ詳しくお書きください。 例：ECサイトのスマホアプリを作りたい、現在の課題は〇〇です..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#fff100] to-[#fdc700] hover:from-[#fdc700] hover:to-[#fff100] disabled:bg-[#e5e7eb] disabled:cursor-not-allowed text-[#1a1a1a] font-bold px-6 py-4 rounded-lg transition-all hover:scale-105 disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? "送信中..." : "送信する"}
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
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
