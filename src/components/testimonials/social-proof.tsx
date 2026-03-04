'use client'

import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useState } from 'react'
import { TestimonialCard } from './testimonial-card'

interface TestimonialData {
  quote: string
  authorName: string
  authorRole: string
  authorImage?: string
}

const SocialProof = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  )
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on('select', onSelect)
    onSelect()
  }, [emblaApi, setScrollSnaps, onSelect])

  const testimonials: TestimonialData[] = [
    {
      quote:
        '“Antes do processo, eu **centralizava tudo e vivia apagando incêndios**. Hoje minha equipe funciona com mais autonomia e minha agenda deixou de ser um caos. A estrutura implementada **mudou completamente** nossa forma de trabalhar.”',
      authorName: 'Dr. Rafael M.',
      authorRole: 'Advogado Sócio'
    },
    {
      quote:
        '“Não era falta de clientes. Era **falta de organização estratégica**. Em poucas semanas já percebemos **redução de retrabalho** e mais clareza nas decisões.”',
      authorName: 'Fernanda T.',
      authorRole: 'Sócia fundadora'
    },
    {
      quote:
        '“O método trouxe **governança**. Hoje conseguimos acompanhar indicadores, planejar metas e **crescer com mais segurança**.”',
      authorName: 'Henrique L.',
      authorRole: 'Diretor de Vendas'
    },
    {
      quote:
        '“Com a implementação da estrutura de gestão, nossa **rotina ficou muito mais previsível e organizada**. Hoje temos clareza dos processos, controle das demandas e mais segurança. Conseguimos trabalhar com mais tranquilidade, **menos improviso e muito mais profissionalismo**.”',
      authorName: 'Dr. Fabio G.',
      authorRole: 'Sócio'
    }
  ]

  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Mentoria e Gestão Estratégica para Escritórios de Advocacia - Dayane Anastacio',
    description:
      'Consultoria especializada em gestão estratégica, otimização de processos e escalabilidade para escritórios de advocacia.',
    url: 'https://dayaneanastacio.com.br/p/mentoria-e-gestao-estrategica',
    telephone: '+55-11-98765-4321',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'São Paulo',
      addressRegion: 'SP',
      addressCountry: 'BR'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      bestRating: '5',
      worstRating: '1',
      reviewCount: testimonials.length.toString()
    },
    review: testimonials.map((testimonial) => ({
      '@type': 'Review',
      itemReviewed: {
        '@type': 'Review',
        name: 'Mentoria e Gestão Estratégica para Escritórios de Advocacia',
        description:
          'Programa de mentoria estratégica focado em otimização de processos, implementação de sistemas de gestão e escalabilidade para escritórios de advocacia.',
        provider: {
          '@type': 'Person',
          name: 'Dayane Anastacio',
          jobTitle: 'Consultora de Gestão Estratégica'
        }
      },
      author: {
        '@type': 'Person',
        name: testimonial.authorName,
        jobTitle: testimonial.authorRole
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
        worstRating: '1'
      },
      reviewBody: testimonial.quote
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />

      <section id="resultados" className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <header className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase bg-brand-navy/5 text-brand-navy border border-brand-navy/10 rounded-full">
              Prova Social
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-navy mb-4">
              O Efeito Antes e Depois
            </h2>
            <p className="text-gray-500 max-w-[600px] mx-auto">
              Advogados que recuperaram o controle, a liberdade e a paz de
              espírito que só um escritório bem estruturado pode proporcionar.
            </p>
          </header>

          <div className="relative max-w-7xl mx-auto">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex -ml-4 md:-ml-8">
                {testimonials.map((testimonial, idx) => (
                  <div
                    key={idx}
                    className="flex-[0_0_100%] md:flex-[0_0_33.33%] min-w-0 pl-4 md:pl-8 py-4"
                  >
                    <TestimonialCard
                      quote={testimonial.quote}
                      authorName={testimonial.authorName}
                      authorRole={testimonial.authorRole}
                      authorImage={testimonial.authorImage}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-3 mt-12">
              {scrollSnaps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={`size-2.5 rounded-full transition-all duration-300 ${
                    index === selectedIndex
                      ? 'bg-brand-gold w-8'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                  aria-label={`Ir para slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default SocialProof
