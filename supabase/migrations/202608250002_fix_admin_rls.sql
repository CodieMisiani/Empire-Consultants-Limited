-- Avoid recursive RLS evaluation when authorization checks the profiles table.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and is_admin = true
  );
$$;

drop policy "admins manage profiles" on public.profiles;
drop policy "admins manage services" on public.services;
drop policy "admins manage events" on public.events;
drop policy "admins manage leads" on public.leads;
drop policy "admin image uploads" on storage.objects;

create policy "admins manage profiles" on public.profiles
  for all using (public.is_admin()) with check (public.is_admin());
create policy "admins manage services" on public.services
  for all using (public.is_admin()) with check (public.is_admin());
create policy "admins manage events" on public.events
  for all using (public.is_admin()) with check (public.is_admin());
create policy "admins manage leads" on public.leads
  for all using (public.is_admin()) with check (public.is_admin());
create policy "admin image uploads" on storage.objects
  for all using (bucket_id = 'cms-images' and public.is_admin())
  with check (bucket_id = 'cms-images' and public.is_admin());
