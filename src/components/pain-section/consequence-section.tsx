'use client'

import { motion } from 'framer-motion'
import { AlertCircle, XCircle } from 'lucide-react'

export const ConsequenceSection = () => {
  const costs = [
    'Horas estratégicas perdidas',
    'Decisões adiadas',
    'Crescimento travado',
    'Risco operacional',
    'Equipe desmotivada',
    'Clientes mal acompanhados',
    'Perda de margem'
  ]

  return (
    <section className="py-24 bg-[#0a0a0a] border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <header className="mb-16 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-widest mb-6">
              <AlertCircle size={14} />O custo invisível da desorganização
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
              A falta de estrutura custa mais caro do que você imagina.
            </h2>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              {costs.map((cost, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/2 border border-white/5 hover:bg-white/4 transition-colors group"
                >
                  <XCircle
                    size={18}
                    className="text-red-500/60 group-hover:text-red-500 transition-colors"
                  />
                  <span className="text-gray-300 font-medium">{cost}</span>
                </motion.div>
              ))}
            </div>

            <div className="bg-linear-to-br from-brand-gold/10 to-transparent p-8 md:p-12 rounded-3xl border border-brand-gold/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

              <div className="relative z-10 space-y-6">
                <p className="text-xl text-gray-400 leading-relaxed">
                  Você pode continuar assim, equilibrando pratos e gerindo o
                  caos...
                </p>

                <div className="h-px w-full bg-white/10" />

                <h3 className="text-2xl md:text-3xl font-bold text-white leading-relaxed">
                  Ou pode estruturar seu negócio para operar com{' '}
                  <span className="text-brand-gold italic">
                    governança e previsibilidade.
                  </span>
                </h3>

                <motion.div
                  className="pt-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="inline-block h-1 w-12 bg-brand-gold rounded-full" />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
