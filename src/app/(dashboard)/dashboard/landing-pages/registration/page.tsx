'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { LandingPageBuilder } from '@/components/lp-builder/LandingPageBuilder'
import { LPSection } from '@/components/lp-renderer/SectionRenderer'
import { useLandingPage } from '@/hooks/useLandingPage'

export default function RegistrationPage() {
  const { save } = useLandingPage()

  const initialSections: LPSection[] = [
    {
      id: 'hero-1',
      type: 'hero',
      data: {
        headline: 'Transforme seu escritório',
        subheadline:
          'Consultoria especializada para advogados que buscam gestão profissional.',
        ctaLabel: 'Agendar Diagnóstico',
        ctaLink: '#',
        theme: 'light'
      }
    }
  ]

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="mb-6">
        <PageHeader
          title="Nova Landing Page"
          description="Arraste e solte componentes para construir sua página exclusiva."
        />
      </div>

      <div className="flex-1 -mx-6 -mb-6 border-t border-gray-200 h-full">
        <LandingPageBuilder initialSections={initialSections} onSave={save} />
      </div>
    </div>
  )
}
