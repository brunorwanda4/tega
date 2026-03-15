import type { NextConfig } from "next";
// @ts-ignore - next-pwa doesn't have TypeScript types
import withPWA from "next-pwa";

const pwaConfig = {
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    // Cache-first strategy for static assets
    {
      urlPattern: /^https?.*\.(png|jpg|jpeg|webp|svg|gif|ico)$/i,
      handler: "CacheFirst",
      options: {
        cacheName: "tega-images-v1",
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
          purgeOnQuotaError: true,
        },
      },
    },
    {
      urlPattern: /^https?.*\.(woff|woff2|ttf|otf|eot)$/i,
      handler: "CacheFirst",
      options: {
        cacheName: "tega-fonts-v1",
        expiration: {
          maxEntries: 20,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
          purgeOnQuotaError: true,
        },
      },
    },
    {
      urlPattern: /^https?.*\.(css|js)$/i,
      handler: "CacheFirst",
      options: {
        cacheName: "tega-static-v1",
        expiration: {
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
          purgeOnQuotaError: true,
        },
      },
    },
    // Network-first strategy for API calls
    {
      urlPattern: /^https?.*\/api\/.*/i,
      handler: "NetworkFirst",
      options: {
        cacheName: "tega-dynamic-v1",
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
          purgeOnQuotaError: true,
        },
        networkTimeoutSeconds: 10,
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
  ],
  buildExcludes: [/middleware-manifest\.json$/, /middleware-runtime\.js$/],
  fallbacks: {
    document: "/offline",
  },
};

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  turbopack: {}, // Silence Turbopack warning for webpack-based PWA plugin
};

export default withPWA(pwaConfig)(nextConfig);
