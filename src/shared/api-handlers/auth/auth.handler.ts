import { SupabaseClient } from '@supabase/supabase-js'

export const authHandler = {
  exchangeCodeForSession: async (supabase: SupabaseClient, code: string) => {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      throw new Error(`Failed to exchange code: ${error.message}`)
    }

    return data
  },

  setSessionFromTokens: async (
    supabase: SupabaseClient,
    accessToken: string,
    refreshToken: string
  ) => {
    const { data, error } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken
    })

    if (error) {
      throw new Error(`Failed to set session: ${error.message}`)
    }

    return data
  },

  updatePassword: async (supabase: SupabaseClient, password: string) => {
    const { data, error } = await supabase.auth.updateUser({
      password
    })

    if (error) {
      throw new Error(`Failed to update password: ${error.message}`)
    }

    return data
  },

  getSession: async (supabase: SupabaseClient) => {
    const { data, error } = await supabase.auth.getSession()

    if (error) {
      throw new Error(`Failed to get session: ${error.message}`)
    }

    return data.session
  },

  getUser: async (supabase: SupabaseClient) => {
    const { data, error } = await supabase.auth.getUser()

    if (error) {
      throw new Error(`Failed to get user: ${error.message}`)
    }

    return data.user
  },

  signOut: async (supabase: SupabaseClient) => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    return { success: true }
  }
}
