import { th, siteContact } from "@/lib/i18n/th";
import { InquiryForm } from "./inquiry-form";

export default function SponsorPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">{th.sponsor.title}</h1>
      <p className="mt-2 text-slate-600">{th.sponsor.subtitle}</p>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-[#1e3a8a]">
          {th.sponsor.whyHeading}
        </h2>
        <p className="mt-3 leading-relaxed text-slate-700">
          {th.sponsor.whyBody}
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-[#1e3a8a]">
          {th.sponsor.contactHeading}
        </h2>
        <ul className="mt-3 space-y-1 text-slate-700">
          <li>
            {th.footer.phoneLabel}: {siteContact.phone}
          </li>
          <li>
            <a
              href={siteContact.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2563eb] hover:underline"
            >
              Facebook: {siteContact.facebookHandle}
            </a>
          </li>
        </ul>
      </section>

      <section className="mt-10 rounded-lg border border-blue-100 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-[#1e3a8a]">
          {th.sponsor.formHeading}
        </h2>
        <div className="mt-4">
          <InquiryForm />
        </div>
      </section>
    </div>
  );
}
