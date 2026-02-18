'use client'

import { sendGTMEvent } from '@/lib/gtm'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useState } from 'react'

interface FAQItemProps {
  question: string
  answer: string
  index: number
}

const ANIMATION_DURATION = 0.3

export const FAQItem = ({ question, answer, index }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: ANIMATION_DURATION, delay: index * 0.1 }}
      className="bg-white border border-gray-200 rounded-3xl overflow-hidden hover:border-lp-primary/30 transition-colors"
    >
      <button
        onClick={() => {
          const newIsOpen = !isOpen
          setIsOpen(newIsOpen)
          if (newIsOpen) {
            sendGTMEvent({
              event: 'faq_expanded',
              question_index: index + 1,
              section: 'faq'
            })
          }
        }}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        aria-label={`Pergunta ${index + 1}: ${question}`}
        className="w-full flex justify-between items-center p-6 font-bold text-gray-900 text-left hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-lp-primary/50 focus:ring-offset-2 cursor-pointer"
      >
        <span className="text-lg pr-4">{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: ANIMATION_DURATION }}
          className="shrink-0"
        >
          <Plus
            className={`w-5 h-5 transition-colors duration-300 ${
              isOpen ? 'text-lp-primary' : 'text-gray-400'
            }`}
          />
        </motion.span>
      </button>

      <motion.div
        id={`faq-answer-${index}`}
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: ANIMATION_DURATION, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
          {answer}
        </div>
      </motion.div>
    </motion.div>
  )
}
