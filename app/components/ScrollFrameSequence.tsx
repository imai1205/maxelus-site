"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

type Fit = "cover" | "contain";

interface ScrollFrameSequenceProps {
  /** フレーム総数（build-scroll-frames.mjs の出力 frameCount を渡す） */
  frameCount: number;
  /** 背景の前面に重ねるコンテンツ。このコンテンツのスクロール範囲で 0→1 を消化し、末尾でロゴが完成する */
  children: ReactNode;
  /** 画像ディレクトリ（/public からのパス） */
  basePath?: string;
  /** 初期表示用ポスター画像名 */
  poster?: string;
  /** 描画フィット。背景ロゴは contain 推奨 */
  fit?: Fit;
  /** 隣接フレームをブレンドして少ない枚数でも滑らかに見せる */
  crossfade?: boolean;
  /** 描画アンカー（0..1） */
  focusX?: number;
  focusY?: number;
  /** 白地を抜いてロゴだけ背景に乗せるなら "multiply" */
  blendMode?: "normal" | "multiply";
  /** 背景キャンバスの不透明度（前面コンテンツの可読性に合わせて下げる） */
  canvasOpacity?: number;
  /** 進捗の開始位置。ゾーン上端が画面の何割の高さに来たら 0 を始めるか（0=上端で開始 / 大きいほど早く＝下に見えた時点から開始） */
  startRatio?: number;
  className?: string;
}

const pad3 = (n: number) => String(n).padStart(3, "0");

const buildFrameUrl = (base: string, index: number, isMobile: boolean, ext: string) =>
  `${base}/frame-${pad3(index + 1)}${isMobile ? ".mobile" : ""}.${ext}`;

// 1×1 の AVIF を読めるかでランタイム判定（非対応なら WebP にフォールバック）
function supportsAvif(): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src =
      "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=";
  });
}

