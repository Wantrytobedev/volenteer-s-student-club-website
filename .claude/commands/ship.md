---
description: ตรวจสอบและเตรียม commit งานที่ทำเสร็จแล้ว
---

ทำตามลำดับนี้ก่อนปิดงาน:

1. รัน `npm run typecheck` และ `npm run build` ต้องผ่านทั้งคู่
2. เรียก qa-tester รัน `npm run test` และ `npm run e2e`
3. เรียก code-reviewer ตรวจ `git diff` ทั้งหมด แก้ทุกข้อ 🔴 ก่อน
4. สรุปการเปลี่ยนแปลงเป็น bullet สั้น ๆ ให้ผมอ่านก่อน commit จริง
5. ห้าม commit หรือ push เองโดยไม่ถามผมก่อน
