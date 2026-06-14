"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "@/app/components/Footer";
import { AnimatedSection } from "@/app/components/AnimationProvider";
import { SectionHeader } from "@/components/ui";
import { caseStudies } from "@/app/data/caseStudies";

// ② よくある課題 (7項目)
const problems = [
  "Excelやスプレッドシートが複雑化している",
  "同じ情報を複数の場所に入力している",
  "担当者に聞かないと分からない業務がある",
  "LINE、Slack、会計ソフト、管理表がバラバラに存在している",
  "既存ソフトを入れているのに、現場では使いにくい",
  "原価・粗利・進捗など、判断に必要な数字が見えにくい",
  "過去データを活用できていない",
];

// ③ バラバラになりがちな業務データ
const scatteredData = [
  "LINEの問い合わせ",
  "Slackの連絡",
  "Googleスプレッドシートの管理表",
  "Excelの集計表",
  "会計ソフトの請求・支払い情報",
  "決済サービスの入金情報",
  "フォルダ内のPDF・画像",
  "既存システムのCSVデータ",
  "顧客情報",
  "案件情報",
  "原価・粗利",
  "進捗状況",
];

// ④ As Is / To Be
const asIs = [
  "ツールがバラバラ",
  "転記が多い",
  "情報を探すのに時間がかかる",
  "担当者に聞かないと分からない",
  "原価や進捗が見えにくい",
  "集計や報告に時間がかかる",
];

const toBe = [
  "必要なデータがつながっている",
  "一度入力した情報を再利用できる",
  "検索ですぐに見つかる",
  "誰でも同じ情報を確認できる",
  "原価・粗利・進捗が見える",
  "管理者が数字を見て判断できる",
];

// ⑤ つなげることでできること
const benefits = [
  "一度入力した情報を別の画面でも使える",
  "LINEやフォームから来た情報を管理表に反映できる",
  "スプレッドシートの情報を管理画面で見やすくできる",
  "会計・請求・入金状況と案件情報を紐づけられる",
  "案件ごとの原価・粗利・進捗を確認できる",
  "PDFや画像の情報をOCRで読み取って検索できる",
  "過去データをAIチャットボットで探せる",
  "管理者向けのダッシュボードで状況を確認できる",
];

// ⑥ 連携できるツール例
const integrationTools = [
  "LINE",
  "Slack",
  "Googleスプレッドシート",
  "Googleフォーム",
  "Notion",
  "Google Drive",
  "会計ソフト",
  "決済サービス",
  "CSVデータ",
  "Excel",
  "PDF・画像",
  "既存システム",
  "外部API",
];

// ⑦ AI・OCR活用
const aiOcrItems = [
  "PDF・画像のOCR",
  "書類情報の自動抽出",
  "図面情報の検索",
  "AIチャットボット",
  "社内ナレッジ検索",
  "過去データ検索",
  "類似検索",
];

// ⑧ 代表事例 (指示書の7件 = caseStudies の 01〜07)
const caseIds = [
  "data-search",
  "drawing-ocr",
  "ai-chatbot",
  "project-cost",
  "production-sales",
  "document-ocr",
  "integration",
];
const cases = caseIds
  .map((id) => caseStudies.find((c) => c.id === id))
  .filter((c): c is (typeof caseStudies)[number] => Boolean(c));

// ⑨ 進め方 (6ステップ)
const steps = [
  { no: "01", title: "初回ヒアリング", body: "現在の業務内容、使っているツール、困っている作業を確認します。" },
  { no: "02", title: "As Is整理", body: "現在の業務フロー、データの場所、手作業、転記作業を整理します。" },
  { no: "03", title: "To Be設計", body: "理想の業務フロー、必要なデータ、連携すべきツールを整理します。" },
  { no: "04", title: "優先順位づけ", body: "すべてを一度に作らず、効果が出やすい業務から決めます。" },
  { no: "05", title: "デモ / MVP作成", body: "必要な範囲だけを小さく作り、実際に触れる状態にします。" },
  { no: "06", title: "本番化・運用改善", body: "本番環境への移行、機能追加、保守運用を進めます。" },
];

