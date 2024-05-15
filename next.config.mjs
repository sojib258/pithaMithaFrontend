/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ['localhost', 'assets.example.com', "res.cloudinary.com", "sandbox.sslcommerz.com"],
        // Specify additional loader options if needed
        loader: 'default',
        path: '/_next/image',
    },
};

export default nextConfig;
