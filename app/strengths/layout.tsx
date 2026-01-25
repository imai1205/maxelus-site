import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "強み | マクセラス",
  description: "マクセラスの強みをご紹介。完全オーダーメイド開発、AI活用による開発スピード向上、透明性の高いコミュニケーション、運用改善まで伴走するサポート体制。",
  openGraph: {
    title: "強み | マクセラス",
    description: "マクセラスの強みをご紹介。完全オーダーメイド開発、AI活用による開発スピード向上、透明性の高いコミュニケーション、運用改善まで伴走するサポート体制。",
    type: "website",
  },
};

export default function StrengthsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
