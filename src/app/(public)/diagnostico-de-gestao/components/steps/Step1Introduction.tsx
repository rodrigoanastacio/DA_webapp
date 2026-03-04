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
    <div className="flex flex-col gap-12 font-manrope">
      {/* Step Title/Header */}
      <div className="flex flex-col gap-6 border-b border-gray-50 pb-10">
        <h1 className="text-brand-navy text-3xl md:text-5xl font-black leading-[1.1] tracking-tighter uppercase">
          Diagnóstico <span className="text-brand-gold">Estratégico</span>
        </h1>

        <div className="space-y-4 text-gray-500 text-base md:text-lg leading-relaxed max-w-3xl">
          <p>
            Este formulário é o primeiro passo para entendermos os{' '}
            <span className="text-brand-navy font-bold">gargalos reais</span> da
            sua operação e definir seus objetivos de escala.
          </p>
          <p>
            Através do Método GERAR™, já ajudei diversas empresas a saírem do{' '}
            <span className="text-brand-navy font-bold italic">
              caos operacional
            </span>{' '}
            e da sobrecarga diária para uma gestão de alta performance.
          </p>
          <p className="pt-2 text-brand-navy font-medium italic border-l-2 border-brand-gold pl-6">
            &quot;O objetivo aqui é transformar seu negócio em uma estrutura
            previsível, sustentável e que não dependa exclusivamente de
            você.&quot;
          </p>
        </div>
      </div>

      {/* Inputs Grid */}
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <label className="flex flex-col gap-2">
            <span className="text-brand-navy text-xs font-black uppercase tracking-widest ml-1">
              Nome completo <span className="text-brand-gold">*</span>
            </span>
            <input
              {...register('name')}
              placeholder="Ex: João Silva"
              type="text"
              className={`w-full rounded-2xl border bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-brand-gold/20 placeholder:text-gray-300 h-14 px-5 text-sm transition-all outline-none ${
                errors.name
                  ? 'border-red-200 focus:border-red-400'
                  : 'border-gray-100 focus:border-brand-gold/50'
              }`}
            />
            {errors.name && (
              <span className="text-red-500 text-[10px] font-bold uppercase tracking-wider mt-1 ml-1">
                {errors.name.message}
              </span>
            )}
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-brand-navy text-xs font-black uppercase tracking-widest ml-1">
              E-mail profissional <span className="text-brand-gold">*</span>
            </span>
            <input
              {...register('email')}
              placeholder="nome@email.com.br"
              type="email"
              className={`w-full rounded-2xl border bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-brand-gold/20 placeholder:text-gray-300 h-14 px-5 text-sm transition-all outline-none ${
                errors.email
                  ? 'border-red-200 focus:border-red-400'
                  : 'border-gray-100 focus:border-brand-gold/50'
              }`}
            />
            {errors.email && (
              <span className="text-red-500 text-[10px] font-bold uppercase tracking-wider mt-1 ml-1">
                {errors.email.message}
              </span>
            )}
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <label className="flex flex-col gap-2">
            <span className="text-brand-navy text-xs font-black uppercase tracking-widest ml-1">
              WhatsApp <span className="text-brand-gold">*</span>
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
                    'h-14 rounded-2xl bg-gray-50/50 transition-all border-gray-100',
                    errors.whatsapp
                      ? 'border-red-200 focus:border-red-400'
                      : 'border-gray-100 focus:border-brand-gold/50'
                  )}
                />
              )}
            />
            {errors.whatsapp && (
              <span className="text-red-500 text-[10px] font-bold uppercase tracking-wider mt-1 ml-1">
                {errors.whatsapp.message}
              </span>
            )}
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-brand-navy text-xs font-black uppercase tracking-widest ml-1">
              @ Instagram da Empresa <span className="text-brand-gold">*</span>
            </span>
            <input
              {...register('instagram')}
              placeholder="@seu_instagram"
              type="text"
              className={`w-full rounded-2xl border bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-brand-gold/20 placeholder:text-gray-300 h-14 px-5 text-sm transition-all outline-none ${
                errors.instagram
                  ? 'border-red-200 focus:border-red-400'
                  : 'border-gray-100 focus:border-brand-gold/50'
              }`}
            />
            {errors.instagram && (
              <span className="text-red-500 text-[10px] font-bold uppercase tracking-wider mt-1 ml-1">
                {errors.instagram.message}
              </span>
            )}
          </label>
        </div>
      </div>
    </div>
  )
}
