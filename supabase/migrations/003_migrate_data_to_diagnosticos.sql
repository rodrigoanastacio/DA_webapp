-- Migration: 003_migrate_data_to_diagnosticos.sql
-- Description: Migrate existing leads data to diagnosticos table

INSERT INTO diagnosticos (
  id, tenant_id, nome_completo, email, whatsapp, cidade_estado,
  tempo, atuacao, estrutura_equipe, nivel_gestao, dificuldades,
  faturamento, expectativas, investimento, status, ip_cliente,
  agente_usuario, utm_source, utm_medium, utm_campaign, utm_content,
  utm_term, referrer, created_at, updated_at
)
SELECT 
  id, tenant_id, nome_completo, email, whatsapp, cidade_estado,
  tempo, atuacao, estrutura_equipe, nivel_gestao, dificuldades,
  faturamento, expectativas, investimento, status, ip_cliente,
  agente_usuario, utm_source, utm_medium, utm_campaign, utm_content,
  utm_term, referrer, created_at, 
  COALESCE(updated_at, created_at) as updated_at
FROM leads_backup;
