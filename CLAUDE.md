# เว็บไซต์ชมรมอาสาพัฒนา

## บริบท
เว็บไซต์ชมรมอาสาพัฒนา ทำหน้าที่ 3 อย่าง:
1. ลงคอนเทนต์ (ข่าว/บทความ/อัลบั้มภาพกิจกรรม)
2. สมัครสมาชิกชมรม
3. แจ้งเตือนสมาชิกเมื่อมีกิจกรรมใหม่ (Email / Web Push / LINE)

ผู้ใช้หลัก: นักศึกษาไทย เปิดผ่านมือถือ 80% → **mobile-first เสมอ**

## Tech Stack (ห้ามเพิ่ม dependency ใหม่โดยไม่ถาม)
- Next.js 15 App Router, TypeScript strict mode
- Tailwind CSS v4 + shadcn/ui
- Supabase (Postgres + Auth + Storage), เปิด RLS ทุกตาราง
- Zod สำหรับ validation ทุก input
- Resend สำหรับ email, web-push สำหรับ push

## กฎเขียนโค้ด
- Server Component เป็น default; ใส่ "use client" เฉพาะที่จำเป็นจริง
- Data mutation ใช้ Server Actions + Zod schema เท่านั้น
- ห้าม `any` ห้าม `@ts-ignore`
- ทุกตาราง Supabase ต้องมี RLS policy ห้ามเปิด public write
- ไฟล์ component ไม่เกิน 200 บรรทัด เกินให้แตกไฟล์
- ข้อความ UI ทั้งหมดเป็นภาษาไทย เก็บใน `src/lib/i18n/th.ts`

## กฎด้านความปลอดภัย (สำคัญมาก - เก็บข้อมูลนักศึกษา)
- ห้าม log อีเมล/เบอร์โทรของสมาชิกลง console
- Service role key ใช้ได้เฉพาะฝั่ง server ห้ามหลุดเข้า client bundle
- ทุก endpoint ที่แก้ข้อมูลต้องเช็ค session + role ก่อนเสมอ

## คำสั่งที่ใช้บ่อย
- `npm run dev` / `npm run build` / `npm run typecheck`
- `npm run test` (Vitest) / `npm run e2e` (Playwright)
- `npx supabase db push` — apply migration
