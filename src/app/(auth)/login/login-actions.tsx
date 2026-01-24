'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

/**
 * Server action to handle login logic with Supabase Auth.
 */
export async function loginAction(formData: FormData) {
  const supabase = await createClient()

  const { email, password } = Object.fromEntries(formData)

  const { error } = await supabase.auth.signInWithPassword({
    email: email as string,
    password: password as string
  })

  if (error) {
    return { error: error.message }
  }

  redirect('/dashboard')
}
