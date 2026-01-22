'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { DiagnosticFormData, diagnosticSchema } from '../schema'
import { Step1Introduction } from './steps/Step1Introduction'
import { Step2ProfessionalProfile } from './steps/Step2ProfessionalProfile'

const STEPS = [
  { id: 0, label: 'Etapa 1 de 6', nextLabel: 'Próximo: Perfil Profissional' },
  { id: 1, label: 'Etapa 2 de 6', nextLabel: 'Próximo: Detalhes do Negócio' }
  // Add more steps as needed
]

export default function DiagnosticWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const methods = useForm<DiagnosticFormData>({
    resolver: zodResolver(diagnosticSchema),
    mode: 'onChange'
  })

  // Validate only current step fields before moving
  const nextStep = async () => {
    let fieldsToValidate: (keyof DiagnosticFormData)[] = []

    if (currentStep === 0) {
      fieldsToValidate = ['name', 'email', 'whatsapp', 'cityState']
    }

    const isValid = await methods.trigger(fieldsToValidate)
    if (isValid) {
      setCurrentStep((prev) => prev + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <Step1Introduction />
      case 1:
        return <Step2ProfessionalProfile />
      default:
        return null
    }
  }

  const currentStepData = STEPS[currentStep] || STEPS[0]
  const progressPercentage = ((currentStep + 1) / 6) * 100 // Based on 6 steps

  return (
    <section className="min-h-screen flex flex-col items-center font-sans bg-blue-50 text-gray-800 py-20 px-4">
      <div className="w-full max-w-[960px] mx-auto flex flex-col gap-4">
        {/* Header with Progress */}
        <div className="mb-6 px-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <p className="text-blue-700 text-sm font-bold uppercase tracking-wider">
              {currentStepData.label}
            </p>
            <span className="text-blue-700 text-xs font-medium">
              {currentStepData.nextLabel}
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-blue-100 overflow-hidden">
            <div
              className="h-full bg-blue-700 transition-all duration-500 ease-in-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 md:p-12 flex flex-col gap-8">
            <FormProvider {...methods}>
              <form onSubmit={(e) => e.preventDefault()}>
                {renderStep()}

                <div className="flex items-center justify-end mt-8 border-t border-gray-100 pt-6">
                  {currentStep > 0 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="mr-auto text-gray-500 hover:text-gray-700 font-medium px-4 py-2"
                    >
                      Voltar
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={nextStep}
                    className="inline-flex min-w-[160px] h-11 items-center justify-center rounded-lg px-4 bg-blue-700 hover:bg-blue-600 transition-colors text-white text-sm font-bold shadow-lg shadow-blue-700/20"
                  >
                    {currentStep === 5 ? 'Finalizar' : 'Próxima Etapa'}
                    <span className="material-symbols-outlined text-[20px] ml-2">
                      →
                    </span>
                  </button>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </section>
  )
}
