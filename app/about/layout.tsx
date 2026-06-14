import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "会社情報 | マクセラス",
  description: "株式会社MAXELUS（Maxelus Inc.）の会社情報。業務を効率化し、本当に大切なことに時間を使える世界をつくる。Mission・Vision・Value、私たちの開発スタイルを紹介します。",
  openGraph: {
    title: "会社情報 | マクセラス",
    description: "株式会社MAXELUS（Maxelus Inc.）の会社情報。業務を効率化し、本当に大切なことに時間を使える世界をつくる。Mission・Vision・Value、私たちの開発スタイルを紹介します。",
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
