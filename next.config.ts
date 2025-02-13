import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development",
  },
  images: {
    domains: ["di-uploads-pod14.dealerinspire.com"],
  },
  experimental: {
    swcPlugins: [],
  },
};

const pwaConfig: withPWA.PWAConfig = {
  disable: process.env.NODE_ENV === "development",
  dest: "public",
  register: true,
  skipWaiting: true,
};

// @ts-expect-error: Expect both types NextConfig & withPWA.PWAConfig however NextConfig is different from the NextConfig 'withPWA' expects.
export default withPWA(pwaConfig)(nextConfig);
