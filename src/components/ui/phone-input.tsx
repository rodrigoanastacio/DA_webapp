'use client'

import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import * as React from 'react'

interface PhoneInputProps extends Omit<
  React.ComponentProps<'input'>,
  'onChange' | 'value'
> {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, onChange, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        className={cn('flex-1', className)}
        onChange={(e) => {
          onChange?.(e)
        }}
        {...props}
      />
    )
  }
)
PhoneInput.displayName = 'PhoneInput'

const InputComponent = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'>
>(({ className, ...props }, ref) => (
  <Input
    className={cn(
      'w-full rounded-lg border bg-white focus:ring-1 focus:ring-blue-700 placeholder:text-gray-400 h-12 px-3 text-sm transition-colors',
      className
    )}
    {...props}
    ref={ref}
  />
))
InputComponent.displayName = 'InputComponent'

export { PhoneInput }