// ① Hero 図のソース・出力タグ
const heroSources = ["LINE", "Slack", "Excel", "会計ソフト", "CSV", "既存システム"];
const heroOutputs = ["検索", "集計", "管理", "連携"];

export default function BusinessDXDesignLP() {
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsError(false);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          company: formData.company || "",
          email: formData.email,
          inquiryType: "業務DX設計",
          message: formData.message,
        }),
      });
      if (!response.ok) throw new Error("送信に失敗しました");
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* LP 独自ヘッダー */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-[#e5e7eb]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-[#1a1a1a]">MAXELUS</Link>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#problems" className="text-sm text-[#6b7280] hover:text-[#1a1a1a]">課題</a>
            <a href="#asistobe" className="text-sm text-[#6b7280] hover:text-[#1a1a1a]">As Is / To Be</a>
            <a href="#cases" className="text-sm text-[#6b7280] hover:text-[#1a1a1a]">事例</a>
            <a href="#steps" className="text-sm text-[#6b7280] hover:text-[#1a1a1a]">進め方</a>
            <a href="#contact" className="bg-[#fff100] hover:bg-[#fdc700] text-[#1a1a1a] font-medium px-5 py-2 rounded-full text-sm transition-all">無料相談</a>
          </nav>
        </div>
      </header>

      <main>
        {/* ① Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#0b1220] via-[#1e293b] to-[#0b1220] pt-28 pb-20 md:pt-36 md:pb-28 px-4 md:px-8">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
          <div className="relative max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <AnimatedSection animation="fade-up">
                <p className="mb-5 text-xs md:text-sm font-medium tracking-[0.25em] text-[#fdc700]">BUSINESS DX / WORKFLOW DESIGN</p>
                <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                  バラバラの業務データをつなぎ、
                  <br />
                  現場も管理者も見やすい状態へ。
                </h1>
              </AnimatedSection>
              <AnimatedSection animation="fade-up" delay={150}>
                <p className="mt-6 max-w-xl text-sm md:text-base text-white/70 leading-relaxed">
                  LINE、Slack、スプレッドシート、会計ソフト、CSV、既存システムなどに分散した情報を整理し、必要なデータをつなげます。入力・確認・転記・集計のムダを減らし、業務全体が自然に回る仕組みをつくります。
                </p>
              </AnimatedSection>
              <AnimatedSection animation="fade-up" delay={300}>
                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                  <a href="#contact" className="inline-flex items-center justify-center bg-[#fff100] hover:bg-[#fdc700] text-[#1a1a1a] font-medium px-8 py-4 rounded-full text-sm md:text-base transition-all hover:scale-105 shadow-lg">無料相談する</a>
                  <a href="#steps" className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-4 rounded-full text-sm md:text-base border border-white/20 backdrop-blur-sm transition-all hover:scale-105">進め方を見る</a>
                </div>
              </AnimatedSection>
            </div>
            {/* バラバラのツールが1つの業務データに集約される図 */}
            <AnimatedSection animation="fade-left" delay={200}>
              <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
                <p className="text-[11px] font-medium tracking-wider text-[#9ca3af] mb-3">分散した情報</p>
                <div className="flex flex-wrap gap-2">
                  {heroSources.map((s) => (
                    <span key={s} className="px-3 py-1.5 bg-[#fafafa] border border-[#e5e7eb] rounded-full text-xs md:text-sm text-[#6b7280]">{s}</span>
                  ))}
                </div>
                <div className="my-5 flex items-center gap-3">
                  <div className="h-px flex-1 bg-[#e5e7eb]" />
                  <span className="text-xs font-medium text-[#6b7280]">業務データとして整理 ↓</span>
                  <div className="h-px flex-1 bg-[#e5e7eb]" />
                </div>
                <div className="rounded-xl border-l-4 border-[#fdc700] bg-[#fafafa] px-4 py-4">
                  <p className="text-sm font-bold text-[#1a1a1a]">業務データとして整理</p>
                </div>
                <div className="my-5 flex items-center gap-3">
                  <div className="h-px flex-1 bg-[#e5e7eb]" />
                  <span className="text-xs font-medium text-[#6b7280]">↓</span>
                  <div className="h-px flex-1 bg-[#e5e7eb]" />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {heroOutputs.map((o) => (
                    <span key={o} className="text-center px-2 py-2 bg-[#0b1220] rounded-lg text-xs font-medium text-white">{o}</span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ② よくある課題 */}
        <section id="problems" className="bg-white py-20 md:py-32 px-4 md:px-8">
          <div className="max-w-[900px] mx-auto">
            <SectionHeader kicker="Problems" title="ツールが増えるほど、業務が複雑になっていませんか？" bgText="PROBLEMS" align="left" className="mb-10 md:mb-14" />
            <AnimatedSection animation="fade-up">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                {problems.map((p) => (
                  <p key={p} className="text-sm text-[#6b7280] border-l-2 border-[#e5e7eb] pl-3">{p}</p>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ③ バラバラになりがちな業務データ */}
        <section className="bg-[#fafafa] py-20 md:py-32 px-4 md:px-8">
          <div className="max-w-[900px] mx-auto">
            <SectionHeader kicker="Scattered Data" title="業務に必要な情報は、いろいろな場所に散らばっています。" bgText="DATA" align="left" className="mb-10 md:mb-14" />
            <AnimatedSection animation="fade-up">
              <div className="flex flex-wrap gap-2">
                {scatteredData.map((d) => (
                  <span key={d} className="px-3 py-1.5 bg-white border border-[#e5e7eb] rounded-full text-xs md:text-sm text-[#6b7280]">{d}</span>
                ))}
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fade-up" delay={120}>
              <div className="mt-10 flex items-center gap-3">
                <div className="h-px flex-1 bg-[#e5e7eb]" />
                <span className="shrink-0 rounded-full border-l-4 border-[#fdc700] bg-white px-5 py-2.5 text-sm font-bold text-[#1a1a1a] shadow-sm">必要なデータをつなげる ↓</span>
                <div className="h-px flex-1 bg-[#e5e7eb]" />
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ④ As Is / To Be */}
        <section id="asistobe" className="bg-white py-20 md:py-32 px-4 md:px-8">
          <div className="max-w-[1000px] mx-auto">
            <SectionHeader kicker="As Is / To Be" title="現状と理想の姿を整理し、必要な改善を見極めます。" bgText="AS IS / TO BE" align="left" className="mb-12 md:mb-16" />
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-4 items-stretch">
              {/* As Is */}
              <AnimatedSection animation="fade-right">
                <div className="h-full border border-[#e5e7eb] rounded-2xl p-6 md:p-8 bg-[#fafafa]">
                  <p className="text-sm font-bold text-[#6b7280] tracking-wider">As Is：現状</p>
                  <div className="mt-3 mb-5 h-px w-12 bg-[#e5e7eb]" />
                  <ul className="space-y-2.5">
                    {asIs.map((item) => (
                      <li key={item} className="text-sm text-[#6b7280] border-l-2 border-[#e5e7eb] pl-3">{item}</li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
              {/* 中央の矢印 */}
              <div className="flex md:flex-col items-center justify-center text-[#fdc700]">
                <span className="text-3xl md:text-4xl font-bold leading-none md:rotate-0 rotate-90">→</span>
              </div>
              {/* To Be */}
              <AnimatedSection animation="fade-left">
                <div className="h-full border border-[#0b1220] rounded-2xl p-6 md:p-8 bg-[#0b1220]">
                  <p className="text-sm font-bold text-[#fdc700] tracking-wider">To Be：理想</p>
                  <div className="mt-3 mb-5 h-px w-12 bg-[#fdc700]" />
                  <ul className="space-y-2.5">
                    {toBe.map((item) => (
                      <li key={item} className="text-sm text-white/80 border-l-2 border-[#fdc700] pl-3">{item}</li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* ⑤ つなげることでできること */}
        <section className="bg-[#fafafa] py-20 md:py-32 px-4 md:px-8">
          <div className="max-w-[900px] mx-auto">
            <SectionHeader kicker="Benefits" title="データをつなげることで、業務はもっと楽になります。" bgText="BENEFITS" align="left" className="mb-10 md:mb-14" />
            <AnimatedSection animation="fade-up">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                {benefits.map((b) => (
                  <p key={b} className="text-sm text-[#6b7280] border-l-2 border-[#fdc700] pl-3">{b}</p>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ⑥ 連携できるツール例 */}
        <section className="bg-white py-20 md:py-32 px-4 md:px-8">
          <div className="max-w-[900px] mx-auto">
            <SectionHeader kicker="Integration" title="既存ツールを活かしながら、必要な部分だけつなげます。" body="すべてを一つの大きなシステムに置き換える必要はありません。会計ソフト、決済サービス、LINE、Googleスプレッドシート、Slack、Notionなど、すでに使っているツールを活かしながら、必要な部分をつなげる設計が可能です。API連携が難しい場合でも、CSV出力・CSV取込、スプレッドシート連携、運用ルールの見直しなど、現実的な方法を検討します。" bgText="INTEGRATION" align="left" className="mb-10 md:mb-14" />
            <AnimatedSection animation="fade-up">
              <div className="flex flex-wrap gap-2">
                {integrationTools.map((t) => (
                  <span key={t} className="px-3 py-1.5 bg-[#fafafa] border border-[#e5e7eb] rounded-full text-xs md:text-sm text-[#6b7280]">{t}</span>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ⑦ AI・OCR活用 */}
        <section className="bg-[#fafafa] py-20 md:py-32 px-4 md:px-8">
          <div className="max-w-[900px] mx-auto">
            <SectionHeader kicker="AI / OCR" title="AI・OCRで、探す・読む・入力する作業を減らします。" body="社内資料、PDF、画像、図面、過去データなどを活用し、AI検索、OCR、チャットボット、データ抽出などの仕組みを構築できます。人が目で見て探す、手で入力する、担当者に聞くといった作業を減らし、必要な情報にすぐアクセスできる状態を目指します。" bgText="AI / OCR" align="left" className="mb-10 md:mb-14" />
            <AnimatedSection animation="fade-up">
              <div className="flex flex-wrap gap-2">
                {aiOcrItems.map((a) => (
                  <span key={a} className="px-3 py-1.5 bg-white border border-[#e5e7eb] rounded-full text-xs md:text-sm text-[#6b7280]">{a}</span>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ⑧ 代表事例 */}
        <section id="cases" className="bg-white py-20 md:py-32 px-4 md:px-8">
          <div className="max-w-[1000px] mx-auto">
            <SectionHeader kicker="Case Studies" title="業務効率化の代表事例" bgText="CASES" align="left" className="mb-12 md:mb-16" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              {cases.map((c, i) => (
                <AnimatedSection key={c.id} animation="fade-up" delay={(i % 2) * 100}>
                  <div className="h-full border border-[#e5e7eb] rounded-2xl p-6 md:p-8 bg-[#fafafa]">
                    <span className="text-xl md:text-2xl font-bold text-[#fdc700] tabular-nums tracking-wider">{c.no}</span>
                    <h3 className="mt-3 text-base md:text-lg font-bold text-[#1a1a1a] leading-snug">{c.title}</h3>
                    <p className="mt-3 text-sm text-[#6b7280] leading-relaxed">{c.summary}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ⑨ 進め方 */}
        <section id="steps" className="bg-[#fafafa] py-20 md:py-32 px-4 md:px-8">
          <div className="max-w-[900px] mx-auto">
            <SectionHeader kicker="Steps" title="進め方" bgText="STEPS" align="left" className="mb-12 md:mb-16" />
            <div>
              {steps.map((step, i) => (
                <AnimatedSection key={step.no} animation="fade-right" delay={i * 80}>
                  <div className="group flex gap-5 md:gap-8 border-t border-[#e5e7eb] py-6 md:py-8 hover:bg-white transition-colors">
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

        {/* ⑩ 初期トライアル */}
        <section className="bg-white py-20 md:py-32 px-4 md:px-8">
          <div className="max-w-[760px] mx-auto">
            <SectionHeader kicker="Trial" title="小さく始めて、方向性を見極めることもできます。" bgText="TRIAL" align="left" className="mb-8 md:mb-12" />
            <AnimatedSection animation="fade-up">
              <p className="text-sm md:text-base text-[#6b7280] leading-loose">
                初回から大きな開発に進むのではなく、まずは業務整理・技術調査・デモ作成などを小さく始めることも可能です。実現可能性や投資対効果を確認しながら、本格開発に進むかどうかを判断できます。
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* ⑪ CTA / お問い合わせフォーム */}
        <section id="contact" className="bg-[#fafafa] py-20 md:py-32 px-4 md:px-8">
          <div className="max-w-[720px] mx-auto">
            <SectionHeader kicker="Contact" title="バラバラの業務データを、つながる仕組みに変えませんか？" bgText="CONTACT" className="mb-10 md:mb-14" />
            {isSubmitted ? (
              <div className="bg-white border border-[#e5e7eb] rounded-2xl p-8 md:p-12 text-center">
                <h3 className="text-xl md:text-2xl font-bold text-[#1a1a1a] mb-4">メッセージをお送りいただきありがとうございます。</h3>
                <div className="mx-auto mb-6 h-px w-12 bg-[#fff100]" />
                <p className="text-[#6b7280]">担当者より2営業日以内にご返信します。</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white border border-[#e5e7eb] rounded-2xl p-6 md:p-10">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-[#1a1a1a] mb-2">お名前 <span className="text-[#dc2626]">*</span></label>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="山田 太郎" className="w-full px-4 py-3 border border-[#e5e7eb] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fff100] focus:border-transparent transition-all bg-white text-[#1a1a1a]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1a1a1a] mb-2">メールアドレス <span className="text-[#dc2626]">*</span></label>
                    <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="you@example.com" className="w-full px-4 py-3 border border-[#e5e7eb] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fff100] focus:border-transparent transition-all bg-white text-[#1a1a1a]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1a1a1a] mb-2">会社・組織名（任意）</label>
                    <input type="text" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} placeholder="株式会社○○" className="w-full px-4 py-3 border border-[#e5e7eb] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fff100] focus:border-transparent transition-all bg-white text-[#1a1a1a]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1a1a1a] mb-2">ご相談内容 <span className="text-[#dc2626]">*</span></label>
                    <textarea required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={5} placeholder="現在の業務や、つなげたいツール・データを可能な範囲でお書きください。" className="w-full px-4 py-3 border border-[#e5e7eb] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fff100] focus:border-transparent transition-all resize-none bg-white text-[#1a1a1a]" />
                  </div>
                </div>
                {isError && <p className="mt-4 text-sm text-[#dc2626]">送信に失敗しました。時間をおいて再度お試しください。</p>}
                <div className="mt-8">
                  <button type="submit" disabled={isSubmitting} className="w-full bg-[#fff100] hover:bg-[#fdc700] disabled:bg-[#e5e7eb] disabled:cursor-not-allowed text-[#1a1a1a] font-medium py-4 rounded-xl text-base md:text-lg transition-all hover:scale-[1.02] disabled:hover:scale-100">
                    {isSubmitting ? "送信中…" : "送信する"}
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
