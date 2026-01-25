import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "まつげサロン予約アプリ | サロン管理システム | マクセラス",
  description: "まつげサロン向けの予約管理アプリ・システム開発。顧客管理、予約管理、スタッフ管理、売上管理まで一元化。スマホから簡単に操作できる、サロン専用の管理システムです。",
  openGraph: {
    title: "まつげサロン予約アプリ | サロン管理システム | マクセラス",
    description: "まつげサロン向けの予約管理アプリ・システム開発。顧客管理、予約管理、スタッフ管理、売上管理まで一元化。スマホから簡単に操作できる、サロン専用の管理システムです。",
    type: "website",
  },
};

export default function EyelashSalonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
