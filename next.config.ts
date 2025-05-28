import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://cdn.dummyjson.com/**')],
  },
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
