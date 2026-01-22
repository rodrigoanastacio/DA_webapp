'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { DiagnosticFormData, diagnosticSchema } from '../schema'
import { Step1Introduction } from './steps/Step1Introduction'
import { Step2ProfessionalProfile } from './steps/Step2ProfessionalProfile'
import { Step3Structure } from './steps/Step3Structure'
import { Step4Challenges } from './steps/Step4Challenges'
import { Step5Financial } from './steps/Step5Financial'
import { Step6Final } from './steps/Step6Final'

const STEPS = [
  { id: 0, label: 'Etapa 1 de 6', nextLabel: 'Próximo: Perfil Profissional' },
  {
    id: 1,
    label: 'Etapa 2 de 6',
    nextLabel: 'Próximo: Estrutura do Escritório'
  },
  { id: 2, label: 'Etapa 3 de 6', nextLabel: 'Próximo: Dificuldades Atuais' },
  { id: 3, label: 'Etapa 4 de 6', nextLabel: 'Próximo: Momento Financeiro' },
  {
    id: 4,
    label: 'Etapa 5 de 6',
    nextLabel: 'Próximo: Intenção e Expectativas'
  },
  { id: 5, label: 'Etapa 6 de 6', nextLabel: 'Finalização' }
  // Add more steps as needed
]

export default function DiagnosticWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const methods = useForm<DiagnosticFormData>({
    resolver: zodResolver(diagnosticSchema),
    mode: 'onChange',
    defaultValues: {
      dificuldades: [] // Initialize array for checkboxes
    }
  })

  // Validate only current step fields before moving
  const nextStep = async () => {
    let fieldsToValidate: (keyof DiagnosticFormData)[] = []

    if (currentStep === 0) {
      fieldsToValidate = ['name', 'email', 'whatsapp', 'cityState']
    } else if (currentStep === 1) {
      fieldsToValidate = ['experienceTime', 'currentRole']
    } else if (currentStep === 2) {
      fieldsToValidate = ['teamStructure', 'managementLevel']
    } else if (currentStep === 3) {
      fieldsToValidate = ['dificuldades']
    } else if (currentStep === 4) {
      fieldsToValidate = ['revenue']
    } else if (currentStep === 5) {
      fieldsToValidate = ['expectativas', 'investment']
    }

    const isValid = await methods.trigger(fieldsToValidate)
    if (isValid) {
      if (currentStep === 5) {
        // Final Submission (Mock)
        alert('Diagnóstico enviado com sucesso! (Dados no console)')
        console.log('Form Data:', methods.getValues())
        return
      }

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
      case 2:
        return <Step3Structure />
      case 3:
        return <Step4Challenges />
      case 4:
        return <Step5Financial />
      case 5:
        return <Step6Final />
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
            {currentStep === 5 ? (
              <div className="flex items-center gap-2">
                <p className="text-blue-700 text-sm font-bold uppercase tracking-wider">
                  Etapa 6 de 6
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
          {currentStep === 5 && (
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
                    className="inline-flex min-w-[160px] h-11 items-center justify-center rounded-lg px-4 bg-blue-700 hover:bg-blue-600 transition-colors text-white text-sm font-bold shadow-lg shadow-blue-700/20"
                  >
                    {currentStep === 5 ? (
                      <>
                        Enviar Diagnóstico
                        <span className="material-symbols-outlined text-[20px] ml-2">
                          send
                        </span>
                      </>
                    ) : (
                      <>
                        {STEPS[currentStep].nextLabel.includes('Finalização')
                          ? 'Ir para Finalização'
                          : 'Próxima Etapa'}
                        <span className="material-symbols-outlined text-[20px] ml-2">
                          →
                        </span>
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
