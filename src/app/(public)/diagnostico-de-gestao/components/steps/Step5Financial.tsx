import { DiagnosticoFormData } from '@/lib/zod/diagnostico.schema'
import { useFormContext } from 'react-hook-form'

const REVENUE_OPTIONS = [
  {
    value: 'low',
    label: 'Até R$ 20.000,00',
    description: 'Escritórios em fase inicial ou reestruturação.'
  },
  {
    value: 'medium',
    label: 'De R$ 20.000,00 a R$ 40.000,00',
    description: 'Escritórios em crescimento sustentável.'
  },
  {
    value: 'high',
    label: 'Acima de R$ 40.000,00',
    description: 'Escritórios consolidados e alta performance.'
  }
]

export function Step5Financial() {
  const {
    register,
    formState: { errors }
  } = useFormContext<DiagnosticoFormData>()

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl md:text-4xl font-extrabold leading-tight tracking-tight text-gray-800">
          Qual é o faturamento médio mensal do escritório?
        </h1>
        <p className="text-blue-300 text-base md:text-lg leading-relaxed max-w-2xl">
          Selecione a faixa de faturamento que melhor representa a realidade
          atual do seu negócio. Essa informação nos ajuda a personalizar o
          diagnóstico.
        </p>
      </div>

      {/* Revenue Options */}
      <div className="flex flex-col gap-3">
        {REVENUE_OPTIONS.map((option) => (
          <label
            key={option.value}
            className="relative flex items-start gap-3 p-4 rounded-xl border border-gray-100 cursor-pointer hover:border-blue-700 hover:bg-blue-50/50 transition-all group selection-card"
          >
            <input
              {...register('revenue')}
              type="radio"
              value={option.value}
              className="peer h-5 w-5 rounded-full border-2 border-gray-300 bg-white text-blue-700 focus:ring-blue-700 focus:ring-offset-0 transition-colors"
            />
            <div className="flex flex-col">
              <span className="text-lg font-bold leading-snug text-gray-800 group-hover:text-blue-700 transition-colors">
                {option.label}
              </span>
              <span className="text-sm leading-snug text-blue-300">
                {option.description}
              </span>
            </div>
            <div className="absolute inset-0 border-2 border-transparent peer-checked:border-blue-700 rounded-xl pointer-events-none"></div>
          </label>
        ))}
        {errors.revenue && (
          <span className="text-red-500 text-xs">{errors.revenue.message}</span>
        )}
      </div>
    </div>
  )
}
