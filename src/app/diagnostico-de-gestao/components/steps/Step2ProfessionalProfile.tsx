import { DiagnosticoFormData } from '@/shared/entities/diagnostico/diagnostico.schema'
import { useFormContext } from 'react-hook-form'

const EXPERIENCE_OPTIONS = [
  { value: 'less_1', label: 'Menos de 1 ano' },
  { value: '1_3', label: '1 a 3 anos' },
  { value: '3_5', label: '3 a 5 anos' },
  { value: 'more_5', label: 'Mais de 5 anos' }
]

const ROLE_OPTIONS = [
  {
    value: 'autonomo',
    label: 'Advogado Autônomo',
    description: 'Atua sozinho, sem sócios ou equipe fixa.'
  },
  {
    value: 'socio',
    label: 'Sócio de Escritório',
    description: 'Possui participação societária em uma banca de advocacia.'
  },
  {
    value: 'associado',
    label: 'Advogado Associado',
    description: 'Trabalha em escritório sem participação societária.'
  },
  {
    value: 'dept_juridico',
    label: 'Departamento Jurídico',
    description: 'Atua internamente em empresas ou instituições.'
  }
]

export function Step2ProfessionalProfile() {
  const {
    register,
    formState: { errors }
  } = useFormContext<DiagnosticoFormData>()

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl md:text-4xl font-extrabold leading-tight tracking-tight text-gray-800">
          Perfil Profissional
        </h1>
        <p className="text-blue-300 text-base md:text-lg leading-relaxed max-w-2xl">
          Conte-nos um pouco sobre sua trajetória para personalizarmos o
          diagnóstico do seu escritório.
        </p>
      </div>

      {/* Experience Time */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2 text-gray-700 text-sm font-semibold">
          <span className="material-symbols-outlined text-[20px] text-blue-700">
            history
          </span>
          <span>Há quanto tempo você atua como advogado(a)?</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {EXPERIENCE_OPTIONS.map((option) => (
            <label
              key={option.value}
              className="relative flex items-center p-4 rounded-lg border border-blue-100 cursor-pointer hover:border-blue-700 hover:bg-blue-50/50 transition-all group"
            >
              <input
                {...register('experienceTime')}
                type="radio"
                value={option.value}
                className="peer h-5 w-5 border-2 border-blue-100 text-blue-700 focus:ring-blue-700 focus:ring-offset-0 bg-transparent"
              />
              <span className="ml-3 text-sm font-medium text-gray-800 group-hover:text-blue-700 transition-colors">
                {option.label}
              </span>
              <div className="absolute inset-0 border-2 border-transparent peer-checked:border-blue-700 rounded-lg pointer-events-none"></div>
            </label>
          ))}
        </div>
        {errors.experienceTime && (
          <span className="text-red-500 text-xs">
            {errors.experienceTime.message}
          </span>
        )}

        <div className="border-t border-gray-100 my-2"></div>

        {/* Current Role */}
        <div className="flex items-center gap-2 text-gray-700 text-sm font-semibold">
          <span className="material-symbols-outlined text-[20px] text-blue-700">
            work
          </span>
          <span>Hoje você atua como:</span>
        </div>

        <div className="flex flex-col gap-3">
          {ROLE_OPTIONS.map((option) => (
            <label
              key={option.value}
              className="relative flex items-start p-4 rounded-lg border border-blue-100 cursor-pointer hover:border-blue-700 hover:bg-blue-50/50 transition-all group"
            >
              <input
                {...register('currentRole')}
                type="radio"
                value={option.value}
                className="peer h-5 w-5 mt-0.5 border-2 border-blue-100 text-blue-700 focus:ring-blue-700 focus:ring-offset-0 bg-transparent"
              />
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-800 group-hover:text-blue-700 transition-colors">
                  {option.label}
                </p>
                <p className="text-sm text-blue-300">{option.description}</p>
              </div>
              <div className="absolute inset-0 border-2 border-transparent peer-checked:border-blue-700 rounded-lg pointer-events-none"></div>
            </label>
          ))}
        </div>
        {errors.currentRole && (
          <span className="text-red-500 text-xs">
            {errors.currentRole.message}
          </span>
        )}
      </div>
    </div>
  )
}
