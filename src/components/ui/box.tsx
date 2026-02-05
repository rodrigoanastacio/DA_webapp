import { cn } from '@/lib/utils'
import { HTMLAttributes, forwardRef } from 'react'

interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  rounded?: boolean
  bgColor?: string
}

const Box = forwardRef<HTMLDivElement, BoxProps>(
  ({ className, rounded = false, bgColor = 'bg-white', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          bgColor,
          'border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.01)] p-6',
          rounded && 'rounded-xl',
          className
        )}
        {...props}
      />
    )
  }
)
Box.displayName = 'Box'

export { Box }
