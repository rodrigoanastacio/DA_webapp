import { LPSection } from '@/components/lp-renderer/SectionRenderer'

export interface SaveLandingPageResult {
  success: boolean
  slug?: string
  message?: string
}

export type LandingPageContent = LPSection[]

export interface LandingPage {
  id: string
  tenant_id: string
  title: string
  slug: string
  content: LandingPageContent
  published: boolean
  seo_title?: string
  seo_description?: string
  created_at: string
  updated_at: string
  views?: number
}
