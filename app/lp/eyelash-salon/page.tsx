"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "@/app/components/Footer";
import { AnimatedSection } from "@/app/components/AnimationProvider";

// Figmaから取得した画像URL
const imgImageWithFallback = "https://www.figma.com/api/mcp/asset/5a2485c4-a1e9-48b0-983a-1111d3da2430";
const imgImageWithFallback1 = "https://www.figma.com/api/mcp/asset/3bdb530f-700b-472c-a4ad-24f5ca3b8c9c";
const imgImageWithFallback2 = "https://www.figma.com/api/mcp/asset/b604262a-1767-414c-a59c-131d15c9f107";
const imgImageWithFallback3 = "https://www.figma.com/api/mcp/asset/8ae110d0-1494-4f2f-b3fd-795da2cd7b96";
const imgImageWithFallback4 = "https://www.figma.com/api/mcp/asset/cd5dd24c-4106-4a18-9879-3785365403ed";
const imgIcon = "https://www.figma.com/api/mcp/asset/dcc8a372-b2f1-4493-8930-ba0ca363fe71";

export default function EyelashSalonLP() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "初めてでも大丈夫ですか？",
      answer: "もちろん大丈夫です。カウンセリングで丁寧にご説明しますので、ご安心ください。",
    },
    {
      question: "施術時間はどのくらいかかりますか？",
      answer: "メニューにもよりますが、初回は約90分〜120分程度です。リペアの場合は60分〜90分程度となります。",
    },
    {
      question: "どのくらい持ちますか？",
      answer: "個人差はありますが、平均して3〜4週間程度です。定期的なメンテナンスをおすすめしております。",
    },
    {
      question: "まつげが傷むことはありませんか？",
      answer: "当サロンでは高品質な商材のみを使用し、認定アイリストが施術いたしますので、自まつげへの負担を最小限に抑えています。",
    },
    {
      question: "予約のキャンセルは可能ですか？",
      answer: "可能です。ただし、前日以降のキャンセルはキャンセル料が発生する場合がございます。",
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-[#e5e7eb]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-[#1a1a1a]">
            eyelash salon
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#about" className="text-sm text-[#6b7280] hover:text-[#ff637e]">
              選ばれる理由
            </a>
            <a href="#menu" className="text-sm text-[#6b7280] hover:text-[#ff637e]">
              メニュー
            </a>
            <a href="#flow" className="text-sm text-[#6b7280] hover:text-[#ff637e]">
              施術の流れ
            </a>
            <a href="#salon" className="text-sm text-[#6b7280] hover:text-[#ff637e]">
              サロン
            </a>
            <a href="#faq" className="text-sm text-[#6b7280] hover:text-[#ff637e]">
              FAQ
            </a>
          </nav>
        </div>
      </header>

      <main className="pt-14">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-[rgba(255,241,242,0.3)] to-white py-20 md:py-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <AnimatedSection animation="fade-up" className="relative">
                <span className="section-bg-text left-0 -top-6 md:-top-12 text-[30px] sm:text-[40px] md:text-[60px] lg:text-[80px] text-[#ffa1ad]/10">HERO</span>
                <div className="space-y-6">
                  <h1 className="text-5xl md:text-6xl font-normal text-[#ffa1ad] tracking-[18px] leading-tight">
                    ま い に ち が
                    <br />
                    き ら き ら な
                    <br />
                    あ な た へ
                  </h1>
                </div>
              </AnimatedSection>
              <AnimatedSection animation="fade-up" delay={200}>
                <div className="relative rounded-lg shadow-2xl overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imgImageWithFallback}
                    alt="まつげサロン"
                    className="w-full h-auto object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent" />
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 md:py-24 px-4 md:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <AnimatedSection animation="fade-up" className="relative">
                <span className="section-bg-text left-0 -top-6 md:-top-12 text-[30px] sm:text-[40px] md:text-[60px] lg:text-[80px] text-[#d1d5dc]/10">ABOUT</span>
                <div className="bg-gradient-to-br from-[rgba(255,241,242,1)] to-[rgba(255,228,230,0.5)] rounded-lg p-12 relative">
                  <h2 className="text-5xl md:text-6xl font-normal text-[#d1d5dc] tracking-[9px] text-center mb-8">
                    eyelash salon
                  </h2>
                </div>
              </AnimatedSection>
              <AnimatedSection animation="fade-up" delay={200}>
                <div className="text-center mb-8">
                  <p className="text-[#ffa1ad] italic text-sm mb-2">Our</p>
                  <h2 className="text-3xl md:text-4xl font-normal text-[#0a0a0a] tracking-[6px] mb-2">POINTS</h2>
                  <p className="text-[#6a7282] text-sm">選ばれる理由</p>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {[
                    { label: "適正な", value: "価格" },
                    { label: "安全への", value: "こだわり" },
                    { label: "充実した", value: "研修制度" },
                  ].map((point, i) => (
                    <div
                      key={i}
                      className="bg-gradient-to-br from-[#a65f00] to-[#894b00] rounded-full w-32 h-32 flex flex-col items-center justify-center text-white shadow-lg"
                    >
                      <p className="text-xs mb-1">{point.label}</p>
                      <p className="text-lg font-normal">{point.value}</p>
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <button className="bg-[#ff637e] text-white px-8 py-3 rounded-lg shadow-md hover:bg-[#ff4d6d] transition-colors">
                    詳しく見る
                  </button>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Menu Section */}
        <section id="menu" className="py-16 md:py-24 px-4 md:px-8 bg-gradient-to-b from-white to-[rgba(255,241,242,0.3)]">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection animation="fade-up" className="text-center mb-12 relative">
              <span className="section-bg-text left-1/2 -translate-x-1/2 -top-6 md:-top-12 text-[30px] sm:text-[40px] md:text-[60px] lg:text-[80px] text-[#ffa1ad]/10">MENU</span>
              <p className="text-[#ffa1ad] italic text-sm mb-2">Our Services</p>
              <h2 className="text-4xl md:text-5xl font-normal text-[#0a0a0a] tracking-[10.8px] mb-2">MENU</h2>
              <p className="text-[#6a7282] text-sm">メニュー</p>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[
                { title: "フラットラッシュ", price: "¥6,600~", desc: "軽くて自然な仕上がり" },
                { title: "ボリュームラッシュ", price: "¥8,800~", desc: "華やかで密度のある仕上がり" },
                { title: "カラーエクステ", price: "¥7,700~", desc: "カラフルで個性的な仕上がり" },
                { title: "オフのみ", price: "¥3,300", desc: "丁寧なオフサービス" },
              ].map((menu, i) => (
                <AnimatedSection key={i} animation="fade-up" delay={i * 100}>
                  <div className="bg-white rounded-lg shadow-md p-8 text-center">
                    <h3 className="text-lg font-normal text-[#0a0a0a] tracking-[0.9px] mb-3">{menu.title}</h3>
                    <p className="text-2xl text-[#ff637e] mb-2">{menu.price}</p>
                    <p className="text-xs text-[#4a5565]">{menu.desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
            <div className="text-center">
              <button className="bg-[#ff637e] text-white px-8 py-3 rounded-lg shadow-md hover:bg-[#ff4d6d] transition-colors">
                メニュー詳細を見る
              </button>
            </div>
          </div>
        </section>

        {/* Flow Section */}
        <section id="flow" className="py-16 md:py-24 px-4 md:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <AnimatedSection animation="fade-up">
                <div className="relative rounded-lg shadow-xl overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imgImageWithFallback1}
                    alt="施術の流れ"
                    className="w-full h-auto object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </AnimatedSection>
              <AnimatedSection animation="fade-up" delay={200} className="relative">
                <span className="section-bg-text left-0 -top-6 md:-top-12 text-[30px] sm:text-[40px] md:text-[60px] lg:text-[80px] text-[#ffa1ad]/10">FLOW</span>
                <div className="mb-8">
                  <p className="text-[#ffa1ad] italic text-sm mb-2">Process</p>
                  <h2 className="text-4xl md:text-5xl font-normal text-[#0a0a0a] tracking-[10.8px] mb-2">FLOW</h2>
                  <p className="text-[#6a7282] text-sm">施術の流れ</p>
                </div>
                <div className="space-y-8">
                  {[
                    { step: "01", title: "カウンセリング", desc: "お客様のご要望をしっかりヒアリングします" },
                    { step: "02", title: "デザイン決定", desc: "理想の目元に合わせてデザインをご提案" },
                    { step: "03", title: "施術", desc: "リラックスした空間で丁寧に施術いたします" },
                    { step: "04", title: "アフターケア", desc: "ケア方法や次回のご案内をさせていただきます" },
                  ].map((flow, i) => (
                    <div key={i} className="flex gap-6 items-start">
                      <div className="bg-gradient-to-br from-[#ffa1ad] to-[#ff637e] rounded-full w-16 h-16 flex items-center justify-center text-white text-lg font-normal shadow-md flex-shrink-0">
                        {flow.step}
                      </div>
                      <div>
                        <h3 className="text-lg font-normal text-[#0a0a0a] tracking-[0.9px] mb-2">{flow.title}</h3>
                        <p className="text-sm text-[#4a5565]">{flow.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Salon Section */}
        <section id="salon" className="py-16 md:py-24 px-4 md:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <AnimatedSection animation="fade-up" className="relative">
                <div className="bg-[#ff637e] p-8 rounded-lg text-white text-center">
                  <h2 className="text-4xl md:text-5xl font-normal tracking-[10.8px] mb-2">SALON</h2>
                  <p className="text-sm mb-6 tracking-[0.7px]">サロン検索＆ご予約</p>
                  <button className="border-2 border-white px-8 py-3 rounded-lg hover:bg-white/10 transition-colors">
                    サロンを探す
                  </button>
                </div>
              </AnimatedSection>
              <AnimatedSection animation="fade-up" delay={200}>
                <div className="relative rounded-lg shadow-xl overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imgImageWithFallback2}
                    alt="サロン"
                    className="w-full h-auto object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-16 md:py-24 px-4 md:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <AnimatedSection animation="fade-up" className="relative">
                <div className="relative rounded-lg shadow-xl overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imgImageWithFallback3}
                    alt="FAQ"
                    className="w-full h-auto object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
                </div>
              </AnimatedSection>
              <AnimatedSection animation="fade-up" delay={200} className="relative">
                <span className="section-bg-text left-0 -top-6 md:-top-12 text-[30px] sm:text-[40px] md:text-[60px] lg:text-[80px] text-[#ffa1ad]/10">FAQ</span>
                <div className="mb-8">
                  <p className="text-[#ffa1ad] italic text-sm mb-2">Questions</p>
                  <h2 className="text-4xl md:text-5xl font-normal text-[#0a0a0a] tracking-[10.8px] mb-2">FAQ</h2>
                  <p className="text-[#6a7282] text-sm">よくある質問</p>
                </div>
                <div className="space-y-4">
                  {faqs.map((faq, i) => (
                    <div key={i} className="border-b border-[#e5e7eb] pb-4">
                      <button
                        onClick={() => toggleFaq(i)}
                        className="w-full flex items-center justify-between text-left"
                      >
                        <p className="text-sm text-[#0a0a0a]">{faq.question}</p>
                        <svg
                          className={`w-5 h-5 text-[#0a0a0a] transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {openFaq === i && (
                        <p className="text-sm text-[#4a5565] mt-2">{faq.answer}</p>
                      )}
                    </div>
                  ))}
                </div>
                <a href="#" className="text-[#ff637e] text-sm underline mt-4 inline-block">
                  すべての質問を見る →
                </a>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Recruit Section */}
        <section className="py-16 md:py-24 px-4 md:px-8 bg-white relative overflow-hidden">
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imgImageWithFallback4}
              alt="採用情報"
              className="w-full h-[600px] object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <AnimatedSection animation="fade-up" className="bg-black/40 p-8 rounded-lg text-white text-center max-w-md">
                <p className="text-[#ffccd3] italic text-sm mb-2">Join Our Team</p>
                <h2 className="text-5xl md:text-6xl font-normal tracking-[14.4px] mb-2">RECRUIT</h2>
                <p className="text-sm mb-6 tracking-[0.7px]">採用情報</p>
                <p className="text-sm mb-6">
                  一緒に働く仲間を募集しています。
                  <br />
                  未経験の方も、経験者の方も大歓迎です。
                </p>
                <div className="grid grid-cols-3 gap-4 mb-6 text-xs">
                  <div>
                    <p className="mb-1">充実の研修</p>
                    <p className="opacity-90">未経験でも安心</p>
                  </div>
                  <div>
                    <p className="mb-1">働きやすい環境</p>
                    <p className="opacity-90">柔軟なシフト制</p>
                  </div>
                  <div>
                    <p className="mb-1">キャリアアップ</p>
                    <p className="opacity-90">成長をサポート</p>
                  </div>
                </div>
                <button className="border-2 border-white px-8 py-3 rounded-lg hover:bg-white/10 transition-colors">
                  採用情報の詳細を見る
                </button>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
