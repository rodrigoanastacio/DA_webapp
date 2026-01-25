# Documentação Técnica - Projeto Dayane Anastácio

Bem-vindo à documentação técnica do projeto. Esta estrutura segue os princípios de **Camadas e Separação de Preocupações**.

## 🎯 Guia Rápido de Navegação

1. **[01. Visão Geral](./01-overview.md)**: Entenda a arquitetura global e as tecnologias utilizadas.
2. **[02. Apresentação](./02-presentation-layer.md)**: Como criamos componentes e páginas.
3. **[03. Lógica de Negócio](./03-business-logic-layer.md)**: Onde vivem as regras, schemas Zod e hooks.
4. **[04. Serviços](./04-service-layer.md)**: Comunicação HTTP com a API.
5. **[05. API REST](./05-api-layer.md)**: Route Handlers e segurança (Proxy).
6. **[06. API Handlers](./06-api-handlers-layer.md)**: Integração com o banco de dados (Supabase).
7. **[07. Autenticação & RBAC](./07-auth-rbac.md)**: Como funciona a segurança e níveis de acesso.
8. **[🗺️ Roadmap de Evolução](./ROADMAP.md)**: Planejamento de funcionalidades futuras.

---

## 🚀 Como Iniciar

Se você é novo no projeto, recomendamos começar pela **[Visão Geral](./01-overview.md)** para entender como os dados fluem desde o clique do usuário até o banco de dados.

## Padrões de Código

- **Linguagem**: TypeScript
- **Estilo**: Prettier + ESLint
- **Nomenclatura**: Camel Case no código, Snake Case no banco de dados.
- **Idioma**: Documentação e nomes de banco em **Português (PT-BR)**.
