-- ============================================
-- Multi-Tenant Testing Setup: Tenant Rodrigo
-- ============================================
-- Purpose: Create second tenant for RLS validation
-- Execute in: Supabase SQL Editor  
-- Date: 2026-02-04
-- FIXED v2: Corrected column names based on actual schema

-- ============================================
-- PHASE 1: CREATE TENANT
-- ============================================

INSERT INTO tenants (id, slug, name, status, settings, created_at)
VALUES (
  '00000000-0000-0000-0000-000000000002',
  'rodrigo-dev',
  'Rodrigo Anastácio - Desenvolvimento de Software',
  'active',
  '{
    "branding": {
      "primaryColor": "#1e40af",
      "secondaryColor": "#0369a1"
    },
    "niche": "tecnologia"
  }'::jsonb,
  NOW()
)
ON CONFLICT (id) DO NOTHING;

-- Verify tenant creation
SELECT id, slug, name, status FROM tenants WHERE slug = 'rodrigo-dev';

-- ============================================
-- PHASE 2: CREATE MOCK LEADS FOR RODRIGO
-- ============================================
-- Schema: diagnosticos table columns
-- nome_completo, email, whatsapp, cidade_estado, tempo, atuacao,
-- estrutura_equipe, nivel_gestao, dificuldades, faturamento,
-- expectativas, investimento, status, tenant_id

INSERT INTO diagnosticos (
  tenant_id,
  nome_completo,
  email,
  whatsapp,
  cidade_estado,
  tempo,
  atuacao,
  estrutura_equipe,
  nivel_gestao,
  dificuldades,
  faturamento,
  expectativas,
  investimento,
  status,
  created_at
)
VALUES
  -- Lead 1: Tech Startup (novo)
  (
    '00000000-0000-0000-0000-000000000002',
    'Tech Startup Alpha',
    'contato@alpha.com',
    '11987654321',
    'São Paulo - SP',
    'menos_de_1_ano',
    'tecnologia',
    '1_a_5',
    'precario',
    ARRAY['captacao', 'processos']::text[],
    'mais_de_500k',
    'Escalar operações',
    'ate_5k',
    'novo_lead',
    NOW() - INTERVAL '2 days'
  ),
  
  -- Lead 2: Agência Digital (qualificado)
  (
    '00000000-0000-0000-0000-000000000002',
    'Agência Beta Digital',
    'beta@digital.com',
    '11987654322',
    'Rio de Janeiro - RJ',
    '1_a_3_anos',
    'consultoria',
    '6_a_10',
    'basico',
    ARRAY['gestao_equipe', 'financeiro']::text[],
    '100k_a_500k',
    'Melhorar gestão financeira',
    '5k_a_15k',
    'qualificado',
    NOW() - INTERVAL '5 days'
  ),
  
  -- Lead 3: Consultoria (em contato)
  (
    '00000000-0000-0000-0000-000000000002',
    'Consultoria Gamma',
    'gamma@consulting.com',
    '11987654323',
    'Curitiba - PR',
    '3_a_5_anos',
    'advocacia',
    '11_a_20',
    'intermediario',
    ARRAY['marketing', 'vendas']::text[],
    '50k_a_100k',
    'Aumentar conversão',
    '15k_a_30k',
    'em_contato',
    NOW() - INTERVAL '7 days'
  ),
  
  -- Lead 4: Freelancer (agendado)
  (
    '00000000-0000-0000-0000-000000000002',
    'Freelancer Delta',
    'delta@dev.com',
    '11987654324',
    'Belo Horizonte - MG',
    'mais_de_5_anos',
    'saude',
    'so_eu',
    'avancado',
    ARRAY['escalabilidade']::text[],
    '20k_a_50k',
    'Sistematizar processos',
    'acima_de_30k',
    'agendado',
    NOW() - INTERVAL '10 days'
  ),
  
  -- Lead 5: E-commerce (proposta)
  (
    '00000000-0000-0000-0000-000000000002',
    'E-commerce Epsilon',
    'epsilon@ecommerce.com',
    '11987654325',
    'Porto Alegre - RS',
    '1_a_3_anos',
    'tecnologia',
    '6_a_10',
    'intermediario',
    ARRAY['processos', 'financeiro']::text[],
    '100k_a_500k',
    'Otimizar margem',
    '15k_a_30k',
    'proposta',
    NOW() - INTERVAL '15 days'
  );

-- Verify leads creation
SELECT COUNT(*) AS rodrigo_leads FROM diagnosticos 
WHERE tenant_id = '00000000-0000-0000-0000-000000000002';

-- Expected: 5

-- ============================================
-- PHASE 3: VERIFY TENANT ISOLATION
-- ============================================

SELECT 
  t.name AS tenant_name,
  COUNT(d.id) AS lead_count
FROM tenants t
LEFT JOIN diagnosticos d ON t.id = d.tenant_id
GROUP BY t.id, t.name
ORDER BY t.created_at;

-- ============================================
-- PHASE 4: CREATE AUTH USER & UPDATE METADATA
-- ============================================

/*
MANUAL STEPS:

1. CREATE AUTH USER:
   Supabase → Authentication → Users → Add User
   - Email: rodrigo@dayaneanastacio.com
   - Password: TestPass123!
   - Auto-confirm: YES

2. Then execute this SQL:
*/

UPDATE auth.users
SET raw_user_meta_data = jsonb_set(
  COALESCE(raw_user_meta_data, '{}'::jsonb),
  '{tenant_id}',
  '"00000000-0000-0000-0000-000000000002"'::jsonb
)
WHERE email = 'rodrigo@dayaneanastacio.com';

-- Verify
SELECT email, raw_user_meta_data->>'tenant_id' AS tenant_id
FROM auth.users
WHERE email = 'rodrigo@dayaneanastacio.com';

-- ============================================
-- CLEANUP (if needed)
-- ============================================

/*
DELETE FROM diagnosticos WHERE tenant_id = '00000000-0000-0000-0000-000000000002';
DELETE FROM tenants WHERE id = '00000000-0000-0000-0000-000000000002';
*/
