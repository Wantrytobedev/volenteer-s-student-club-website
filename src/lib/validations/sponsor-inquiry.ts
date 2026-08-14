import { z } from "zod";

export const sponsorInquirySchema = z.object({
  organizationName: z
    .string()
    .trim()
    .min(1, "กรุณากรอกชื่อองค์กร")
    .max(200, "ชื่อองค์กรยาวเกินไป"),
  contactName: z
    .string()
    .trim()
    .min(1, "กรุณากรอกชื่อผู้ติดต่อ")
    .max(200, "ชื่อยาวเกินไป"),
  email: z.string().trim().email("กรุณากรอกอีเมลให้ถูกต้อง"),
  phone: z
    .string()
    .trim()
    .max(20, "เบอร์โทรยาวเกินไป")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .max(2000, "ข้อความยาวเกินไป")
    .optional()
    .or(z.literal("")),
});

export type SponsorInquiryInput = z.infer<typeof sponsorInquirySchema>;
