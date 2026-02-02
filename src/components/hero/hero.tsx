'use client'

import checkmarkAnimation from '@/../public/lottie/checkmark-success.json'
import { FadeIn, ScaleIn } from '@/components/ui/motion-container'
import { motion } from 'framer-motion'
import Lottie from 'lottie-react'
import Link from 'next/link'
import { heroContent } from './hero.data'

export const Hero = () => {
  const { badge, headline, subheadline, cta } = heroContent

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-white">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <FadeIn delay={0.1}>
            <motion.div
              className="inline-flex items-center gap-2 px-6 py-2 mb-8 text-sm font-bold text-blue-700 bg-white/80 backdrop-blur-sm border border-blue-100 rounded-full cursor-default shadow-sm"
              whileHover={{ scale: 1.05 }}
            >
              {badge.showPulse && (
                <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600" />
                </span>
              )}
              {badge.text}
            </motion.div>
          </FadeIn>

          {/* Headline */}
          <FadeIn delay={0.2} duration={0.8}>
            <div className="mb-8 space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
                {headline.line1}
              </h1>

              <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-blue-600 tracking-tight leading-[1.1]">
                {headline.line2}
              </h2>
            </div>
          </FadeIn>

          {/* Subheadline */}
          <FadeIn delay={0.4}>
            <p className="mb-10 text-xl text-gray-600 max-w-2xl leading-relaxed">
              {subheadline}
            </p>
          </FadeIn>

          {/* CTA Button with Lottie */}
          <ScaleIn delay={0.6}>
            <Link
              href={cta.href}
              className="group inline-flex items-center gap-3 px-10 py-5 text-lg font-bold text-white transition-all duration-300 bg-blue-600 rounded-2xl hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
            >
              <div className="w-6 h-6 transition-transform group-hover:scale-110">
                <Lottie
                  animationData={checkmarkAnimation}
                  loop={true}
                  autoplay={true}
                />
              </div>
              {cta.text}
            </Link>
          </ScaleIn>
        </div>
      </div>
    </section>
  )
}
