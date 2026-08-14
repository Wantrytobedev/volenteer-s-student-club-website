---
description: เริ่ม feature ใหม่ด้วย pipeline agent เต็มรูปแบบ
---

Feature ที่ต้องทำ: $ARGUMENTS

ทำตามลำดับนี้ อย่าข้ามขั้น:

1. เรียก tech-lead วางแผนและ breakdown งาน แสดงแผนให้ผมอนุมัติก่อน
2. รอผมพิมพ์ "ok" แล้วค่อยไปต่อ
3. ถ้าแผนแตะฐานข้อมูล → เรียก db-architect ทำ migration + RLS ให้เสร็จก่อน
4. เรียก backend-api และ frontend-ui ทำงานคู่ขนาน (backend ทำ action,
   frontend ทำ UI ตาม type ที่ backend ประกาศ)
5. ถ้าเกี่ยวกับการแจ้งเตือน → เรียก notification-engineer
6. เรียก qa-tester เขียนและรันเทสต์
7. เรียก code-reviewer ตรวจ
8. สรุปให้ผมว่าทำอะไรไปบ้าง และเหลืออะไรที่ผมต้องทำเอง (เช่น ตั้งค่า env)
