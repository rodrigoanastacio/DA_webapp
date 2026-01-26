# SMO (Social Media Optimization) - Página de Diagnóstico

## Implementação Completa

### O que foi feito?

Implementamos otimização completa para compartilhamento em redes sociais da página de diagnóstico inicial.

### Componentes da Implementação

#### 1. Metadados Open Graph (Facebook, LinkedIn, WhatsApp)

```typescript
openGraph: {
  title: 'Formulário de Diagnóstico Inicial',
  description: 'Conte-me sobre seu escritório em 5 minutos...',
  type: 'website',
  locale: 'pt_BR',
  images: [{
    url: '/og-diagnostico.png',
    width: 1200,
    height: 630
  }]
}
```

#### 2. Twitter Cards

```typescript
twitter: {
  card: 'summary_large_image',
  title: 'Formulário de Diagnóstico Inicial',
  images: ['/og-diagnostico.png']
}
```

#### 3. Imagem OG Personalizada

- **Localização**: `/public/og-diagnostico.png`
- **Dimensões**: 1200x630px (padrão Open Graph)
- **Design**: Gradiente azul profissional com título e subtítulo
- **Ícone**: Clipboard com checkmarks

### Como Testar

1. **Facebook Debugger**: https://developers.facebook.com/tools/debug/
2. **Twitter Card Validator**: https://cards-dev.twitter.com/validator
3. **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/

Cole a URL: `https://dayaneanastacio.com.br/diagnostico-de-gestao`

### Resultado Esperado

Quando alguém compartilhar o link nas redes sociais, verá:

- ✅ Imagem atrativa com título "Formulário de Diagnóstico Inicial"
- ✅ Descrição: "Conte-me sobre seu escritório em 5 minutos"
- ✅ Preview profissional e convidativo

### Boas Práticas Aplicadas

1. **Título Direto**: "Formulário de Diagnóstico Inicial" é mais claro que "Diagnóstico de Gestão Jurídica"
2. **Call-to-Action Pessoal**: "Conte-me" cria conexão direta
3. **Tempo Específico**: "5 minutos" reduz fricção
4. **Imagem Consistente**: Mesma identidade visual do site
