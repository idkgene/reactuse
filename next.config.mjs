/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  images: {
    remotePatterns: [
      {
        hostname: 'github.com',
        port: '',
        protocol: 'https',
      },
      {
        hostname: 'gitlab.com',
        port: '',
        protocol: 'https',
      },
      {
        hostname: 'bitbucket.org',
        port: '',
        protocol: 'https',
      },
    ],
  },
};

// Merge MDX config with Next.js config
export default nextConfig;
