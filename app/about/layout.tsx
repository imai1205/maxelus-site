import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "会社情報 | マクセラス",
  description: "AIと最新の開発手法を活用し、最短で「使われるプロダクト」を形にするマクセラス。完全オーダーメイドで課題を解決するWEB・アプリ制作を提供しています。",
  openGraph: {
    title: "会社情報 | マクセラス",
    description: "AIと最新の開発手法を活用し、最短で「使われるプロダクト」を形にするマクセラス。完全オーダーメイドで課題を解決するWEB・アプリ制作を提供しています。",
    type: "website",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
