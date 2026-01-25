import { api } from '@/lib/api/fetcher'

export const authService = {
  /**
   * Solicita o encerramento da sessão via API interna
   */
  signOut: async () => {
    return api.post<{ success: boolean }>('/api/auth/signout', {})
  }
}
