/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // output: 'export', // Disabled to allow API routes
    images: {
        unoptimized: true, // Keep unoptimized for simplicity unless we want to use Vercel Image Optimization
    },
}

module.exports = nextConfig
