import { teamHandler } from '@/shared/api-handlers/team/team.handler'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

import { env } from '@/config/env'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()
    const members = await teamHandler.list(supabase)
    return NextResponse.json(members)
  } catch (error: unknown) {
    console.error('Error fetching team members:', error)
    return NextResponse.json(
      { error: 'Failed to fetch team members' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createAdminClient()
    const body = await request.json()

    // Invite auth user (sends email, no password needed)
    const { data: authData, error: authError } =
      await supabase.auth.admin.inviteUserByEmail(body.email, {
        data: {
          full_name: body.full_name
        },
        redirectTo: `${env.app.url}/auth/callback?next=/update-password`
      })

    if (authError) throw authError

    if (!authData.user) throw new Error('Failed to create user')

    const { error: profileError } = await supabase.from('profiles').upsert({
      id: authData.user.id,
      full_name: body.full_name,
      email: body.email,
      role: body.role || 'editor'
    })

    if (profileError) {
      await supabase.auth.admin.deleteUser(authData.user.id)
      throw profileError
    }

    revalidatePath('/dashboard/team')
    revalidatePath('/dashboard/team/list')
    return NextResponse.json({ success: true, user: authData.user })
  } catch (error: unknown) {
    console.error('Error creating team member:', error)
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Failed to create team member'
      },
      { status: 500 }
    )
  }
}
