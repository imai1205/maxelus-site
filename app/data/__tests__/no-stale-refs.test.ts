import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(__dirname, "..", "..", "..");

// 対象ディレクトリを再帰走査して .ts/.tsx ファイルを集める
function collectSourceFiles(dir: string, files: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules" || entry === "__tests__") continue;
    const fullPath = join(dir, entry);
    if (statSync(fullPath).isDirectory()) {
      collectSourceFiles(fullPath, files);
    } else if (/\.tsx?$/.test(entry)) {
      files.push(fullPath);
    }
  }
  return files;
}

describe("旧データ参照の残存検知", () => {
  it("data/services (servicesData を除く) への import が残存しない", () => {
    const files = [
      ...collectSourceFiles(join(ROOT, "app")),
      ...collectSourceFiles(join(ROOT, "components")),
    ];
    // from "…data/services" に一致 (servicesData は末尾が異なるため除外される)
    const pattern = /from\s+["'][^"']*data\/services["']/;
    const offenders = files.filter((file) =>
      pattern.test(readFileSync(file, "utf8"))
    );
    expect(offenders).toEqual([]);
  });

  it("/strengths・/cases へのルートリンクが残存しない (lp/admin は除外)", () => {
    const files = [
      ...collectSourceFiles(join(ROOT, "app")),
      ...collectSourceFiles(join(ROOT, "components")),
    ].filter(
      (file) => !file.includes("/app/lp/") && !file.includes("/app/admin/")
    );
    // href="/strengths" / href="/cases" のルートリンクのみ対象。
    // /cases/... で始まる画像アセットパス (例: /cases/logo.png) は対象外
    const pattern = /href=["'](?:\/strengths|\/cases)["']/;
    const offenders = files.filter((file) =>
      pattern.test(readFileSync(file, "utf8"))
    );
    expect(offenders).toEqual([]);
  });
});
