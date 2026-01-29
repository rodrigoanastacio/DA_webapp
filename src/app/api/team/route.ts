import { teamHandler } from '@/shared/api-handlers/team/team.handler'
import { NextResponse } from 'next/server'

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

    // Create auth user
    const { data: authData, error: authError } =
      await supabase.auth.admin.createUser({
        email: body.email,
        password: body.password || 'Mudar123!',
        email_confirm: true,
        user_metadata: {
          full_name: body.full_name
        }
      })

    if (authError) throw authError

    if (!authData.user) throw new Error('Failed to create user')

    // Create profile
    const { error: profileError } = await supabase.from('profiles').insert({
      id: authData.user.id,
      full_name: body.full_name,
      email: body.email,
      role: body.role || 'editor'
    })

    if (profileError) {
      // Cleanup auth user if profile fails
      await supabase.auth.admin.deleteUser(authData.user.id)
      throw profileError
    }

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
