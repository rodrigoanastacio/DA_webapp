import { createClient } from '@/lib/supabase/server'
import { authHandler } from '@/shared/api-handlers/auth/auth.handler'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { access_token, refresh_token } = await request.json()

    if (!access_token || !refresh_token) {
      return NextResponse.json({ error: 'Missing tokens' }, { status: 400 })
    }

    const supabase = await createClient()

    const data = await authHandler.setSessionFromTokens(
      supabase,
      access_token,
      refresh_token
    )

    return NextResponse.json({ success: true, user: data.user })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
