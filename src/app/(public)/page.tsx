import { AuthorityBio } from '@/components/home/AuthorityBio'
import { HeroInstitucional } from '@/components/home/HeroInstitucional'
import { ServicesSection } from '@/components/home/ServicesSection'
import { Header } from '@/components/layout/header'
import { JsonLd } from '@/components/seo/JsonLd'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title:
    'Gestão e Estruturação para Escritórios e Negócios Digitais | Dayane Anastácio',
  description:
    'Especialista em gestão e processos para escritórios de advocacia e negócios digitais que cresceram, mas não têm estrutura para sustentar o crescimento.',
  keywords: [
    'gestão jurídica',
    'consultoria escritório advocacia',
    'gestão de escritório de advocacia',
    'organização jurídica',
    'processos jurídicos',
    'consultoria jurídica empresarial',
    'método gerar',
    'dayane anastacio'
  ],
  openGraph: {
    title:
      'Gestão e Estruturação para Escritórios e Negócios Digitais | Dayane Anastácio',
    description:
      'Especialista em gestão e processos para escritórios de advocacia e negócios digitais que cresceram, mas não têm estrutura para sustentar o crescimento.',
    url: 'https://dayaneanastacio.com.br/',
    siteName: 'Dayane Anastacio',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: 'https://dayaneanastacio.com.br/assets/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Dayane Anastácio - Gestão para Escritórios de Advocacia'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Gestão e Estruturação para Escritórios e Negócios Digitais | Dayane Anastácio',
    description:
      'Especialista em gestão e processos para escritórios de advocacia e negócios digitais que cresceram, mas não têm estrutura para sustentar o crescimento.',
    images: ['https://dayaneanastacio.com.br/assets/og-image.jpg']
  },
  alternates: {
    canonical: 'https://dayaneanastacio.com.br/'
  }
}

export default function Home() {
  return (
    <main>
      <JsonLd />
      <Header />
      <HeroInstitucional />
      <ServicesSection />
      <AuthorityBio />
    </main>
  )
}
