'use client'

import { FormSchema } from '@/components/forms/types'
import { LPSection } from '@/components/lp-renderer/SectionRenderer'
import { FormRow } from '@/shared/api-handlers/forms/forms.handler'
import { useLandingPageBuilder } from '../hooks/use-landing-page-builder'
import { CanvasPreview } from './builder/canvas-preview'
import { PropertiesPanel } from './builder/properties-panel'
import { SidebarDraggable } from './builder/sidebar-draggable'

import { Button } from '@/components/ui/button'
import { Maximize2, Minimize2 } from 'lucide-react'
import { useState } from 'react'

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
  const [isFullscreen, setIsFullscreen] = useState(false)

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
    <div className="flex h-full bg-gray-50/50 overflow-hidden font-sans relative">
      {/* LEFT SIDEBAR: TOOLBOX - Hidden in Fullscreen */}
      {!isFullscreen && <SidebarDraggable onAddSection={actions.addSection} />}

      {/* MIDDLE: CANVAS PREVIEW */}
      {/* We wrap CanvasPreview to position the generic toggle button */}
      <div className="flex-1 relative flex flex-col min-h-0 overflow-hidden">
        <div className="absolute top-4 right-6 z-50">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="bg-white/90 backdrop-blur shadow-sm border-gray-200 hover:bg-white text-gray-700 gap-2"
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="w-4 h-4" />
                <span className="sr-only sm:not-sr-only sm:inline-block">
                  Sair
                </span>
              </>
            ) : (
              <>
                <Maximize2 className="w-4 h-4" />
                <span className="sr-only sm:not-sr-only sm:inline-block">
                  Tela Cheia
                </span>
              </>
            )}
          </Button>
        </div>

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
      </div>

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
