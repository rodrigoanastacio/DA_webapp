import { SupabaseClient } from '@supabase/supabase-js'

export const authHandler = {
  /**
   * Encerra a sessão do usuário no Supabase.
   */
  signOut: async (supabase: SupabaseClient) => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    return { success: true }
  }
}
