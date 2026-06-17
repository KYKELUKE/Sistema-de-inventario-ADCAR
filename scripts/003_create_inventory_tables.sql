-- Create products table for lubricants and automotive parts
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  description text,
  category text not null,
  sku text unique,
  price numeric not null default 0,
  cost numeric default 0,
  quantity_in_stock integer not null default 0,
  min_quantity integer not null default 5,
  unit text default 'unidad',
  supplier_id uuid,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.products enable row level security;

create policy "products_select_own" on public.products for select using (auth.uid() = user_id);
create policy "products_insert_own" on public.products for insert with check (auth.uid() = user_id);
create policy "products_update_own" on public.products for update using (auth.uid() = user_id);
create policy "products_delete_own" on public.products for delete using (auth.uid() = user_id);

-- Create inventory movements table
create table if not exists public.inventory_movements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  movement_type text not null check (movement_type in ('entrada', 'salida', 'ajuste')),
  quantity integer not null,
  reason text,
  reference text,
  created_at timestamp with time zone default now()
);

alter table public.inventory_movements enable row level security;

create policy "movements_select_own" on public.inventory_movements for select using (auth.uid() = user_id);
create policy "movements_insert_own" on public.inventory_movements for insert with check (auth.uid() = user_id);

-- Create orders table for maintenance services/sales
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  customer_name text not null,
  customer_phone text,
  vehicle_type text,
  vehicle_plate text,
  service_type text,
  total_amount numeric not null default 0,
  status text default 'pendiente' check (status in ('pendiente', 'en_proceso', 'completado', 'cancelado')),
  notes text,
  created_at timestamp with time zone default now(),
  completed_at timestamp with time zone
);

alter table public.orders enable row level security;

create policy "orders_select_own" on public.orders for select using (auth.uid() = user_id);
create policy "orders_insert_own" on public.orders for insert with check (auth.uid() = user_id);
create policy "orders_update_own" on public.orders for update using (auth.uid() = user_id);

-- Create suppliers table
create table if not exists public.suppliers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  contact_name text,
  email text,
  phone text,
  address text,
  created_at timestamp with time zone default now()
);

alter table public.suppliers enable row level security;

create policy "suppliers_select_own" on public.suppliers for select using (auth.uid() = user_id);
create policy "suppliers_insert_own" on public.suppliers for insert with check (auth.uid() = user_id);
create policy "suppliers_update_own" on public.suppliers for update using (auth.uid() = user_id);
create policy "suppliers_delete_own" on public.suppliers for delete using (auth.uid() = user_id);
