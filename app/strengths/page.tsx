"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import Footer from "../components/Footer";
import { AnimatedSection, TiltCard, AnimatedCounter } from "../components/AnimationProvider";

// デモコンポーネントを動的インポート
const SalonReservationAppMockup = dynamic(() => import("../components/SalonReservationAppMockup"), {
  loading: () => <div className="h-[600px] flex items-center justify-center bg-white"><div className="animate-pulse text-[#6a7282]">読み込み中...</div></div>,
  ssr: false
});

// Strength型定義
interface Strength {
  id: string;
  title: string;
  description: string;
  features: string[];
  order_number: number;
}

// フォールバック用のデータ
const fallbackStrengths = [
  {
    id: "experience",
    title: 'WordPressでは出せない"体験"を作れる',
    description: "iPhoneデモがサイト内で動く。3D表現・アニメーション・インタラクション。「かっこいい」だけでなく、理解しやすい導線に落とし込みます。",
    features: [
      "iPhoneデモがサイト内で動く（操作感が伝わる）",
      "3D表現・アニメーション・インタラクション（離脱を減らす）",
      "「かっこいい」だけじゃなく、理解しやすい導線に落とし込む"
    ],
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
  }
];

// 実績数値データ
const stats = [
  { label: "満足度", value: 95, suffix: "%" },
  { label: "平均開発期間", value: 2, suffix: "ヶ月〜" },
];

