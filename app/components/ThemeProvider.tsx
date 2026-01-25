"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  resolvedTheme: Theme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [resolvedTheme, setResolvedTheme] = useState<Theme>("light");

  useEffect(() => {
    setMounted(true);

    const updateTheme = () => {
      const root = document.documentElement;
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const resolved = isDark ? "dark" : "light";

      root.classList.remove("light", "dark");
      root.classList.add(resolved);
      root.setAttribute("data-theme", resolved);
      setResolvedTheme(resolved);
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

  return (
    <ThemeContext.Provider value={{ resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
