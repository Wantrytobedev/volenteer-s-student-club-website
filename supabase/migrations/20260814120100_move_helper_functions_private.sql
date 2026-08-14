-- แก้ security advisor warning: helper functions ไม่ควรถูกเรียกตรงผ่าน PostgREST RPC
-- ย้าย public.handle_new_user() และ public.is_admin() ไปอยู่ schema ที่ไม่ถูก expose เป็น API
-- (ALTER FUNCTION ... SET SCHEMA ไม่กระทบ trigger หรือ RLS policy ที่อ้างอิงอยู่ เพราะ Postgres
--  เก็บ reference เป็น OID ไม่ใช่ชื่อ)

create schema if not exists private;

alter function public.handle_new_user() set schema private;
alter function public.is_admin() set schema private;
