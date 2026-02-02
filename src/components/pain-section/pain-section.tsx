import {
  LucideBarChart3,
  LucideClock,
  LucideFileWarning,
  LucideUsers
} from 'lucide-react'

export const PainSection = () => {
  return (
    <section className="pain-section-bg py-24 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="absolute inset-0 bg-linear-to-t from-[#121212] via-[#121212]/30 to-transparent z-20 rounded-3xl"></div>
            <img
              alt="Pilhas de documentos e processos jurídicos sob uma luz fraca"
              className="w-full h-[800px] object-cover rounded-3xl opacity-60 border border-white/5"
              src="/assets/bg-pilhas-documentos.png"
            />
            <div className="absolute inset-1 bg-linear-to-b from-[#121212] via-[#121212]/20 to-transparent z-20 rounded-3xl"></div>

            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="w-px h-64 bg-linear-to-b from-transparent via-white/20 to-transparent"></div>
            </div>
            <div className="absolute bottom-12 left-12 right-12 z-30">
              <p className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-bold mb-2 font-display">
                Realidade Operacional
              </p>
              <p className="text-white/20 text-xs italic">
                Pilhas de documentos, prazos fatais e processos intermináveis.
              </p>
            </div>
          </div>

          <div className="space-y-12">
            <header>
              <span className="text-primary font-bold text-xs tracking-[0.3em] uppercase mb-4 block font-display">
                Obstáculos ao Sucesso
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-6">
                Você construiu um escritório lucrativo, mas se tornou o{' '}
                <span className="text-gray-500 italic">
                  maior gargalo dele.
                </span>
              </h2>
            </header>

            <section className="grid gap-8 font-display">
              <article className="flex gap-6 group">
                <div className="size-12 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary">
                  <span className="text-2xl text-white/10 group-hover:text-white/50 transition-colors">
                    <LucideFileWarning />
                  </span>
                </div>
                <div>
                  <h4 className="text-white/90 font-bold text-lg mb-1">
                    Processos Despadronizados
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    A falta de padronização gera retrabalho, erros e
                    inconsistência nos resultados.
                  </p>
                </div>
              </article>

              <article className="flex gap-6 group">
                <div className="size-12 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary">
                  <span className="text-white/10 group-hover:text-white/50 transition-colors">
                    <LucideUsers />
                  </span>
                </div>
                <div>
                  <h4 className="text-white/90 font-bold text-lg mb-1">
                    Dificuldade na Delegação
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Dependência total para decisões simples do dia a dia,
                    criando uma rotina que trava sua produtividade.
                  </p>
                </div>
              </article>

              <article className="flex gap-6 group">
                <div className="size-12 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary">
                  <span className="text-white/10 group-hover:text-white/50 transition-colors">
                    <LucideBarChart3 />
                  </span>
                </div>
                <div>
                  <h4 className="text-white/90 font-bold text-lg mb-1">
                    Visibilidade Financeira
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Incerteza sobre a rentabilidade real de cada área ou
                    contrato. Você fatura, mas não sabe quanto lucra.
                  </p>
                </div>
              </article>

              <article className="flex gap-6 group">
                <div className="size-12 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary">
                  <span className="text-white/10 group-hover:text-white/50 transition-colors">
                    <LucideClock />
                  </span>
                </div>
                <div>
                  <h4 className="text-white/90 font-bold text-lg mb-1">
                    Sobrecarga de Gestão
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    O tempo gasto com tarefas administrativas impede o foco no
                    que realmente importa: o olhar estrategico para o seu
                    negócio.
                  </p>
                </div>
              </article>
            </section>

            <div className="pt-8">
              <div className="p-8 border-l-2 border-primary bg-white/2 rounded-r-2xl backdrop-blur-sm">
                <p className="text-xl italic font-light text-gray-300 leading-relaxed">
                  "Trabalhar aos fins de semana não é um sinal de dedicação, é
                  um{' '}
                  <span className="text-white font-semibold underline decoration-primary/30 underline-offset-4">
                    sintoma de falta de processos.
                  </span>
                  "
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
