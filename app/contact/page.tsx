"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "../components/Footer";
import { AnimatedSection } from "../components/AnimationProvider";

// Contact Form Component
function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    inquiryType: "",
    budget: "",
    timeline: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center animate-fade-in">
        <div className="w-20 h-20 bg-[#dcfce7] rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-[#16a34a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-4">
          お問い合わせありがとうございます
        </h2>
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
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-6 md:p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
            お名前 <span className="text-[#dc2626]">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="山田 太郎"
            className="w-full px-4 py-3 border border-[#e5e7eb] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fff100] focus:border-transparent transition-all"
          />
        </div>

        {/* Company */}
        <div>
          <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
            会社名
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="株式会社〇〇"
            className="w-full px-4 py-3 border border-[#e5e7eb] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fff100] focus:border-transparent transition-all"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
            メールアドレス <span className="text-[#dc2626]">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="example@company.com"
            className="w-full px-4 py-3 border border-[#e5e7eb] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fff100] focus:border-transparent transition-all"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
            電話番号
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="090-1234-5678"
            className="w-full px-4 py-3 border border-[#e5e7eb] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fff100] focus:border-transparent transition-all"
          />
        </div>

        {/* Inquiry Type */}
        <div>
          <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
            ご相談内容 <span className="text-[#dc2626]">*</span>
          </label>
          <select
            name="inquiryType"
            value={formData.inquiryType}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-[#e5e7eb] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fff100] focus:border-transparent transition-all bg-white"
          >
            <option value="">選択してください</option>
            <option value="hp">ホームページ制作</option>
            <option value="webapp">社内Webアプリ開発</option>
            <option value="dx">業務DX・自動化</option>
            <option value="cloud">クラウド連携</option>
            <option value="ios">iOSアプリ開発</option>
            <option value="other">その他</option>
          </select>
        </div>

        {/* Budget */}
        <div>
          <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
            ご予算
          </label>
          <select
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-[#e5e7eb] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fff100] focus:border-transparent transition-all bg-white"
          >
            <option value="">選択してください</option>
            <option value="~30">〜30万円</option>
            <option value="30-50">30〜50万円</option>
            <option value="50-100">50〜100万円</option>
            <option value="100-300">100〜300万円</option>
            <option value="300~">300万円以上</option>
            <option value="undecided">未定・要相談</option>
          </select>
        </div>

        {/* Timeline */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
            希望納期
          </label>
          <select
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-[#e5e7eb] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fff100] focus:border-transparent transition-all bg-white"
          >
            <option value="">選択してください</option>
            <option value="asap">できるだけ早く</option>
            <option value="1month">1ヶ月以内</option>
            <option value="3months">3ヶ月以内</option>
            <option value="6months">6ヶ月以内</option>
            <option value="flexible">柔軟に対応可能</option>
          </select>
        </div>

        {/* Message */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
            ご相談内容の詳細 <span className="text-[#dc2626]">*</span>
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            placeholder="現在の課題や、実現したいことをできるだけ詳しくお聞かせください。&#10;&#10;例：&#10;・現在Excelで管理している顧客情報をWebアプリ化したい&#10;・予約システムを導入して電話対応を減らしたい&#10;・既存システムの改善を検討している"
            className="w-full px-4 py-3 border border-[#e5e7eb] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fff100] focus:border-transparent transition-all resize-none"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-8">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#fff100] hover:bg-[#fdc700] disabled:bg-[#e5e7eb] disabled:cursor-not-allowed text-[#1a1a1a] font-medium py-4 rounded-xl text-lg transition-all hover:scale-[1.02] disabled:hover:scale-100 flex items-center justify-center gap-3"
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
            <>
              無料相談を申し込む
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </>
          )}
        </button>
      </div>

      {/* Privacy Note */}
      <p className="text-xs text-[#6b7280] text-center mt-4">
        ご入力いただいた情報は、お問い合わせへの回答にのみ使用いたします。
      </p>
    </form>
  );
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] font-sans">
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
              <span className="section-bg-text left-1/2 -translate-x-1/2 -top-6 md:-top-12 text-[40px] md:text-[80px] lg:text-[100px] text-white/10">CONTACT</span>
              <p className="text-[#fff100] text-sm md:text-base font-medium mb-4 tracking-wider relative">
                CONTACT
              </p>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight relative">
                無料相談・お問い合わせ
              </h1>
              <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed relative">
                あなたの課題をお聞かせください。<br className="hidden md:block" />
                最適なソリューションをご提案します。
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-12 md:py-20 px-4 md:px-8">
          <div className="max-w-[900px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Benefits */}
              <div className="lg:col-span-1 order-2 lg:order-1">
                <div className="sticky top-24 space-y-6">
                  <h2 className="text-xl font-bold text-[#1a1a1a] mb-6">無料相談のメリット</h2>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#fff100] rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-lg">💬</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-[#1a1a1a] mb-1">課題の整理</h3>
                      <p className="text-sm text-[#6b7280]">漠然とした課題でもOK。一緒に整理します。</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#fff100] rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-lg">🎯</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-[#1a1a1a] mb-1">デモ提示</h3>
                      <p className="text-sm text-[#6b7280]">打合せ後、実際に触れるデモをお見せします。</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#fff100] rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-lg">📋</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-[#1a1a1a] mb-1">明確な見積り</h3>
                      <p className="text-sm text-[#6b7280]">概算費用とスケジュールを提示します。</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#fff100] rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-lg">🤝</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-[#1a1a1a] mb-1">相談だけでもOK</h3>
                      <p className="text-sm text-[#6b7280]">契約の強要は一切ありません。</p>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="border-t border-[#e5e7eb] pt-6 mt-8">
                    <h3 className="font-medium text-[#1a1a1a] mb-4">その他のお問い合わせ方法</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm text-[#6b7280]">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        info@maxelus.co.jp
                      </div>
                      <div className="flex items-center gap-3 text-sm text-[#6b7280]">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        平日 10:00 - 18:00
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="lg:col-span-2 order-1 lg:order-2">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white py-12 md:py-20 px-4 md:px-8">
          <div className="max-w-[800px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] text-center mb-8 md:mb-12">
              よくあるご質問
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: "相談は本当に無料ですか？",
                  a: "はい、初回相談は完全無料です。課題のヒアリングから、概算のお見積り提示まで、費用は一切かかりません。"
                },
                {
                  q: "相談後、必ず契約しなければなりませんか？",
                  a: "いいえ、そのようなことはありません。相談の結果、「今は見送る」という判断をされても全く問題ありません。"
                },
                {
                  q: "どのような準備が必要ですか？",
                  a: "特別な準備は不要です。現在お困りのことや実現したいことを、ざっくばらんにお話しいただければ大丈夫です。"
                },
                {
                  q: "オンラインでの相談は可能ですか？",
                  a: "はい、Zoom等を使ったオンライン相談が可能です。全国どこからでもご相談いただけます。"
                }
              ].map((faq, i) => (
                <div key={i} className="bg-[#fafafa] rounded-xl p-5 md:p-6">
                  <h3 className="font-medium text-[#1a1a1a] mb-2 flex items-start gap-3">
                    <span className="w-6 h-6 bg-[#fff100] rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                      Q
                    </span>
                    {faq.q}
                  </h3>
                  <p className="text-sm text-[#6b7280] pl-9">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
