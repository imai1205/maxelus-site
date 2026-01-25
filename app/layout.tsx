import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { PageLoader, PageTransition } from "./components/PageTransition";
import ConditionalHeader from "./components/ConditionalHeader";
import { ThemeProvider } from "./components/ThemeProvider";
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
  title: "マクセラス | DX・ホームページ作成・Webアプリ開発",
  description: "完全オーダーメイドで課題を解決するWEB・アプリ制作。ユーザーに使われる、成果につながるプロダクトを企画から運用まで伴走してお届けします。",
  keywords: ["DX", "ホームページ作成", "Webアプリ開発", "業務システム", "システム開発", "マクセラス"],
  openGraph: {
    title: "マクセラス | DX・ホームページ作成・Webアプリ開発",
    description: "完全オーダーメイドで課題を解決するWEB・アプリ制作。ユーザーに使われる、成果につながるプロダクトを企画から運用まで伴走してお届けします。",
    type: "website",
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'マクセラス',
      },
    ],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
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
        <ThemeProvider>
          {/* CMS機能をコメントアウト（将来の復旧用） */}
          {/* <Suspense fallback={null}>
            <PreviewClickHandler />
            <CMSLiveUpdater />
          </Suspense> */}
          <PageLoader />
          <ConditionalHeader />
          <PageTransition>{children}</PageTransition>
        </ThemeProvider>
      </body>
    </html>
  );
}
