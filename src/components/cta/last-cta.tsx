'use client'

import { Calendar } from 'lucide-react'
import Link from 'next/link'

export const LastCTA = () => {
  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-5xl font-black text-brand-navy leading-tight">
            Seu escritório já cresceu.{' '}
            <span className="text-brand-gold italic">
              Agora ele precisa de estrutura.
            </span>
          </h2>

          <div className="pt-4 text-center">
            <Link
              href="/diagnostico-de-gestao"
              className="inline-flex items-center gap-3 px-12 py-6 bg-brand-navy text-white text-xl font-bold uppercase tracking-widest rounded-2xl hover:bg-brand-navy/90 hover:scale-105 transition-all shadow-xl shadow-brand-navy/10"
            >
              <Calendar size={22} className="text-brand-gold" />
              Agende sua Conversa Estratégica
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
