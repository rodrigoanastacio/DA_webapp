import { teamMemberSchema } from '@/lib/zod/team.schema'
import { teamHandler } from '@/shared/api-handlers/team/team.handler'
import { NextResponse } from 'next/server'

import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()
    const members = await teamHandler.list(supabase)
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

    const validation = teamMemberSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: validation.error.format() },
        { status: 400 }
      )
    }

    const supabase = await createClient()
    const {
      data: { user },
      error: authError
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (!profile || profile.role !== 'admin') {
      return NextResponse.json(
        { error: 'Apenas administradores podem enviar convites.' },
        { status: 403 }
      )
    }

    const supabaseAdmin = createAdminClient()
    await teamHandler.invite(supabaseAdmin, validation.data)

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('Team API Error:', err)
    return NextResponse.json(
      { error: 'Erro ao processar convite', message: err.message },
      { status: 500 }
    )
  }
}
