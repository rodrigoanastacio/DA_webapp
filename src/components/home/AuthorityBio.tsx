import Image from 'next/image'

export const AuthorityBio = () => {
  return (
    <section className="py-24 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
          {/* Image */}
          <div className="w-full md:w-1/2 relative">
            <div className="relative aspect-4/5 bg-gray-100">
              <Image
                src="/assets/dayane-anastacio-gestao-e-assistencia-remota.jpg"
                alt="Dayane Anastacio"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gray-900 -z-10" />
          </div>

          {/* Content */}
          <div className="w-full md:w-1/2">
            <span className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4 block">
              Quem é Dayane Anastacio
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 leading-tight">
              Especialista em Gestão para Escritórios de Advocacia
            </h2>
            <div className="space-y-6 text-lg text-gray-600">
              <p>
                Com anos de experiência no setor jurídico, entendo exatamente
                onde o calo aperta. Não sou apenas uma assistente virtual; sou
                sua parceira estratégica.
              </p>
              <p>
                Minha missão é devolver ao advogado a liberdade de focar no que
                realmente importa:
                <strong className="text-gray-900 font-bold">
                  {' '}
                  defender seus clientes
                </strong>
                , enquanto eu cuido de toda a engrenagem administrativa que faz
                o escritório rodar.
              </p>
              <p>
                Já ajudei dezenas de escritórios a saírem do caos operacional
                para a previsibilidade financeira e administrativa.
              </p>
            </div>

            <div className="mt-10 border-l-4 border-gray-900 pl-6">
              <p className="text-xl italic text-gray-800 font-serif">
                "Organização não é luxo, é a base para qualquer crescimento
                sustentável na advocacia."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
