'use client'

import { FormSchema } from '@/components/forms/types'
import { LPSection } from '@/components/lp-renderer/SectionRenderer'
import { FormRow } from '@/shared/api-handlers/forms/forms.handler'
import { useLandingPageBuilder } from '../hooks/use-landing-page-builder'
import { CanvasPreview } from './builder/canvas-preview'
import { PropertiesPanel } from './builder/properties-panel'
import { SidebarDraggable } from './builder/sidebar-draggable'

interface LandingPageBuilderProps {
  initialSections?: LPSection[]
  initialPublished?: boolean
  initialTitle?: string
  initialSlug?: string
  initialMetaTitle?: string
  initialMetaDescription?: string
  initialFormId?: string
  availableForms?: FormRow[]
  onSave: (
    sections: LPSection[],
    pageSettings: {
      title: string
      slug: string
      metaTitle?: string
      metaDescription?: string
      formId?: string
    }
  ) => Promise<{ success: boolean; slug?: string; message?: string }>
  onTogglePublish?: (published: boolean) => Promise<{ success: boolean }>
  isSaving?: boolean
}

export function LandingPageBuilder(props: LandingPageBuilderProps) {
  const {
    sections,
    selectedId,
    setSelectedId,
    isPublished,
    isSaving,
    pageSettings,
    setPageSettings,
    selectedSection,
    actions
  } = useLandingPageBuilder({
    initialSections: props.initialSections,
    initialPublished: props.initialPublished,
    initialTitle: props.initialTitle,
    initialSlug: props.initialSlug,
    initialMetaTitle: props.initialMetaTitle,
    initialMetaDescription: props.initialMetaDescription,
    initialFormId: props.initialFormId,
    onSave: props.onSave,
    onTogglePublish: props.onTogglePublish
  })

  return (
    <div className="flex h-full bg-gray-50/50 overflow-hidden font-sans">
      {/* LEFT SIDEBAR: TOOLBOX */}
      <SidebarDraggable onAddSection={actions.addSection} />

      {/* MIDDLE: CANVAS PREVIEW */}
      <CanvasPreview
        sections={sections}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        deleteSection={actions.deleteSection}
        handleDragEnd={actions.handleDragEnd}
        onAddHero={() => actions.addSection('hero')}
        activeForm={
          props.availableForms?.find((f) => f.id === pageSettings.formId)
            ?.schema as unknown as FormSchema
        }
      />

      {/* RIGHT SIDEBAR: PROPERTIES */}
      <PropertiesPanel
        selectedSection={selectedSection}
        pageSettings={pageSettings}
        setPageSettings={setPageSettings}
        updateSectionData={actions.updateSectionData}
        isPublished={isPublished}
        isSaving={isSaving}
        onTogglePublish={actions.handleTogglePublish}
        onSave={actions.handleSave}
        availableForms={props.availableForms || []}
      />
    </div>
  )
}
