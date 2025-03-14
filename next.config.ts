import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();
const nextConfig: NextConfig = {
  /* config options here */

  reactStrictMode: false, // Disabling Strict Mode
  async rewrites() {
    return [
      {
        source: "/:locale/api/:path*", // Se l'API viene chiamata con il locale
        destination: "/api/:path*", // La riscriviamo a /api senza locale
      },
    ];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"], // Permette di importare SVG come componenti React
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "rqtqmmtupkjdpvpv.public.blob.vercel-storage.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "example.com",
        port: "",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
