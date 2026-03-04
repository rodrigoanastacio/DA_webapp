import { LeadFormData } from '@/lib/zod/lead.schema'
import { useFormContext } from 'react-hook-form'

const CALL_AVAILABILITY_OPTIONS = [
  {
    value: 'interested',
    label: 'Sim, tenho interesse em conversar',
    description:
      'Procuro uma solução definitiva e estruturada para meu negócio.'
  },
  {
    value: 'need_more_info',
    label: 'Tenho interesse, mas preciso entender melhor',
    description:
      'Quero saber como o Método GERAR™ se aplica ao meu cenário específico.'
  },
  {
    value: 'guidance_only',
    label: 'Apenas receber orientações pontuais',
    description: 'Não busco implementação completa ou plano de ação agora.'
  }
]

export function Step4Final() {
  const {
    register,
    formState: { errors }
  } = useFormContext<LeadFormData>()

  return (
    <div className="flex flex-col gap-12 font-manrope">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-gray-50 pb-10">
        <h1 className="text-brand-navy text-3xl md:text-5xl font-black leading-[1.1] tracking-tighter uppercase">
          Próximos <span className="text-brand-gold">Passos</span>
        </h1>
        <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-2xl">
          Estamos finalizando seu diagnóstico. Esta última etapa define como
          daremos continuidade ao seu processo de estruturação.
        </p>
      </div>

      {/* Call Availability - Radio Group */}
      <div className="flex flex-col gap-8">
        <div className="bg-brand-navy/5 p-6 md:p-8 rounded-3xl border border-brand-gold/10">
          <label className="text-brand-navy text-lg md:text-xl font-bold leading-tight block mb-4">
            Caso identifiquemos que faz sentido avançarmos, você tem
            disponibilidade para uma{' '}
            <span className="text-brand-gold">call estratégica</span> para
            aprofundarmos o diagnóstico do seu negócio?
          </label>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest leading-relaxed">
            Esta reunião serve para apresentar o caminho ideal de estruturação e
            validar se você está pronto para o Método GERAR™.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {CALL_AVAILABILITY_OPTIONS.map((option) => (
            <label
              key={option.value}
              className="relative flex items-center p-6 rounded-2xl border border-gray-100 cursor-pointer hover:border-brand-gold/50 hover:bg-brand-gold/5 transition-all group"
            >
              <input
                {...register('investment')}
                type="radio"
                value={option.value}
                className="peer h-5 w-5 border-2 border-gray-200 text-brand-gold focus:ring-brand-gold/20 focus:ring-offset-0 bg-transparent shrink-0 cursor-pointer"
              />
              <div className="ml-6 flex-1">
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
        {errors.investment && (
          <span className="text-red-500 text-[10px] font-bold uppercase tracking-wider ml-1">
            {errors.investment.message}
          </span>
        )}
      </div>
    </div>
  )
}
