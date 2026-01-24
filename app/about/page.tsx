"use client";

import Link from "next/link";
import Footer from "../components/Footer";
import { AnimatedSection } from "../components/AnimationProvider";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
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
            <AnimatedSection animation="fade-up">
              <p className="text-[#fff100] text-sm md:text-base font-medium mb-4 tracking-wider">
                ABOUT US
              </p>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                会社情報
              </h1>
              <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
                AIと最新の開発手法を活用し、最短で&quot;使われるプロダクト&quot;を形にするチームです
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* 会社概要 */}
        <section className="py-16 md:py-24 px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection animation="fade-up" className="mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-[#1a1a1a] mb-8 text-center">
                会社概要
              </h2>
            </AnimatedSection>

            <div className="bg-white rounded-2xl border border-[#e5e7eb] shadow-lg p-6 md:p-8">
              <dl className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-start gap-4 pb-6 border-b border-[#e5e7eb]">
                  <dt className="text-sm md:text-base font-bold text-[#6b7280] md:w-32 flex-shrink-0">
                    会社名
                  </dt>
                  <dd className="text-base md:text-lg text-[#1a1a1a] font-medium">
                    株式会社マクセラス
                  </dd>
                </div>
                <div className="flex flex-col md:flex-row md:items-start gap-4 pb-6 border-b border-[#e5e7eb]">
                  <dt className="text-sm md:text-base font-bold text-[#6b7280] md:w-32 flex-shrink-0">
                    法人番号
                  </dt>
                  <dd className="text-base md:text-lg text-[#1a1a1a]">
                    1130001080399
                  </dd>
                </div>
                <div className="flex flex-col md:flex-row md:items-start gap-4 pb-6 border-b border-[#e5e7eb]">
                  <dt className="text-sm md:text-base font-bold text-[#6b7280] md:w-32 flex-shrink-0">
                    代表取締役社長
                  </dt>
                  <dd className="text-base md:text-lg text-[#1a1a1a]">
                    今井 俊喜
                  </dd>
                </div>
                <div className="flex flex-col md:flex-row md:items-start gap-4 pb-6 border-b border-[#e5e7eb]">
                  <dt className="text-sm md:text-base font-bold text-[#6b7280] md:w-32 flex-shrink-0">
                    取締役副社長
                  </dt>
                  <dd className="text-base md:text-lg text-[#1a1a1a]">
                    榎本 青波
                  </dd>
                </div>
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <dt className="text-sm md:text-base font-bold text-[#6b7280] md:w-32 flex-shrink-0">
                    所在地
                  </dt>
                  <dd className="text-base md:text-lg text-[#1a1a1a]">
                    〒614-8121 京都府八幡市下奈良小宮1
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* 事業内容 */}
        <section className="py-16 md:py-24 px-4 md:px-8 bg-[#fafafa]">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection animation="fade-up" className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-[#1a1a1a] mb-4">
                事業内容
              </h2>
              <div className="w-20 h-1 bg-[#fff100] rounded-full mx-auto" />
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  delay={i * 100}
                >
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow h-full">
                    <h3 className="text-lg font-bold text-[#1a1a1a] mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#6b7280]">{item.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* 私たちについて */}
        <section className="py-16 md:py-24 px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection animation="fade-up" className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-[#1a1a1a] mb-6">
                私たちについて
              </h2>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={200}>
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
                <p className="text-base md:text-lg text-[#1a1a1a] leading-relaxed mb-6">
                  マクセラスは、AIと最新の開発手法を活用し、最短で&quot;使われるプロダクト&quot;を形にするチームです。
                  要件定義や設計だけで終わらず、実際に現場・組織の中で動くところまで落とし込み、改善まで伴走します。
                </p>
                <p className="text-base md:text-lg text-[#1a1a1a] leading-relaxed">
                  「何を作るべきか」から一緒に整理し、
                  <br />
                  発見 → 判断 → 実行 が止まらない状態をつくることが私たちの役割です。
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* できること（提供価値） */}
        <section className="py-16 md:py-24 px-4 md:px-8 bg-[#fafafa]">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection animation="fade-up" className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-[#1a1a1a] mb-4">
                できること（提供価値）
              </h2>
              <div className="w-20 h-1 bg-[#fff100] rounded-full mx-auto" />
            </AnimatedSection>

            <div className="space-y-8">
              {[
                {
                  number: "1",
                  title: "企画・設計（0→1 / 改善設計）",
                  items: [
                    "事業/業務ヒアリング、課題の言語化、優先順位づけ",
                    "MVP設計（最小で最大効果が出る形に絞る）",
                    "画面構成・導線設計、情報設計、UI/UX改善",
                  ],
                },
                {
                  number: "2",
                  title: "開発（Webサイト〜業務アプリまで）",
                  items: [
                    "Next.js / React などモダン技術での高速開発",
                    "管理画面（ミニCMS）構築、更新しやすい運用設計",
                    "予約・問い合わせ・会員機能・決済・権限管理などの実装",
                  ],
                },
                {
                  number: "3",
                  title: "AI活用（実装まで含めて）",
                  items: [
                    "OCR / 画像解析 / 自然言語処理などのAI機能組み込み",
                    "AIチャット（社内ナレッジ/FAQ/業務支援）",
                    "文章生成・分類・データ整形などの自動化",
                  ],
                },
                {
                  number: "4",
                  title: "自動化・連携（手作業をなくす）",
                  items: [
                    "API連携、外部サービス統合、データ連携基盤づくり",
                    "ワークフロー自動化（通知・集計・登録・更新の自動化）",
                    "手入力/転記/属人化の削減",
                  ],
                },
                {
                  number: "5",
                  title: "運用・改善（作って終わりにしない）",
                  items: [
                    "アクセス解析、改善提案、継続的な機能追加",
                    "ユーザーの声を反映する改善サイクルの構築",
                    "速度・セキュリティ・品質のチューニング",
                  ],
                },
              ].map((value, i) => (
                <AnimatedSection
                  key={i}
                  animation="fade-up"
                  delay={i * 100}
                >
                  <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-[#fff100] rounded-full flex items-center justify-center text-[#1a1a1a] font-bold text-lg">
                        {value.number}
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-[#1a1a1a] pt-2">
                        {value.title}
                      </h3>
                    </div>
                    <ul className="space-y-2 ml-16">
                      {value.items.map((item, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-3 text-[#6b7280]"
                        >
                          <svg
                            className="w-5 h-5 text-[#fdc700] mt-0.5 flex-shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Mission / Vision / Value */}
        <section className="py-16 md:py-24 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Mission */}
            <AnimatedSection animation="fade-up" className="mb-12">
              <div className="bg-gradient-to-br from-[#0b1220] to-[#1e293b] rounded-2xl p-8 md:p-12 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">🎯</span>
                  <h2 className="text-2xl md:text-3xl font-bold">Mission（使命）</h2>
                </div>
                <p className="text-lg md:text-xl leading-relaxed">
                  業務を効率化し、本当に大切なことに時間を使える世界をつくる。
                </p>
                <p className="text-base md:text-lg text-white/80 mt-4 leading-relaxed">
                  情報の分断やムダな作業を減らし、
                  「見つける・決める・動く」をスムーズにつなげることで、
                  人が本来向き合うべき 判断・創造・挑戦 に時間を取り戻します。
                </p>
                <p className="text-base md:text-lg text-white/80 mt-4 leading-relaxed">
                  AIとデータを味方につけ、再現性のある品質とスピードを提供します。
                </p>
              </div>
            </AnimatedSection>

            {/* Vision */}
            <AnimatedSection animation="fade-up" delay={200} className="mb-12">
              <div className="bg-gradient-to-br from-[#fffef0] to-white rounded-2xl p-8 md:p-12 border-2 border-[#fff100]">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">🔮</span>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a]">
                    Vision（未来像）
                  </h2>
                </div>
                <p className="text-lg md:text-xl text-[#1a1a1a] leading-relaxed">
                  データとAIで、意思決定と実行が加速する社会をつくる。
                </p>
                <p className="text-base md:text-lg text-[#6b7280] mt-4 leading-relaxed">
                  紙・勘・経験だけに依存せず、
                  必要な情報が必要なときに届き、次の一手が最短で打てる。
                  そんな「進化し続ける業務と組織」を増やしていきます。
                </p>
              </div>
            </AnimatedSection>

            {/* Value */}
            <AnimatedSection animation="fade-up" delay={400}>
              <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
                <div className="flex items-center gap-3 mb-8">
                  <span className="text-2xl">💎</span>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a]">
                    Value（価値観・行動指針）
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    <div
                      key={i}
                      className="bg-[#fafafa] rounded-xl p-6 hover:bg-[#fffef0] transition-colors"
                    >
                      <h3 className="text-lg font-bold text-[#1a1a1a] mb-2">
                        {value.title}
                      </h3>
                      <p className="text-sm text-[#6b7280]">{value.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* 代表挨拶 */}
        <section className="py-16 md:py-24 px-4 md:px-8 bg-[#fafafa]">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection animation="fade-up" className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-[#1a1a1a] mb-4">
                代表挨拶
              </h2>
              <div className="w-20 h-1 bg-[#fff100] rounded-full mx-auto" />
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={200}>
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
                <p className="text-base md:text-lg text-[#1a1a1a] leading-relaxed mb-6">
                  私は大学卒業後、メーカーの営業として多様な現場を訪れ、課題解決に携わってきました。
                  その中で強く感じたのは、「本当の課題は、技術や努力ではなく&quot;仕組み&quot;の方にあることが多い」という事実です。
                </p>
                <p className="text-base md:text-lg text-[#1a1a1a] leading-relaxed mb-6">
                  情報が散らばり、手作業や転記が増え、判断が遅れ、改善が続かない。
                  こうした状況は、業界や規模を問わず多くの組織で起こり得ます。
                </p>
                <p className="text-base md:text-lg text-[#1a1a1a] leading-relaxed mb-6">
                  マクセラスは、そうした&quot;止まりがちな流れ&quot;を、
                  AIとデータ、そしてモダンな開発手法でつなぎ直し、
                  最短で現場に届くプロダクトとして提供します。
                </p>
                <p className="text-base md:text-lg text-[#1a1a1a] leading-relaxed">
                  「速さ」だけではなく、「使われ続けること」「成果につながること」にこだわり、
                  構想から実装、運用改善まで一貫して伴走していきます。
                </p>
                <div className="mt-8 pt-6 border-t border-[#e5e7eb] text-right">
                  <p className="text-sm text-[#6b7280] mb-1">代表取締役／CEO</p>
                  <p className="text-lg font-bold text-[#1a1a1a]">今井 俊喜</p>
                </div>
              </div>
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
