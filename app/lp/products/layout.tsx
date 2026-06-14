import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "弊社プロダクトのご紹介｜業務課題から生まれたプロダクト",
  description:
    "図面管理、LP分析、Slack勤怠管理、AIチャットボット、販売管理など、業務課題をもとに開発したマクセラスの自社プロダクト・業務支援ツールをご紹介します。導入・カスタマイズ相談にも対応します。",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
