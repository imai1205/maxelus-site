import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "お問い合わせ | マクセラス",
  description: "マクセラスへの無料相談・お問い合わせはこちらから。Web制作・LP制作、Webアプリ開発、業務効率化、自社サービスに関するご相談を承ります。",
  openGraph: {
    title: "お問い合わせ | マクセラス",
    description: "マクセラスへの無料相談・お問い合わせはこちらから。Web制作・LP制作、Webアプリ開発、業務効率化、自社サービスに関するご相談を承ります。",
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
