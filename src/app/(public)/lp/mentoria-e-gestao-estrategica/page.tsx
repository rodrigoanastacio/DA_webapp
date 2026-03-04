import { LastCTA } from '@/components/cta'
import { FAQ } from '@/components/faq'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/hero'
import { AuthoritySectionLP } from '@/components/home/AuthoritySectionLP'
import {
  EntryProcessSection,
  MethodGerar,
  QualificationsSection,
  TransformationSection
} from '@/components/method-gerar'
import { ConsequenceSection, PainSection } from '@/components/pain-section'
import { SocialProof } from '@/components/testimonials'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Método GERAR™ | Estruturação Estratégica para Escritórios Jurídicos',
  description:
    'Transforme o caos operacional em previsibilidade. Consultoria especializada em governança, processos e escalabilidade para escritórios de alto faturamento.',
  openGraph: {
    title: 'Método GERAR™ | Dayane Anastácio',
    description:
      'Recupere o controle estratégico e a liberdade societária através de uma operação blindada e processos de alta performance.',
    images: [
      {
        url: '/assets/og-mentoria-premium.png',
        width: 1200,
        height: 630,
        alt: 'Método GERAR - Estruturação Estratégica'
      }
    ]
  }
}

export default function MentoriaPage() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <PainSection />
      <ConsequenceSection />
      <MethodGerar />
      <TransformationSection />
      <QualificationsSection />
      <AuthoritySectionLP />
      <SocialProof />
      <EntryProcessSection />
      <FAQ />
      <LastCTA />
      <Footer />
    </main>
  )
}
