"use client";

import { useState } from "react";
import Footer from "@/app/components/Footer";
import { AnimatedSection } from "@/app/components/AnimationProvider";
import { SectionHeader, LpLogo } from "@/components/ui";

const problems = [
  "ホームページはあるが、問い合わせにつながっているか分からない",
  "LPを作ったが、どのボタンが押されているか分からない",
  "広告やSNSからどれだけ流入しているか見えていない",
  "GA4を入れているが、見方や改善方法が分からない",
  "SEOやMEOをやりたいが、何から始めればいいか分からない",
  "制作会社に作ってもらったが、公開後の改善が止まっている",
];

const productions = [
  "コーポレートサイト",
  "サービスサイト",
  "採用サイト",
  "LP",
  "広告用LP",
  "WordPressサイト",
  "Next.js等を使った高速サイト",
  "体験型Webサイト",
  "3D表現を含むWebサイト",
  "既存サイトの改善",
];

const measureItems = [
  "GA4設定",
  "Googleタグマネージャー設定",
  "ボタンクリック計測",
  "フォーム送信数の計測",
  "電話ボタンのクリック計測",
  "LINEボタンのクリック計測",
  "LPごとの問い合わせ数管理",
  "流入元の確認",
  "広告流入の確認",
  "自然検索流入の確認",
  "コンバージョン計測",
];

const seoItems = [
  "ページ別アクセス数",
  "LP別問い合わせ数",
  "ボタンクリック数",
  "流入元",
  "検索流入",
  "電話クリック数",
  "LINEクリック数",
  "SEO改善メモ",
  "MEO改善メモ",
  "対応状況",
];

const flow = [
  { no: "01", title: "ヒアリング" },
  { no: "02", title: "目的・ターゲット整理" },
  { no: "03", title: "サイト構成作成" },
  { no: "04", title: "デザイン制作" },
  { no: "05", title: "実装" },
  { no: "06", title: "GA4・タグ設定" },
  { no: "07", title: "公開" },
  { no: "08", title: "計測・改善" },
];

const sourceBreakdown = [
  { label: "Instagram", value: "48" },
  { label: "X (Twitter)", value: "32" },
  { label: "TikTok", value: "21" },
];

const actionCards = [
  { label: "クリック数", value: "1,540" },
  { label: "お問い合わせクリック", value: "86" },
  { label: "LINEクリック数", value: "112" },
  { label: "電話発信数 (Google)", value: "37" },
  { label: "Googleマップ表示", value: "1,204" },
  { label: "今月の問い合わせ数", value: "128" },
];

