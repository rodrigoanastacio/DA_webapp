import { MetadataRoute } from 'next'

const BASE_URL = 'https://dayaneanastacio.com.br'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0
    },
    {
      url: `${BASE_URL}/lp/mentoria-e-gestao-estrategica`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${BASE_URL}/diagnostico-de-gestao`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    }
  ]
}
