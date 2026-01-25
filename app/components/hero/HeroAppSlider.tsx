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

export default function HeroAppSlider() {
  const virtualImages = [...APP_IMAGES, ...APP_IMAGES, ...APP_IMAGES];
  const [currentIndex, setCurrentIndex] = useState(APP_IMAGES.length);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(true);
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

  // スクロール位置を更新
  useEffect(() => {
    if (containerRef.current && isTransitioning && !isUserScrollingRef.current) {
      const scrollPosition = (currentIndex - APP_IMAGES.length) * cardWidthWithGap;
      containerRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, [currentIndex, cardWidth, isTransitioning]);

  // 自動スクロール（ゆっくり流す）- モバイルでは無効化
  useEffect(() => {
    // モバイルでは自動スクロールを無効化
    if (isMobile) return;
    
    // 少し遅延してから開始（初期化を待つ）
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
            setIsTransitioning(false);
            setTimeout(() => {
              container.scrollTo({
                left: centerOffset - (totalCards * cardWidthWithGap) + threshold,
                behavior: 'auto'
              });
              setIsTransitioning(true);
            }, 50);
            return;
          }
          // 左端に近づいたら右端にジャンプ
          if (scrollLeft < centerOffset - (totalCards * cardWidthWithGap) - threshold) {
            setIsTransitioning(false);
            setTimeout(() => {
              container.scrollTo({
                left: centerOffset + (totalCards * cardWidthWithGap) - threshold,
                behavior: 'auto'
              });
              setIsTransitioning(true);
            }, 50);
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
  }, [cardWidthWithGap, isMobile]);

  const handlePrev = () => {
    isUserScrollingRef.current = true;
    setCurrentIndex((prev) => {
      const next = prev - 1;
      if (next < 0) {
        setIsTransitioning(false);
        setTimeout(() => {
          setCurrentIndex(APP_IMAGES.length * 2 - 1);
          setIsTransitioning(true);
        }, 50);
        return APP_IMAGES.length * 2 - 1;
      }
      return next;
    });
    setTimeout(() => {
      isUserScrollingRef.current = false;
    }, 1000);
  };

  const handleNext = () => {
    isUserScrollingRef.current = true;
    setCurrentIndex((prev) => {
      const next = prev + 1;
      if (next >= APP_IMAGES.length * 2) {
        setIsTransitioning(false);
        setTimeout(() => {
          setCurrentIndex(APP_IMAGES.length);
          setIsTransitioning(true);
        }, 50);
        return APP_IMAGES.length;
      }
      return next;
    });
    setTimeout(() => {
      isUserScrollingRef.current = false;
    }, 1000);
  };

  return (
    <div 
      className="absolute inset-0 overflow-x-hidden overflow-y-visible pointer-events-none"
      style={{ zIndex: 50 }}
    >
      <div 
        className="absolute top-14 md:top-16 bottom-4 md:bottom-6 left-0 right-0 pointer-events-auto"
        style={{ zIndex: 50 }}
      >
        <div 
          ref={containerRef}
          className="relative w-full h-full overflow-x-auto overflow-y-visible scrollbar-hide flex items-end justify-center gap-5" 
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
          onScroll={(e) => {
            const container = e.currentTarget;
            const scrollLeft = container.scrollLeft;
            const scrollWidth = container.scrollWidth;
            const clientWidth = container.clientWidth;
            const centerOffset = (scrollWidth - clientWidth) / 2;
            const newIndex = Math.round((scrollLeft - centerOffset) / cardWidthWithGap) + APP_IMAGES.length;
            if (Math.abs(newIndex - currentIndex) > 1 && newIndex >= 0 && newIndex < virtualImages.length) {
              isUserScrollingRef.current = true;
              setCurrentIndex(newIndex);
              setTimeout(() => {
                isUserScrollingRef.current = false;
              }, 1000);
            }
          }}
        >
          <div
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
                      zIndex: 50,
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

        <div 
          className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-4 pointer-events-none"
          style={{ 
            bottom: '16px',
            zIndex: 50,
          }}
        >
          <button
            onClick={handlePrev}
            className="pointer-events-auto bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 hover:scale-110"
            aria-label="前へ"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={handleNext}
            className="pointer-events-auto bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 hover:scale-110"
            aria-label="次へ"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
