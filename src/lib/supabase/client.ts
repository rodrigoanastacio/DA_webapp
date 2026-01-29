import { env } from '@/config/env'
import { createBrowserClient } from '@supabase/ssr'

export const createClient = () =>
  createBrowserClient(env.supabase.url, env.supabase.anonKey, {
    cookies: {
      get(name: string) {
        const cookies = document.cookie.split(';')
        for (const cookie of cookies) {
          const [key, value] = cookie.trim().split('=')
          if (key === name) {
            return decodeURIComponent(value)
          }
        }
        return null
      },
      set(name: string, value: string, options: any) {
        let cookie = `${name}=${encodeURIComponent(value)}`

        if (options?.maxAge) {
          cookie += `; max-age=${options.maxAge}`
        }
        if (options?.path) {
          cookie += `; path=${options.path}`
        }
        if (options?.domain) {
          cookie += `; domain=${options.domain}`
        }
        if (options?.sameSite) {
          cookie += `; samesite=${options.sameSite}`
        }
        if (options?.secure) {
          cookie += '; secure'
        }

        document.cookie = cookie
      },
      remove(name: string, options: any) {
        this.set(name, '', { ...options, maxAge: 0 })
      }
    }
  })

export const supabase = createClient()
