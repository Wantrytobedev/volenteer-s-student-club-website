-- Initial schema for ชมรมอาสาพัฒนา website
-- Generated from docs/schema.md — first draft; db-architect subagent should review
-- assumptions noted inline (esp. notification_log uniqueness scope) before production use.

create extension if not exists pgcrypto;

-- =========================================
-- profiles (ต่อขยายจาก auth.users)
-- =========================================
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  student_id text,
  faculty text,
  phone text,
  line_user_id text,
  role text not null default 'member' check (role in ('member', 'admin')),
  created_at timestamptz not null default now()
);

comment on table public.profiles is 'ข้อมูลสมาชิกชมรม ต่อขยายจาก auth.users';

-- สร้างแถว profiles อัตโนมัติเมื่อมีการสมัคร auth.users ใหม่
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- helper: เช็คว่า user ปัจจุบันเป็น admin ไหม (security definer กัน RLS recursion)
create function public.is_admin()
returns boolean
language sql
security definer set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

alter table public.profiles enable row level security;

create policy "profiles_select_own_or_admin"
  on public.profiles for select
  using (auth.uid() = id or public.is_admin());

create policy "profiles_update_own_or_admin"
  on public.profiles for update
  using (auth.uid() = id or public.is_admin());

-- ไม่มี policy insert/delete สาธารณะ — profiles ถูกสร้างผ่าน trigger ด้านบนเท่านั้น

-- =========================================
-- posts
-- =========================================
create table public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  body text,
  cover_url text,
  published_at timestamptz,
  author_id uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

create index posts_published_at_idx on public.posts (published_at);

alter table public.posts enable row level security;

create policy "posts_select_published_or_admin"
  on public.posts for select
  using (published_at is not null or public.is_admin());

create policy "posts_write_admin_only"
  on public.posts for all
  using (public.is_admin())
  with check (public.is_admin());

-- =========================================
-- camps
-- =========================================
create table public.camps (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  cover_url text,
  location text,
  starts_at timestamptz,
  ends_at timestamptz,
  application_deadline timestamptz,
  capacity integer,
  is_draft boolean not null default true,
  created_at timestamptz not null default now()
);

create index camps_starts_at_idx on public.camps (starts_at);

alter table public.camps enable row level security;

create policy "camps_select_published_or_admin"
  on public.camps for select
  using (is_draft = false or public.is_admin());

create policy "camps_write_admin_only"
  on public.camps for all
  using (public.is_admin())
  with check (public.is_admin());

-- =========================================
-- camp_applications
-- =========================================
create table public.camp_applications (
  id uuid primary key default gen_random_uuid(),
  camp_id uuid not null references public.camps(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete set null,
  full_name text not null,
  phone text not null,
  email text not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected', 'waitlisted')),
  created_at timestamptz not null default now()
);

-- กันสมัครซ้ำค่ายเดียวกัน เฉพาะกรณีสมัครแบบล็อกอิน (user_id ไม่ null)
create unique index camp_applications_unique_member_signup
  on public.camp_applications (camp_id, user_id)
  where user_id is not null;

create index camp_applications_camp_id_idx on public.camp_applications (camp_id);

alter table public.camp_applications enable row level security;

-- เปิดให้สมัครแบบไม่ล็อกอินได้ (user_id null) แต่ห้ามสวมรอยแทน user อื่นตอนล็อกอินอยู่
create policy "camp_applications_insert_self_or_anon"
  on public.camp_applications for insert
  with check (user_id is null or user_id = auth.uid());

create policy "camp_applications_select_own_or_admin"
  on public.camp_applications for select
  using (auth.uid() = user_id or public.is_admin());

create policy "camp_applications_update_admin_only"
  on public.camp_applications for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "camp_applications_delete_admin_only"
  on public.camp_applications for delete
  using (public.is_admin());

-- =========================================
-- sponsor_inquiries
-- =========================================
create table public.sponsor_inquiries (
  id uuid primary key default gen_random_uuid(),
  organization_name text not null,
  contact_name text not null,
  email text not null,
  phone text,
  message text,
  status text not null default 'new' check (status in ('new', 'contacted', 'closed')),
  created_at timestamptz not null default now()
);

alter table public.sponsor_inquiries enable row level security;

create policy "sponsor_inquiries_insert_anyone"
  on public.sponsor_inquiries for insert
  with check (true);

create policy "sponsor_inquiries_select_admin_only"
  on public.sponsor_inquiries for select
  using (public.is_admin());

create policy "sponsor_inquiries_update_admin_only"
  on public.sponsor_inquiries for update
  using (public.is_admin())
  with check (public.is_admin());

-- =========================================
-- notification_preferences
-- =========================================
create table public.notification_preferences (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  via_email boolean not null default true,
  via_line boolean not null default true,
  categories text[] not null default '{}',
  updated_at timestamptz not null default now()
);

alter table public.notification_preferences enable row level security;

create policy "notification_preferences_owner_or_admin"
  on public.notification_preferences for all
  using (auth.uid() = user_id or public.is_admin())
  with check (auth.uid() = user_id or public.is_admin());

-- =========================================
-- notification_log
-- =========================================
create table public.notification_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  camp_id uuid references public.camps(id) on delete cascade,
  channel text not null check (channel in ('email', 'line', 'banner')),
  sent_at timestamptz not null default now()
);

-- ASSUMPTION: กันส่งซ้ำแบบ 1 ช่องทาง ต่อ 1 สมาชิก ต่อ 1 ค่าย (ไม่แยกตามประเภทข้อความ)
-- ถ้าต้องส่งเตือนหลายรอบ (เปิดรับ / ใกล้ปิดรับ / ก่อนเดินทาง) ต้องเพิ่มคอลัมน์ notification_kind
-- แล้วปรับ unique index นี้ — ทิ้งไว้ให้ db-architect ตัดสินใจตอน implement จริง
create unique index notification_log_unique_send
  on public.notification_log (user_id, camp_id, channel);

alter table public.notification_log enable row level security;

create policy "notification_log_select_own_or_admin"
  on public.notification_log for select
  using (auth.uid() = user_id or public.is_admin());

create policy "notification_log_write_admin_only"
  on public.notification_log for insert
  with check (public.is_admin());

-- =========================================
-- site_banners
-- =========================================
create table public.site_banners (
  id uuid primary key default gen_random_uuid(),
  message text not null,
  link_url text,
  is_active boolean not null default true,
  starts_at timestamptz,
  ends_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.site_banners enable row level security;

create policy "site_banners_select_active_or_admin"
  on public.site_banners for select
  using (is_active = true or public.is_admin());

create policy "site_banners_write_admin_only"
  on public.site_banners for all
  using (public.is_admin())
  with check (public.is_admin());
