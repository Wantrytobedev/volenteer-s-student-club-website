# Schema — เว็บไซต์ชมรมอาสาพัฒนา

> โครงตารางเริ่มต้น ให้ `db-architect` ปรับตาม docs/prd.md และ docs/architecture.md
> ก่อนเขียน migration จริง

## ตารางหลัก

| ตาราง | คำอธิบาย | คอลัมน์สำคัญ |
|---|---|---|
| `profiles` | ต่อขยายจาก `auth.users` | full_name, student_id, faculty, phone, role |
| `posts` | คอนเทนต์/ข่าว | slug, title, body, cover_url, published_at, author_id |
| `events` | กิจกรรมอาสา | title, description, location, starts_at, ends_at, capacity |
| `event_registrations` | การสมัครเข้าร่วมกิจกรรม | user_id, event_id, status |
| `notification_preferences` | ตั้งค่าการแจ้งเตือนของสมาชิก | user_id, via_email, via_push, via_line, categories[] |
| `push_subscriptions` | Web Push endpoint + keys | user_id, endpoint, keys |
| `notification_log` | กันส่งแจ้งเตือนซ้ำ | user_id, event_id, channel, sent_at (UNIQUE) |

## ความสัมพันธ์ (ER, สรุปย่อ)

```
auth.users 1---1 profiles
profiles 1---N posts (author_id)
profiles 1---N event_registrations (user_id)
events   1---N event_registrations (event_id)
profiles 1---1 notification_preferences
profiles 1---N push_subscriptions
profiles 1---N notification_log
events   1---N notification_log
```

## กฎ RLS ที่ต้องมีทุกตาราง
- เปิด RLS ทุกตาราง ห้าม public write
- คอนเทนต์สาธารณะ: anon อ่านได้เฉพาะแถวที่ `published_at IS NOT NULL`
- ข้อมูลส่วนตัว: เจ้าของแถว (`auth.uid() = user_id`) หรือ role `admin` เท่านั้น
- กันสมัครซ้ำกิจกรรมด้วย `UNIQUE(user_id, event_id)` ที่ระดับ DB ไม่ใช่ตรวจที่ app

รายละเอียด policy จริงและ migration ให้ดูใน `supabase/migrations/`
