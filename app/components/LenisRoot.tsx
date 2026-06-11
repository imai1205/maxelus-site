"use client";

import { ReactNode, useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Lenis のスクロールイベントを ScrollTrigger に同期する
function ScrollTriggerSync() {
  useLenis(() => ScrollTrigger.update());
  return null;
}

// トップページ専用のスムーズスクロール基盤。
// サイト全体には張らない (下層の framer-motion / scroll-behavior と干渉させない)。
// unmount 時に ScrollTrigger を破棄し、下層へ持ち込まない。
export default function LenisRoot({ children }: { children: ReactNode }) {
  useEffect(() => {
    return () => {
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <ReactLenis root>
      <ScrollTriggerSync />
      {children}
    </ReactLenis>
  );
}
