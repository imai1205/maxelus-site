"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Footer from "../components/Footer";
import { AnimatedSection, TiltCard } from "../components/AnimationProvider";
import ServiceDetailPanel from "../components/ServiceDetailPanel";
import {
  servicesData,
  getServicesByCategory,
  categoryNames,
  type Service,
  type ServiceCategory,
} from "../data/servicesData";

// カテゴリごとの背景画像
const categoryBackgrounds: Record<ServiceCategory, string> = {
  'app-dx': '/cases/shop.png',
  'website': '/cases/homepage.png',
  'product': '/cases/zumen-connect-home.png',
};

// 全体背景画像セクション（選択されているカテゴリの背景を表示）
function BackgroundImageSection({ activeCategory }: { activeCategory: ServiceCategory | null }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const scrollProgress = Math.max(0, Math.min(1, (windowHeight - rect.top) / windowHeight));
        setScrollY(scrollProgress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初期値設定
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!activeCategory) return null;

  const backgroundImage = categoryBackgrounds[activeCategory];
  const opacity = Math.max(0.3, 1 - scrollY * 1.2); // スクロールで消えていく

  // カテゴリごとの背景サイズと位置の設定
  const backgroundStyles: Record<ServiceCategory, { backgroundSize: string; backgroundPosition: string }> = {
    'app-dx': {
      backgroundSize: 'contain', // iPhoneとMacBookが全部見えるサイズ
      backgroundPosition: 'center center',
    },
    'website': {
      backgroundSize: 'contain', // ホームページ全体が見えるサイズ
      backgroundPosition: 'center center',
    },
    'product': {
      backgroundSize: 'contain', // プロダクト全体が見えるサイズ
      backgroundPosition: 'center top', // 位置をもう少し上に
    },
  };

  const style = backgroundStyles[activeCategory];

  return (
    <div 
      ref={sectionRef}
      className="absolute inset-0 transition-opacity duration-700 ease-out rounded-3xl overflow-hidden pointer-events-none"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: style.backgroundSize,
        backgroundPosition: style.backgroundPosition,
        backgroundRepeat: 'no-repeat',
        opacity: Math.max(0.7, opacity * 0.95), // 背景画像をもっと見えるように
        transform: `translateY(${scrollY * 40}px)`, // パララックス効果（scaleを削除）
        zIndex: 0,
      }}
    >
      {/* グラデーションオーバーレイ - ほぼぼかさず */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.05))',
        }}
      />
      
      {/* ガラスモーフィズムオーバーレイ - ほぼぼかさず */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(2px)', // ほぼぼかさず
        }}
      />
    </div>
  );
}