export default function StrengthsPage() {
  // フォールバックデータを即座に表示（初期状態）
  const [loading, setLoading] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [strengths, setStrengths] = useState<Strength[]>(
    fallbackStrengths.map((s, i) => ({
      id: s.id,
      title: s.title,
      description: s.description,
      features: s.features,
      order_number: i + 1,
    }))
  );
  const [pageSettings, setPageSettings] = useState<{ 
    title: string; 
    subtitle: string;
    cta_primary_text?: string;
    cta_primary_href?: string;
    cta_secondary_text?: string;
    cta_secondary_href?: string;
  } | null>({
    title: 'MAXELUSが選ばれる理由',
    subtitle: '"作るだけ"では終わらない。現場で使える・更新できる・拡張できるシステムを、最短で形にします。',
    cta_primary_text: '無料相談する',
    cta_primary_href: '/contact',
    cta_secondary_text: 'サービス一覧を見る',
    cta_secondary_href: '/services',
  });
  const [stats, setStats] = useState<Array<{ label: string; value: number; suffix: string }>>([
    { label: "満足度", value: 98, suffix: "%" },
    { label: "平均開発期間", value: 1, suffix: "ヶ月" },
    { label: "累計顧客数", value: 50, suffix: "以上" },
  ]);

  // データ取得を非同期で実行（バックグラウンドで更新）
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [strengthsRes, siteRes] = await Promise.all([
          fetch('/api/cms/strengths', { cache: 'no-store' }),
          fetch('/api/cms/site', { cache: 'no-store' })
        ]);

        const strengthsData = await strengthsRes.json();
        const siteSettings = await siteRes.json();

        if (strengthsData.ok && strengthsData.data && strengthsData.data.length > 0) {
          setStrengths(strengthsData.data as Strength[]);
        }
        if (siteSettings.ok) {
          setPageSettings({
            title: siteSettings.data?.strengths_page_title || 'MAXELUSが選ばれる理由',
            subtitle: siteSettings.data?.strengths_page_subtitle || '"作るだけ"では終わらない。現場で使える・更新できる・拡張できるシステムを、最短で形にします。',
            cta_primary_text: siteSettings.data?.strengths_page_cta_primary_text || '無料相談する',
            cta_primary_href: siteSettings.data?.strengths_page_cta_primary_href || '/contact',
            cta_secondary_text: siteSettings.data?.strengths_page_cta_secondary_text || 'サービス一覧を見る',
            cta_secondary_href: siteSettings.data?.strengths_page_cta_secondary_href || '/services',
          });
          if (siteSettings.data?.strengths_stats) {
            const parsedStats = typeof siteSettings.data.strengths_stats === 'string' 
              ? JSON.parse(siteSettings.data.strengths_stats)
              : siteSettings.data.strengths_stats;
            if (parsedStats && parsedStats.length > 0) {
              setStats(parsedStats);
            }
          }
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
        // エラー時もフォールバックデータを維持
      }
    };

    // 非同期でデータ取得（ページ表示をブロックしない）
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans">
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
            <AnimatedSection animation="fade-up" className="relative">
              <div className="relative inline-block">
                <span className="section-bg-text left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 text-[32px] sm:text-[48px] md:text-[64px] lg:text-[96px] xl:text-[120px] text-white/25 absolute" style={{ opacity: 0.25 }}>STRENGTHS</span>
                <div className="relative">
                  <p className="text-[#fff100] text-sm md:text-base font-medium mb-4 tracking-wider relative">
                    STRENGTHS
                  </p>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight px-2 relative">
                    {pageSettings?.title || 'MAXELUSが選ばれる理由'}
                  </h1>
                </div>
              </div>
              <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed px-2 relative">
                {pageSettings?.subtitle || '"作るだけ"では終わらない。現場で使える・更新できる・拡張できるシステムを、最短で形にします。'}
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Strengths Grid with Stats on the left */}
        <section className="py-16 md:py-24 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Stats Section - 左側に配置 */}
            <div className="mb-12 md:mb-16">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto">
                {stats.map((stat, index) => (
                  <AnimatedSection key={index} animation="fade-up" delay={index * 100}>
                    <div className="text-center">
                      <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a1a1a] mb-1 md:mb-2">
                        <AnimatedCounter end={stat.value} duration={2000} />
                        <span className="text-sm sm:text-lg md:text-xl lg:text-2xl text-[#fdc700]">{stat.suffix}</span>
                      </div>
                      <p className="text-xs sm:text-sm md:text-base text-[#6b7280] break-words">{stat.label}</p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
            <AnimatedSection animation="fade-up" className="relative">
              <div className="relative flex justify-center">
                <div className="relative inline-block">
                  <span className="section-bg-text left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 text-[32px] sm:text-[48px] md:text-[64px] lg:text-[96px] xl:text-[120px] text-[#0b1220]/25 absolute" style={{ opacity: 0.25 }}>STRENGTHS</span>
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#1a1a1a] text-center mb-3 md:mb-4 px-2 relative">
                    5つの強み
                  </h2>
                </div>
              </div>
              <p className="text-sm sm:text-base text-[#6b7280] text-center mb-8 sm:mb-12 md:mb-16 max-w-2xl mx-auto px-2 relative">
                抽象的な「強み」ではなく、具体的な特徴でお伝えします。
              </p>
            </AnimatedSection>

            {/* 5つの強みを小さなカードで横並び（3つ、2つ） */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {strengths.map((strength, index) => (
                <AnimatedSection key={strength.id} animation="fade-up" delay={Math.min(index * 50, 300)}>
                  <TiltCard maxTilt={3} className="h-full">
                    <div className="bg-white rounded-xl md:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-[#e5e7eb] h-full flex flex-col">
                      <div className="p-4 md:p-6 flex-1">
                        {/* Number */}
                        <div className="mb-4">
                          <span className="text-2xl md:text-3xl text-[#fdc700] font-bold tracking-[0.2em] tabular-nums">
                            0{index + 1}
                          </span>
                          <div className="mt-2 h-px w-10 bg-[#e5e7eb]" />
                        </div>

                        {/* Title */}
                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#1a1a1a] mb-2 md:mb-3 leading-tight">
                          {strength.title}
                        </h3>
                        
                        {/* Description */}
                        <p className="text-xs sm:text-sm md:text-base text-[#6b7280] mb-3 md:mb-4 leading-relaxed line-clamp-3">
                          {strength.description}
                        </p>
                        
                        {/* Features (最初の2つだけ表示) */}
                        {strength.features && strength.features.length > 0 && (
                          <ul className="space-y-1.5 md:space-y-2">
                            {strength.features.slice(0, 2).map((feature, i) => (
                              <li key={i} className="border-l-2 border-[#fff100] pl-3">
                                <span className="text-xs sm:text-sm text-[#1a1a1a] leading-relaxed break-words line-clamp-2">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </TiltCard>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* 対応可能なサービスデモセクション */}
        <section className="py-16 md:py-24 px-4 md:px-8 bg-[#fafafa]">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection animation="fade-up" className="relative">
              <div className="relative flex justify-center">
                <div className="relative inline-block">
                  <span className="section-bg-text left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 text-[32px] sm:text-[48px] md:text-[64px] lg:text-[96px] xl:text-[120px] text-[#0b1220]/25 absolute" style={{ opacity: 0.25 }}>SHOWCASE</span>
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#1a1a1a] text-center mb-3 md:mb-4 px-2 relative">
                    ホームページ・Webアプリ・iOSアプリ、全部できます
                  </h2>
                </div>
              </div>
              <p className="text-sm sm:text-base text-[#6b7280] text-center mb-8 sm:mb-12 md:mb-16 max-w-2xl mx-auto px-2 relative">
                実際のデモ画面で、完成イメージを体験してください。
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
              {/* ホームページ */}
              <AnimatedSection animation="fade-up" delay={0} className="flex w-full">
                <TiltCard maxTilt={5} className="h-full w-full">
                  <Link
                    href="/services"
                    className="bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-full w-full block group flex flex-col"
                  >
                    <div className="aspect-video bg-[#fafafa] overflow-hidden relative flex items-center justify-center flex-shrink-0">
                      <Image 
                        src="/cases/homepage.png" 
                        alt="ホームページ"
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-contain hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4 md:p-6 flex-1 flex flex-col">
                      <h3 className="text-base sm:text-lg font-bold text-[#1a1a1a] mb-2 group-hover:text-[#fdc700] transition-colors">ホームページ</h3>
                      <p className="text-xs sm:text-sm text-[#6b7280] flex-1">WordPressではできない体験型Web</p>
                      <div className="mt-3 text-xs text-[#fff100] font-medium group-hover:translate-x-1 transition-transform">
                        詳しく見る
                      </div>
                    </div>
                  </Link>
                </TiltCard>
              </AnimatedSection>

              {/* Webアプリ */}
              <AnimatedSection animation="fade-up" delay={50} className="flex w-full">
                <TiltCard maxTilt={5} className="h-full w-full">
                  <button
                    onClick={() => setShowDemoModal(true)}
                    className="bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-full w-full block group text-left flex flex-col"
                  >
                    <div className="aspect-video bg-[#fafafa] overflow-hidden relative flex items-center justify-center flex-shrink-0">
                      <Image 
                        src="/cases/nail.png" 
                        alt="Webアプリ"
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-contain hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4 md:p-6 flex-1 flex flex-col">
                      <h3 className="text-base sm:text-lg font-bold text-[#1a1a1a] mb-2 group-hover:text-[#fdc700] transition-colors">Webアプリ</h3>
                      <p className="text-xs sm:text-sm text-[#6b7280] flex-1">業務効率化・DXアプリ</p>
                      <div className="mt-3 text-xs text-[#fff100] font-medium group-hover:translate-x-1 transition-transform">
                        デモを表示
                      </div>
                    </div>
                  </button>
                </TiltCard>
              </AnimatedSection>

              {/* iOSアプリ */}
              <AnimatedSection animation="fade-up" delay={100} className="flex w-full">
                <TiltCard maxTilt={5} className="h-full w-full">
                  <Link
                    href="/lp/full-order-app-development"
                    className="bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-full w-full block group flex flex-col"
                  >
                    <div className="aspect-video bg-[#fafafa] overflow-hidden relative flex items-center justify-center flex-shrink-0">
                      <Image 
                        src="/cases/IPhoneFrame-car.png" 
                        alt="iOSアプリ"
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-contain hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4 md:p-6 flex-1 flex flex-col">
                      <h3 className="text-base sm:text-lg font-bold text-[#1a1a1a] mb-2 group-hover:text-[#fdc700] transition-colors">iOSアプリ</h3>
                      <p className="text-xs sm:text-sm text-[#6b7280] flex-1">ネイティブアプリ開発</p>
                      <div className="mt-3 text-xs text-[#fff100] font-medium group-hover:translate-x-1 transition-transform">
                        詳しく見る
                      </div>
                    </div>
                  </Link>
                </TiltCard>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Demo Modal */}
        {showDemoModal && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setShowDemoModal(false)}
          >
            <div 
              className="relative bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-4 right-4 z-10">
                <button
                  onClick={() => setShowDemoModal(false)}
                  className="bg-white/90 hover:bg-white rounded-full px-4 py-2 text-sm font-medium text-[#1a1a1a] shadow-lg transition-all hover:scale-105"
                >
                  閉じる
                </button>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4 text-center">サロン予約アプリデモ</h3>
                <SalonReservationAppMockup />
              </div>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <section className="bg-[#0b1220] py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#fff100] rounded-full blur-[100px]" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#fdc700] rounded-full blur-[120px]" />
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 text-center">
            <AnimatedSection animation="fade-up">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6 px-2">
                まずは無料相談から
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-white/70 mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
                「こんなこと実現できる？」という段階からOK。<br className="hidden sm:block" />
                課題を整理するところから、一緒にスタートしましょう。
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href={pageSettings?.cta_primary_href || '/contact'}
                  className="inline-flex items-center justify-center bg-[#fff100] hover:bg-[#fdc700] text-[#1a1a1a] font-medium px-8 py-4 rounded-full transition-all hover:scale-105"
                >
                  {pageSettings?.cta_primary_text || '無料相談する'}
                </Link>
                <Link 
                  href={pageSettings?.cta_secondary_href || '/services'}
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-4 rounded-full border border-white/30 transition-all hover:scale-105"
                >
                  {pageSettings?.cta_secondary_text || 'サービス一覧を見る'}
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
