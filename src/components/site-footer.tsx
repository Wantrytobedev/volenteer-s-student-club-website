import { th, siteContact } from "@/lib/i18n/th";

export function SiteFooter() {
  const buddhistYear = new Date().getFullYear() + 543;

  return (
    <footer className="border-t border-blue-100 bg-[#0f172a] text-slate-200">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3">
        <div>
          <p className="text-lg font-bold text-white">{th.siteName}</p>
          <p className="mt-2 text-sm text-slate-400">{th.siteFullName}</p>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">
            {th.footer.contactHeading}
          </p>
          <p className="mt-2 text-sm text-slate-400">
            {th.footer.phoneLabel}: {siteContact.phone}
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">
            {th.footer.followHeading}
          </p>
          <ul className="mt-2 space-y-1 text-sm">
            <li>
              <a
                href={siteContact.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white"
              >
                {th.footer.facebookLabel}: {siteContact.facebookHandle}
              </a>
            </li>
            <li>
              <a
                href={siteContact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white"
              >
                {th.footer.instagramLabel}: {siteContact.instagramHandle}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-slate-500 sm:px-6">
        © {buddhistYear} {th.siteName} — {th.footer.rightsReserved}
      </div>
    </footer>
  );
}
