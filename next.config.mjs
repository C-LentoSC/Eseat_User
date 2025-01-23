/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  crossOrigin: "anonymous",
  reactStrictMode: true,
  images: {
    domains: ["modernliving.lk"], // Add the allowed domain(s) here
  },
};

export default nextConfig;
