const removeImports = require('next-remove-imports')();

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['rmdjufkjcuqrsfpacxhy.supabase.co'],
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/website',
        locale: false, // Use `locale: false` so that the prefix matches the desired locale correctly
      },
      {
        source: '/onas',
        destination: '/about',
        locale: false, // Use `locale: false` so that the prefix matches the desired locale correctly
      },
      {
        source: '/oferta',
        destination: '/offer',
        locale: false,
      },
      {
        source: '/uslugi',
        destination: '/services',
        locale: false,
      },
      {
        source: '/certyfikaty',
        destination: '/certificates',
        locale: false,
      },
      {
        source: '/kontakt',
        destination: '/contact',
        locale: false,
      },
    ];
  },
};

module.exports = removeImports(nextConfig);
