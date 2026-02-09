import { Metadata } from 'next'
import { Suspense } from 'react'
import LeadCaptureWizard from './components/LeadCaptureWizard'

export const metadata: Metadata = {
  metadataBase: new URL('https://dayaneanastacio.com.br'),
  title: 'Formulário de Diagnóstico Inicial | Dayane Anastácio',
  description:
    'Conte-me sobre seu escritório em 5 minutos. Análise personalizada para advogados que buscam crescimento e organização.',
  keywords: [
    'diagnóstico jurídico',
    'gestão de escritório',
    'advocacia',
    'consultoria jurídica',
    'Dayane Anastácio',
    'organização jurídica'
  ],
  authors: [{ name: 'Dayane Anastácio' }],
  openGraph: {
    title: 'Formulário de Diagnóstico Inicial',
    description:
      'Conte-me sobre seu escritório em 5 minutos. Análise personalizada para advogados que buscam crescimento.',
    type: 'website',
    locale: 'pt_BR',
    url: 'https://dayaneanastacio.com.br/diagnostico-de-gestao',
    siteName: 'Dayane Anastácio - Consultoria Jurídica',
    images: [
      {
        url: '/og-diagnostico.png',
        width: 1200,
        height: 630,
        alt: 'Formulário de Diagnóstico Inicial - Dayane Anastácio'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Formulário de Diagnóstico Inicial',
    description:
      'Conte-me sobre seu escritório em 5 minutos. Análise personalizada para advogados.',
    images: ['/og-diagnostico.png'],
    creator: '@dayaneanastacio'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
}

export default function DiagnosticoDeGestao() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-blue-50" />}>
      <LeadCaptureWizard />
    </Suspense>
  )
}
