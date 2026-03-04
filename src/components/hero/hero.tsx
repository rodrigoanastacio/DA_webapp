'use client'

import { FadeIn, ScaleIn } from '@/components/ui/motion-container'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { heroContent } from './hero.data'

export const Hero = () => {
  const { badge, subheadline, cta, backgroundImage } = heroContent

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center py-20 md:py-32 overflow-hidden bg-white">
      {/* Background Elements - Premium Feel */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-brand-navy/5 rounded-full blur-[120px]" />

        {/* Authority Background Image Integration */}
        {backgroundImage && (
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-r from-white via-white/80 to-transparent z-10" />
            <div className="absolute right-0 bottom-0 w-full md:w-1/2 h-full z-0 opacity-20 grayscale md:opacity-40 select-none pointer-events-none">
              <Image
                src={backgroundImage}
                alt="Autoridade"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
          </div>
        )}

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)',
            backgroundSize: '30px 30px'
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          {/* Badge */}
          <FadeIn delay={0.1}>
            <motion.div
              className="inline-flex items-center gap-3 px-5 py-2 mb-10 text-xs font-bold tracking-[0.2em] uppercase text-brand-gold bg-white border border-brand-gold/20 rounded-full shadow-sm"
              whileHover={{
                y: -2,
                border: '1px solid rgba(212, 175, 55, 0.4)'
              }}
            >
              {badge.showPulse && (
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-gold" />
                </span>
              )}
              {badge.text}
            </motion.div>
          </FadeIn>

          {/* Headline with split emphasis */}
          <div className="text-center mb-10">
            <FadeIn delay={0.2} duration={0.8}>
              <h1 className="text-4xl md:text-7xl lg:text-8xl font-black text-brand-navy tracking-tight leading-[1.05] mb-8">
                Em até <span className="text-brand-gold">90 dias</span>,
                estruturamos seu negócio para ter{' '}
                <span className="relative inline-block">
                  previsibilidade
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-3 text-brand-gold/20 -z-10"
                    viewBox="0 0 100 12"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0,10 Q50,0 100,10"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                    />
                  </svg>
                </span>
                .
              </h1>
            </FadeIn>

            <FadeIn delay={0.4}>
              <p className="text-lg md:text-2xl text-gray-500 max-w-4xl mx-auto leading-relaxed font-light">
                {subheadline.split('. ').map((phrase, i) => (
                  <span
                    key={i}
                    className={
                      i === 1 ? 'text-brand-navy font-semibold block mt-4' : ''
                    }
                  >
                    {phrase}
                    {i === 0 ? '.' : ''}
                  </span>
                ))}
              </p>
            </FadeIn>
          </div>

          {/* New CTA Section */}
          <div className="flex flex-col items-center gap-8">
            <ScaleIn delay={0.6}>
              <Link
                href={cta.href}
                className="group relative inline-flex items-center gap-4 px-12 py-6 bg-brand-navy text-white text-xl font-bold uppercase tracking-widest rounded-2xl overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-brand-navy/20"
              >
                {/* Shine effect */}
                <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shine" />

                <span className="relative z-10">{cta.text}</span>
                <span className="relative z-10 transition-transform group-hover:translate-x-1">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.16669 10H15.8334M15.8334 10L10.8334 5M15.8334 10L10.8334 15"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
            </ScaleIn>

            {/* Social Trust Mini-Banner */}
            <FadeIn delay={0.8}>
              <div className="flex items-center gap-6 text-gray-400 grayscale opacity-60">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                  Exclusividade & Estrutura
                </span>
                <div className="h-px w-8 bg-gray-200" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                  Governança Corporativa
                </span>
              </div>
            </FadeIn>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <div className="w-px h-16 bg-linear-to-b from-brand-gold to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
