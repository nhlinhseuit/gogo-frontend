/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**', // Cho phép tất cả domain
            },
        ],
    },
};

export default nextConfig;
