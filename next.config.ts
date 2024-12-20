import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 关闭严格模式
  reactStrictMode: false,
  eslint: {
    /**
     * https://nextjs.org/docs/app/api-reference/config/next-config-js/eslint
     * 在构建时忽略 eslint 错误
     *
     * https://github.com/vercel/next.js/discussions/59347
     */
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
