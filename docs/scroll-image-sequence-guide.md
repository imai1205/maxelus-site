# スクロール駆動の画像シーケンス背景 実装手順書

1 本の動画を連番画像（フレーム）に分解し、**スクロール量に同期して 1 フレームずつ canvas に描画**することで「スクロールすると動画が再生されるように見える背景演出」を実装する手順書。スムーズスクロールは **Lenis**、画像変換は **ffmpeg + sharp** を使う。

この手順書は maxelus-site のトップページ（`app/page.tsx`）に実装済みの構成を土台にした、**ゼロから再現できる実行手順**である。各ステップに「目的 / コード or コマンド / 確認方法」を付ける。

- **実装済みの実ファイル**（このリポジトリに実体あり）:
  - `scripts/build-scroll-frames.mjs` — 動画 → 連番画像変換（Step 2）
  - `app/components/usePrefersReducedMotion.ts` — reduced-motion 共通フック（Step 3）
  - `app/components/ScrollFrameSequence.tsx` — canvas 描画コンポーネント（Step 4）
  - `app/page.tsx` — 配置 + Lenis ラップ（Step 5）
  - `public/scroll-frames-logo/` — 生成された画像（96 枚 × 4 形式 + poster + manifest.json）

---

## 対象スタック

- **フレームワーク**: Next.js 16 (App Router) + React 19 / TypeScript
- **スムーズスクロール**: lenis 1.3.23（`lenis/react` の `ReactLenis root` + `useLenis`）
- **画像変換**: ffmpeg（動画分解）+ sharp（フォーマット変換）

---

## 入力パラメータ（手順書冒頭で変数として定義）

| 変数 | 今回の実値 | 説明 |
|---|---|---|
| `SOURCE_VIDEO` | `.context/.../download (9).mp4`（4.8 秒 / 30fps / 1920×1080） | 元動画 |
| `FPS` | 20 | 抽出フレームレート |
| `FRAME_COUNT` | 96（`≈ 4.8 秒 × 20`） | 最終フレーム枚数 |
| `OUT_DIR` | `public/scroll-frames-logo` | 出力先 |
| `DESKTOP_WIDTH` / `MOBILE_WIDTH` | 1280 / 854 | 書き出し横幅 |
| `SCROLL_SPAN` | 300vh | 再生しきるのに使うスクロール量（ステージ高さ） |
| `FIT` | contain | 描画フィット（ロゴは contain。全面背景は cover） |

### フレーム枚数の決め方

- 目安は `FRAME_COUNT ≈ 動画秒数 × FPS`。滑らかさと容量のトレードオフで **60〜150 枚**を推奨。
- 足りない滑らかさは Step 4 の **crossfade 補間**（隣接フレームのブレンド）で補える。**枚数を増やす前に crossfade を検討**する。

---

## Step 0（前提）: ffmpeg を用意する

- **目的**: 動画からフレームを抽出するために ffmpeg が必要。
- **コマンド**:
  ```bash
  # macOS
  brew install ffmpeg
  ffmpeg -version   # 確認
  ```
- **確認方法**: `ffmpeg -version` がバージョンを表示する。

---

## Step 1: 依存パッケージを追加する

- **目的**: ランタイム用に lenis、ビルド用に sharp を入れる。
- **コマンド**:
  ```bash
  npm i lenis          # スムーズスクロール（lenis/react を含む）
  npm i -D sharp       # 画像変換（ビルド時のみ使用）
  ```
- **確認方法**:
  ```bash
  node -e "require('fs').accessSync('node_modules/lenis/dist/lenis.css')" && echo "lenis css OK"
  ```
  `lenis/react`（`ReactLenis` / `useLenis`）と `lenis/dist/lenis.css` が解決できること。
  > ⚠️ lenis は `package.json` の `exports` 制限で `require('lenis/package.json')` 等の直接アクセスは不可。ただし CSS は `"./dist/*"` パターン経由で `import "lenis/dist/lenis.css"` が通る（Step 5 で使用）。

