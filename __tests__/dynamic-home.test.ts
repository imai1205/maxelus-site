import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(__dirname, "..");

function readHomeSections(): string {
  const dir = join(ROOT, "app", "components", "home");
  return readdirSync(dir)
    .filter((f) => f.endsWith(".tsx"))
    .map((f) => readFileSync(join(dir, f), "utf8"))
    .join("\n");
}

describe("動的トップ", () => {
  it("トップが LenisRoot と HeroScrollScene を使用している", () => {
    const page = readFileSync(join(ROOT, "app", "page.tsx"), "utf8");
    expect(page).toContain("LenisRoot");
    expect(page).toContain("HeroScrollScene");
  });

  it("data-cms-key 6 属性が再スキン後も残存している", () => {
    const source = readHomeSections();
    for (const key of [
      "site.challenge_title",
      "site.challenge_subtitle",
      "site.challenge_before_${i}",
      "site.challenge_after_${i}",
      "site.cta_section_title",
      "site.cta_section_subtitle",
    ]) {
      expect(source, `${key} が消失`).toContain(key);
    }
  });

  it("確定文言の見出しが残存している", () => {
    const all =
      readHomeSections() +
      readFileSync(
        join(ROOT, "components", "effects", "hero-scroll-scene", "index.tsx"),
        "utf8"
      );
    for (const text of [
      "大切なことに時間を使える世界へ。",
      "時間を生み出す、効率的な仕組みをつくる。",
      "業務のズレから起きる。",
      "業務を効率化し、本当に大切なことに",
      "成果から逆算する設計プロセス",
      "まずは無料相談から",
    ]) {
      expect(all, `「${text}」が消失`).toContain(text);
    }
  });
});