export default function WebsiteLpProductionLP() {
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
          inquiryType: "ホームページ・LP制作",
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
    <div className="min-h-screen bg-white font-sans overflow-x-clip">
      {/* LP 独自ヘッダー */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-[#e5e7eb]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
          <LpLogo />
          <nav className="hidden md:flex items-center gap-6">
            <a href="#problems" className="text-sm text-[#6b7280] hover:text-[#1a1a1a]">課題</a>
            <a href="#measure" className="text-sm text-[#6b7280] hover:text-[#1a1a1a]">計測・改善</a>
            <a href="#flow" className="text-sm text-[#6b7280] hover:text-[#1a1a1a]">制作フロー</a>
            <a href="#contact" className="bg-[#fff100] hover:bg-[#fdc700] text-[#1a1a1a] font-medium px-5 py-2 rounded-full text-sm transition-all">無料相談</a>
          </nav>
        </div>
      </header>

      <main>
        {/* ① Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#0b1220] via-[#1e293b] to-[#0b1220] pt-28 pb-20 md:pt-36 md:pb-28 px-4 md:px-8">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
          <div className="relative max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="min-w-0">
              <AnimatedSection animation="fade-up">
                <p className="mb-5 text-xs md:text-sm font-medium tracking-[0.25em] text-[#fdc700]">WEBSITE / LP PRODUCTION</p>
                <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight break-keep">
                  作って終わりではなく、
                  <br />
                  成果を見ながら改善できる
                  <br />
                  Webサイトへ。
                </h1>
              </AnimatedSection>
              <AnimatedSection animation="fade-up" delay={150}>
                <p className="mt-6 max-w-xl text-sm md:text-base text-white/70 leading-relaxed break-keep">
                  ホームページ・LP制作に加えて、
                  <br className="md:hidden" />
                  GA4設定、タグ設置、ボタンクリック計測、問い合わせ数管理まで対応。
                  <br className="hidden md:block" />
                  公開後の改善やSEO・MEO対策につながるWebサイトを制作します。
                </p>
              </AnimatedSection>
              <AnimatedSection animation="fade-up" delay={300}>
                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                  <a href="#contact" className="inline-flex items-center justify-center bg-[#fff100] hover:bg-[#fdc700] text-[#1a1a1a] font-medium px-8 py-4 rounded-full text-sm md:text-base transition-all hover:scale-105 shadow-lg">無料相談する</a>
                  <a href="#production" className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-4 rounded-full text-sm md:text-base border border-white/20 backdrop-blur-sm transition-all hover:scale-105">制作内容を見る</a>
                </div>
              </AnimatedSection>
            </div>
            {/* 管理画面風モック */}
            <AnimatedSection animation="fade-left" delay={200}>
              <div className="bg-white rounded-2xl shadow-2xl p-5 md:p-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-bold text-[#1a1a1a]">改善ダッシュボード</p>
                  <span className="text-[10px] text-[#9ca3af]">※画面はイメージです</span>
                </div>
                {/* 流入元の内訳 */}
                <div className="mb-3 bg-[#fafafa] border border-[#e5e7eb] rounded-xl p-4">
                  <p className="text-[11px] text-[#6b7280] mb-2">流入元（今月）</p>
                  <div className="space-y-1.5">
                    {sourceBreakdown.map((s) => (
                      <div key={s.label} className="flex items-center justify-between text-xs">
                        <span className="text-[#6b7280]">{s.label}</span>
                        <span className="font-bold text-[#1a1a1a] tabular-nums">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* 各種アクション数 */}
                <div className="grid grid-cols-2 gap-2.5">
                  {actionCards.map((c) => (
                    <div key={c.label} className="bg-[#fafafa] border border-[#e5e7eb] rounded-xl p-3">
                      <p className="text-[10px] text-[#6b7280] leading-tight">{c.label}</p>
                      <p className="mt-1 text-base md:text-lg font-bold text-[#1a1a1a] tabular-nums">{c.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ② よくある課題 */}
        <section id="problems" className="bg-white py-20 md:py-32 px-4 md:px-8">
          <div className="max-w-[900px] mx-auto">
            <SectionHeader kicker="Problems" title="ホームページやLP、作っただけで止まっていませんか？" bgText="PROBLEMS" align="left" className="mb-10 md:mb-14" />
            <AnimatedSection animation="fade-up">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                {problems.map((p) => (
                  <p key={p} className="text-sm text-[#6b7280] border-l-2 border-[#e5e7eb] pl-3">{p}</p>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ③ 制作方針 */}
        <section className="bg-[#fafafa] py-20 md:py-32 px-4 md:px-8">
          <div className="max-w-[760px] mx-auto">
            <SectionHeader kicker="Policy" title="見た目だけでなく、公開後の改善まで考えて設計します。" bgText="POLICY" align="left" className="mb-8 md:mb-12" />
            <AnimatedSection animation="fade-up">
              <p className="text-sm md:text-base text-[#6b7280] leading-loose">
                マクセラスでは、デザインや見た目の美しさだけでなく、公開後に数字を見ながら改善できる状態を大切にしています。どのページから問い合わせが発生したのか、どのボタンが押されているのか、どの流入経路が成果につながっているのかを確認できるように設計します。感覚だけで改善するのではなく、データをもとに次の施策を考えられるWebサイト・LPを目指します。
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* ④ 対応できる制作物 */}
        <section id="production" className="bg-white py-20 md:py-32 px-4 md:px-8">
          <div className="max-w-[900px] mx-auto">
            <SectionHeader kicker="Production" title="対応できる制作物" bgText="PRODUCTION" align="left" className="mb-10 md:mb-14" />
            <AnimatedSection animation="fade-up">
              <div className="flex flex-wrap gap-2">
                {productions.map((p) => (
                  <span key={p} className="px-3 py-1.5 bg-[#fafafa] border border-[#e5e7eb] rounded-full text-xs md:text-sm text-[#6b7280]">{p}</span>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ⑤ 計測・改善機能 */}
        <section id="measure" className="bg-[#fafafa] py-20 md:py-32 px-4 md:px-8">
          <div className="max-w-[900px] mx-auto">
            <SectionHeader kicker="Analytics" title="流入・クリック・問い合わせまで見える化します。" body="WebサイトやLPは、公開しただけでは成果が見えません。GA4やタグ計測を活用し、どのページが見られ、どのボタンが押され、どこから問い合わせが発生しているのかを確認できるように設計します。" bgText="ANALYTICS" align="left" className="mb-10 md:mb-14" />
            <AnimatedSection animation="fade-up">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                {measureItems.map((m) => (
                  <p key={m} className="text-sm text-[#6b7280] border-l-2 border-[#fdc700] pl-3">{m}</p>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ⑥ SEO・MEO管理 */}
        <section className="bg-white py-20 md:py-32 px-4 md:px-8">
          <div className="max-w-[900px] mx-auto">
            <SectionHeader kicker="SEO / MEO" title="SEO・MEO対策を見据えた管理ページにも対応。" body="検索流入、問い合わせ数、主要ページの閲覧状況、ボタンクリック数などを確認できる管理ページの構築も可能です。店舗型ビジネスでは、Googleビジネスプロフィールや地域検索を意識した情報整理も行います。" bgText="SEO" align="left" className="mb-10 md:mb-14" />
            <AnimatedSection animation="fade-up">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {seoItems.map((s) => (
                  <div key={s} className="bg-[#fafafa] border border-[#e5e7eb] rounded-xl px-4 py-3 text-xs md:text-sm text-[#6b7280]">{s}</div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ⑦ 制作後の運用イメージ */}
        <section className="bg-[#fafafa] py-20 md:py-32 px-4 md:px-8">
          <div className="max-w-[760px] mx-auto">
            <SectionHeader kicker="Operation" title="公開してからが、改善のスタートです。" bgText="OPERATION" align="left" className="mb-8 md:mb-12" />
            <AnimatedSection animation="fade-up">
              <p className="text-sm md:text-base text-[#6b7280] leading-loose">
                公開後は、アクセス状況や問い合わせ数を確認しながら、ページ構成、ボタン配置、文章、導線を改善していきます。必要に応じて、広告用LPの追加、SEO記事の追加、MEO対策用ページの整備、問い合わせ導線の改善なども対応可能です。
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* ⑧ 制作フロー */}
        <section id="flow" className="bg-white py-20 md:py-32 px-4 md:px-8">
          <div className="max-w-[900px] mx-auto">
            <SectionHeader kicker="Flow" title="制作フロー" bgText="FLOW" align="left" className="mb-12 md:mb-16" />
            <div>
              {flow.map((step, i) => (
                <AnimatedSection key={step.no} animation="fade-right" delay={i * 60}>
                  <div className="flex items-center gap-5 md:gap-8 border-t border-[#e5e7eb] py-5 md:py-6">
                    <span className="shrink-0 text-xl md:text-2xl font-bold text-[#fdc700] tabular-nums tracking-wider">{step.no}</span>
                    <h3 className="text-base md:text-lg font-bold text-[#1a1a1a]">{step.title}</h3>
                  </div>
                </AnimatedSection>
              ))}
              <div className="border-t border-[#e5e7eb]" />
            </div>
          </div>
        </section>

        {/* ⑨ 料金・進め方 */}
        <section id="pricing" className="bg-[#fafafa] py-20 md:py-32 px-4 md:px-8">
          <div className="max-w-[760px] mx-auto">
            <SectionHeader kicker="Pricing" title="料金・進め方" bgText="PRICING" align="left" className="mb-8 md:mb-12" />
            <AnimatedSection animation="fade-up">
              <p className="text-sm md:text-base text-[#6b7280] leading-loose">
                制作内容、ページ数、計測設定、管理ページの有無によって費用は変動します。まずは目的や現状サイトの状態を確認したうえで、必要な制作範囲をご提案します。
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* ⑩ CTA / フォーム */}
        <section id="contact" className="bg-white py-20 md:py-32 px-4 md:px-8">
          <div className="max-w-[720px] mx-auto">
            <SectionHeader kicker="Contact" title="作って終わりではなく、改善できるWebサイトをつくりませんか？" bgText="CONTACT" className="mb-10 md:mb-14" />
            {isSubmitted ? (
              <div className="bg-[#fafafa] border border-[#e5e7eb] rounded-2xl p-8 md:p-12 text-center">
                <h3 className="text-xl md:text-2xl font-bold text-[#1a1a1a] mb-4">メッセージをお送りいただきありがとうございます。</h3>
                <div className="mx-auto mb-6 h-px w-12 bg-[#fff100]" />
                <p className="text-[#6b7280]">担当者より2営業日以内にご返信します。</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-[#fafafa] border border-[#e5e7eb] rounded-2xl p-6 md:p-10">
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
                    <textarea required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={5} placeholder="制作したいサイトの種類や、現状サイトの課題を可能な範囲でお書きください。" className="w-full px-4 py-3 border border-[#e5e7eb] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fff100] focus:border-transparent transition-all resize-none bg-white text-[#1a1a1a]" />
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
