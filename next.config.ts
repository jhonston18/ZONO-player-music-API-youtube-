import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i1-e.pinimg.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
        pathname: '/vi/**',
      }
    ],
  },
  // Esto le dice a Next.js que ejecute db-local directamente en Node.js sin procesarlo con Webpack
  serverExternalPackages: ['db-local'],
};

export default nextConfig;
