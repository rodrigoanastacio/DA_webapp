'use client'

import { FieldType, FormSchema } from '@/components/forms/types'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  GripVertical,
  List,
  Mail,
  MessageSquare,
  Phone,
  Plus,
  Settings,
  Trash2,
  Type,
  X
} from 'lucide-react'
import { ToolButton } from './tool-button'

interface FormEditorContentProps {
  schema: FormSchema
  activeStepIndex: number
  selectedField: string | null
  setActiveStepIndex: (index: number) => void
  setSelectedField: (field: string | null) => void
  addField: (type: FieldType) => void
  removeField: (fieldName: string) => void
  addStep: () => void
  removeStep: (index: number) => void
}

export function FormEditorContent({
  schema,
  activeStepIndex,
  selectedField,
  setActiveStepIndex,
  setSelectedField,
  addField,
  removeField,
  addStep,
  removeStep
}: FormEditorContentProps) {
  const activeStep = schema.steps[activeStepIndex]

  return (
    <>
      {/* Sidebar - Toolbar */}
      <div className="w-72 border-r border-gray-50 bg-[#F8FAFC]/50 p-6 overflow-y-auto">
        <h3 className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-6">
          Elementos do Form
        </h3>

        <div className="grid gap-3">
          <ToolButton
            icon={<Type size={18} />}
            label="Texto Curto"
            onClick={() => addField('text')}
          />
          <ToolButton
            icon={<Mail size={18} />}
            label="E-mail"
            onClick={() => addField('email')}
          />
          <ToolButton
            icon={<Phone size={18} />}
            label="WhatsApp"
            onClick={() => addField('tel')}
          />
          <ToolButton
            icon={<MessageSquare size={18} />}
            label="Texto Longo"
            onClick={() => addField('textarea')}
          />
          <ToolButton
            icon={<List size={18} />}
            label="Seleção"
            onClick={() => addField('select')}
          />
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 bg-white overflow-y-auto p-12">
        <div className="max-w-2xl mx-auto">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-extrabold text-[#111827] mb-2">
              Construindo seu Formulário
            </h2>
            <p className="text-gray-500 font-medium">
              Arraste os elementos ou clique para adicionar à lista.
            </p>
          </div>

          {/* Step Navigation/Management */}
          <div className="mb-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {schema.steps.map((step, index) => (
              <div key={step.id} className="flex items-center group">
                <button
                  onClick={() => {
                    setActiveStepIndex(index)
                    setSelectedField(null)
                  }}
                  className={cn(
                    'px-4 py-2 rounded-xl text-xs font-bold transition-all border whitespace-nowrap',
                    activeStepIndex === index
                      ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200'
                      : 'bg-white border-gray-100 text-gray-500 hover:border-gray-300'
                  )}
                >
                  {index + 1}. {step.title || 'Sem título'}
                </button>
                {schema.steps.length > 1 && (
                  <button
                    onClick={() => removeStep(index)}
                    className="w-0 overflow-hidden group-hover:w-6 transition-all text-gray-400 hover:text-rose-500 ml-1"
                  >
                    <X size={14} />
                  </button>
                )}
                {index < schema.steps.length - 1 && (
                  <div className="w-4 h-px bg-gray-100 mx-1" />
                )}
              </div>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={addStep}
              className="rounded-xl h-8 px-3 text-blue-600 hover:bg-blue-50 font-bold text-[10px] uppercase tracking-wider"
            >
              <Plus size={14} className="mr-1" /> Novo Passo
            </Button>
          </div>

          <div className="space-y-4">
            {activeStep.fields.length === 0 ? (
              <div className="border-2 border-dashed border-gray-100 rounded-[24px] p-20 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-blue-50 text-blue-400 rounded-full flex items-center justify-center mb-4">
                  <Plus size={32} />
                </div>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-[11px]">
                  Adicione seu primeiro campo
                </p>
              </div>
            ) : (
              schema.steps[activeStepIndex].fields.map((field) => (
                <div
                  key={field.name}
                  onClick={() => setSelectedField(field.name)}
                  className={cn(
                    'group relative bg-white border rounded-2xl p-6 transition-all cursor-pointer',
                    selectedField === field.name
                      ? 'border-blue-600 ring-4 ring-blue-50 shadow-xl'
                      : 'border-gray-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5'
                  )}
                >
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-200 group-hover:text-blue-200 transition-colors cursor-grab active:cursor-grabbing">
                    <GripVertical size={20} />
                  </div>

                  <div className="ml-6 flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-extrabold text-blue-500 uppercase tracking-widest">
                          {field.type}
                        </span>
                        {field.required && (
                          <span className="bg-rose-50 text-rose-600 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">
                            Obrigatório
                          </span>
                        )}
                      </div>
                      <h4 className="font-bold text-[#111827]">
                        {field.label}
                      </h4>
                      {field.placeholder && (
                        <p className="text-xs text-gray-400 italic">
                          Placeholder: {field.placeholder}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                          'rounded-lg transition-colors',
                          selectedField === field.name
                            ? 'text-blue-600 bg-blue-50'
                            : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'
                        )}
                      >
                        <Settings size={18} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation()
                          removeField(field.name)
                        }}
                        className="rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50"
                      >
                        <Trash2 size={18} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  )
}
