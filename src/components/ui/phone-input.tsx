'use client'

import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import * as React from 'react'
import * as RPNI from 'react-phone-number-input/input'

interface PhoneInputProps extends Omit<
  React.ComponentProps<'input'>,
  'onChange' | 'value'
> {
  value?: string
  onChange?: (value: string) => void
  error?: boolean
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, onChange, value, error, ...props }, ref) => {
    return (
      <RPNI.default
        ref={ref as any}
        value={value}
        onChange={(val) => onChange?.(val || '')}
        country="BR"
        international={false}
        inputComponent={InputComponent}
        className={cn(className)}
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
