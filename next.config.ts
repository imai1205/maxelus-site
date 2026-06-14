import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // exact match のみ。/cases/:path* にすると public/cases/ の画像が 404 になる
        source: "/cases",
        destination: "/works",
        permanent: true,
      },
      {
        source: "/strengths",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/services/web-app-development",
        destination: "/services/full-order-app-development",
        permanent: true,
      },
      {
        source: "/services/iphone-app",
        destination: "/services/full-order-app-development",
        permanent: true,
      },
      {
        source: "/services/website-development",
        destination: "/services/website",
        permanent: true,
      },
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.figma.com',
        pathname: '/api/mcp/asset/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
