import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false, // Disabling Strict Mode
  images: {
    /*  domains: [
      "rqtqmmtupkjdpvpv.public.blob.vercel-storage.com",
      "example.com",
      "images.unsplash.com",
      "api.unsplash.com",
    ], */
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
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

export default nextConfig;
