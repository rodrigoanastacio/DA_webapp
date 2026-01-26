# Guia: Entendendo Server Actions

> "Por que criamos pasta `/actions` se já temos API handlers?"

Este documento explica o papel das **Server Actions** na nossa arquitetura moderna com Next.js App Router.

## O Conceito

Imagine que você quer apertar um botão no frontend (Client) e fazer algo secreto no backend (Server), como salvar no banco de dados.

### Antigamente (Pages Router / React SPA)

Você precisava de **3 peças**:

1. O **Front** (`useEffect` + `fetch`)
2. A **API Pública** (`/api/update-status`)
3. A **Lógica Backend** (Controller/Service)

### Agora (Server Actions)

Você precisa de **2 peças**:

1. O **Front** (chama a função como se fosse local)
2. A **Action** (função assíncrona que roda no servidor)

O Next.js faz a mágica de criar a API temporária por baixo dos panos.

---

## Por que usamos `/actions` na nossa arquitetura?

Não é apenas "açúcar sintático". Existem 3 motivos arquiteturais fortes:

### 1. Injeção de Segurança (Gateway)

A Server Action é o porteiro. Ela roda em um ambiente seguro (Node.js/Edge).

- O código da action **nunca** vai para o browser.
- É o lugar perfeito para validar sessão, permissões e inputs antes de chamar a lógica real.

### 2. Mutação e Revalidação (O "Pulo do Gato")

A maior vantagem é a integração com o cache do Next.js.

```typescript
import { revalidatePath } from 'next/cache'

export async function updateLeadAction(...) {
  // 1. Atualiza no banco
  await db.update(...)

  // 2. Mágica do Next.js
  revalidatePath('/dashboard/leads')
}
```

Ao chamar `revalidatePath`, o Next.js sabe que os dados daquela rota ficaram "velhos" e:

1. Limpa o cache de HTML dessa página.
2. Faz o frontend buscar os dados novos automaticamente na próxima navegação.
3. Tudo isso sem você escrever uma linha de `useEffect` ou `SWR/ReactQuery`.

### 3. Separação de Responsabilidades (Clean Architecture)

- **Handlers (`shared/api-handlers`)**: Lógica Pura. "Como atualizar um lead no banco". Não sabe o que é Next.js, Cache ou Redirecionamento.
- **Actions (`app/.../actions`)**: Orquestração Web. "Valide o usuário, chame o Handler, e depois atualize a tela X".

## Estudo de Caso: Dropdown de Status

### O Código da Action (`updateLeadStatus.ts`)

```typescript
'use server' // 👈 Indica que isso é backend

// Importa apenas o que precisa
import { diagnosticoHandler } from '@/shared/api-handlers/...'
import { revalidatePath } from 'next/cache'

export async function updateLeadStatus(id: string, status: string) {
  try {
    // 1. Prepara o Cliente Supabase
    const supabase = await createClient()

    // 2. Chama a Lógica Pura (Shared)
    await diagnosticoHandler.updateStatus(supabase, id, status)

    // 3. Avisa o Front para atualizar
    revalidatePath('/dashboard/leads')

    return { success: true }
  } catch (error) {
    return { success: false, error: '...' }
  }
}
```

### O Consumo no Componente (`useLeads.ts`)

```typescript
// Não tem fetch('/api/...')!
import { updateLeadStatus } from '../actions/updateLeadStatus'

const handleUpdate = async (status) => {
  // Chamada direta, tipo função normal
  await updateLeadStatus(id, status)
}
```

## Resumo

Usamos Server Actions para ter:

1. **Menos Código**: Adeus `fetch` e endpoints REST manuais.
2. **UI Reativa**: Integração nativa com cache e revalidação.
3. **Segurança**: Lógica de banco escondida do cliente.
