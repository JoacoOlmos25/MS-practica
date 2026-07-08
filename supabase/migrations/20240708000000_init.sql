-- =====================================================
-- TIPOS ENUM
-- =====================================================
create type estado_reserva as enum (
  'pendiente',
  'confirmada',
  'cancelada',
  'completada'
);

create type rol_mensaje as enum (
  'user',
  'assistant',
  'system'
);

-- =====================================================
-- profiles  (1:1 con auth.users)
-- =====================================================
create table public.profiles (
  id         uuid primary key references auth.users (id) on delete cascade,
  nombre     text,
  telefono   text,
  created_at timestamptz not null default now()
);

-- =====================================================
-- reservas
-- =====================================================
create table public.reservas (
  id                  uuid primary key default gen_random_uuid(),
  user_id             uuid references auth.users (id) on delete set null,
  fecha               date not null,
  hora                time not null,
  cantidad_comensales int4 not null,
  nombre_contacto     text,
  telefono_contacto   text,
  notas               text,
  estado              estado_reserva not null default 'pendiente',
  origen              text,
  created_at          timestamptz not null default now()
);

-- =====================================================
-- conversaciones
-- =====================================================
create table public.conversaciones (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid references auth.users (id) on delete cascade,
  titulo     text,
  created_at timestamptz not null default now()
);

-- =====================================================
-- mensajes
-- =====================================================
create table public.mensajes (
  id              uuid primary key default gen_random_uuid(),
  conversacion_id uuid not null references public.conversaciones (id) on delete cascade,
  rol             rol_mensaje not null,
  contenido       text not null,
  created_at      timestamptz not null default now()
);

-- =====================================================
-- resenas
-- =====================================================
create table public.resenas (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid references auth.users (id) on delete set null,
  calificacion int4 not null check (calificacion between 1 and 5),
  comentario   text,
  created_at   timestamptz not null default now()
);

-- =====================================================
-- ÍNDICES (sobre FKs y campos de filtrado frecuente)
-- =====================================================
create index on public.reservas       (user_id);
create index on public.reservas       (fecha);
create index on public.conversaciones (user_id);
create index on public.mensajes       (conversacion_id);
create index on public.resenas        (user_id);
