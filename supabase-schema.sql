-- Supabase database schema for abuba_portiforio

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  youtube_url text not null,
  thumbnail_url text not null,
  created_at timestamptz not null default now()
);

create table if not exists analytics (
  id uuid primary key default gen_random_uuid(),
  event_name text not null,
  metadata jsonb,
  created_at timestamptz not null default now()
);
