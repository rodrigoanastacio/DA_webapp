import { PhoneInput } from '@/components/ui/phone-input'
import { cn } from '@/lib/utils'
import { LeadFormData } from '@/lib/zod/lead.schema'
import { Controller, useFormContext } from 'react-hook-form'
import 'react-phone-number-input/style.css'

export function Step1Introduction() {
  const {
    register,
    control,
    formState: { errors }
  } = useFormContext<LeadFormData>()

  return (
    <div className="flex flex-col gap-8">
      {/* Step Title/Header */}
      <div className="flex flex-col gap-2 border-b border-gray-100 pb-6">
        <h1 className="text-blue-300 text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">
          Diagnóstico Inicial | Estruturação de Negócios
        </h1>
        <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl">
          Esse formulário é um diagnóstico inicial para que eu possa entender o
          momento atual da sua empresa, seus desafios e objetivos de
          crescimento.
        </p>
        <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl">
          Através do meu <strong>método de Gestão</strong>, eu já ajudei
          empresas e escritórios a sairem do caos operacional, sobrecarga
          diária, e da rotina de passar o dia "apagando incêndios".
        </p>
        <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl">
          O objetivo do meu trabalho é organizar o seu negócio, para que você
          possa crescer de forma mais <strong>previsível e sustentável</strong>.
        </p>
        <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl">
          Permitir que você tenha{' '}
          <strong>mais tempo, clareza e direcionamento</strong> para conduzir
          sua empresa e o melhor: fazer as coisas funcionarem sem que tudo
          dependa "exclusivamente de você"!
        </p>
        <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl">
          Então, basta preencher o formulário e descobrir o caminho para ter{' '}
          <strong>mais clareza, controle e planejamento do seu negócio.</strong>
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
            <Controller
              name="whatsapp"
              control={control}
              render={({ field }) => (
                <PhoneInput
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  placeholder="(00) 00000-0000"
                  className={cn(
                    'h-12',
                    errors.whatsapp
                      ? 'border-red-300 focus:border-red-500'
                      : 'border-gray-200 focus:border-blue-700'
                  )}
                />
              )}
            />
            {errors.whatsapp && (
              <span className="text-red-500 text-xs mt-1">
                {errors.whatsapp.message}
              </span>
            )}
          </label>

          <label className="flex flex-col flex-1">
            <span className="text-blue-300 text-sm font-semibold pb-2">
              @ de Instagram da sua empresa{' '}
              <span className="text-blue-300">*</span>
            </span>
            <input
              {...register('instagram')}
              placeholder="@seu_instagram"
              type="text"
              className={`form-input w-full rounded-lg border bg-white focus:ring-1 focus:ring-blue-700 placeholder:text-gray-400 h-12 px-3 text-sm transition-colors ${
                errors.instagram
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-gray-200 focus:border-blue-700'
              }`}
            />
            {errors.instagram && (
              <span className="text-red-500 text-xs mt-1">
                {errors.instagram.message}
              </span>
            )}
          </label>
        </div>
      </div>
    </div>
  )
}
