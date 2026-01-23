import { diagnosticSchema } from '@/app/diagnostico-de-gestao/schema'
import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // 1. Validation in the API Layer
    const validation = diagnosticSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Dados inválidos',
          details: validation.error.format()
        },
        { status: 400 }
      )
    }

    const data = validation.data

    // 2. Direct Supabase call from the Server
    const { error } = await supabase.from('diagnosticos').insert([
      {
        nome_completo: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        whatsapp: data.whatsapp.replace(/\D/g, ''), // Save only digits as recommended
        cidade_estado: data.cityState.trim(),
        tempo: data.experienceTime,
        atuacao: data.currentRole,
        estrutura_equipe: data.teamStructure,
        nivel_gestao: data.managementLevel,
        dificuldades: data.dificuldades,
        faturamento: data.revenue,
        expectativas: data.expectativas.trim(),
        investimento: data.investment,
        ip_cliente: request.headers.get('x-forwarded-for') || 'unknown',
        agente_usuario: request.headers.get('user-agent') || 'unknown'
      }
    ])

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        {
          success: false,
          error: 'Erro ao salvar no banco de dados',
          message: error.message,
          code: error.code
        },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('API Error:', err)
    return NextResponse.json(
      { success: false, error: 'Erro interno no servidor' },
      { status: 500 }
    )
  }
}
