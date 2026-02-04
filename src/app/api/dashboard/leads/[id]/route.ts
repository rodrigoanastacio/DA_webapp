import { createClient } from '@/lib/supabase/server'
import { dashboardHandler } from '@/shared/api-handlers/dashboard/dashboard.handler'
import { NextRequest, NextResponse } from 'next/server'

type Params = Promise<{ id: string }>

export async function PATCH(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { id } = await params
    const { action } = await request.json()

    const supabase = await createClient()

    if (action === 'archive') {
      await dashboardHandler.archiveLead(supabase, id)
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('PATCH /api/dashboard/leads/[id] error:', error)
    return NextResponse.json(
      { error: 'Failed to update lead' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { id } = await params
    const supabase = await createClient()

    await dashboardHandler.deleteLead(supabase, id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE /api/dashboard/leads/[id] error:', error)
    return NextResponse.json(
      { error: 'Failed to delete lead' },
      { status: 500 }
    )
  }
}
