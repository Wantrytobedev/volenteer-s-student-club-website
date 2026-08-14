"use client";

import { useState, useTransition } from "react";
import { th } from "@/lib/i18n/th";
import { submitSponsorInquiry, type SubmitInquiryResult } from "./actions";

const fieldClass =
  "mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-[#2563eb] focus:outline-none focus:ring-1 focus:ring-[#2563eb]";
const labelClass = "block text-sm font-medium text-slate-700";

export function InquiryForm() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<SubmitInquiryResult | null>(null);

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const res = await submitSponsorInquiry(formData);
      setResult(res);
    });
  }

  if (result?.ok) {
    return (
      <div className="rounded-md bg-green-50 p-4 text-sm text-green-800">
        <p className="font-semibold">{th.sponsorForm.successTitle}</p>
        <p className="mt-1">{th.sponsorForm.successBody}</p>
      </div>
    );
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="organizationName" className={labelClass}>
          {th.sponsorForm.organizationName}
        </label>
        <input id="organizationName" name="organizationName" type="text" required className={fieldClass} />
      </div>

      <div>
        <label htmlFor="contactName" className={labelClass}>
          {th.sponsorForm.contactName}
        </label>
        <input id="contactName" name="contactName" type="text" required className={fieldClass} />
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          {th.sponsorForm.email}
        </label>
        <input id="email" name="email" type="email" required className={fieldClass} />
      </div>

      <div>
        <label htmlFor="phone" className={labelClass}>
          {th.sponsorForm.phone}
        </label>
        <input id="phone" name="phone" type="tel" className={fieldClass} />
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          {th.sponsorForm.message}
        </label>
        <textarea id="message" name="message" rows={4} className={fieldClass} />
      </div>

      {result && !result.ok && (
        <p className="text-sm text-red-600">{result.error}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-md bg-[#2563eb] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1d4ed8] disabled:opacity-60 sm:w-auto"
      >
        {isPending ? th.sponsorForm.submitting : th.sponsorForm.submit}
      </button>
    </form>
  );
}
