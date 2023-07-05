/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
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

module.exports = nextConfig;
