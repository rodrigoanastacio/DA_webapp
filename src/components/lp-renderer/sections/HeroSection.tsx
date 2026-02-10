'use client'

import { CaptureModal } from '@/components/forms/capture-modal'
import { DynamicForm } from '@/components/forms/dynamic-form'
import { FormSchema } from '@/components/forms/types'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export interface HeroSectionProps {
  id?: string
  headline?: string
  subheadline?: string
  ctaLabel?: string
  ctaLink?: string
  backgroundImage?: string
  theme?: 'light' | 'dark'
  layout?: 'centered' | 'split'
  benefits?: string[]
  form?: FormSchema
}

export function HeroSection({
  id,
  headline = 'Headline Principal Aqui',
  subheadline = 'Subtítulo descrevendo sua proposta de valor única.',
  ctaLabel = 'Saiba Mais',
  ctaLink = '#',
  backgroundImage,
  theme = 'light',
  layout = 'centered',
  benefits = [],
  form
}: HeroSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCtaClick = (e: React.MouseEvent) => {
    if (form && layout === 'centered') {
      e.preventDefault()
      setIsModalOpen(true)
    }
  }

  const isDark = theme === 'dark'

  return (
    <section
      id={id}
      className={cn(
        'relative py-20 md:py-32 overflow-hidden',
        isDark ? 'bg-slate-900 text-white' : 'bg-white text-gray-900'
      )}
    >
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt="Hero background"
            fill
            className="object-cover opacity-10"
          />
        </div>
      )}

      <div className="container mx-auto px-4 relative z-10">
        {layout === 'split' ? (
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column: Content */}
            <div className="text-left space-y-8 animate-in slide-in-from-left duration-500">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
                  {headline}
                </h1>
                <p className="text-xl text-gray-500 max-w-lg leading-relaxed">
                  {subheadline}
                </p>
              </div>

              {benefits && benefits.length > 0 && (
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div
                        className={cn(
                          'mt-1 p-1 rounded-full',
                          isDark
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-emerald-100 text-emerald-600'
                        )}
                      >
                        <Check size={16} strokeWidth={3} />
                      </div>
                      <span
                        className={cn(
                          'font-medium',
                          isDark ? 'text-gray-300' : 'text-gray-700'
                        )}
                      >
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {!form && (
                <a
                  href={ctaLink}
                  className={cn(
                    'inline-block px-8 py-4 rounded-xl font-bold transition-all cursor-pointer',
                    isDark
                      ? 'bg-white text-slate-900 hover:bg-gray-100'
                      : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-blue-200'
                  )}
                >
                  {ctaLabel}
                </a>
              )}
            </div>

            {/* Right Column: Embedded Form */}
            <div className="animate-in slide-in-from-right duration-500 delay-100">
              {form ? (
                <div className="bg-white rounded-2xl shadow-2xl shadow-blue-900/10 p-6 md:p-8 border border-gray-100">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900">
                      {form.name || 'Preencha os dados'}
                    </h3>
                    {form.description && (
                      <p className="text-sm text-gray-500 mt-1">
                        {form.description}
                      </p>
                    )}
                  </div>
                  <DynamicForm
                    schema={form}
                    onSubmit={async () => {}} // Preview mode, do nothing or show toast
                    className="w-full"
                  />
                </div>
              ) : (
                <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-2xl h-[400px] flex flex-col items-center justify-center text-gray-400 p-8 text-center">
                  <span className="text-4xl mb-4">📝</span>
                  <p className="font-medium">Nenhum formulário selecionado</p>
                  <p className="text-sm mt-2">
                    Selecione um formulário nas configurações da página para
                    visualizá-lo aqui.
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Centered Layout (Default) */
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              {headline}
            </h1>
            <p className="text-xl md:text-2xl text-gray-500 mb-10 max-w-2xl mx-auto">
              {subheadline}
            </p>
            <div className="flex justify-center gap-4">
              <a
                href={ctaLink}
                onClick={handleCtaClick}
                className={cn(
                  'px-8 py-4 rounded-xl font-bold transition-all cursor-pointer inline-block',
                  isDark
                    ? 'bg-white text-slate-900 hover:bg-gray-100'
                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-blue-200'
                )}
              >
                {ctaLabel}
              </a>
            </div>
          </div>
        )}

        {/* Modal for Centered Layout */}
        {layout === 'centered' && form && (
          <CaptureModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            schema={form}
          />
        )}
      </div>
    </section>
  )
}
