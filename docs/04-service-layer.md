# 04. Camada de Serviços

## Visão Geral

A **Camada de Serviços** é a única responsável pela comunicação HTTP entre o frontend e a nossa API REST (Next.js Proxy).

- **Localização**: `src/services/{module}/*.service.ts`

## Responsabilidades

1. **Chamadas HTTP**: Executar `GET`, `POST`, `PUT`, `DELETE`.
2. **Standard Response**: Garantir que o retorno seja tipado e padronizado.
3. **Tratamento de Erros HTTP**: Lidar com timeouts, 404, 500 antes de passar para o Hook.

### Cliente API Base

Centralizamos a configuração base em `src/services/api.ts`. Isso permite adicionar interceptors de autenticação ou cabeçalhos globais facilmente no futuro.

```typescript
// src/services/api.ts
export const api = {
  post: async (url: string, body: any) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    return response.json()
  }
}
```

### Exemplo: Diagnóstico Service

```typescript
// src/services/diagnostico/diagnostico.service.ts
export const diagnosticoService = {
  submit: (data: Diagnostico) => api.post('/api/diagnostico', data)
}
```
