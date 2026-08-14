import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { th } from "@/lib/i18n/th";
import {
  formatCampDateRange,
  formatThaiDate,
  getCampStatus,
  type Camp,
  type CampStatus,
} from "@/lib/camps";

const STATUS_LABEL: Record<CampStatus, string> = {
  open: th.camps.statusOpen,
  upcoming: th.camps.statusUpcoming,
  past: th.camps.statusPast,
  draft: "",
};

const STATUS_ORDER: CampStatus[] = ["open", "upcoming", "past"];

function groupByStatus(camps: Camp[]) {
  const groups: Record<CampStatus, Camp[]> = {
    open: [],
    upcoming: [],
    past: [],
    draft: [],
  };
  for (const camp of camps) {
    groups[getCampStatus(camp)].push(camp);
  }
  return groups;
}

export default async function CampsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("camps")
    .select("*")
    .eq("is_draft", false)
    .order("starts_at", { ascending: true });

  const camps = data ?? [];
  const grouped = groupByStatus(camps);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">{th.camps.title}</h1>
      <p className="mt-2 text-slate-600">{th.camps.subtitle}</p>

      {camps.length === 0 ? (
        <p className="mt-10 text-slate-600">{th.camps.empty}</p>
      ) : (
        STATUS_ORDER.map((status) => {
          const items = grouped[status];
          if (items.length === 0) return null;
          return (
            <section key={status} className="mt-10">
              <h2 className="text-xl font-semibold text-[#1e3a8a]">
                {STATUS_LABEL[status]}
              </h2>
              <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((camp) => (
                  <Link
                    key={camp.id}
                    href={`/camps/${camp.slug}`}
                    className="block rounded-lg border border-blue-100 bg-white p-6 shadow-sm transition hover:shadow-md"
                  >
                    <p className="font-semibold text-slate-900">
                      {camp.title}
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      {formatCampDateRange(camp)}
                    </p>
                    {camp.application_deadline && (
                      <p className="mt-1 text-xs text-slate-500">
                        {th.camps.deadlineLabel}:{" "}
                        {formatThaiDate(camp.application_deadline)}
                      </p>
                    )}
                    <span className="mt-3 inline-block text-sm font-semibold text-[#2563eb]">
                      {th.camps.viewDetail} →
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })
      )}
    </div>
  );
}
