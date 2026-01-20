"use client";

import { useState } from "react";
import Link from "next/link";

const imgLogo = "https://www.figma.com/api/mcp/asset/bab5858e-9bd6-4cc7-9783-62ba4339b159";
const imgWorks1 = "https://www.figma.com/api/mcp/asset/a4f37e6a-2130-4808-9dc3-92b33fb7ce6f";
const imgWorks2 = "https://www.figma.com/api/mcp/asset/a97c9aa5-1dca-404b-97f1-f2c77a69af4b";
const imgWorks3 = "https://www.figma.com/api/mcp/asset/9039d5eb-93bd-427d-9fdf-937454afea3d";

// All works data
const allWorks = [
  {
    id: 1,
    image: imgWorks1,
    category: "製造業",
    title: "製造業向け図面・案件管理DXシステム",
    description: "Excelでの図面管理や案件情報の手作業転記により、情報の検索に時間がかかり、更新漏れやバージョン違いが頻発していました。",
    challenge: "図面と案件情報がExcelで分散管理されており、検索に平均15分、更新漏れによる手戻りが月10件以上発生していました。",
    solution: "クラウドベースの統合管理システムを構築。図面のバージョン管理、案件との紐付け、検索機能を実装しました。",
    result: "検索時間が15分→30秒に短縮。更新漏れによる手戻りが月10件→0件に。年間約500時間の工数削減を実現。",
    technologies: ["Next.js", "PostgreSQL", "AWS S3", "Vercel"],
    period: "3ヶ月"
  },
  {
    id: 2,
    image: imgWorks2,
    category: "医療・ヘルスケア",
    title: "医療機関向け予約・問診システム",
    description: "電話予約の対応に多くの時間を取られ、受付業務が圧迫。問診票の記入漏れも課題でした。",
    challenge: "1日平均50件の電話予約対応で受付スタッフが疲弊。問診票の記入漏れが20%発生し、診察効率が低下していました。",
    solution: "オンライン予約システムと電子問診票を開発。患者様が事前に入力できる仕組みを構築しました。",
    result: "電話予約が70%減少、受付業務時間が1日3時間短縮。問診漏れも5%以下に改善し、診察効率が向上しました。",
    technologies: ["React", "Node.js", "MongoDB", "LINE API"],
    period: "2ヶ月"
  },
  {
    id: 3,
    image: imgWorks3,
    category: "建設・不動産",
    title: "建設業向け顧客・進捗管理システム",
    description: "複数の現場案件を紙とExcelで管理しており、進捗状況の共有が遅れ、顧客への報告が手間でした。",
    challenge: "現場監督と営業の情報共有にタイムラグがあり、顧客への進捗報告が遅れることが多発していました。",
    solution: "リアルタイムで進捗を共有できるWebアプリを開発。写真アップロード機能と自動レポート生成機能を実装しました。",
    result: "情報共有のタイムラグが1日→即時に。顧客満足度が15%向上し、リピート受注率も増加しました。",
    technologies: ["Vue.js", "Firebase", "Cloud Functions", "Sendgrid"],
    period: "2.5ヶ月"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
    category: "小売・EC",
    title: "在庫管理・発注自動化システム",
    description: "複数店舗の在庫管理をExcelで行っており、発注タイミングの遅れや過剰在庫が課題でした。",
    challenge: "5店舗の在庫をExcelで個別管理。発注判断に時間がかかり、欠品と過剰在庫が同時に発生していました。",
    solution: "リアルタイム在庫管理システムと、AIによる需要予測・自動発注機能を開発しました。",
    result: "欠品率50%減、過剰在庫30%削減。発注業務時間が週8時間→1時間に短縮されました。",
    technologies: ["Next.js", "Python", "TensorFlow", "PostgreSQL"],
    period: "4ヶ月"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=80",
    category: "人材・採用",
    title: "採用管理・面接スケジューリングシステム",
    description: "採用活動の管理がスプレッドシートで煩雑になり、面接日程調整に多大な時間を要していました。",
    challenge: "年間200名以上の応募者管理と面接調整を手作業で実施。担当者の負荷が高く、対応漏れも発生していました。",
    solution: "応募者管理から面接スケジューリングまで一元化。カレンダー連携と自動リマインド機能を実装しました。",
    result: "面接調整時間が80%削減。対応漏れゼロを達成し、採用担当者の残業時間も大幅に減少しました。",
    technologies: ["React", "Node.js", "Google Calendar API", "Slack API"],
    period: "2ヶ月"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    category: "会計・経理",
    title: "経費精算・承認ワークフローシステム",
    description: "紙ベースの経費精算と承認フローにより、処理に時間がかかり、月末の経理業務が逼迫していました。",
    challenge: "月平均300件の経費精算を紙で処理。承認に平均5日かかり、経理の月末業務が深夜まで及ぶことも。",
    solution: "スマホから申請できる経費精算アプリと、多段階承認ワークフローを開発しました。",
    result: "承認期間が5日→1日に短縮。経理の月末残業が50%削減され、ペーパーレス化も実現しました。",
    technologies: ["React Native", "Node.js", "PostgreSQL", "freee API"],
    period: "3ヶ月"
  }
];

