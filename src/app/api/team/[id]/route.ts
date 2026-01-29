import { teamMemberSchema } from '@/lib/zod/team.schema'
import { teamHandler } from '@/shared/api-handlers/team/team.handler'
import { NextResponse } from 'next/server'

import { createClient } from '@/lib/supabase/server'

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const validation = teamMemberSchema
      .pick({ full_name: true, role: true })
      .safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: validation.error.format() },
        { status: 400 }
      )
    }

    const supabase = await createClient()
    await teamHandler.update(supabase, id, validation.data)

    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    console.error('Error deleting team member:', error)
    return NextResponse.json(
      { error: 'Failed to delete team member' },
      { status: 500 }
    )
  }
}
