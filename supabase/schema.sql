-- Run this in the Supabase SQL Editor (or via the CLI) on a fresh project
-- to reproduce the schema and RLS policies this app depends on.

-- 1. The clients table
create table public.clients (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  status text not null default 'Active',
  phone text,
  company text,
  notes text,
  created_at timestamptz not null default now()
);

-- 2. Row Level Security: off by default until explicitly enabled
alter table public.clients enable row level security;

-- 3. Any authenticated user (demo or admin) can read all clients
create policy "Authenticated users can read clients"
on public.clients
for select
to authenticated
using (true);

-- 4. Only users with role "admin" in their JWT app_metadata can write
create policy "Admins can insert clients"
on public.clients
for insert
to authenticated
with check ( (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin' );

create policy "Admins can update clients"
on public.clients
for update
to authenticated
using ( (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin' )
with check ( (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin' );

create policy "Admins can delete clients"
on public.clients
for delete
to authenticated
using ( (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin' );

-- 5. Manual step, not run as part of this script:
-- After creating your admin user in Authentication > Users, mark it as
-- admin by merging a role into its app_metadata (demo needs no change —
-- absence of this field is what makes it fail the admin-only policies above):
--
-- update auth.users
-- set raw_app_meta_data = raw_app_meta_data || '{"role": "admin"}'::jsonb
-- where email = 'your-admin-email@example.com';
