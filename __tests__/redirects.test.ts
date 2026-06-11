import { describe, it, expect } from "vitest";
import nextConfig from "@/next.config";

async function getRedirects() {
  return (await nextConfig.redirects?.()) ?? [];
}

describe("next.config redirects", () => {
  it("旧 URL 5 件が permanent でリダイレクトされる", async () => {
    const rules = await getRedirects();
    const expected: Array<[string, string]> = [
      ["/services/web-app-development", "/services/full-order-app-development"],
      ["/services/iphone-app", "/services/full-order-app-development"],
      ["/services/website-development", "/services/website"],
      ["/cases", "/works"],
      ["/strengths", "/about"],
    ];
    for (const [source, destination] of expected) {
      const rule = rules.find((r) => r.source === source);
      expect(rule, `${source} のリダイレクトが未定義`).toBeDefined();
      expect(rule?.destination).toBe(destination);
      expect(rule?.permanent).toBe(true);
    }
  });

  it("/cases の source はワイルドカードを含まない exact match である", async () => {
    // /cases/:path* にすると public/cases/ 配下の画像アセットが全部 404 になる
    const rules = await getRedirects();
    const casesRule = rules.find((r) => r.source.startsWith("/cases"));
    expect(casesRule).toBeDefined();
    expect(casesRule?.source).toBe("/cases");
    expect(casesRule?.source).not.toContain(":path");
  });
});
