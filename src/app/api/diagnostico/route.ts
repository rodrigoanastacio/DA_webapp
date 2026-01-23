import { diagnosticoSchema } from '@/lib/zod/diagnostico.schema'
import { diagnosticoHandler } from '@/shared/api-handlers/diagnostico/diagnostico.handler'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // 1. Validação na Camada de API (REST Layer)
    const validation = diagnosticoSchema.safeParse(body)
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

    // 2. Delegação para a Camada de Handler (API Handler Layer)
    const metadata = {
      clientIp: request.headers.get('x-forwarded-for') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown'
    }

    await diagnosticoHandler.create(validation.data, metadata)

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('API Error:', err)

    // Tratamento de erro padronizado
    return NextResponse.json(
      {
        success: false,
        error: 'Erro ao processar diagnóstico',
        message: err.message,
        code: err.code
      },
      { status: 500 }
    )
  }
}
