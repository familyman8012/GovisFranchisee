/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  experimental: {
    images: {
      unoptimized: true,
    },
  },
  distDir: process.env.Build === "true" ? "build" : ".next",
  images: {
    domains: ["dev-gopizza-store-service.s3.ap-northeast-2.amazonaws.com"],
    unoptimized: true,
  },
};

module.exports = nextConfig;
