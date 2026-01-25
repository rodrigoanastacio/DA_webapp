# 05. Camada de API REST (Route Handlers)

## Visão Geral

Os **Route Handlers** do Next.js funcionam como uma ponte segura (Proxy) entre o mundo exterior e os nossos sistemas internos.

- **Localização**: `src/app/api/{module}/**/route.ts`

## Por que usar um Proxy?

1. **Segurança**: Não expomos chaves privadas do Supabase no navegador.
2. **Validação**: Validamos os dados no servidor usando Zod antes de qualquer interação com o banco.
3. **Logging & Logs**: Podemos capturar IP, User-Agent e logs de erro detalhados no servidor.

## Padrão de Implementação

Uma rota deve ser "burra". Ela recebe a requisição, valida os dados e delega a execução para um **API Handler**.

```typescript
export async function POST(req: Request) {
  const body = await req.json()

  // 1. Validação com Zod
  const validated = schema.safeParse(body)
  if (!validated.success)
    return Response.json({ error: 'Inválido' }, { status: 400 })

  // 2. Delegação para o Handler
  try {
    const result = await someModuleHandler.create(validated.data)
    return Response.json(result)
  } catch (err) {
    return Response.json({ error: 'Erro Interno' }, { status: 500 })
  }
}
```
