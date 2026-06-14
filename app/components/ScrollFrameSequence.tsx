"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

type Fit = "cover" | "contain";

interface ScrollFrameSequenceProps {
  /** フレーム総数（build-scroll-frames.mjs の出力 frameCount を渡す） */
  frameCount: number;
  /** 画像ディレクトリ（/public からのパス） */
  basePath?: string;
  /** 初期表示用ポスター画像名 */
  poster?: string;
  /** 再生しきるのに使うスクロール量（vh）。大きいほどゆっくり再生 */
  scrollSpanVh?: number;
  /** 描画フィット。ロゴは contain 推奨 */
  fit?: Fit;
  /** ステージ背景色（動画の地色に合わせる） */
  background?: string;
  /** 隣接フレームをブレンドして少ない枚数でも滑らかに見せる */
  crossfade?: boolean;
  /** 描画アンカー（0..1）。cover で寄せたい位置 */
  focusX?: number;
  focusY?: number;
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
  basePath = "/scroll-frames-logo",
  poster = "frame-001.jpg",
  scrollSpanVh = 300,
  fit = "contain",
  background = "#ffffff",
  crossfade = true,
  focusX = 0.5,
  focusY = 0.5,
  className = "",
}: ScrollFrameSequenceProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const paintRef = useRef<(() => void) | null>(null);
  const [ready, setReady] = useState(false);
  // reduced-motion 時はスクロール量を切り詰める（静止1枚に長距離スクロールさせない）
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

    // 指定 index 以下で最も近いデコード済みフレームを返す（プリロード途中の歯抜け対策）
    const nearestLoaded = (idx: number) => {
      let i = Math.min(idx, frameCount - 1);
      while (i > 0 && !(images[i] && images[i].naturalWidth > 0)) i--;
      return images[i] && images[i].naturalWidth > 0 ? i : -1;
    };

    // セクション内でのスクロール進捗 0→1（sticky 子が貼り付いている間に 0→1 を消化）
    const getProgress = () => {
      const rect = section.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      if (travel <= 0) return 0;
      return Math.min(1, Math.max(0, -rect.top / travel));
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

      ctx.fillStyle = background;
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
      const dpr = Math.min(2, window.devicePixelRatio || 1); // DPR 上限2で高解像度端末の負荷を抑える
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

    // reduced-motion: 最終フレーム1枚だけ読み込み静止表示（シーケンス再生しない）
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

    // 通常: 全フレームをプリロード（先頭 high / 残り low、各 decode 完了を待つ）
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
  }, [frameCount, basePath, fit, background, crossfade, focusX, focusY, reduceMotion]);

  // Lenis のスクロール（rAF）に同期して再描画。Provider が無ければ発火しないだけで安全
  useLenis(() => {
    paintRef.current?.();
  });

  const spanVh = reduceMotion ? 100 : scrollSpanVh;
  const objectFit = fit === "cover" ? "object-cover" : "object-contain";

  return (
    <section
      ref={sectionRef}
      className={`relative ${className}`}
      style={{ height: `${spanVh}vh`, background }}
      aria-hidden="true"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ background }}>
        <canvas ref={canvasRef} className="block h-full w-full" />
        {/* canvas が描けるまでの初期表示（poster） */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${basePath}/${poster}`}
          alt=""
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 h-full w-full ${objectFit} transition-opacity duration-500`}
          style={{ opacity: ready ? 0 : 1, background }}
        />
      </div>
    </section>
  );
}
