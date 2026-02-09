'use client'

import { FormField, FormSchema } from '@/components/forms/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { CheckCircle2, Plus, Trash2, X } from 'lucide-react'

interface FieldSettingsProps {
  schema: FormSchema
  setSchema: React.Dispatch<React.SetStateAction<FormSchema>>
  activeStepIndex: number
  activeFieldData: FormField | undefined
  setSelectedField: (field: string | null) => void
  updateField: (fieldName: string, updates: Partial<FormField>) => void
}

export function FieldSettings({
  schema,
  setSchema,
  activeStepIndex,
  activeFieldData,
  setSelectedField,
  updateField
}: FieldSettingsProps) {
  const activeStep = schema.steps[activeStepIndex]

  return (
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
                        schema.display_type === 'single' ? 'default' : 'outline'
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
                        schema.display_type === 'wizard' ? 'default' : 'outline'
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
                  activeFieldData.required ? 'bg-blue-600' : 'bg-gray-200'
                )}
              >
                <span
                  className={cn(
                    'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                    activeFieldData.required ? 'translate-x-5' : 'translate-x-0'
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
                          const newOpts = [...(activeFieldData.options || [])]
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
  )
}
