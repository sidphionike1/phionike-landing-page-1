import type { Metadata } from "next"
import Link from "next/link"
import { LegalShell } from "@/components/legal/legal-shell"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo"

export const metadata: Metadata = pageMetadata("cookies")

function CookieTable({
  rows,
}: {
  rows: { name: string; provider: string; purpose: string; duration: string }[]
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[560px] border-collapse text-left text-[13px] leading-[18px]">
        <thead>
          <tr className="border-b border-border text-[#111111]">
            <th className="py-2 pr-3 font-normal">Cookie</th>
            <th className="py-2 pr-3 font-normal">Provider</th>
            <th className="py-2 pr-3 font-normal">Purpose</th>
            <th className="py-2 font-normal">Duration</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={`${row.name}-${row.provider}`} className="border-b border-border/70 align-top">
              <td className="py-2.5 pr-3 text-[#111111]">{row.name}</td>
              <td className="py-2.5 pr-3">{row.provider}</td>
              <td className="py-2.5 pr-3">{row.purpose}</td>
              <td className="py-2.5">{row.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function CookiePolicyPage() {
  return (
    <>
      <JsonLd id="ld-cookies-webpage" data={webPageJsonLd("cookies")} />
      <JsonLd id="ld-cookies-breadcrumb" data={breadcrumbJsonLd("cookies")} />
      <LegalShell title="Cookie Policy" updated="22 September 2026">
        <section>
          <h2 className="type-sans-medium text-[20px] leading-[28px] text-[#111111]">1. Who we are</h2>
          <p className="mt-3">
            This website is operated by Phionike Solutions LLP (“Phionike”, “we”, “us”), a design studio registered in
            India. Registered office: WeWork — Nesco IT Park, Goregaon, Mumbai, India. Email:{" "}
            <a href="mailto:info@phionike.com" className="underline underline-offset-2">
              info@phionike.com
            </a>
            .
          </p>
          <p className="mt-3">
            For visitors in the European Economic Area or the United Kingdom, Phionike Solutions LLP is the data
            controller for personal data collected through this website, including data collected via cookies.
          </p>
        </section>

        <section>
          <h2 className="type-sans-medium text-[20px] leading-[28px] text-[#111111]">2. What this policy covers</h2>
          <p className="mt-3">
            This Cookie Policy explains what cookies and similar technologies we use, why we use them, and how you can
            control them. It should be read with our{" "}
            <Link href="/privacy" className="underline underline-offset-2">
              Privacy Policy
            </Link>
            , which describes how we process personal data more generally.
          </p>
        </section>

        <section>
          <h2 className="type-sans-medium text-[20px] leading-[28px] text-[#111111]">3. What cookies are</h2>
          <p className="mt-3">
            Cookies are small text files stored on your device when you visit a website. Similar technologies include
            pixels, local storage and scripts that recognise your browser. Some cookies are set by us (first-party).
            Others are set by another organisation (third-party).
          </p>
        </section>

        <section>
          <h2 className="type-sans-medium text-[20px] leading-[28px] text-[#111111]">4. How we use cookies</h2>
          <p className="mt-3">We only use two categories:</p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              <strong className="text-[#111111]">Necessary cookies</strong> — required to operate the site and to store
              your cookie choice. These do not require consent under the ePrivacy rules for strictly necessary storage.
              Legal basis under GDPR: legitimate interests (Art. 6(1)(f)) in running a secure, functional website, and
              the ePrivacy exception for strictly necessary cookies.
            </li>
            <li>
              <strong className="text-[#111111]">Analytics cookies</strong> — help us understand how the site is used.
              These include Microsoft Clarity, which can record pages you visit and how you interact with them, and
              Vercel Web Analytics. They are off by default and load only after you accept them or enable Analytics in
              Settings. Legal basis: consent (Art. 6(1)(a) GDPR).
            </li>
          </ul>
          <p className="mt-3">
            We do not use advertising, social-media or targeting cookies. We do not sell cookie data.
          </p>
        </section>

        <section>
          <h2 className="type-sans-medium text-[20px] leading-[28px] text-[#111111]">5. Cookies we use</h2>
          <h3 className="type-sans-medium mt-5 text-[16px] leading-[24px] text-[#111111]">Necessary</h3>
          <div className="mt-3">
            <CookieTable
              rows={[
                {
                  name: "phionike_cookie_consent",
                  provider: "Phionike",
                  purpose: "Stores your cookie preferences so we do not ask again on every visit.",
                  duration: "6 months",
                },
              ]}
            />
          </div>

          <h3 className="type-sans-medium mt-8 text-[16px] leading-[24px] text-[#111111]">Analytics — only with consent</h3>
          <div className="mt-3">
            <CookieTable
              rows={[
                {
                  name: "_clck",
                  provider: "Microsoft Clarity (first-party)",
                  purpose: "Persists the Clarity user ID and preferences unique to this site.",
                  duration: "12 months",
                },
                {
                  name: "_clsk",
                  provider: "Microsoft Clarity (first-party)",
                  purpose: "Connects page views into a single Clarity session.",
                  duration: "1 day",
                },
                {
                  name: "CLID",
                  provider: "clarity.ms",
                  purpose: "Identifies the first time Clarity saw this user on any site using Clarity.",
                  duration: "12 months",
                },
                {
                  name: "ANONCHK",
                  provider: "c.clarity.ms / c.bing.com",
                  purpose: "Checks whether the MUID identifier is transferred to ANID, a Microsoft cookie used for advertising measurement.",
                  duration: "Session",
                },
                {
                  name: "MR",
                  provider: "c.bing.com",
                  purpose: "Indicates whether to refresh MUID.",
                  duration: "7 days",
                },
                {
                  name: "MUID",
                  provider: "bing.com",
                  purpose: "Microsoft unique user identifier across Microsoft properties.",
                  duration: "13 months",
                },
                {
                  name: "SM",
                  provider: "c.clarity.ms",
                  purpose: "Used to synchronise the MUID across Microsoft domains.",
                  duration: "Session",
                },
              ]}
            />
          </div>
          <p className="mt-4">
            Vercel Web Analytics is also loaded only with Analytics consent. Vercel states that this product does not
            set cookies and does not store personal data. We still treat it as optional measurement and do not load it
            until you consent.
          </p>
        </section>

        <section>
          <h2 className="type-sans-medium text-[20px] leading-[28px] text-[#111111]">6. Consent and how to change it</h2>
          <p className="mt-3">
            When you first visit, we show a banner with Accept all, Reject and Settings. Rejecting optional cookies is
            as available as accepting them. Analytics stay off until you choose otherwise.
          </p>
          <p className="mt-3">
            You can withdraw or change consent at any time with Cookie settings in the website footer, or by clearing
            the banner choice in your browser and visiting again. Withdrawal does not affect the lawfulness of
            processing before you withdrew consent.
          </p>
          <p className="mt-3">
            We store your choice for 6 months, then ask again. You can also block or delete cookies in your browser.
            Blocking necessary cookies may stop the site from remembering your preference.
          </p>
        </section>

        <section>
          <h2 className="type-sans-medium text-[20px] leading-[28px] text-[#111111]">7. Recipients and transfers</h2>
          <p className="mt-3">
            If you accept analytics, Microsoft (Clarity) and Vercel process related data. Both are established in the
            United States. Where GDPR applies, transfers rely on the providers’ EU-US Data Privacy Framework
            certifications and/or Standard Contractual Clauses, as described in their privacy notices.
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              Microsoft Privacy Statement:{" "}
              <a
                href="https://privacy.microsoft.com/privacystatement"
                className="underline underline-offset-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                privacy.microsoft.com/privacystatement
              </a>
            </li>
            <li>
              Vercel Privacy Policy:{" "}
              <a
                href="https://vercel.com/legal/privacy-policy"
                className="underline underline-offset-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                vercel.com/legal/privacy-policy
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="type-sans-medium text-[20px] leading-[28px] text-[#111111]">8. Your rights</h2>
          <p className="mt-3">
            Depending on where you live, you may have rights to access, correct, delete, restrict or object to
            processing, to data portability, and to withdraw consent. You may also complain to a supervisory authority
            — for example your local EU authority, the UK Information Commissioner, or the Data Protection Board of
            India. See the{" "}
            <Link href="/privacy" className="underline underline-offset-2">
              Privacy Policy
            </Link>{" "}
            for how to exercise these rights.
          </p>
        </section>

        <section>
          <h2 className="type-sans-medium text-[20px] leading-[28px] text-[#111111]">9. Updates</h2>
          <p className="mt-3">
            We will update this policy if we change cookies or providers. The date at the top will change. If we add a
            new optional cookie category, we will ask for consent again.
          </p>
        </section>

        <section>
          <h2 className="type-sans-medium text-[20px] leading-[28px] text-[#111111]">10. Contact</h2>
          <p className="mt-3">
            Questions about cookies or this policy:{" "}
            <a href="mailto:info@phionike.com" className="underline underline-offset-2">
              info@phionike.com
            </a>
            .
          </p>
        </section>
      </LegalShell>
    </>
  )
}
