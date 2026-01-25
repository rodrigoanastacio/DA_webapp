import { createClient } from '@/lib/supabase/server'
import { authHandler } from '@/shared/api-handlers/auth/auth.handler'
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const supabase = await createClient()
    await authHandler.signOut(supabase)
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Erro ao deslogar', message: err.message },
      { status: 500 }
    )
  }
}
