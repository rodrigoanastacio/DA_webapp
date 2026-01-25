import Link from 'next/link'

export const Hero = () => {
  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-b from-blue-50/50 via-white to-white border-b border-gray-100 overflow-hidden">
      {/* Background Glows for Vitality */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-100/40 rounded-[100%] blur-3xl -z-10" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-2 mb-8 text-sm font-bold text-blue-700 bg-white border border-blue-100 rounded-full shadow-sm hover:shadow-md transition-shadow cursor-default">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
            </span>
            Gestão e Assessoria Virtual
          </div>

          {/* Headline */}
          <h1 className="mb-8 text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
            Assessoria Virtual para Advogados que Precisam de{' '}
            <span className="text-blue-600 inline-block selection:bg-blue-100">
              Organização
            </span>{' '}
            e{' '}
            <span className="text-blue-600 inline-block selection:bg-blue-100">
              Gestão
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mb-10 text-xl text-gray-600 max-w-2xl leading-relaxed">
            Assessoria especializada para advogados que já faturam bem, mas
            estão sobrecarregados com rotinas, desorganização e falta de
            processos eficientes.
          </p>

          {/* CTA Group */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Link
              href="/diagnostico-de-gestao"
              className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white transition-all duration-300 bg-blue-600 rounded-2xl hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
            >
              Quero organizar meu escritório
            </Link>

            <div className="flex items-center gap-3 text-sm font-semibold text-gray-500">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-400"
                  >
                    {/* Placeholder avatars */}
                    {i === 1 ? 'M' : i === 2 ? 'S' : 'J'}
                  </div>
                ))}
              </div>
              <span>+45 Escritórios organizados</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
