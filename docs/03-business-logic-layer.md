# 03. Camada de Lógica de Negócio

## Princípio Crítico: Separação de Preocupações

Nesta camada, separamos o **O QUE** deve ser feito (regras e cálculos) do **COMO** a UI deve se comportar.

### 📁 Entidades (`src/shared/entities/`)

As entidades contêm o "coração" da aplicação. Aqui definimos os contratos de dados através de schemas **Zod**.

```typescript
// Exemplo: src/shared/entities/diagnostico/diagnostico.schema.ts
export const diagnosticoSchema = z.object({
  nome: z.string().min(2),
  email: z.string().email()
  // ...
})
```

### 📁 Hooks Customizados (`src/app/**/hooks/`)

Os hooks orquestram o estado da UI e chamam os serviços. Eles facilitam a reutilização e diminuem a complexidade dos componentes.

**Responsabilidades:**

- Gerenciar estados de formulário (`useForm`).
- Controlar estados de loading e erro.
- Chamar métodos da Camada de Serviços.

---

## Guia de Padronização

### Nomenclatura no Código (Camel Case)

- Variáveis: `nomeCompleto`
- Funções: `handleSubmit`
- Hooks: `useDiagnosticoForm`

### Nomenclatura no Banco (Snake Case - PT-BR)

- Colunas: `nome_completo`
- Tabelas: `diagnosticos`

> [!NOTE]
> Ao mover dados da UI para o banco, usamos a Camada de Handlers para fazer esse mapeamento de `Camel Case` para `Snake Case`.
