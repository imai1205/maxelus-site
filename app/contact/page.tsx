"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";

// Contact Form Component
function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
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
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('送信に失敗しました');
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('送信に失敗しました。もう一度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center animate-fade-in">
        <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-4">
          お問い合わせありがとうございます
        </h2>
        <div className="mx-auto mb-6 h-px w-12 bg-[#fff100]" />
        <p className="text-[#6b7280] mb-8">
          担当者より2営業日以内にご連絡いたします。<br />
          しばらくお待ちください。
        </p>
        <Link
          href="/"
          className="inline-flex items-center text-[#fdc700] hover:text-[#e5b400] font-medium transition-colors"
        >
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
            className="w-full px-4 py-3 border border-[#e5e7eb] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fff100] focus:border-transparent transition-all bg-white text-[#1a1a1a]"
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
            className="w-full px-4 py-3 border border-[#e5e7eb] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fff100] focus:border-transparent transition-all bg-white text-[#1a1a1a]"
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
            className="w-full px-4 py-3 border border-[#e5e7eb] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fff100] focus:border-transparent transition-all bg-white text-[#1a1a1a]"
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
            "無料相談を申し込む"
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
        <PageHero
          bgText="CONTACT"
          kicker="CONTACT"
          title="無料相談・お問い合わせ"
          description={
            <>
              あなたの課題をお聞かせください。
              <br className="hidden md:block" />
              最適なソリューションをご提案します。
            </>
          }
        />

        {/* Form Section */}
        <section className="py-12 md:py-20 px-4 md:px-8">
          <div className="max-w-[720px] mx-auto">
            <ContactForm />

            {/* Contact Info */}
            <div className="mt-10 pt-8 border-t border-[#e5e7eb] text-center space-y-2">
              <p className="text-sm font-medium text-[#1a1a1a]">その他のお問い合わせ方法</p>
              <p className="text-sm text-[#6b7280]">info@maxelustech.com</p>
              <p className="text-sm text-[#6b7280]">受付時間：平日 10:00 - 18:00</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
