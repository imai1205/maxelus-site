import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "図面コネクト | 図面管理・検索システム | マクセラス",
  description: "図面が「資産」になる。検索できる図面管理システム「図面コネクト」。OCRで読み取り、AIで項目整理。図番・会社・材質などで探せる状態にして、現場のムダを削減します。検索時間90%削減を実現。",
  openGraph: {
    title: "図面コネクト | 図面管理・検索システム | マクセラス",
    description: "図面が「資産」になる。検索できる図面管理システム「図面コネクト」。OCRで読み取り、AIで項目整理。図番・会社・材質などで探せる状態にして、現場のムダを削減します。検索時間90%削減を実現。",
    type: "website",
  },
};

export default function ZumenConnectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
