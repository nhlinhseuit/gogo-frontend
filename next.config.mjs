/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Chấp nhận tất cả các domain qua HTTPS
      },
    ],
    domains: ["res.cloudinary.com"], // Cụ thể thêm res.cloudinary.com
  },
};

export default nextConfig;
