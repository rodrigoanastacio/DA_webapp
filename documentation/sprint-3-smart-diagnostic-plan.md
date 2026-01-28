# Plano de Implementação: Diagnóstico Inteligente (Sprint 3)

Transformar o formulário de diagnóstico atual em uma ferramenta de "Bioimpedância Jurídica" que gera nota e feedback automático.

## User Review Required

> [!IMPORTANT]
> A lógica de pontuação (Scoring) será baseada em heurísticas simples neste MVP (ex: Planilha = 5pts, Software = 10pts). O cliente precisará validar se os pesos fazem sentido.

## Proposta de Pontuação (Scoring)

Para gerar o Gráfico Radar, dividiremos a análise em 3 Pilares: **Gestão**, **Maturidade (Equipe)** e **Potencial (Comercial)**.

| Pergunta         | Opção                   | Pontuação Sugerida | Pilar Afetado       |
| :--------------- | :---------------------- | :----------------- | :------------------ |
| **Atuação**      | Autônomo                | 5 pts              | Maturidade          |
|                  | Sócio                   | 10 pts             | Maturidade          |
|                  | Associado               | 3 pts              | Maturidade          |
| **Experiência**  | < 1 ano                 | 2 pts              | Maturidade          |
|                  | 1-3 anos                | 5 pts              | Maturidade          |
|                  | > 5 anos                | 10 pts             | Maturidade          |
| **Estrutura**    | Sozinho (Solo)          | 2 pts              | Maturidade          |
|                  | Estagiários             | 5 pts              | Maturidade          |
|                  | Equipe Fixa (CLT/Assoc) | 10 pts             | Maturidade          |
| **Faturamento**  | Até R$ 20k              | 3 pts              | Potencial           |
|                  | R$ 20k - 40k            | 7 pts              | Potencial           |
|                  | Acima de R$ 40k         | 10 pts             | Potencial           |
| **Nível Gestão** | Precária/Inexistente    | 0 pts              | Gestão              |
|                  | Básica (Só Financeiro)  | 5 pts              | Gestão              |
|                  | Em desenvolvimento      | 7 pts              | Gestão              |
| **Dificuldades** | (Cada item marcado)     | -2 pts             | Gestão (Penalidade) |
| **Investimento** | Tenho urgência ($$$)    | 10 pts             | Potencial           |
|                  | Preciso planejar ($$)   | 5 pts              | Potencial           |
|                  | Apenas avaliando ($)    | 0 pts              | Potencial           |

> **Nota:** A pontuação final de cada pilar será normalizada (0 a 10) para exibição no gráfico.

## Proposed Changes

### Backend (Logic Layer)

#### [MODIFY] [diagnostico.handler.ts](file:///Users/dtidigital/Documents/www/projetos/Dayane/lp-dayaneanastacio/src/shared/api-handlers/diagnostico/diagnostico.handler.ts)

- Adicionar método `calculateScore(data)` que recebe o payload do formulário e retorna um objeto de pontuação (Gestão, Comercial, Equipe).
- Persistir o `score_result` no banco de dados (coluna JSONB na tabela `diagnosticos`).

#### [MODIFY] [route.ts](file:///Users/dtidigital/Documents/www/projetos/Dayane/lp-dayaneanastacio/src/app/api/diagnostico/route.ts)

- Chamar o cálculo de score antes de salvar.
- Retornar o score na resposta da API: `{ success: true, score: { ... } }`.

### Frontend (Presentation Layer)

#### [NEW] [StepResult.tsx](<file:///Users/dtidigital/Documents/www/projetos/Dayane/lp-dayaneanastacio/src/app/(public)/diagnostico-de-gestao/components/steps/StepResult.tsx>)

- Novo componente para substituir o `StepSuccess`.
- **Gráfico Radar**: Usar `recharts` para mostrar os pilares (Gestão, Comercial, Equipe).
- **Feedback Dinâmico**: Exibir texto condicional ("Sua gestão é boa, mas vendas precisa de atenção").
- **CTA**: "Agendar Mentoria Estratégica" (Link para WhatsApp/Calendar já com contexto).

#### [MODIFY] [DiagnosticWizard.tsx](<file:///Users/dtidigital/Documents/www/projetos/Dayane/lp-dayaneanastacio/src/app/(public)/diagnostico-de-gestao/components/DiagnosticWizard.tsx>)

- Atualizar lógica de `onSuccess`: em vez de apenas mostrar mensagem, receber o score da API e renderizar `StepResult`.

## Verification Plan

### Automated Tests

- Testar cálculo de score (Unit Test simples ou validação via console).
- Verificar se o JSON do score está sendo salvo no Supabase.

### Manual Verification

1. Preencher o formulário como "Escritório Iniciante" -> Verificar se nota é baixa.
2. Preencher como "Escritório Avançado" -> Verificar se nota é alta.
3. Validar se o Gráfico Radar renderiza corretamente.
