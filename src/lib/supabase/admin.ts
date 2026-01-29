import { env } from '@/config/env'
import { createClient } from '@supabase/supabase-js'

export const createAdminClient = () => {
  return createClient(env.supabase.url, env.supabase.serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}
