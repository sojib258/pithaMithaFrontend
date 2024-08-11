/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'localhost',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'sandbox.sslcommerz.com',
            port: '',
            pathname: '/**',
          },
        ],
        loader: 'default',
        path: '/_next/image',
      },
};

export default nextConfig;
