'use client'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { CheckCircle2, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { DynamicForm } from './DynamicForm'
import { FormSchema } from './types'

interface CaptureModalProps {
  isOpen: boolean
  onClose: () => void
  schema: FormSchema
}

export function CaptureModal({ isOpen, onClose, schema }: CaptureModalProps) {
  const [hasSubmitted, setHasSubmitted] = useState(false)

  // Reset state when opening/closing
  useEffect(() => {
    if (isOpen) setHasSubmitted(false)
  }, [isOpen])

  const handleSubmit = async (data: Record<string, unknown>) => {
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // tenant_id removido - agora é derivado do form_id no backend
          answers: data,
          form_id: schema.id,
          metadata: {
            url: typeof window !== 'undefined' ? window.location.href : '',
            user_agent:
              typeof navigator !== 'undefined' ? navigator.userAgent : ''
          }
        })
      })

      if (!response.ok) throw new Error('Erro ao salvar lead')

      setHasSubmitted(true)
      toast.success('Informações enviadas com sucesso!', {
        description: 'Em breve entraremos em contato.'
      })

      // Close after a delay
      setTimeout(() => {
        onClose()
      }, 3000)
    } catch (error) {
      console.error('Lead submission error:', error)
      toast.error('Erro ao enviar informações', {
        description: 'Por favor, tente novamente em instantes.'
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-[600px] p-0 overflow-hidden rounded-[32px] border-none shadow-2xl"
        aria-describedby="modal-description"
      >
        <div id="modal-description" className="sr-only">
          Formulário de captura de leads: {schema.name}
        </div>

        <button
          onClick={onClose}
          className="absolute right-6 top-6 z-50 p-2 rounded-full bg-gray-50 text-gray-400 hover:text-gray-900 transition-colors"
          aria-label="Fechar"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col h-full max-h-[90vh]">
          {/* Header with Visual Decor */}
          <div className="bg-blue-600 p-12 text-white relative overflow-hidden shrink-0">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl animate-pulse" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-400/20 rounded-full -ml-10 -mb-10 blur-2xl" />

            <div className="relative z-10 space-y-2">
              <DialogTitle className="text-3xl font-black tracking-tight">
                {schema.name}
              </DialogTitle>
              <p className="text-blue-100 text-sm font-medium opacity-90">
                Preencha os campos abaixo para continuarmos seu atendimento.
              </p>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-12 overflow-y-auto bg-white flex-1 custom-scrollbar">
            {hasSubmitted ? (
              <div className="py-12 flex flex-col items-center text-center animate-in zoom-in-95 duration-500">
                <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2">
                  Solicitação Recebida!
                </h3>
                <p className="text-gray-500 max-w-xs mx-auto">
                  Já recebemos seus dados e nosso time entrará em contato em
                  breve.
                </p>
              </div>
            ) : (
              <DynamicForm schema={schema} onSubmit={handleSubmit} />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
