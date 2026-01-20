"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface StoryStep {
  icon: React.ReactNode;
  title: string;
  description: string;
  backgroundImage: string;
}

// Unified SVG Icons
const StoryIcons = {
  challenge: (
    <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
  ),
  consultation: (
    <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  ),
  demo: (
    <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672h-6.75a2.25 2.25 0 01-2.25-2.25V4.5a2.25 2.25 0 012.25-2.25h6.75a2.25 2.25 0 012.25 2.25v15.222a2.25 2.25 0 01-2.25 2.25zM9.75 4.5v15.222M12 9.75h.008v.008H12V9.75z" />
    </svg>
  ),
  development: (
    <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 8.25 13.5H3.75z" />
    </svg>
  ),
  success: (
    <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
};

const storySteps: StoryStep[] = [
  {
    icon: StoryIcons.challenge,
    title: "課題",
    description: "「システム開発を依頼したいけど、完成イメージが分からない」「途中で認識のズレが発生し、手戻りが発生」「予算オーバーで困った経験がある」",
    backgroundImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1920&q=80"
  },
  {
    icon: StoryIcons.consultation,
    title: "無料相談",
    description: "まずは課題を整理するところから。あなたのビジネスの課題をヒアリングし、システム化すべきポイントを一緒に見つけていきます。相談は完全無料です。",
    backgroundImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80"
  },
  {
    icon: StoryIcons.demo,
    title: "デモ提示",
    description: "打合せ後、すぐに画面デモを作成。実際に触りながら認識を合わせるから、ズレが起きにくい。見積りも明確で安心です。",
    backgroundImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80"
  },
  {
    icon: StoryIcons.development,
    title: "設計確定→開発",
    description: "デモで合意した内容をベースに、詳細設計を確定。進捗は随時共有し、透明性のあるプロセスで開発を進めます。追加費用の心配もありません。",
    backgroundImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1920&q=80"
  },
  {
    icon: StoryIcons.success,
    title: "安心して進められる",
    description: "納品後も運用・保守でサポート。製造業、医療、建設など多業界での実績があります。まずは無料相談から、一歩を踏み出しませんか？",
    backgroundImage: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1920&q=80"
  }
];

export default function StorySlider() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const containerRef = useRef<HTMLDivElement>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const goToNext = useCallback(() => {
    setDirection('next');
    setCurrentStep((prev) => (prev + 1) % storySteps.length);
    setProgress(0);
  }, []);

  const goToPrev = useCallback(() => {
    setDirection('prev');
    setCurrentStep((prev) => (prev - 1 + storySteps.length) % storySteps.length);
    setProgress(0);
  }, []);

  const goToStep = (index: number) => {
    setDirection(index > currentStep ? 'next' : 'prev');
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
      {/* Background Images with Slide Animation */}
      {storySteps.map((step, index) => (
        <div
          key={index}
          className="absolute inset-0 bg-cover bg-center story-background"
          style={{
            backgroundImage: `url('${step.backgroundImage}')`,
            filter: "blur(3px)",
            transform: "scale(1.15)",
            opacity: index === currentStep ? 1 : 0,
            transition: "opacity 1.5s cubic-bezier(0.4, 0, 0.2, 1), transform 2s cubic-bezier(0.4, 0, 0.2, 1), filter 2s cubic-bezier(0.4, 0, 0.2, 1)",
            zIndex: index === currentStep ? 1 : 0
          }}
        />
      ))}
      
      {/* Dark Overlay with Gradient - Lighter navy */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/70 via-[#1e293b]/60 to-[#0f172a]/70 transition-opacity duration-[2000ms]" />
      
      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[500px] md:min-h-[700px] px-4 md:px-8 py-12 md:py-16">
        {/* Navigation Arrows - Better positioned */}
        <button
          onClick={() => { goToPrev(); setIsAutoPlaying(false); }}
          className="hidden md:flex absolute left-4 lg:left-8 top-[45%] -translate-y-1/2 w-12 lg:w-14 h-12 lg:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-110 z-20 shadow-lg"
          aria-label="前へ"
        >
          <svg className="w-5 lg:w-6 h-5 lg:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={() => { goToNext(); setIsAutoPlaying(false); }}
          className="hidden md:flex absolute right-4 lg:right-8 top-[45%] -translate-y-1/2 w-12 lg:w-14 h-12 lg:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-110 z-20 shadow-lg"
          aria-label="次へ"
        >
          <svg className="w-5 lg:w-6 h-5 lg:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
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

        {/* Glass Card with Slide Animation */}
        <div 
          key={currentStep}
          className="max-w-[95%] sm:max-w-lg md:max-w-2xl w-full bg-white/10 backdrop-blur-xl rounded-2xl md:rounded-3xl border border-white/20 p-6 sm:p-8 md:p-12 shadow-2xl cursor-pointer select-none"
          style={{
            animation: direction === 'next' 
              ? 'storySlideInFromRight 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards'
              : 'storySlideInFromLeft 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards',
            willChange: 'transform, opacity, filter'
          }}
          onClick={() => { goToNext(); setIsAutoPlaying(false); }}
        >
          {/* Icon with Direction-based Animation */}
          <div className="text-center mb-4 md:mb-6">
            <div 
              key={currentStep}
              className="mx-auto w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-white/90"
              style={{
                animation: direction === 'next' 
                  ? 'storyIconSlideRight 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards'
                  : 'storyIconSlideLeft 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards',
                filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))'
              }}
            >
              {currentStory.icon}
            </div>
          </div>
          
          {/* Title with Slide Animation */}
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-4 md:mb-6 tracking-tight"
            style={{
              animation: direction === 'next'
                ? 'storyTextSlideRight 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.2s forwards'
                : 'storyTextSlideLeft 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.2s forwards',
              opacity: 0
            }}
          >
            {currentStory.title}
          </h2>
          
          {/* Description with Slide Animation */}
          <p 
            className="text-sm sm:text-base md:text-lg text-white/80 text-center leading-relaxed mb-6 md:mb-8"
            style={{
              animation: direction === 'next'
                ? 'storyTextSlideRight 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.4s forwards'
                : 'storyTextSlideLeft 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.4s forwards',
              opacity: 0
            }}
          >
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