export default function ScrollFrameSequence({
  frameCount,
  children,
  basePath = "/scroll-frames-logo",
  poster = "frame-001.jpg",
  fit = "contain",
  crossfade = true,
  focusX = 0.5,
  focusY = 0.5,
  blendMode = "multiply",
  canvasOpacity = 1,
  startRatio = 0,
  className = "",
}: ScrollFrameSequenceProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const paintRef = useRef<(() => void) | null>(null);
  const [ready, setReady] = useState(false);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = reduceMotion;
    const isMobile = window.matchMedia("(max-width: 799.98px)").matches;

    let cssW = 0;
    let cssH = 0;
    let lastIndex = -1;
    let disposed = false;
    const images: HTMLImageElement[] = new Array(frameCount);

    const drawImageFit = (img: HTMLImageElement, alpha: number) => {
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      if (!iw || !ih) return;
      const scale =
        fit === "cover" ? Math.max(cssW / iw, cssH / ih) : Math.min(cssW / iw, cssH / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      ctx.globalAlpha = alpha;
      ctx.drawImage(img, (cssW - dw) * focusX, (cssH - dh) * focusY, dw, dh);
      ctx.globalAlpha = 1;
    };

    // 指定 index 以下で最も近いデコード済みフレーム（プリロード途中の歯抜け対策）
    const nearestLoaded = (idx: number) => {
      let i = Math.min(idx, frameCount - 1);
      while (i > 0 && !(images[i] && images[i].naturalWidth > 0)) i--;
      return images[i] && images[i].naturalWidth > 0 ? i : -1;
    };

    // 前面コンテンツのスクロール進捗 0→1
    // （ゾーン上端が画面の startRatio の高さに来たら開始 → ゾーン下端が画面下端で完成）
    const getProgress = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const startTop = vh * startRatio; // この rect.top で progress 0 を開始
      const travel = startTop + rect.height - vh;
      if (travel <= 0) return 0;
      return Math.min(1, Math.max(0, (startTop - rect.top) / travel));
    };

    const paint = () => {
      if (cssW === 0 || cssH === 0) return;
      const progress = reduce ? 1 : getProgress();
      const target = progress * (frameCount - 1);
      const base = crossfade
        ? Math.min(frameCount - 1, Math.max(0, Math.floor(target)))
        : Math.min(frameCount - 1, Math.max(0, Math.round(target)));

      if (!crossfade && base === lastIndex) return; // 同一フレームは再描画しない

      const baseIdx = nearestLoaded(base);
      if (baseIdx < 0) return; // まだ1枚も読めていない → poster のまま

      // 白地で塗りつぶし → mix-blend-mode:multiply 側で白が抜け、ロゴだけが背景に乗る
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, cssW, cssH);
      drawImageFit(images[baseIdx], 1);

      if (crossfade && base + 1 < frameCount) {
        const frac = target - base;
        const next = images[base + 1];
        if (frac > 0.01 && next && next.naturalWidth > 0) drawImageFit(next, frac);
      }
      lastIndex = base;
    };
    paintRef.current = paint;

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1); // DPR 上限2
      const rect = canvas.getBoundingClientRect();
      cssW = rect.width;
      cssH = rect.height;
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      lastIndex = -1;
      paint();
    };
    window.addEventListener("resize", resize, { passive: true });

    // reduced-motion: 最終フレーム1枚だけ読み込み、完成形を静止背景として表示
    if (reduce) {
      (async () => {
        const ext = (await supportsAvif()) ? "avif" : "webp";
        if (disposed) return;
        const img = new Image();
        img.src = buildFrameUrl(basePath, frameCount - 1, isMobile, ext);
        try {
          await img.decode();
        } catch {}
        if (disposed) return;
        images[frameCount - 1] = img;
        resize();
        setReady(true);
      })();
      return () => {
        disposed = true;
        window.removeEventListener("resize", resize);
        paintRef.current = null;
      };
    }

    // 通常: 全フレームをプリロード（先頭 high / 残り low、各 decode を待つ）
    let decoded = 0;
    const revealAt = Math.max(1, Math.floor(frameCount * 0.1)); // 約10%で表示開始
    (async () => {
      const ext = (await supportsAvif()) ? "avif" : "webp";
      if (disposed) return;
      resize();
      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.decoding = "async";
        (img as HTMLImageElement & { fetchPriority?: string }).fetchPriority =
          i === 0 ? "high" : "low";
        img.src = buildFrameUrl(basePath, i, isMobile, ext);
        images[i] = img;
        img
          .decode()
          .then(() => {
            if (disposed) return;
            decoded++;
            if (decoded >= revealAt) setReady(true);
            paint();
          })
          .catch(() => {});
      }
    })();

    return () => {
      disposed = true;
      window.removeEventListener("resize", resize);
      paintRef.current = null;
    };
  }, [frameCount, basePath, fit, crossfade, focusX, focusY, startRatio, reduceMotion]);

  // Lenis のスクロール(rAF)に同期して再描画。Provider が無ければ発火しないだけで安全
  useLenis(() => {
    paintRef.current?.();
  });

  const objectFit = fit === "cover" ? "object-cover" : "object-contain";

  return (
    <section ref={sectionRef} className={`relative ${className}`}>
      {/* 背景: 画面に貼り付くロゴキャンバス（前面コンテンツの後ろで組み上がる） */}
      <div
        className="pointer-events-none sticky top-0 h-screen w-full overflow-hidden"
        style={{ mixBlendMode: blendMode, opacity: canvasOpacity }}
        aria-hidden="true"
      >
        <canvas ref={canvasRef} className="block h-full w-full" />
        {/* canvas が描けるまでの初期表示（poster） */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${basePath}/${poster}`}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full ${objectFit} transition-opacity duration-500`}
          style={{ opacity: ready ? 0 : 1 }}
        />
      </div>
      {/* 前面コンテンツ（背景キャンバスの上に重ねる） */}
      <div className="relative z-10 -mt-[100vh]">{children}</div>
    </section>
  );
}
