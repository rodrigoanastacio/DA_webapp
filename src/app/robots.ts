import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard/', '/api/', '/login', '/signout', '/auth/']
      }
    ],
    sitemap: 'https://dayaneanastacio.com.br/sitemap.xml'
  }
}
