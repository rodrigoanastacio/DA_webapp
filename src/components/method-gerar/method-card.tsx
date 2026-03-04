'use client'

import { motion } from 'framer-motion'

interface MethodCardProps {
  letter: string
  title: string
  description: string
  index: number
  isLast: boolean
}

const ANIMATION_DURATION = 0.3

export const MethodCard = ({
  letter,
  title,
  description,
  index,
  isLast
}: MethodCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: ANIMATION_DURATION, delay: index * 0.1 }}
      className={`relative flex flex-col gap-8 p-10 border-b md:border-b-0 ${
        !isLast ? 'md:border-r' : ''
      } border-gray-100 hover:bg-brand-navy group transition-all duration-500 overflow-hidden`}
    >
      {/* Abstract Background Shape */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full blur-3xl group-hover:bg-brand-gold/10 transition-colors duration-500" />

      <span
        className="text-8xl font-black text-brand-gold/10 group-hover:text-brand-gold/20 transition-all duration-500 select-none leading-none -ml-4"
        aria-hidden="true"
      >
        {letter}
      </span>

      <div className="relative z-10 mt-auto">
        <h3 className="text-brand-navy group-hover:text-white text-xl font-bold mb-4 leading-tight transition-colors duration-500">
          {title}
        </h3>
        <p className="text-gray-500 group-hover:text-gray-300 text-sm leading-relaxed transition-colors duration-500">
          {description}
        </p>
      </div>

      {/* Bottom Indicator */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-brand-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </motion.div>
  )
}
