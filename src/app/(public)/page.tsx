import { Footer } from '@/components/Footer'
import { Agitation } from '@/components/home/Agitation'
import { AuthorityBio } from '@/components/home/AuthorityBio'
import { FAQ } from '@/components/home/FAQ'
import { FinalCTA } from '@/components/home/FinalCTA'
import { HowItWorks } from '@/components/home/HowItWorks'
import { MethodGerar } from '@/components/home/MethodGerar'
import { SolutionPresentation } from '@/components/home/SolutionPresentation'
import { Hero } from '@/components/layout/Hero'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tenha um Escritório que Funciona Sem Você | Dayane Anastacio',
  description:
    'Consultoria de gestão para escritórios de advocacia. Otimização de processos, fluxos de trabalho e organização financeira para advogados que buscam crescimento.',
  openGraph: {
    title: 'Tenha um Escritório que Funciona Sem Você | Dayane Anastacio',
    description:
      'Consultoria de gestão para escritórios de advocacia. Otimização de processos, fluxos de trabalho e organização financeira para advogados que buscam crescimento.',
    url: 'https://dayaneanastacio.com.br/',
    siteName: 'Dayane Anastacio',
    locale: 'pt_BR',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tenha um Escritório que Funciona Sem Você | Dayane Anastacio',
    description:
      'Consultoria de gestão para escritórios de advocacia. Otimização de processos, fluxos de trabalho e organização financeira para advogados que buscam crescimento.'
  }
}

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <Agitation />
      <SolutionPresentation />
      <MethodGerar />
      <AuthorityBio />
      <HowItWorks />
      <FinalCTA />
      <FAQ />
      <Footer />
    </main>
  )
}
