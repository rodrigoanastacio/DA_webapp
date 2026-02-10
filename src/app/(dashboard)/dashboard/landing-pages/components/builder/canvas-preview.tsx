import {
  LPSection,
  SectionRenderer
} from '@/components/lp-renderer/SectionRenderer'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { MousePointer2, MoveVertical, Trash2 } from 'lucide-react'

import { FormSchema } from '@/components/forms/types'

interface CanvasPreviewProps {
  sections: LPSection[]
  selectedId: string | null
  setSelectedId: (id: string | null) => void
  deleteSection: (id: string) => void
  handleDragEnd: (event: DragEndEvent) => void
  onAddHero: () => void
  activeForm?: FormSchema
}

function SortableSection({
  section,
  isSelected,
  onClick,
  onDelete,
  activeForm
}: {
  section: LPSection
  isSelected: boolean
  onClick: () => void
  onDelete: () => void
  activeForm?: FormSchema
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: section.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'relative group mb-6 transition-all duration-200',
        isSelected
          ? 'ring-2 ring-blue-500 ring-offset-4 ring-offset-gray-50 rounded-lg'
          : 'hover:ring-2 hover:ring-blue-200 hover:ring-offset-2 hover:ring-offset-gray-50 rounded-lg'
      )}
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
    >
      <div
        className={cn(
          'absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-blue-600 text-white rounded-full px-3 py-1 shadow-lg z-50 transition-opacity duration-200',
          isSelected || isDragging
            ? 'opacity-100'
            : 'opacity-0 group-hover:opacity-100'
        )}
      >
        <div
          {...listeners}
          {...attributes}
          className="cursor-move p-1 hover:bg-blue-700 rounded-full"
        >
          <MoveVertical size={14} />
        </div>
        <div className="w-px h-3 bg-white/20 mx-1" />
        <button
          onClick={(e) => {
            e.stopPropagation()
            onDelete()
          }}
          className="p-1 hover:bg-red-500 rounded-full transition-colors"
        >
          <Trash2 size={14} />
        </button>
      </div>

      <div
        className={cn(
          'pointer-events-none select-none border border-border/50 bg-white shadow-sm rounded-lg overflow-hidden',
          isDragging && 'shadow-xl scale-[1.02]'
        )}
      >
        <SectionRenderer section={section} form={activeForm} />
      </div>
    </div>
  )
}

export function CanvasPreview({
  sections,
  selectedId,
  setSelectedId,
  deleteSection,
  handleDragEnd,
  onAddHero,
  activeForm
}: CanvasPreviewProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  return (
    <div
      className="flex-1 overflow-y-auto bg-[#F8F9FA] relative flex flex-col"
      onClick={() => setSelectedId(null)}
    >
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="flex-1 py-12 px-8 min-h-full flex justify-center">
        <div className="w-full max-w-5xl">
          <DndContext
            id="landing-page-builder-dnd"
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={sections.map((s) => s.id)}
              strategy={verticalListSortingStrategy}
            >
              <div
                className={cn(
                  'min-h-[800px] transition-all duration-300',
                  sections.length === 0
                    ? 'flex items-center justify-center'
                    : 'space-y-8'
                )}
              >
                {sections.length === 0 ? (
                  <div className="text-center p-12 border-2 border-dashed border-gray-200 rounded-2xl bg-white/50 backdrop-blur max-w-lg">
                    <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MousePointer2 size={32} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Comece sua página
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Selecione componentes na biblioteca à esquerda para
                      começar a construir.
                    </p>
                    <Button onClick={onAddHero} variant="outline">
                      Adicionar Hero Section
                    </Button>
                  </div>
                ) : (
                  sections.map((section) => (
                    <SortableSection
                      key={section.id}
                      section={section}
                      isSelected={section.id === selectedId}
                      onClick={() => setSelectedId(section.id)}
                      onDelete={() => deleteSection(section.id)}
                      activeForm={activeForm}
                    />
                  ))
                )}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </div>
  )
}
