import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LOADER = path.resolve(__dirname, 'src/visual-edits/component-tagger-loader.js');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
  },
  turbopack: {
    rules: {
      // Disabling the custom loader in Turbopack for now to prevent crashes.
      // It is still active in Webpack mode below.
      /*
      "*.{jsx,tsx}": {
        loaders: [LOADER]
      }
      */
    }
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(jsx|tsx)$/,
      use: [
        {
          loader: LOADER,
        },
      ],
    });
    return config;
  },
};

export default nextConfig;
// Orchids restart: 1766808304276
