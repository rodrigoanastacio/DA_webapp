function getEnvVar(key: string, required: boolean = true): string {
  const value = process.env[key]?.trim()

  if (!value && required) {
    throw new Error(
      `Missing required environment variable: ${key}\n\n` +
        `This variable is required for the application to work correctly.\n` +
        `Please set it in your environment (.env.local for development).\n\n` +
        `See .env.example for reference.`
    )
  }

  return value || ''
}

function detectEnvironment(): 'development' | 'production' | 'test' {
  if (process.env.NODE_ENV === 'test') return 'test'
  if (process.env.NODE_ENV === 'production') return 'production'
  return 'development'
}

const environment = detectEnvironment()

export const env = {
  supabase: {
    url: getEnvVar('NEXT_PUBLIC_SUPABASE_URL'),
    anonKey: getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
    serviceRoleKey: getEnvVar('SUPABASE_SERVICE_ROLE_KEY')
  },

  app: {
    url: getEnvVar('NEXT_PUBLIC_SITE_URL'),
    environment,
    isDevelopment: environment === 'development',
    isProduction: environment === 'production',
    isTest: environment === 'test'
  }
} as const

export type Environment = typeof env
