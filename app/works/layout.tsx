import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "実績 | マクセラス",
  description:
    "マクセラスの開発実績一覧。製造業の図面管理・販売管理から、店舗・医療・SaaSまで、業種ごとの課題解決事例を紹介します。",
  openGraph: {
    title: "実績 | マクセラス",
    description:
      "マクセラスの開発実績一覧。製造業の図面管理・販売管理から、店舗・医療・SaaSまで、業種ごとの課題解決事例を紹介します。",
    type: "website",
  },
};

export default function WorksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
