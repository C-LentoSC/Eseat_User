/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  crossOrigin: "anonymous",
  reactStrictMode: true,
  images: {
    domains: ["modernliving.lk","ec2-13-212-24-240.ap-southeast-1.compute.amazonaws.com"], // Add the allowed domain(s) here
  },
};

export default nextConfig;
