import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { th } from "@/lib/i18n/th";
import { formatCampDateRange, formatThaiDate, getCampStatus } from "@/lib/camps";
import { ApplicationForm } from "./application-form";

export default async function CampDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: camp } = await supabase
    .from("camps")
    .select("*")
    .eq("slug", slug)
    .eq("is_draft", false)
    .maybeSingle();

  if (!camp) notFound();

  const status = getCampStatus(camp);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <Link
        href="/camps"
        className="text-sm font-medium text-[#2563eb] hover:underline"
      >
        ← {th.campDetail.backToList}
      </Link>

      <h1 className="mt-4 text-3xl font-bold text-slate-900">{camp.title}</h1>
      <p className="mt-2 text-slate-600">{formatCampDateRange(camp)}</p>

      <div className="mt-8 grid gap-8 md:grid-cols-3">
        <section className="md:col-span-2">
          <h2 className="text-xl font-semibold text-[#1e3a8a]">
            {th.campDetail.aboutHeading}
          </h2>
          <p className="mt-3 whitespace-pre-line leading-relaxed text-slate-700">
            {camp.description ?? "-"}
          </p>

          <dl className="mt-6 space-y-2 text-sm text-slate-700">
            {camp.location && (
              <div className="flex gap-2">
                <dt className="font-semibold">{th.camps.locationLabel}:</dt>
                <dd>{camp.location}</dd>
              </div>
            )}
            {camp.application_deadline && (
              <div className="flex gap-2">
                <dt className="font-semibold">{th.camps.deadlineLabel}:</dt>
                <dd>{formatThaiDate(camp.application_deadline)}</dd>
              </div>
            )}
            {camp.capacity && (
              <div className="flex gap-2">
                <dt className="font-semibold">{th.camps.capacityLabel}:</dt>
                <dd>
                  {camp.capacity} {th.camps.capacityUnit}
                </dd>
              </div>
            )}
          </dl>
        </section>

        <section className="rounded-lg border border-blue-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-[#1e3a8a]">
            {th.campDetail.applyHeading}
          </h2>

          {status === "open" ? (
            <div className="mt-4">
              <ApplicationForm campId={camp.id} />
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-600">
              {status === "past"
                ? th.campDetail.applyPastNotice
                : th.campDetail.applyClosedNotice}
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
