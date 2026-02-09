'use client'

import {
  FieldType,
  FormField,
  FormSchema,
  FormStep
} from '@/components/forms/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { formsService } from '@/services/forms/forms.service'
import {
  CheckCircle2,
  ChevronLeft,
  GripVertical,
  List,
  Mail,
  MessageSquare,
  Monitor,
  Phone,
  Plus,
  Save,
  Settings,
  Smartphone,
  Trash2,
  Type,
  X
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

interface FormBuilderProps {
  formId: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialData: any
}

export function FormBuilder({ formId, initialData }: FormBuilderProps) {
  const router = useRouter()
  const [schema, setSchema] = useState<FormSchema>(
    initialData.schema as FormSchema
  )
  const [isSaving, setIsSaving] = useState(false)
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>(
    'desktop'
  )
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor')
  const [selectedField, setSelectedField] = useState<string | null>(null)
  const [activeStepIndex, setActiveStepIndex] = useState(0)

  const activeStep = schema.steps[activeStepIndex]
  const activeFieldData = schema.steps
    .flatMap((s) => s.fields)
    .find((f) => f.name === selectedField)

  // Salvar automaticamente ou manual
  const handleSave = async () => {
    setIsSaving(true)
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await formsService.update(formId, { schema: schema as any })
      toast.success('Alterações salvas com sucesso!')
    } catch (error) {
      console.error(error)
      toast.error('Erro ao salvar formulário.')
    } finally {
      setIsSaving(false)
    }
  }

  const addField = (type: FieldType) => {
    const newField: FormField = {
      name: `field_${Date.now()}`,
      label: `Novo Campo de ${type}`,
      type,
      required: false,
      placeholder: ''
    }

    setSchema((prev) => ({
      ...prev,
      steps: prev.steps.map((step, idx) =>
        idx === activeStepIndex
          ? { ...step, fields: [...step.fields, newField] }
          : step
      )
    }))
  }

  const addStep = () => {
    const newStep: FormStep = {
      id: crypto.randomUUID(),
      title: `Nova Etapa ${schema.steps.length + 1}`,
      fields: []
    }
    setSchema((prev) => ({
      ...prev,
      steps: [...prev.steps, newStep],
      display_type: 'wizard'
    }))
    setActiveStepIndex(schema.steps.length)
  }

  const removeStep = (index: number) => {
    if (schema.steps.length <= 1) return
    setSchema((prev) => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== index),
      display_type: prev.steps.length - 1 <= 1 ? 'single' : 'wizard'
    }))
    setActiveStepIndex(Math.max(0, index - 1))
  }

  const removeField = (fieldName: string) => {
    if (selectedField === fieldName) setSelectedField(null)
    setSchema((prev) => ({
      ...prev,
      steps: prev.steps.map((step) => ({
        ...step,
        fields: step.fields.filter((f) => f.name !== fieldName)
      }))
    }))
  }

  const updateField = (fieldName: string, updates: Partial<FormField>) => {
    setSchema((prev) => ({
      ...prev,
      steps: prev.steps.map((step) => ({
        ...step,
        fields: step.fields.map((f) =>
          f.name === fieldName ? { ...f, ...updates } : f
        )
      }))
    }))
  }

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] bg-white border border-gray-100 rounded-[32px] overflow-hidden shadow-2xl">
      {/* Top Bar */}
      <div className="h-20 border-b border-gray-50 px-8 flex items-center justify-between bg-white z-20">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="rounded-xl hover:bg-gray-50"
          >
            <ChevronLeft className="w-5 h-5 text-gray-400" />
          </Button>
          <div>
            <h1 className="text-lg font-extrabold text-[#111827] leading-none mb-1">
              {schema.name}
            </h1>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
              Form Builder <span className="mx-2">•</span>{' '}
              {schema.display_type === 'wizard'
                ? 'Multi-etapas'
                : 'Página Única'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-100 mr-4">
            <button
              onClick={() => setActiveTab('editor')}
              className={cn(
                'px-4 py-2 rounded-lg text-xs font-bold transition-all uppercase tracking-wider',
                activeTab === 'editor'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-400 hover:text-gray-600'
              )}
            >
              Editor
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={cn(
                'px-4 py-2 rounded-lg text-xs font-bold transition-all uppercase tracking-wider',
                activeTab === 'preview'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-400 hover:text-gray-600'
              )}
            >
              Preview
            </button>
          </div>

          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-xl h-11 px-6 font-extrabold shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Salvar
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {activeTab === 'editor' ? (
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

            {/* Sidebar - Properties */}
            <div className="w-80 border-l border-gray-50 bg-white p-8 overflow-y-auto">
              {!activeFieldData ? (
                <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-extrabold text-[#111827] uppercase tracking-wider">
                      Configurações do Passo
                    </h3>
                  </div>

                  <div className="space-y-6">
                    {/* Step Title */}
                    <div className="space-y-2">
                      <Label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
                        Título da Etapa
                      </Label>
                      <Input
                        value={activeStep.title || ''}
                        onChange={(e) => {
                          const newSteps = [...schema.steps]
                          newSteps[activeStepIndex] = {
                            ...activeStep,
                            title: e.target.value
                          }
                          setSchema((prev) => ({ ...prev, steps: newSteps }))
                        }}
                        className="rounded-xl border-gray-100 bg-gray-50 focus:bg-white transition-all font-medium"
                        placeholder="Ex: Dados Pessoais"
                      />
                    </div>

                    {/* Step Description */}
                    <div className="space-y-2">
                      <Label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
                        Descrição da Etapa
                      </Label>
                      <Input
                        value={activeStep.description || ''}
                        onChange={(e) => {
                          const newSteps = [...schema.steps]
                          newSteps[activeStepIndex] = {
                            ...activeStep,
                            description: e.target.value
                          }
                          setSchema((prev) => ({ ...prev, steps: newSteps }))
                        }}
                        className="rounded-xl border-gray-100 bg-gray-50 focus:bg-white transition-all font-medium"
                        placeholder="Breve resumo desta etapa"
                      />
                    </div>

                    <div className="pt-8 border-t border-gray-50">
                      <h3 className="text-sm font-extrabold text-[#111827] uppercase tracking-wider mb-6">
                        Configurações Globais
                      </h3>

                      <div className="space-y-6">
                        {/* Submit Label */}
                        <div className="space-y-2">
                          <Label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
                            Texto do Botão Final
                          </Label>
                          <Input
                            value={schema.submit_label || ''}
                            onChange={(e) =>
                              setSchema((prev) => ({
                                ...prev,
                                submit_label: e.target.value
                              }))
                            }
                            className="rounded-xl border-gray-100 bg-gray-50 focus:bg-white transition-all font-medium"
                            placeholder="Ex: Enviar Mensagem"
                          />
                        </div>

                        {/* Display Type */}
                        <div className="space-y-2">
                          <Label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
                            Tipo de Exibição
                          </Label>
                          <div className="grid grid-cols-2 gap-2">
                            <Button
                              variant={
                                schema.display_type === 'single'
                                  ? 'default'
                                  : 'outline'
                              }
                              onClick={() =>
                                setSchema((prev) => ({
                                  ...prev,
                                  display_type: 'single'
                                }))
                              }
                              className={cn(
                                'text-[10px] font-bold h-9',
                                schema.display_type === 'single'
                                  ? 'bg-neutral-900 text-white'
                                  : ''
                              )}
                            >
                              Única Página
                            </Button>
                            <Button
                              variant={
                                schema.display_type === 'wizard'
                                  ? 'default'
                                  : 'outline'
                              }
                              onClick={() =>
                                setSchema((prev) => ({
                                  ...prev,
                                  display_type: 'wizard'
                                }))
                              }
                              className={cn(
                                'text-[10px] font-bold h-9',
                                schema.display_type === 'wizard'
                                  ? 'bg-neutral-900 text-white'
                                  : ''
                              )}
                            >
                              Multi-etapas
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-extrabold text-[#111827] uppercase tracking-wider">
                      Propriedades
                    </h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedField(null)}
                      className="rounded-lg"
                    >
                      <X size={16} />
                    </Button>
                  </div>

                  <div className="space-y-6">
                    {/* Label */}
                    <div className="space-y-2">
                      <Label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
                        Rótulo (Label)
                      </Label>
                      <Input
                        value={activeFieldData.label}
                        onChange={(e) =>
                          updateField(activeFieldData.name, {
                            label: e.target.value
                          })
                        }
                        className="rounded-xl border-gray-100 bg-gray-50 focus:bg-white transition-all font-medium"
                      />
                    </div>

                    {/* Placeholder */}
                    <div className="space-y-2">
                      <Label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
                        Placeholder
                      </Label>
                      <Input
                        value={activeFieldData.placeholder || ''}
                        onChange={(e) =>
                          updateField(activeFieldData.name, {
                            placeholder: e.target.value
                          })
                        }
                        className="rounded-xl border-gray-100 bg-gray-50 focus:bg-white transition-all font-medium"
                      />
                    </div>

                    {/* Helper Text */}
                    <div className="space-y-2">
                      <Label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
                        Texto de Ajuda
                      </Label>
                      <Input
                        value={activeFieldData.helperText || ''}
                        onChange={(e) =>
                          updateField(activeFieldData.name, {
                            helperText: e.target.value
                          })
                        }
                        className="rounded-xl border-gray-100 bg-gray-50 focus:bg-white transition-all font-medium"
                      />
                    </div>

                    {/* Required Switch (Custom) */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                      <div className="space-y-0.5">
                        <Label className="text-xs font-bold text-gray-700">
                          Obrigatório
                        </Label>
                        <p className="text-[10px] text-gray-400">
                          Torna o preenchimento vital
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          updateField(activeFieldData.name, {
                            required: !activeFieldData.required
                          })
                        }
                        className={cn(
                          'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none',
                          activeFieldData.required
                            ? 'bg-blue-600'
                            : 'bg-gray-200'
                        )}
                      >
                        <span
                          className={cn(
                            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                            activeFieldData.required
                              ? 'translate-x-5'
                              : 'translate-x-0'
                          )}
                        />
                      </button>
                    </div>

                    {/* Options (Only for Select) */}
                    {activeFieldData.type === 'select' && (
                      <div className="space-y-4 pt-4 border-t border-gray-50">
                        <Label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
                          Opções do Menu
                        </Label>
                        <div className="space-y-2">
                          {(activeFieldData.options || []).map((opt, idx) => (
                            <div key={idx} className="flex gap-2">
                              <Input
                                value={opt.label}
                                onChange={(e) => {
                                  const newOpts = [
                                    ...(activeFieldData.options || [])
                                  ]
                                  newOpts[idx] = {
                                    ...opt,
                                    label: e.target.value,
                                    value: e.target.value
                                      .toLowerCase()
                                      .replace(/\s+/g, '_')
                                  }
                                  updateField(activeFieldData.name, {
                                    options: newOpts
                                  })
                                }}
                                placeholder="Rótulo"
                                className="rounded-lg h-9 text-xs"
                              />
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9 text-gray-400 hover:text-rose-500"
                                onClick={() => {
                                  const newOpts = (
                                    activeFieldData.options || []
                                  ).filter((_, i) => i !== idx)
                                  updateField(activeFieldData.name, {
                                    options: newOpts
                                  })
                                }}
                              >
                                <Trash2 size={14} />
                              </Button>
                            </div>
                          ))}
                          <Button
                            variant="outline"
                            className="w-full h-9 rounded-lg border-dashed border-gray-200 text-blue-600 text-xs font-bold"
                            onClick={() => {
                              const newOpts = [
                                ...(activeFieldData.options || []),
                                { label: 'Nova Opção', value: 'nova_opcao' }
                              ]
                              updateField(activeFieldData.name, {
                                options: newOpts
                              })
                            }}
                          >
                            <Plus size={14} className="mr-2" /> Adicionar Opção
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-8 border-t border-gray-50">
                    <div className="bg-blue-50 p-4 rounded-2xl flex items-start gap-3">
                      <CheckCircle2
                        size={18}
                        className="text-blue-600 shrink-0 mt-0.5"
                      />
                      <p className="text-[11px] text-blue-700 font-medium leading-relaxed">
                        As alterações aqui são aplicadas instantaneamente ao seu
                        formulário. Não esqueça de Salvar ao finalizar.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          /* Preview Mode */
          <div className="flex-1 bg-gray-50 flex flex-col items-center p-8 overflow-hidden">
            <div className="flex items-center gap-4 mb-8 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
              <button
                onClick={() => setPreviewMode('desktop')}
                className={cn(
                  'p-3 rounded-xl transition-all',
                  previewMode === 'desktop'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                    : 'text-gray-400 hover:bg-gray-50'
                )}
              >
                <Monitor size={20} />
              </button>
              <button
                onClick={() => setPreviewMode('mobile')}
                className={cn(
                  'p-3 rounded-xl transition-all',
                  previewMode === 'mobile'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                    : 'text-gray-400 hover:bg-gray-50'
                )}
              >
                <Smartphone size={20} />
              </button>
            </div>

            <div
              className={cn(
                'bg-white rounded-[32px] border border-gray-200 shadow-2xl transition-all duration-500 overflow-y-auto mb-10',
                previewMode === 'desktop'
                  ? 'w-full max-w-4xl h-full'
                  : 'w-[375px] h-[667px]'
              )}
            >
              <div className="p-12">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
                  {schema.name}
                </h2>
                <p className="text-gray-500 mb-10">{schema.description}</p>

                <div className="space-y-6">
                  {schema.steps.map((step, sIdx) => (
                    <div
                      key={step.id}
                      className={cn(
                        'space-y-6',
                        schema.display_type === 'wizard' &&
                          activeStepIndex !== sIdx &&
                          'hidden'
                      )}
                    >
                      {schema.display_type === 'wizard' && (
                        <div className="mb-6">
                          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em]">
                            Passo {sIdx + 1} de {schema.steps.length}
                          </span>
                          <h3 className="text-xl font-extrabold text-gray-900">
                            {step.title}
                          </h3>
                        </div>
                      )}
                      {step.fields.map((field) => (
                        <div key={field.name} className="space-y-2">
                          <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                            {field.label}{' '}
                            {field.required && (
                              <span className="text-rose-500">*</span>
                            )}
                          </label>
                          <div className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50/50 flex items-center px-4 text-gray-400 text-sm italic">
                            Visualização do campo...
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}

                  <div className="flex gap-4 mt-8">
                    {schema.display_type === 'wizard' &&
                      activeStepIndex > 0 && (
                        <Button
                          variant="outline"
                          onClick={() => setActiveStepIndex((prev) => prev - 1)}
                          className="flex-1 h-14 rounded-xl text-lg font-extrabold uppercase tracking-widest border-gray-200"
                        >
                          Voltar
                        </Button>
                      )}
                    <Button
                      onClick={() => {
                        if (
                          schema.display_type === 'wizard' &&
                          activeStepIndex < schema.steps.length - 1
                        ) {
                          setActiveStepIndex((prev) => prev + 1)
                        } else {
                          toast.info('Simulação de envio concluída!')
                        }
                      }}
                      className="flex-2 h-14 bg-blue-600 rounded-xl text-lg font-extrabold uppercase tracking-widest shadow-xl shadow-blue-200"
                    >
                      {schema.display_type === 'wizard' &&
                      activeStepIndex < schema.steps.length - 1
                        ? 'Próximo'
                        : schema.submit_label || 'Enviar'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function ToolButton({
  icon,
  label,
  onClick
}: {
  icon: React.ReactNode
  label: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/5 transition-all text-left group overflow-hidden relative"
    >
      <div className="text-gray-400 group-hover:text-blue-600 transition-colors">
        {icon}
      </div>
      <span className="text-sm font-bold text-gray-600 group-hover:text-[#111827] transition-colors">
        {label}
      </span>
      <div className="absolute right-[-10px] top-[-10px] opacity-0 group-hover:opacity-10 transition-all group-hover:right-[-5px] group-hover:top-[-5px]">
        <Plus size={40} className="text-blue-600" />
      </div>
    </button>
  )
}

function Loader2(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  )
}
