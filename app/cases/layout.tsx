import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "事例・実績 | マクセラス",
  description: "マクセラスの制作実績・事例をご紹介。アプリ開発、ホームページ制作、業務DX、プロダクト開発など、様々な業種・業界での実績がございます。",
  openGraph: {
    title: "事例・実績 | マクセラス",
    description: "マクセラスの制作実績・事例をご紹介。アプリ開発、ホームページ制作、業務DX、プロダクト開発など、様々な業種・業界での実績がございます。",
    type: "website",
  },
};

export default function CasesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
