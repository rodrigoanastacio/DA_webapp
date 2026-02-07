import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

export interface HeroSectionProps {
  id?: string
  headline?: string
  subheadline?: string
  ctaLabel?: string
  ctaLink?: string
  backgroundImage?: string
  theme?: 'light' | 'dark'
}

export function HeroSection({
  id,
  headline = 'Headline Principal Aqui',
  subheadline = 'Subtítulo descrevendo sua proposta de valor única.',
  ctaLabel = 'Saiba Mais',
  ctaLink = '#',
  backgroundImage,
  theme = 'light'
}: HeroSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'relative py-24 md:py-32 overflow-hidden',
        theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-gray-900'
      )}
    >
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt="Hero background"
            fill
            className="object-cover opacity-10"
            unoptimized={true}
          />
        </div>
      )}

      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
          {headline}
        </h1>
        <p className="text-xl md:text-2xl text-gray-500 mb-10 max-w-2xl mx-auto">
          {subheadline}
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href={ctaLink}
            className={cn(
              'px-8 py-4 rounded-xl font-bold transition-all',
              theme === 'dark'
                ? 'bg-white text-slate-900 hover:bg-gray-100'
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-blue-200'
            )}
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}
