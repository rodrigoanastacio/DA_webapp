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

## Fluxo de Dados (Exemplo: Atualizar Status)

1. **User Interaction**: Usuário clica no Dropdown (`LeadDetailsDrawer`).
2. **Client Action**: Componente chama `updateLeadStatus(id, status)`.
3. **Server Action**: O Next.js recebe o request, instancia o cliente Supabase server-side.
4. **Business Logic**: Action chama `diagnosticoHandler.updateStatus()`.
5. **Persistence**: Handler executa o UPDATE no banco.
6. **Feedback**: Banco retorna sucesso > Handler retorna > Action revalida cache > UI atualiza.
