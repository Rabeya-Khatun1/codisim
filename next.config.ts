import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
       {
        protocol: "https",
        hostname: "randomuser.me",
      },
       {
        protocol: "https",
        hostname: "ui-avatars.com",
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
