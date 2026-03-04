'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
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
  const sectionTitleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animação do título principal
      gsap.from(sectionTitleRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionTitleRef.current,
          start: 'top 85%'
        }
      })

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
          x: -20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: painPointsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
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
        <div
          ref={sectionTitleRef}
          className="text-center max-w-4xl mx-auto mb-20 space-y-4"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
            Você não está sobrecarregado por falta de capacidade.{' '}
            <span className="text-brand-gold mt-2">
              Você está sobrecarregado por falta de estrutura.
            </span>
          </h2>
          <div className="w-24 h-1 bg-brand-gold/30 mx-auto rounded-full mt-6"></div>
        </div>

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
                Tarefas sem critério, pilhas de documentos, trabalho que
                &quot;nunca termina&quot;.
              </p>
            </div>
          </div>

          <div className="space-y-12">
            <header ref={headerRef}>
              <h3 className="text-2xl md:text-4xl font-extrabold text-white leading-tight mb-6">
                Hoje você até pode até faturar bem, mas:{' '}
              </h3>
            </header>

            <section ref={painPointsRef} className="flex flex-col gap-6">
              {[
                'Ainda centraliza todas as decisões',
                'Sua equipe depende demais de você',
                'Processos não estão padronizados',
                'A comunicação é desalinhada',
                'O retrabalho consome seu tempo e energia',
                'Você vive resolvendo urgências operacionais'
              ].map((text, idx) => (
                <article
                  key={idx}
                  className="group flex items-center gap-4 py-2 border-b border-white/5 hover:border-brand-gold/30 transition-[border-color] duration-500"
                >
                  <div className="w-6 h-px bg-brand-gold/40 group-hover:w-10 group-hover:bg-brand-gold transition-all duration-500 shrink-0" />
                  <h4 className="text-gray-300 group-hover:text-white font-medium text-xl md:text-2xl transition-[color] duration-500">
                    {text}
                  </h4>
                </article>
              ))}
            </section>

            <div ref={quoteRef} className="pt-12 space-y-6">
              <div className="flex items-center gap-3 text-amber-500/80 uppercase tracking-[0.2em] text-[10px] font-bold">
                <div className="w-8 h-px bg-amber-500/50" />E isso gera algo
                perigoso:
              </div>

              <h3 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter uppercase">
                Crescimento <span className="text-brand-gold">instável.</span>
              </h3>

              <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-lg font-light">
                Enquanto você continuar sendo o principal{' '}
                <span className="text-white italic font-medium">
                  &quot;gestor operacional&quot;
                </span>
                , não haverá escala — pois tudo gira em torno de você.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
