'use client'

import { Check, X } from 'lucide-react'

export const QualificationsSection = () => {
  const isFor = [
    'Advogados(as) sócios(as) ou donos(as) de empresa',
    'Já possuem faturamento e clientes',
    'Querem crescer mais, porém com estrutura',
    'Entende que gestão é diferencial competitivo'
  ]

  const isNotFor = [
    'Quem busca alguém para executar tarefas isoladas',
    'Quem quer soluções rápidas sem mudança estrutural',
    'Quem não está disposto a rever processos',
    'Quem ainda está na fase inicial sem equipe ou estrutura mínima'
  ]

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <header className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-brand-gold font-bold tracking-widest text-sm uppercase mb-4 block">
            Qualificação Crítica
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-brand-navy leading-tight mb-6">
            Para quem é este programa?
          </h2>
          <p className="text-gray-500 text-lg">
            A estrutura certa funciona para o perfil certo. Avalie com
            sinceridade se você está pronto para esse próximo passo.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* IS FOR */}
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="text-xl md:text-2xl font-bold text-brand-navy mb-8 flex items-center gap-3">
              <span className="size-8 rounded-lg bg-green-500/10 text-green-600 flex items-center justify-center shrink-0">
                <Check size={20} />
              </span>
              Este programa é para:
            </h3>
            <ul className="space-y-6">
              {isFor.map((item, idx) => (
                <li key={idx} className="flex gap-4 group">
                  <div className="size-5 rounded-full border border-green-500/30 flex items-center justify-center text-green-500 shrink-0 mt-1 shadow-sm">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span className="text-gray-600 font-medium group-hover:text-gray-900 transition-colors leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* IS NOT FOR */}
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="text-xl md:text-2xl font-bold text-gray-400 mb-8 flex items-center gap-3">
              <span className="size-8 rounded-lg bg-red-500/10 text-red-600 flex items-center justify-center shrink-0">
                <X size={20} />
              </span>
              Este programa NÃO é para:
            </h3>
            <ul className="space-y-6">
              {isNotFor.map((item, idx) => (
                <li key={idx} className="flex gap-4 group">
                  <div className="size-5 rounded-full border border-red-500/30 flex items-center justify-center text-red-500 shrink-0 mt-1 shadow-sm opacity-50 group-hover:opacity-100 transition-opacity">
                    <X size={12} strokeWidth={3} />
                  </div>
                  <span className="text-gray-400 font-medium group-hover:text-gray-600 transition-colors leading-relaxed line-through decoration-gray-300">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
