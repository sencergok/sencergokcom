-- Table: public.seco_clicks

create table if not exists public.seco_clicks (
  id uuid primary key default gen_random_uuid(),
  clicked_at timestamptz not null default now(),
  note text null,
  ip_address inet null,
  user_agent text null
);

-- Enable Row Level Security if desired
alter table public.seco_clicks enable row level security;

-- Anyone can insert
do $$ begin
  if not exists (
    select 1 from pg_policies where tablename = 'seco_clicks' and policyname = 'Anyone can insert'
  ) then
    create policy "Anyone can insert" on public.seco_clicks for insert with check (true);
  end if;
end $$;


