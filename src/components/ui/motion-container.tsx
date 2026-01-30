'use client'

import { motion, UseInViewOptions } from 'framer-motion'

interface MotionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  viewport?: UseInViewOptions
}

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.5,
  viewport = { once: true, margin: '-50px' }
}: MotionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function FadeInLeft({
  children,
  className,
  delay = 0,
  duration = 0.5,
  viewport = { once: true, margin: '-50px' }
}: MotionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={viewport}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function FadeInRight({
  children,
  className,
  delay = 0,
  duration = 0.5,
  viewport = { once: true, margin: '-50px' }
}: MotionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={viewport}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function ScaleIn({
  children,
  className,
  delay = 0,
  duration = 0.5,
  viewport = { once: true }
}: MotionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={viewport}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }} // smooth easeOutExpo-ish
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerContainer({
  children,
  className,
  delay = 0,
  viewport = { once: true, margin: '-50px' }
}: MotionProps & { staggerChildren?: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1,
            delayChildren: delay
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
} as any
