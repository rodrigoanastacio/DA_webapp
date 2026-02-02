'use client'

import { FadeIn, StaggerContainer } from '@/components/ui/motion-container'
import { MethodCard } from './method-card'
import { methodSteps } from './method-gerar.data'

export const MethodGerar = () => {
  return (
    <section className="py-24 bg-linear-to-b from-gray-50 to-white relative overflow-hidden">
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
            <span className="text-blue-600 font-bold tracking-widest text-sm uppercase mb-3 block">
              Metodologia Exclusiva
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-extrabold text-deep-navy mb-6">
              Os 5 Pilares do Método GERAR
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg text-gray-500 max-w-3xl mx-auto leading-relaxed">
              Nossa metodologia exclusiva para transformar a gestão do seu
              escritório de advocacia em uma máquina de eficiência.
            </p>
          </FadeIn>
        </header>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-5 gap-0 mb-24 border border-gray-200 rounded-xl overflow-hidden bg-white">
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
