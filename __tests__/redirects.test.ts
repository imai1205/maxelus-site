import { describe, it, expect } from "vitest";
import nextConfig from "@/next.config";

async function getRedirects() {
  return (await nextConfig.redirects?.()) ?? [];
}

describe("next.config redirects", () => {
  it("旧 services slug 3 件が permanent でリダイレクトされる", async () => {
    const rules = await getRedirects();
    const expected: Array<[string, string]> = [
      ["/services/web-app-development", "/services/full-order-app-development"],
      ["/services/iphone-app", "/services/full-order-app-development"],
      ["/services/website-development", "/services/website"],
    ];
    for (const [source, destination] of expected) {
      const rule = rules.find((r) => r.source === source);
      expect(rule, `${source} のリダイレクトが未定義`).toBeDefined();
      expect(rule?.destination).toBe(destination);
      expect(rule?.permanent).toBe(true);
    }
  });
});
