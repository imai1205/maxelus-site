import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(__dirname, "..");

describe("PageHero 統一", () => {
  it("下層 5 ページが共通 PageHero を使用している", () => {
    const pages = [
      "app/services/page.tsx",
      "app/services/[slug]/page.tsx",
      "app/works/page.tsx",
      "app/about/page.tsx",
      "app/contact/page.tsx",
    ];
    const missing = pages.filter((page) => {
      const source = readFileSync(join(ROOT, page), "utf8");
      return !source.includes("PageHero");
    });
    expect(missing).toEqual([]);
  });

  it("PageHero コンポーネントが存在する", () => {
    expect(existsSync(join(ROOT, "app/components/PageHero.tsx"))).toBe(true);
  });

  it("--accent-honey トークンが globals.css に定義されている", () => {
    const css = readFileSync(join(ROOT, "app/globals.css"), "utf8");
    expect(css).toContain("--accent-honey: #e6bd71");
  });
});
