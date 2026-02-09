import { createClient } from '@/lib/supabase/server'
import { formsHandler } from '@/shared/api-handlers/forms/forms.handler'
import { NextResponse } from 'next/server'

async function getTenantId(supabase: any) {
  const {
    data: { user }
  } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { data: profile } = await supabase
    .from('profiles')
    .select('tenant_id')
    .eq('id', user.id)
    .single()

  if (!profile?.tenant_id) throw new Error('Tenant not found')
  return profile.tenant_id
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()
    const tenantId = await getTenantId(supabase)
    const form = await formsHandler.getById(supabase, id, tenantId)
    return NextResponse.json(form)
  } catch (error: any) {
    console.error('[Forms Detail API GET]:', error)
    const status = error.message === 'Unauthorized' ? 401 : 404
    return NextResponse.json({ error: error.message }, { status })
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()
    const tenantId = await getTenantId(supabase)
    const body = await request.json()

    const updatedForm = await formsHandler.update(supabase, id, tenantId, body)
    return NextResponse.json(updatedForm)
  } catch (error: any) {
    console.error('[Forms Detail API PATCH]:', error)
    const status = error.message === 'Unauthorized' ? 401 : 500
    return NextResponse.json({ error: error.message }, { status })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()
    const tenantId = await getTenantId(supabase)
    await formsHandler.delete(supabase, id, tenantId)
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('[Forms Detail API DELETE]:', error)
    const status = error.message === 'Unauthorized' ? 401 : 500
    return NextResponse.json({ error: error.message }, { status })
  }
}
