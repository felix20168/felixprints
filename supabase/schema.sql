-- Felixprints schema. Applied to project chthjsnlyvjwguncqdyv.
create table if not exists public.fp_admin_users (user_id uuid primary key references auth.users(id) on delete cascade, created_at timestamptz not null default now());
create table if not exists public.fp_products (id uuid primary key default gen_random_uuid(), name text not null, description text not null default '', price numeric(10,2) not null check (price >= 0), category text not null default 'Gifts', accent_color text not null default '#c8f15a', available boolean not null default true, created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table if not exists public.fp_filaments (id uuid primary key default gen_random_uuid(), material_type text not null check (material_type in ('PLA','PETG','TPU','Resin')), color_name text not null, swatch text not null default '#c8f15a', available boolean not null default true, created_at timestamptz not null default now());
create table if not exists public.fp_custom_requests (id uuid primary key default gen_random_uuid(), customer_name text not null, email text not null, brief text not null, file_path text, file_name text, status text not null default 'new' check (status in ('new','reviewing','quoted','complete','archived')), created_at timestamptz not null default now());

-- RLS policies and the private custom-designs storage bucket are maintained in the live project.
-- Keep this file as the source reference when moving the app to another Supabase project.
