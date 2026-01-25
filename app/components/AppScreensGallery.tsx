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

const ITEM_WIDTH_MOBILE = 320; // 80vw相当
const ITEM_WIDTH_DESKTOP = 400;
const GAP = 24;
const AUTO_SCROLL_SPEED = 0.3; // px/frame（ゆっくり流す）

export default function AppScreensGallery() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const autoScrollIntervalRef = useRef<number | null>(null);
  const isUserScrollingRef = useRef<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const itemWidth = isMobile ? ITEM_WIDTH_MOBILE : ITEM_WIDTH_DESKTOP;
  const itemWidthWithGap = itemWidth + GAP;

  // 3セット複製（無限ループ用）
  const loopScreens = [...appScreens, ...appScreens, ...appScreens];

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const containerWidth = container.clientWidth;
      const totalItemWidth = itemWidthWithGap;
      const centerOffset = (container.scrollWidth - containerWidth) / 2;
      const relativeScroll = scrollLeft - centerOffset;
      const newIndex = Math.round(relativeScroll / totalItemWidth) % appScreens.length;
      setActiveIndex(newIndex >= 0 ? newIndex : appScreens.length + newIndex);
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
  }, [itemWidthWithGap]);

  // 自動スクロール（ゆっくり流す）+ 無限ループ
  useEffect(() => {
    const autoScroll = () => {
      if (scrollContainerRef.current && !isUserScrollingRef.current) {
        const container = scrollContainerRef.current;
        const scrollLeft = container.scrollLeft;
        const scrollWidth = container.scrollWidth;
        const clientWidth = container.clientWidth;
        const centerOffset = (scrollWidth - clientWidth) / 2;
        const totalItemWidth = itemWidthWithGap;
        const threshold = totalItemWidth * 0.3;

        // 右端に近づいたら左端にジャンプ
        if (scrollLeft > centerOffset + (appScreens.length * totalItemWidth) - threshold) {
          container.scrollTo({
            left: centerOffset - (appScreens.length * totalItemWidth) + threshold,
            behavior: 'auto'
          });
          return;
        }
        // 左端に近づいたら右端にジャンプ
        if (scrollLeft < centerOffset - (appScreens.length * totalItemWidth) - threshold) {
          container.scrollTo({
            left: centerOffset + (appScreens.length * totalItemWidth) - threshold,
            behavior: 'auto'
          });
          return;
        }

        // 自動スクロール
        container.scrollLeft += AUTO_SCROLL_SPEED;
      }
    };

    // 少し遅延してから開始（初期化を待つ）
    const startTimer = setTimeout(() => {
      autoScrollIntervalRef.current = window.setInterval(autoScroll, 16); // 60fps
    }, 100);

    return () => {
      clearTimeout(startTimer);
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };
  }, [itemWidthWithGap]);

  // 初期位置：真ん中セットの開始位置
  useEffect(() => {
    const initPosition = () => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const scrollWidth = container.scrollWidth;
        const clientWidth = container.clientWidth;
        const centerOffset = (scrollWidth - clientWidth) / 2;
        container.scrollLeft = centerOffset;
      }
    };
    
    // 少し遅延してから初期位置を設定（レイアウトが確定してから）
    const timer = setTimeout(initPosition, 100);
    return () => clearTimeout(timer);
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
          className="relative w-full overflow-x-auto overflow-y-visible scrollbar-hide"
          style={{
            scrollBehavior: "smooth",
            WebkitOverflowScrolling: 'touch',
          }}
          onScroll={() => {
            isUserScrollingRef.current = true;
            setTimeout(() => {
              isUserScrollingRef.current = false;
            }, 1000);
          }}
          onTouchStart={() => {
            isUserScrollingRef.current = true;
          }}
          onTouchEnd={() => {
            setTimeout(() => {
              isUserScrollingRef.current = false;
            }, 1000);
          }}
        >
          <div
            className="flex gap-6 items-center justify-center"
            style={{
              width: 'max-content',
              paddingLeft: '50%',
              paddingRight: '50%',
            }}
          >
            {loopScreens.map((app, index) => {
            const isActive = index % appScreens.length === activeIndex;
            const distance = Math.abs((index % appScreens.length) - activeIndex);
            const opacity = distance === 0 ? 1 : distance === 1 ? 0.3 : distance === 2 ? 0.15 : 0.1;
            const scale = distance === 0 ? 1 : distance === 1 ? 0.85 : distance === 2 ? 0.75 : 0.7;
            const zIndex = distance === 0 ? 10 : distance === 1 ? 5 : 1;

            return (
              <div
                key={`${app.id}-${index}`}
                className="flex-shrink-0 transition-all duration-700 ease-out"
                style={{
                  width: `${itemWidth}px`,
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
      </div>

      {/* Scroll Indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {appScreens.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              const container = scrollContainerRef.current;
              if (!container) return;
              isUserScrollingRef.current = true;
              const containerWidth = container.clientWidth;
              const scrollWidth = container.scrollWidth;
              const centerOffset = (scrollWidth - containerWidth) / 2;
              const scrollPosition = centerOffset + (index * itemWidthWithGap) - (containerWidth - itemWidth) / 2;
              container.scrollTo({
                left: scrollPosition,
                behavior: "smooth",
              });
              setTimeout(() => {
                isUserScrollingRef.current = false;
              }, 1000);
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
