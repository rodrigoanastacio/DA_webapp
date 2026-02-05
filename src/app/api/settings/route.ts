import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = await createClient()
    const {
      data: { user },
      error: authError
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized - Please login' },
        { status: 401 }
      )
    }

    const tenant_id = user.user_metadata?.tenant_id
    if (!tenant_id) {
      return NextResponse.json(
        { error: 'No tenant_id found in user metadata' },
        { status: 400 }
      )
    }

    const { data: tenant, error: tenantError } = await supabase
      .from('tenants')
      .select('settings, name, slug')
      .eq('id', tenant_id)
      .single()

    if (tenantError) {
      console.error('Tenant fetch error:', tenantError)
      return NextResponse.json(
        { error: 'Failed to fetch tenant settings' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      settings: tenant.settings,
      tenant: {
        name: tenant.name,
        slug: tenant.slug
      }
    })
  } catch (error) {
    console.error('Get settings error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
