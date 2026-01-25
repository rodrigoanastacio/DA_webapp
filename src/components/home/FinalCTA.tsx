import Link from 'next/link'

export const FinalCTA = () => {
  return (
    <section className="py-32 bg-white text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-8 tracking-tight">
          Chega de viver no caos.
        </h2>
        <p className="text-xl text-gray-500 mb-12 max-w-2xl mx-auto">
          Dê o primeiro passo para ter um escritório organizado, lucrativo e com
          processos que funcionam sem você precisar estar presente 24 horas.
        </p>
        <Link
          href="/diagnostico-de-gestao"
          className="inline-block bg-gray-900 text-white font-bold text-lg px-12 py-5 hover:bg-black hover:-translate-y-1 transition-all duration-300 shadow-xl hover:shadow-2xl"
        >
          QUERO MUDAR MINHA ROTINA AGORA
        </Link>
      </div>
    </section>
  )
}
