"use client";

import Link from "next/link";
import Footer from "../components/Footer";
import { AnimatedSection } from "../components/AnimationProvider";
import { GlassCard, BubbleBadge } from "@/components/ui";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0b1220] font-sans">
      <main className="pt-14 md:pt-16">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-[#0b1220] via-[#1e293b] to-[#0b1220] py-20 md:py-32 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          {/* Gradient Orbs */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#fff100]/10 rounded-full blur-[100px] animate-pulse" />
          <div
            className="absolute bottom-10 right-20 w-96 h-96 bg-[#fdc700]/10 rounded-full blur-[120px] animate-pulse"
            style={{ animationDelay: "1s" }}
          />

          <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 text-center">
            <AnimatedSection animation="fade-up" className="relative">
              <div className="relative inline-block">
                <span className="section-bg-text left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 text-[32px] sm:text-[48px] md:text-[64px] lg:text-[96px] xl:text-[120px] text-white/25 absolute" style={{ opacity: 0.25 }}>ABOUT</span>
                <div className="relative">
                  <p className="text-[#fff100] text-sm md:text-base font-medium mb-4 tracking-wider relative">
                    ABOUT US
                  </p>
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight relative">
                    会社情報
                  </h1>
                </div>
              </div>
              <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed relative">
                AIと最新の開発手法を活用し、最短で&quot;使われるプロダクト&quot;を形にするチームです
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* 会社概要 */}
        <section className="py-16 md:py-24 px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection animation="fade-up" className="mb-12 relative">
              <div className="relative flex justify-center">
                <div className="relative inline-block">
                  <span className="section-bg-text left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 text-[32px] sm:text-[48px] md:text-[64px] lg:text-[96px] xl:text-[120px] text-[#0b1220]/25 dark:text-white/25 absolute" style={{ opacity: 0.25 }}>OVERVIEW</span>
                  <h2 className="text-2xl md:text-4xl font-bold text-[#1a1a1a] dark:text-[#f9fafb] mb-8 text-center relative">
                    会社概要
                  </h2>
                </div>
              </div>
            </AnimatedSection>

            <GlassCard variant="light" padding="lg">
              <dl className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-start gap-4 pb-6 border-b border-[#e5e7eb]/50">
                  <dt className="text-sm md:text-base font-bold text-[#6b7280] dark:text-[#9ca3af] md:w-32 flex-shrink-0">
                    会社名
                  </dt>
                  <dd className="text-base md:text-lg text-[#1a1a1a] dark:text-[#f9fafb] font-medium">
                    株式会社MAXELUS
                  </dd>
                </div>
                <div className="flex flex-col md:flex-row md:items-start gap-4 pb-6 border-b border-[#e5e7eb]/50">
                  <dt className="text-sm md:text-base font-bold text-[#6b7280] dark:text-[#9ca3af] md:w-32 flex-shrink-0">
                    法人番号
                  </dt>
                  <dd className="text-base md:text-lg text-[#1a1a1a] dark:text-[#f9fafb]">
                    1130001080399
                  </dd>
                </div>
                <div className="flex flex-col md:flex-row md:items-start gap-4 pb-6 border-b border-[#e5e7eb]/50">
                  <dt className="text-sm md:text-base font-bold text-[#6b7280] dark:text-[#9ca3af] md:w-32 flex-shrink-0">
                    代表取締役社長
                  </dt>
                  <dd className="text-base md:text-lg text-[#1a1a1a] dark:text-[#f9fafb]">
                    今井 俊喜
                  </dd>
                </div>
                <div className="flex flex-col md:flex-row md:items-start gap-4 pb-6 border-b border-[#e5e7eb]/50">
                  <dt className="text-sm md:text-base font-bold text-[#6b7280] dark:text-[#9ca3af] md:w-32 flex-shrink-0">
                    取締役副社長
                  </dt>
                  <dd className="text-base md:text-lg text-[#1a1a1a] dark:text-[#f9fafb]">
                    榎本 青波
                  </dd>
                </div>
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <dt className="text-sm md:text-base font-bold text-[#6b7280] dark:text-[#9ca3af] md:w-32 flex-shrink-0">
                    所在地
                  </dt>
                  <dd className="text-base md:text-lg text-[#1a1a1a] dark:text-[#f9fafb]">
                    〒614-8121 京都府八幡市下奈良小宮1
                  </dd>
                </div>
              </dl>
            </GlassCard>
          </div>
        </section>

        {/* 事業内容 */}
        <section className="py-16 md:py-24 px-4 md:px-8 bg-[#fafafa] dark:bg-[#1e293b]">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection animation="fade-up" className="text-center mb-12 relative">
              <div className="relative inline-block">
                <span className="section-bg-text left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 text-[32px] sm:text-[48px] md:text-[64px] lg:text-[96px] xl:text-[120px] text-[#0b1220]/25 dark:text-white/25 absolute" style={{ opacity: 0.25 }}>BUSINESS</span>
                <h2 className="text-2xl md:text-4xl font-bold text-[#1a1a1a] dark:text-[#f9fafb] mb-4 relative">
                  事業内容
                </h2>
              </div>
              <div className="w-20 h-1 bg-[#fff100] rounded-full mx-auto relative" />
            </AnimatedSection>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {[
                {
                  title: "DX支援 / AI開発",
                  description: "AI技術を活用した業務効率化・自動化支援",
                },
                {
                  title: "Webサイト制作",
                  description: "コーポレートサイト / 採用 / LP",
                },
                {
                  title: "Webアプリ・業務アプリ開発",
                  description: "設計〜運用まで一気通貫で対応",
                },
                {
                  title: "システム連携・自動化",
                  description: "API連携 / ワークフロー自動化",
                },
                {
                  title: "データ活用支援",
                  description: "DB設計 / ダッシュボード / 分析",
                },
                {
                  title: "クリエイティブ制作",
                  description: "チラシ / 画像制作 / 文章・構成",
                },
                {
                  title: "運用・改善",
                  description: "アクセス解析 / 改善提案 / 継続開発",
                },
              ].map((item, i) => (
                <AnimatedSection
                  key={i}
                  animation="fade-up"
                  delay={i * 50}
                >
                  <GlassCard variant="light" padding="md" className="h-full group">
                    <h3 className="text-base md:text-lg font-bold text-[#1a1a1a] dark:text-[#f9fafb] mb-2 group-hover:text-[#fdc700] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs md:text-sm text-[#6b7280] dark:text-[#9ca3af]">{item.description}</p>
                  </GlassCard>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* 私たちについて */}
        <section className="py-16 md:py-24 px-4 md:px-8 bg-white dark:bg-[#0b1220]">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection animation="fade-up" className="text-center mb-12 relative">
              <div className="relative inline-block">
                <span className="section-bg-text left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 text-[32px] sm:text-[48px] md:text-[64px] lg:text-[96px] xl:text-[120px] text-[#0b1220]/25 dark:text-white/25 absolute" style={{ opacity: 0.25 }}>ABOUT</span>
                <h2 className="text-2xl md:text-4xl font-bold text-[#1a1a1a] dark:text-[#f9fafb] mb-6 relative">
                  私たちについて
                </h2>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={200}>
              <GlassCard variant="light" padding="lg">
                <p className="text-base md:text-lg text-[#1a1a1a] dark:text-[#f9fafb] leading-relaxed mb-6">
                  MAXELUSは、AIと最新の開発手法を活用し、最短で&quot;使われるプロダクト&quot;を形にするチームです。
                  要件定義や設計だけで終わらず、実際に現場・組織の中で動くところまで落とし込み、改善まで伴走します。
                </p>
                <p className="text-base md:text-lg text-[#1a1a1a] dark:text-[#f9fafb] leading-relaxed">
                  「何を作るべきか」から一緒に整理し、
                  <br />
                  発見 → 判断 → 実行 が止まらない状態をつくることが私たちの役割です。
                </p>
              </GlassCard>
            </AnimatedSection>
          </div>
        </section>

        {/* できること（提供価値） */}
        <section className="py-16 md:py-24 px-4 md:px-8 bg-[#fafafa] dark:bg-[#1e293b]">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection animation="fade-up" className="text-center mb-12 relative">
              <div className="relative inline-block">
                <span className="section-bg-text left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 text-[32px] sm:text-[48px] md:text-[64px] lg:text-[96px] xl:text-[120px] text-[#0b1220]/25 dark:text-white/25 absolute" style={{ opacity: 0.25 }}>VALUE</span>
                <h2 className="text-2xl md:text-4xl font-bold text-[#1a1a1a] dark:text-[#f9fafb] mb-4 relative">
                  できること（提供価値）
                </h2>
              </div>
              <div className="w-20 h-1 bg-[#fff100] rounded-full mx-auto relative" />
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {[
                {
                  number: "1",
                  title: "企画・設計",
                  subtitle: "0→1 / 改善設計",
                  items: [
                    "事業/業務ヒアリング、課題の言語化",
                    "MVP設計",
                    "画面構成・導線設計、UI/UX改善",
                  ],
                },
                {
                  number: "2",
                  title: "開発",
                  subtitle: "Webサイト〜業務アプリまで",
                  items: [
                    "Next.js / React などモダン技術",
                    "管理画面（ミニCMS）構築",
                    "予約・問い合わせ・会員機能・決済",
                  ],
                },
                {
                  number: "3",
                  title: "AI活用",
                  subtitle: "実装まで含めて",
                  items: [
                    "OCR / 画像解析 / 自然言語処理",
                    "AIチャット（社内ナレッジ/FAQ）",
                    "文章生成・分類・データ整形",
                  ],
                },
                {
                  number: "4",
                  title: "自動化・連携",
                  subtitle: "手作業をなくす",
                  items: [
                    "API連携、外部サービス統合",
                    "ワークフロー自動化",
                    "手入力/転記/属人化の削減",
                  ],
                },
                {
                  number: "5",
                  title: "運用・改善",
                  subtitle: "作って終わりにしない",
                  items: [
                    "アクセス解析、改善提案",
                    "継続的な機能追加",
                    "速度・セキュリティ・品質のチューニング",
                  ],
                },
              ].map((value, i) => (
                <AnimatedSection
                  key={i}
                  animation="fade-up"
                  delay={i * 50}
                >
                  <GlassCard variant="light" padding="md" className="h-full group">
                    <div className="mb-3">
                      <BubbleBadge variant="small">{value.number}</BubbleBadge>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-[#1a1a1a] dark:text-[#f9fafb] mb-1 group-hover:text-[#fdc700] transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-xs text-[#6b7280] dark:text-[#9ca3af] mb-4">{value.subtitle}</p>
                    <ul className="space-y-2">
                      {value.items.map((item, j) => (
                        <li
                          key={j}
                          className="text-xs md:text-sm text-[#6b7280] dark:text-[#9ca3af] flex items-start gap-2"
                        >
                          <span className="text-[#fdc700] mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Mission / Vision / Value */}
        <section className="py-16 md:py-24 px-4 md:px-8 bg-white dark:bg-[#0b1220] relative">
          <div className="max-w-6xl mx-auto relative">
            {/* MISSION Background Text - セクション全体の上部に配置、中央揃え */}
            <div className="absolute -top-24 md:-top-32 left-0 right-0 pointer-events-none z-0">
              <div className="relative flex justify-center">
                <span className="section-bg-text text-[32px] sm:text-[48px] md:text-[64px] lg:text-[96px] xl:text-[120px] text-[#0b1220]/25 dark:text-white/25 inline-block whitespace-nowrap" style={{ opacity: 0.25 }}>MISSION</span>
              </div>
            </div>
            
            {/* Mission */}
            <AnimatedSection animation="fade-up" className="mb-8 relative">
              <div className="relative inline-block">
                <GlassCard variant="dark" padding="lg" className="bg-gradient-to-br from-[#0b1220] to-[#1e293b] relative">
                  <div className="mb-4">
                    <BubbleBadge variant="small">Mission</BubbleBadge>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 relative">使命</h2>
                  <p className="text-lg md:text-xl text-white leading-relaxed mb-4">
                    業務を効率化し、本当に大切なことに時間を使える世界をつくる。
                  </p>
                  <p className="text-base md:text-lg text-white/80 leading-relaxed mb-4">
                    情報の分断やムダな作業を減らし、
                    「見つける・決める・動く」をスムーズにつなげることで、
                    人が本来向き合うべき 判断・創造・挑戦 に時間を取り戻します。
                  </p>
                  <p className="text-base md:text-lg text-white/80 leading-relaxed">
                    AIとデータを味方につけ、再現性のある品質とスピードを提供します。
                  </p>
                </GlassCard>
              </div>
            </AnimatedSection>

            {/* Vision */}
            <AnimatedSection animation="fade-up" delay={100} className="mb-8 relative">
              <div className="relative inline-block">
                <span className="section-bg-text left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 text-[32px] sm:text-[48px] md:text-[64px] lg:text-[96px] xl:text-[120px] text-[#0b1220]/25 dark:text-white/25 absolute" style={{ opacity: 0.25 }}>VISION</span>
                <GlassCard variant="light" padding="lg" className="border-2 border-[#fff100]/50 relative">
                  <div className="mb-4">
                    <BubbleBadge variant="small">Vision</BubbleBadge>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] dark:text-[#f9fafb] mb-4 relative">
                    未来像
                  </h2>
                  <p className="text-lg md:text-xl text-[#1a1a1a] dark:text-[#f9fafb] leading-relaxed mb-4">
                    データとAIで、意思決定と実行が加速する社会をつくる。
                  </p>
                  <p className="text-base md:text-lg text-[#6b7280] dark:text-[#9ca3af] leading-relaxed">
                    紙・勘・経験だけに依存せず、
                    必要な情報が必要なときに届き、次の一手が最短で打てる。
                    そんな「進化し続ける業務と組織」を増やしていきます。
                  </p>
                </GlassCard>
              </div>
            </AnimatedSection>

            {/* Value */}
            <AnimatedSection animation="fade-up" delay={200} className="relative">
              <div className="relative inline-block">
                <span className="section-bg-text left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 text-[32px] sm:text-[48px] md:text-[64px] lg:text-[96px] xl:text-[120px] text-[#0b1220]/25 dark:text-white/25 absolute" style={{ opacity: 0.25 }}>VALUE</span>
                <GlassCard variant="light" padding="lg" className="relative">
                  <div className="mb-6">
                    <BubbleBadge variant="small">Value</BubbleBadge>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] dark:text-[#f9fafb] mb-6 relative">
                    価値観・行動指針
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                  {[
                    {
                      title: "Evolve（進化）",
                      description: "変化を前提に、学び続け、改善し続ける。",
                    },
                    {
                      title: "Connect（つなぐ）",
                      description: "人・業務・データ・技術をつなぎ、流れをつくる。",
                    },
                    {
                      title: "Accelerate（加速）",
                      description:
                        "検証→改善のサイクルを早く回し、成果に直結させる。",
                    },
                    {
                      title: "Collaborate（共創）",
                      description:
                        "お客様と同じチームとして伴走し、最適解を一緒につくる。",
                    },
                    {
                      title: "Simplify（洗練）",
                      description:
                        "複雑さを減らし、本質に集中できる形へ磨き上げる。",
                    },
                    {
                      title: "Cutting-Edge（先端実装）",
                      description:
                        "最新技術を&quot;使える形&quot;に落とし込み、素早く価値に変える。",
                    },
                  ].map((value, i) => (
                    <GlassCard key={i} variant="light" padding="sm" className="h-full group">
                      <h3 className="text-base md:text-lg font-bold text-[#1a1a1a] dark:text-[#f9fafb] mb-2 group-hover:text-[#fdc700] transition-colors">
                        {value.title}
                      </h3>
                      <p className="text-xs md:text-sm text-[#6b7280] dark:text-[#9ca3af]">{value.description}</p>
                    </GlassCard>
                  ))}
                  </div>
                </GlassCard>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* 代表挨拶 */}
        <section className="py-16 md:py-24 px-4 md:px-8 bg-[#fafafa] dark:bg-[#1e293b]">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection animation="fade-up" className="text-center mb-12 relative">
              <div className="relative inline-block">
                <span className="section-bg-text left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 text-[32px] sm:text-[48px] md:text-[64px] lg:text-[96px] xl:text-[120px] text-[#0b1220]/25 dark:text-white/25 absolute" style={{ opacity: 0.25 }}>MESSAGE</span>
                <h2 className="text-2xl md:text-4xl font-bold text-[#1a1a1a] dark:text-[#f9fafb] mb-4 relative">
                  代表挨拶
                </h2>
              </div>
              <div className="w-20 h-1 bg-[#fff100] rounded-full mx-auto relative" />
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={200}>
              <GlassCard variant="light" padding="lg">
                <p className="text-base md:text-lg text-[#1a1a1a] dark:text-[#f9fafb] leading-relaxed mb-6">
                  私は大学卒業後、メーカーの営業として多様な現場を訪れ、課題解決に携わってきました。
                  その中で強く感じたのは、「本当の課題は、技術や努力ではなく&quot;仕組み&quot;の方にあることが多い」という事実です。
                </p>
                <p className="text-base md:text-lg text-[#1a1a1a] dark:text-[#f9fafb] leading-relaxed mb-6">
                  情報が散らばり、手作業や転記が増え、判断が遅れ、改善が続かない。
                  こうした状況は、業界や規模を問わず多くの組織で起こり得ます。
                </p>
                <p className="text-base md:text-lg text-[#1a1a1a] dark:text-[#f9fafb] leading-relaxed mb-6">
                  MAXELUSは、そうした&quot;止まりがちな流れ&quot;を、
                  AIとデータ、そしてモダンな開発手法でつなぎ直し、
                  最短で現場に届くプロダクトとして提供します。
                </p>
                <p className="text-base md:text-lg text-[#1a1a1a] dark:text-[#f9fafb] leading-relaxed">
                  「速さ」だけではなく、「使われ続けること」「成果につながること」にこだわり、
                  構想から実装、運用改善まで一貫して伴走していきます。
                </p>
                <div className="mt-8 pt-6 border-t border-[#e5e7eb] dark:border-[#374151]/50 text-right">
                  <p className="text-sm text-[#6b7280] dark:text-[#9ca3af] mb-1">代表取締役／CEO</p>
                  <p className="text-lg font-bold text-[#1a1a1a] dark:text-[#f9fafb]">今井 俊喜</p>
                </div>
              </GlassCard>
            </AnimatedSection>
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
                一緒に、使われるプロダクトを作りませんか？
              </h2>
              <p className="text-base md:text-lg text-white/70 mb-8 max-w-2xl mx-auto">
                まずは無料相談で、課題整理から一緒に進めましょう。
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
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
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-4 rounded-full border border-white/30 transition-all hover:scale-105"
                >
                  サービスを見る
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
