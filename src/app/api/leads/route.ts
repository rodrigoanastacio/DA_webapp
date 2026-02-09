import { leadsHandler } from '@/shared/api-handlers/leads/leads.handler'
import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Validação básica de segurança (opcional, pode ser via middleware)
    // const token = req.cookies.get('sb-access-token')?.value
    // if (!token) throw new Error('Unauthorized')

    // Inicializar cliente Supabase com contexto de Auth (se necessário)
    // Aqui usamos createClient para passar o token do usuário se estivermos usando RLS via JWT
    // Mas no app router do Next.js + Supabase SSR, o jeito padrão é criar o cliente do server
    // Porém, para simplificar e garantir funcionamento com o handler existente:
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: {
          headers: {
            Authorization: req.headers.get('Authorization') || ''
          }
        }
      }
    )

    // Extrair metadados da requisição
    const clientIp =
      req.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1'
    const userAgent = req.headers.get('user-agent') || 'Unknown'

    const metadata = {
      clientIp,
      userAgent,
      utmSource: body.utm_source,
      utmMedium: body.utm_medium,
      utmCampaign: body.utm_campaign,
      utmContent: body.utm_content,
      utmTerm: body.utm_term,
      referrer: body.referrer,
      form_id: body.form_id,
      answers: body.answers
    }

    // O Zod schema strip() no handler deve ignorar campos extras (UTMs),
    // então passamos o body filtrado ou diretamente se a tipagem permitir.
    await leadsHandler.create(supabase, body, metadata)

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error: unknown) {
    console.error('Erro na criação de lead:', error)
    const message =
      error instanceof Error ? error.message : 'Erro interno do servidor'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
