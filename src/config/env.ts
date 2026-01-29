// Helper function to validate variables
function validate(
  key: string,
  value: string | undefined,
  required: boolean = true
): string {
  const trimmed = value?.trim()

  if (!trimmed && required) {
    throw new Error(
      `Missing required environment variable: ${key}\n\n` +
        `This variable is required for the application to work correctly.\n` +
        `Please set it in your environment (.env.local for development).\n\n` +
        `See .env.example for reference.`
    )
  }

  return trimmed || ''
}

function detectEnvironment(): 'development' | 'production' | 'test' {
  if (process.env.NODE_ENV === 'test') return 'test'
  if (process.env.NODE_ENV === 'production') return 'production'
  return 'development'
}

const environment = detectEnvironment()

export const env = {
  supabase: {
    // Explicit access is required for Next.js to inline variables at build time
    url: validate(
      'NEXT_PUBLIC_SUPABASE_URL',
      process.env.NEXT_PUBLIC_SUPABASE_URL
    ),
    anonKey: validate(
      'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ),
    serviceRoleKey: validate(
      'SUPABASE_SERVICE_ROLE_KEY',
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      false
    ) // Optional on client, required on server (checked where used)
  },

  app: {
    url: validate('NEXT_PUBLIC_SITE_URL', process.env.NEXT_PUBLIC_SITE_URL),
    environment,
    isDevelopment: environment === 'development',
    isProduction: environment === 'production',
    isTest: environment === 'test'
  }
} as const

export type Environment = typeof env
