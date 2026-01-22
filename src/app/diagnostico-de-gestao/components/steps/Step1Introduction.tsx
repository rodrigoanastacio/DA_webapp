import { useFormContext } from 'react-hook-form'
import { DiagnosticFormData } from '../../schema'

export function Step1Introduction() {
  const {
    register,
    formState: { errors }
  } = useFormContext<DiagnosticFormData>()

  return (
    <div className="flex flex-col gap-8">
      {/* Step Title/Header */}
      <div className="flex flex-col gap-2 border-b border-gray-100 pb-6">
        <h1 className="text-blue-300 text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">
          Vamos começar o seu diagnóstico
        </h1>
        <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl">
          Preencha seus dados básicos para iniciarmos a análise personalizada da
          gestão do seu escritório de advocacia.
        </p>
      </div>

      {/* Inputs Grid */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row gap-6">
          <label className="flex flex-col flex-1">
            <span className="text-blue-300 text-sm font-semibold pb-2">
              Nome completo <span className="text-blue-300">*</span>
            </span>
            <input
              {...register('name')}
              placeholder="Ex: João Silva"
              type="text"
              className={`form-input w-full rounded-lg border bg-white focus:ring-1 focus:ring-blue-700 placeholder:text-gray-400 h-12 px-3 text-sm transition-colors ${
                errors.name
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-gray-200 focus:border-blue-700'
              }`}
            />
            {errors.name && (
              <span className="text-red-500 text-xs mt-1">
                {errors.name.message}
              </span>
            )}
          </label>

          <label className="flex flex-col flex-1">
            <span className="text-blue-300 text-sm font-semibold pb-2">
              E-mail profissional <span className="text-blue-300">*</span>
            </span>
            <input
              {...register('email')}
              placeholder="nome@email.com.br"
              type="email"
              className={`form-input w-full rounded-lg border bg-white focus:ring-1 focus:ring-blue-700 placeholder:text-gray-400 h-12 px-3 text-sm transition-colors ${
                errors.email
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-gray-200 focus:border-blue-700'
              }`}
            />
            {errors.email && (
              <span className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </span>
            )}
          </label>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <label className="flex flex-col flex-1">
            <span className="text-blue-300 text-sm font-semibold pb-2">
              WhatsApp <span className="text-blue-300">*</span>
            </span>
            <input
              {...register('whatsapp')}
              placeholder="(00) 00000-0000"
              type="tel"
              className={`form-input w-full rounded-lg border bg-white focus:ring-1 focus:ring-blue-700 placeholder:text-gray-400 h-12 px-3 text-sm transition-colors ${
                errors.whatsapp
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-gray-200 focus:border-blue-700'
              }`}
            />
            {errors.whatsapp && (
              <span className="text-red-500 text-xs mt-1">
                {errors.whatsapp.message}
              </span>
            )}
          </label>

          <label className="flex flex-col flex-1">
            <span className="text-blue-300 text-sm font-semibold pb-2">
              Cidade / Estado <span className="text-blue-300">*</span>
            </span>
            <input
              {...register('cityState')}
              placeholder="Ex: São Paulo - SP"
              type="text"
              className={`form-input w-full rounded-lg border bg-white focus:ring-1 focus:ring-blue-700 placeholder:text-gray-400 h-12 px-3 text-sm transition-colors ${
                errors.cityState
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-gray-200 focus:border-blue-700'
              }`}
            />
            {errors.cityState && (
              <span className="text-red-500 text-xs mt-1">
                {errors.cityState.message}
              </span>
            )}
          </label>
        </div>
      </div>
    </div>
  )
}
