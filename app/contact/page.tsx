"use client";

import { useState } from "react";
import Footer from "../components/Footer";
import { PageHero } from "../../components/ui";

const inquiryOptions = [
  "Webアプリ・iOSアプリ制作の相談",
  "ホームページ・LP制作の相談",
  "業務効率化支援の相談",
  "AI導入・AI活用の相談",
  "OCR・データ化の相談",
  "弊社プロダクトに関する相談",
  "その他",
];

const inputClass =
  "w-full px-4 py-3 border border-[#e5e7eb] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fff100] focus:border-transparent transition-all bg-white text-[#1a1a1a]";
const labelClass = "block text-sm font-medium text-[#1a1a1a] mb-2";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    inquiryType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsError(false);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
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

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center animate-fade-in">
        <h2 className="text-xl md:text-2xl font-bold text-[#1a1a1a] mb-4">
          メッセージをお送りいただきありがとうございます。
        </h2>
        <div className="mx-auto mb-6 h-px w-12 bg-[#fff100]" />
        <p className="text-[#6b7280]">担当者より2営業日以内にご返信します。</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-6 md:p-10">
      <div className="space-y-6">
        <div>
          <label className={labelClass}>
            お名前 <span className="text-[#dc2626]">*</span>
          </label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="山田 太郎" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>会社・組織名（任意）</label>
          <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="株式会社○○" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>
            メールアドレス <span className="text-[#dc2626]">*</span>
          </label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="you@example.com" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>
            ご相談内容 <span className="text-[#dc2626]">*</span>
          </label>
          <select name="inquiryType" value={formData.inquiryType} onChange={handleChange} required className={inputClass}>
            <option value="">選択してください</option>
            {inquiryOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>
            メッセージ <span className="text-[#dc2626]">*</span>
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            placeholder="ご相談内容を可能な範囲でお書きください。"
            className={`${inputClass} resize-none`}
          />
        </div>
      </div>

      {isError && (
        <p className="mt-4 text-sm text-[#dc2626]">送信に失敗しました。時間をおいて再度お試しください。</p>
      )}

      <div className="mt-8">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#fff100] hover:bg-[#fdc700] disabled:bg-[#e5e7eb] disabled:cursor-not-allowed text-[#1a1a1a] font-medium py-4 rounded-xl text-base md:text-lg transition-all hover:scale-[1.02] disabled:hover:scale-100"
        >
          {isSubmitting ? "送信中…" : "送信する"}
        </button>
      </div>

      <p className="text-xs text-[#6b7280] text-center mt-4">
        ご入力いただいた情報は、お問い合わせへの回答にのみ使用いたします。
      </p>
    </form>
  );
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] font-sans overflow-x-clip">
      <main>
        <PageHero
          kicker="Contact"
          title="お問い合わせ"
          lead={
            <>
              Web制作・LP制作、Webアプリ開発、<br className="md:hidden" />
              業務効率化、自社プロダクトに関するご相談は、<br />
              以下のフォームよりご連絡ください。<br className="md:hidden" />
              内容がまだ具体的に決まっていない段階でも、<br className="hidden md:block" />
              お気軽にお問い合わせください。
            </>
          }
        />

        <section className="py-16 md:py-24 px-4 md:px-8">
          <div className="max-w-[720px] mx-auto">
            <ContactForm />

            <div className="mt-12 pt-8 border-t border-[#e5e7eb] text-center space-y-2">
              <p className="text-sm font-medium text-[#1a1a1a]">連絡先</p>
              <p className="text-sm text-[#1a1a1a]">info@maxelustech.com</p>
              <p className="text-sm text-[#6b7280]">営業時間：平日 10:00 — 18:00</p>
              <p className="text-sm text-[#6b7280]">〒614-8121 京都府八幡市下奈良小宮1</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
