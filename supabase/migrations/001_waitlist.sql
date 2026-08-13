-- Wild Nomad website waitlist
-- Run in the Supabase SQL editor (or as a migration).

create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  name text,
  city text,
  source text check (source in ('hero', 'founding')),
  created_at timestamptz not null default now()
);

create index if not exists waitlist_created_at_idx on public.waitlist (created_at desc);

alter table public.waitlist enable row level security;

-- Anonymous insert allowed (browser forms). Service role bypasses RLS for API route.
drop policy if exists "waitlist_anon_insert" on public.waitlist;
create policy "waitlist_anon_insert"
  on public.waitlist
  for insert
  to anon
  with check (true);

-- Explicitly no SELECT for anon / authenticated — emails must not be readable from the browser.
-- (Absence of a SELECT policy denies reads under RLS.)

-- Optional: allow service_role full access is automatic (bypasses RLS).