---

## Step 2 (A): 動画 → 連番画像へ分解する（ビルド時・1 回だけ）

- **目的**: 動画を「中間 PNG（ロスレス）」に分解し、sharp で **4 バリアント（webp/avif × desktop/mobile）+ poster** に変換する。**枚数 × 4 形式がそのままリポジトリ容量**になる点に注意。
- **コード**: `scripts/build-scroll-frames.mjs`

  ```js
  // 動画 → スクロール同期用の連番画像（4バリアント + poster）を生成するビルドスクリプト。
  // 使い方:
  //   node scripts/build-scroll-frames.mjs
  //   SOURCE_VIDEO="path/to/video.mp4" FPS=20 OUT_DIR="public/scroll-frames-logo" node scripts/build-scroll-frames.mjs
  // 前提: ffmpeg が PATH 上にあること。sharp は devDependency。

  import { execFileSync } from "node:child_process";
  import { mkdirSync, rmSync, readdirSync, writeFileSync, statSync, existsSync } from "node:fs";
  import path from "node:path";
  import os from "node:os";
  import sharp from "sharp";

  // ---- パラメータ（環境変数で上書き可） ----
  const SOURCE_VIDEO = process.env.SOURCE_VIDEO || ".context/attachments/0h409V/download (9).mp4";
  const FPS = Number(process.env.FPS || 20);
  const OUT_DIR = process.env.OUT_DIR || "public/scroll-frames-logo";
  const DESKTOP_WIDTH = Number(process.env.DESKTOP_WIDTH || 1280);
  const MOBILE_WIDTH = Number(process.env.MOBILE_WIDTH || 854);

  // バリアント定義（手順書 A-2 の表と一致）
  const VARIANTS = [
    { suffix: "", width: DESKTOP_WIDTH, format: "webp", quality: 90, effort: 6 },
    { suffix: "", width: DESKTOP_WIDTH, format: "avif", quality: 68, effort: 6 },
    { suffix: ".mobile", width: MOBILE_WIDTH, format: "webp", quality: 86, effort: 6 },
    { suffix: ".mobile", width: MOBILE_WIDTH, format: "avif", quality: 62, effort: 6 },
  ];

  const pad3 = (n) => String(n).padStart(3, "0");
  const kb = (bytes) => `${(bytes / 1024).toFixed(1)}KB`;

  async function main() {
    if (!existsSync(SOURCE_VIDEO)) {
      console.error(`[build-scroll-frames] SOURCE_VIDEO が見つかりません: ${SOURCE_VIDEO}`);
      process.exit(1);
    }
    rmSync(OUT_DIR, { recursive: true, force: true });
    mkdirSync(OUT_DIR, { recursive: true });

    // ① ffmpeg でロスレス中間 PNG を抽出
    const tmpDir = path.join(os.tmpdir(), `scroll-frames-${process.pid}`);
    rmSync(tmpDir, { recursive: true, force: true });
    mkdirSync(tmpDir, { recursive: true });

    console.log(`[build-scroll-frames] ffmpeg 抽出: fps=${FPS}, width=${DESKTOP_WIDTH}`);
    try {
      execFileSync(
        "ffmpeg",
        [
          "-y", "-loglevel", "error",
          "-i", SOURCE_VIDEO,
          // fps=N で間引き、scale=W:-2 で横幅固定・縦をアスペクト比維持で偶数に丸める（-2 が偶数丸め）
          "-vf", `fps=${FPS},scale=${DESKTOP_WIDTH}:-2`,
          path.join(tmpDir, "frame-%03d.png"),
        ],
        { stdio: ["ignore", "inherit", "inherit"] }
      );
    } catch (e) {
      console.error("[build-scroll-frames] ffmpeg 実行に失敗。インストールを確認してください（brew install ffmpeg）。");
      process.exit(1);
    }

    const pngs = readdirSync(tmpDir).filter((f) => f.endsWith(".png")).sort();
    const frameCount = pngs.length;
    if (frameCount === 0) {
      console.error("[build-scroll-frames] 中間 PNG が 0 枚。SOURCE_VIDEO / FPS を確認してください。");
      process.exit(1);
    }
    console.log(`[build-scroll-frames] 中間 PNG: ${frameCount} 枚`);

    // ② sharp で各 PNG を 4 バリアントに変換
    let totalBytes = 0;
    const bytesByFormat = {};
    for (let i = 0; i < pngs.length; i++) {
      const srcPath = path.join(tmpDir, pngs[i]);
      const idx = pad3(i + 1); // 1 始まりで再採番（欠番を防ぐ）
      const input = sharp(srcPath);
      for (const v of VARIANTS) {
        const outName = `frame-${idx}${v.suffix}.${v.format}`;
        const outPath = path.join(OUT_DIR, outName);
        let pipe = input.clone().resize({ width: v.width, fit: "inside", withoutEnlargement: true });
        pipe = v.format === "avif"
          ? pipe.avif({ quality: v.quality, effort: v.effort })
          : pipe.webp({ quality: v.quality, effort: v.effort });
        await pipe.toFile(outPath);
        const size = statSync(outPath).size;
        totalBytes += size;
        const key = `${v.suffix || "desktop"}.${v.format}`;
        bytesByFormat[key] = (bytesByFormat[key] || 0) + size;
      }
    }

    // ③ poster（初期表示用の軽量 1 枚）を frame-001 から生成
    const posterName = "frame-001.jpg";
    await sharp(path.join(tmpDir, pngs[0]))
      .resize({ width: DESKTOP_WIDTH, fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 70, progressive: true })
      .toFile(path.join(OUT_DIR, posterName));

    // ④ manifest.json を出力（コンポーネントが frameCount などを参照）
    const manifest = {
      frameCount, fps: FPS, desktopWidth: DESKTOP_WIDTH, mobileWidth: MOBILE_WIDTH,
      basePath: `/${OUT_DIR.replace(/^public\//, "")}`, poster: posterName, source: path.basename(SOURCE_VIDEO),
    };
    writeFileSync(path.join(OUT_DIR, "manifest.json"), JSON.stringify(manifest, null, 2));

    rmSync(tmpDir, { recursive: true, force: true });

    console.log("\n[build-scroll-frames] 完了");
    console.log(`  frameCount : ${frameCount}`);
    console.log(`  total size : ${(totalBytes / 1024 / 1024).toFixed(2)}MB（poster 除く）`);
    for (const [k, v] of Object.entries(bytesByFormat)) {
      console.log(`    ${k.padEnd(14)}: ${kb(v / frameCount)}/枚 × ${frameCount} = ${(v / 1024 / 1024).toFixed(2)}MB`);
    }
    console.log(`\n  → <ScrollFrameSequence frameCount={${frameCount}} /> に反映してください。`);
  }

  main().catch((e) => { console.error(e); process.exit(1); });
  ```

- **実行**:
  ```bash
  node scripts/build-scroll-frames.mjs
  # 別の動画なら: SOURCE_VIDEO="path/to/video.mp4" node scripts/build-scroll-frames.mjs
  ```
- **確認方法**:
  ```bash
  ls public/scroll-frames-logo | head            # frame-001.avif / .webp / .mobile.* / frame-001.jpg
  cat public/scroll-frames-logo/manifest.json    # frameCount を確認 → コンポーネントへ反映
  du -sh public/scroll-frames-logo               # 容量確認（今回 ≈ 4MB / 96枚）
  ```
  命名は `frame-NNN`（**3 桁ゼロ詰め・1 始まり**）。出力例: `frame-001.avif` / `frame-001.webp` / `frame-001.mobile.avif` / `frame-001.mobile.webp` / `frame-001.jpg`(poster)。
  - **容量の目安**: 今回は白背景＋単純なロゴのため軽量（avif desktop ≈ 9.5KB/枚）。一般には avif desktop 30〜50KB/枚 → 120 枚 × 4 形式で 10〜15MB 程度を見込む。

---

## Step 3 (B/G の一部): reduced-motion 共通フックを作る

- **目的**: `prefers-reduced-motion` を **SSR セーフ**に購読する。Lenis のマウント要否（Step 5）と、シーケンス再生の要否（Step 4）の両方で使う。`useEffect` 内 `setState` を避けるのがポイント（後述の落とし穴参照）。
- **コード**: `app/components/usePrefersReducedMotion.ts`

  ```ts
  "use client";

  import { useSyncExternalStore } from "react";

  const QUERY = "(prefers-reduced-motion: reduce)";

  // prefers-reduced-motion を SSR セーフに購読する。
  // useEffect 内 setState（cascading renders）を避けるため useSyncExternalStore を使う。
  export function usePrefersReducedMotion(): boolean {
    return useSyncExternalStore(
      (onChange) => {
        const mq = window.matchMedia(QUERY);
        mq.addEventListener("change", onChange);
        return () => mq.removeEventListener("change", onChange);
      },
      () => window.matchMedia(QUERY).matches, // クライアント側スナップショット
      () => false                              // サーバー側スナップショット（reduce なし扱い）
    );
  }
  ```
- **確認方法**: `npx tsc --noEmit` が通る。OS の「視差効果を減らす」を ON にして Step 6 で静止表示になることを後で確認。

---

## Step 4 (B/C/E): canvas 描画コンポーネントを作る

- **目的**: フォーマット選択（B）+ プリロードと初期表示（C）+ canvas 描画（E）を 1 ファイルに。**特定セクションに同期する sticky 方式**を採る（ヒーロー直後に置き、ステージを通過する間にロゴが完成）。
  - **B**: 1×1 AVIF を `new Image()` で読ませて対応判定 → 非対応は WebP。モバイルは `(max-width: 799.98px)` で `.mobile` セットへ。
  - **C**: 全フレームを `new Image()` で先読み（先頭のみ `fetchPriority='high'`、残り `'low'`、各 `img.decode()` を待つ）。**デコードが約 10% に達したら表示開始**。それまでは poster を出す。
  - **E**: `dpr = min(2, devicePixelRatio)` で canvas 解像度を設定（**DPR 上限 2**）。cover/contain のフィット計算で中央寄せ。同一フレームは再描画スキップ。**crossfade**（隣接フレームを `globalAlpha` でブレンド）で少ない枚数でも滑らかに。
- **コード**: `app/components/ScrollFrameSequence.tsx`

  ```tsx
  "use client";

  import { useEffect, useRef, useState } from "react";
  import { useLenis } from "lenis/react";
  import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

  type Fit = "cover" | "contain";

  interface ScrollFrameSequenceProps {
    frameCount: number;        // build-scroll-frames.mjs の出力 frameCount
    basePath?: string;         // /public からのパス
    poster?: string;           // 初期表示用ポスター
    scrollSpanVh?: number;     // 再生に使うスクロール量(vh)。大きいほどゆっくり
    fit?: Fit;                 // ロゴは contain 推奨
    background?: string;       // ステージ背景色（動画の地色に合わせる）
    crossfade?: boolean;       // 隣接フレームをブレンド
    focusX?: number;           // 描画アンカー(0..1)
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

      // セクション内でのスクロール進捗 0→1（sticky 子が貼り付いている間に消化）
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

      // reduced-motion: 最終フレーム1枚だけ読み込み静止表示
      if (reduce) {
        (async () => {
          const ext = (await supportsAvif()) ? "avif" : "webp";
          if (disposed) return;
          const img = new Image();
          img.src = buildFrameUrl(basePath, frameCount - 1, isMobile, ext);
          try { await img.decode(); } catch {}
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
          img.decode()
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

    // Lenis のスクロール(rAF)に同期して再描画。Provider が無ければ発火しないだけで安全
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
  ```

- **確認方法**: `npx tsc --noEmit` と `npx eslint app/components/ScrollFrameSequence.tsx` が通る。

---

## Step 5 (D/F): Lenis 連携とページへの配置

- **目的**: `ReactLenis root` をマウントして `useLenis` を発火させ（D）、ヒーロー直後にステージを置く（F）。`SCROLL_SPAN`（= `scrollSpanVh`）の高さでスクロール量を稼ぐ。
- **進捗 → フレーム番号**: 本実装は**特定セクション同期**。`ScrollFrameSequence` 内の `getProgress()` が `section.getBoundingClientRect()` から 0→1 を算出し、`frameIndex = round(progress × (FRAME_COUNT−1))`（crossfade 時は `floor` + 小数で隣接ブレンド）に変換する。
  - ※**ページ全体に同期**したい場合は `progress = scroll / (scrollHeight − innerHeight)` を使い、ステージを `position: fixed; inset: 0; z-index: -1` にする方式に置き換える。
- **コード**: `app/page.tsx`（要点の差分）

  ```tsx
  "use client";

  import { ReactLenis } from "lenis/react";
  import "lenis/dist/lenis.css"; // html{scroll-behavior:smooth} との競合を解消（.lenis-smooth で auto 化）
  import ScrollFrameSequence from "./components/ScrollFrameSequence";
  import { usePrefersReducedMotion } from "./components/usePrefersReducedMotion";
  // ... 既存 import

  export default function Home() {
    // reduced-motion のユーザーには Lenis（慣性スクロール）を適用しない
    const reduceMotion = usePrefersReducedMotion();

    const content = (
      <div className="min-h-screen font-sans overflow-x-clip">{/* ← overflow-x-hidden だと sticky が壊れる */}
        <main className="pt-14 md:pt-16">
          <HeroSection />
          {/* スクロール同期のブランドロゴ演出（白背景） */}
          <ScrollFrameSequence frameCount={96} />
          <BusinessPreview />
          <CasesPreview />
          <ApproachSection />
          <ContactCTA />
        </main>
        <Footer />
      </div>
    );

    // Lenis はトップページにいる間だけマウント（他ページは現状のネイティブスクロールを維持）
    return reduceMotion ? content : (
      <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }}>
        {content}
      </ReactLenis>
    );
  }
  ```

- **確認方法**:
  ```bash
  npm run build      # ビルド成功（/ が Static prerender される）
  ```

---

## Step 6: 動作確認

- **目的**: 実機でスクロール演出・sticky・エラー有無を確認する。
- **コマンド**:
  ```bash
  PORT=3100 npm run dev
  # ブラウザで http://localhost:3100 を開く
  ```
- **確認方法（チェックリスト）**:
  - [ ] 初期表示でヒーローが出る（canvas 前は poster 表示）
  - [ ] 下にスクロールするとステージで canvas にフレームが描画され、進むほどロゴが完成する
  - [ ] スクロール中、ステージ（sticky 子）が画面に貼り付く（`canvas` の親の `getBoundingClientRect().top` が 0 付近）
  - [ ] ステージ通過後、次セクションへ自然に遷移する
  - [ ] DevTools Console にエラーが無い
  - [ ] OS の「視差効果を減らす」ON で、シーケンス再生が止まり静止 1 枚になる
  - 進捗とフレームの対応確認（DevTools Console）:
    ```js
    // 任意位置で実行。sticky.top が 0 付近なら sticky OK
    const c = document.querySelector("canvas"); const s = c.parentElement;
    console.log({ scrollY: Math.round(scrollY), stickyTop: Math.round(s.getBoundingClientRect().top) });
    ```

---

## 調整パラメータ早見表

| パラメータ | 上げる / 増やすと | 下げる / 減らすと | 既定 |
|---|---|---|---|
| `FPS` | 滑らか / 容量増 | カクつき / 容量減 | 20 |
| `FRAME_COUNT`（枚数） | 滑らか / 容量・通信増 | 容量減（crossfade で補える） | 60〜150（今回 96） |
| `DESKTOP_WIDTH` / `MOBILE_WIDTH` | 高精細 / 容量増 | 粗い / 容量減 | 1280 / 854 |
| webp / avif `quality` | 高画質 / 容量増 | 劣化 / 容量減 | webp 90·86 / avif 68·62 |
| `scrollSpanVh`（SCROLL_SPAN） | ゆっくり再生（スクロール量大） | 速く再生 | 300vh |
| `fit` | cover=全面・端が欠ける / contain=全体表示・余白 | — | contain（ロゴ） |
| `crossfade` | 滑らか（隣接ブレンド）/ 残像感 | くっきり / カクつき | true |
| DPR 上限 | 高精細 / 描画負荷増 | 軽い / 粗い | 2 |

### 容量の目安
- **枚数 × 4 形式 = リポジトリ容量**。今回は白背景＋単純ロゴで avif desktop ≈ 9.5KB/枚、合計約 4MB（96 枚）。
- 一般的な実写では avif desktop 30〜50KB/枚 → 120 枚 × 4 形式で 10〜15MB を見込む。滑らかさが足りなければ枚数を増やす前に crossfade を検討。
- **メモリ**: 全フレームをデコード済みで常駐させるため、枚数を増やしすぎると通信量・メモリが膨らむ。早見表の容量目安を守る。

---

## よくある落とし穴

### 今回この実装で実際に踏んだもの
- **`overflow-x-hidden` が `position: sticky` を壊す**: 親に `overflow-x: hidden` があると暗黙のスクロールコンテナになり、子の sticky が機能しない（ステージが画面に貼り付かず流れる）。**`overflow-x-clip`** を使う（clip はスクロールコンテナを生成しないため sticky を壊さず、横はみ出し防止は維持できる）。
- **React 19 の `set-state-in-effect` ルール**: `useEffect` 内で同期的に `setState` すると eslint-plugin-react-hooks が cascading renders を警告（error）。reduced-motion 判定は `useEffect`+`setState` ではなく **`useSyncExternalStore`**（Step 3）で行う。
- **lenis CSS の取り込み**: `import "lenis/dist/lenis.css"` を入れないと、既存の `html { scroll-behavior: smooth }` と Lenis が競合してカクつく。lenis CSS の `.lenis-smooth { scroll-behavior: auto !important }` が競合を解消する。なお lenis は `exports` 制限で `require('lenis/package.json')` 等は不可（CSS は `"./dist/*"` 経由で OK）。
- **Lenis 下のプログラムスクロールは遅延する**: `window.scrollTo()` は Lenis の `lerp`（慣性）で追従が遅れる。自動テストで特定位置に飛ばす場合は複数回呼ぶ／十分待つ／`lenis.scrollTo(y, { immediate: true })` を使う。

### 一般的な落とし穴
- **Lenis Provider 未マウント**: `ReactLenis root` を上位に置かないと `useLenis` が発火しない。本実装はトップページにいる間だけマウントするため、`ScrollFrameSequence` をその子に置くこと。
- **GSAP ScrollTrigger と Lenis の非同期**: 併用時は `useLenis(() => ScrollTrigger.update())` で同期し、unmount で `ScrollTrigger.kill()`。
- **DPR 過大**: `devicePixelRatio` をそのまま使うと dpr 3 端末で描画負荷が跳ねる。`min(2, dpr)` で上限。
- **AVIF 検出漏れ**: 検出せず `.avif` を直リンクすると非対応ブラウザで全フレームが壊れる。必ずランタイム検出 → WebP フォールバック。
- **フレーム名のゼロ詰めズレ**: `padStart(3, "0")` と ffmpeg の `%03d`・**1 始まり**を揃える。0 始まり / 桁数違いで 404。
- **reduced-motion 未対応**: 無視すると酔い・苦痛の原因。静止 1 枚にフォールバックする。
- **poster 未設定**: canvas 描画前が真っ白／真っ黒になる。poster と背景色（`background`）でつなぐ。
