import { createClient } from '@/lib/supabase/server'

export async function getTenantIdFromJWT(): Promise<string | null> {
  const supabase = await createClient()

  const {
    data: { session }
  } = await supabase.auth.getSession()

  if (!session?.access_token) {
    return null
  }

  try {
    const payload = JSON.parse(atob(session.access_token.split('.')[1]))
    return payload.tenant_id || null
  } catch (error) {
    console.error('Failed to decode JWT:', error)
    return null
  }
}

export async function getUserTenantInfo() {
  const supabase = await createClient()

  const {
    data: { session }
  } = await supabase.auth.getSession()

  if (!session?.access_token) {
    throw new Error('No active session')
  }

  const payload = JSON.parse(atob(session.access_token.split('.')[1]))

  return {
    userId: payload.sub,
    email: payload.email,
    tenantId: payload.tenant_id,
    role: payload.role,
    fullPayload: payload
  }
}
