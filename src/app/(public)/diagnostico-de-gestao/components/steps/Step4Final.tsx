import { LeadFormData } from '@/lib/zod/lead.schema'
import { useFormContext } from 'react-hook-form'

const CALL_AVAILABILITY_OPTIONS = [
  {
    value: 'interested',
    label: 'Sim, tenho interesse em conversar',
    description: ''
  },
  {
    value: 'need_more_info',
    label: 'Sim, mas preciso entender melhor como funciona',
    description: ''
  },
  {
    value: 'guidance_only',
    label:
      'No momento, prefiro apenas receber orientações (não inclui um plano de ação e direcionamento)',
    description: ''
  }
]

export function Step4Final() {
  const {
    register,
    formState: { errors }
  } = useFormContext<LeadFormData>()

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl md:text-4xl font-extrabold leading-tight tracking-tight text-gray-800">
          Próximos Passos
        </h1>
        <p className="text-blue-300 text-base md:text-lg leading-relaxed">
          Estamos quase finalizando! Agora preciso entender sua disponibilidade
          para darmos continuidade.
        </p>
      </div>

      {/* Call Availability - Radio Group */}
      <div className="flex flex-col gap-4">
        <div>
          <label className="text-gray-800 text-base font-semibold">
            Caso eu identifique que faz sentido avançarmos, você tem
            disponibilidade para participar de uma call estratégica e{' '}
            <strong>aprofundarmos o diagnóstico da sua empresa</strong>?
          </label>
          <p className="text-blue-300 text-sm">
            Selecione a opção que melhor descreve seu momento.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {CALL_AVAILABILITY_OPTIONS.map((option) => (
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
                {option.description && (
                  <span className="text-sm text-blue-300">
                    {option.description}
                  </span>
                )}
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
