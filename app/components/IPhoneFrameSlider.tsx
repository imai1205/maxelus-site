'use client';

import { useState, useEffect, useRef } from 'react';

// アプリ画像データ（7枚使用）
const APP_IMAGES = [
  { src: '/cases/IPhoneFrame-saron.png', alt: 'サロン管理アプリ' },
  { src: '/cases/IPhoneFrame-nail.png', alt: 'ネイルサロン管理アプリ' },
  { src: '/cases/IPhoneFrame-kiji.png', alt: '記事管理アプリ' },
  { src: '/cases/IPhoneFrame-calc.png', alt: '計算アプリ' },
  { src: '/cases/IPhoneFrame-item.png', alt: 'アイテム管理アプリ' },
  { src: '/cases/IPhoneFrame-draw.png', alt: '図面管理アプリ' },
  { src: '/cases/IPhoneFrame-car.png', alt: '車関連アプリ' },
];

// 1枚あたりの幅（レスポンシブ）
const CARD_WIDTH = 280; // md以上
const CARD_WIDTH_MOBILE = 200; // モバイル
const CARD_GAP = 20;
const AUTO_SCROLL_SPEED = 0.3; // px/frame（ゆっくり流す）

export default function IPhoneFrameSlider() {
  const virtualImages = [...APP_IMAGES, ...APP_IMAGES, ...APP_IMAGES];
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
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

  const cardWidth = isMobile ? CARD_WIDTH_MOBILE : CARD_WIDTH;
  const cardWidthWithGap = cardWidth + CARD_GAP;

  // 初期位置：真ん中セットの開始位置
  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const scrollWidth = container.scrollWidth;
      const clientWidth = container.clientWidth;
      const centerOffset = (scrollWidth - clientWidth) / 2;
      container.scrollLeft = centerOffset;
    }
  }, []);

  // 自動スクロール（ゆっくり流す）
  useEffect(() => {
    const startTimer = setTimeout(() => {
      const autoScroll = () => {
        if (containerRef.current && !isUserScrollingRef.current) {
          const container = containerRef.current;
          const scrollLeft = container.scrollLeft;
          const scrollWidth = container.scrollWidth;
          const clientWidth = container.clientWidth;
          const centerOffset = (scrollWidth - clientWidth) / 2;
          const totalCards = APP_IMAGES.length;
          const threshold = cardWidthWithGap * 0.3;

          // 右端に近づいたら左端にジャンプ
          if (scrollLeft > centerOffset + (totalCards * cardWidthWithGap) - threshold) {
            container.scrollTo({
              left: centerOffset - (totalCards * cardWidthWithGap) + threshold,
              behavior: 'auto'
            });
            return;
          }
          // 左端に近づいたら右端にジャンプ
          if (scrollLeft < centerOffset - (totalCards * cardWidthWithGap) - threshold) {
            container.scrollTo({
              left: centerOffset + (totalCards * cardWidthWithGap) - threshold,
              behavior: 'auto'
            });
            return;
          }

          // 自動スクロール
          container.scrollLeft += AUTO_SCROLL_SPEED;
        }
      };

      autoScrollIntervalRef.current = window.setInterval(autoScroll, 16); // 60fps
    }, 200);

    return () => {
      clearTimeout(startTimer);
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };
  }, [cardWidthWithGap]);

  return (
    <div className="relative w-full">
      {/* 左スクロールの矢印ヒント */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none hidden md:flex items-center gap-2 animate-pulse">
        <svg className="w-8 h-8 text-[#6b7280]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="text-sm text-[#6b7280] font-medium">スクロールできます</span>
      </div>
      
      <div className="relative w-full overflow-x-auto overflow-y-visible scrollbar-hide" 
        style={{ 
          WebkitOverflowScrolling: 'touch',
          scrollBehavior: 'smooth',
        }}
        onTouchStart={() => {
          isUserScrollingRef.current = true;
        }}
        onTouchEnd={() => {
          setTimeout(() => {
            isUserScrollingRef.current = false;
          }, 1000);
        }}
        onScroll={() => {
          isUserScrollingRef.current = true;
          setTimeout(() => {
            isUserScrollingRef.current = false;
          }, 1000);
        }}
      >
      <div
        ref={containerRef}
        className="flex items-end gap-5"
        style={{
          width: 'max-content',
          paddingLeft: '50%',
          paddingRight: '50%',
        }}
      >
        {virtualImages.map((app, index) => {
          const isHovered = hoveredIndex === index;
          
          return (
            <div
              key={index}
              className="flex-shrink-0 flex items-end"
              style={{
                width: `${cardWidth}px`,
              }}
            >
              <button
                className="relative transition-all duration-300 cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  width: '100%',
                  height: 'auto',
                  padding: 0,
                  border: 'none',
                  background: 'transparent',
                }}
                aria-label={app.alt}
              >
                <img
                  src={app.src}
                  alt={app.alt}
                  className="w-full h-auto object-contain pointer-events-none"
                  style={{
                    opacity: isHovered ? 1 : 0.55,
                    filter: isHovered 
                      ? 'saturate(1.2) contrast(1.05)' 
                      : 'grayscale(0.35)',
                    transform: isHovered 
                      ? 'scale(1.07) translateY(-10px)' 
                      : 'scale(1)',
                    boxShadow: isHovered
                      ? '0 20px 60px rgba(255, 241, 0, 0.3)'
                      : 'none',
                    transition: 'all 0.3s ease-out',
                  }}
                  loading="lazy"
                  decoding="async"
                />
              </button>
            </div>
          );
        })}
      </div>
      </div>
    </div>
  );
}
