# 03. Camada de Lógica de Negócio

## Princípio Crítico: Separação de Preocupações

Nesta camada, separamos o **O QUE** deve ser feito (regras e cálculos) do **COMO** a UI deve se comportar.

### 📁 Schemas de Validação (`src/lib/zod/`)

Os schemas Zod definem a **forma** dos dados e garantem que a entrada seja válida antes de processarmos qualquer lógica. Eles são usados tanto no Frontend (formulários) quanto na API (validação de request).

```typescript
// Exemplo: src/lib/zod/diagnostico.schema.ts
export const diagnosticoSchema = z.object({ ... })
```

### 📁 Entidades de Domínio (`src/shared/entities/`)

As entidades representam os conceitos de negócio e contêm **comportamento** (lógica que não depende de banco ou UI). Elas são criadas a partir dos dados validados.

**Diferença:**

- **Zod Schema**: "O dado tem o formato correto?" (Validar e-mail, campos obrigatórios).
- **Entidade**: "O que esse dado significa para o negócio?" (Calcular score, verificar potencial, classificar perfil).

```typescript
// Exemplo 1: src/shared/entities/diagnostico/diagnostico.entity.ts
export class Diagnostico {
  constructor(data: DiagnosticoFormData) { ... }

  get isHighPotential() {
      return this.revenue === 'more_100k' || this.investment === 'more_5k';
  }
}

// Exemplo 2: src/shared/entities/team/team-member.entity.ts
export class TeamMember {
  constructor(data: TeamMemberResponse) { ... }

  get initials() {
    return this.fullName.split(' ').map(n => n[0]).join('');
  }
}
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
