import { CallToAction } from '@/components/cta'
import { FAQ } from '@/components/faq'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/hero'
import { HowItWorks } from '@/components/how-it-works'
import { MethodGerar } from '@/components/method-gerar'
import { PainSection } from '@/components/pain-section'
import { SocialProof } from '@/components/testimonials'

export default function MentoriaPage() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <PainSection />
      <MethodGerar />
      <HowItWorks />
      <CallToAction />
      <SocialProof />
      <FAQ />
      <Footer />
    </main>
  )
}
