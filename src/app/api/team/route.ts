import { teamMemberSchema } from '@/lib/zod/team.schema'
import { teamHandler } from '@/shared/api-handlers/team/team.handler'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const members = await teamHandler.list()
    return NextResponse.json(members)
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Erro ao listar equipe', message: err.message },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validação de Schema
    const validation = teamMemberSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: validation.error.format() },
        { status: 400 }
      )
    }

    await teamHandler.invite(validation.data)

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('Team API Error:', err)
    return NextResponse.json(
      { error: 'Erro ao processar convite', message: err.message },
      { status: 500 }
    )
  }
}
