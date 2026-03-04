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
