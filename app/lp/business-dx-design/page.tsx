"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "@/app/components/Footer";
import { 
  AnimatedSection, 
  StaggeredContainer, 
  TiltCard,
  FloatingElement,
  GradientOrbs
} from "@/app/components/AnimationProvider";

// Image URLs from Figma
const imgHeroDemo = "https://www.figma.com/api/mcp/asset/7e73c5ad-1bad-40df-8921-ce35139c9ade";
const imgArrowIcon = "https://www.figma.com/api/mcp/asset/7ec4195f-a9ee-4a40-9cee-fdd834f0cb73";
const imgWebIcon = "https://www.figma.com/api/mcp/asset/255d631b-ad89-466c-95b4-c50f43d66859";
const imgAppIcon = "https://www.figma.com/api/mcp/asset/2e37d1b0-14e3-4732-a06f-9afca402eee0";
const imgDxIcon = "https://www.figma.com/api/mcp/asset/73ced661-043d-4ff9-8929-4a0d44f7fb9d";
const imgCloudIcon = "https://www.figma.com/api/mcp/asset/0226501b-da52-458c-928a-a3290c5eea2e";
const imgMobileIcon = "https://www.figma.com/api/mcp/asset/71acee49-6838-4b21-8024-587de2838e59";

export default function BusinessDXDesignLP() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

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
          inquiryType: '業務DX設計',
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
          <Link href="/" className="text-xl font-bold text-[#1a1a1a]">
            MAXELUS
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#solution" className="text-sm text-[#6b7280] hover:text-[#1a1a1a]">
              解決策
            </a>
            <a href="#services" className="text-sm text-[#6b7280] hover:text-[#1a1a1a]">
              サービス
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
        {/* Hero Section - 元のホームページから移動 */}
        <section className="relative min-h-[90vh] md:min-h-screen overflow-hidden">
          {/* Parallax Background Image - 固定背景 */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80')`,
              transform: 'scale(1.1)',
            }}
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/90 to-white/95" />
          
          {/* Animated Background Elements */}
          <div className="absolute inset-0 opacity-[0.02] grid-pattern" />
          <div className="absolute top-20 left-10 w-48 md:w-72 h-48 md:h-72 bg-[#fff100]/20 rounded-full blur-[80px] md:blur-[100px] animate-morph" />
          <div className="absolute bottom-10 right-10 w-64 md:w-96 h-64 md:h-96 bg-[#fdc700]/20 rounded-full blur-[100px] md:blur-[120px] animate-morph" style={{ animationDelay: "-4s" }} />
          
          {/* Floating decorative elements - hidden on mobile */}
          <FloatingElement className="absolute top-32 right-20 opacity-30 hidden md:block" amplitude={15} duration={4}>
            <div className="w-4 h-4 bg-[#fff100] rounded-full shadow-lg" />
          </FloatingElement>
          <FloatingElement className="absolute top-48 left-32 opacity-30 hidden md:block" amplitude={12} duration={3.5} delay={0.5}>
            <div className="w-3 h-3 bg-[#fdc700] rounded-full shadow-lg" />
          </FloatingElement>
          <FloatingElement className="absolute bottom-40 left-20 opacity-25 hidden md:block" amplitude={18} duration={4.5} delay={1}>
            <div className="w-5 h-5 bg-[#fff100] rotate-45 shadow-lg" />
          </FloatingElement>
          
          <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-28">
            <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
              {/* Left content */}
              <div className="flex-1 max-w-full lg:max-w-[450px] space-y-4 md:space-y-6 text-center lg:text-left">
                <AnimatedSection animation="fade-up" duration={800}>
                  <h1 className="text-[28px] sm:text-[36px] md:text-[44px] lg:text-[52px] font-bold leading-[36px] sm:leading-[46px] md:leading-[54px] lg:leading-[62px] tracking-tight text-[#1a1a1a]">
                    そのソフト、現場に合わせて
                    <br />
                    <span className="animate-text-gradient">&quot;我慢して&quot;</span>
                    使っていませんか？
                  </h1>
                </AnimatedSection>
                <AnimatedSection animation="fade-up" delay={300} duration={800}>
                  <p className="text-base md:text-lg text-[#6b7280] leading-[26px] md:leading-[29px]">
                    業務にソフトを合わせる時代は終わり。<br className="hidden sm:block" />
                    まずは&quot;触れるデモ&quot;で、最短ルートを見える化します。
                  </p>
                </AnimatedSection>
                <AnimatedSection animation="fade-up" delay={500} duration={800}>
                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 md:pt-4 justify-center lg:justify-start">
                    <Link 
                      href="#contact" 
                      prefetch={true} 
                      className="btn-primary flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg group relative overflow-hidden"
                    >
                      <span className="relative z-10">無料相談する</span>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={imgArrowIcon} alt="" className="w-5 md:w-6 h-5 md:h-6 relative z-10 transition-transform group-hover:translate-x-1" />
                      <div className="absolute inset-0 bg-[#fdc700] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
                    </Link>
                    <Link 
                      href="/cases" 
                      prefetch={true} 
                      className="btn-outline flex items-center justify-center px-6 md:px-8 py-3 md:py-4 text-base md:text-lg hover:bg-[#1a1a1a] hover:text-white transition-all duration-300"
                    >
                      事例を見る
                    </Link>
                  </div>
                </AnimatedSection>
              </div>
              {/* Right content - Demo image */}
              <AnimatedSection animation="fade-up" delay={200} duration={1000} className="flex-1 relative w-full max-w-[500px] lg:max-w-none">
                <div className="absolute inset-0 blur-[64px] bg-gradient-to-br from-[rgba(255,241,0,0.2)] via-[rgba(255,215,0,0.1)] to-transparent animate-morph" />
                <TiltCard maxTilt={8} className="relative bg-white border border-[#e5e7eb] rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={imgHeroDemo} 
                    alt="業務DXデモ画面" 
                    className="w-full h-auto" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
                </TiltCard>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Solution Section - 元のホームページから移動 */}
        <section id="solution" className="relative py-16 md:py-32 px-4 md:px-12 overflow-hidden">
          {/* Parallax Background */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-fixed opacity-5"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-[#fffef8] to-white" />
          
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-gradient-to-bl from-[#fff100]/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 md:w-80 h-48 md:h-80 bg-gradient-to-tr from-[#fdc700]/10 to-transparent rounded-full blur-3xl" />
          
          <div className="relative max-w-[1100px] mx-auto">
            <AnimatedSection animation="zoom-in" className="relative text-center">
              <span className="section-bg-text left-1/2 -translate-x-1/2 -top-6 md:-top-12 text-[30px] sm:text-[40px] md:text-[60px] lg:text-[80px] xl:text-[100px]">SOLUTION</span>
              <div className="relative space-y-4 md:space-y-6">
                <p className="text-sm md:text-base text-[#fdc700] font-medium tracking-widest">OUR APPROACH</p>
                <h2 className="text-[26px] sm:text-[32px] md:text-[42px] lg:text-[48px] font-bold text-[#1a1a1a] leading-[36px] sm:leading-[44px] md:leading-[54px] lg:leading-[60px] tracking-tight px-2">
                  その業務、システム化して
                  <br />
                  <span className="animate-text-gradient">&quot;人を増やさず&quot;</span>
                  回すのはどうですか？
                </h2>
                <AnimatedSection animation="fade-up" delay={500}>
                  <p className="text-base md:text-lg text-[#6b7280]">
                    日々のムダを減らして、現場の処理速度を上げる。
                  </p>
                </AnimatedSection>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Services Section - 元のホームページから移動 */}
        <section id="services" className="bg-white py-12 md:py-24 px-4 md:px-12 lg:px-24 relative overflow-hidden">
          {/* Animated background blobs */}
          <div className="absolute -top-40 -left-40 w-60 md:w-80 h-60 md:h-80 bg-[#fff100]/5 rounded-full blur-3xl animate-morph" />
          <div className="absolute -bottom-40 -right-40 w-72 md:w-96 h-72 md:h-96 bg-[#fdc700]/5 rounded-full blur-3xl animate-morph" style={{ animationDelay: "-3s" }} />
          
          <div className="max-w-[1100px] mx-auto relative">
            {/* Section heading */}
            <AnimatedSection animation="fade-up" className="relative text-center mb-8 md:mb-16">
              <span className="section-bg-text left-1/2 -translate-x-1/2 -top-6 md:-top-12 text-[30px] sm:text-[40px] md:text-[60px] lg:text-[80px]">SERVICES</span>
              <h2 className="relative text-[24px] md:text-[32px] font-bold text-[#1a1a1a] tracking-tight">
                対応できる内容
              </h2>
            </AnimatedSection>
            
            {/* Services grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {[
                {
                  icon: imgWebIcon,
                  title: "HP制作",
                  description: "普通のHPも、3D/アニメーションみたいな『尖った表現』も対応。",
                  tags: ["3D", "アニメ", "CMS"]
                },
                {
                  icon: imgAppIcon,
                  title: "Webアプリ開発",
                  description: "新規事業のSaaSも、社内ツールも。まずはMVPから最短で形に。",
                  tags: ["MVP", "DB", "認証"]
                },
                {
                  icon: imgDxIcon,
                  title: "業務DXアプリ",
                  description: "散らばった業務を一元管理。集計・分析まで『すぐ見える化』。",
                  tags: ["一元管理", "分析", "ワークフロー"]
                },
                {
                  icon: imgCloudIcon,
                  title: "クラウド連携",
                  description: "SaaS同士をAPIで接続して、二重入力をゼロに。",
                  tags: ["API", "自動同期", "運用設計"]
                },
                {
                  icon: imgMobileIcon,
                  title: "iOS/Androidアプリ",
                  description: "あなたのアイデアをアプリ化。Web連携・DB連携もまとめて対応。",
                  tags: ["Swift", "Flutter", "ストア申請"]
                },
                {
                  icon: "✨",
                  title: "AI活用・自動化",
                  description: "資料・図面・問い合わせ対応をAIで自動化。検索も高速化。",
                  tags: ["OCR", "AI検索", "自動化"],
                  isEmoji: true
                }
              ].map((service, i) => (
                <AnimatedSection key={i} animation="fade-up" delay={i * 100}>
                  <TiltCard maxTilt={6} className="h-full">
                    <div className="service-card bg-white rounded-[12px] md:rounded-[14px] shadow-md p-5 md:p-8 h-full group hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      <div className="bg-[#fffef0] rounded-lg w-10 md:w-12 h-10 md:h-12 flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                        {"isEmoji" in service && service.isEmoji ? (
                          <span className="text-xl md:text-2xl">{service.icon}</span>
                        ) : (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img src={service.icon as string} alt="" className="w-5 md:w-6 h-5 md:h-6" />
                        )}
                      </div>
                      <h3 className="text-lg md:text-xl text-[#1a1a1a] mb-1 md:mb-2 group-hover:text-[#fdc700] transition-colors font-bold">{service.title}</h3>
                      <p className="text-xs md:text-sm text-[#6b7280] mb-3 md:mb-4 line-clamp-2">{service.description}</p>
                      <div className="flex gap-1.5 md:gap-2 flex-wrap">
                        {service.tags.map((tag, j) => (
                          <span key={j} className="tag text-xs md:text-sm px-2 md:px-3 py-0.5 md:py-1 group-hover:bg-[#fff100] group-hover:text-[#1a1a1a] transition-colors duration-300" style={{ transitionDelay: `${j * 50}ms` }}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </TiltCard>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 md:py-24 px-4 md:px-8 bg-[#fafafa]">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection animation="fade-up" className="text-center mb-12 relative">
              <span className="section-bg-text left-1/2 -translate-x-1/2 -top-6 md:-top-12 text-[30px] sm:text-[40px] md:text-[60px] lg:text-[80px] text-[#d1d5dc]/10">CONTACT</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-2 relative">お問い合わせ</h2>
              <p className="text-[#6b7280]">まずはお気軽にご相談ください。24時間以内に返信いたします</p>
            </AnimatedSection>
            {isSubmitted ? (
              <div className="bg-white border-2 border-[#e5e7eb] rounded-xl p-8 text-center">
                <div className="w-20 h-20 bg-[#dcfce7] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-[#16a34a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
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
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
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
                    placeholder="ご相談内容をできるだけ詳しくお書きください。"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#fff100] to-[#fdc700] hover:from-[#fdc700] hover:to-[#fff100] disabled:bg-[#e5e7eb] disabled:cursor-not-allowed text-[#1a1a1a] font-bold px-6 py-4 rounded-lg transition-all hover:scale-105 disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      送信中...
                    </>
                  ) : (
                    '送信する'
                  )}
                </button>
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
