import { createBrowserClient } from '@supabase/ssr'

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          // Browser environment - use document.cookie
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
          // Browser environment - use document.cookie
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
          // Set cookie with past expiration date
          this.set(name, '', { ...options, maxAge: 0 })
        }
      }
    }
  )

export const supabase = createClient()
