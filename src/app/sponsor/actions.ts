"use server";

import { sponsorInquirySchema } from "@/lib/validations/sponsor-inquiry";
import { createClient } from "@/lib/supabase/server";

export type SubmitInquiryResult = { ok: true } | { ok: false; error: string };

export async function submitSponsorInquiry(
  formData: FormData
): Promise<SubmitInquiryResult> {
  const parsed = sponsorInquirySchema.safeParse({
    organizationName: formData.get("organizationName"),
    contactName: formData.get("contactName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "ข้อมูลไม่ถูกต้อง";
    return { ok: false, error: firstError };
  }

  const supabase = await createClient();

  const { error } = await supabase.from("sponsor_inquiries").insert({
    organization_name: parsed.data.organizationName,
    contact_name: parsed.data.contactName,
    email: parsed.data.email,
    phone: parsed.data.phone || null,
    message: parsed.data.message || null,
  });

  if (error) {
    return { ok: false, error: "ส่งข้อความไม่สำเร็จ กรุณาลองใหม่อีกครั้ง" };
  }

  // TODO(notification-engineer): แจ้งเตือนทีมงานผ่านอีเมล (Resend)
  // เมื่อ RESEND_API_KEY พร้อมใช้งานใน .env.local

  return { ok: true };
}
