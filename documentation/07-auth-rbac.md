# 07. Autenticação & RBAC (Role-Based Access Control)

## Introdução

O sistema de segurança do projeto Dayane Anastácio utiliza o **Supabase Auth** para autenticação e uma estrutura customizada de **RBAC** para controle de permissões.

---

## 🔒 Mecanismo de Autenticação

Utilizamos o pacote `@supabase/ssr` para gerenciar a autenticação inteiramente no lado do servidor (SSR), o que previne vulnerabilidades comuns de segurança.

- **Middleware Proxy**: Localizado em `src/proxy.ts`, ele protege as rotas do dashboard. Se um usuário não estiver autenticado, ele é redirecionado para `/login`.
- **Cookies HttpOnly**: Os tokens de sessão são armazenados em cookies protegidos, invisíveis ao JavaScript do navegador.

---

## 👑 Níveis de Acesso (Roles)

O controle de acesso é baseado na tabela `public.profiles`, que armazena informações extras para cada usuário cadastrado no Supabase Auth.

| Role       | Descrição     | Permissões                                          |
| ---------- | ------------- | --------------------------------------------------- |
| **Admin**  | Administrador | Acesso total, incluindo gestão de equipe.           |
| **Editor** | Editor        | Gerencia leads e agenda, mas não vê a aba "Equipe". |
| **Viewer** | Visualizador  | Acesso apenas para leitura de dados e relatórios.   |

### 🛠️ Sincronização Automática

Sempre que um novo usuário é criado no Supabase Auth, um **Trigger de Banco de Dados** (`on_auth_user_created`) é disparado para criar automaticamente um registro na tabela de perfis.

### 🛡️ Segurança no Banco (RLS)

Implementamos **Row Level Security (RLS)** para garantir que:

- Usuários autenticados possam ver os perfis do time.
- Apenas administradores possam realizar convites e cadastros de novos membros via API.

---

## 🏗️ Como Criar Novos Membros

A criação de membros segue a arquitetura hexagonal:

1. **UI**: O Admin preenche o `MemberDetailsDrawer`.
2. **Service**: Chama `teamService.invite(data)`.
3. **API Proxy**: Valida os dados com Zod no endpoint `/api/team`.
4. **API Handler**: Utiliza o `teamHandler` para processar o convite no banco de dados.

---

> [!IMPORTANT]
> Nunca realize chamadas de autenticação ou leitura de perfis diretamente nos componentes sem passar pela Camada de Serviços para manter a consistência arquitetural.
