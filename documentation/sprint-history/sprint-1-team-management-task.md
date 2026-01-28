# Task: Sales CRM Implementation

## Planejamento

- [x] Definir Requisitos (PRD)
- [x] Criar Plano de Implementação
- [/] Aprovação do Usuário

## Implementação

### Fase 1: Database & Backend

- [x] Criar migração SQL `002_create_entrevistas_table.sql`
- [x] Aplicar migração no Supabase
- [x] Atualizar tipos TypeScript (Database Definitions)
- [x] Criar `entrevistas.handler.ts`

### Fase 2: Gestão de Leads (Agendamento)

- [x] Implementar Modal de Agendamento
- [x] Criar lógica de Smart Link (Google Calendar)
- [x] Integrar botão "Agendar Reunião" no Drawer

### Fase 3: Meeting Runner (G.E.R.A.R.)

- [x] Criar página `/dashboard/meeting/[leadId]`
- [x] Implementar formulário do Roteiro G.E.R.A.R.
- [x] Implementar salvamento de anotações
- [x] Conectar com status do Lead ("Em Negociação")

### Fase 4: Integração

- [x] Botão "Iniciar Reunião" no Drawer
- [x] Server Actions para salvar entrevista

### Fase 5: Gestão de Equipe (Team Management)

- [x] Implementar edição de colaboradores (PUT /api/team/[id])
- [x] Ajustar tabela para ser interativa (clique na linha)
- [x] Reutilizar Drawer para Edição/Criação
- [x] Refatorar exibição de usuário no Sidebar (userHandler)

## Verificação

- [/] Testar fluxo de agendamento (Link correto)
- [/] Testar salvamento de entrevista
- [/] Verificar atualização de status automática
