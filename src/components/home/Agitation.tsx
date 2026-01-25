import {
  LucideBarChart3,
  LucideClock,
  LucideFileWarning,
  LucideUsers
} from 'lucide-react'
import Image from 'next/image'

export const Agitation = () => {
  return (
    <section className="py-24 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2 relative bg-gray-100 overflow-hidden min-h-[500px] lg:h-auto self-stretch rounded-3xl">
            <Image
              src="/assets/gestao-administrativa.jpg"
              alt="Organização de Escritório"
              fill
              className="object-cover"
            />
          </div>

          <div className="w-full lg:w-1/2 py-8">
            <div className="mb-12">
              <span className="text-blue-600 font-bold tracking-widest text-sm uppercase mb-3 block">
                Obstáculos ao Sucesso
              </span>
              <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
                O que impede o seu crescimento?
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Crescer sem estrutura é o caminho mais curto para o esgotamento.
                Identifique os gargalos que drenam sua energia.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-6 border border-gray-200 rounded-2xl hover:border-blue-200 hover:shadow-lg transition-all duration-300 bg-white group hover:-translate-y-1">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-5 group-hover:scale-110 transition-transform">
                  <LucideFileWarning className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-3">
                  Processos Despadronizados
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  A falta de fluxos claros gera retrabalho e erros operacionais
                  constantes que custam caro ao escritório.
                </p>
              </div>
              <div className="p-6 border border-gray-200 rounded-2xl hover:border-blue-200 hover:shadow-lg transition-all duration-300 bg-white group hover:-translate-y-1">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-5 group-hover:scale-110 transition-transform">
                  <LucideUsers className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-3">
                  Dificuldade na Delegação
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Dependência total para decisões simples do dia a dia, criando
                  uma rotina que trava sua produtividade.
                </p>
              </div>
              <div className="p-6 border border-gray-200 rounded-2xl hover:border-blue-200 hover:shadow-lg transition-all duration-300 bg-white group hover:-translate-y-1">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-5 group-hover:scale-110 transition-transform">
                  <LucideBarChart3 className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-3">
                  Visibilidade Financeira
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Incerteza sobre a rentabilidade real de cada área ou contrato.
                  Você fatura, mas não sabe quanto lucra.
                </p>
              </div>
              <div className="p-6 border border-gray-200 rounded-2xl hover:border-blue-200 hover:shadow-lg transition-all duration-300 bg-white group hover:-translate-y-1">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-5 group-hover:scale-110 transition-transform">
                  <LucideClock className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-3">
                  Sobrecarga de Gestão
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  O tempo gasto com tarefas administrativas impede o foco no que
                  realmente importa: o olhar estrategico para o seu negócio.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
