"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";

interface StoryStep {
  title: string;
  description: string;
  backgroundImage: string;
}

const storySteps: StoryStep[] = [
  {
    // 1. 課題
    title: "課題",
    description: "「システム開発を依頼したいけど、完成イメージが分からない」「途中で認識のズレが発生し、手戻りが発生」「予算オーバーで困った経験がある」",
    // 頭を抱える・ストレス・困っている様子（暗めのトーン）
    backgroundImage: "https://images.unsplash.com/photo-1541199249251-f713e6145474?auto=format&fit=crop&w=1920&q=80"
  },
  {
    // 2. 無料相談
    title: "無料相談",
    description: "まずは課題を整理するところから。あなたのビジネスの課題をヒアリングし、システム化すべきポイントを一緒に見つけていきます。相談は完全無料です。",
    // ミーティング・対面で相談している様子
    backgroundImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1920&q=80"
  },
  {
    // 3. デモ提示
    title: "デモ提示",
    description: "打合せ後、すぐに画面デモを作成。実際に触りながら認識を合わせるから、ズレが起きにくい。見積りも明確で安心です。",
    // スマホ・タブレットでデモ画面を見せている様子
    backgroundImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1920&q=80"
  },
  {
    // 4. 発注（握手）
    title: "発注",
    description: "デモで合意した内容をベースに、正式発注。見積りも明確で、追加費用の心配もありません。パートナーとして一緒にプロジェクトをスタートします。",
    // 握手・契約・パートナーシップ成立の様子
    backgroundImage: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1920&q=80"
  },
  {
    // 5. 開発
    title: "開発",
    description: "詳細設計を確定し、開発を進めます。進捗は随時共有し、透明性のあるプロセスで進行。いつでも確認できる状態をキープします。",
    // コーディング・開発中の様子
    backgroundImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1920&q=80"
  },
  {
    // 6. 納品・運用
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
            <span className="text-xl lg:text-2xl font-bold group-hover:-translate-x-0.5 transition-transform select-none" aria-hidden="true">←</span>
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
          {/* Step Number with Direction-based Animation + Hover Effect */}
          <div className="text-center mb-4 md:mb-6">
            <div
              key={currentStep}
              className="mx-auto text-white/90 group-hover/card:text-white group-hover/card:scale-110 transition-all duration-300"
              style={{
                animation: direction === 'next'
                  ? 'storyIconSlideRight 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards'
                  : 'storyIconSlideLeft 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards',
                filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))'
              }}
            >
              <span className="block text-4xl sm:text-5xl md:text-6xl font-bold tracking-[0.2em] tabular-nums">0{currentStep + 1}</span>
              <span className="block mx-auto mt-3 h-px w-12 bg-[#fff100]" />
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
              {isAutoPlaying ? "一時停止" : "ストーリーを開始"}
            </button>
          ) : currentStep === storySteps.length - 1 ? (
            <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
              <Link
                href="/contact"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center bg-[#fff100] hover:bg-[#fdc700] text-[#1a1a1a] font-medium px-6 md:px-8 py-3 md:py-4 rounded-full transition-all hover:scale-105 shadow-lg text-sm md:text-base"
              >
                無料相談する
              </Link>
              <Link
                href="/services"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-medium px-6 md:px-8 py-3 md:py-4 rounded-full border border-white/30 transition-all hover:scale-105 text-sm md:text-base"
              >
                サービスを見る
              </Link>
            </div>
          ) : (
            <button
              onClick={(e) => { e.stopPropagation(); toggleAutoPlay(); }}
              className="mx-auto flex items-center gap-2 md:gap-3 bg-white/10 hover:bg-white/20 text-white font-medium px-6 md:px-8 py-3 md:py-4 rounded-full border border-white/30 transition-all hover:scale-105 text-sm md:text-base"
            >
              {isAutoPlaying ? "一時停止" : "自動再生"}
            </button>
          )}
          </div>

          {/* Right Arrow */}
          <button
            onClick={(e) => { e.stopPropagation(); goToNext(); setIsAutoPlaying(false); }}
            className="hidden md:flex w-12 lg:w-14 h-12 lg:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 items-center justify-center text-white hover:bg-white/30 hover:border-white/40 transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg cursor-pointer group flex-shrink-0"
            aria-label="次へ"
          >
            <span className="text-xl lg:text-2xl font-bold group-hover:translate-x-0.5 transition-transform select-none" aria-hidden="true">→</span>
          </button>
        </div>

        {/* Navigation Hint */}
        <p className="text-white/40 text-xs md:text-sm mt-6 md:mt-8 text-center px-4">
          <span className="hidden md:inline">カードをクリック / 矢印キー / 上のタブで操作</span>
          <span className="md:hidden">← スワイプで移動 / タップで次へ →</span>
        </p>
        
      </div>
    </section>
    </>
  );
}
