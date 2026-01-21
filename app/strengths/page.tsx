"use client";

import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AnimatedSection, TiltCard, AnimatedCounter } from "../components/AnimationProvider";

// 強みデータ
const strengths = [
  {
    id: "experience",
    title: 'WordPressでは出せない"体験"を作れる',
    description: "iPhoneデモがサイト内で動く。3D表現・アニメーション・インタラクション。「かっこいい」だけでなく、理解しやすい導線に落とし込みます。",
    features: [
      "iPhoneデモがサイト内で動く（操作感が伝わる）",
      "3D表現・アニメーション・インタラクション（離脱を減らす）",
      "「かっこいい」だけじゃなく、理解しやすい導線に落とし込む"
    ],
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    )
  },
  {
    id: "demo",
    title: '打ち合わせ後すぐに"デモ"が出る開発スタイル',
    description: "先にデザインで全体像を固める。次回打ち合わせで触れる画面がある。「失敗ゼロへ」＝ 仕様のズレを最初に潰します。",
    features: [
      "先にデザインで全体像を固める → 迷いが減る",
      "次回打ち合わせで触れる画面がある → 判断が早い",
      "「失敗ゼロへ」＝ 仕様のズレを最初に潰す"
    ],
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672h-6.75a2.25 2.25 0 01-2.25-2.25V4.5a2.25 2.25 0 012.25-2.25h6.75a2.25 2.25 0 012.25 2.25v15.222a2.25 2.25 0 01-2.25 2.25zM9.75 4.5v15.222M12 9.75h.008v.008H12V9.75z" />
      </svg>
    )
  },
  {
    id: "operation",
    title: '業務DXは"運用まで"作る',
    description: "Excel置き換えだけで終わらない。検索・権限・履歴・進捗・データ蓄積まで設計。製造業の現場フロー前提で開発します。",
    features: [
      "Excel置き換えだけで終わらない",
      "検索・権限・履歴・進捗・データ蓄積まで設計",
      "製造業の現場フロー前提（図面・見積・発注・工程…）"
    ],
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
      </svg>
    )
  },
  {
    id: "cms",
    title: "あとから自分で更新できる（microCMS対応）",
    description: "新着・実績・サービス内容を管理画面で編集。エンジニアがいなくても更新できる状態にします。「作って終わり」じゃなく、運用コストを下げます。",
    features: [
      "新着・実績・サービス内容を管理画面で編集",
      "エンジニアがいなくても更新できる状態にする",
      "「作って終わり」じゃなく、運用コストを下げる"
    ],
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
      </svg>
    )
  },
  {
    id: "scale",
    title: "拡張できる設計（最小→スケール）",
    description: "最初は小さく作る（MVP）。データが貯まるほどAI/OCR/検索が強くなる設計。Webアプリ・業務システムへ段階的に広げられます。",
    features: [
      "最初は小さく作る（MVP）",
      "データが貯まるほどAI/OCR/検索が強くなる設計",
      "Webアプリ・業務システムへ段階的に広げられる"
    ],
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    )
  }
];

// 実績数値データ
const stats = [
  { label: "導入実績", value: 50, suffix: "社以上" },
  { label: "継続率", value: 95, suffix: "%" },
  { label: "平均開発期間", value: 2, suffix: "ヶ月〜" },
  { label: "業界経験", value: 10, suffix: "年以上" }
];

