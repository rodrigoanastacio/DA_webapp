import Link from 'next/link'

export const FinalCTA = () => {
  return (
    <section className="py-32 bg-white text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-8 tracking-tight max-w-3xl mx-auto">
          Pronto para ter um escritório organizado?
        </h2>
        <p className="text-xl text-gray-500 mb-12 max-w-2xl mx-auto">
          Transforme a gestão do seu escritório com quem entende de eficiência.
          Agende uma conversa inicial e descubra o potencial oculto da sua
          operação.
        </p>
        <Link
          href="/diagnostico-de-gestao"
          className="inline-block bg-gray-900 text-white font-bold text-lg px-12 py-5 rounded-full shadow-xl"
        >
          Quero mudar minha rotina agora
        </Link>
      </div>
    </section>
  )
}
