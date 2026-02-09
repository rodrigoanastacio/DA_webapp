'use client'

import { Button } from '@/components/ui/button'
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
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle2, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { DynamicFormProps, FormField } from './types'

export function DynamicForm({
  schema,
  onSubmit,
  defaultValues,
  className
}: DynamicFormProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const isWizard = schema.display_type === 'wizard'
  const currentStep = schema.steps[currentStepIndex]
  const isLastStep = currentStepIndex === schema.steps.length - 1

  // 1. Construir schema de validação dinâmico com Zod
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formSchemaObject: any = {}
  schema.steps.forEach((step) => {
    step.fields.forEach((field) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let validator: any = z.string()

      if (field.type === 'email') {
        validator = validator.email('E-mail inválido')
      }

      if (!field.required) {
        validator = validator.optional().or(z.literal(''))
      } else {
        validator = validator.min(1, `${field.label} é obrigatório`)
      }

      formSchemaObject[field.name] = validator
    })
  })

  const formSchema = z.object(formSchemaObject)
  type FormValues = z.infer<typeof formSchema>

  // 2. Inicializar form
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: (defaultValues as Record<string, unknown>) || {}
  })

  // 3. Handlers
  const onNext = async () => {
    // Validar apenas campos do passo atual antes de prosseguir
    const currentFields = currentStep.fields.map((f) => f.name)
    const isValid = await trigger(currentFields as (keyof FormValues)[])

    if (isValid) {
      setCurrentStepIndex((prev) => prev + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const onPrev = () => {
    setCurrentStepIndex((prev) => prev - 1)
  }

  const handleProcessSubmit = async (data: FormValues) => {
    try {
      await onSubmit(data as Record<string, unknown>)
    } catch (error) {
      console.error('Form submission error:', error)
    }
  }

  // 4. Renderizador de campos
  const renderField = (field: FormField) => {
    const error = errors[field.name as keyof FormValues]

    return (
      <div key={field.name} className="space-y-2">
        <Label
          htmlFor={field.name}
          className="text-sm font-bold text-gray-700 flex justify-between"
        >
          {field.label}
          {field.required && (
            <span className="text-rose-500 text-xs">* Obrigatório</span>
          )}
        </Label>

        {field.type === 'textarea' ? (
          <Textarea
            id={field.name}
            placeholder={field.placeholder}
            {...register(field.name as keyof FormValues)}
            className={cn(
              'rounded-xl border-gray-200 focus:ring-blue-500/20 transition-all min-h-[100px]',
              error && 'border-rose-500 focus:ring-rose-500/20'
            )}
          />
        ) : field.type === 'select' ? (
          <Select
            onValueChange={(val) =>
              setValue(field.name as keyof FormValues, val, {
                shouldValidate: true
              })
            }
            defaultValue={watch(field.name as keyof FormValues) as string}
          >
            <SelectTrigger
              className={cn(
                'rounded-xl border-gray-200 h-12',
                error && 'border-rose-500'
              )}
            >
              <SelectValue
                placeholder={field.placeholder || 'Selecione uma opção'}
              />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <Input
            id={field.name}
            type={field.type}
            placeholder={field.placeholder}
            {...register(field.name as keyof FormValues)}
            className={cn(
              'rounded-xl border-gray-200 h-12 focus:ring-blue-500/20 transition-all',
              error && 'border-rose-500 focus:ring-rose-500/20'
            )}
          />
        )}

        {field.helperText && !error && (
          <p className="text-[10px] text-gray-400 font-medium pl-1">
            {field.helperText}
          </p>
        )}

        {error && (
          <p className="text-xs text-rose-500 font-bold pl-1 animate-in fade-in slide-in-from-top-1">
            {error.message as string}
          </p>
        )}
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(handleProcessSubmit)}
      className={cn('w-full max-w-xl mx-auto space-y-8', className)}
    >
      {/* Progress Bar (Wizard Only) */}
      {isWizard && schema.steps.length > 1 && (
        <div className="space-y-4 mb-10">
          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-widest">
                Passo {currentStepIndex + 1} de {schema.steps.length}
              </span>
              <h3 className="text-lg font-black text-gray-900">
                {currentStep.title}
              </h3>
            </div>
            <span className="text-sm font-bold text-gray-400">
              {Math.round(((currentStepIndex + 1) / schema.steps.length) * 100)}
              %
            </span>
          </div>
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-500 ease-out shadow-[0_0_12px_rgba(37,99,235,0.4)]"
              style={{
                width: `${((currentStepIndex + 1) / schema.steps.length) * 100}%`
              }}
            />
          </div>
        </div>
      )}

      {/* Step Description */}
      {!isWizard && schema.description && (
        <p className="text-gray-500 text-sm leading-relaxed">
          {schema.description}
        </p>
      )}
      {isWizard && currentStep.description && (
        <p className="text-gray-500 text-sm leading-relaxed -mt-4">
          {currentStep.description}
        </p>
      )}

      {/* Fields */}
      <div className="space-y-6">{currentStep.fields.map(renderField)}</div>

      {/* Actions */}
      <div className="flex gap-4 pt-4">
        {isWizard && currentStepIndex > 0 && (
          <Button
            type="button"
            variant="outline"
            onClick={onPrev}
            disabled={isSubmitting}
            className="flex-1 h-14 rounded-2xl border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition-all"
          >
            <ChevronLeft className="mr-2 w-5 h-5" />
            Anterior
          </Button>
        )}

        {isWizard && !isLastStep ? (
          <Button
            type="button"
            onClick={onNext}
            className="flex-2 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-200 group"
          >
            Próximo Passo
            <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        ) : (
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-2 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-500/20 active:scale-[0.98]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 animate-spin w-5 h-5" />
                Processando...
              </>
            ) : (
              <>
                {schema.submit_label || 'Finalizar Solicitação'}
                <CheckCircle2 className="ml-2 w-5 h-5" />
              </>
            )}
          </Button>
        )}
      </div>
    </form>
  )
}
