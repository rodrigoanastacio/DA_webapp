# PRD: MVP Dashboard CRM (Método GERAR)

## 🎯 Objetivo

Transformar os leads qualificados vindos do "Diagnóstico de Gestão" em um pipeline de vendas organizado, permitindo à Dayane (e futura equipe) gerenciar oportunidades com a eficiência que a persona "Advogado CEO" espera.

## 👤 Público-Alvo

- **Primário**: Dayane Anastácio (Administradora do CRM).
- **Secundário**: Futurios assistentes jurídicos/administrativos.

## 🚀 Problema a ser Resolvido

- Leads do formulário de diagnóstico ficam "presos" no banco de dados.
- Dificuldade em priorizar leads de "Alto Potencial" (Faturamento > 50k ou Investimento > 2k).
- Falta de controle de status (Novo, Em Contato, Diagnóstico Enviado, Fechado).

---

## 📋 User Stories (P0 - MVP)

1. **Visualização de Leads**: Como administradora, quero ver uma lista de todos os diagnósticos realizados, para não perder nenhuma oportunidade.
2. **Priorização Inteligente**: Como administradora, quero identificar visualmente leads de "Alto Potencial", para focar meu tempo nas melhores oportunidades.
3. **Gestão de Status**: Como administradora, quero alterar o progresso de cada lead, para saber em que fase da venda cada um se encontra.
4. **Dashboard Resumo**: Como administradora, quero ver métricas básicas (Total de leads, Faturamento Potencial), para ter uma visão clara da saúde do negócio.

---

## ✅ Critérios de Aceitação (MVP)

### 1. Lista de Diagnósticos

- [ ] Exibir nome, e-mail, WhatsApp (com link direto), faturamento e nível de gestão.
- [ ] Ordenar por mais recentes primeiro.

### 2. Filtros e Tags

- [ ] Tag visual destacada para leads com `isHighPotential === true`.
- [ ] Filtro por status (ex: Pendente, Em Análise, Finalizado).

### 3. Detalhes do Lead

- [ ] Abrir uma visão detalhada com todas as respostas do Diagnostico (Dificuldades, Expectativas).
- [ ] Campo de notas/observações internas.

### 4. Segurança

- [ ] Apenas usuários autorizados (Login Dayane) podem acessar o `/dashboard`.

---

## 🛠️ Tech Stack Sugerida

- **Frontend**: Next.js (App Router) + Tailwind + Shadcn/UI (para componentes de Dashboard profissionais).
- **Backend/Auth**: Supabase Auth + Database.
- **Realtime**: Suporte a atualizações em tempo real quando novos leads chegarem.

---

## 🗺️ Roadmap Pós-MVP (Out of Scope)

- Automação de e-mails de follow-up.
- Geração automática de PDF de Diagnóstico baseado nas respostas.
- Kanban View das oportunidades.
- Integração com Agenda para agendamento de reuniões.
