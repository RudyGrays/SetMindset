import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sun9-39.userapi.com", // Пример для конкретного поддомена
        port: "",
        pathname: "/impg/**",
      },
      {
        protocol: "https",
        hostname: "sun9-79.userapi.com",
        port: "",
        pathname: "/impg/**",
      },
      {
        protocol: "https",
        hostname: "sun9-62.userapi.com",
        port: "",
        pathname: "/impg/**",
      },
      {
        protocol: "https",
        hostname: "sun9-25.userapi.com",
        port: "",
        pathname: "/impg/**",
      },
      {
        protocol: "https",
        hostname: "sun9-73.userapi.com",
        port: "",
        pathname: "/impg/**",
      },
      {
        protocol: "https",
        hostname: "sun93-1.userapi.com", // Добавляем конкретный поддомен
        port: "",
        pathname: "/impg/**",
      },
      {
        protocol: "https",
        hostname: "sun9-50.userapi.com",
        port: "",
        pathname: "/impg/**",
      },
      {
        protocol: "https",
        hostname: "sun9-54.userapi.com",
        port: "",
        pathname: "/impg/**",
      },
      {
        protocol: "https",
        hostname: "sun9-77.userapi.com",
        port: "",
        pathname: "/impg/**",
      },
    ],
  },
};

export default nextConfig;
