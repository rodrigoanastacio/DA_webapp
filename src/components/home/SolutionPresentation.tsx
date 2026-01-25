import { LucideCheckCircle2 } from 'lucide-react'

export const SolutionPresentation = () => {
  return (
    <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8 tracking-tight">
            É aqui que entra a{' '}
            <span className="text-blue-400">assessoria certa</span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Você não precisa contratar um time interno nem perder tempo tentando
            organizar tudo sozinho. Com uma assessoria remota especializada,
            você ganha:
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {[
              'Organização',
              'Processos',
              'Rotina Estruturada',
              'Tempo para Crescer'
            ].map((item, idx) => (
              <div
                key={idx}
                className="relative bg-[#0F172A] border border-blue-900/30 p-8 rounded-3xl hover:border-blue-500 transition-all duration-300 group overflow-hidden shadow-2xl hover:shadow-blue-900/20"
              >
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 bg-blue-600/20 rounded-full blur-2xl group-hover:bg-blue-500/30 transition-all duration-500" />

                <div className="mb-6 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-blue-900/20 flex items-center justify-center border border-blue-800 group-hover:border-blue-500 transition-colors">
                    <LucideCheckCircle2 className="w-6 h-6 text-blue-500 group-hover:text-blue-400 group-hover:scale-110 transition-all duration-300" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-blue-200 transition-colors tracking-wide">
                  {item}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
