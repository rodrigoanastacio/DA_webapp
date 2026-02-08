import { LeadFormData } from '@/lib/zod/lead.schema'
import {
  MANAGEMENT_LEVEL_OPTIONS,
  TEAM_STRUCTURE_OPTIONS
} from '@/shared/constants/lead.constants'
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
          <span>Seu escritório possui equipe?</span>
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

        {/* Management Level */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2 text-gray-700 text-sm font-semibold">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-700 text-white text-[10px] font-bold">
              2
            </span>
            <span>Como você avalia a gestão atual do escritório?</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {MANAGEMENT_LEVEL_OPTIONS.map((option) => (
              <label
                key={option.value}
                className="relative flex flex-col gap-3 p-4 rounded-xl border border-gray-100 cursor-pointer hover:border-blue-700 hover:bg-blue-50/50 transition-all group selection-card h-full"
              >
                <div className="flex justify-between w-full">
                  <input
                    {...register('managementLevel')}
                    type="radio"
                    value={option.value}
                    className="peer h-5 w-5 border-2 border-blue-100 text-blue-700 focus:ring-blue-700 focus:ring-offset-0 bg-transparent"
                  />
                  <span className="material-symbols-outlined text-gray-400 group-hover:text-blue-700 transition-colors text-[20px]">
                    {option.icon}
                  </span>
                </div>
                <div className="flex grow flex-col">
                  <p className="text-sm font-semibold text-gray-800 mb-1 group-hover:text-blue-700 transition-colors">
                    {option.label}
                  </p>
                  <p className="text-sm text-blue-300 leading-snug">
                    {option.description}
                  </p>
                </div>
                <div className="absolute inset-0 border-2 border-transparent peer-checked:border-blue-700 rounded-xl pointer-events-none"></div>
              </label>
            ))}
          </div>
          {errors.managementLevel && (
            <span className="text-red-500 text-xs">
              {errors.managementLevel.message}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
