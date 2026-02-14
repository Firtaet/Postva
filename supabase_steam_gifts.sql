-- Таблица для подарков Steam
create table if not exists public.steam_gifts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null unique,
  trade_link text not null,
  user_email text,
  is_sent boolean default false,
  created_at timestamp with time zone default now()
);

-- Включаем RLS
alter table public.steam_gifts enable row level security;

-- Пользователь может видеть только свою заявку
create policy "Users can see their own gift status" 
  on public.steam_gifts for select using (auth.uid() = user_id);

-- Пользователь может вставить запись только за себя
create policy "Users can submit their gift" 
  on public.steam_gifts for insert with check (auth.uid() = user_id);

-- Для админ-бота (через сервисную роль будет доступ, либо можно добавить политику если бот использует JWT)
-- Но бот обычно работает через server side, так что RLS (по умолчанию) позволит доступ через service key.
