'use client'

import { DynamicForm } from '@/components/forms/dynamic-form'
import { FormSchema } from '@/components/forms/types'
import { cn } from '@/lib/utils'
import { Check, FileText } from 'lucide-react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { toast } from 'sonner'

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
  headline = 'Transforme sua Gestão Agora',
  subheadline = 'Potencialize seus resultados com a plataforma mais completa do mercado. Unificamos automação, análise e crescimento em um único lugar.',
  backgroundImage,
  theme = 'light',
  benefits = [],
  form
}: HeroSectionProps) {
  const searchParams = useSearchParams()

  // Helper to render headline with gradient emphasis using *asterisks*
  const renderHeadline = (text: string) => {
    if (!text.includes('*')) return text

    return text.split('*').map((part, index) =>
      index % 2 === 0 ? (
        part
      ) : (
        <span
          key={index}
          className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500"
        >
          {part}
        </span>
      )
    )
  }

  // Centralized submission logic wrapped in useCallback
  const submitLead = useCallback(
    async (data: Record<string, unknown>) => {
      if (!form?.id) throw new Error('ID do formulário não encontrado')

      const payload = {
        answers: data,
        form_id: form.id,
        utm_source: searchParams.get('utm_source'),
        utm_medium: searchParams.get('utm_medium'),
        utm_campaign: searchParams.get('utm_campaign'),
        utm_content: searchParams.get('utm_content'),
        utm_term: searchParams.get('utm_term'),
        referrer: document.referrer
      }

      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Falha ao enviar formulário')
      }
    },
    [form, searchParams]
  ) // Dependencies - using 'form' instead of 'form?.id' for React Compiler

  // Handler for Embedded Form
  const handleEmbeddedSubmit = useCallback(
    async (data: Record<string, unknown>) => {
      try {
        await submitLead(data)
        toast.success('Recebemos seus dados! Entraremos em contato em breve.')
      } catch (error) {
        console.error('Erro ao enviar formulário:', error)
        toast.error('Ocorreu um erro ao enviar. Tente novamente.')
      }
    },
    [submitLead]
  )

  const isDark = theme === 'dark'

  return (
    <section
      id={id}
      className={cn(
        'relative min-h-[90vh] flex items-center pt-20 overflow-hidden transition-colors duration-300',
        isDark ? 'bg-slate-900' : 'bg-gray-50'
      )}
    >
      {/* Background Pattern */}
      {!backgroundImage && (
        <>
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(${isDark ? '#ffffff' : '#000000'} 1px, transparent 1px)`,
              backgroundSize: '32px 32px'
            }}
          ></div>

          {/* Decorative Gradient Blob */}
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/4 w-[800px] h-[800px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        </>
      )}

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

      <div className="@container relative w-full max-w-7xl mx-auto px-4 @xl:px-6 @4xl:px-8 py-8 @4xl:py-20 z-10">
        <div className="grid grid-cols-1 @3xl:grid-cols-12 gap-8 @4xl:gap-16 items-center">
          {/* Left Column */}
          <div className="@3xl:col-span-7 flex flex-col justify-center space-y-6 @4xl:space-y-8 animate-in slide-in-from-left duration-700">
            <div className="space-y-4 @4xl:space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 w-fit">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                  Plataforma #1 em Eficiência
                </span>
              </div>

              <h1
                className={cn(
                  'text-4xl @2xl:text-5xl @4xl:text-7xl font-extrabold tracking-tight leading-[1.1]',
                  isDark ? 'text-white' : 'text-gray-900'
                )}
              >
                {renderHeadline(headline)}
              </h1>

              <p
                className={cn(
                  'text-base @2xl:text-lg @4xl:text-xl max-w-2xl leading-relaxed',
                  isDark ? 'text-gray-400' : 'text-gray-600'
                )}
              >
                {subheadline}
              </p>
            </div>

            {/* Benefits List */}
            {benefits && benefits.length > 0 && (
              <div className="flex flex-col gap-4 pt-2">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 @2xl:gap-4 group"
                  >
                    <div
                      className={cn(
                        'shrink-0 flex items-center justify-center w-10 h-10 @2xl:w-12 @2xl:h-12 rounded-xl border shadow-sm group-hover:shadow-md transition-all duration-300',
                        isDark
                          ? 'bg-gray-800 border-gray-700 group-hover:border-blue-500/30'
                          : 'bg-white border-gray-100 group-hover:border-blue-500/30'
                      )}
                    >
                      <Check className="text-blue-600 dark:text-blue-400 w-5 h-5 @2xl:w-6 @2xl:h-6" />
                    </div>
                    <div>
                      <h3
                        className={cn(
                          'text-base @2xl:text-lg font-bold',
                          isDark ? 'text-white' : 'text-gray-900'
                        )}
                      >
                        {benefit}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Social Proof */}
            <div className="mt-8 @4xl:mt-16 flex items-center gap-6 @4xl:gap-8 border-t border-graphite/10 pt-6 @4xl:pt-8">
              <div>
                <p className="text-primary text-xl @4xl:text-2xl font-bold">
                  +150
                </p>
                <p className="text-gray-400 text-[10px] @4xl:text-xs font-bold uppercase tracking-widest">
                  Escritórios
                </p>
              </div>
              <div className="w-px h-8 bg-graphite/10"></div>
              <div>
                <p className="text-primary text-xl @4xl:text-2xl font-bold">
                  R$ 50M+
                </p>
                <p className="text-gray-400 text-[10px] @4xl:text-xs font-bold uppercase tracking-widest">
                  Geridos
                </p>
              </div>
              <div className="w-px h-8 bg-graphite/10"></div>
              <div>
                <p className="text-primary text-xl @4xl:text-2xl font-bold">
                  12 Anos
                </p>
                <p className="text-gray-400 text-[10px] @4xl:text-xs font-bold uppercase tracking-widest">
                  Experiência
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="@3xl:col-span-5 relative animate-in slide-in-from-right duration-700 delay-100">
            {/* Glow effect behind card */}
            <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-cyan-400 rounded-2xl blur opacity-20 dark:opacity-40"></div>

            {form ? (
              <div
                className={cn(
                  'relative rounded-2xl p-6 @4xl:p-8 shadow-2xl border',
                  isDark
                    ? 'bg-gray-900 border-gray-800'
                    : 'bg-white border-gray-100'
                )}
              >
                <div className="mb-6">
                  <h2
                    className={cn(
                      'text-xl @2xl:text-2xl font-bold mb-2',
                      isDark ? 'text-white' : 'text-gray-900'
                    )}
                  >
                    {form.name || 'Comece sua avaliação'}
                  </h2>
                  <p
                    className={cn(
                      'text-sm',
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    )}
                  >
                    {form.description ||
                      'Preencha o formulário para agendar uma demonstração exclusiva com nossos especialistas.'}
                  </p>
                </div>

                <DynamicForm
                  schema={form}
                  onSubmit={handleEmbeddedSubmit}
                  className="space-y-4 @2xl:space-y-5"
                />

                <p
                  className={cn(
                    'text-xs text-center mt-4',
                    isDark ? 'text-gray-500' : 'text-gray-400'
                  )}
                >
                  Sem cartão de crédito necessário. Teste grátis por 14 dias.
                </p>
              </div>
            ) : (
              /* Empty State - Modern & Clean */
              <div
                className={cn(
                  'relative w-full h-full min-h-[400px] rounded-2xl flex flex-col items-center justify-center text-center p-8 transition-all',
                  'border-2 border-dashed',
                  isDark
                    ? 'border-gray-800 bg-gray-900/50 hover:bg-gray-900/80 hover:border-gray-700'
                    : 'border-gray-200 bg-gray-50/50 hover:bg-white hover:border-blue-200/50'
                )}
              >
                <div
                  className={cn(
                    'w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-500',
                    isDark
                      ? 'bg-gray-800 text-gray-400'
                      : 'bg-white shadow-sm text-gray-400'
                  )}
                >
                  <FileText className="w-8 h-8 opacity-50" />
                </div>
                <h3
                  className={cn(
                    'text-lg font-bold mb-2',
                    isDark ? 'text-gray-200' : 'text-gray-900'
                  )}
                >
                  Nenhum formulário vinculado
                </h3>
                <p
                  className={cn(
                    'text-sm max-w-[260px]',
                    isDark ? 'text-gray-500' : 'text-gray-500'
                  )}
                >
                  Selecione um formulário existente nas configurações ao lado
                  para exibi-lo aqui.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
