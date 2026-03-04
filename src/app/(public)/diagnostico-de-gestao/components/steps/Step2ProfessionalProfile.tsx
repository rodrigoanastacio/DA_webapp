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
    <div className="flex flex-col gap-12 font-manrope">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-gray-50 pb-10">
        <h1 className="text-brand-navy text-3xl md:text-5xl font-black leading-[1.1] tracking-tighter uppercase">
          Perfil <span className="text-brand-gold">Profissional</span>
        </h1>
        <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-2xl">
          Sua trajetória define a base da nossa estratégia. Selecione as opções
          que melhor refletem o momento atual do seu negócio.
        </p>
      </div>

      {/* Experience Time */}
      <div className="flex flex-col gap-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-brand-navy text-xs font-black uppercase tracking-widest">
            <Clock className="w-4 h-4 text-brand-gold" />
            <span>Tempo de Mercado</span>
          </div>
          <p className="text-brand-navy text-lg font-bold leading-tight">
            Há quanto tempo sua empresa está em funcionamento?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {EXPERIENCE_OPTIONS.map((option) => (
            <label
              key={option.value}
              className="relative flex items-center p-6 rounded-2xl border border-gray-100 cursor-pointer hover:border-brand-gold/50 hover:bg-brand-gold/5 transition-all group"
            >
              <input
                {...register('experienceTime')}
                type="radio"
                value={option.value}
                className="peer h-5 w-5 border-2 border-gray-200 text-brand-gold focus:ring-brand-gold/20 focus:ring-offset-0 bg-transparent cursor-pointer"
              />
              <span className="ml-4 text-sm font-bold text-gray-600 group-hover:text-brand-navy transition-colors">
                {option.label}
              </span>
              <div className="absolute inset-0 border-2 border-transparent peer-checked:border-brand-gold rounded-2xl pointer-events-none transition-all"></div>
            </label>
          ))}
        </div>
        {errors.experienceTime && (
          <span className="text-red-500 text-[10px] font-bold uppercase tracking-wider ml-1">
            {errors.experienceTime.message}
          </span>
        )}

        <div className="pt-8 border-t border-gray-50"></div>

        {/* Revenue */}
        <div className="flex flex-col gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-brand-navy text-xs font-black uppercase tracking-widest">
              <DollarSign className="w-4 h-4 text-brand-gold" />
              <span>Faturamento Mensal</span>
            </div>
            <p className="text-brand-navy text-lg font-bold leading-tight">
              Qual é o faturamento médio mensal atual do seu negócio?
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {REVENUE_OPTIONS.map((option) => (
              <label
                key={option.value}
                className="relative flex items-start p-6 rounded-2xl border border-gray-100 cursor-pointer hover:border-brand-gold/50 hover:bg-brand-gold/5 transition-all group"
              >
                <input
                  {...register('revenue')}
                  type="radio"
                  value={option.value}
                  className="peer h-5 w-5 mt-1 border-2 border-gray-200 text-brand-gold focus:ring-brand-gold/20 focus:ring-offset-0 bg-transparent cursor-pointer"
                />
                <div className="ml-4 flex-1">
                  <p className="text-sm font-bold text-gray-600 group-hover:text-brand-navy transition-colors">
                    {option.label}
                  </p>
                  <p className="text-xs text-brand-gold font-medium mt-1 uppercase tracking-wider">
                    {option.description}
                  </p>
                </div>
                <div className="absolute inset-0 border-2 border-transparent peer-checked:border-brand-gold rounded-2xl pointer-events-none transition-all"></div>
              </label>
            ))}
          </div>
          {errors.revenue && (
            <span className="text-red-500 text-[10px] font-bold uppercase tracking-wider ml-1">
              {errors.revenue.message}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
