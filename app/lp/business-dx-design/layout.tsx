import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "業務DX設計 | 業務の「型」を見つけて、システム化の道筋を | マクセラス",
  description: "現状の業務を分析し、システム化できる部分を特定。AI機能組込み、API連携、クラウド運用設計まで含めた最適なシステム設計を提案します。業務の「型」を見つけて、システム化の道筋を。",
  openGraph: {
    title: "業務DX設計 | 業務の「型」を見つけて、システム化の道筋を | マクセラス",
    description: "現状の業務を分析し、システム化できる部分を特定。AI機能組込み、API連携、クラウド運用設計まで含めた最適なシステム設計を提案します。業務の「型」を見つけて、システム化の道筋を。",
    type: "website",
  },
};

export default function BusinessDXDesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
