import { CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export function StepSuccess() {
  return (
    <div className="flex flex-col gap-8 items-center text-center py-8">
      {/* Icon */}
      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-4 animate-bounce-short">
        <CheckCircle2 className="w-12 h-12" />
      </div>

      {/* Header */}
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl md:text-4xl font-extrabold leading-tight tracking-tight text-gray-800">
          Diagnóstico Recebido!
        </h1>
        <p className="text-blue-300 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
          Obrigada por compartilhar comigo suas informações.
        </p>
      </div>

      {/* Expectation Card */}
      <div className="bg-blue-50/50 rounded-xl p-6 md:p-8 max-w-xl w-full border border-blue-100">
        <h3 className="text-blue-700 font-bold mb-2">Próximos Passos</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          Entrarei em contato via WhatsApp em até{' '}
          <strong>24 horas úteis</strong> para alinharmos uma reunião inicial, e
          te apresentar o resultado do seu diagnóstico e sugerir seu plano de
          ação personalizado.
        </p>
      </div>

      <div className="mt-4">
        <Link
          href="/"
          className="text-gray-500 hover:text-gray-700 font-medium transition-colors"
        >
          Voltar para a Home
        </Link>
      </div>
    </div>
  )
}
