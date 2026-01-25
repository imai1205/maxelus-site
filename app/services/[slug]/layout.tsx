import type { Metadata } from "next";
import { getServiceBySlug } from "../../data/services";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const service = getServiceBySlug(params.slug);

  if (!service) {
    return {
      title: "サービス詳細 | マクセラス",
      description: "マクセラスのサービス詳細ページです。",
    };
  }

  return {
    title: `${service.title} | マクセラス`,
    description: service.summary || `${service.title}の詳細情報。${service.catch}`,
    openGraph: {
      title: `${service.title} | マクセラス`,
      description: service.summary || `${service.title}の詳細情報。${service.catch}`,
      type: "website",
    },
  };
}

export default function ServiceDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
