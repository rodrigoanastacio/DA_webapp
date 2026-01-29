import {
  LucideClipboardList,
  LucideGanttChart,
  LucideShieldCheck
} from 'lucide-react'

export const SolutionMethod = () => {
  return (
    <section className="py-24 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2 block">
            Como funciona
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
            O Método{' '}
            <span className="text-gray-900 underline decoration-4 decoration-blue-200">
              Gestão Jurídica 360º
            </span>
          </h2>
          <p className="text-lg text-gray-600">
            Você está cansado de passar o dia{' '}
            <span className="font-bold">&quot;apagando incêndios&quot;</span>,
            sem tempo para planejar o crescimento? Não é apenas
            &quot;secretariado&quot;. É um sistema de gestão completo para
            transformar seu escritório.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 z-0" />

          <div className="grid md:grid-cols-3 gap-12 relative z-10">
            {/* Step 1 */}
            <div className="bg-white p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-center group">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-none mx-auto flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <LucideClipboardList className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                1. Diagnóstico & Organização
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Mapeamos o caos. Identificamos gargalos, centralizamos
                informações e criamos a estrutura inicial.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-center group">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-none mx-auto flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <LucideGanttChart className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                2. Implementação de Processos
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Definimos fluxos claros. Quem faz o quê, quando e onde.
                Padronização de atendimento e documentos.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-center group">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-none mx-auto flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <LucideShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                3. Gestão Contínua
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Você advoga, nós cuidamos do resto. Controle financeiro, prazos
                e relacionamento com cliente rodando no automático.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
