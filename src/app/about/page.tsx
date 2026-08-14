import { th, siteContact } from "@/lib/i18n/th";

const CAMP_NAMES = ["ค่ายจุดประกาย", "ค่ายสร้าง", "ค่ายวันเด็ก"];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">{th.about.title}</h1>
      <p className="mt-2 text-slate-600">{th.about.subtitle}</p>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-[#1e3a8a]">
          {th.about.missionTitle}
        </h2>
        <p className="mt-3 leading-relaxed text-slate-700">
          {th.about.missionBody}
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-[#1e3a8a]">
          {th.about.campsHeading}
        </h2>
        <ul className="mt-3 grid gap-3 sm:grid-cols-3">
          {CAMP_NAMES.map((name) => (
            <li
              key={name}
              className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-center font-medium text-[#1e3a8a]"
            >
              {name}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-[#1e3a8a]">
          {th.about.contactHeading}
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
          <li>
            <a
              href={siteContact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2563eb] hover:underline"
            >
              Instagram: {siteContact.instagramHandle}
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}
