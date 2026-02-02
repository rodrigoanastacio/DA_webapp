'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { IDeliverableItem } from './how-it-works.types'

interface StepCardProps {
  icon: LucideIcon
  title: string
  description: string
  deliverables: IDeliverableItem[]
  stepNumber: number
  isLast: boolean
}

const ANIMATION_DURATION = 0.3

export const StepCard = ({
  icon: Icon,
  title,
  description,
  deliverables,
  stepNumber,
  isLast
}: StepCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: ANIMATION_DURATION, delay: stepNumber * 0.1 }}
      className="relative flex gap-6 pb-12"
    >
      {!isLast && (
        <div
          className="absolute left-[23px] top-10 w-px h-full bg-gray-200"
          aria-hidden="true"
        />
      )}

      <div className="relative shrink-0 w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm">
        <Icon className="w-5 h-5 text-blue-600" aria-hidden="true" />
      </div>
      <div className="pt-1 w-full">
        <span className="text-lp-primary font-bold text-xs tracking-widest uppercase mb-2 block">
          Etapa {stepNumber}
        </span>
        <h3 className="text-2xl font-bold text-deep-navy mb-4 leading-tight">
          {title}
        </h3>
        <p className="text-base text-gray-600 leading-relaxed mb-6">
          {description}
        </p>

        <div className="space-y-6">
          {deliverables.map((deliverable, delivIdx) => (
            <div key={delivIdx}>
              <strong className="text-deep-navy block mb-3 text-sm">
                {deliverable.title}
              </strong>
              <ul className="space-y-2">
                {deliverable.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start gap-2">
                    <div
                      className="shrink-0 size-6 rounded-full bg-lp-primary/10 flex items-center justify-center mt-0.5"
                      aria-hidden="true"
                    >
                      <span className="size-2 rounded-full bg-lp-primary" />
                    </div>
                    <span className="text-sm text-gray-600 leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
