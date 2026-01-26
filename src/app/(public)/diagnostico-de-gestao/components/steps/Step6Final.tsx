import { DiagnosticoFormData } from '@/lib/zod/diagnostico.schema'
import { useFormContext } from 'react-hook-form'

const INVESTMENT_OPTIONS = [
  {
    value: 'ready',
    label: 'Sim, tenho orçamento e urgência',
    description: 'Quero começar o quanto antes para ver resultados rápidos.'
  },
  {
    value: 'planning',
    label: 'Sim, mas preciso planejar o orçamento',
    description: 'Tenho interesse, mas preciso entender os custos primeiro.'
  },
  {
    value: 'evaluating',
    label: 'Ainda estou avaliando a necessidade',
    description: 'Estou na fase de pesquisa e curiosidade.'
  }
]

export function Step6Final() {
  const {
    register,
    formState: { errors }
  } = useFormContext<DiagnosticoFormData>()

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl md:text-4xl font-extrabold leading-tight tracking-tight text-gray-800">
          Intenção e Expectativas
        </h1>
        <p className="text-blue-300 text-base md:text-lg leading-relaxed">
          Para finalizar, me conta de forma breve quais suas expectativas com um
          serviço de gestão e organização jurídica.
        </p>
      </div>

      {/* Expectativas - Textarea */}
      <div className="flex flex-col gap-3">
        <label className="text-gray-800 text-base font-semibold">
          O que você espera resolver com uma assessoria em gestão?
        </label>
        <div className="relative group">
          <textarea
            {...register('expectativas')}
            rows={8}
            className="w-full min-h-[240px] resize-y rounded-xl border border-gray-100 bg-blue-50 p-4 text-gray-800 placeholder:text-gray-400 focus:border-blue-700 focus:ring-1 focus:ring-blue-700 focus:outline-none transition-all text-base shadow-sm"
            placeholder="Descreva seus principais desafios (ex: falta de tempo, desorganização financeira, processos manuais) e o que espera alcançar com nossa ajuda..."
          />
        </div>
        {errors.expectativas && (
          <span className="text-red-500 text-xs">
            {errors.expectativas.message}
          </span>
        )}
      </div>

      {/* Investment - Radio Group */}
      <div className="flex flex-col gap-4">
        <div>
          <label className="text-gray-800 text-base font-semibold">
            Você está disposto(a) a investir em organização e gestão
            profissional?
          </label>
          <p className="text-blue-300 text-sm">
            Selecione a opção que melhor descreve seu momento.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {INVESTMENT_OPTIONS.map((option) => (
            <label
              key={option.value}
              className="relative flex items-start gap-3 p-4 rounded-xl border border-gray-100 cursor-pointer hover:border-blue-700 hover:bg-blue-50/50 transition-all group selection-card"
            >
              <input
                {...register('investment')}
                type="radio"
                value={option.value}
                className="peer h-5 w-5 rounded-full border-2 border-gray-300 bg-white text-blue-700 focus:ring-blue-700 focus:ring-offset-0 transition-colors mt-0.5"
              />
              <span className="ml-4 flex flex-col">
                <span className="text-base font-medium text-gray-800 group-hover:text-blue-700 transition-colors">
                  {option.label}
                </span>
                <span className="text-sm text-blue-300">
                  {option.description}
                </span>
              </span>
              <div className="absolute inset-0 border-2 border-transparent peer-checked:border-blue-700 rounded-xl pointer-events-none"></div>
            </label>
          ))}
        </div>
        {errors.investment && (
          <span className="text-red-500 text-xs">
            {errors.investment.message}
          </span>
        )}
      </div>
    </div>
  )
}
