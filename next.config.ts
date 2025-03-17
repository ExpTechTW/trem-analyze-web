import type { NextConfig } from 'next';

const isProduction = process.env.NODE_ENV === 'production';
const basePath = isProduction ? '/analyze' : '';

const nextConfig: NextConfig = {
  basePath: basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
