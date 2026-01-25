import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "お問い合わせ | マクセラス",
  description: "マクセラスへのお問い合わせはこちらから。アプリ開発、ホームページ制作、業務DX、プロダクト開発など、お気軽にご相談ください。無料相談も承っております。",
  openGraph: {
    title: "お問い合わせ | マクセラス",
    description: "マクセラスへのお問い合わせはこちらから。アプリ開発、ホームページ制作、業務DX、プロダクト開発など、お気軽にご相談ください。無料相談も承っております。",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
