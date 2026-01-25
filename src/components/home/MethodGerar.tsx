export const MethodGerar = () => {
  const letters = [
    {
      l: 'G',
      t: 'Gestão',
      d: 'Organização de rotinas, demandas, agendas e fluxos internos.'
    },
    {
      l: 'E',
      t: 'Estrutura',
      d: 'Criação e padronização de processos, documentos e controles.'
    },
    {
      l: 'R',
      t: 'Rotina',
      d: 'Implementação de uma rotina funcional, clara e executável.'
    },
    {
      l: 'A',
      t: 'Autonomia',
      d: 'Seu escritório funcionando sem depender de você o tempo todo.'
    },
    {
      l: 'R',
      t: 'Resultados',
      d: 'Mais produtividade, menos sobrecarga e foco no estratégico.'
    }
  ]

  return (
    <section className="py-24 bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-bold tracking-widest text-sm uppercase mb-3 block">
            Metodologia Exclusiva
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            O Método GERAR
          </h2>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto leading-relaxed">
            Nossa metodologia exclusiva para transformar a gestão do seu
            escritório de advocacia em uma máquina de eficiência.
          </p>
        </div>

        {/* Section: GERAR Grid (5 columns ultra-clean) */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-0 mb-24 border border-gray-200 rounded-xl overflow-hidden bg-white">
          {letters.map((item, idx) => (
            <div
              key={idx}
              className={`flex flex-col gap-6 p-8 border-b md:border-b-0 ${
                idx !== letters.length - 1 ? 'md:border-r' : ''
              } border-gray-200 hover:bg-gray-50 transition-colors group`}
            >
              <span className="text-6xl font-black text-blue-600/10 group-hover:text-blue-600/20 transition-colors select-none">
                {item.l}
              </span>
              <div>
                <h3 className="text-gray-900 text-xl font-bold mb-2">
                  {item.t}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.d}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
