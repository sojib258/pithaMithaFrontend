/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ['localhost', 'assets.example.com', "playful-love-57c604cf19.media.strapiapp.com"],
        // Specify additional loader options if needed
        loader: 'default',
        path: '/_next/image',
    },
};

export default nextConfig;
