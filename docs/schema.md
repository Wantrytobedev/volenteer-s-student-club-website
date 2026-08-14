# Schema — เว็บไซต์ชมรมอาสาพัฒนา (KMUTNB)

> โครงตารางตาม docs/prd.md ให้ `db-architect` ปรับละเอียดอีกทีตอนเขียน migration จริง
> (เช่น เพิ่ม index, constraint, ตรวจ naming ให้ตรง convention ของทีม)

## ตารางหลัก

| ตาราง | คำอธิบาย | คอลัมน์สำคัญ |
|---|---|---|
| `profiles` | ต่อขยายจาก `auth.users` — สมาชิกชมรม | full_name, student_id, faculty, phone, line_user_id, role |
| `posts` | ข่าวสาร/บทความของชมรม | slug, title, body, cover_url, published_at, author_id |
| `camps` | ค่ายอาสา (ค่ายจุดประกาย, ค่ายสร้าง, ค่ายวันเด็ก ฯลฯ) | slug, title, description, cover_url, location, starts_at, ends_at, application_deadline, capacity |
| `camp_applications` | ใบสมัครเข้าค่าย (รับได้ทั้งสมาชิกและบุคคลทั่วไป) | camp_id, user_id (nullable), full_name, phone, email, status |
| `sponsor_inquiries` | ข้อความติดต่อจากสปอนเซอร์/องค์กร | organization_name, contact_name, email, phone, message, status |
| `notification_preferences` | ตั้งค่าการแจ้งเตือนของสมาชิก | user_id, via_email, via_line, categories[] |
| `notification_log` | กันส่งแจ้งเตือนซ้ำ | user_id, camp_id, channel, sent_at (UNIQUE) |
| `site_banners` | แบนเนอร์/ป้ายประกาศข่าวด่วนหน้าแรก | message, link_url, is_active, starts_at, ends_at |

> **หมายเหตุ**: โปรเจกต์นี้ไม่ใช้ Web Push — ช่องทางแจ้งเตือนคือ LINE OA (หลัก) + อีเมล (สำรอง/ทางการ) +
> แบนเนอร์ในเว็บ (`site_banners`) เท่านั้น จึงไม่มีตาราง `push_subscriptions`

## ความสัมพันธ์ (ER, สรุปย่อ)

```
auth.users 1---1 profiles
profiles   1---N posts (author_id)
profiles   1---N camp_applications (user_id, nullable — รับผู้สมัครที่ไม่ได้ล็อกอินได้)
camps      1---N camp_applications (camp_id)
profiles   1---1 notification_preferences
profiles   1---N notification_log
camps      1---N notification_log
```

`sponsor_inquiries` และ `site_banners` ไม่ผูกกับ `profiles` โดยตรง — จัดการผ่าน admin panel เท่านั้น

## สถานะค่าย (คำนวณจากวันที่ ไม่เก็บเป็น column แยก)
- **กำลังเปิดรับสมัคร**: `now() BETWEEN created_at AND application_deadline`
- **กำลังจะมาถึง**: `application_deadline < now() < starts_at`
- **ที่ผ่านมาแล้ว**: `now() > ends_at`

## กฎ RLS ที่ต้องมีทุกตาราง
- เปิด RLS ทุกตาราง ห้าม public write
- คอนเทนต์สาธารณะ (`posts`, `camps`): anon อ่านได้เฉพาะแถวที่เผยแพร่แล้ว (`published_at IS NOT NULL` / ค่ายที่ไม่ใช่ draft)
- `camp_applications`: insert เปิดให้ anon ได้ (ฟอร์มสมัครไม่บังคับล็อกอิน) แต่ select/update/delete
  เฉพาะเจ้าของแถว (ถ้ามี user_id) หรือ role `admin`
- `sponsor_inquiries`: insert เปิดให้ anon ได้ (ฟอร์มติดต่อ) select/update เฉพาะ role `admin`
- ข้อมูลส่วนตัวอื่น ๆ: เจ้าของแถว (`auth.uid() = user_id`) หรือ role `admin` เท่านั้น
- กันสมัครซ้ำค่ายเดียวกันด้วย `UNIQUE(user_id, camp_id)` เมื่อสมัครแบบล็อกอิน

รายละเอียด policy จริงและ migration ให้ดูใน `supabase/migrations/`
