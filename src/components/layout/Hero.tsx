import Image from 'next/image'
import Link from 'next/link'

export const Hero = () => {
  return (
    <section className="relative h-full md:h-[708px] bg-gradient-to-b from-white to-blue-50 border-b border-rose-50">
      <div className="container mx-auto flex flex-col items-center justify-center gap-6 px-4 md:flex-row md:justify-between md:items-start md:h-full">
        {/* Headline */}
        <div className="w-full z-10 py-10 md:py-20 md:w-1/2 md:flex-none">
          <p className="inline-flex items-center px-4 py-1 mb-2 text-sm font-semibold text-blue-300 bg-blue-50 border border-blue-100 rounded-full">
            Gestão e Assessoria Virtual
          </p>
          <h1 className="mb-4 text-3xl font-extrabold text-gray-600 md:text-4xl lg:text-5xl">
            Assessoria Virtual para Advogados que Precisam de{' '}
            <strong>Organização</strong> e <strong>Gestão</strong>
          </h1>
          <p className="mb-8 text-lg text-gray-400 md:text-xl max-w-lg">
            Assessoria especializada para advogados que já faturam bem, mas
            estão sobrecarregados com rotinas, desorganização e falta de
            processos eficientes.
          </p>

          <div className="flex gap-4">
            <Link
              href="/diagnostico-de-gestao"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-bold text-white transition-colors duration-200 bg-gray-500 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Quero organizar meu escritório
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="w-full h-full z-10 flex justify-center items-end md:w-1/2 md:flex-none relative">
          <div className="relative w-full max-w-[338px] md:max-w-none md:h-full">
            <Image
              src="/assets/dayane-anastacio-gestao-e-assistencia-remota.jpg"
              alt="Dayane Anastacio"
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
