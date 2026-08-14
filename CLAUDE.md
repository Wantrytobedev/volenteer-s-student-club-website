# เว็บไซต์ชมรมอาสาพัฒนา มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ (กรุงเทพ)

## บริบท
เว็บไซต์ชมรมอาสาพัฒนา ทำหน้าที่หลัก 4 อย่าง (ดูรายละเอียดเต็มใน `docs/prd.md`):
1. แนะนำตัวชมรมให้บุคคลภายนอกรู้จัก (หน้าแรก, เกี่ยวกับเรา, แกลเลอรี)
2. ลงข้อมูลค่ายอาสา (3 ค่าย/ปี: ค่ายจุดประกาย, ค่ายสร้าง, ค่ายวันเด็ก) พร้อมฟอร์มสมัครออนไลน์
   และแจ้งเตือนสมาชิก/ผู้สมัครตั้งแต่เปิดรับจนถึงวันเดินทาง
3. เป็นช่องทางให้องค์กร/สปอนเซอร์ติดต่อสนับสนุน
4. ปฏิทินกิจกรรม interactive ดูกำหนดการทั้งปี (พร้อม "Add to Google Calendar")

ช่องทางแจ้งเตือน: **LINE OA (หลัก, ผ่าน LINE Messaging API)** → อีเมล (สำรอง/ยืนยันทางการ)
→ แบนเนอร์ในเว็บ (ข่าวด่วน) — **ไม่ใช้ Web Push** ในเวอร์ชันแรก

โทนสี/แบรนด์: ฟ้า, น้ำเงิน, ขาว
ผู้ใช้หลัก: นักศึกษาไทย เปิดผ่านมือถือ 80% → **mobile-first เสมอ**

## Tech Stack (ห้ามเพิ่ม dependency ใหม่โดยไม่ถาม)
- Next.js 15 App Router, TypeScript strict mode
- Tailwind CSS v4 + shadcn/ui
- Supabase (Postgres + Auth + Storage), เปิด RLS ทุกตาราง
- Zod สำหรับ validation ทุก input
- Resend สำหรับ email, LINE Messaging API สำหรับ LINE OA
- FullCalendar (หรือเทียบเท่า) สำหรับปฏิทินกิจกรรม

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
