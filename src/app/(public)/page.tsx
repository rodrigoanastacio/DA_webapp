import { HeroInstitucional } from '@/components/home/HeroInstitucional'
import { JsonLd } from '@/components/seo/JsonLd'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title:
    'Consultoria em Gestão para Escritórios de Advocacia | Dayane Anastacio',
  description:
    'Consultoria especializada em gestão jurídica. Processos claros, previsibilidade financeira e crescimento sustentável para escritórios de advocacia. Método GERAR com 10+ anos de experiência.',
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
      'Dayane Anastacio | Consultoria em Gestão para Escritórios de Advocacia',
    description:
      'Pare de ser refém do seu próprio escritório. Tenha processos que funcionam sem você. Consultoria com o Método GERAR.',
    url: 'https://dayaneanastacio.com.br/',
    siteName: 'Dayane Anastacio',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: 'https://dayaneanastacio.com.br/assets/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Dayane Anastácio - Consultoria em Gestão Jurídica'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dayane Anastacio | Consultoria em Gestão Jurídica',
    description:
      'Pare de ser refém do seu próprio escritório. Tenha processos que funcionam sem você.',
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
      {/* <Header /> */}
      <HeroInstitucional />
    </main>
  )
}
