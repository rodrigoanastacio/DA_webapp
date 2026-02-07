import { HeroSection } from './sections/HeroSection'

export const SECTION_COMPONENTS = {
  hero: HeroSection
} as const

export type SectionType = keyof typeof SECTION_COMPONENTS

export interface LPSection {
  id: string
  type: SectionType
  data: Record<string, any>
  style?: Record<string, any>
}

interface SectionRendererProps {
  section: LPSection
}

export function SectionRenderer({ section }: SectionRendererProps) {
  const Component = SECTION_COMPONENTS[section.type]

  if (!Component) {
    console.warn(`Section type unknown: ${section.type}`)
    return null
  }

  return <Component {...section.data} id={section.id} />
}
