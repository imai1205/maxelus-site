"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatedSection } from "./AnimationProvider";

// Figmaから取得したアプリ画面イメージのURL（実際のスクリーンショット画像を使用）
// 各アプリのiPhoneフレーム全体の画像を使用
const appScreens = [
  {
    id: "app-1",
    name: "記事一覧アプリ",
    image: "https://www.figma.com/api/mcp/asset/7e73c5ad-1bad-40df-8921-ce35139c9ade",
    description: "記事一覧・検索機能付きアプリ",
  },
  {
    id: "app-2",
    name: "ショッピングアプリ",
    image: "https://www.figma.com/api/mcp/asset/cbc55d0e-8194-451e-9e89-6510110e7f9f",
    description: "ECサイト・商品検索アプリ",
  },
  {
    id: "app-3",
    name: "ゴルフスコアアプリ",
    image: "https://www.figma.com/api/mcp/asset/42b0d8ed-a3ed-442f-bf6d-16f75529eca4",
    description: "ゴルフスコア管理アプリ",
  },
  {
    id: "app-4",
    name: "図面管理アプリ",
    image: "https://www.figma.com/api/mcp/asset/c9b8e7c1-234e-451f-b798-674ec6617358",
    description: "図面検索・管理システム",
  },
  {
    id: "app-5",
    name: "ネイルアプリ",
    image: "https://www.figma.com/api/mcp/asset/df6b1f7c-dac9-4959-ba0d-b209abff45c9",
    description: "ネイルデザイン検索アプリ",
  },
  {
    id: "app-6",
    name: "学習アプリ",
    image: "https://www.figma.com/api/mcp/asset/2e720383-e3d1-4f66-8a2d-329b107a21c8",
    description: "数学学習・動画視聴アプリ",
  },
  {
    id: "app-7",
    name: "ENEOSアプリ",
    image: "https://www.figma.com/api/mcp/asset/c9b8e7c1-234e-451f-b798-674ec6617358",
    description: "ガソリンスタンド・ポイント管理",
  },
  {
    id: "app-8",
    name: "部品管理アプリ",
    image: "https://www.figma.com/api/mcp/asset/408ceb4d-1ffa-4512-a93a-04727a21c84f",
    description: "部品詳細・購買管理システム",
  },
];

export default function AppScreensGallery() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const containerWidth = container.clientWidth;
      const itemWidth = containerWidth * 0.8; // 各アイテムの幅（80vw or 400px）
      const gap = 24; // gap-6 = 24px
      const totalItemWidth = itemWidth + gap;
      const newIndex = Math.round(scrollLeft / totalItemWidth);
      setActiveIndex(Math.min(newIndex, appScreens.length - 1));
    };

    // スクロールイベントをthrottle
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    container.addEventListener("scroll", throttledScroll, { passive: true });
    handleScroll(); // 初期状態を設定

    return () => {
      container.removeEventListener("scroll", throttledScroll);
    };
  }, []);

  return (
    <div className="relative py-12 md:py-16">
      {/* Section Title */}
      <AnimatedSection animation="fade-up" className="text-center mb-8 md:mb-12 relative">
        <span className="section-bg-text left-1/2 -translate-x-1/2 -top-6 md:-top-12 text-[30px] sm:text-[40px] md:text-[60px] lg:text-[80px] text-[#d1d5dc]/10">APPS</span>
        <h3 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-2 relative">アプリ画面イメージ</h3>
        <p className="text-[#6b7280] text-sm md:text-base">横にスクロールして様々なアプリをご覧ください</p>
      </AnimatedSection>

      {/* Scroll Container */}
      <div className="relative">
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

        {/* Scrollable container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide px-8 md:px-16 py-8 snap-x snap-mandatory"
          style={{
            scrollBehavior: "smooth",
          }}
        >
          {appScreens.map((app, index) => {
            const isActive = index === activeIndex;
            const distance = Math.abs(index - activeIndex);
            const opacity = distance === 0 ? 1 : distance === 1 ? 0.3 : distance === 2 ? 0.15 : 0.1;
            const scale = distance === 0 ? 1 : distance === 1 ? 0.85 : distance === 2 ? 0.75 : 0.7;
            const zIndex = distance === 0 ? 10 : distance === 1 ? 5 : 1;

            return (
              <div
                key={app.id}
                className="flex-shrink-0 w-[80vw] md:w-[400px] transition-all duration-700 ease-out snap-center"
                style={{
                  opacity,
                  transform: `scale(${scale}) translateZ(0)`,
                  zIndex,
                }}
              >
                <div className="relative bg-[#101828] rounded-[40px] p-3 shadow-2xl">
                  {/* iPhone Frame */}
                  <div className="relative bg-black rounded-[32px] overflow-hidden aspect-[9/19.5]">
                    {/* Screen Content - フルフレーム画像を使用 */}
                    <div className="absolute inset-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={app.image}
                        alt={app.name}
                        className="w-full h-full object-contain"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                  
                  {/* App Info - アクティブな時のみ表示 */}
                  {isActive && (
                    <div className="mt-4 text-center animate-fade-in">
                      <h4 className="text-sm md:text-base font-bold text-[#1a1a1a] mb-1">{app.name}</h4>
                      <p className="text-xs md:text-sm text-[#6b7280]">{app.description}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {appScreens.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              const container = scrollContainerRef.current;
              if (!container) return;
              const containerWidth = container.clientWidth;
              const itemWidth = containerWidth * 0.8; // 80vw
              const gap = 24;
              const scrollPosition = index * (itemWidth + gap) - (containerWidth - itemWidth) / 2;
              container.scrollTo({
                left: Math.max(0, scrollPosition),
                behavior: "smooth",
              });
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              index === activeIndex
                ? "bg-[#fff100] w-8"
                : "bg-[#e5e7eb] hover:bg-[#d1d5dc]"
            }`}
            aria-label={`Go to app ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
