import { createClient } from '@/lib/supabase/server'
import { authHandler } from '@/shared/api-handlers/auth/auth.handler'
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const supabase = await createClient()
    await authHandler.signOut(supabase)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
