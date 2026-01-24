"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);
  const prevPathnameRef = useRef(pathname);

  useEffect(() => {
    // パスが変わった時のみトランジション
    if (prevPathnameRef.current !== pathname) {
      // スクロール位置をトップに（スムーズに）
      window.scrollTo({ top: 0, behavior: "smooth" });
      
      setIsTransitioning(true);
      
      // フェードアウト → フェードイン
      const fadeOutTimer = setTimeout(() => {
        setDisplayChildren(children);
        setIsTransitioning(false);
        prevPathnameRef.current = pathname;
      }, 180);

      return () => clearTimeout(fadeOutTimer);
    } else {
      // 初回レンダリング時は即座に表示
      setDisplayChildren(children);
    }
  }, [pathname, children]);

  return (
    <div
      className={`page-transition-wrapper gpu-accelerate ${
        isTransitioning 
          ? "page-exit-active" 
          : "page-enter-active"
      }`}
    >
      {displayChildren}
    </div>
  );
}

// スムーズなページローダー
export function PageLoader() {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();
  const prevPathnameRef = useRef(pathname);

  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      setIsLoading(true);
      setProgress(0);
      
      // プログレスバーアニメーション
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 30);

      // 完了
      const completeTimer = setTimeout(() => {
        setProgress(100);
        setTimeout(() => {
          setIsLoading(false);
          setProgress(0);
          prevPathnameRef.current = pathname;
        }, 200);
      }, 300);

      return () => {
        clearInterval(progressInterval);
        clearTimeout(completeTimer);
      };
    }
  }, [pathname]);

  if (!isLoading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-1 bg-[#fff100]/10">
      <div 
        className="h-full bg-[#fff100] transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
