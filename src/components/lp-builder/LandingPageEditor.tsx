'use client'

import { LandingPageBuilder } from '@/components/lp-builder/LandingPageBuilder'
import { LPSection } from '@/components/lp-renderer/SectionRenderer'
import { useLandingPage } from '@/hooks/useLandingPage'

interface Props {
  initialSections: LPSection[]
  id: string
}

export default function LandingPageEditor({ initialSections, id }: Props) {
  const { update } = useLandingPage()

  return (
    <LandingPageBuilder
      initialSections={initialSections}
      onSave={(sections) => update(id, sections)}
    />
  )
}
