import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { PageLoader, PageTransition } from "./components/PageTransition";
import ConditionalHeader from "./components/ConditionalHeader";
// CMS機能をコメントアウト（将来の復旧用）
// import PreviewClickHandler from "@/components/cms/PreviewClickHandler";
// import CMSLiveUpdater from "./components/CMSLiveUpdater";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "マクセラス | 業務システム・Webアプリ開発",
  description: "ホームページ制作からWebアプリ開発、業務DX支援まで。触れるデモで完成イメージを明確に。製造業、医療、建設など幅広い業界で実績があります。",
  keywords: ["Webアプリ開発", "業務システム", "DX", "ホームページ制作", "システム開発"],
  openGraph: {
    title: "マクセラス | 業務システム・Webアプリ開発",
    description: "ホームページ制作からWebアプリ開発、業務DX支援まで。触れるデモで完成イメージを明確に。",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="dns-prefetch" href="https://www.figma.com" />
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>
      <body className={`${notoSansJP.variable} font-sans antialiased`}>
        {/* CMS機能をコメントアウト（将来の復旧用） */}
        {/* <Suspense fallback={null}>
          <PreviewClickHandler />
          <CMSLiveUpdater />
        </Suspense> */}
        <PageLoader />
        <ConditionalHeader />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
