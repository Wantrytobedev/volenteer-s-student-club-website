import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { th } from "@/lib/i18n/th";
import { formatCampDateRange, getCampStatus } from "@/lib/camps";

export default async function HomePage() {
  const supabase = await createClient();
  const { data: camps } = await supabase
    .from("camps")
    .select("*")
    .eq("is_draft", false)
    .order("starts_at", { ascending: true })
    .limit(3);

  const upcomingCamps = camps ?? [];

  return (
    <>
      <section className="bg-gradient-to-b from-[#1e3a8a] to-[#2563eb] text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-200">
            {th.home.heroEyebrow}
          </p>
          <h1 className="mt-3 max-w-2xl text-3xl font-bold leading-tight sm:text-5xl">
            {th.home.heroTitle}
          </h1>
          <p className="mt-4 max-w-xl text-base text-blue-100 sm:text-lg">
            {th.home.heroSubtitle}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/camps"
              className="inline-flex items-center justify-center rounded-md bg-white px-5 py-3 text-sm font-semibold text-[#1e3a8a] hover:bg-blue-50"
            >
              {th.home.ctaSeeCamps}
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-md border border-white/40 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              {th.home.ctaAbout}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <h2 className="text-2xl font-bold text-slate-900">
          {th.home.missionTitle}
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {th.home.missionItems.map((item) => (
            <div
              key={item.title}
              className="rounded-lg border border-blue-100 bg-white p-6 shadow-sm"
            >
              <p className="font-semibold text-[#1e3a8a]">{item.title}</p>
              <p className="mt-2 text-sm text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-blue-50">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">
              {th.home.upcomingCampsTitle}
            </h2>
            <Link
              href="/camps"
              className="text-sm font-semibold text-[#2563eb] hover:underline"
            >
              {th.home.seeAllCamps}
            </Link>
          </div>

          {upcomingCamps.length === 0 ? (
            <p className="mt-6 text-sm text-slate-600">
              {th.home.upcomingCampsEmpty}
            </p>
          ) : (
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {upcomingCamps.map((camp) => {
                const status = getCampStatus(camp);
                return (
                  <Link
                    key={camp.id}
                    href={`/camps/${camp.slug}`}
                    className="block rounded-lg border border-blue-100 bg-white p-6 shadow-sm transition hover:shadow-md"
                  >
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                        status === "open"
                          ? "bg-green-100 text-green-700"
                          : status === "past"
                            ? "bg-slate-100 text-slate-600"
                            : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {status === "open"
                        ? th.camps.statusOpen
                        : status === "past"
                          ? th.camps.statusPast
                          : th.camps.statusUpcoming}
                    </span>
                    <p className="mt-3 font-semibold text-slate-900">
                      {camp.title}
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      {formatCampDateRange(camp)}
                    </p>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
