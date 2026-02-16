'use client'

import { ArrowRight, Loader2 } from 'lucide-react'
import { FormProvider } from 'react-hook-form'
import { useLeadForm } from '../hooks/use-lead-form'
import { Step1Introduction } from './steps/Step1Introduction'
import { Step2ProfessionalProfile } from './steps/Step2ProfessionalProfile'
import { Step3Structure } from './steps/Step3Structure'
import { Step4Final } from './steps/Step4Final'
import { StepSuccess } from './steps/StepSuccess'

const STEPS_DATA = [
  { id: 0, label: 'Etapa 1 de 4', nextLabel: 'Próximo: Perfil Profissional' },
  {
    id: 1,
    label: 'Etapa 2 de 4',
    nextLabel: 'Próximo: Estrutura do Escritório'
  },
  {
    id: 2,
    label: 'Etapa 3 de 4',
    nextLabel: 'Próximo: Intenção e Expectativas'
  },
  { id: 3, label: 'Etapa 4 de 4', nextLabel: 'Finalização' }
]

export default function LeadCaptureWizard() {
  const {
    currentStep,
    isSubmitted,
    isSubmitting,
    methods,
    nextStep,
    prevStep
  } = useLeadForm()

  const progressPercentage = ((currentStep + 1) / 4) * 100

  if (isSubmitted) {
    return (
      <section className="min-h-screen flex flex-col items-center font-sans bg-blue-50 text-gray-800 py-20 px-4">
        <div className="w-full max-w-[960px] mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-8 md:p-12">
              <StepSuccess />
            </div>
          </div>
        </div>
      </section>
    )
  }

  const currentStepData = STEPS_DATA[currentStep] || STEPS_DATA[0]

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <Step1Introduction />
      case 1:
        return <Step2ProfessionalProfile />
      case 2:
        return <Step3Structure />
      case 3:
        return <Step4Final />
      default:
        return null
    }
  }

  return (
    <section className="min-h-screen flex flex-col items-center font-sans bg-blue-50 text-gray-800 py-20 px-4">
      <div className="w-full max-w-[960px] mx-auto flex flex-col gap-4">
        {/* Header with Progress */}
        <div className="mb-6 px-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            {currentStep === 3 ? (
              <div className="flex items-center gap-2">
                <p className="text-blue-700 text-sm font-bold uppercase tracking-wider">
                  Etapa 4 de 4
                </p>
                <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                  100% Completo
                </span>
              </div>
            ) : (
              <div className="flex items-center justify-between w-full">
                <p className="text-blue-700 text-sm font-bold uppercase tracking-wider">
                  {currentStepData.label}
                </p>
                <span className="text-blue-700 text-xs font-medium">
                  {currentStepData.nextLabel}
                </span>
              </div>
            )}
          </div>
          <div className="h-2 w-full rounded-full bg-blue-100 overflow-hidden">
            <div
              className="h-full bg-blue-700 transition-all duration-500 ease-in-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          {currentStep === 3 && (
            <p className="text-blue-300 text-xs font-medium">
              Finalização e Envio
            </p>
          )}
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
                    disabled={isSubmitting}
                    className="inline-flex min-w-[160px] h-11 items-center justify-center rounded-lg px-4 bg-blue-700 hover:bg-blue-600 transition-colors text-white text-sm font-bold shadow-lg shadow-blue-700/20 gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        Enviando...
                        <Loader2 className="w-4 h-4 animate-spin" />
                      </span>
                    ) : currentStep === 3 ? (
                      <>
                        Enviar Diagnóstico
                        <ArrowRight className="w-5 h-5" />
                      </>
                    ) : (
                      <>
                        {currentStepData.nextLabel.includes('Finalização')
                          ? 'Ir para Finalização'
                          : 'Próxima Etapa'}
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
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