// カテゴリナビゲーション（Sticky + タブ方式）
function CategoryNav({
  activeCategory,
  onCategoryClick,
}: {
  activeCategory: ServiceCategory | null;
  onCategoryClick: (category: ServiceCategory) => void;
}) {
  // カテゴリ順番：アプリ開発 → ホームページ → プロダクト
  const categories: ServiceCategory[] = ["app-dx", "website", "product"];

  return (
    <div className="sticky top-14 md:top-16 z-40 bg-white/95 dark:bg-[#0b1220]/95 backdrop-blur-lg border-b border-[#e5e7eb] dark:border-[#374151] shadow-sm">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex items-center gap-2 md:gap-4 overflow-x-auto py-4 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryClick(category)}
              className={`px-4 md:px-6 py-2 rounded-full text-sm md:text-base font-medium whitespace-nowrap transition-all ${
                activeCategory === category
                  ? "bg-[#fff100] text-[#1a1a1a] shadow-md"
                  : "bg-[#f3f4f6] dark:bg-[#1e293b] text-[#6b7280] dark:text-[#9ca3af] hover:bg-[#e5e7eb] dark:hover:bg-[#374151]"
              }`}
            >
              {categoryNames[category]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// サービスカードコンポーネント
function ServiceCard({
  service,
  index,
  isOpen,
  onToggle,
}: {
  service: Service;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const isSpecial = service.special;

  const cardClassName = `service-card rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 h-full group hover:shadow-2xl transition-all duration-500 relative overflow-hidden border-2 backdrop-blur-xl ${
    isSpecial
      ? "border-[#fff100]/60 bg-gradient-to-br from-[#fffef0]/85 to-white/85 dark:from-[#1e293b]/90 dark:to-[#0b1220]/90 dark:border-[#fff100]/40 shadow-[#fff100]/20"
      : "border-white/40 dark:border-[#374151]/60 bg-white/75 dark:bg-[#1e293b]/90"
  } ${service.ctaType === "lp" && service.lpHref ? "hover:border-[#fff100]/80 cursor-pointer" : ""}`;

  const cardContent = (
    <>
            {/* 特別枠バッジ */}
            {isSpecial && (
              <div className="absolute top-4 right-4 bg-[#fff100] text-[#1a1a1a] text-xs font-bold px-3 py-1 rounded-full">
                スペシャル
              </div>
            )}

            {/* Shimmer effect */}
            <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Metric（成果イメージ） */}
            {service.metric && (
              <div className="mb-3 p-2 bg-[#fafafa] dark:bg-[#0b1220]/50 rounded-lg border border-[#e5e7eb] dark:border-[#374151]">
                <div className="text-[10px] text-[#6b7280] dark:text-[#9ca3af] mb-0.5">
                  {service.metric.label}
                </div>
                <div className="text-lg md:text-xl font-bold text-[#1a1a1a] dark:text-[#f9fafb]">
                  {service.metric.value}
                  {service.metric.suffix && (
                    <span className="text-sm text-[#6b7280] dark:text-[#9ca3af]">
                      {service.metric.suffix}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Title */}
            <h3 className="text-lg md:text-xl font-bold text-[#1a1a1a] dark:text-[#f9fafb] mb-1 group-hover:text-[#fdc700] transition-colors">
              {service.title}
            </h3>

            {/* Catch */}
            <p className="text-sm md:text-base text-[#1a1a1a] dark:text-[#f9fafb] font-medium mb-2">
              {service.catch}
            </p>

            {/* Short Description */}
            <p className="text-xs md:text-sm text-[#6b7280] dark:text-[#9ca3af] mb-4 leading-relaxed" style={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}>
              {service.shortDesc}
            </p>

            {/* Tags */}
            <div className="flex gap-1.5 flex-wrap mb-4">
              {service.tags.slice(0, 3).map((tag, j) => (
                <span
                  key={j}
                  className="text-[10px] md:text-xs px-2 py-0.5 bg-[#f3f4f6] dark:bg-[#0b1220]/50 dark:border dark:border-[#374151] text-[#6b7280] dark:text-[#9ca3af] rounded-full group-hover:bg-[#fff100] group-hover:text-[#1a1a1a] dark:group-hover:bg-[#fff100] dark:group-hover:text-[#1a1a1a] transition-colors duration-300"
                  style={{ transitionDelay: `${j * 50}ms` }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-2">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-1.5 bg-[#fff100] hover:bg-[#fdc700] text-[#1a1a1a] font-medium text-xs md:text-sm px-4 py-2 rounded-full transition-all hover:scale-105 group/btn"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                無料相談
                <svg
                  className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform"
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
              {service.ctaType === "lp" && service.lpHref ? (
                <Link
                  href={service.id === 'full-order-app-development' ? `${service.lpHref}#demo` : service.lpHref}
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-white dark:bg-[#1e293b] hover:bg-[#fafafa] dark:hover:bg-[#374151] text-[#1a1a1a] dark:text-[#f9fafb] font-medium text-xs md:text-sm px-4 py-2 rounded-full border border-[#e5e7eb] dark:border-[#374151] transition-all hover:scale-105"
                  prefetch={true}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {service.id === 'full-order-app-development' ? 'デモ画面を見る' : 'LPを見る'}
                  <svg
                    className="w-3 h-3"
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
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggle();
                  }}
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-white dark:bg-[#1e293b] hover:bg-[#fafafa] dark:hover:bg-[#374151] text-[#1a1a1a] dark:text-[#f9fafb] font-medium text-xs md:text-sm px-4 py-2 rounded-full border border-[#e5e7eb] dark:border-[#374151] transition-all hover:scale-105"
                >
                  {isOpen ? "閉じる" : "詳細を開く"}
                  <svg
                    className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              )}
            </div>
    </>
  );

  return (
    <div className="w-full">
      <AnimatedSection animation="fade-up" delay={index * 100}>
        {service.ctaType === "lp" && service.lpHref ? (
          <Link
            href={service.id === 'full-order-app-development' ? `${service.lpHref}#demo` : service.lpHref}
            className="block h-full"
            prefetch={true}
          >
            <TiltCard maxTilt={5} className="h-full">
              <div className={cardClassName}>
                {cardContent}
              </div>
            </TiltCard>
          </Link>
        ) : (
          <TiltCard maxTilt={5} className="h-full">
            <div className={cardClassName}>{cardContent}</div>
          </TiltCard>
        )}
      </AnimatedSection>

      {/* Detail Panel（Accordion方式：同時に1つだけ開く） */}
      {isOpen && (
        <ServiceDetailPanel service={service} isOpen={isOpen} onClose={onToggle} />
      )}
    </div>
  );
}

// カテゴリセクション（3列グリッド方式用）
function CategorySection({
  category,
  services,
  openServiceId,
  onServiceToggle,
  isActive,
  onCategoryClick,
}: {
  category: ServiceCategory;
  services: Service[];
  openServiceId: string | null;
  onServiceToggle: (id: string) => void;
  isActive: boolean;
  onCategoryClick: () => void;
}) {
  return (
    <div 
      className={`relative transition-all duration-500 overflow-hidden rounded-2xl ${
        isActive 
          ? 'scale-105 z-20' 
          : 'scale-95 opacity-70 z-10 hover:opacity-90 hover:scale-100'
      }`}
    >
      {/* ガラスモーフィズムオーバーレイ */}
      <div 
        className="absolute inset-0 -z-10 backdrop-blur-sm dark:backdrop-blur-md bg-white/50 dark:bg-[#1e293b]/80 rounded-2xl border border-white/30 dark:border-[#374151]/50"
      />

      <div className="relative z-0 p-4 md:p-6">
      {/* Section Heading */}
      <AnimatedSection animation="fade-up" className="mb-6">
        <button
          onClick={onCategoryClick}
          className={`text-left w-full transition-all duration-300 ${
            isActive 
              ? 'text-[#1a1a1a] dark:text-[#f9fafb]' 
              : 'text-[#6b7280] dark:text-[#9ca3af] hover:text-[#1a1a1a] dark:hover:text-[#f9fafb]'
          }`}
        >
          <h2 className={`text-xl md:text-2xl font-bold mb-2 transition-all ${
            isActive ? 'text-[#1a1a1a] dark:text-[#f9fafb]' : 'text-[#6b7280] dark:text-[#9ca3af]'
          }`}>
            {categoryNames[category]}
          </h2>
          <div className={`h-1 bg-[#fff100] rounded-full transition-all ${
            isActive ? 'w-20' : 'w-0'
          }`} />
        </button>
      </AnimatedSection>

        {/* Services Grid - コンパクト表示 */}
        <div className="space-y-3">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              isOpen={openServiceId === service.id}
              onToggle={() => onServiceToggle(service.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  // タブ方式：最初はアプリ開発を選択
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | null>("app-dx");
  const [openServiceId, setOpenServiceId] = useState<string | null>(null);

  // カテゴリごとのサービスを取得（順番：アプリ開発 → ホームページ → プロダクト）
  const appDxServices = getServicesByCategory("app-dx");
  const websiteServices = getServicesByCategory("website");
  const productServices = getServicesByCategory("product");

  // カテゴリクリック時の処理（タブ切替）
  const handleCategoryClick = (category: ServiceCategory) => {
    setActiveCategory(category);
    // モバイルではアコーディオン方式のため、スクロールは不要
    // Desktopではタブ切替のみ
  };

  // サービス詳細の開閉（Accordion方式：同時に1つだけ）
  const handleServiceToggle = (id: string) => {
    setOpenServiceId(openServiceId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0b1220] font-sans">
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
              <span className="section-bg-text left-1/2 -translate-x-1/2 -top-6 md:-top-12 text-[30px] sm:text-[40px] md:text-[60px] lg:text-[80px] xl:text-[100px] text-white/10">SERVICES</span>
              <p className="text-[#fff100] text-sm md:text-base font-medium mb-4 tracking-wider relative">
                SERVICES
              </p>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight relative">
                アプリ開発とWeb制作で、
                <br />
                ビジネスを最短で形にします。
              </h1>
              <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed mb-8">
                アイデアを&quot;動くプロダクト&quot;に。アプリもWebも一気通貫で対応します。
              </p>

              {/* 3カテゴリチップ */}
              <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                {(["app-dx", "website", "product"] as ServiceCategory[]).map(
                  (category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryClick(category)}
                      className="px-4 md:px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm md:text-base font-medium transition-all hover:scale-105 backdrop-blur-sm border border-white/20"
                    >
                      {categoryNames[category]}
                    </button>
                  )
                )}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Sticky Category Nav */}
        <CategoryNav
          activeCategory={activeCategory}
          onCategoryClick={handleCategoryClick}
        />

        {/* 3カテゴリセクション（3列グリッド方式） */}
        <section className="py-16 md:py-24 px-4 md:px-8 relative overflow-hidden bg-white dark:bg-[#0b1220]">
          {/* Desktop: 3列グリッド */}
          <div className="hidden md:block max-w-7xl mx-auto relative" style={{ minHeight: '600px' }}>
            {/* 全体の背景画像（選択されているカテゴリの背景） */}
            <BackgroundImageSection activeCategory={activeCategory} />
            
            <div className="grid grid-cols-3 gap-6 md:gap-8 relative z-10">
              <CategorySection
                category="app-dx"
                services={appDxServices}
                openServiceId={openServiceId}
                onServiceToggle={handleServiceToggle}
                isActive={activeCategory === "app-dx"}
                onCategoryClick={() => handleCategoryClick("app-dx")}
              />
              <CategorySection
                category="website"
                services={websiteServices}
                openServiceId={openServiceId}
                onServiceToggle={handleServiceToggle}
                isActive={activeCategory === "website"}
                onCategoryClick={() => handleCategoryClick("website")}
              />
              <CategorySection
                category="product"
                services={productServices}
                openServiceId={openServiceId}
                onServiceToggle={handleServiceToggle}
                isActive={activeCategory === "product"}
                onCategoryClick={() => handleCategoryClick("product")}
              />
            </div>
          </div>

          {/* Mobile: アコーディオン方式 */}
          <div className="md:hidden max-w-6xl mx-auto space-y-6">
            {(["app-dx", "website", "product"] as ServiceCategory[]).map(
              (category) => {
                const services =
                  category === "app-dx"
                    ? appDxServices
                    : category === "website"
                    ? websiteServices
                    : productServices;
                const isOpen = activeCategory === category;

                return (
                  <div
                    key={category}
                    className="bg-white dark:bg-[#1e293b] rounded-2xl border border-[#e5e7eb] dark:border-[#374151] overflow-hidden"
                  >
                    <button
                      onClick={() =>
                        setActiveCategory(isOpen ? null : category)
                      }
                      className="w-full px-6 py-4 flex items-center justify-between text-left"
                    >
                      <h3 className="text-lg font-bold text-[#1a1a1a] dark:text-[#f9fafb]">
                        {categoryNames[category]}
                      </h3>
                      <svg
                        className={`w-5 h-5 text-[#6b7280] transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 space-y-6">
                        {services.map((service, index) => (
                          <ServiceCard
                            key={service.id}
                            service={service}
                            index={index}
                            isOpen={openServiceId === service.id}
                            onToggle={() => handleServiceToggle(service.id)}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
            )}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24 px-4 md:px-8 bg-[#fafafa] dark:bg-[#0b1220]">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection animation="fade-up" className="text-center mb-12 relative">
              <span className="section-bg-text left-1/2 -translate-x-1/2 -top-6 md:-top-12 text-[30px] sm:text-[40px] md:text-[60px] lg:text-[80px]">FAQ</span>
              <h2 className="text-2xl md:text-4xl font-bold text-[#1a1a1a] dark:text-[#f9fafb] mb-4 relative">
                よくある質問
              </h2>
              <div className="w-20 h-1 bg-[#fff100] rounded-full mx-auto relative" />
            </AnimatedSection>

            <div className="space-y-4">
              {[
                {
                  question: "開発期間はどの程度かかりますか？",
                  answer:
                    "プロジェクト規模により異なりますが、シンプルなLPなら2週間〜、Webアプリなら1〜3ヶ月が目安です。デモ提示後に正確なスケジュールをご提示します。",
                },
                {
                  question: "料金はどれくらいかかりますか？",
                  answer:
                    "30万円〜対応可能です。内容や規模により異なりますので、まずは無料相談でご要望をお聞かせください。お見積りを提示いたします。",
                },
                {
                  question: "途中で仕様変更できますか？",
                  answer:
                    "デモ提示の段階で認識を合わせるため、大きな手戻りは発生しにくい仕組みです。軽微な修正は柔軟に対応しますが、大幅な変更は追加費用が発生する場合があります。",
                },
                {
                  question: "運用・保守もお願いできますか？",
                  answer:
                    "はい、運用・保守も対応可能です。月額での保守契約や、都度対応など、ご要望に合わせてプランをご提案します。",
                },
              ].map((faq, i) => (
                <AnimatedSection
                  key={i}
                  animation="fade-up"
                  delay={i * 100}
                >
                  <div className="bg-white dark:bg-[#1e293b] rounded-xl p-6 shadow-sm border border-[#e5e7eb] dark:border-[#374151]">
                    <h3 className="font-bold text-[#1a1a1a] dark:text-[#f9fafb] mb-2">
                      Q. {faq.question}
                    </h3>
                    <p className="text-[#6b7280] dark:text-[#9ca3af]">{faq.answer}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#0b1220] py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#fff100] rounded-full blur-[100px]" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#fdc700] rounded-full blur-[120px]" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 text-center">
            <AnimatedSection animation="fade-up" className="relative">
              <span className="section-bg-text left-1/2 -translate-x-1/2 -top-6 md:-top-12 text-[30px] sm:text-[40px] md:text-[60px] lg:text-[80px] text-white/10">CONTACT</span>
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 relative">
                まずは無料相談から
              </h2>
              <p className="text-base md:text-lg text-white/70 mb-8 max-w-2xl mx-auto">
                「こんなこと実現できる？」という段階からOK。
                <br />
                課題を整理するところから、一緒にスタートしましょう。
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
                  href="/strengths"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-4 rounded-full border border-white/30 transition-all hover:scale-105"
                >
                  MAXELUSの強みを見る
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
