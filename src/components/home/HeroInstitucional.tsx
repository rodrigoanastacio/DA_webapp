'use client'

import { FadeIn, FadeInRight, ScaleIn } from '@/components/ui/motion-container'
import { sendGTMEvent } from '@/lib/gtm'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export function HeroInstitucional() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-white">
      <div className="relative max-w-screen-2xl mx-auto min-h-screen flex flex-col lg:justify-center">
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/4 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Desktop Image (full height, edge to edge) */}
        <div className="hidden lg:block absolute inset-y-0 right-0 w-1/2">
          <FadeInRight delay={0.3} className="h-full">
            <div className="relative h-full">
              <Image
                src="/assets/dayane-anastacio.jpg"
                alt="Dayane Anastácio - Consultora em Gestão Jurídica"
                fill
                className="object-cover"
                priority
                sizes="50vw"
              />
            </div>
          </FadeInRight>
        </div>

        {/* Mobile Image - above text, edge to edge */}
        <div className="lg:hidden w-full overflow-hidden">
          <Image
            src="/assets/dayane-anastacio.jpg"
            alt="Dayane Anastácio - Consultora em Gestão Jurídica"
            width={800}
            height={1000}
            className="w-full h-auto object-cover object-top max-h-[70vh]"
            priority
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="lg:w-1/2">
            {/* Left Column - Text */}
            <div className="flex flex-col justify-center space-y-6 pt-10 pb-16 md:py-28 lg:pr-16">
              <FadeIn delay={0.1}>
                <motion.div
                  className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-orange-900 bg-stone-50 backdrop-blur-sm border border-orange-100 rounded-full cursor-default shadow-amber-100 w-fit"
                  whileHover={{ scale: 1.05 }}
                >
                  <span
                    className="relative flex h-2.5 w-2.5"
                    aria-hidden="true"
                  >
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-600 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-600" />
                  </span>
                  Gestão, Consultoria e Planejamento
                </motion.div>
              </FadeIn>

              <FadeIn delay={0.2} duration={0.8}>
                <div className="space-y-3">
                  <h1 className="font-montserrat text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-[1.1]">
                    Gestão e processos para{' '}
                    <strong className="text-4xl md:text-5xl lg:text-6xl font-bold text-amber-900 tracking-tight leading-[1.1]">
                      escritórios de advocacia e negócios digitais
                    </strong>
                  </h1>
                </div>
              </FadeIn>

              <FadeIn delay={0.4}>
                <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
                  Estrutura empresarial, rotina sustentável e decisões
                  estratégicas para quem busca crescer com previsibilidade e
                  liberdade operacional.
                </p>
              </FadeIn>

              <ScaleIn delay={0.6}>
                <Link
                  href="/lp/mentoria-e-gestao-estrategica"
                  onClick={() =>
                    sendGTMEvent({
                      event: 'cta_click',
                      location: 'hero_institucional_cta',
                      label: 'quero_estruturar_meu_negocio',
                      destination: '/lp/mentoria-e-gestao-estrategica'
                    })
                  }
                  className="inline-flex items-center px-10 py-5 text-lg font-bold text-white transition-all duration-300 bg-amber-800 rounded-2xl hover:bg-amber-900 hover:shadow-amber-400 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-amber-900 focus:ring-offset-2 w-fit"
                >
                  Quero estruturar meu negócio
                </Link>
              </ScaleIn>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
