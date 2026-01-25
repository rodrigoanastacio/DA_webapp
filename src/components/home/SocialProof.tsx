export const SocialProof = () => {
    return (
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-500 text-sm font-semibold uppercase tracking-wider mb-8">
            Escritórios que confiam na nossa gestão
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
            {/* Placeholder logos using text for now, can be replaced with Images */}
            <div className="text-xl font-bold text-gray-800">Mattos & Associados</div>
            <div className="text-xl font-bold text-gray-800">Silva Jurídico</div>
            <div className="text-xl font-bold text-gray-800">Oliveira Law</div>
            <div className="text-xl font-bold text-gray-800">Justiça & Ação</div>
          </div>
          <div className="mt-12 flex flex-col md:flex-row justify-center items-center gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            <div className="px-8 text-center">
              <span className="block text-4xl font-extrabold text-gray-900">+45</span>
              <span className="text-sm text-gray-500">Escritórios Organizados</span>
            </div>
            <div className="px-8 text-center pt-8 md:pt-0">
              <span className="block text-4xl font-extrabold text-gray-900">+10k</span>
              <span className="text-sm text-gray-500">Horas Otimizadas</span>
            </div>
          </div>
        </div>
      </section>
    )
  }
  
