'use client'

import { FormSchema } from '@/components/forms/types'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Monitor, Smartphone } from 'lucide-react'
import { toast } from 'sonner'

interface FormPreviewProps {
  schema: FormSchema
  previewMode: 'desktop' | 'mobile'
  setPreviewMode: (mode: 'desktop' | 'mobile') => void
  activeStepIndex: number
  setActiveStepIndex: (index: number | ((prev: number) => number)) => void
}

export function FormPreview({
  schema,
  previewMode,
  setPreviewMode,
  activeStepIndex,
  setActiveStepIndex
}: FormPreviewProps) {
  return (
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
              {schema.display_type === 'wizard' && activeStepIndex > 0 && (
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
  )
}
