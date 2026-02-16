import { LeadFormData } from '@/lib/zod/lead.schema'
import {
  EXPERIENCE_OPTIONS,
  REVENUE_OPTIONS
} from '@/shared/constants/lead.constants'
import { Clock, DollarSign } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

export function Step2ProfessionalProfile() {
  const {
    register,
    formState: { errors }
  } = useFormContext<LeadFormData>()

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
          <Clock className="w-5 h-5 text-blue-700" />
          <span>Há quanto tempo sua empresa está em funcionamento?</span>
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

        {/* Revenue */}
        <div className="flex items-center gap-2 text-gray-700 text-sm font-semibold">
          <DollarSign className="w-5 h-5 text-blue-700" />
          <span>Qual é o faturamento médio mensal atual do seu negócio?</span>
        </div>

        <div className="flex flex-col gap-3">
          {REVENUE_OPTIONS.map((option) => (
            <label
              key={option.value}
              className="relative flex items-start p-4 rounded-lg border border-blue-100 cursor-pointer hover:border-blue-700 hover:bg-blue-50/50 transition-all group"
            >
              <input
                {...register('revenue')}
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
        {errors.revenue && (
          <span className="text-red-500 text-xs">{errors.revenue.message}</span>
        )}
      </div>
    </div>
  )
}
