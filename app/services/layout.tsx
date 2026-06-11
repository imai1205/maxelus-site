import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "サービス一覧 | マクセラス",
  description: "Web制作・LP制作 / Webアプリ開発、業務効率化支援、自社プロダクトの3本柱で、現場で使われる仕組みを設計・開発します。",
  openGraph: {
    title: "サービス一覧 | マクセラス",
    description: "Web制作・LP制作 / Webアプリ開発、業務効率化支援、自社プロダクトの3本柱で、現場で使われる仕組みを設計・開発します。",
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
