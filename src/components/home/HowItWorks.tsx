import { Lightbulb, Search, Settings, TrendingUp, Users } from 'lucide-react'

export const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: 'Diagnóstico',
      description:
        'Identificação profunda de gargalos operacionais e financeiros através de análise de dados históricos.'
    },
    {
      icon: Lightbulb,
      title: 'Estratégia',
      description:
        'Planejamento customizado de novos fluxos de trabalho e arquitetura de gestão orientada a resultados.'
    },
    {
      icon: Settings,
      title: 'Implementação',
      description:
        'Ajuste técnico de processos, integração de softwares jurídicos e automação de tarefas repetitivas.'
    },
    {
      icon: Users,
      title: 'Treinamento',
      description:
        'Capacitação técnica e cultural da equipe para operar os novos sistemas com máxima performance.'
    },
    {
      icon: TrendingUp,
      title: 'Monitoramento',
      description:
        'Gestão baseada em indicadores (KPIs) com suporte contínuo para ajustes finos e escalabilidade.'
    }
  ]

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-4 block">
            Metodologia
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Como transformamos seu escritório
          </h2>
          <p className="text-lg text-gray-600">
            Um processo estruturado em 5 etapas para elevar a eficiência e o
            lucro da sua operação jurídica.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {steps.map((step, idx) => {
            const Icon = step.icon
            const isLast = idx === steps.length - 1

            return (
              <div key={idx} className="relative flex gap-6 pb-12">
                {!isLast && (
                  <div className="absolute left-[23px] top-10 w-px h-full bg-gray-200" />
                )}

                <div className="relative shrink-0 w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center">
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>

                <div className="pt-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
