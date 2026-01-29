'use client'

import { env } from '@/config/env'
import { createBrowserClient } from '@supabase/ssr'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'
import { toast } from 'sonner'

export interface Notification {
  id: string
  title: string
  message: string
  timestamp: Date
  read: boolean
  type: 'lead' | 'system'
}

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  markAsRead: (id: string) => void
  markAllAsRead: () => void
}

const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  unreadCount: 0,
  markAsRead: () => {},
  markAllAsRead: () => {}
})

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const supabase = createBrowserClient(env.supabase.url, env.supabase.anonKey)

  useEffect(() => {
    const channel = supabase
      .channel('global-notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'leads'
        },
        (payload) => {
          const newLead = payload.new as { name: string; email: string }

          const newNotification: Notification = {
            id: crypto.randomUUID(),
            title: 'Novo Lead Capturado! 🚀',
            message: `${newLead.name} acabou de se cadastrar via formulário.`,
            timestamp: new Date(),
            read: false,
            type: 'lead'
          }

          setNotifications((prev) => [newNotification, ...prev])

          toast.success(newNotification.title, {
            description: newNotification.message,
            duration: 5000
          })

          const audio = new Audio('/assets/notification.mp3')
          audio.play().catch(() => {}) // Ignore autoplay errors
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotifications = () => useContext(NotificationContext)
