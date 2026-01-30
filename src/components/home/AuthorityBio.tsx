'use client'

import {
  FadeInRight,
  StaggerContainer,
  staggerItem
} from '@/components/ui/motion-container'
import { motion } from 'framer-motion'
import { TrendingUp, User } from 'lucide-react'
import Image from 'next/image'

export const AuthorityBio = () => {
  const credentials = [
    {
      icon: User,
      title: '10+ anos de experiência',
      subtitle: 'MERCADO JURÍDICO'
    },
    {
      icon: TrendingUp,
      title: 'Expert em Fluxos e Processos',
      subtitle: 'OTIMIZAÇÃO OPERACIONAL'
    }
  ]

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          <div className="w-full md:w-5/12">
            <div className="relative aspect-4/5 bg-white rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/assets/dayane-anastacio.jpg"
                alt="Dayane Anastacio"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="w-full md:w-7/12">
            <FadeInRight delay={0.2}>
              <span className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-4 block">
                Especialista em Gestão para escritórios de advocacia
              </span>

              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                Quem vai organizar seu escritório
              </h2>

              <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                Dayane Anastácio é consultora especializada em gestão de alta
                performance para escritórios de advocacia. Com uma visão
                analítica e sistêmica, ela transforma estruturas operacionais
                complexas em processos fluidos e lucrativos.
              </p>
            </FadeInRight>

            {/* Credentials Cards */}
            <StaggerContainer className="space-y-4 mb-10">
              {credentials.map((item, idx) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={idx}
                    variants={staggerItem}
                    className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-blue-100 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="shrink-0 w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-900 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                        {item.subtitle}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  )
}
