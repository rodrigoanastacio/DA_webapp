import { createAdminClient } from '@/lib/supabase/admin'
import { diagnosticosHandler } from '@/shared/api-handlers/diagnosticos/diagnosticos.handler'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    // Use admin client to bypass RLS for public form submissions
    const supabase = createAdminClient()

    const metadata = {
      clientIp:
        req.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1',
      userAgent: req.headers.get('user-agent') || 'Unknown',
      utmSource: body.utm_source,
      utmMedium: body.utm_medium,
      utmCampaign: body.utm_campaign,
      utmContent: body.utm_content,
      utmTerm: body.utm_term,
      referrer: body.referrer
    }

    await diagnosticosHandler.create(supabase, body, metadata)

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error: unknown) {
    console.error('Erro na criação de diagnóstico:', error)
    const message =
      error instanceof Error ? error.message : 'Erro interno do servidor'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
