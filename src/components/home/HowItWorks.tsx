export const HowItWorks = () => {
  const steps = [
    'Diagnóstico do escritório',
    'Definição do pacote ideal',
    'Implementação do Método GERAR',
    'Acompanhamento contínuo',
    'Ajustes e otimização constante'
  ]

  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-16">
          Como Funciona
        </h2>

        <div className="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto gap-8 relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-[28px] left-0 w-full h-1 bg-gray-100 z-0" />

          {steps.map((step, i) => (
            <div
              key={i}
              className="relative z-10 flex flex-col items-center text-center w-full md:w-1/5 group"
            >
              <div className="w-14 h-14 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center text-xl font-bold text-gray-400 mb-6 group-hover:border-blue-500 group-hover:text-blue-500 group-hover:scale-110 transition-all duration-300">
                {i + 1}
              </div>
              <h3 className="font-bold text-gray-900 text-lg leading-tight px-2">
                {step}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
