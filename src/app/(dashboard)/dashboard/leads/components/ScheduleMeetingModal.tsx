'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Diagnostico } from '@/shared/entities/diagnosticos/diagnostico.types'
import { Lead } from '@/shared/entities/leads/lead.types'
import { generateGoogleCalendarLink } from '@/shared/utils/calendar/googleCalendarLink'
import { CalendarIcon, ExternalLink } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner' // Assuming sonner is installed as per plan

// Type guard para verificar se é Diagnostico
function isDiagnostico(lead: Lead | Diagnostico): lead is Diagnostico {
  return 'atuacao' in lead && 'faturamento' in lead
}

interface ScheduleMeetingModalProps {
  lead: Lead | Diagnostico
  isOpen: boolean
  onClose: () => void
}

export function ScheduleMeetingModal({
  lead,
  isOpen,
  onClose
}: ScheduleMeetingModalProps) {
  const [date, setDate] = useState<string>('')
  const [time, setTime] = useState<string>('')

  const handleGenerateLink = () => {
    if (!date || !time) {
      toast.error('Selecione data e hora')
      return
    }

    const startDateTime = new Date(`${date}T${time}`)

    const link = generateGoogleCalendarLink({
      title: `Diagnóstico: ${lead.nome_completo} | Dayane Anastácio`,
      details: isDiagnostico(lead)
        ? `Reunião de Diagnóstico com ${lead.nome_completo}\nAtuação: ${lead.atuacao}\nGestão: ${lead.nivel_gestao}\n\nLink da reunião: (Adicionar link do Meet/Zoom)`
        : `Reunião com ${lead.nome_completo}\n\nLink da reunião: (Adicionar link do Meet/Zoom)`,
      start: startDateTime,
      location: 'Google Meet'
    })

    window.open(link, '_blank')
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agendar Reunião</DialogTitle>
          <DialogDescription>
            Selecione a data e hora para gerar o convite do Google Calendar.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Data
            </Label>
            <Input
              id="date"
              type="date"
              className="col-span-3"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="time" className="text-right">
              Hora
            </Label>
            <Input
              id="time"
              type="time"
              className="col-span-3"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleGenerateLink} className="gap-2">
            <CalendarIcon className="h-4 w-4" />
            Gerar Convite
            <ExternalLink className="h-3 w-3 opacity-50" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
