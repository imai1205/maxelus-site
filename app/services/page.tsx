"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "../components/Footer";
import { AnimatedSection } from "../components/AnimationProvider";
import { PageHero, SectionHeader, ContactCTA } from "../../components/ui";
import { serviceCategories } from "../data/serviceCategories";
import { products } from "../data/products";
import { caseStudies } from "../data/caseStudies";
import { approachSteps } from "../data/approach";

const webValueItems = [
  "GA4設定",
  "Googleタグマネージャー設定",
  "ボタンクリック計測",
  "フォーム送信数の計測",
  "電話ボタン・LINEボタンなどのクリック計測",
  "流入元の確認",
  "広告流入・自然検索流入の確認",
  "LPごとの問い合わせ数管理",
  "SEOを見据えたページ構成",
  "MEOを見据えた店舗情報整理",
  "改善用ダッシュボード・管理ページの構築",
];

const commonProblems = [
  "無駄な入力・確認・転記作業が多い",
  "Excelやスプレッドシートが複雑化している",
  "会計ソフト、LINE、決済、管理表などがバラバラに存在している",
  "社内で、どのツールを使えばいいか分かりにくい",
  "同じ情報を複数の場所に入力している",
  "必要な情報を探すのに時間がかかる",
  "担当者に聞かないと分からない業務がある",
  "既存ソフトを入れているのに、現場では使いにくい",
  "原価・粗利・進捗など、経営判断に必要な数字が見えにくい",
  "過去データを活用できていない",
];

const transformations = [
  {
    title: "無駄な工程が多い",
    current: "入力、確認、転記、集計、報告が別々の作業になっている。",
    change: "一度入力した情報を、必要な場所で再利用できるようにする。",
    result: "同じ情報を何度も扱う必要がなくなり、作業時間とミスを減らせる。",
  },
  {
    title: "使いにくいソフトになっている",
    current: "機能はあるが、画面が複雑だったり、現場の流れに合っていなかったりして、結局使われにくい。",
    change: "現場の業務フローに合わせて、必要な入力・確認だけを分かりやすく設計する。",
    result: "現場で使いやすくなり、データが自然に集まる状態になる。",
  },
  {
    title: "ツールが乱立している",
    current: "会計ソフト、LINE、スプレッドシート、決済サービス、管理表などがバラバラに存在している。",
    change: "必要なツールは活かしながら、データの流れを整理し、連携できる部分はつなげる。",
    result: "社内で「どこを見ればいいか」が分かりやすくなり、確認作業が減る。",
  },
  {
    title: "情報を探すのに時間がかかる",
    current: "資料、案件情報、顧客情報、過去履歴が複数の場所に分散している。",
    change: "情報を一元管理し、検索・絞り込み・AI検索などで探しやすくする。",
    result: "探す時間を減らし、営業・顧客対応・判断業務に時間を使える。",
  },
  {
    title: "原価・粗利・進捗が見えにくい",
    current: "売上、原価、外注費、進捗、写真、報告書が別々に管理されている。",
    change: "案件単位で原価・粗利・進捗・関連資料をまとめて管理する。",
    result: "利益が出ている案件、原価が高い案件、対応が遅れている案件を早く把握できる。",
  },
];

const trialMonth1 = [
  "業務フロー確認",
  "既存ツール確認",
  "データ構成確認",
  "必要機能の整理",
  "外部サービス連携調査",
  "技術構成案の作成",
  "MVP範囲の決定",
  "開発ロードマップ作成",
];

const trialMonth2 = [
  "基本画面作成",
  "データ登録画面",
  "一覧表示",
  "簡易検索",
  "簡易集計",
  "動作確認",
  "フィードバック反映",
  "次フェーズ提案",
];

