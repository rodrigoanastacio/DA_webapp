'use client'

import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

export const TransformationSection = () => {
  const benefits = [
    'Operação organizada e previsível',
    'Processos claros e padronizados',
    'Redução de retrabalho',
    'Delegação estruturada',
    'Mais tempo estratégico para o sócio',
    'Equipe alinhada',
    'Base para crescimento sustentável'
  ]

  return (
    <section id="resultados" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-brand-gold font-bold tracking-widest text-sm uppercase mb-4 block">
                Resultados Reais
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-brand-navy leading-tight mb-8">
                O que muda ao final do processo
              </h2>

              <div className="space-y-4">
                {benefits.map((benefit, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="size-6 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-colors duration-300">
                      <CheckCircle2 size={16} />
                    </div>
                    <span className="text-gray-700 font-medium text-lg italic">
                      {benefit}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
              <div className="relative bg-brand-navy p-10 md:p-16 rounded-[40px] shadow-2xl border border-white/5">
                <blockquote className="space-y-6">
                  <p className="text-2xl md:text-3xl font-bold text-white leading-relaxed italic">
                    &quot;Você deixa de ser o{' '}
                    <span className="text-brand-gold">gargalo</span> e passa a
                    ser o <span className="text-brand-gold">estrategista</span>{' '}
                    do seu negócio.&quot;
                  </p>
                  <footer className="pt-6 border-t border-white/10">
                    <div className="h-1 w-12 bg-brand-gold rounded-full" />
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
