import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI機能組込み・OCR自動化 | 業務を自動化する | マクセラス",
  description: "要約/分類/検索/生成/動画分析。AI技術を活用して、業務効率を大幅に向上させます。OCRによる文書自動化、AI機能の組込みで、繰り返し作業を削減します。",
  openGraph: {
    title: "AI機能組込み・OCR自動化 | 業務を自動化する | マクセラス",
    description: "要約/分類/検索/生成/動画分析。AI技術を活用して、業務効率を大幅に向上させます。OCRによる文書自動化、AI機能の組込みで、繰り返し作業を削減します。",
    type: "website",
  },
};

export default function AIOCRAutomationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
