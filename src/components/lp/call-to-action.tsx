import Link from 'next/link'

export const CallToAction = () => {
  return (
    <section className="py-32 bg-deep-navy text-white text-center px-6 relative overflow-hidden">
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
            className="group relative overflow-hidden bg-primary text-white px-10 md:px-16 py-6 md:py-7 rounded-2xl text-lg md:text-xl font-bold hover:scale-105 hover:bg-blue-600 transition-all shadow-[0_20px_50px_rgba(11,63,218,0.3)] focus:outline-none focus:ring-4 focus:ring-primary/50"
          >
            Quero mudar minha rotina agora
          </Link>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">lock</span>
              Acesso Privado
            </span>
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">
                verified
              </span>
              Qualidade Premium
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
