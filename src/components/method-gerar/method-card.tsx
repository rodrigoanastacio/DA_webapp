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
      className={`flex flex-col gap-6 p-8 border-b md:border-b-0 ${
        !isLast ? 'md:border-r' : ''
      } border-gray-200 hover:bg-gray-50 transition-colors group`}
    >
      <span
        className="text-6xl font-black text-brand-gold/20 group-hover:text-brand-gold/50 transition-colors select-none"
        aria-hidden="true"
      >
        {letter}
      </span>
      <div>
        <h3 className="text-brand-navy/80 text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  )
}
