"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";

interface StoryStep {
  icon: React.ReactNode;
  title: string;
  description: string;
  backgroundImage: string;
}

// Unified SVG Icons
const StoryIcons = {
  // 1. 課題 - 警告アイコン
  challenge: (
    <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
  ),
  // 2. 無料相談 - 会話アイコン
  consultation: (
    <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
    </svg>
  ),
  // 3. デモ提示 - スマホアイコン
  demo: (
    <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
    </svg>
  ),
  // 4. 発注 - 握手アイコン
  order: (
    <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  ),
  // 5. 開発 - コードアイコン
  development: (
    <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
  ),
  // 6. 納品・運用 - チェックマークアイコン
  operation: (
    <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
    </svg>
  )
};

const storySteps: StoryStep[] = [
  {
    // 1. 課題
    icon: StoryIcons.challenge,
    title: "課題",
    description: "「システム開発を依頼したいけど、完成イメージが分からない」「途中で認識のズレが発生し、手戻りが発生」「予算オーバーで困った経験がある」",
    // 頭を抱える・ストレス・困っている様子（暗めのトーン）
    backgroundImage: "https://images.unsplash.com/photo-1541199249251-f713e6145474?auto=format&fit=crop&w=1920&q=80"
  },
  {
    // 2. 無料相談
    icon: StoryIcons.consultation,
    title: "無料相談",
    description: "まずは課題を整理するところから。あなたのビジネスの課題をヒアリングし、システム化すべきポイントを一緒に見つけていきます。相談は完全無料です。",
    // ミーティング・対面で相談している様子
    backgroundImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1920&q=80"
  },
  {
    // 3. デモ提示
    icon: StoryIcons.demo,
    title: "デモ提示",
    description: "打合せ後、すぐに画面デモを作成。実際に触りながら認識を合わせるから、ズレが起きにくい。見積りも明確で安心です。",
    // スマホ・タブレットでデモ画面を見せている様子
    backgroundImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1920&q=80"
  },
  {
    // 4. 発注（握手）
    icon: StoryIcons.order,
    title: "発注",
    description: "デモで合意した内容をベースに、正式発注。見積りも明確で、追加費用の心配もありません。パートナーとして一緒にプロジェクトをスタートします。",
    // 握手・契約・パートナーシップ成立の様子
    backgroundImage: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1920&q=80"
  },
  {
    // 5. 開発
    icon: StoryIcons.development,
    title: "開発",
    description: "詳細設計を確定し、開発を進めます。進捗は随時共有し、透明性のあるプロセスで進行。いつでも確認できる状態をキープします。",
    // コーディング・開発中の様子
    backgroundImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1920&q=80"
  },
  {
    // 6. 納品・運用
    icon: StoryIcons.operation,
    title: "納品・運用",
    description: "納品後も半年間は並走サポート。データ入力や使い勝手の確認、運用定着まで一緒に伴走します。「作って終わり」ではありません。",
    // 一緒に作業・チームワーク・並走している様子（最も明るい）
    backgroundImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80"
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

  // Auto play functionality - 1→2→3→4→5→6と順番に進む
  useEffect(() => {
    if (!isAutoPlaying) return;

    // プログレスバーを更新（60ms × 50ステップ = 3秒）
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 2;
        if (next >= 100) {
          return 100; // 100で止める
        }
        return next;
      });
    }, 60);

    return () => clearInterval(progressInterval);
  }, [isAutoPlaying]);

  // プログレスが100になったら次のステップへ
  useEffect(() => {
    if (progress >= 100 && isAutoPlaying) {
      // 少し遅延を入れてから次へ進む
      const timer = setTimeout(() => {
        setDirection('next');
        setCurrentStep((prev) => {
          const nextStep = prev + 1;
          // 最後のステップに達したら自動再生を停止
          if (nextStep >= storySteps.length) {
            setIsAutoPlaying(false);
            return prev; // 最後のステップで止まる
          }
          return nextStep;
        });
        setProgress(0);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [progress, isAutoPlaying]);

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

  // セクションに到達したら自動再生を開始
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            setIsAutoPlaying(true);
            setProgress(0);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const currentStory = storySteps[currentStep];

  return (
    <>
      {/* Section Title - 映像の外側に配置 */}
      <section className="py-12 md:py-16 px-4 md:px-8 bg-gradient-to-b from-[#0b1220] via-[#1e293b] to-[#0b1220]">
        <div className="max-w-6xl mx-auto">
          <div className="relative flex justify-center">
            <div className="relative inline-block">
              <span className="section-bg-text left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 text-[32px] sm:text-[48px] md:text-[64px] lg:text-[96px] xl:text-[120px] text-white/25 absolute" style={{ opacity: 0.25 }}>PROCESS</span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center mb-2 relative">
                成果から逆算する設計プロセス
              </h2>
            </div>
          </div>
        </div>
      </section>

      <section 
        id="design-process"
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

        {/* Progress Indicators - ホバーで拡大・クリック可能を明示 */}
        <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
          {storySteps.map((step, index) => (
            <button
              key={index}
              onClick={() => { goToStep(index); setIsAutoPlaying(false); }}
              className={`relative h-2 md:h-2.5 rounded-full transition-all duration-300 cursor-pointer group ${
                index === currentStep 
                  ? "w-10 md:w-14 bg-[#fff100] shadow-lg shadow-yellow-500/30" 
                  : index < currentStep 
                    ? "w-8 md:w-10 bg-white/60 hover:bg-white/80" 
                    : "w-8 md:w-10 bg-white/30 hover:bg-white/50"
              } hover:scale-125 hover:h-3 active:scale-110`}
              aria-label={`ステップ ${index + 1}: ${step.title}`}
              title={`${index + 1}. ${step.title}`}
            >
              {index === currentStep && isAutoPlaying && (
                <div 
                  className="absolute inset-0 bg-[#fdc700] rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              )}
              {/* ホバー時にステップ番号を表示 */}
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-white/70 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-black/50 px-2 py-1 rounded">
                {index + 1}. {step.title}
              </span>
            </button>
          ))}
        </div>
        
        {/* Step Counter */}
        <p className="text-white/60 text-xs md:text-sm mb-4 md:mb-8">
          {currentStep + 1} / {storySteps.length}
        </p>

        {/* Card Container with Navigation Arrows */}
        <div className="flex items-center justify-center gap-4 md:gap-6 w-full max-w-4xl px-2 md:px-4">
          {/* Left Arrow */}
          <button
            onClick={(e) => { e.stopPropagation(); goToPrev(); setIsAutoPlaying(false); }}
            className="hidden md:flex w-12 lg:w-14 h-12 lg:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 items-center justify-center text-white hover:bg-white/30 hover:border-white/40 transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg cursor-pointer group flex-shrink-0"
            aria-label="前へ"
          >
            <svg className="w-5 lg:w-6 h-5 lg:h-6 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Glass Card with Slide Animation + Hover Effects */}
          <div 
            key={currentStep}
            className="flex-1 max-w-[95%] sm:max-w-lg md:max-w-2xl w-full bg-white/10 backdrop-blur-xl rounded-2xl md:rounded-3xl border border-white/20 p-6 sm:p-8 md:p-12 shadow-2xl cursor-pointer select-none group/card hover:bg-white/15 hover:border-white/30 hover:shadow-[0_25px_60px_-12px_rgba(255,241,0,0.25)] transition-all duration-300"
            style={{
              animation: direction === 'next' 
                ? 'storySlideInFromRight 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards'
                : 'storySlideInFromLeft 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards',
              willChange: 'transform, opacity, filter'
            }}
            onClick={() => { goToNext(); setIsAutoPlaying(false); }}
          >
          {/* Icon with Direction-based Animation + Hover Effect */}
          <div className="text-center mb-4 md:mb-6">
            <div 
              key={currentStep}
              className="mx-auto w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-white/90 group-hover/card:text-white group-hover/card:scale-110 transition-all duration-300"
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
              <Link
                href="/contact"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center gap-2 bg-[#fff100] hover:bg-[#fdc700] text-[#1a1a1a] font-medium px-6 md:px-8 py-3 md:py-4 rounded-full transition-all hover:scale-105 shadow-lg text-sm md:text-base"
              >
                無料相談する
                <svg className="w-4 md:w-5 h-4 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/works"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-6 md:px-8 py-3 md:py-4 rounded-full border border-white/30 transition-all hover:scale-105 text-sm md:text-base"
              >
                実績を見る
              </Link>
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

          {/* Right Arrow */}
          <button
            onClick={(e) => { e.stopPropagation(); goToNext(); setIsAutoPlaying(false); }}
            className="hidden md:flex w-12 lg:w-14 h-12 lg:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 items-center justify-center text-white hover:bg-white/30 hover:border-white/40 transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg cursor-pointer group flex-shrink-0"
            aria-label="次へ"
          >
            <svg className="w-5 lg:w-6 h-5 lg:h-6 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Navigation Hint */}
        <p className="text-white/40 text-xs md:text-sm mt-6 md:mt-8 text-center px-4">
          <span className="hidden md:inline">カードをクリック / 矢印キー / 上のタブで操作</span>
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
    </>
  );
}
