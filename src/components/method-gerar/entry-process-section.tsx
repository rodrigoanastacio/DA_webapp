'use client'

import { motion } from 'framer-motion'
import { Calendar, CheckCircle, MessageSquare } from 'lucide-react'
import Link from 'next/link'

export const EntryProcessSection = () => {
  const steps = [
    'Avaliar sua estrutura atual',
    'Identificar gargalos críticos',
    'Entender seu momento de vida e negócio',
    'Apresentar um plano de ação personalizado'
  ]

  return (
    <section className="py-24 bg-brand-navy relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-gold/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <header className="mb-16">
            <span className="text-brand-gold font-bold tracking-[0.3em] text-xs uppercase mb-4 block">
              Próximo Passo
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-8">
              O primeiro passo é uma Conversa Estratégica de Reestruturação.
            </h2>
          </header>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 mb-12">
            <div className="flex items-center justify-center gap-3 mb-12 text-brand-gold">
              <MessageSquare size={24} />
              <span className="text-lg font-bold uppercase tracking-widest italic">
                Nesta reunião vamos:
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              {steps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <CheckCircle
                    size={20}
                    className="text-brand-gold shrink-0 mt-1"
                  />
                  <span className="text-lg text-gray-300 font-medium leading-relaxed">
                    {step}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="mt-16 pt-12 border-t border-white/5">
              <p className="text-gray-400 text-lg italic max-w-2xl mx-auto">
                &ldquo;Caso faça sentido para ambas as partes, apresento a
                proposta de implementação estratégica.&rdquo;
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-6">
            <Link
              href="/diagnostico-de-gestao"
              className="group relative inline-flex items-center gap-3 px-10 py-5 bg-brand-gold text-brand-navy text-xl font-black uppercase tracking-widest rounded-full hover:scale-105 transition-all duration-300 shadow-2xl shadow-brand-gold/20"
            >
              <Calendar className="shrink-0 transition-transform group-hover:rotate-12" />
              Agendar Conversa Estratégica
            </Link>
            <p className="text-white/20 text-sm font-bold tracking-widest uppercase italic">
              Vagas limitadas por mês devido à exclusividade do acompanhamento.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
