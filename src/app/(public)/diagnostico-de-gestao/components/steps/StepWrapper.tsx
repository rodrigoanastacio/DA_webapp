import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface StepWrapperProps {
  title: string
  description?: string
  children: ReactNode
}

export function StepWrapper({
  title,
  description,
  children
}: StepWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full max-w-3xl mx-auto font-manrope"
    >
      <div className="mb-12 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-black text-brand-navy uppercase tracking-tighter mb-4">
          {title}
        </h2>
        {description && (
          <p className="text-gray-500 text-lg leading-relaxed">{description}</p>
        )}
      </div>
      {children}
    </motion.div>
  )
}
