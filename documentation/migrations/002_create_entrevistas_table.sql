create table if not exists public.entrevistas (
  id uuid not null default gen_random_uuid(),
  lead_id uuid not null references public.diagnosticos(id) on delete cascade,
  data_reuniao timestamptz not null default now(),
  respostas_json jsonb not null default '{}'::jsonb,
  observacoes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (id)
);

-- RLS Policies (Assuming same as diagnosticos for now, or open for authed users)
alter table public.entrevistas enable row level security;

create policy "Enable read access for authenticated users" on public.entrevistas
  for select using (auth.role() = 'authenticated');

create policy "Enable insert access for authenticated users" on public.entrevistas
  for insert with check (auth.role() = 'authenticated');

create policy "Enable update access for authenticated users" on public.entrevistas
  for update using (auth.role() = 'authenticated');