const categories = ["すべて", "製造業", "医療・ヘルスケア", "建設・不動産", "小売・EC", "人材・採用", "会計・経理"];

// Header Component
function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-[#e5e7eb] sticky top-0 z-50">
      <div className="flex items-center justify-between h-14 md:h-16 px-4 md:px-8 max-w-[1200px] mx-auto">
        <Link href="/" className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imgLogo} alt="マクセラス" className="h-8 md:h-10 w-auto" />
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm text-[#666] hover:text-[#0b1220] transition-colors">
            ホーム
          </Link>
          <Link href="/works" className="text-sm text-[#0b1220] font-medium">
            実績
          </Link>
          <Link href="/contact" className="text-sm text-[#666] hover:text-[#0b1220] transition-colors">
            お問い合わせ
          </Link>
          <Link href="/contact" className="bg-[#fff100] hover:bg-[#fdc700] text-[#1a1a1a] px-6 py-2 rounded-lg text-base font-medium transition-colors">
            無料相談する
          </Link>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-[#e5e7eb] animate-fade-in">
          <nav className="flex flex-col p-4 gap-4">
            <Link href="/" className="text-base text-[#666] py-2" onClick={() => setMobileMenuOpen(false)}>
              ホーム
            </Link>
            <Link href="/works" className="text-base text-[#0b1220] font-medium py-2" onClick={() => setMobileMenuOpen(false)}>
              実績
            </Link>
            <Link href="/contact" className="text-base text-[#666] py-2" onClick={() => setMobileMenuOpen(false)}>
              お問い合わせ
            </Link>
            <Link href="/contact" className="bg-[#fff100] hover:bg-[#fdc700] text-[#1a1a1a] px-6 py-3 rounded-lg text-base font-medium text-center transition-colors" onClick={() => setMobileMenuOpen(false)}>
              無料相談する
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

// Work Card Component
function WorkCard({ work, onClick }: { work: typeof allWorks[0]; onClick: () => void }) {
  return (
    <div 
      className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden cursor-pointer group hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      onClick={onClick}
    >
      <div className="aspect-video overflow-hidden relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={work.image} 
          alt={work.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
          <span className="text-white text-sm font-medium">詳細を見る →</span>
        </div>
      </div>
      <div className="p-4 md:p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs md:text-sm text-[#fff100] font-medium bg-[#1a1a1a] px-2 py-0.5 rounded">
            {work.category}
          </span>
          <span className="text-xs text-[#6b7280]">{work.period}</span>
        </div>
        <h3 className="text-base md:text-lg font-bold text-[#0b1220] mb-2 group-hover:text-[#fdc700] transition-colors line-clamp-2">
          {work.title}
        </h3>
        <p className="text-xs md:text-sm text-[#666] line-clamp-2">{work.description}</p>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {work.technologies.slice(0, 3).map((tech, i) => (
            <span key={i} className="text-[10px] md:text-xs bg-[#f3f4f6] text-[#6b7280] px-2 py-0.5 rounded">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// Work Detail Modal
function WorkDetailModal({ work, onClose }: { work: typeof allWorks[0]; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-fade-in"
        onClick={e => e.stopPropagation()}
      >
        {/* Header Image */}
        <div className="relative aspect-video">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={work.image} alt={work.title} className="w-full h-full object-cover" />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <span className="text-sm text-[#fff100] font-medium">{work.category}</span>
            <h2 className="text-xl md:text-2xl font-bold text-white mt-1">{work.title}</h2>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Overview */}
          <p className="text-[#6b7280] mb-6">{work.description}</p>
          
          {/* Details */}
          <div className="space-y-6">
            <div className="bg-[#fef2f2] border border-[#fecaca] rounded-xl p-4">
              <h3 className="font-bold text-[#991b1b] mb-2 flex items-center gap-2">
                <span className="text-lg">😰</span> 課題
              </h3>
              <p className="text-sm text-[#7f1d1d]">{work.challenge}</p>
            </div>
            
            <div className="bg-[#fffbeb] border border-[#fde68a] rounded-xl p-4">
              <h3 className="font-bold text-[#92400e] mb-2 flex items-center gap-2">
                <span className="text-lg">💡</span> 解決策
              </h3>
              <p className="text-sm text-[#78350f]">{work.solution}</p>
            </div>
            
            <div className="bg-[#ecfdf5] border border-[#a7f3d0] rounded-xl p-4">
              <h3 className="font-bold text-[#065f46] mb-2 flex items-center gap-2">
                <span className="text-lg">🎉</span> 成果
              </h3>
              <p className="text-sm text-[#064e3b]">{work.result}</p>
            </div>
          </div>
          
          {/* Technologies & Period */}
          <div className="mt-6 pt-6 border-t border-[#e5e7eb]">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div>
                <p className="text-xs text-[#6b7280] mb-2">使用技術</p>
                <div className="flex flex-wrap gap-2">
                  {work.technologies.map((tech, i) => (
                    <span key={i} className="text-sm bg-[#1a1a1a] text-white px-3 py-1 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-[#6b7280]">開発期間</p>
                <p className="text-lg font-bold text-[#1a1a1a]">{work.period}</p>
              </div>
            </div>
          </div>
          
          {/* CTA */}
          <div className="mt-8 text-center">
            <p className="text-sm text-[#6b7280] mb-4">同様の課題をお持ちですか？</p>
            <Link 
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#fff100] hover:bg-[#fdc700] text-[#1a1a1a] font-medium px-8 py-3 rounded-xl transition-all hover:scale-105"
            >
              無料相談する
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-[#f6f8fb] border-t border-[#e5e7eb] pt-8 md:pt-12 px-4 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-8">
          <div className="text-center sm:text-left">
            <h3 className="text-base md:text-lg font-bold text-[#0b1220] mb-3">株式会社マクセラス</h3>
            <p className="text-xs md:text-sm text-[#666] leading-6">
              ホームページ制作からWebアプリ開発、業務DX支援まで、お客様の課題を解決します。
            </p>
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-base md:text-lg font-bold text-[#0b1220] mb-3">サイトマップ</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-xs md:text-sm text-[#666] hover:text-[#fdc700] transition-colors">ホーム</Link></li>
              <li><Link href="/works" className="text-xs md:text-sm text-[#666] hover:text-[#fdc700] transition-colors">実績</Link></li>
              <li><Link href="/contact" className="text-xs md:text-sm text-[#666] hover:text-[#fdc700] transition-colors">お問い合わせ</Link></li>
            </ul>
          </div>
          <div className="text-center sm:text-left sm:col-span-2 md:col-span-1">
            <h3 className="text-base md:text-lg font-bold text-[#0b1220] mb-3">お問い合わせ</h3>
            <p className="text-xs md:text-sm text-[#666]">
              お気軽にご相談ください。<br />
              初回相談は無料です。
            </p>
          </div>
        </div>
        <div className="border-t border-[#e5e7eb] py-6 text-center">
          <p className="text-xs md:text-sm text-[#666]">
            © 2026 株式会社マクセラス All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function WorksPage() {
  const [selectedCategory, setSelectedCategory] = useState("すべて");
  const [selectedWork, setSelectedWork] = useState<typeof allWorks[0] | null>(null);

  const filteredWorks = selectedCategory === "すべて" 
    ? allWorks 
    : allWorks.filter(work => work.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-[#fafafa] to-white py-16 md:py-24 px-4 md:px-8 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #1a1a1a 1px, transparent 0)", backgroundSize: "40px 40px" }} />
          <div className="max-w-[1200px] mx-auto relative">
            <div className="text-center">
              <span className="text-[60px] md:text-[120px] font-bold text-[#f3f4f6] absolute left-1/2 -translate-x-1/2 -top-4 md:-top-8 pointer-events-none select-none">
                WORKS
              </span>
              <h1 className="relative text-3xl md:text-5xl font-bold text-[#1a1a1a] mb-4">
                実績紹介
              </h1>
              <p className="relative text-base md:text-lg text-[#6b7280] max-w-2xl mx-auto">
                製造業、医療、建設など、幅広い業界でお客様の課題を解決してきました。<br className="hidden md:block" />
                実際のプロジェクト事例をご紹介します。
              </p>
            </div>
          </div>
        </section>

        {/* Filter & Works Grid */}
        <section className="py-12 md:py-16 px-4 md:px-8">
          <div className="max-w-[1200px] mx-auto">
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-8 md:mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 md:px-6 py-2 rounded-full text-sm md:text-base transition-all ${
                    selectedCategory === category
                      ? "bg-[#1a1a1a] text-white"
                      : "bg-[#f3f4f6] text-[#6b7280] hover:bg-[#e5e7eb]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Works Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredWorks.map((work) => (
                <WorkCard 
                  key={work.id} 
                  work={work} 
                  onClick={() => setSelectedWork(work)}
                />
              ))}
            </div>

            {/* No Results */}
            {filteredWorks.length === 0 && (
              <div className="text-center py-12">
                <p className="text-[#6b7280]">該当する実績がありません</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#1a1a1a] py-16 md:py-24 px-4 md:px-8">
          <div className="max-w-[800px] mx-auto text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
              同じような課題を<br className="md:hidden" />お持ちですか？
            </h2>
            <p className="text-base md:text-lg text-white/70 mb-8">
              まずは無料相談で、あなたの課題をお聞かせください。<br className="hidden md:block" />
              最適なソリューションをご提案します。
            </p>
            <Link 
              href="/contact"
              className="inline-flex items-center gap-3 bg-[#fff100] hover:bg-[#fdc700] text-[#1a1a1a] font-medium px-8 md:px-10 py-4 md:py-5 rounded-xl text-base md:text-lg transition-all hover:scale-105"
            >
              無料相談する
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>
      </main>

      <Footer />

      {/* Work Detail Modal */}
      {selectedWork && (
        <WorkDetailModal work={selectedWork} onClose={() => setSelectedWork(null)} />
      )}
    </div>
  );
}
