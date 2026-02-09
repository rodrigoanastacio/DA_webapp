import { createClient } from '@/lib/supabase/server'
import { formsHandler } from '@/shared/api-handlers/forms/forms.handler'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = await createClient()

    // Pegar o tenant_id do usuário logado
    const {
      data: { user }
    } = await supabase.auth.getUser()
    if (!user)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: profile } = await supabase
      .from('profiles')
      .select('tenant_id')
      .eq('id', user.id)
      .single()

    if (!profile?.tenant_id)
      return NextResponse.json({ error: 'Tenant not found' }, { status: 400 })

    const { forms } = await formsHandler.list(supabase, profile.tenant_id)
    return NextResponse.json(forms)
  } catch (error) {
    console.error('[Forms API GET]:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const body = await request.json()

    // Pegar o tenant_id do usuário logado (opcional se o handler já lida, mas bom garantir)
    const {
      data: { user }
    } = await supabase.auth.getUser()
    if (!user)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    // Buscar perfil para ter o tenant_id
    const { data: profile } = await supabase
      .from('profiles')
      .select('tenant_id')
      .eq('id', user.id)
      .single()

    if (!profile?.tenant_id)
      return NextResponse.json({ error: 'Tenant not found' }, { status: 400 })

    const newForm = await formsHandler.create(supabase, {
      ...body,
      tenant_id: profile.tenant_id
    })

    return NextResponse.json(newForm)
  } catch (error) {
    console.error('[Forms API POST]:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
