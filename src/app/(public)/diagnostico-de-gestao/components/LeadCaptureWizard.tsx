'use client'

import { FadeIn, ScaleIn } from '@/components/ui/motion-container'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react'
import { FormProvider } from 'react-hook-form'
import { useLeadForm } from '../hooks/use-lead-form'
import { Step1Introduction } from './steps/Step1Introduction'
import { Step2ProfessionalProfile } from './steps/Step2ProfessionalProfile'
import { Step3Structure } from './steps/Step3Structure'
import { Step4Final } from './steps/Step4Final'
import { StepSuccess } from './steps/StepSuccess'

const STEPS_DATA = [
  { id: 0, label: 'Etapa 01', nextLabel: 'Perfil Profissional' },
  {
    id: 1,
    label: 'Etapa 02',
    nextLabel: 'Estrutura do Escritório'
  },
  {
    id: 2,
    label: 'Etapa 03',
    nextLabel: 'Intenção e Expectativas'
  },
  { id: 3, label: 'Etapa 04', nextLabel: 'Finalização' }
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
      <section className="relative min-h-screen flex flex-col items-center justify-center bg-white py-20 px-4 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-[140px]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-brand-navy/5 rounded-full blur-[120px]" />
        </div>

        <div className="w-full max-w-3xl relative z-10">
          <ScaleIn>
            <div className="bg-white rounded-[40px] shadow-2xl border border-brand-gold/10 overflow-hidden">
              <div className="p-10 md:p-16">
                <StepSuccess />
              </div>
            </div>
          </ScaleIn>
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
    <section className="relative min-h-screen flex flex-col items-center bg-white py-12 md:py-24 px-4 overflow-hidden font-manrope">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-brand-navy/5 rounded-full blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)',
            backgroundSize: '30px 30px'
          }}
        />
      </div>

      <div className="w-full max-w-4xl relative z-10 flex flex-col gap-8">
        {/* Header with Progress */}
        <FadeIn delay={0.1}>
          <div className="px-2 flex flex-col gap-4">
            <div className="flex items-end justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-brand-gold font-bold tracking-[0.2em] text-[10px] uppercase">
                  Diagnóstico Estratégico
                </span>
                <h2 className="text-brand-navy text-2xl font-black uppercase tracking-tighter">
                  {currentStepData.label}{' '}
                  <span className="text-gray-300 font-light ml-2">/ 04</span>
                </h2>
              </div>
              <div className="text-right hidden md:block">
                <span className="text-gray-400 text-xs font-bold uppercase tracking-widest block mb-1">
                  Próxima fase
                </span>
                <span className="text-brand-navy font-bold text-sm tracking-tight">
                  {currentStepData.nextLabel}
                </span>
              </div>
            </div>

            <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                className="h-full bg-brand-gold shadow-[0_0_10px_rgba(212,175,55,0.3)]"
                transition={{ duration: 0.8, ease: 'circOut' }}
              />
            </div>
          </div>
        </FadeIn>

        {/* Card Container */}
        <FadeIn delay={0.2}>
          <div className="bg-white rounded-[40px] shadow-2xl shadow-brand-navy/5 border border-brand-gold/5 overflow-hidden">
            <div className="p-8 md:p-14 flex flex-col gap-8">
              <FormProvider {...methods}>
                <form onSubmit={(e) => e.preventDefault()} className="relative">
                  {renderStep()}

                  <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-50">
                    <div className="flex-1">
                      {currentStep > 0 && (
                        <button
                          type="button"
                          onClick={prevStep}
                          className="group flex items-center gap-2 text-gray-400 hover:text-brand-navy font-bold uppercase tracking-widest text-xs transition-colors cursor-pointer"
                        >
                          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                          Voltar
                        </button>
                      )}
                    </div>

                    <div className="flex-1 flex justify-end">
                      <button
                        type="button"
                        onClick={nextStep}
                        disabled={isSubmitting}
                        className="group relative inline-flex min-w-[200px] h-14 items-center justify-center rounded-2xl px-8 bg-brand-navy text-white text-xs font-black uppercase tracking-[0.2em] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-brand-navy/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer overflow-hidden"
                      >
                        {/* Shine effect */}
                        <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shine" />

                        {isSubmitting ? (
                          <span className="flex items-center gap-2 relative z-10">
                            Enviando...
                            <Loader2 className="w-4 h-4 animate-spin" />
                          </span>
                        ) : currentStep === 3 ? (
                          <span className="flex items-center gap-2 relative z-10">
                            Enviar Diagnóstico
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </span>
                        ) : (
                          <span className="flex items-center gap-2 relative z-10">
                            Continuar
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </FormProvider>
            </div>
          </div>
        </FadeIn>

        {/* Support Footer */}
        <FadeIn delay={0.3}>
          <p className="text-center text-gray-400 text-[10px] font-bold uppercase tracking-widest">
            Sua privacidade é nossa prioridade • Dados protegidos por
            criptografia
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
