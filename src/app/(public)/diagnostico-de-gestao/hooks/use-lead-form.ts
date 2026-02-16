import { useUTM } from '@/hooks/useUTM'
import { LeadFormData, leadSchema } from '@/lib/zod/lead.schema'
import { diagnosticosService } from '@/services/diagnosticos/diagnosticos.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export function useLeadForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const utmParams = useUTM()

  const methods = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      whatsapp: '',
      instagram: ''
    }
  })

  const { trigger, getValues } = methods

  const STEPS_FIELDS: (keyof LeadFormData)[][] = [
    ['name', 'email', 'whatsapp', 'instagram'], // Passo 0: Introdução (com dados de contato)
    ['experienceTime', 'revenue'], // Passo 1: Perfil Profissional
    [
      'teamStructure',
      'managementLevel',
      'overloadChallenges',
      'idealStructure'
    ], // Passo 2: Estrutura
    ['investment'] // Passo 3: Finalização
  ]

  const nextStep = async () => {
    const fieldsToValidate = STEPS_FIELDS[currentStep]

    if (!fieldsToValidate || fieldsToValidate.length === 0) {
      setCurrentStep((prev) => prev + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isValid = await trigger(fieldsToValidate as unknown as any)
    if (isValid) {
      if (currentStep === 3) {
        await handleSubmit()
        return
      }
      setCurrentStep((prev) => prev + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const data = getValues()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await diagnosticosService.submit(data, utmParams as any)

      if (result.success) {
        setIsSubmitted(true)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    } catch (error: unknown) {
      console.error(error)
      // TODO: Implementar toast error
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    currentStep,
    isSubmitted,
    isSubmitting,
    methods,
    nextStep,
    prevStep
  }
}
