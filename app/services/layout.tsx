import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "サービス一覧 | マクセラス",
  description: "完全オーダーメイドのアプリ開発・DX支援、ホームページ制作、プロダクト開発サービスをご提供。企画から運用まで伴走して、成果につながるプロダクトをお届けします。",
  openGraph: {
    title: "サービス一覧 | マクセラス",
    description: "完全オーダーメイドのアプリ開発・DX支援、ホームページ制作、プロダクト開発サービスをご提供。企画から運用まで伴走して、成果につながるプロダクトをお届けします。",
    type: "website",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
