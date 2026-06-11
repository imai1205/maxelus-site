import { describe, it, expect } from "vitest";
import {
  servicesData,
  getServicesByCategory,
  getServiceBySlug,
  getSortedServices,
  type ServiceCategory,
} from "@/app/data/servicesData";

describe("servicesData (統合サービスマスタ)", () => {
  it("3 本柱カテゴリすべてに 1 件以上のサービスがある", () => {
    const categories: ServiceCategory[] = [
      "web-creation",
      "efficiency",
      "products",
    ];
    for (const category of categories) {
      expect(getServicesByCategory(category).length).toBeGreaterThan(0);
    }
  });

  it("ai-coding-education は含まれず、website は 1 件である", () => {
    const slugs = servicesData.map((s) => s.slug);
    expect(slugs).not.toContain("ai-coding-education");
    expect(slugs.filter((s) => s === "website")).toHaveLength(1);
    expect(slugs).not.toContain("website-basic");
    expect(slugs).not.toContain("website-special");
  });

  it("全サービスの slug が一意である", () => {
    const slugs = servicesData.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("getServiceBySlug('zumen-connect') が詳細ページ用フィールドを持つ", () => {
    const service = getServiceBySlug("zumen-connect");
    expect(service).toBeDefined();
    expect(service?.page).toBeDefined();
    expect(service?.page.lead.length).toBeGreaterThan(0);
  });

  it("未知の slug では undefined を返す", () => {
    expect(getServiceBySlug("unknown-slug")).toBeUndefined();
  });

  it("lpHref を持つサービスの値が内部パスである", () => {
    for (const service of servicesData) {
      if (service.lpHref) {
        expect(service.lpHref).toMatch(/^\/lp\//);
      }
    }
  });

  it("getSortedServices は全 6 サービスを返す", () => {
    expect(getSortedServices()).toHaveLength(6);
  });
});
