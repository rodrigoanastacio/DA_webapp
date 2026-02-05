# 🔒 Realtime Security & Best Practices

> **Context:** This project is a **Multi-Tenant** SaaS. Data isolation determines the security of our customers.
> **Critical Rule:** never blindly listen to `*` changes on a table without a filter.

---

## 🛑 The Risk: Data Leaks in Realtime

Supabase Realtime (WebSockets) broadcasts database changes to connected clients.
If a client subscribes to:

```typescript
// ❌ VULNERABLE CODE
channel.on('postgres_changes', { event: '*', table: 'profiles' }, callback)
```

**Consequence:** A user in Tenant A will receive an event when a user in Tenant B updates their profile. This leaks sensitive data (emails, names, stats) across tenant boundaries.

---

## ✅ The Solution: Strict Tenant Filtering

We must enforce **Server-Side Injection** of the Tenant ID into our subscriptions.

### Pattern: Server Component → Client Hook → Realtime Filter

#### 1. Server Component (Source of Truth)

The Server Component validates the session and extracts the `tenant_id`. It passes this ID as a prop to the Client Component (or Manager).

```tsx
// page.tsx (Server Component)
export default async function TeamPage() {
  const supabase = createClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()

  // 🔒 Securely Retrieve Tenant ID from DB or validated Metadata
  const tenantId = user?.user_metadata?.tenant_id

  return <TeamManager tenantId={tenantId} />
}
```

#### 2. Client Hook (The Consumer)

The hook accepts the `tenantId` and uses it to establish a **Filtered Subscription**.

```typescript
// useTeamManager.ts
export function useTeamManager(initialRows, tenantId: string) {
  useEffect(() => {
    if (!tenantId) return // Fallback safety

    const channel = supabase
      .channel(`team-list-${tenantId}`) // 1. Unique Channel Name
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles',
          filter: `tenant_id=eq.${tenantId}` // 2. 🔒 SECURITY FILTER
        },
        async (payload) => {
          // Handle update
        }
      )
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [supabase, tenantId])
}
```

---

## 📋 Checklist for New Realtime Features

- [ ] **Dependency Injection**: Does the hook receive a mandatory `tenantId`?
- [ ] **Channel Uniqueness**: Is the channel name unique to the tenant/context? (e.g., `chat-room-{id}`)
- [ ] **Row Filter**: Is `filter: 'column=eq.value'` applied?
- [ ] **RLS Fallback**: Do RLS policies on the database **also** prevent reading? (Realtime respects RLS, but explicit filters save bandwidth and prevent accidental leaks).
