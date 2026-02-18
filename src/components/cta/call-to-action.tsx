import Link from 'next/link'

export const CallToAction = () => {
  return (
    <section className="py-32 bg-linear-to-b from-deep-navy to-deep-navy/80 text-white text-center px-6 relative overflow-hidden">
      <div
        className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none bg-dots"
        aria-hidden="true"
      />
      <div className="max-w-[850px] mx-auto relative z-10 px-4">
        <h2 className="text-4xl md:text-6xl font-bold mb-10 tracking-tight leading-tight">
          Pronto para ter um escritório organizado?
        </h2>
        <p className="text-xl text-gray-300 mb-14 font-light max-w-[650px] mx-auto leading-relaxed">
          Transforme a gestão do seu escritório com quem entende de eficiência.
          Agende uma conversa inicial e descubra o potencial oculto da sua
          operação.
        </p>
        <div className="flex flex-col items-center space-y-8">
          <Link
            href="/diagnostico-de-gestao"
            className="group relative overflow-hidden bg-blue-600 text-white px-10 md:px-16 py-6 md:py-7 rounded-2xl text-lg md:text-xl font-bold hover:scale-105 hover:bg-blue-500 transition-all shadow-[0_20px_50px_rgba(217,119,6,0.3)] focus:outline-none focus:ring-4 focus:ring-blue-50"
          >
            Quero mudar minha rotina agora
          </Link>
        </div>
      </div>
    </section>
  )
}
