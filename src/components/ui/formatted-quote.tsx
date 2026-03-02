interface FormattedQuoteProps {
  quote: string
  className?: string
  highlightClassName?: string
}

export const FormattedQuote = ({
  quote,
  className = '',
  highlightClassName = 'text-brand-gold font-bold not-italic'
}: FormattedQuoteProps) => {
  return (
    <div className={className}>
      {quote.split('\n\n').map((paragraph, pIdx, array) => (
        <p key={pIdx} className={pIdx < array.length - 1 ? 'mb-4' : ''}>
          {pIdx === 0 && <>&ldquo;</>}
          {paragraph.split(/(\*\*.*?\*\*)/g).map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={i} className={highlightClassName}>
                  {part.slice(2, -2)}
                </strong>
              )
            }
            return part
          })}
          {pIdx === array.length - 1 && <>&rdquo;</>}
        </p>
      ))}
    </div>
  )
}
