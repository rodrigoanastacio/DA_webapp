import { LucideCheckCircle, LucideXCircle } from 'lucide-react'

export const TargetAudience = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* FOR YOU */}
          <div className="bg-white p-8 rounded-3xl shadow-lg border-t-4 border-green-500">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <LucideCheckCircle className="w-6 h-6 text-green-600" />
              </div>
              Para quem é esse serviço
            </h3>
            <ul className="space-y-4">
              {[
                'Atua como advogado há pelo menos 2 anos',
                'Já possui faturamento consolidado ou em crescimento',
                'Está sobrecarregado com o operacional',
                'Quer escalar sem caos',
                'Busca apoio estratégico e não apenas “tarefas soltas”'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-gray-700">
                  <LucideCheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* NOT FOR YOU */}
          <div className="bg-white p-8 rounded-3xl shadow-lg border-t-4 border-red-500 opacity-90">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <LucideXCircle className="w-6 h-6 text-red-600" />
              </div>
              Para quem NÃO é
            </h3>
            <ul className="space-y-4">
              {[
                'Está começando do zero',
                'Não quer delegar (quer centralizar tudo)',
                'Busca soluções amadoras ou improvisadas'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-gray-500">
                  <LucideXCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
