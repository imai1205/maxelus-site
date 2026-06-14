import type { Metadata } from "next";

const title = "業務効率化支援 | バラバラの業務データをつなぐ | マクセラス";
const description =
  "LINE、Slack、スプレッドシート、会計ソフト、CSV、既存システムなどに分散した業務データを整理し、必要な情報をつなげます。As Is / To Be の整理から、入力・確認・転記・集計のムダを減らす仕組みづくりまで伴走します。";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website" },
};

export default function BusinessDXDesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
