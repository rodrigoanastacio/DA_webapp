import { Quote, Star } from 'lucide-react'
import Image from 'next/image'
import { FormattedQuote } from '../ui/formatted-quote'

interface TestimonialCardProps {
  quote: string
  authorName: string
  authorRole: string
  authorInitials?: string
  authorImage?: string
  variant?: 'primary' | 'secondary'
}

export const TestimonialCard = ({
  authorName,
  authorRole,
  authorInitials,
  authorImage,
  quote,
  variant = 'primary'
}: TestimonialCardProps) => {
  const isDark = variant === 'secondary'

  const initials =
    authorInitials ||
    authorName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase()

  return (
    <article
      className={`p-8 rounded-3xl border transition-all duration-300 flex flex-col relative h-full group ${
        isDark
          ? 'bg-brand-navy/50 border-slate-800 hover:border-brand-gold/30'
          : 'bg-white border-gray-100 shadow-sm hover:shadow-md hover:border-brand-gold/20'
      }`}
    >
      <Quote
        className={`absolute top-8 right-8 w-12 h-12 rotate-180 transition-colors duration-300 ${
          isDark ? 'text-slate-800' : 'text-slate-200'
        }`}
        fill="currentColor"
      />
      <div className="flex gap-1 mb-6">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={16} className="text-brand-gold fill-brand-gold" />
        ))}
      </div>

      <FormattedQuote
        quote={quote}
        className={`italic font-manrope leading-relaxed mb-8 grow relative z-10 ${
          isDark ? 'text-slate-300' : 'text-gray-700'
        }`}
        highlightClassName="text-brand-gold font-bold not-italic"
      />

      <div
        className={`flex items-center gap-4 mt-auto pt-6 border-t ${
          isDark ? 'border-slate-800' : 'border-gray-100'
        }`}
      >
        {authorImage ? (
          <div className="relative size-12 rounded-full overflow-hidden bg-gray-200 shrink-0 border border-transparent group-hover:border-brand-gold/30 transition-colors">
            <Image
              src={authorImage}
              alt={authorName}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div
            className={`size-12 rounded-full flex items-center justify-center font-bold shrink-0 border transition-colors ${
              isDark
                ? 'bg-slate-800 text-slate-400 border-slate-700'
                : 'bg-brand-gold/10 text-brand-gold border-brand-gold/20'
            }`}
          >
            {initials}
          </div>
        )}
        <div>
          <strong
            className={`block text-base leading-tight font-bold ${
              isDark ? 'text-white' : 'text-brand-navy'
            }`}
          >
            {authorName}
          </strong>
          <span
            className={`text-xs uppercase tracking-wide font-bold mt-1 block ${
              isDark ? 'text-brand-gold' : 'text-brand-gold'
            }`}
          >
            {authorRole}
          </span>
        </div>
      </div>
    </article>
  )
}
