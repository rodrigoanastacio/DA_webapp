'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { useUTM } from '@/hooks/useUTM'
import { useState } from 'react'
import { toast } from 'sonner'
import { DynamicForm } from './dynamic-form'
import { FormSchema } from './types'

interface CaptureModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  schema: FormSchema
  tenantId: string
  title?: string
  description?: string
  onSuccess?: () => void
}

export function CaptureModal({
  isOpen,
  onOpenChange,
  schema,
  tenantId,
  title,
  description,
  onSuccess
}: CaptureModalProps) {
  const utms = useUTM()
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (formData: Record<string, unknown>) => {
    try {
      const payload = {
        ...formData,
        ...utms,
        tenant_id: tenantId,
        form_id: schema.id
      }

      const response = await fetch('/api/capture/tenant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        throw new Error('Erro ao enviar formulário')
      }

      toast.success('Recebemos seus dados com sucesso!')
      setIsSuccess(true)

      if (onSuccess) {
        onSuccess()
      }

      // Optional: Close modal after delay
      setTimeout(() => {
        onOpenChange(false)
        setIsSuccess(false) // Reset for next time
      }, 2000)
    } catch (error) {
      console.error('Erro de submissão:', error)
      toast.error('Ocorreu um erro ao enviar. Tente novamente.')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title || schema.name || 'Fale Conosco'}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-10 text-center animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
              <span className="material-symbols-outlined text-3xl">check</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Sucesso!</h3>
            <p className="text-gray-500">
              Recebemos suas informações e entraremos em contato em breve.
            </p>
          </div>
        ) : (
          <DynamicForm
            schema={schema}
            onSubmit={handleSubmit}
            className="pt-4"
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
