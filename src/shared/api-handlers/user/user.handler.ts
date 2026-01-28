import { SupabaseClient } from '@supabase/supabase-js'

export interface UserProfileResponse {
  name: string
  email: string
  avatar_url?: string
  role?: string
}

export const userHandler = {
  getMe: async (
    supabase: SupabaseClient
  ): Promise<UserProfileResponse | null> => {
    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (!user) return null

    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name, role, avatar_url')
      .eq('id', user.id)
      .single()

    return {
      name:
        profile?.full_name ||
        user.user_metadata?.full_name ||
        user.user_metadata?.name,
      email: user.email || '',
      avatar_url: profile?.avatar_url || user.user_metadata?.avatar_url,
      role: profile?.role
    }
  }
}
