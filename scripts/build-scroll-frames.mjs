// 動画 → スクロール同期用の連番画像（4バリアント + poster）を生成するビルドスクリプト。
//
// 使い方:
//   node scripts/build-scroll-frames.mjs
//   SOURCE_VIDEO="path/to/video.mp4" FPS=20 OUT_DIR="public/scroll-frames-logo" node scripts/build-scroll-frames.mjs
//
// 前提: ffmpeg が PATH 上にあること（macOS: `brew install ffmpeg`）。sharp は devDependency。
// 出力: frame-NNN.avif / frame-NNN.webp / frame-NNN.mobile.avif / frame-NNN.mobile.webp（NNN=3桁・1始まり）
//       + poster（frame-001.jpg）+ manifest.json（frameCount などのメタ情報）

import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync, readdirSync, writeFileSync, statSync, existsSync } from "node:fs";
import path from "node:path";
import os from "node:os";
import sharp from "sharp";

// ---- パラメータ（環境変数で上書き可） ----------------------------------------
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

  // 出力先をクリーンに作り直す
  rmSync(OUT_DIR, { recursive: true, force: true });
  mkdirSync(OUT_DIR, { recursive: true });

  // ① ffmpeg でロスレス中間 PNG を抽出（再エンコード元の劣化を避ける）
  const tmpDir = path.join(os.tmpdir(), `scroll-frames-${process.pid}`);
  rmSync(tmpDir, { recursive: true, force: true });
  mkdirSync(tmpDir, { recursive: true });

  console.log(`[build-scroll-frames] ffmpeg 抽出: fps=${FPS}, width=${DESKTOP_WIDTH}`);
  try {
    execFileSync(
      "ffmpeg",
      [
        "-y",
        "-loglevel", "error",
        "-i", SOURCE_VIDEO,
        // fps=N で間引き、scale=W:-2 で横幅固定・縦をアスペクト比維持で偶数に丸める（-2 が偶数丸めの指定）
        "-vf", `fps=${FPS},scale=${DESKTOP_WIDTH}:-2`,
        path.join(tmpDir, "frame-%03d.png"),
      ],
      { stdio: ["ignore", "inherit", "inherit"] }
    );
  } catch (e) {
    console.error("[build-scroll-frames] ffmpeg の実行に失敗しました。ffmpeg がインストールされているか確認してください（brew install ffmpeg）。");
    process.exit(1);
  }

  const pngs = readdirSync(tmpDir).filter((f) => f.endsWith(".png")).sort();
  const frameCount = pngs.length;
  if (frameCount === 0) {
    console.error("[build-scroll-frames] 中間 PNG が 0 枚でした。SOURCE_VIDEO / FPS を確認してください。");
    process.exit(1);
  }
  console.log(`[build-scroll-frames] 中間 PNG: ${frameCount} 枚`);

  // ② sharp で各 PNG を 4 バリアントに変換
  let totalBytes = 0;
  const bytesByFormat = {};
  for (let i = 0; i < pngs.length; i++) {
    const srcPath = path.join(tmpDir, pngs[i]);
    const idx = pad3(i + 1); // 1 始まりで採番（ffmpeg の連番に依存せず再採番して欠番を防ぐ）
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
    frameCount,
    fps: FPS,
    desktopWidth: DESKTOP_WIDTH,
    mobileWidth: MOBILE_WIDTH,
    basePath: `/${OUT_DIR.replace(/^public\//, "")}`,
    poster: posterName,
    source: path.basename(SOURCE_VIDEO),
  };
  writeFileSync(path.join(OUT_DIR, "manifest.json"), JSON.stringify(manifest, null, 2));

  // 後始末
  rmSync(tmpDir, { recursive: true, force: true });

  // サマリ表示
  console.log("\n[build-scroll-frames] 完了");
  console.log(`  frameCount : ${frameCount}`);
  console.log(`  out dir    : ${OUT_DIR}`);
  console.log(`  total size : ${(totalBytes / 1024 / 1024).toFixed(2)}MB（poster 除く）`);
  for (const [k, v] of Object.entries(bytesByFormat)) {
    console.log(`    ${k.padEnd(14)}: ${kb(v / frameCount)}/枚 × ${frameCount} = ${(v / 1024 / 1024).toFixed(2)}MB`);
  }
  console.log(`\n  → app/page.tsx の <ScrollFrameSequence frameCount={${frameCount}} /> に反映してください。`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
