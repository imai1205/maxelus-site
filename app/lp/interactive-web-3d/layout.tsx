import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "インタラクティブWeb・3D | 体験型ホームページ制作 | マクセラス",
  description: "3Dモデル、インタラクティブアニメーション、iPhoneデモなど、WordPressでは実現できない「体験型」のWebサイトを制作。導線設計・SEO対策・計測機能も組み込み、成果につながるサイトに。",
  openGraph: {
    title: "インタラクティブWeb・3D | 体験型ホームページ制作 | マクセラス",
    description: "3Dモデル、インタラクティブアニメーション、iPhoneデモなど、WordPressでは実現できない「体験型」のWebサイトを制作。導線設計・SEO対策・計測機能も組み込み、成果につながるサイトに。",
    type: "website",
  },
};

export default function InteractiveWeb3DLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
