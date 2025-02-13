import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "rqtqmmtupkjdpvpv.public.blob.vercel-storage.com",
      "example.com",
      "images.unsplash.com",
      "api.unsplash.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
      },
    ],
  },
};

export default nextConfig;
