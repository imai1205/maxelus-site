"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "@/app/components/Footer";
import { AnimatedSection } from "@/app/components/AnimationProvider";
import { SectionHeader, LpLogo } from "@/components/ui";
import { products } from "@/app/data/products";

// 指示書 補足7 のリンク方針 (これが最優先。products.ts の href は無視する)。
// 個別LPあり → 「詳しく見る」リンク + ステータス「LPあり」
// 個別LPなし → リンクなし「相談する」(#contact) + 指示書のステータス
const linkPolicy: Record<string, { href?: string; status: string }> = {
  図面コネクト: { href: "/lp/zumen-connect", status: "LPあり" },
  "LP-SaaS": { status: "構想中 / 相談可能" },
  Slack勤怠管理システム: { status: "相談可能" },
  AIチャットボット: { href: "/lp/ai-ocr-automation", status: "LPあり" },
  販売管理ソフト: { status: "相談可能" },
  "3Dシミュレーション": { href: "/lp/interactive-web-3d", status: "LPあり" },
  切削条件カリキュレーター: { status: "構想中 / 相談可能" },
  顧客専用プラットフォーム: { href: "/lp/full-order-app-development", status: "相談可能" },
};

export default function ProductsLP() {
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
          inquiryType: "弊社プロダクト",
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
            <a href="#products" className="text-sm text-[#6b7280] hover:text-[#1a1a1a]">プロダクト</a>
            <a href="#philosophy" className="text-sm text-[#6b7280] hover:text-[#1a1a1a]">考え方</a>
            <a href="#customize" className="text-sm text-[#6b7280] hover:text-[#1a1a1a]">導入・相談</a>
            <a href="#contact" className="bg-[#fff100] hover:bg-[#fdc700] text-[#1a1a1a] font-medium px-5 py-2 rounded-full text-sm transition-all">無料相談</a>
          </nav>
        </div>
      </header>

      <main>
        {/* ① Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#0b1220] via-[#1e293b] to-[#0b1220] pt-28 pb-20 md:pt-36 md:pb-28 px-4 md:px-8">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
          <div className="relative max-w-[900px] mx-auto text-center">
            <AnimatedSection animation="fade-up">
              <p className="mb-5 text-xs md:text-sm font-medium tracking-[0.25em] text-[#fdc700]">PRODUCTS</p>
              <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight break-keep">
                業務課題から生まれた、
                <br />
                マクセラスのプロダクト。
              </h1>
            </AnimatedSection>
            <AnimatedSection animation="fade-up" delay={150}>
              <p className="mt-6 mx-auto max-w-2xl text-sm md:text-base text-white/70 leading-relaxed break-keep">
                業務の中で発生する「探す」「入力する」「確認する」「集計する」といった負担を減らすため、
                <br className="hidden md:block" />
                マクセラスでは自社プロダクト・業務支援ツールの開発にも取り組んでいます。すぐに導入できるものから、業務内容に合わせてカスタマイズできるものまで、現場の課題に合わせてご提案します。
              </p>
            </AnimatedSection>
            <AnimatedSection animation="fade-up" delay={300}>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#products" className="inline-flex items-center justify-center bg-[#fff100] hover:bg-[#fdc700] text-[#1a1a1a] font-medium px-8 py-4 rounded-full text-sm md:text-base transition-all hover:scale-105 shadow-lg">プロダクトを見る</a>
                <a href="#contact" className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-4 rounded-full text-sm md:text-base border border-white/20 backdrop-blur-sm transition-all hover:scale-105">相談する</a>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ② プロダクト一覧 */}
        <section id="products" className="bg-white py-20 md:py-32 px-4 md:px-8">
          <div className="max-w-[1100px] mx-auto">
            <SectionHeader kicker="Lineup" title="プロダクト一覧" body="業務課題をもとに開発・展開している自社プロダクト・業務支援ツールです。すぐに導入できるものから構想段階のものまで、現場の課題に合わせてご相談いただけます。" bgText="LINEUP" align="left" className="mb-12 md:mb-16" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {products.map((product, i) => {
                const policy = linkPolicy[product.title] ?? { status: product.status ?? "相談可能" };
                return (
                  <AnimatedSection key={product.no} animation="fade-up" delay={(i % 2) * 100}>
                    <div className="h-full flex flex-col bg-[#fafafa] border border-[#e5e7eb] rounded-2xl p-6 md:p-8 border-l-4 border-l-[#fdc700]">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-2xl md:text-3xl font-bold text-[#0b1220]/20 tabular-nums tracking-wider">{product.no}</span>
                        <span className="shrink-0 px-3 py-1 bg-white border border-[#e5e7eb] rounded-full text-[11px] md:text-xs font-medium text-[#6b7280]">{policy.status}</span>
                      </div>
                      <h3 className="mt-4 text-lg md:text-xl font-bold text-[#1a1a1a]">{product.title}</h3>
                      <p className="mt-3 text-sm text-[#6b7280] leading-relaxed">{product.overview}</p>

                      {/* できることタグ (features) */}
                      <div className="mt-5 flex flex-wrap gap-2">
                        {product.features.map((f) => (
                          <span key={f} className="px-2.5 py-1 bg-white border border-[#e5e7eb] rounded-full text-[11px] md:text-xs text-[#6b7280]">{f}</span>
                        ))}
                      </div>

                      {/* 対象 */}
                      <div className="mt-5 border-t border-[#e5e7eb] pt-4">
                        <p className="text-[11px] font-medium tracking-wider text-[#9ca3af]">対象</p>
                        <p className="mt-1 text-sm text-[#6b7280]">{product.target}</p>
                      </div>

                      {/* リンク */}
                      <div className="mt-6 pt-2 flex-grow flex items-end">
                        {policy.href ? (
                          <Link href={policy.href} className="inline-flex items-center text-sm font-medium text-[#1a1a1a] border-b-2 border-[#fdc700] pb-0.5 hover:text-[#fdc700] transition-colors">
                            詳しく見る
                          </Link>
                        ) : (
                          <a href="#contact" className="inline-flex items-center text-sm font-medium text-[#1a1a1a] border-b-2 border-[#e5e7eb] pb-0.5 hover:border-[#fdc700] transition-colors">
                            相談する
                          </a>
                        )}
                      </div>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>

        {/* ③ プロダクトの考え方 */}
        <section id="philosophy" className="bg-[#fafafa] py-20 md:py-32 px-4 md:px-8">
          <div className="max-w-[760px] mx-auto">
            <SectionHeader kicker="Philosophy" title="現場の課題から、必要なプロダクトをつくる。" bgText="PHILOSOPHY" align="left" className="mb-8 md:mb-12" />
            <AnimatedSection animation="fade-up">
              <p className="text-sm md:text-base text-[#6b7280] leading-loose">
                マクセラスのプロダクトは、現場の業務課題をもとに企画・開発しています。
              </p>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                {[
                  "探す時間を減らしたい",
                  "入力や転記を減らしたい",
                  "情報を一元管理したい",
                  "過去データを活用したい",
                ].map((v) => (
                  <p key={v} className="text-sm text-[#6b7280] border-l-2 border-[#fdc700] pl-3">{v}</p>
                ))}
              </div>
              <p className="mt-6 text-sm md:text-base text-[#6b7280] leading-loose">
                こうした日々の業務課題から、実際に使われる仕組みを考えます。
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* ④ 導入・カスタマイズ相談 */}
        <section id="customize" className="bg-white py-20 md:py-32 px-4 md:px-8">
          <div className="max-w-[760px] mx-auto">
            <SectionHeader kicker="Customize" title="既存プロダクトの導入から、業務に合わせたカスタマイズまで。" bgText="CUSTOMIZE" align="left" className="mb-8 md:mb-12" />
            <AnimatedSection animation="fade-up">
              <p className="text-sm md:text-base text-[#6b7280] leading-loose">
                掲載しているプロダクトは、そのまま導入するだけでなく、業務内容に合わせたカスタマイズや、近い仕組みの個別開発にも対応できます。
              </p>
              <div className="mt-6 space-y-3">
                {[
                  "このプロダクトに近いことを、自社向けに作れないか",
                  "今使っているツールと連携できないか",
                  "まずは小さく試せないか",
                ].map((q) => (
                  <p key={q} className="text-sm md:text-base text-[#1a1a1a] border-l-2 border-[#fdc700] pl-3">{q}</p>
                ))}
              </div>
              <p className="mt-6 text-sm md:text-base text-[#6b7280] leading-loose">
                といった段階からご相談いただけます。
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* ⑤ CTA / フォーム */}
        <section id="contact" className="bg-[#fafafa] py-20 md:py-32 px-4 md:px-8">
          <div className="max-w-[720px] mx-auto">
            <SectionHeader kicker="Contact" title="自社の業務に合う仕組みを、一緒に考えませんか？" bgText="CONTACT" className="mb-10 md:mb-14" />
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
                    <textarea required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={5} placeholder="気になっているプロダクトや、解決したい業務課題を可能な範囲でお書きください。" className="w-full px-4 py-3 border border-[#e5e7eb] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fff100] focus:border-transparent transition-all resize-none bg-white text-[#1a1a1a]" />
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
