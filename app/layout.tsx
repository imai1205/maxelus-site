import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import localFont from "next/font/local";
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

// maxelus-web から移植 (kicker 等の英字装飾用)
const serverMono = localFont({
  src: "../public/fonts/ServerMono/ServerMono-Regular.woff2",
  variable: "--next-font-mono",
  display: "swap",
  preload: false,
});

const siteName = "マクセラス";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://maxelustech.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | DX・ホームページ作成・Webアプリ開発`,
    template: `%s | ${siteName}`,
  },
  description: "MAXELUSは、Webサイト制作・業務アプリ開発・AI活用支援を通じて、現場で使われる仕組みを設計・開発する会社です。業務を整え、大切なことに時間を使える世界へ。",
  keywords: ["DX", "ホームページ作成", "Webアプリ開発", "業務システム", "システム開発", "マクセラス"],
  openGraph: {
    title: {
      default: `${siteName} | DX・ホームページ作成・Webアプリ開発`,
      template: `%s | ${siteName}`,
    },
    description: "MAXELUSは、Webサイト制作・業務アプリ開発・AI活用支援を通じて、現場で使われる仕組みを設計・開発する会社です。業務を整え、大切なことに時間を使える世界へ。",
    type: "website",
    siteName: siteName,
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'マクセラス',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: `${siteName} | DX・ホームページ作成・Webアプリ開発`,
      template: `%s | ${siteName}`,
    },
    description: "MAXELUSは、Webサイト制作・業務アプリ開発・AI活用支援を通じて、現場で使われる仕組みを設計・開発する会社です。業務を整え、大切なことに時間を使える世界へ。",
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
      <body
        className={`${notoSansJP.variable} ${serverMono.variable} font-sans antialiased`}
      >
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
