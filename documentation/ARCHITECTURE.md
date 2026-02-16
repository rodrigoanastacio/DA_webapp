# Arquitetura do Projeto

Este projeto utiliza uma adaptação da **Clean Architecture** otimizada para o **Next.js App Router**. O objetivo é manter a separação de responsabilidades sem adicionar complexidade desnecessária.

## Diagrama Visual

```mermaid
graph TD
    UI[🖥️ Interface (Client Components)] --> Action[⚡ Server Action]
    Action --> Handler[🧠 Business Logic (Shared)]
    Handler --> DB[(🗄️ Supabase / Database)]

    subgraph "Camada de Apresentação (App)"
        UI
        Action
    end

    subgraph "Camada de Domínio (Shared)"
        Handler
        Entities[Entity Definitions]
    end
```

## Camadas da Aplicação

### 1. Presentation Layer (`src/app`)

Responsável apenas por renderizar a interface e capturar interações do usuário.

- **Pages/Layouts**: Estrutura das rotas.
- **Client Components**: Componentes interativos (`useState`, `useEffect`).
- **Server Components**: Componentes que buscam dados iniciais.
- **Actions (`/actions`)**: A "ponte" segura entre o cliente e o servidor.

### 2. Server Actions (`/actions`)

Funções assíncronas que rodam exclusivamente no servidor.

- **Responsabilidade**: Receber input do Client, validar sessão, chamar a camada de negócio e revalidar cache (`revalidatePath`).
- **Não contém**: Regras de negócio complexas ou SQL direto.

### 3. Domain/Business Layer (`src/shared`)

Onde vive a inteligência da aplicação. Independente do framework (poderia ser usada em uma API REST, CLI, etc).

- **Entities**: Tipos TypeScript e Classes de Domínio.
- **Handlers**: Funções puras que executam a lógica de negócio e acessam o banco.
- **Utils (`src/shared/utils/`)**: Funções utilitárias puras e reutilizáveis, sem dependência de framework.
- **Constants (`src/shared/constants/`)**: Constantes, formatadores de domínio e mapas de opções.

#### Utils Disponíveis

| Função           | Arquivo                         | Descrição                                                   |
| :--------------- | :------------------------------ | :---------------------------------------------------------- |
| `formatWhatsApp` | `utils/phone/formatWhatsApp.ts` | Formata números de telefone no padrão BR: `(DD) XXXXX-XXXX` |

> 💡 **Convenção**: Antes de criar um novo utilitário, verifique se já existe em `src/shared/utils/` ou `src/shared/constants/`.

### 4. Estratégia de Data Fetching

**Padrão Adotado**: Server Components First.

| Tipo               | Onde                               | Como                        | Por que?                               |
| :----------------- | :--------------------------------- | :-------------------------- | :------------------------------------- |
| **Initial Data**   | **Server Components** (`page.tsx`) | Chama `Handler` diretamente | SEO, Performance, Sem Loading State    |
| **Interatividade** | **Client Components** (Hooks)      | Chama `Server Action`       | Feedback imediato, Updates sem refresh |
| **Realtime**       | **Client Components**              | `supabase.channel()`        | Atualizações via Socket                |

> 🚫 **Anti-Pattern**: Usar `useEffect` para buscar dados iniciais de uma página. Isso transfere a carga para o cliente e piora o Core Web Vitals.

### 5. Padrões de Código e Boas Práticas

**Serialização de Entidades (Server ➡ Client)**
O Next.js não permite passar instâncias de Classes (Entities) diretamente para Client Components.

- **Problema**: "Warning: Only plain objects can be passed to Client Components..."
- **Solução**: Implementar método `.toPlainObj()` na Entidade.
- **Uso**: `data={member.toPlainObj()}` ao invés de `data={member}`.

**Zero Comments Policy**

O código deve ser **autoexplicativo**. Nomes de funções, variáveis e tipos bem descritivos eliminam a necessidade de comentários.

- ❌ **Proibido**: Comentários explicativos, JSDoc em funções internas, blocos `/** */` descrevendo o que a função faz.
- ❌ **Proibido**: Comentários inline tipo `// formata o telefone` ou `// verifica se é admin`.
- ✅ **Permitido**: Comentários em regex complexas ou workarounds temporários com `// TODO:`.
- ✅ **Regra**: Se o código precisa de comentário para ser entendido, **renomeie** a função/variável.

```typescript
// ❌ Errado
/** Formats phone to BR pattern */
function format(p: string) { ... }

// ✅ Correto
function formatWhatsApp(phone: string | null | undefined): string { ... }
```

## Fluxo de Dados (Exemplo: Atualizar Status)

1. **User Interaction**: Usuário clica no Dropdown (`LeadDetailsDrawer`).
2. **Client Action**: Componente chama `updateLeadStatus(id, status)`.
3. **Server Action**: O Next.js recebe o request, instancia o cliente Supabase server-side.
4. **Business Logic**: Action chama `diagnosticoHandler.updateStatus()`.
5. **Persistence**: Handler executa o UPDATE no banco.
6. **Feedback**: Banco retorna sucesso > Handler retorna > Action revalida cache > UI atualiza.
