import Image from 'next/image'

interface TestimonialCardProps {
  quote: string
  authorName: string
  authorRole: string
  authorInitials: string
  authorImage?: string
}

export const TestimonialCard = ({
  quote,
  authorName,
  authorRole,
  authorInitials,
  authorImage
}: TestimonialCardProps) => {
  return (
    <article className="bg-lp-bg-light p-10 rounded-2xl border border-gray-200 relative hover:shadow-lg transition-shadow flex flex-col justify-between">
      <div className="absolute -top-4 -left-4 size-12 rounded-full bg-lp-primary flex items-center justify-center text-white text-2xl font-bold shadow-lg">
        &ldquo;
      </div>
      <p className="text-gray-700 text-lg leading-relaxed mb-6 italic">
        {quote}
      </p>
      <div className="flex items-center gap-4">
        {authorImage ? (
          <div className="relative size-12 rounded-full overflow-hidden bg-gray-200 shrink-0">
            <Image
              src={authorImage}
              alt={authorName}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="size-12 rounded-full bg-lp-primary/20 flex items-center justify-center text-lp-primary font-bold shrink-0">
            {authorInitials}
          </div>
        )}
        <div>
          <strong className="text-deep-navy block">{authorName}</strong>
          <span className="text-gray-500 text-sm">{authorRole}</span>
        </div>
      </div>
    </article>
  )
}
