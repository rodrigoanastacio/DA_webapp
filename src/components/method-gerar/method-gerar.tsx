'use client'

import { FadeIn, StaggerContainer } from '@/components/ui/motion-container'
import { MethodCard } from './method-card'
import { methodSteps } from './method-gerar.data'

export const MethodGerar = () => {
  return (
    <section
      id="metodo"
      className="py-24 bg-linear-to-b from-gray-50 to-white relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-5 z-0"
        style={{
          backgroundImage:
            'radial-gradient(circle at 2px 2px, #333 1px, transparent 0)',
          backgroundSize: '24px 24px'
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 relative z-10">
        <header className="text-center mb-16">
          <FadeIn>
            <span className="text-brand-gold font-bold tracking-widest text-sm uppercase mb-3 block">
              Metodologia Exclusiva
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-4xl md:text-6xl font-extrabold text-brand-navy mb-8 leading-tight">
              Método GERAR™
              <span className="block text-xl md:text-2xl font-medium text-gray-400 mt-4 max-w-4xl mx-auto">
                Sistema Estratégico de Estruturação para Escritórios Jurídicos e
                Empresas
              </span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="max-w-4xl mx-auto space-y-6">
              <p className="text-xl text-gray-600 leading-relaxed">
                O Método GERAR é um modelo de reestruturação operacional
                desenvolvido para negócios que cresceram em faturamento, mas não
                em organização e governança.
              </p>

              <div className="flex flex-wrap justify-center gap-4 text-sm font-bold uppercase tracking-widest text-gray-400 italic">
                <span>Não é assistência operacional</span>
                <span className="hidden md:inline">•</span>
                <span>Não é consultoria genérica</span>
                <span className="hidden md:inline">•</span>
                <span>Não é organização pontual</span>
              </div>

              <p className="text-2xl font-extrabold text-brand-gold bg-brand-gold/5 py-4 px-8 rounded-2xl inline-block mt-4">
                É implementação estratégica assistida.
              </p>
            </div>
          </FadeIn>
        </header>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-5 gap-0 mb-24 border border-brand-gold/20 rounded-xl overflow-hidden bg-white">
          {methodSteps.map((step, index) => (
            <MethodCard
              key={index}
              letter={step.letter}
              title={step.title}
              description={step.description}
              index={index}
              isLast={index === methodSteps.length - 1}
            />
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
