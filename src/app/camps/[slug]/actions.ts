"use server";

import { campApplicationSchema } from "@/lib/validations/camp-application";
import { createClient } from "@/lib/supabase/server";

export type SubmitApplicationResult =
  | { ok: true }
  | { ok: false; error: string };

export async function submitCampApplication(
  campId: string,
  formData: FormData
): Promise<SubmitApplicationResult> {
  if (!campId) {
    return { ok: false, error: "ไม่พบข้อมูลค่ายที่ต้องการสมัคร" };
  }

  const parsed = campApplicationSchema.safeParse({
    fullName: formData.get("fullName"),
    phone: formData.get("phone"),
    email: formData.get("email"),
  });

  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "ข้อมูลไม่ถูกต้อง";
    return { ok: false, error: firstError };
  }

  const supabase = await createClient();

  // ผู้สมัครที่ล็อกอินอยู่ให้ผูก user_id ไว้ด้วย (RLS อนุญาตทั้งสองกรณี)
  const { data: authData } = await supabase.auth.getUser();

  const { error } = await supabase.from("camp_applications").insert({
    camp_id: campId,
    user_id: authData.user?.id ?? null,
    full_name: parsed.data.fullName,
    phone: parsed.data.phone,
    email: parsed.data.email,
  });

  if (error) {
    return { ok: false, error: "บันทึกใบสมัครไม่สำเร็จ กรุณาลองใหม่อีกครั้ง" };
  }

  // TODO(notification-engineer): ส่งอีเมลยืนยัน (Resend) + LINE OA แจ้งเตือน
  // เมื่อ RESEND_API_KEY / LINE_CHANNEL_ACCESS_TOKEN พร้อมใช้งานใน .env.local
  // แล้วบันทึกลง notification_log เพื่อกันส่งซ้ำ ตาม docs/schema.md

  return { ok: true };
}
