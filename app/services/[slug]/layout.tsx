import type { Metadata } from "next";
import { getServiceBySlug } from "../../data/servicesData";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "サービス詳細 | マクセラス",
      description: "マクセラスのサービス詳細ページです。",
    };
  }

  return {
    title: `${service.title} | マクセラス`,
    description: service.shortDesc,
    openGraph: {
      title: `${service.title} | マクセラス`,
      description: service.shortDesc,
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
