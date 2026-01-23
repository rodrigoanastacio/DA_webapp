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
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
        {description && <p className="text-gray-600">{description}</p>}
      </div>
      {children}
    </motion.div>
  )
}
