/** @type {import('next').NextConfig} */
module.exports = {
  images:{
    remotePatterns:[
      {protocol: 'https',
        hostname: 'itdevecs2025-2026.github.io',
        pathname: '/Images-frontend/**',

      },
    ],
  },
  env: {
    BASE_URL: process.env.BASE_URL,
  }
}
