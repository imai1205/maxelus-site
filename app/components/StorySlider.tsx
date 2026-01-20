"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface StoryStep {
  emoji: string;
  title: string;
  description: string;
}

const storySteps: StoryStep[] = [
  {
    emoji: "😰",
    title: "課題",
    description: "「システム開発を依頼したいけど、完成イメージが分からない」「途中で認識のズレが発生し、手戻りが発生」「予算オーバーで困った経験がある」"
  },
  {
    emoji: "💡",
    title: "無料相談",
    description: "まずは課題を整理するところから。あなたのビジネスの課題をヒアリングし、システム化すべきポイントを一緒に見つけていきます。相談は完全無料です。"
  },
  {
    emoji: "🎯",
    title: "デモ提示",
    description: "打合せ後、すぐに画面デモを作成。実際に触りながら認識を合わせるから、ズレが起きにくい。見積りも明確で安心です。"
  },
  {
    emoji: "🚀",
    title: "設計確定→開発",
    description: "デモで合意した内容をベースに、詳細設計を確定。進捗は随時共有し、透明性のあるプロセスで開発を進めます。追加費用の心配もありません。"
  },
  {
    emoji: "🎉",
    title: "安心して進められる",
    description: "納品後も運用・保守でサポート。製造業、医療、建設など多業界での実績があります。まずは無料相談から、一歩を踏み出しませんか？"
  }
];

export default function StorySlider() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const goToNext = useCallback(() => {
    setCurrentStep((prev) => (prev + 1) % storySteps.length);
    setProgress(0);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentStep((prev) => (prev - 1 + storySteps.length) % storySteps.length);
    setProgress(0);
  }, []);

  const goToStep = (index: number) => {
    setCurrentStep(index);
    setProgress(0);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
    setProgress(0);
  };

  // Touch handlers for swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      goToNext();
      setIsAutoPlaying(false);
    } else if (isRightSwipe) {
      goToPrev();
      setIsAutoPlaying(false);
    }
  };

  // Auto play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          goToNext();
          return 0;
        }
        return prev + 2;
      });
    }, 60); // 3 seconds total = 60ms * 50 steps

    return () => clearInterval(progressInterval);
  }, [isAutoPlaying, goToNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPrev();
        setIsAutoPlaying(false);
      } else if (e.key === "ArrowRight") {
        goToNext();
        setIsAutoPlaying(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrev]);

  const currentStory = storySteps[currentStep];

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[500px] md:min-h-[700px] overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Background Image with Blur */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80')`,
          filter: "blur(8px)",
          transform: "scale(1.1)"
        }}
      />
      
      {/* Dark Overlay with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/90 via-[#1e293b]/85 to-[#0f172a]/90" />
      
      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[500px] md:min-h-[700px] px-4 md:px-8 py-12 md:py-16">
        {/* Navigation Arrows - Hidden on mobile, use swipe instead */}
        <button
          onClick={() => { goToPrev(); setIsAutoPlaying(false); }}
          className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-12 lg:w-14 h-12 lg:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-110"
          aria-label="前へ"
        >
          <svg className="w-5 lg:w-6 h-5 lg:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={() => { goToNext(); setIsAutoPlaying(false); }}
          className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-12 lg:w-14 h-12 lg:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-110"
          aria-label="次へ"
        >
          <svg className="w-5 lg:w-6 h-5 lg:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Progress Indicators */}
        <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
          {storySteps.map((_, index) => (
            <button
              key={index}
              onClick={() => { goToStep(index); setIsAutoPlaying(false); }}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === currentStep 
                  ? "w-8 md:w-12 bg-[#fff100]" 
                  : index < currentStep 
                    ? "w-6 md:w-8 bg-white/60" 
                    : "w-6 md:w-8 bg-white/30"
              }`}
              aria-label={`ステップ ${index + 1}`}
            >
              {index === currentStep && isAutoPlaying && (
                <div 
                  className="h-full bg-[#fdc700] rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              )}
            </button>
          ))}
        </div>
        
        {/* Step Counter */}
        <p className="text-white/60 text-xs md:text-sm mb-4 md:mb-8">
          {currentStep + 1} / {storySteps.length}
        </p>

        {/* Glass Card */}
        <div 
          className="max-w-[95%] sm:max-w-lg md:max-w-2xl w-full bg-white/10 backdrop-blur-xl rounded-2xl md:rounded-3xl border border-white/20 p-6 sm:p-8 md:p-12 shadow-2xl cursor-pointer select-none"
          onClick={() => { goToNext(); setIsAutoPlaying(false); }}
        >
          {/* Emoji */}
          <div className="text-center mb-4 md:mb-6 animate-bounce-slow">
            <span className="text-5xl sm:text-6xl md:text-8xl drop-shadow-lg">{currentStory.emoji}</span>
          </div>
          
          {/* Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-4 md:mb-6 tracking-tight">
            {currentStory.title}
          </h2>
          
          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg text-white/80 text-center leading-relaxed mb-6 md:mb-8">
            {currentStory.description}
          </p>
          
          {/* Action Button */}
          {currentStep === 0 ? (
            <button
              onClick={(e) => { e.stopPropagation(); toggleAutoPlay(); }}
              className="mx-auto flex items-center gap-2 md:gap-3 bg-[#fff100] hover:bg-[#fdc700] text-[#1a1a1a] font-medium px-6 md:px-8 py-3 md:py-4 rounded-full transition-all hover:scale-105 shadow-lg text-sm md:text-base"
            >
              {isAutoPlaying ? (
                <>
                  <svg className="w-4 md:w-5 h-4 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  </svg>
                  一時停止
                </>
              ) : (
                <>
                  <svg className="w-4 md:w-5 h-4 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  ストーリーを開始
                </>
              )}
            </button>
          ) : currentStep === storySteps.length - 1 ? (
            <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
              <a
                href="/contact"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center gap-2 bg-[#fff100] hover:bg-[#fdc700] text-[#1a1a1a] font-medium px-6 md:px-8 py-3 md:py-4 rounded-full transition-all hover:scale-105 shadow-lg text-sm md:text-base"
              >
                無料相談する
                <svg className="w-4 md:w-5 h-4 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="/works"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-6 md:px-8 py-3 md:py-4 rounded-full border border-white/30 transition-all hover:scale-105 text-sm md:text-base"
              >
                実績を見る
              </a>
            </div>
          ) : (
            <button
              onClick={(e) => { e.stopPropagation(); toggleAutoPlay(); }}
              className="mx-auto flex items-center gap-2 md:gap-3 bg-white/10 hover:bg-white/20 text-white font-medium px-6 md:px-8 py-3 md:py-4 rounded-full border border-white/30 transition-all hover:scale-105 text-sm md:text-base"
            >
              {isAutoPlaying ? (
                <>
                  <svg className="w-4 md:w-5 h-4 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  </svg>
                  一時停止
                </>
              ) : (
                <>
                  <svg className="w-4 md:w-5 h-4 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  自動再生
                </>
              )}
            </button>
          )}
        </div>

        {/* Navigation Hint */}
        <p className="text-white/40 text-xs md:text-sm mt-6 md:mt-8 text-center px-4">
          <span className="hidden md:inline">矢印キー / クリック / スタートボタンで操作</span>
          <span className="md:hidden">← スワイプで移動 / タップで次へ →</span>
        </p>
        
        {/* Mobile swipe indicator */}
        <div className="md:hidden flex items-center gap-2 mt-4 text-white/30">
          <svg className="w-5 h-5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          <span className="text-xs">スワイプ</span>
          <svg className="w-5 h-5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
