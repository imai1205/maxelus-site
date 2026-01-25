import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "完全オーダーメイドアプリ開発 | マクセラス",
  description: "完全オーダーメイドで課題を解決するWEB・アプリ制作。ユーザーに使われる、成果につながるプロダクトを企画から運用まで伴走してお届けします。AI活用により開発期間を30〜50%短縮。",
  openGraph: {
    title: "完全オーダーメイドアプリ開発 | マクセラス",
    description: "完全オーダーメイドで課題を解決するWEB・アプリ制作。ユーザーに使われる、成果につながるプロダクトを企画から運用まで伴走してお届けします。AI活用により開発期間を30〜50%短縮。",
    type: "website",
  },
};

export default function FullOrderAppDevelopmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
