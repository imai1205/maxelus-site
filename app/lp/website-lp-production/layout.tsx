import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ホームページ・LP制作｜成果を見ながら改善できるWebへ",
  description:
    "ホームページ・LP制作に加え、GA4設定・タグ計測・ボタンクリック計測・問い合わせ数管理まで対応。公開後の改善やSEO・MEO対策につながるWebサイトを制作します。",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
