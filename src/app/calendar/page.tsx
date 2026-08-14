import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { th } from "@/lib/i18n/th";
import { buildMonthGrid, isSameDay, stripTime } from "@/lib/calendar-grid";

const THAI_MONTHS = [
  "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
  "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม",
];
const THAI_WEEKDAYS = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"];

function parseMonthParam(value: string | undefined) {
  if (value) {
    const [y, m] = value.split("-").map(Number);
    if (y && m && m >= 1 && m <= 12) {
      return { year: y, month: m - 1 };
    }
  }
  const now = new Date();
  return { year: now.getFullYear(), month: now.getMonth() };
}

function monthParam(year: number, month: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}`;
}

export default async function CalendarPage({
  searchParams,
}: {
  searchParams: Promise<{ month?: string }>;
}) {
  const { month: monthQuery } = await searchParams;
  const { year, month } = parseMonthParam(monthQuery);

  const supabase = await createClient();
  const { data } = await supabase.from("camps").select("*").eq("is_draft", false);
  const camps = data ?? [];
  const grid = buildMonthGrid(year, month);

  const prevDate = new Date(year, month - 1, 1);
  const nextDate = new Date(year, month + 1, 1);
  const today = new Date();

  function eventsForDay(day: Date) {
    return camps.filter((camp) => {
      if (!camp.starts_at) return false;
      const start = stripTime(new Date(camp.starts_at));
      const end = camp.ends_at ? stripTime(new Date(camp.ends_at)) : start;
      return day >= start && day <= end;
    });
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">{th.calendar.title}</h1>
      <p className="mt-2 text-slate-600">{th.calendar.subtitle}</p>

      <div className="mt-8 flex items-center justify-between">
        <Link
          href={`/calendar?month=${monthParam(prevDate.getFullYear(), prevDate.getMonth())}`}
          className="rounded-md border border-blue-200 px-3 py-1.5 text-sm font-medium text-[#1e3a8a] hover:bg-blue-50"
        >
          ← {th.calendar.prevMonth}
        </Link>
        <p className="text-lg font-semibold text-slate-900">
          {THAI_MONTHS[month]} {year + 543}
        </p>
        <Link
          href={`/calendar?month=${monthParam(nextDate.getFullYear(), nextDate.getMonth())}`}
          className="rounded-md border border-blue-200 px-3 py-1.5 text-sm font-medium text-[#1e3a8a] hover:bg-blue-50"
        >
          {th.calendar.nextMonth} →
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-7 gap-px overflow-hidden rounded-lg border border-blue-100 bg-blue-100 text-xs sm:text-sm">
        {THAI_WEEKDAYS.map((w) => (
          <div key={w} className="bg-[#1e3a8a] py-2 text-center font-semibold text-white">
            {w}
          </div>
        ))}

        {grid.map(({ date, inCurrentMonth }) => {
          const dayEvents = eventsForDay(date);
          const isToday = isSameDay(date, today);
          return (
            <div
              key={date.toISOString()}
              className={`min-h-20 bg-white p-1.5 sm:min-h-28 sm:p-2 ${
                inCurrentMonth ? "" : "bg-slate-50 text-slate-400"
              }`}
            >
              <p
                className={`text-right text-xs font-medium sm:text-sm ${
                  isToday
                    ? "ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-[#2563eb] text-white"
                    : ""
                }`}
              >
                {date.getDate()}
              </p>
              <div className="mt-1 space-y-1">
                {dayEvents.map((camp) => (
                  <Link
                    key={camp.id}
                    href={`/camps/${camp.slug}`}
                    className="block truncate rounded bg-blue-100 px-1.5 py-0.5 text-[10px] font-medium text-[#1e3a8a] hover:bg-blue-200 sm:text-xs"
                    title={camp.title}
                  >
                    {camp.title}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
