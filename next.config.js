/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true
  },
  images: {
    domains: [
      "res.cloudinary.com",
      "www.gravatar.com",
      "i.imgur.com",
      "pbs.twimg.com",
    ],
  },
};

module.exports = nextConfig;
