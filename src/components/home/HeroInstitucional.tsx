'use client'

import { FadeIn, FadeInRight, ScaleIn } from '@/components/ui/motion-container'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export function HeroInstitucional() {
  return (
    <section className="relative overflow-hidden bg-white">
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
            className="w-full h-auto object-cover max-h-[70vh]"
            priority
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="lg:w-1/2">
            {/* Left Column - Text */}
            <div className="flex flex-col justify-center space-y-6 pt-10 pb-16 md:py-28 lg:pr-16">
              <FadeIn delay={0.1}>
                <motion.div
                  className="inline-flex items-center gap-2 px-5 py-2 text-sm font-bold text-blue-700 bg-white/80 backdrop-blur-sm border border-blue-100 rounded-full cursor-default shadow-sm w-fit"
                  whileHover={{ scale: 1.05 }}
                >
                  <span
                    className="relative flex h-2.5 w-2.5"
                    aria-hidden="true"
                  >
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600" />
                  </span>
                  Gestão Jurídica e Organização
                </motion.div>
              </FadeIn>

              <FadeIn delay={0.2} duration={0.8}>
                <div className="space-y-3">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
                    Pare de ser refém do seu próprio escritório.
                  </h1>
                  <p className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-blue-600 tracking-tight leading-[1.1]">
                    Tenha processos que funcionam sem você.
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.4}>
                <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
                  Serviços especializados em gestão, processos e previsibilidade
                  para escritórios e advogados que buscam crescimento
                  sustentável.
                </p>
              </FadeIn>

              <ScaleIn delay={0.6}>
                <Link
                  href="/mentoria-e-gestao-estrategica"
                  className="inline-flex items-center px-10 py-5 text-lg font-bold text-white transition-all duration-300 bg-blue-600 rounded-2xl hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 w-fit"
                >
                  Conhecer o método
                </Link>
              </ScaleIn>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
