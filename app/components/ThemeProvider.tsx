"use client";

import { useEffect, useState, ReactNode } from "react";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const updateTheme = () => {
      const root = document.documentElement;
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const resolved = isDark ? "dark" : "light";

      root.classList.remove("light", "dark");
      root.classList.add(resolved);
      root.setAttribute("data-theme", resolved);
    };

    // 初期設定
    updateTheme();

    // システム設定の変更を監視
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", updateTheme);

    return () => {
      mediaQuery.removeEventListener("change", updateTheme);
    };
  }, []);

  if (!mounted) {
    // サーバーサイドレンダリング時はlightテーマを返す
    return <>{children}</>;
  }

  return <>{children}</>;
}
