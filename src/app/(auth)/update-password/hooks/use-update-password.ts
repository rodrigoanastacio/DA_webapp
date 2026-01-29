import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { toast } from 'sonner'

const MIN_PASSWORD_LENGTH = 6

export function useUpdatePassword() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (password.length < MIN_PASSWORD_LENGTH) {
      toast.error('A senha deve ter pelo menos 6 caracteres')
      return
    }

    if (password !== confirmPassword) {
      toast.error('As senhas não coincidem')
      return
    }

    setIsLoading(true)

    try {
      const { error } = await supabase.auth.updateUser({
        password
      })

      if (error) throw error

      toast.success('Senha atualizada com sucesso!')
      router.push('/login')
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Erro ao atualizar senha'
      toast.error('Erro ao atualizar senha', {
        description: message
      })
    } finally {
      setIsLoading(false)
    }
  }

  return {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    isLoading,
    handleSubmit
  }
}
