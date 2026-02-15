create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null unique,
  email text not null unique,
  created_at timestamptz default now()
);

alter table public.newsletter_subscribers enable row level security;

create policy "Users can see own newsletter subscription"
  on public.newsletter_subscribers for select using (auth.uid() = user_id);

create policy "Users can insert own newsletter subscription"
  on public.newsletter_subscribers for insert with check (auth.uid() = user_id);

create policy "Users can delete own newsletter subscription"
  on public.newsletter_subscribers for delete using (auth.uid() = user_id);
