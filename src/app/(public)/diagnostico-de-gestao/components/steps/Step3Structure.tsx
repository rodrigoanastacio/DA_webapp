import { LeadFormData } from '@/lib/zod/lead.schema'
import { TEAM_STRUCTURE_OPTIONS } from '@/shared/constants/lead.constants'
import { useFormContext } from 'react-hook-form'

export function Step3Structure() {
  const {
    register,
    formState: { errors }
  } = useFormContext<LeadFormData>()

  return (
    <div className="flex flex-col gap-12 font-manrope">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-gray-50 pb-10">
        <h1 className="text-brand-navy text-3xl md:text-5xl font-black leading-[1.1] tracking-tighter uppercase">
          Estrutura do <span className="text-brand-gold">Escritório</span>
        </h1>
        <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-2xl">
          Detalhes sobre sua operação nos ajudam a mensurar a complexidade da
          reestruturação necessária.
        </p>
      </div>

      {/* Team Structure */}
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-brand-navy text-xs font-black uppercase tracking-widest">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-gold text-brand-navy text-[10px] font-black">
                01
              </span>
              <span>Composição da Equipe</span>
            </div>
            <p className="text-brand-navy text-lg font-bold leading-tight">
              Você trabalha sozinho(a) ou possui equipe?
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {TEAM_STRUCTURE_OPTIONS.map((option) => (
              <label
                key={option.value}
                className="relative flex items-start p-6 rounded-2xl border border-gray-100 cursor-pointer hover:border-brand-gold/50 hover:bg-brand-gold/5 transition-all group"
              >
                <input
                  {...register('teamStructure')}
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
          {errors.teamStructure && (
            <span className="text-red-500 text-[10px] font-bold uppercase tracking-wider ml-1">
              {errors.teamStructure.message}
            </span>
          )}
        </div>

        <div className="pt-8 border-t border-gray-50"></div>

        {/* Structural Challenge - Textarea */}
        <div className="flex flex-col gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-brand-navy text-xs font-black uppercase tracking-widest">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-gold text-brand-navy text-[10px] font-black">
                02
              </span>
              <span>Principal Desafio Estrutural</span>
            </div>
            <p className="text-brand-navy text-lg font-bold leading-tight">
              Hoje, qual o maior gargalo na organização da sua empresa?
            </p>
          </div>

          <div className="relative group">
            <textarea
              {...register('managementLevel')}
              rows={5}
              className="w-full rounded-2xl border border-gray-100 bg-gray-50/50 p-6 text-gray-700 placeholder:text-gray-300 focus:bg-white focus:border-brand-gold/50 focus:ring-2 focus:ring-brand-gold/20 focus:outline-none transition-all text-sm leading-relaxed"
              placeholder="Descreva o principal desafio que você enfrenta hoje (ex: falta de organização financeira, processos manuais, dificuldade em delegar, etc.)..."
            />
          </div>
          {errors.managementLevel && (
            <span className="text-red-500 text-[10px] font-bold uppercase tracking-wider ml-1">
              {errors.managementLevel.message}
            </span>
          )}
        </div>

        <div className="pt-8 border-t border-gray-50"></div>

        {/* Overload Challenges - Textarea */}
        <div className="flex flex-col gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-brand-navy text-xs font-black uppercase tracking-widest">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-gold text-brand-navy text-[10px] font-black">
                03
              </span>
              <span>Causas da Sobrecarga</span>
            </div>
            <p className="text-brand-navy text-lg font-bold leading-tight">
              O que mais consome seu tempo e energia na rotina atual?
            </p>
          </div>

          <div className="relative group">
            <textarea
              {...register('overloadChallenges')}
              rows={5}
              className="w-full rounded-2xl border border-gray-100 bg-gray-50/50 p-6 text-gray-700 placeholder:text-gray-300 focus:bg-white focus:border-brand-gold/50 focus:ring-2 focus:ring-brand-gold/20 focus:outline-none transition-all text-sm leading-relaxed"
              placeholder="Descreva o que mais gera sobrecarga na sua rotina atual..."
            />
          </div>
          {errors.overloadChallenges && (
            <span className="text-red-500 text-[10px] font-bold uppercase tracking-wider ml-1">
              {errors.overloadChallenges.message}
            </span>
          )}
        </div>

        <div className="pt-8 border-t border-gray-50"></div>

        {/* Ideal Structure - Textarea */}
        <div className="flex flex-col gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-brand-navy text-xs font-black uppercase tracking-widest">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-gold text-brand-navy text-[10px] font-black">
                04
              </span>
              <span>Visão de Futuro</span>
            </div>
            <p className="text-brand-navy text-lg font-bold leading-tight">
              Se tudo estivesse organizado da forma ideal, o que mudaria na
              prática?
            </p>
          </div>

          <div className="relative group">
            <textarea
              {...register('idealStructure')}
              rows={5}
              className="w-full rounded-2xl border border-gray-100 bg-gray-50/50 p-6 text-gray-700 placeholder:text-gray-300 focus:bg-white focus:border-brand-gold/50 focus:ring-2 focus:ring-brand-gold/20 focus:outline-none transition-all text-sm leading-relaxed"
              placeholder="Se sua empresa funcionasse na perfeição hoje, o que mudaria na sua vida?"
            />
          </div>
          {errors.idealStructure && (
            <span className="text-red-500 text-[10px] font-bold uppercase tracking-wider ml-1">
              {errors.idealStructure.message}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
