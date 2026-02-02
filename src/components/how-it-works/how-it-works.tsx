'use client'

import {
  FadeIn,
  StaggerContainer,
  staggerItem
} from '@/components/ui/motion-container'
import { motion } from 'framer-motion'
import { processSteps } from './how-it-works.data'
import { StepCard } from './step-card'

export const HowItWorks = () => {
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Como Implementar o Método GERAR de Gestão Jurídica',
    description:
      'Processo estruturado em 5 etapas para elevar a eficiência e o lucro da sua operação jurídica através de gestão estratégica.',
    totalTime: 'P3M', // 3 meses
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'BRL',
      value: 'Consultar'
    },
    step: processSteps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.title,
      text: step.description,
      itemListElement: step.deliverables.map((deliverable) => ({
        '@type': 'HowToDirection',
        text: `${deliverable.title}: ${deliverable.items.join(' ')}`
      }))
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <section className="py-24">
        <div className="container mx-auto px-4">
          <header className="text-center mb-16 max-w-3xl mx-auto">
            <FadeIn>
              <h2 className="text-4xl md:text-5xl font-extrabold text-deep-navy mb-6 leading-tight">
                O plano de ação para você reassumir o comando do seu escritório
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-lg text-gray-600">
                Um processo estruturado em 5 etapas para elevar a eficiência e o
                lucro da sua operação jurídica.
              </p>
            </FadeIn>
          </header>

          <StaggerContainer className="max-w-2xl mx-auto">
            {processSteps.map((step, index) => (
              <motion.div key={index} variants={staggerItem}>
                <StepCard
                  icon={step.icon}
                  title={step.title}
                  description={step.description}
                  deliverables={step.deliverables}
                  stepNumber={index + 1}
                  isLast={index === processSteps.length - 1}
                />
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  )
}
