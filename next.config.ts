import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com'
      },
      {
        protocol: 'https',
        hostname: 'cswfvgifofdkssbfpecd.supabase.co'
      }
    ]
  },
  async redirects() {
    return [
      {
        source: '/diagnostico',
        destination:
          '/diagnostico-de-gestao?utm_source=instagram&utm_medium=social_organic&utm_campaign=perfil_bio&utm_content=link_diagnostico',
        permanent: false
      }
    ]
  }
}

export default nextConfig
