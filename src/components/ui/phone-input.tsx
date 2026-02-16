'use client'

import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import * as React from 'react'

interface PhoneInputProps extends Omit<
  React.ComponentProps<'input'>,
  'onChange' | 'value'
> {
  value?: string
  onChange?: (value: string) => void
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, onChange, value = '', ...props }, ref) => {
    const formatPhoneNumber = (input: string): string => {
      // Remove tudo que não é número
      const numbers = input.replace(/\D/g, '')

      // Aplica a máscara (00) 00000-0000
      if (numbers.length === 0) {
        return ''
      } else if (numbers.length <= 2) {
        return `(${numbers}`
      } else if (numbers.length <= 7) {
        return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
      } else if (numbers.length <= 11) {
        return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`
      }
      // Limita a 11 dígitos
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = formatPhoneNumber(e.target.value)
      onChange?.(formatted)
    }

    return (
      <Input
        ref={ref}
        type="tel"
        value={value}
        className={cn('flex-1', className)}
        onChange={handleChange}
        {...props}
      />
    )
  }
)
PhoneInput.displayName = 'PhoneInput'

export { PhoneInput }
