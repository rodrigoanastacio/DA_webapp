import { LucideArrowRight } from 'lucide-react'
import Link from 'next/link'

export const DiagnosisCallAction = () => {
  return (
    <section className="bg-gray-900 py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
          Pare de perder dinheiro para a desorganização.
        </h2>
        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          Receba um plano de ação personalizado para o seu escritório. É rápido,
          gratuito e vai te dar clareza imediata.
        </p>

        <Link
          href="/diagnostico-de-gestao"
          className="inline-flex items-center gap-3 bg-white text-gray-900 px-8 py-4 text-lg font-bold hover:bg-gray-100 transition-colors duration-200 group"
        >
          QUERO FAZER MEU DIAGNÓSTICO
          <LucideArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
        <p className="mt-4 text-gray-500 text-sm">
          *Vagas limitadas para consultoria direta.
        </p>
      </div>
    </section>
  )
}
