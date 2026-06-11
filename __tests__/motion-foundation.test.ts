import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(__dirname, "..");
const FRAMES_DIR = join(ROOT, "public", "scroll-frames-home");

describe("トップ動的化の基盤", () => {
  it("scroll-frames-home の全 118 フレームが 4 形式で存在する", () => {
    const missing: string[] = [];
    for (let i = 1; i <= 118; i++) {
      const n = String(i).padStart(3, "0");
      for (const suffix of [".avif", ".webp", ".mobile.avif", ".mobile.webp"]) {
        const file = `frame-${n}${suffix}`;
        if (!existsSync(join(FRAMES_DIR, file))) missing.push(file);
      }
    }
    expect(missing).toEqual([]);
  });

  it("poster (frame-001.jpg) が存在する", () => {
    expect(existsSync(join(FRAMES_DIR, "frame-001.jpg"))).toBe(true);
  });

  it("ServerMono フォントが存在する", () => {
    expect(
      existsSync(
        join(ROOT, "public", "fonts", "ServerMono", "ServerMono-Regular.woff2")
      )
    ).toBe(true);
  });

  it("lenis / gsap / clsx が dependencies に追加されている", () => {
    const pkg = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));
    for (const dep of ["lenis", "gsap", "clsx"]) {
      expect(pkg.dependencies[dep], `${dep} 未追加`).toBeDefined();
    }
  });

  it("PageTransition がトップで transform ラッパー (gpu-accelerate) を外す", () => {
    // transform/will-change:transform を持つ祖先は position:fixed の
    // containing block になり、HeroScrollScene の fixed canvas が壊れるため
    const source = readFileSync(
      join(ROOT, "app", "components", "PageTransition.tsx"),
      "utf8"
    );
    expect(source).toContain('pathname === "/"');
  });
});
