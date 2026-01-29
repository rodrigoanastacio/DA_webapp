import { createClient } from '@supabase/supabase-js'

/**
 * Creates a Supabase Admin client with Service Role privileges.
 * WARNING: This client bypasses Row Level Security (RLS).
 * Use only in secure server-side contexts.
 */
export const createAdminClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()

  if (!supabaseUrl || !serviceKey) {
    throw new Error('Missing Supabase URL or Service Role Key')
  }

  return createClient(supabaseUrl, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}
