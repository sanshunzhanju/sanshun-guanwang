/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')();

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = withNextIntl(nextConfig)