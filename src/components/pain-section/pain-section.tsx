'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  LucideBarChart3,
  LucideClock,
  LucideFileWarning,
  LucideUsers
} from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export const PainSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLElement>(null)
  const painPointsRef = useRef<HTMLElement>(null)
  const quoteRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(imageRef.current, {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      })

      gsap.from(headerRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 80%'
        }
      })

      const painArticles = painPointsRef.current?.querySelectorAll('article')
      if (painArticles) {
        gsap.from(painArticles, {
          x: -30,
          opacity: 0,
          scale: 0.95,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: painPointsRef.current,
            start: 'top 75%'
          }
        })

        painArticles.forEach((article) => {
          const icon = article.querySelector('.pain-icon')
          if (icon) {
            article.addEventListener('mouseenter', () => {
              gsap.to(icon, {
                scale: 1.1,
                rotate: 5,
                duration: 0.3,
                ease: 'back.out(1.7)'
              })
            })
            article.addEventListener('mouseleave', () => {
              gsap.to(icon, {
                scale: 1,
                rotate: 0,
                duration: 0.3,
                ease: 'power2.out'
              })
            })
          }
        })
      }

      gsap.from(quoteRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: quoteRef.current,
          start: 'top 85%'
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="bg-[#121212] py-24 relative overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div
            ref={imageRef}
            className="relative group min-h-[600px] aspect-4/5"
          >
            <div className="absolute inset-0 bg-linear-to-t from-[#121212] via-[#121212]/30 to-transparent z-20 rounded-3xl"></div>
            <Image
              alt="Pilhas de documentos e processos jurídicos sob uma luz fraca"
              className="object-cover rounded-3xl opacity-60 border border-white/5"
              src="/assets/bg-pilhas-documentos.png"
              fill
            />
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="w-px h-64 bg-linear-to-b from-transparent via-white/20 to-transparent"></div>
            </div>
            <div className="absolute bottom-12 left-12 right-12 z-30">
              <p className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-bold mb-2 font-display">
                Realidade Operacional
              </p>
              <p className="text-white/20 text-xs italic">
                Tarefas sem critério, pilhas de documentos, trabalho que "nunca
                termina".
              </p>
            </div>
          </div>

          <div className="space-y-12">
            <header ref={headerRef}>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-6">
                Você construiu uma empresa para ter sucesso, e se tornou o{' '}
                <span className="text-gray-500 italic">
                  maior gargalo dela.
                </span>
              </h2>
            </header>

            <section ref={painPointsRef} className="grid gap-8 font-display">
              <article className="flex gap-6 group">
                <div className="pain-icon size-12 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-500">
                  <span className="text-2xl text-white/10 group-hover:text-white/50 transition-colors">
                    <LucideFileWarning />
                  </span>
                </div>
                <div>
                  <h4 className="text-white/90 font-bold text-lg mb-1">
                    Processos Despadronizados
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    A falta de padronização gera retrabalho, erros e
                    inconsistência nos resultados.
                  </p>
                </div>
              </article>

              <article className="flex gap-6 group">
                <div className="pain-icon size-12 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-500">
                  <span className="text-white/10 group-hover:text-white/50 transition-colors">
                    <LucideUsers />
                  </span>
                </div>
                <div>
                  <h4 className="text-white/90 font-bold text-lg mb-1">
                    Dificuldade na Delegação
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Dependência total para decisões simples do dia a dia,
                    criando uma rotina que trava sua produtividade.
                  </p>
                </div>
              </article>

              <article className="flex gap-6 group">
                <div className="pain-icon size-12 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-500">
                  <span className="text-white/10 group-hover:text-white/50 transition-colors">
                    <LucideBarChart3 />
                  </span>
                </div>
                <div>
                  <h4 className="text-white/90 font-bold text-lg mb-1">
                    Visibilidade Operacional
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Incerteza sobre o que precisa ser feito diariamente. Você
                    faz tudo no improviso, sem clareza e direcionamento sobre o
                    que é importante.
                  </p>
                </div>
              </article>

              <article className="flex gap-6 group">
                <div className="pain-icon size-12 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-500">
                  <span className="text-white/10 group-hover:text-white/50 transition-colors">
                    <LucideClock />
                  </span>
                </div>
                <div>
                  <h4 className="text-white/90 font-bold text-lg mb-1">
                    Sobrecarga de Gestão
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    O tempo gasto com tarefas administrativas impede o foco no
                    que realmente importa: o olhar estrategico para o seu
                    negócio.
                  </p>
                </div>
              </article>
            </section>

            <div ref={quoteRef} className="pt-8">
              <div className="p-8 border-l-2 border-amber-500 bg-white/2 rounded-r-2xl backdrop-blur-sm">
                <p className="text-xl italic font-light text-gray-300 leading-relaxed">
                  &quot;Trabalhar aos fins de semana não é um sinal de
                  dedicação, é um{' '}
                  <span className="text-white font-semibold underline decoration-amber-500/30 underline-offset-4">
                    sintoma de falta de processos.
                  </span>
                  &quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
