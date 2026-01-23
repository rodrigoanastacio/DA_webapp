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
