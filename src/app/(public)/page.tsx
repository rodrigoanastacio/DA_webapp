import { Footer } from '@/components/Footer'
import { Agitation } from '@/components/home/Agitation'
import { AuthorityBio } from '@/components/home/AuthorityBio'
import { FAQ } from '@/components/home/FAQ'
import { FinalCTA } from '@/components/home/FinalCTA'
import { HowItWorks } from '@/components/home/HowItWorks'
import { MethodGerar } from '@/components/home/MethodGerar'
import { SolutionPresentation } from '@/components/home/SolutionPresentation'
import { Hero } from '@/components/layout/Hero'

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
