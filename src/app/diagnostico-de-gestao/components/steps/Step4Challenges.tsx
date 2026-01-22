import { useFormContext } from 'react-hook-form'
import { DiagnosticFormData } from '../../schema'

const DIFFICULTY_OPTIONS = [
  {
    value: 'demanda_operacional',
    label: 'Excesso de demandas operacionais',
    description: 'Volume alto de tarefas repetitivas consumindo o dia.'
  },
  {
    value: 'falta_processos',
    label: 'Falta de processos',
    description: 'Ausência de padronização nas entregas e fluxos.'
  },
  {
    value: 'dificuldade_delegar',
    label: 'Dificuldade em delegar',
    description: 'Centralização de tarefas e receio na qualidade da entrega.'
  },
  {
    value: 'falta_rotina_controle',
    label: 'Falta de rotina e controle',
    description: 'Sensação de apagar incêndios diariamente sem planejamento.'
  },
  {
    value: 'falta_tempo_estrategico',
    label: 'Falta de tempo para o estratégico',
    description: 'Impossibilidade de focar no crescimento do escritório.'
  }
]

export function Step4Challenges() {
  const {
    register,
    formState: { errors }
  } = useFormContext<DiagnosticFormData>()

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl md:text-4xl font-extrabold leading-tight tracking-tight text-gray-800">
          Quais são suas maiores dificuldades hoje?
        </h1>
        <p className="text-blue-300 text-base md:text-lg leading-relaxed max-w-2xl">
          Selecione todas as opções que se aplicam à sua realidade atual.
        </p>
      </div>

      {/* Challenges Checkboxes */}
      <div className="flex flex-col gap-3">
        {DIFFICULTY_OPTIONS.map((option) => (
          <label
            key={option.value}
            className="relative flex items-start p-4 rounded-xl border border-gray-100 cursor-pointer hover:border-blue-700 hover:bg-blue-50/50 transition-all group selection-card"
          >
            <input
              {...register('dificuldades')}
              type="checkbox"
              value={option.value}
              className="peer h-5 w-5 mt-0.5 rounded-lg border-2 border-gray-300 bg-white text-blue-700 focus:ring-blue-700 focus:ring-offset-0 transition-colors group-hover:border-blue-700 checked:border-blue-700 checked:bg-blue-700"
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
        {errors.dificuldades && (
          <span className="text-red-500 text-xs">
            {errors.dificuldades.message}
          </span>
        )}
      </div>
    </div>
  )
}
