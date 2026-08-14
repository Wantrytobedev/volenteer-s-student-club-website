import { z } from "zod";

export const campApplicationSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "กรุณากรอกชื่อ-นามสกุล")
    .max(200, "ชื่อยาวเกินไป"),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+()\-\s]{9,15}$/, "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง"),
  email: z.string().trim().email("กรุณากรอกอีเมลให้ถูกต้อง"),
});

export type CampApplicationInput = z.infer<typeof campApplicationSchema>;
