"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "@/app/components/Footer";
import { AnimatedSection } from "@/app/components/AnimationProvider";
import { SectionHeader } from "@/components/ui";
import { approachSteps } from "@/app/data/approach";

const problems = [
  "無駄な入力・確認・転記作業が多い",
  "Excelやスプレッドシートが複雑化している",
  "会計ソフト、LINE、決済、管理表などがバラバラに存在している",
  "同じ情報を複数の場所に入力している",
  "必要な情報を探すのに時間がかかる",
  "既存ソフトを入れているのに、現場では使いにくい",
];

const supportItems = [
  "業務フロー整理",
  "要件定義支援",
  "As Is / To Be 整理",
  "業務フロー作成",
  "必要機能の洗い出し",
  "優先順位づけ",
  "外部サービス連携調査",
  "MVP / プロトタイプ作成",
  "CSV・API連携",
  "保守・運用・継続改善",
];

const trial = [
  { month: "1ヶ月目", label: "整理・調査", items: ["業務フロー確認", "既存ツール確認", "データ構成確認", "必要機能の整理", "外部サービス連携調査", "MVP範囲の決定"] },
  { month: "2ヶ月目", label: "MVP作成", items: ["基本画面作成", "データ登録・一覧表示", "簡易検索・集計", "動作確認", "フィードバック反映", "次フェーズ提案"] },
];

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
            <a href="#approach" className="text-sm text-[#6b7280] hover:text-[#1a1a1a]">進め方</a>
            <a href="#contact" className="bg-[#fff100] hover:bg-[#fdc700] text-[#1a1a1a] font-medium px-5 py-2 rounded-full text-sm transition-all">無料相談</a>
          </nav>
        </div>
      </header>

      <main>
        {/* ヒーロー */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#0b1220] via-[#1e293b] to-[#0b1220] pt-28 pb-20 md:pt-40 md:pb-28 px-4">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <span className="text-[64px] sm:text-[110px] md:text-[160px] font-bold text-white/[0.03] tracking-wider whitespace-nowrap select-none">BUSINESS DX</span>
          </div>
          <div className="relative max-w-4xl mx-auto text-center">
            <AnimatedSection animation="fade-up">
              <p className="mb-5 text-xs md:text-sm font-medium tracking-[0.25em] text-[#fdc700]">Business DX</p>
              <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                その業務、システム化する前に
                <br />
                整理できていますか？
              </h1>
            </AnimatedSection>
            <AnimatedSection animation="fade-up" delay={150}>
              <p className="mx-auto mt-6 max-w-2xl text-sm md:text-base text-white/70 leading-relaxed">
                いきなり開発するのではなく、現在の業務フロー、使用ツール、手作業、データの流れを整理し、どこを改善すべきかを一緒に考えます。As Is / To Be の整理から、MVP作成、本番化、運用改善まで伴走します。
              </p>
            </AnimatedSection>
            <AnimatedSection animation="fade-up" delay={300}>
              <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                <a href="#contact" className="inline-flex items-center justify-center bg-[#fff100] hover:bg-[#fdc700] text-[#1a1a1a] font-medium px-8 py-4 rounded-full text-sm md:text-base transition-all hover:scale-105 shadow-lg">無料相談する</a>
                <Link href="/services" className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-4 rounded-full text-sm md:text-base border border-white/20 backdrop-blur-sm transition-all hover:scale-105">サービス一覧を見る</Link>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* よくある課題 */}
        <section id="problems" className="bg-white py-20 md:py-32 px-4 md:px-8">
          <div className="max-w-[900px] mx-auto">
            <SectionHeader kicker="Problems" title="こんな状態になっていませんか？" body="業務量や関係者が増えるほど、ツールや工程が増え、結果として「使いにくい業務環境」になってしまうことがあります。" bgText="PROBLEMS" align="left" className="mb-10 md:mb-14" />
            <AnimatedSection animation="fade-up">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                {problems.map((p) => (
                  <p key={p} className="text-sm text-[#6b7280] border-l-2 border-[#e5e7eb] pl-3">{p}</p>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* 進め方 As Is / To Be */}
        <section id="approach" className="bg-[#fafafa] py-20 md:py-32 px-4 md:px-8">
          <div className="max-w-[900px] mx-auto">
            <SectionHeader kicker="Approach" title="いきなり開発せず、現状整理から始めます。" body="As Is（現状）と To Be（理想の姿）を整理しながら、必要な開発範囲と優先順位を決めていきます。" bgText="APPROACH" align="left" className="mb-12 md:mb-16" />
            <div>
              {approachSteps.map((step, i) => (
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

        {/* 対応内容 */}
        <section className="bg-white py-20 md:py-32 px-4 md:px-8">
          <div className="max-w-[900px] mx-auto">
            <SectionHeader kicker="Support" title="支援できること" bgText="SUPPORT" align="left" className="mb-10 md:mb-14" />
            <AnimatedSection animation="fade-up">
              <div className="flex flex-wrap gap-2">
                {supportItems.map((s) => (
                  <span key={s} className="px-3 py-1.5 bg-[#fafafa] border border-[#e5e7eb] rounded-full text-xs md:text-sm text-[#6b7280]">{s}</span>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* 初期トライアル */}
        <section className="bg-[#fafafa] py-20 md:py-32 px-4 md:px-8">
          <div className="max-w-[900px] mx-auto">
            <SectionHeader kicker="Trial" title="小さく始めて、方向性を見極めることもできます。" body="まずは業務整理・技術調査・デモ作成などを小さく始め、実現可能性や投資対効果を確認しながら本格開発に進むかを判断できます。" bgText="TRIAL" align="left" className="mb-12 md:mb-16" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              {trial.map((m, i) => (
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
                初期トライアルの内容や金額は、対象業務や開発範囲によって変わります。費用・期間・運用体制に加え、補助金の活用可否も含めて、最適な進め方をご提案します。
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* お問い合わせ */}
        <section id="contact" className="bg-white py-20 md:py-32 px-4 md:px-8">
          <div className="max-w-[720px] mx-auto">
            <SectionHeader kicker="Contact" title="まずは現状整理から、お気軽にご相談ください。" bgText="CONTACT" className="mb-10 md:mb-14" />
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
                    <textarea required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={5} placeholder="現在の業務や課題を可能な範囲でお書きください。" className="w-full px-4 py-3 border border-[#e5e7eb] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fff100] focus:border-transparent transition-all resize-none bg-white text-[#1a1a1a]" />
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
