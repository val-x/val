/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@acme/ui", "simplex-noise"],
  images: {
    domains: ['images.unsplash.com'],
  },
}

module.exports = nextConfig