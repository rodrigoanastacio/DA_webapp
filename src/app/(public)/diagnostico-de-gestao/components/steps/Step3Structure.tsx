import { LeadFormData } from '@/lib/zod/lead.schema'
import { TEAM_STRUCTURE_OPTIONS } from '@/shared/constants/lead.constants'
import { useFormContext } from 'react-hook-form'

export function Step3Structure() {
  const {
    register,
    formState: { errors }
  } = useFormContext<LeadFormData>()

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl md:text-4xl font-extrabold leading-tight tracking-tight text-gray-800">
          Estrutura do Escritório
        </h1>
        <p className="text-blue-300 text-base md:text-lg leading-relaxed max-w-2xl">
          Responda sobre a composição da sua equipe e o modelo de gestão atual
          para que possamos entender o tamanho da sua operação.
        </p>
      </div>

      {/* Team Structure */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2 text-gray-700 text-sm font-semibold">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-700 text-white text-[10px] font-bold">
            1
          </span>
          <span>Você trabalha sozinho(a) ou possui equipe?</span>
        </div>

        <div className="flex flex-col gap-3">
          {TEAM_STRUCTURE_OPTIONS.map((option) => (
            <label
              key={option.value}
              className="relative flex items-start p-4 rounded-xl border border-gray-100 cursor-pointer hover:border-blue-700 hover:bg-blue-50/50 transition-all group selection-card"
            >
              <input
                {...register('teamStructure')}
                type="radio"
                value={option.value}
                className="peer h-5 w-5 mt-0.5 border-2 border-blue-100 text-blue-700 focus:ring-blue-700 focus:ring-offset-0 bg-transparent"
              />
              <div className="ml-3 flex-1">
                <p className="text-sm font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">
                  {option.label}
                </p>
                <p className="text-sm text-blue-300">{option.description}</p>
              </div>
              <div className="absolute inset-0 border-2 border-transparent peer-checked:border-blue-700 rounded-xl pointer-events-none"></div>
            </label>
          ))}
        </div>
        {errors.teamStructure && (
          <span className="text-red-500 text-xs">
            {errors.teamStructure.message}
          </span>
        )}

        <div className="border-t border-gray-100 my-2"></div>

        {/* Structural Challenge - Textarea */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-gray-700 text-sm font-semibold">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-700 text-white text-[10px] font-bold">
              2
            </span>
            <span>
              Hoje, qual é o principal desafio estrutural ou de organização da
              sua empresa?
            </span>
          </div>

          <div className="relative group">
            <textarea
              {...register('managementLevel')}
              rows={6}
              className="w-full min-h-[180px] resize-y rounded-xl border border-gray-100 bg-blue-50 p-4 text-gray-800 placeholder:text-gray-400 focus:border-blue-700 focus:ring-1 focus:ring-blue-700 focus:outline-none transition-all text-base shadow-sm"
              placeholder="Descreva o principal desafio que você enfrenta hoje (ex: falta de organização financeira, processos manuais, dificuldade em delegar, etc.)..."
            />
          </div>
          {errors.managementLevel && (
            <span className="text-red-500 text-xs">
              {errors.managementLevel.message}
            </span>
          )}
        </div>

        <div className="border-t border-gray-100 my-2"></div>

        {/* Overload Challenges - Textarea */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-gray-700 text-sm font-semibold">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-700 text-white text-[10px] font-bold">
              3
            </span>
            <span>
              O que mais tem gerado sobrecarga na sua rotina atualmente?
            </span>
          </div>

          <div className="relative group">
            <textarea
              {...register('overloadChallenges')}
              rows={6}
              className="w-full min-h-[180px] resize-y rounded-xl border border-gray-100 bg-blue-50 p-4 text-gray-800 placeholder:text-gray-400 focus:border-blue-700 focus:ring-1 focus:ring-blue-700 focus:outline-none transition-all text-base shadow-sm"
              placeholder="Sua resposta"
            />
          </div>
          {errors.overloadChallenges && (
            <span className="text-red-500 text-xs">
              {errors.overloadChallenges.message}
            </span>
          )}
        </div>

        <div className="border-t border-gray-100 my-2"></div>

        {/* Ideal Structure - Textarea */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-gray-700 text-sm font-semibold">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-700 text-white text-[10px] font-bold">
              4
            </span>
            <span>
              Se sua empresa estivesse estruturada e organizada da forma ideal,
              o que mudaria na prática?
            </span>
          </div>

          <div className="relative group">
            <textarea
              {...register('idealStructure')}
              rows={6}
              className="w-full min-h-[180px] resize-y rounded-xl border border-gray-100 bg-blue-50 p-4 text-gray-800 placeholder:text-gray-400 focus:border-blue-700 focus:ring-1 focus:ring-blue-700 focus:outline-none transition-all text-base shadow-sm"
              placeholder="Sua resposta"
            />
          </div>
          {errors.idealStructure && (
            <span className="text-red-500 text-xs">
              {errors.idealStructure.message}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