export default function StrengthsPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />
      
      <main className="pt-14 md:pt-16">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-[#0b1220] via-[#1e293b] to-[#0b1220] py-20 md:py-32 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }} />
          </div>
          
          {/* Gradient Orbs */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#fff100]/10 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-[#fdc700]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
          
          <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 text-center">
            <AnimatedSection animation="fade-up">
              <p className="text-[#fff100] text-sm md:text-base font-medium mb-4 tracking-wider">
                STRENGTHS
              </p>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                マクセラスが選ばれる理由
              </h1>
              <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
                「作るだけ」では終わらない。<br className="hidden md:block" />
                現場で使える・更新できる・拡張できるシステムを、最短で形にします。
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 md:py-16 bg-[#fafafa] border-b border-[#e5e7eb]">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {stats.map((stat, index) => (
                <AnimatedSection key={index} animation="fade-up" delay={index * 100}>
                  <div className="text-center">
                    <div className="text-3xl md:text-5xl font-bold text-[#1a1a1a] mb-2">
                      <AnimatedCounter end={stat.value} duration={2000} />
                      <span className="text-lg md:text-2xl text-[#fdc700]">{stat.suffix}</span>
                    </div>
                    <p className="text-sm md:text-base text-[#6b7280]">{stat.label}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Strengths Grid */}
        <section className="py-16 md:py-24 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection animation="fade-up">
              <h2 className="text-2xl md:text-4xl font-bold text-[#1a1a1a] text-center mb-4">
                5つの強み
              </h2>
              <p className="text-[#6b7280] text-center mb-12 md:mb-16 max-w-2xl mx-auto">
                抽象的な「強み」ではなく、具体的な特徴でお伝えします。
              </p>
            </AnimatedSection>

            <div className="space-y-8 md:space-y-12">
              {strengths.map((strength, index) => (
                <AnimatedSection key={strength.id} animation="fade-up" delay={index * 100}>
                  <TiltCard maxTilt={3} className="w-full">
                    <div className={`bg-white rounded-2xl md:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-[#e5e7eb]/50 ${
                      index % 2 === 0 ? '' : 'md:flex-row-reverse'
                    }`}>
                      <div className="p-6 md:p-10">
                        <div className="flex items-start gap-4 md:gap-6">
                          {/* Icon */}
                          <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#fff100] to-[#fdc700] rounded-2xl flex items-center justify-center text-[#1a1a1a] flex-shrink-0 shadow-lg">
                            {strength.icon}
                          </div>

                          <div className="flex-1">
                            {/* Number */}
                            <span className="text-xs md:text-sm text-[#fdc700] font-bold tracking-wider mb-2 block">
                              0{index + 1}
                            </span>
                            
                            {/* Title */}
                            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1a1a1a] mb-4">
                              {strength.title}
                            </h3>
                            
                            {/* Description */}
                            <p className="text-base md:text-lg text-[#6b7280] mb-6 leading-relaxed">
                              {strength.description}
                            </p>
                            
                            {/* Features */}
                            <ul className="space-y-3">
                              {strength.features.map((feature, i) => (
                                <li key={i} className="flex items-start gap-3">
                                  <div className="w-5 h-5 bg-[#fff100] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <svg className="w-3 h-3 text-[#1a1a1a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                  </div>
                                  <span className="text-sm md:text-base text-[#1a1a1a]">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Visual Evidence Section */}
        <section className="py-16 md:py-24 px-4 md:px-8 bg-[#fafafa]">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection animation="fade-up">
              <h2 className="text-2xl md:text-4xl font-bold text-[#1a1a1a] text-center mb-4">
                実際の画面イメージ
              </h2>
              <p className="text-[#6b7280] text-center mb-12 md:mb-16 max-w-2xl mx-auto">
                文章だけでは伝わらない「体験」を、スクリーンショットでご覧ください。
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[
                { 
                  title: "iPhoneデモ", 
                  description: "サイト上で実際に操作できるデモ",
                  image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80"
                },
                { 
                  title: "管理画面", 
                  description: "自分で更新できるCMS",
                  image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
                },
                { 
                  title: "検索UI", 
                  description: "図面・データを高速検索",
                  image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
                }
              ].map((item, index) => (
                <AnimatedSection key={index} animation="fade-up" delay={index * 100}>
                  <TiltCard maxTilt={5} className="h-full">
                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-full">
                      <div className="aspect-video bg-[#e5e7eb] overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-[#1a1a1a] mb-2">{item.title}</h3>
                        <p className="text-sm text-[#6b7280]">{item.description}</p>
                      </div>
                    </div>
                  </TiltCard>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
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
                「こんなこと実現できる？」という段階からOK。<br />
                課題を整理するところから、一緒にスタートしましょう。
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-[#fff100] hover:bg-[#fdc700] text-[#1a1a1a] font-medium px-8 py-4 rounded-full transition-all hover:scale-105"
                >
                  無料相談する
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link 
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-4 rounded-full border border-white/30 transition-all hover:scale-105"
                >
                  サービス一覧を見る
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
