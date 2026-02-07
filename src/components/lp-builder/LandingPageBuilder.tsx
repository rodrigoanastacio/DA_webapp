'use client'

import {
  LPSection,
  SectionRenderer
} from '@/components/lp-renderer/SectionRenderer'
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
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useState } from 'react'

// UI Components
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import {
  Grid,
  LayoutTemplate,
  MousePointer2,
  MoveVertical,
  Trash2,
  Type
} from 'lucide-react'

interface LandingPageBuilderProps {
  initialSections?: LPSection[]
  onSave: (
    sections: LPSection[]
  ) => Promise<{ success: boolean; slug?: string; message?: string }>
}

// Draggable wrapper component
function SortableSection({
  section,
  isSelected,
  onClick,
  onDelete
}: {
  section: LPSection
  isSelected: boolean
  onClick: () => void
  onDelete: () => void
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
      {/* Drag Handle & Tools - Visible on Hover/Selected */}
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

      {/* Render the actual component with pointer-events disabled to allow drag */}
      <div
        className={cn(
          'pointer-events-none select-none border border-border/50 bg-white shadow-sm rounded-lg overflow-hidden',
          isDragging && 'shadow-xl scale-[1.02]'
        )}
      >
        <SectionRenderer section={section} />
      </div>
    </div>
  )
}

export function LandingPageBuilder({
  initialSections = [],
  onSave
}: LandingPageBuilderProps) {
  const [sections, setSections] = useState<LPSection[]>(initialSections)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setSections((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  function addSection(type: 'hero') {
    const newSection: LPSection = {
      id: `${type}-${Date.now()}`,
      type,
      data: {
        headline: 'Nova Seção',
        subheadline: 'Edite este texto no painel lateral.',
        theme: 'light'
      }
    }
    setSections([...sections, newSection])
    setSelectedId(newSection.id)
  }

  async function handleSave() {
    setIsSaving(true)
    try {
      const result = await onSave(sections)
      if (result.success && result.slug) {
        if (
          confirm(
            `Página salva com sucesso! Deseja visualizar agora?\n\nSlug: ${result.slug}`
          )
        ) {
          window.open(`/lp/${result.slug}`, '_blank')
        }
      } else {
        alert(result.message || 'Erro ao salvar página.')
      }
    } catch (err) {
      console.error(err)
      alert('Erro ao processar salvamento.')
    } finally {
      setIsSaving(false)
    }
  }

  function deleteSection(id: string) {
    setSections(sections.filter((s) => s.id !== id))
    if (selectedId === id) setSelectedId(null)
  }

  const selectedSection = sections.find((s) => s.id === selectedId)

  function updateSectionData(key: string, value: string) {
    if (!selectedId) return

    setSections((prev) =>
      prev.map((section) =>
        section.id === selectedId
          ? {
              ...section,
              data: { ...section.data, [key]: value }
            }
          : section
      )
    )
  }

  return (
    <div className="flex h-full bg-gray-50/50 overflow-hidden font-sans">
      {/* LEFT SIDEBAR: TOOLBOX */}
      <div className="w-72 bg-white border-r border-gray-200 flex flex-col shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)] z-20">
        <div className="p-5 border-b border-gray-100 bg-white/50 backdrop-blur-sm">
          <h2 className="font-semibold text-gray-900 flex items-center gap-2">
            <LayoutTemplate className="w-4 h-4 text-blue-600" />
            Biblioteca
          </h2>
          <p className="text-xs text-gray-500 mt-1">Componentes disponíveis</p>
        </div>

        <div className="p-4 space-y-4 overflow-y-auto flex-1 custom-scrollbar">
          <div className="space-y-3">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-1">
              Essenciais
            </p>

            <Card
              className="p-3 cursor-pointer hover:border-blue-300 hover:shadow-md transition-all group active:scale-95"
              onClick={() => addSection('hero')}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-md group-hover:bg-blue-100 transition-colors">
                  <Type size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    Hero Section
                  </h3>
                  <p className="text-xs text-gray-500">Destaque principal</p>
                </div>
              </div>
            </Card>

            {/* Placeholder for more components */}
            <Card className="p-3 opacity-60 bg-gray-50 border-dashed cursor-not-allowed">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 text-gray-400 rounded-md">
                  <Grid size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Features
                  </h3>
                  <p className="text-xs text-gray-400">Em breve</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* CENTER: CANVAS */}
      <div
        className="flex-1 overflow-y-auto bg-[#F8F9FA] relative flex flex-col"
        onClick={() => setSelectedId(null)}
      >
        {/* Dot Pattern Background */}
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
                      <Button
                        onClick={() => addSection('hero')}
                        variant="outline"
                      >
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
                      />
                    ))
                  )}
                </div>
              </SortableContext>
            </DndContext>
          </div>
        </div>
      </div>

      {/* RIGHT SIDEBAR: PROPERTIES */}
      <div className="w-80 bg-white border-l border-gray-200 flex flex-col shadow-[-4px_0_24px_-12px_rgba(0,0,0,0.1)] z-20">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-white/50 backdrop-blur-sm">
          <h2 className="font-semibold text-gray-900">Propriedades</h2>
          <Button
            size="sm"
            onClick={handleSave}
            disabled={isSaving}
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm disabled:opacity-50"
          >
            {isSaving ? 'Salvando...' : 'Salvar'}
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {selectedSection ? (
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded uppercase tracking-wide">
                  {selectedSection.type}
                </div>
                <span className="text-xs text-gray-400 font-mono">
                  {selectedSection.id}
                </span>
              </div>

              {/* Dynamic Form based on Section Type */}
              {selectedSection.type === 'hero' && (
                <div className="space-y-5 animate-in slide-in-from-right-4 duration-300">
                  <div className="space-y-2">
                    <Label htmlFor="headline">Headline</Label>
                    <Textarea
                      id="headline"
                      value={(selectedSection.data.headline as string) || ''}
                      onChange={(e) =>
                        updateSectionData('headline', e.target.value)
                      }
                      rows={2}
                      className="resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subheadline">Subheadline</Label>
                    <Textarea
                      id="subheadline"
                      value={(selectedSection.data.subheadline as string) || ''}
                      onChange={(e) =>
                        updateSectionData('subheadline', e.target.value)
                      }
                      rows={4}
                      className="resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 pt-2">
                    <div className="space-y-2">
                      <Label htmlFor="ctaLabel">Texto do Botão</Label>
                      <Input
                        id="ctaLabel"
                        value={(selectedSection.data.ctaLabel as string) || ''}
                        onChange={(e) =>
                          updateSectionData('ctaLabel', e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ctaLink">Link de Destino</Label>
                      <Input
                        id="ctaLink"
                        value={(selectedSection.data.ctaLink as string) || ''}
                        onChange={(e) =>
                          updateSectionData('ctaLink', e.target.value)
                        }
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <Label>Tema Visual</Label>
                    <Select
                      value={(selectedSection.data.theme as string) || 'light'}
                      onValueChange={(value) =>
                        updateSectionData('theme', value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um tema" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Claro (Light)</SelectItem>
                        <SelectItem value="dark">Escuro (Dark)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center text-gray-400">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <MousePointer2 size={24} className="text-gray-300" />
              </div>
              <h4 className="font-medium text-gray-900 mb-1">
                Nada selecionado
              </h4>
              <p className="text-sm">
                Clique em um bloco na área central para editar seus detalhes.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
