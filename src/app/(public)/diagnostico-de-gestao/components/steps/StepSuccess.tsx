import { CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export function StepSuccess() {
  return (
    <div className="flex flex-col gap-10 items-center text-center font-manrope">
      {/* Icon */}
      <div className="relative group">
        <div className="absolute inset-0 bg-brand-gold blur-2xl opacity-20 group-hover:opacity-30 transition-opacity" />
        <div className="relative w-24 h-24 rounded-full bg-brand-navy flex items-center justify-center text-brand-gold mb-4 border-2 border-brand-gold/20 shadow-2xl">
          <CheckCircle2 className="w-12 h-12" />
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col gap-4">
        <h1 className="text-brand-navy text-3xl md:text-5xl font-black leading-[1.1] tracking-tighter uppercase">
          Diagnóstico <span className="text-brand-gold">Recebido</span>
        </h1>
        <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
          Suas informações foram processadas com sucesso pela nossa equipe
          estratégica.
        </p>
      </div>

      {/* Expectation Card */}
      <div className="bg-brand-navy/5 rounded-[32px] p-8 md:p-12 max-w-xl w-full border border-brand-gold/10 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full blur-3xl" />

        <h3 className="text-brand-navy font-black uppercase tracking-widest text-xs mb-4">
          Próximos Passos
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed relative z-10">
          Entraremos em contato via WhatsApp em até{' '}
          <span className="text-brand-navy font-bold">24 horas úteis</span> para
          alinharmos uma reunião estratégica e apresentarmos o caminho ideal
          para a estruturação do seu negócio.
        </p>
      </div>

      <div className="mt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-brand-navy font-black uppercase tracking-widest text-[10px] transition-all"
        >
          Voltar para o início
        </Link>
      </div>
    </div>
  )
}
