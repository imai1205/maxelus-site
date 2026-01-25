import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AIコーディング教育 | 知識0から始める。かんたんすぎる！プログラミング×AI | マクセラス",
  description: "AIとの対話のみで、欲しいツールをサクサク作れる時代へ。プログラミング未経験でも、AIを活用した開発スキルを習得できます。無料講座あり（LINE友だち追加で視聴可能）。",
  openGraph: {
    title: "AIコーディング教育 | 知識0から始める。かんたんすぎる！プログラミング×AI | マクセラス",
    description: "AIとの対話のみで、欲しいツールをサクサク作れる時代へ。プログラミング未経験でも、AIを活用した開発スキルを習得できます。無料講座あり（LINE友だち追加で視聴可能）。",
    type: "website",
  },
};

export default function AICodingEducationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
