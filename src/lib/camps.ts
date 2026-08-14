import type { Tables } from "./supabase/types";

export type Camp = Tables<"camps">;

export type CampStatus = "open" | "upcoming" | "past" | "draft";

/**
 * สถานะค่าย คำนวณจากวันที่ ไม่เก็บเป็น column แยก (อิงตาม docs/schema.md)
 * - open: อยู่ในช่วงเปิดรับสมัคร (now <= application_deadline)
 * - past: ค่ายจบไปแล้ว (now > ends_at)
 * - upcoming: กรณีอื่นที่ไม่ใช่ open/past (ปิดรับสมัครแล้วแต่ยังไม่จบ หรือยังไม่ถึงกำหนด)
 */
export function getCampStatus(camp: Camp, now: Date = new Date()): CampStatus {
  if (camp.is_draft) return "draft";

  const deadline = camp.application_deadline
    ? new Date(camp.application_deadline)
    : null;
  const ends = camp.ends_at ? new Date(camp.ends_at) : null;

  if (ends && now > ends) return "past";
  if (deadline && now <= deadline) return "open";
  return "upcoming";
}

const thaiDateFormatter = new Intl.DateTimeFormat("th-TH", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Bangkok",
});

const thaiDateShortFormatter = new Intl.DateTimeFormat("th-TH", {
  day: "numeric",
  month: "short",
  timeZone: "Asia/Bangkok",
});

export function formatThaiDate(value: string | null): string {
  if (!value) return "ไม่ระบุ";
  return thaiDateFormatter.format(new Date(value));
}

export function formatThaiDateShort(value: string | null): string {
  if (!value) return "ไม่ระบุ";
  return thaiDateShortFormatter.format(new Date(value));
}

export function formatCampDateRange(camp: Camp): string {
  if (!camp.starts_at && !camp.ends_at) return "ยังไม่กำหนดวันที่";
  if (camp.starts_at && camp.ends_at) {
    return `${formatThaiDateShort(camp.starts_at)} - ${formatThaiDate(camp.ends_at)}`;
  }
  return formatThaiDate(camp.starts_at ?? camp.ends_at);
}
