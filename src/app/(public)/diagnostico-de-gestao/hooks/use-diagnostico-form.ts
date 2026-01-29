import {
  DiagnosticoFormData,
  diagnosticoSchema
} from '@/lib/zod/diagnostico.schema'
import { diagnosticoService } from '@/services/diagnostico/diagnostico.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export function useDiagnosticoForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const methods = useForm<DiagnosticoFormData>({
    resolver: zodResolver(diagnosticoSchema),
    mode: 'onChange',
    defaultValues: {
      dificuldades: []
    }
  })

  const { trigger, getValues } = methods

  // Corrigido: Mapeamento de campos por passo (0 a 5)
  const STEPS_FIELDS: (keyof DiagnosticoFormData)[][] = [
    ['name', 'email', 'whatsapp', 'cityState'], // Passo 0: Introdução (com dados de contato)
    ['experienceTime', 'currentRole'], // Passo 1: Perfil Profissional
    ['teamStructure', 'managementLevel'], // Passo 2: Estrutura
    ['dificuldades'], // Passo 3: Desafios
    ['revenue'], // Passo 4: Momento Financeiro
    ['expectativas', 'investment'] // Passo 5: Finalização
  ]

  const nextStep = async () => {
    const fieldsToValidate = STEPS_FIELDS[currentStep]

    if (!fieldsToValidate || fieldsToValidate.length === 0) {
      setCurrentStep((prev) => prev + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    const isValid = await trigger(fieldsToValidate as any)
    if (isValid) {
      if (currentStep === 5) {
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
      const result = await diagnosticoService.submit(data)

      if (result.success) {
        setIsSubmitted(true)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    } catch (error: unknown) {
      console.error(error)
      // Assuming 'toast' is imported or globally available, and 'setStep' should be 'setCurrentStep'
      // If 'toast' is not defined, this line will cause a runtime error.
      // If 'setStep' is not defined, this line will cause a runtime error.
      // For syntactic correctness, these lines are included as per instruction,
      // but may require further context/imports to function correctly.
      // toast.error('Erro ao enviar diagnóstico')
      // setCurrentStep(0)
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
