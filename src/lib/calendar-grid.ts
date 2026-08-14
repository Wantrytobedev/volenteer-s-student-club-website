export type MonthGridDay = {
  date: Date;
  inCurrentMonth: boolean;
};

/**
 * สร้างตารางปฏิทินรายเดือน เริ่มวันอาทิตย์ เต็ม 6 สัปดาห์ (42 วัน)
 * อาจมีวันจากเดือนก่อน/ถัดไปติดขอบเพื่อให้ตารางเต็มแถว
 */
export function buildMonthGrid(year: number, month: number): MonthGridDay[] {
  const firstOfMonth = new Date(year, month, 1);
  const startWeekday = firstOfMonth.getDay(); // 0 = อาทิตย์
  const gridStart = new Date(year, month, 1 - startWeekday);

  const days: MonthGridDay[] = [];
  for (let i = 0; i < 42; i++) {
    const date = new Date(gridStart);
    date.setDate(gridStart.getDate() + i);
    days.push({ date, inCurrentMonth: date.getMonth() === month });
  }
  return days;
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function stripTime(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}