// ⑤ 代表事例 — アコーディオン
function CaseAccordion() {
  const [openId, setOpenId] = useState<string | null>(caseStudies[0]?.id ?? null);

  return (
    <div className="border-t border-[#e5e7eb]">
      {caseStudies.map((c) => {
        const isOpen = openId === c.id;
        const detail: [string, string][] = [
          ["背景", c.background],
          ["課題", c.problem],
          ["解決策", c.solution],
          ["結果", c.result],
        ];
        return (
          <div key={c.id} className="border-b border-[#e5e7eb]">
            <button
              onClick={() => setOpenId(isOpen ? null : c.id)}
              className="w-full flex items-center gap-4 md:gap-6 py-5 md:py-6 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-xl md:text-2xl font-bold text-[#fdc700] tabular-nums shrink-0">{c.no}</span>
              <span className="flex-1 text-base md:text-lg font-bold text-[#1a1a1a]">{c.title}</span>
              <span className="shrink-0 text-sm text-[#6b7280]">{isOpen ? "閉じる" : "詳しく"}</span>
            </button>
            {isOpen && (
              <div className="pb-6 md:pb-8 md:pl-14 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 animate-fade-in">
                {detail.map(([label, text]) => (
                  <div key={label}>
                    <p className="mb-1 text-xs font-medium tracking-wider text-[#fdc700]">{label}</p>
                    <p className="text-sm text-[#6b7280] leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <main>
        <PageHero
          kicker="Services"
          title={
            <>
              業務を整え、
              <br className="md:hidden" />
              事業を前へ。
            </>
          }
          lead={
            <>
              Web制作・アプリ開発・業務効率化・AI活用・外部サービス連携まで、
              <br className="hidden md:block" />
              企業や現場の課題を実用的な形で解決します。
              <br className="hidden md:block" />
              技術を導入すること自体を目的にせず、業務の流れを整え、
              <br className="hidden md:block" />
              日々の仕事が少しずつ軽くなる仕組みをつくります。
            </>
          }
        />

        {/* ② サービス分類 */}
        <section className="bg-white py-20 md:py-32 px-4 md:px-8">
          <div className="max-w-[1000px] mx-auto">
            <SectionHeader
              kicker="Services"
              title="支援できること"
              body="社内向けの小さな業務改善から、外部向けサービス化、Webサイト・LP制作、自社プロダクトの導入相談まで、目的に応じて支援します。"
              bgText="SERVICES"
              align="left"
              className="mb-12 md:mb-16"
            />
            <div className="space-y-5 md:space-y-6">
              {serviceCategories.map((cat, i) => (
                <AnimatedSection key={cat.id} animation="fade-up" delay={i * 60}>
                  <div className="border border-[#e5e7eb] rounded-2xl p-6 md:p-10">
                    <div className="flex items-baseline gap-4 mb-5">
                      <span className="text-2xl md:text-3xl font-bold text-[#fdc700] tabular-nums">{cat.no}</span>
                      <h3 className="text-xl md:text-2xl font-bold text-[#1a1a1a]">{cat.title}</h3>
                    </div>
                    <p className="text-sm md:text-base text-[#6b7280] leading-relaxed whitespace-pre-line mb-6">{cat.body}</p>
                    {cat.capabilities && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {cat.capabilities.map((c) => (
                          <span key={c} className="px-3 py-1.5 bg-[#fafafa] border border-[#e5e7eb] rounded-full text-xs text-[#6b7280]">
                            {c}
                          </span>
                        ))}
                      </div>
                    )}
                    {cat.href && (
                      <Link href={cat.href} prefetch={true} className="inline-block text-sm font-medium text-[#1a1a1a] border-b border-[#fdc700] pb-0.5 hover:text-[#fdc700] transition-colors">
                        詳しく見る
                      </Link>
                    )}
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ③ ホームページ・LP制作の付加価値 */}
        <section className="bg-[#fafafa] py-20 md:py-32 px-4 md:px-8">
          <div className="max-w-[900px] mx-auto">
            <SectionHeader
              kicker="Web Value"
              title="作って終わりではなく、改善できるWebへ。"
              body="ホームページやLPは、公開するだけでは成果が見えにくいものです。見た目の制作だけでなく、公開後に「どこから流入したのか」「どのボタンが押されたのか」「どれだけ問い合わせにつながったのか」を確認できる状態を整えます。"
              bgText="WEB"
              align="left"
              className="mb-10 md:mb-14"
            />
            <AnimatedSection animation="fade-up">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                {webValueItems.map((item) => (
                  <p key={item} className="text-sm text-[#6b7280] border-l-2 border-[#fdc700] pl-3">{item}</p>
                ))}
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fade-up" delay={120}>
              <p className="mt-10 text-sm text-[#6b7280] leading-relaxed">
                例えば、LPを複数展開している場合でも、どのページから問い合わせが発生したのか、どのボタンが押されているのか、どの流入経路が成果につながっているのかを確認できるように設計できます。感覚だけで改善するのではなく、数字を見ながら次の改善につなげられる状態を目指します。
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* ④ 弊社プロダクトのご紹介 */}
        <section className="bg-white py-20 md:py-32 px-4 md:px-8">
          <div className="max-w-[1100px] mx-auto">
            <SectionHeader
              kicker="Products"
              title="弊社プロダクトのご紹介"
              body="業務の中で発生する「探す」「入力する」「確認する」「集計する」といった負担を減らすため、自社プロダクト・業務支援ツールの開発にも取り組んでいます。個別LPがあるものは詳細ページへ、まだ準備中のものは概要として相談導線につなげます。"
              bgText="PRODUCTS"
              align="left"
              className="mb-12 md:mb-16"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              {products.map((p, i) => (
                <AnimatedSection key={p.no} animation="fade-up" delay={(i % 2) * 80}>
                  <div className="h-full flex flex-col border border-[#e5e7eb] rounded-2xl p-6 md:p-8">
                    <div className="flex items-baseline gap-3 mb-3">
                      <span className="text-sm font-bold text-[#fdc700] tabular-nums">{p.no}</span>
                      <h3 className="text-base md:text-lg font-bold text-[#1a1a1a]">{p.title}</h3>
                    </div>
                    <p className="text-sm text-[#6b7280] leading-relaxed mb-5 flex-1">{p.overview}</p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {p.features.map((f) => (
                        <span key={f} className="px-2.5 py-1 bg-[#fafafa] border border-[#e5e7eb] rounded-full text-xs text-[#6b7280]">{f}</span>
                      ))}
                    </div>
                    <p className="text-xs text-[#9ca3af] mb-4">対象：{p.target}</p>
                    {p.href ? (
                      <Link href={p.href} prefetch={true} className="inline-block w-fit text-sm font-medium text-[#1a1a1a] border-b border-[#fdc700] pb-0.5 hover:text-[#fdc700] transition-colors">
                        詳しく見る
                      </Link>
                    ) : (
                      <span className="inline-block text-xs text-[#9ca3af]">{p.status}</span>
                    )}
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ⑤ 代表事例 */}
        <section className="bg-[#fafafa] py-20 md:py-32 px-4 md:px-8">
          <div className="max-w-[900px] mx-auto">
            <SectionHeader
              kicker="Cases"
              title="代表事例"
              body="公開できる情報は一部に限られますが、Web制作・アプリ開発・業務効率化・AI活用・OCR・外部サービス連携など、実際の業務課題に合わせた仕組みづくりに取り組んでいます。"
              bgText="CASES"
              align="left"
              className="mb-10 md:mb-14"
            />
            <CaseAccordion />
          </div>
        </section>

        {/* ⑥ よくある課題 */}
        <section className="bg-white py-20 md:py-32 px-4 md:px-8">
          <div className="max-w-[900px] mx-auto">
            <SectionHeader
              kicker="Problems"
              title="こんな状態になっていませんか？"
              body="業務が増えるほど、ツールや工程が増え、結果として「使いにくい業務環境」になってしまうことがあります。業務量や関係者が増えてくると、ツールが増えすぎて管理が複雑になります。"
              bgText="PROBLEMS"
              align="left"
              className="mb-10 md:mb-14"
            />
            <AnimatedSection animation="fade-up">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                {commonProblems.map((p) => (
                  <p key={p} className="text-sm text-[#6b7280] border-l-2 border-[#e5e7eb] pl-3">{p}</p>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ⑦ 改善後の姿 */}
        <section className="bg-[#fafafa] py-20 md:py-32 px-4 md:px-8">
          <div className="max-w-[1000px] mx-auto">
            <SectionHeader
              kicker="After"
              title="バラバラの業務をつなげると、仕事はもっと楽になる。"
              body="すべてを一つの巨大なシステムに置き換える必要はありません。既存ツールを活かしながら、必要な部分だけをつなげることで、現場が使いやすい形に整えていきます。"
              bgText="AFTER"
              align="left"
              className="mb-12 md:mb-16"
            />
            <div className="space-y-5 md:space-y-6">
              {transformations.map((t, i) => (
                <AnimatedSection key={t.title} animation="fade-up" delay={i * 50}>
                  <div className="border border-[#e5e7eb] rounded-2xl p-6 md:p-8 bg-white">
                    <h3 className="text-lg font-bold text-[#1a1a1a] mb-5">{t.title}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                      <div>
                        <p className="mb-2 text-xs font-medium tracking-wider text-[#9ca3af]">現状</p>
                        <p className="text-sm text-[#6b7280] leading-relaxed">{t.current}</p>
                      </div>
                      <div>
                        <p className="mb-2 text-xs font-medium tracking-wider text-[#fdc700]">変えること</p>
                        <p className="text-sm text-[#6b7280] leading-relaxed">{t.change}</p>
                      </div>
                      <div>
                        <p className="mb-2 text-xs font-medium tracking-wider text-[#1a1a1a]">結果</p>
                        <p className="text-sm text-[#1a1a1a] leading-relaxed">{t.result}</p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ⑧ 進め方 */}
        <section className="bg-white py-20 md:py-32 px-4 md:px-8">
          <div className="max-w-[900px] mx-auto">
            <SectionHeader
              kicker="Approach"
              title="いきなり開発せず、現状整理から始めます。"
              body="現在の業務がどのように回っていて、どこに時間・手間・ミス・属人化が発生しているのかを整理することが重要です。As Is（現状）と To Be（理想の姿）を整理しながら、必要な開発範囲と優先順位を決めていきます。"
              bgText="APPROACH"
              align="left"
              className="mb-12 md:mb-16"
            />
            <div>
              {approachSteps.map((step, i) => (
                <AnimatedSection key={step.no} animation="fade-right" delay={i * 80}>
                  <div className="group flex gap-5 md:gap-8 border-t border-[#e5e7eb] py-6 md:py-8 hover:bg-[#fafafa] transition-colors">
                    <span className="shrink-0 text-2xl md:text-3xl font-bold text-[#fdc700] tabular-nums tracking-wider">{step.no}</span>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-[#1a1a1a] mb-2">{step.title}</h3>
                      <p className="text-sm md:text-base text-[#6b7280] leading-relaxed">{step.body}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
              <div className="border-t border-[#e5e7eb]" />
            </div>
          </div>
        </section>

        {/* ⑨ 初期トライアル案 */}
        <section className="bg-[#fafafa] py-20 md:py-32 px-4 md:px-8">
          <div className="max-w-[900px] mx-auto">
            <SectionHeader
              kicker="Trial"
              title="小さく始めて、方向性を見極めることもできます。"
              body="初回から大きな開発に進むのではなく、まずは業務整理・技術調査・デモ作成などを小さく始めることも可能です。実現可能性や投資対効果を確認しながら、本格開発に進むかどうかを判断できます。"
              bgText="TRIAL"
              align="left"
              className="mb-12 md:mb-16"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              {[
                { month: "1ヶ月目", label: "整理・調査", items: trialMonth1 },
                { month: "2ヶ月目", label: "MVP作成", items: trialMonth2 },
              ].map((m, i) => (
                <AnimatedSection key={m.month} animation="fade-up" delay={i * 100}>
                  <div className="h-full border border-[#e5e7eb] rounded-2xl p-6 md:p-8 bg-white">
                    <p className="text-sm font-bold text-[#fdc700]">{m.month}</p>
                    <h3 className="text-lg font-bold text-[#1a1a1a] mt-1 mb-5">{m.label}</h3>
                    <ul className="space-y-2">
                      {m.items.map((item) => (
                        <li key={item} className="text-sm text-[#6b7280] border-l-2 border-[#e5e7eb] pl-3">{item}</li>
                      ))}
                    </ul>
                  </div>
                </AnimatedSection>
              ))}
            </div>
            <AnimatedSection animation="fade-up" delay={150}>
              <p className="mt-10 text-sm text-[#6b7280] leading-relaxed">
                初期トライアルの内容や金額は、対象業務や開発範囲によって変わります。まずは現在の課題や進めたい内容をお聞きしたうえで、最適な進め方をご提案します。
              </p>
            </AnimatedSection>
          </div>
        </section>

        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}
