'use client'

import { LandingPageBuilder } from '@/components/lp-builder/LandingPageBuilder'
import { LPSection } from '@/components/lp-renderer/SectionRenderer'
import { useLandingPage } from '@/hooks/useLandingPage'

interface Props {
  initialSections: LPSection[]
  id: string
  initialPublished: boolean
  initialTitle: string
  initialSlug: string
  initialMetaTitle?: string
  initialMetaDescription?: string
}

export default function LandingPageEditor({
  initialSections,
  id,
  initialPublished,
  initialTitle,
  initialSlug,
  initialMetaTitle,
  initialMetaDescription
}: Props) {
  const { update, togglePublish, isSaving } = useLandingPage()

  return (
    <LandingPageBuilder
      initialSections={initialSections}
      initialPublished={initialPublished}
      initialTitle={initialTitle}
      initialSlug={initialSlug}
      initialMetaTitle={initialMetaTitle}
      initialMetaDescription={initialMetaDescription}
      onSave={(sections, pageSettings) =>
        update(id, {
          content: sections,
          title: pageSettings.title,
          slug: pageSettings.slug,
          meta_title: pageSettings.metaTitle,
          meta_description: pageSettings.metaDescription
        })
      }
      onTogglePublish={(published: boolean) => togglePublish(id, published)}
      isSaving={isSaving}
    />
  )
}
