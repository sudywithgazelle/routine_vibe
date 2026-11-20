-- Run this ONCE in the NEW routine_vibe Supabase project.
-- Your existing profiles and todos tables are left intact.
alter table public.profiles add column if not exists avatar_id text;

create table if not exists public.study_activity_days (
  user_id uuid not null references auth.users(id) on delete cascade,
  activity_date date not null,
  created_at timestamptz not null default now(),
  primary key (user_id, activity_date)
);

alter table public.study_activity_days enable row level security;

drop policy if exists study_activity_select_own on public.study_activity_days;
create policy study_activity_select_own on public.study_activity_days
for select to authenticated using (auth.uid() = user_id);

drop policy if exists study_activity_insert_own on public.study_activity_days;
create policy study_activity_insert_own on public.study_activity_days
for insert to authenticated with check (auth.uid() = user_id);

drop policy if exists study_activity_update_own on public.study_activity_days;
create policy study_activity_update_own on public.study_activity_days
for update to authenticated using (auth.uid() = user_id)
with check (auth.uid() = user_id);
