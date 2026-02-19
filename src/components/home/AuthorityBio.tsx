'use client'

import { motion } from 'framer-motion'
import { TrendingUp, UserCheck } from 'lucide-react'
import Image from 'next/image'

export const AuthorityBio = () => {
  const credentials = [
    {
      icon: UserCheck,
      title: '10+ anos de experiência',
      subtitle: 'Mercado Jurídico e Corporativo',
      fullWidth: false
    },
    {
      icon: TrendingUp,
      title: 'Especialista em Processos',
      subtitle: 'Otimização e Escala Operacional',
      fullWidth: false
    }
  ]

  return (
    <section
      className="py-24 lg:py-32 bg-white overflow-hidden relative"
      id="sobre"
    >
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-amber-50 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-orange-50 rounded-full blur-2xl opacity-40 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-5/12 relative"
          >
            <div className="relative aspect-4/5 rounded-3xl overflow-hidden shadow-2xl shadow-stone-200">
              <Image
                src="/assets/avatar.jpg"
                alt="Dayane Anastácio - Consultora de Gestão"
                fill
                className="object-cover object-top hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 100vw"
                priority
              />

              <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-lg border border-white/50 flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-bold text-gray-800">
                  Método de gestão GERAR
                </span>
              </div>
            </div>

            <div className="absolute -z-10 top-6 -left-6 w-full h-full rounded-3xl border-2 border-amber-100" />
          </motion.div>

          <div className="w-full lg:w-7/12 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                Quem vai te guiar
              </div>

              <h2 className="font-montserrat text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                Gestão estratégica para{' '}
                <span className="text-amber-900 decoration-amber-200/30 underline decoration-4 underline-offset-4">
                  empresas em crescimento
                </span>
              </h2>

              <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
                Eu não comecei estruturando empresas. Eu comecei vivenciando,
                por dentro, o impacto da falta de gestão.
              </p>

              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mt-4">
                Ao longo de mais de 10 anos atuando no mercado jurídico e
                corporativo, acompanhei de perto o crescimento de negócios que
                expandiram rápido — mas sem estrutura suficiente para sustentar
                o próprio &quot;sucesso&quot; . O resultado quase sempre era o
                mesmo: sobrecarga, retrabalho e decisões tomadas sob pressão.
              </p>

              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mt-4">
                Foi nesse cenário que construí minha base profissional. Entendi,
                na prática, que crescimento sem organização não é evolução — é
                risco.
              </p>

              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mt-4">
                Com essa vivência, desenvolvi o Método GERAR, um modelo próprio
                de estruturação que organiza processos, rotina e acompanhamento
                estratégico para transformar operações desorganizadas em
                sistemas funcionais e sustentáveis.
              </p>

              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mt-4">
                Hoje, atuo estruturando empresas que já validaram seu mercado e
                precisam consolidar sua base para crescer com direção, clareza e
                previsibilidade.
              </p>

              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mt-4">
                Meu papel não é executar tarefas. É organizar o negócio para que
                ele funcione com lógica, prioridades definidas e decisões mais
                seguras.
              </p>

              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mt-4">
                Eu conheço o cenário da falta de gestão. E conheço o caminho
                para estruturar o que já cresceu.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-4">
              {credentials.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                  className={`flex items-start gap-4 p-5 bg-stone-50 rounded-2xl border border-stone-100 hover:border-amber-200 hover:bg-amber-50/50 transition-colors duration-300 ${item.fullWidth ? 'sm:col-span-2' : ''}`}
                >
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-white text-amber-600 flex items-center justify-center shadow-sm border border-stone-100 mt-1">
                    <item.icon size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-montserrat text-base font-bold text-gray-900 leading-snug mb-2">
                      {item.title}
                    </h3>
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide space-y-1">
                      {Array.isArray(item.subtitle)
                        ? item.subtitle.map((line, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                              {line}
                            </div>
                          ))
                        : item.subtitle}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Signature */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="pt-8 border-t border-gray-100 flex items-center justify-between"
            >
              <div className="italic text-gray-500 font-serif text-lg">
                &ldquo;Organização não é burocracia. É liberdade.&rdquo;
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
