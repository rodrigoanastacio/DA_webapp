'use client'

import { sendGTMEvent } from '@/lib/gtm'

import Link from 'next/link'

export const CallToAction = () => {
  return (
    <section className="py-32 bg-linear-to-b from-slate-950 to-slate-950/90 text-white text-center px-6 relative overflow-hidden">
      <div
        className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none bg-dots"
        aria-hidden="true"
      />
      <div className="max-w-[850px] mx-auto relative z-10 px-4">
        <h2 className="text-4xl md:text-6xl font-bold mb-10 tracking-tight leading-tight">
          Você esta pronto(a) para levar sua empresa para o próximo nível de
          crescimento?
        </h2>
        <p className="text-xl text-gray-300 mb-14 font-light max-w-[650px] mx-auto leading-relaxed">
          Solicite um diagnóstico estratégico para avaliarmos o seu momento
          atual da e entender como a gestão pode melhorar os processos e
          estrutura do seu negócio.
        </p>
        <div className="flex flex-col items-center space-y-8">
          <Link
            href="/diagnostico-de-gestao"
            onClick={() =>
              sendGTMEvent({
                event: 'cta_click',
                location: 'call_to_action_cta',
                label: 'quero_mudar_minha_rotina_agora',
                destination: '/diagnostico-de-gestao'
              })
            }
            className="group relative overflow-hidden bg-blue-600 text-white px-10 md:px-16 py-6 md:py-7 rounded-2xl text-lg md:text-xl font-bold hover:scale-105 hover:bg-blue-500 transition-all focus:outline-none focus:ring-4 focus:ring-blue-50"
          >
            Iniciar diagnóstico da empresa!
          </Link>
        </div>
      </div>
    </section>
  )
}
