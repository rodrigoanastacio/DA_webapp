'use client'

import { motion } from 'framer-motion'
import { LineChart, Scale, Users } from 'lucide-react'
import Image from 'next/image'

const services = [
  {
    icon: Scale,
    title: 'Gestão GERAR',
    description:
      'Gestão estratégica, estruturação de processos e rotinas, e acompanhamento continuo de forma mensal, para quem busca crescimento com previsibilidade e sustentabilidade.',
    image: '/assets/service-legal.png',
    link: '/lp/mentoria-e-gestao-estrategica'
  },
  {
    icon: LineChart,
    title: 'Consultoria GERAR',
    description:
      'Consultoria com implementação orientada, estruturação de  processos, rotinas e organização interna com acompanhamento de 30 dias, para quem busca crescer com direcionamento, clareza e metas definidas.',
    image: '/assets/service-strategy.png',
    link: '/lp/mentoria-e-gestao-estrategica'
  },
  {
    icon: Users,
    title: 'Plano de Ação',
    description:
      'Diagnóstico e direcionamento estratégico, para quem busca um plano estratégico de reorganização do próprio negócio.',
    image: '/assets/service-mentorship.png',
    link: '/lp/mentoria-e-gestao-estrategica'
  }
]

export function ServicesSection() {
  return (
    <section className="py-24 bg-stone-50" id="servicos">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-full bg-white border border-orange-100 text-orange-800 text-sm font-bold tracking-wide shadow-sm"
          >
            O que eu entrego
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-montserrat text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
          >
            Soluções para quem deseja{' '}
            <span className="text-amber-900">
              sair do improviso e do caos diário
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Estruturação de processos e definição de rotinas, para que você
            tenha mais controle da sua empresa e liberdade operacional.
          </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col bg-slate-900 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-slate-900/20 hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-900 to-transparent opacity-80" />

                <div className="absolute bottom-6 left-8 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-800/90 backdrop-blur-sm text-amber-500 shadow-lg border border-slate-700">
                  <service.icon size={28} strokeWidth={1.5} />
                </div>
              </div>
              <div className="p-8 flex flex-col grow">
                <h3 className="font-montserrat text-2xl font-bold text-white mb-4 group-hover:text-amber-500 transition-colors">
                  {service.title}
                </h3>

                <p className="text-slate-300 leading-relaxed mb-8 grow text-base">
                  {service.description}
                </p>

                <div className="mt-auto pt-6 border-t border-slate-800">
                  {/* <Link
                    href={service.link}
                    className="group/btn inline-flex items-center text-amber-500 font-bold hover:text-amber-400 transition-colors"
                  >
                    Saber mais
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </Link> */}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
