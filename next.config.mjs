import withPlugins from 'next-compose-plugins';
import withPWAInit from 'next-pwa';

const isDev = process.env.NODE_ENV === 'development';

const withPWA = withPWAInit({
  dest: 'public',
  disable: isDev,
});

/** @type {import('next').NextConfig} */
const nextConfig = withPlugins([withPWA], {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/clientes',
        permanent: false,
      },
    ]
  },
})

export default nextConfig;
