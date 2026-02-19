'use client'

import { sendGTMEvent } from '@/lib/gtm'
import { Instagram, Mail, MapPin } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      id="contato"
      className="bg-slate-950 text-slate-200 pt-20 pb-10 font-manrope border-t border-slate-900"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Brand Column (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block">
              <h2 className="font-montserrat text-2xl font-bold text-white tracking-tight">
                Dayane <span className="text-brand-gold">Anastácio</span>
              </h2>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Transformando a gestão de escritórios de advocacia com processos
              estratégicos, visão de negócios e o método exclusivo GERAR.
            </p>
            <div className="flex gap-3 pt-2">
              <a
                href="https://instagram.com/dayane.anastacio"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  sendGTMEvent({
                    event: 'contact_click',
                    method: 'instagram',
                    location: 'footer_institucional'
                  })
                }
                className="w-10 h-10 flex items-center justify-center bg-slate-900 rounded-lg hover:bg-brand-gold/40 hover:text-white text-slate-400 transition-all duration-300 border border-slate-800 hover:border-brand-gold/50"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="mailto:dayanastacioconsultoria@gmail.com"
                onClick={() =>
                  sendGTMEvent({
                    event: 'contact_click',
                    method: 'email',
                    location: 'footer_institucional'
                  })
                }
                className="w-10 h-10 flex items-center justify-center bg-slate-900 rounded-lg hover:bg-brand-gold/40 hover:text-white text-slate-400 transition-all duration-300 border border-slate-800 hover:border-brand-gold/50"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Links Column (2 cols) */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h3 className="font-montserrat font-bold text-white mb-6 text-sm uppercase tracking-wider">
              Navegação
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-slate-400 hover:text-brand-gold transition-colors block py-1"
                >
                  Início
                </Link>
              </li>
              <li>
                <Link
                  href="#servicos"
                  className="text-slate-400 hover:text-brand-gold transition-colors block py-1"
                >
                  Serviços
                </Link>
              </li>
              <li>
                <Link
                  href="#sobre"
                  className="text-slate-400 hover:text-brand-gold transition-colors block py-1"
                >
                  Sobre Mim
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-montserrat font-bold text-white mb-6 text-sm uppercase tracking-wider">
              Consultoria
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="text-slate-400 py-1">Gestão GERAR</li>
              <li className="text-slate-400 py-1">Consultoria GERAR</li>
              <li className="text-slate-400 py-1">Plano de Ação</li>
            </ul>
          </div>

          {/* Contact Column (3 cols) */}
          <div className="lg:col-span-2 lg:col-start-10">
            <h3 className="font-montserrat font-bold text-white mb-6 text-sm uppercase tracking-wider">
              Fale Conosco
            </h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin
                  className="shrink-0 text-brand-gold/80 mt-0.5"
                  size={16}
                />
                <span>
                  São Paulo, SP
                  <br />
                  Brasil
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600">
          <p>
            &copy; {year} Dayane Anastácio Consultoria. Todos os direitos
            reservados.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacidade"
              className="hover:text-brand-gold transition-colors"
            >
              Política de Privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
