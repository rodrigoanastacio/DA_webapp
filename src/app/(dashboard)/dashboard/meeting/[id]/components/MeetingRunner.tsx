'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Entrevista } from '@/shared/entities/entrevistas/entrevista.types'
import { Lead } from '@/shared/entities/leads/lead.types'
import { Loader2, Save } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { saveInterview } from '../../actions/saveInterview'

interface MeetingRunnerProps {
  lead: Lead
  initialEntrevista: Entrevista | null
}

const GERAR_STEPS = [
  {
    id: 'gravidade',
    title: 'GRAVIDADE',
    description: 'Entender o impacto do problema e por que resolver agora.',
    questions: [
      'O que te motivou a buscar ajuda jurídica agora?',
      'Qual o impacto financeiro/operacional desse problema hoje?',
      'O que acontece se nada for feito nos próximos 3-6 meses?'
    ]
  },
  {
    id: 'estrutura',
    title: 'ESTRUTURA',
    description: 'Mapear o cenário atual (Equipe, Processos, Tecnologia).',
    questions: [
      'Como sua equipe jurídica está estruturada hoje?',
      'Quais processos são mais gargalo hoje?',
      'Vocês usam algum software de gestão? Como é a adoção?'
    ]
  },
  {
    id: 'resultado_desejado',
    title: 'RESULTADO (Desejado)',
    description: 'Definir onde o cliente quer chegar.',
    questions: [
      'Qual seria o cenário ideal daqui a 6 meses?',
      'Quais métricas indicariam sucesso para você?'
    ]
  },
  {
    id: 'acao',
    title: 'AÇÃO (Proposta)',
    description: 'Apresentar como a consultoria resolve (Pitch).',
    questions: [
      'Baseado no que falamos, o plano de ação seria...',
      '(Espaço para anotar reações ao pitch)'
    ]
  },
  {
    id: 'resultado_proximos_passos',
    title: 'RESULTADO (Fechamento)',
    description: 'Definir próximos passos e compromisso.',
    questions: [
      'Faz sentido para você essa proposta?',
      'Qual o próximo passo para iniciarmos?'
    ]
  }
]

export function MeetingRunner({ lead, initialEntrevista }: MeetingRunnerProps) {
  const router = useRouter()
  const [activeStep, setActiveStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [interviewId, setInterviewId] = useState<string | undefined>(
    initialEntrevista?.id
  )
  const [answers, setAnswers] = useState<Record<string, string>>(
    (initialEntrevista?.respostas_json as Record<string, string>) || {}
  )
  const [notes, setNotes] = useState(initialEntrevista?.observacoes || '')

  const handleAnswerChange = (question: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [question]: value }))
  }

  const handleSave = async (shouldRedirect = false) => {
    setLoading(true)
    const result = await saveInterview(lead.id, interviewId, answers, notes)
    setLoading(false)

    if (result.success) {
      if (result.data) {
        setInterviewId(result.data.id)
      }
      toast.success('Entrevista salva com sucesso!')

      if (shouldRedirect) {
        toast.info('Redirecionando para o dashboard...')
        router.push('/dashboard/leads/list/')
      }
    } else {
      toast.error(result.error || 'Erro ao salvar entrevista.')
      console.error(result.error)
    }
  }

  const currentStepData = GERAR_STEPS[activeStep]

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden">
      {/* Sidebar / Stepper */}
      <div className="w-64 bg-white border-r border-gray-100 shrink-0 flex flex-col overflow-y-auto">
        <div className="p-6 border-b border-gray-50">
          <h2 className="font-bold text-gray-900 truncate">
            {lead.nome_completo}
          </h2>
          <p className="text-xs text-gray-500 truncate">
            Empresa não informada
          </p>
        </div>
        <nav className="p-4 space-y-2 flex-1">
          {GERAR_STEPS.map((step, index) => (
            <button
              key={step.id}
              onClick={() => setActiveStep(index)}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeStep === index
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="block text-xs font-bold text-gray-400 uppercase mb-1">
                Passo {index + 1}
              </span>
              {step.title}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-50">
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => handleSave(false)}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Salvar Tudo
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-gray-50 p-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {currentStepData.title}
            </h1>
            <p className="text-gray-500">{currentStepData.description}</p>
          </div>

          <div className="space-y-6">
            {currentStepData.questions.map((question, i) => (
              <Card key={i} className="shadow-sm border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold text-gray-800">
                    {question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Anote a resposta do cliente..."
                    className="min-h-[100px] border-gray-200 resize-y focus:ring-blue-500/20"
                    value={answers[question] || ''}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      handleAnswerChange(question, e.target.value)
                    }
                  />
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="pt-8">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
              Anotações Gerais
            </h3>
            <Textarea
              placeholder="Outras observações importantes desta etapa..."
              className="min-h-[150px] bg-white border-gray-200"
              value={notes}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setNotes(e.target.value)
              }
            />
          </div>

          <div className="flex justify-between pt-8">
            <Button
              variant="outline"
              onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
              disabled={activeStep === 0}
            >
              Anterior
            </Button>
            <Button
              onClick={() => {
                if (activeStep < GERAR_STEPS.length - 1) {
                  setActiveStep((prev) => prev + 1)
                } else {
                  handleSave(true)
                }
              }}
              className={
                activeStep === GERAR_STEPS.length - 1
                  ? 'bg-green-600 hover:bg-green-700'
                  : ''
              }
            >
              {activeStep === GERAR_STEPS.length - 1
                ? 'Finalizar Entrevista'
                : 'Próximo'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
