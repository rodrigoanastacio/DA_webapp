# 02. Camada de Apresentação

## Princípio: Componentes são "Burros"

A **Camada de Apresentação** deve focar exclusivamente em _como as coisas parecem_ e _como o usuário interage_.

### 📁 Estrutura de Arquivos

- **Páginas**: `src/app/{module}/{feature}/page.tsx`
- **Componentes**: `src/app/{module}/{feature}/components/`
- **Hooks (UI)**: `src/app/**/hooks/`

### Responsabilidades

- **SIM**: Renderizar componentes UI (buttons, inputs, layouts).
- **SIM**: Capturar eventos (clicks, inputs).
- **SIM**: Exibir estados de carregamento (Skeleton, Spinners).
- **NÃO**: Fazer chamadas diretas ao banco de dados ou APIs.
- **NÃO**: Conter lógica de negócio complexa ou cálculos pesados.

### Exemplo

O componente `DiagnosticWizard.tsx` delega a lógica de submissão e navegação para o hook `useDiagnosticoForm`, ficando responsável apenas pelo layout:

```tsx
function DiagnosticWizard() {
  const { currentStep, isSubmitting, handleSubmit } = useDiagnosticoForm()

  return (
    <div>
      <ProgressBar step={currentStep} />
      <Button onClick={handleSubmit} disabled={isSubmitting}>
        {isSubmitting ? 'Enviando...' : 'Próximo'}
      </Button>
    </div>
  )
}
```

### Componentes Compartilhados

Componentes reutilizáveis devem ser flexíveis e configuráveis via props, evitando lógica de negócio acoplada.

**Exemplo: `InteractiveTable`**
Localizado em `src/components/dashboard/InteractiveTable.tsx`, este componente gerencia a exibição de dados tabulares, suportando:
- Paginação local
- Ordenação
- Seleção múltipla (opcional via `showCheckbox`)
- Coluna de iniciais/avatar (opcional via `showInitials` e `initialsKey`)

```tsx
<InteractiveTable
  columns={columns}
  rows={data}
  showCheckbox
  showInitials
  initialsKey="fullName"
/>
```
