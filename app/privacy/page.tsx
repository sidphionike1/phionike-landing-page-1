import type { Metadata } from "next"
import Link from "next/link"
import { LegalShell } from "@/components/legal/legal-shell"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo"

export const metadata: Metadata = pageMetadata("privacy")

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd id="ld-privacy-webpage" data={webPageJsonLd("privacy")} />
      <JsonLd id="ld-privacy-breadcrumb" data={breadcrumbJsonLd("privacy")} />
      <LegalShell title="Privacy Policy" updated="22 September 2026">
        <section>
          <h2 className="type-sans-medium text-[20px] leading-[28px] text-[#111111]">1. Who we are</h2>
          <p className="mt-3">
            Phionike Solutions LLP (“Phionike”, “we”, “us”) is a design studio registered in India. Registered office:
            WeWork — Nesco IT Park, Goregaon, Mumbai, India. Email:{" "}
            <a href="mailto:info@phionike.com" className="underline underline-offset-2">
              info@phionike.com
            </a>
            . Telephone: +91 97699 04435.
          </p>
          <p className="mt-3">
            If you are in the EEA or UK, Phionike Solutions LLP is the controller of personal data collected through
            this website. We do not have a statutory Data Protection Officer. Privacy requests go to the email above.
          </p>
        </section>

        <section>
          <h2 className="type-sans-medium text-[20px] leading-[28px] text-[#111111]">2. What this policy covers</h2>
          <p className="mt-3">
            This policy explains how we collect, use, store and share personal data when you use phionike.com, contact
            us, or otherwise deal with us online. Cookie-specific detail is in the{" "}
            <Link href="/cookies" className="underline underline-offset-2">
              Cookie Policy
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="type-sans-medium text-[20px] leading-[28px] text-[#111111]">3. Personal data we collect</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              <strong className="text-[#111111]">Contact enquiries.</strong> If you use the contact form, we receive
              your name, email address, subject and message. The form opens WhatsApp with that text so we can reply. We
              do not run a separate form database on this website.
            </li>
            <li>
              <strong className="text-[#111111]">Correspondence.</strong> Email or WhatsApp messages you send us, and
              our replies.
            </li>
            <li>
              <strong className="text-[#111111]">Analytics, only with consent.</strong> Microsoft Clarity may collect
              pages viewed, clicks, scroll, device and browser information, approximate location derived from IP, and
              session recordings of your use of the site. Vercel Web Analytics may collect aggregated page-view
              measurements.
            </li>
            <li>
              <strong className="text-[#111111]">Technical logs.</strong> Our hosting provider may process IP address,
              user agent and request metadata as part of serving and securing the site.
            </li>
          </ul>
          <p className="mt-3">We do not intentionally collect special-category data through this website.</p>
        </section>

        <section>
          <h2 className="type-sans-medium text-[20px] leading-[28px] text-[#111111]">4. Why we use it and legal bases</h2>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left text-[13px] leading-[18px]">
              <thead>
                <tr className="border-b border-border text-[#111111]">
                  <th className="py-2 pr-3 font-normal">Purpose</th>
                  <th className="py-2 pr-3 font-normal">Data</th>
                  <th className="py-2 font-normal">Legal basis (GDPR)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/70 align-top">
                  <td className="py-2.5 pr-3">Respond to enquiries and run a potential project discussion</td>
                  <td className="py-2.5 pr-3">Name, email, message, WhatsApp content</td>
                  <td className="py-2.5">Art. 6(1)(b) steps toward a contract, or Art. 6(1)(f) legitimate interests in answering you</td>
                </tr>
                <tr className="border-b border-border/70 align-top">
                  <td className="py-2.5 pr-3">Operate and secure the website</td>
                  <td className="py-2.5 pr-3">Technical logs, necessary cookies</td>
                  <td className="py-2.5">Art. 6(1)(f) legitimate interests</td>
                </tr>
                <tr className="border-b border-border/70 align-top">
                  <td className="py-2.5 pr-3">Understand site usage and improve the site</td>
                  <td className="py-2.5 pr-3">Clarity and Vercel analytics</td>
                  <td className="py-2.5">Art. 6(1)(a) consent</td>
                </tr>
                <tr className="align-top">
                  <td className="py-2.5 pr-3">Keep records we must keep, and handle legal claims</td>
                  <td className="py-2.5 pr-3">Correspondence and related records</td>
                  <td className="py-2.5">Art. 6(1)(c) legal obligation and/or Art. 6(1)(f)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="type-sans-medium text-[20px] leading-[28px] text-[#111111]">5. Who we share data with</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              <strong className="text-[#111111]">Meta Platforms / WhatsApp</strong> — when you submit the contact form,
              the message is sent through WhatsApp so we can continue the conversation there.
            </li>
            <li>
              <strong className="text-[#111111]">Vercel</strong> — hosts this website and, if you consent, provides Web
              Analytics.
            </li>
            <li>
              <strong className="text-[#111111]">Microsoft</strong> — Microsoft Clarity, only if you consent to
              analytics.
            </li>
            <li>
              Professional advisers, or authorities, if we are required to share data or need to establish, exercise or
              defend legal claims.
            </li>
          </ul>
          <p className="mt-3">We do not sell your personal data.</p>
        </section>

        <section>
          <h2 className="type-sans-medium text-[20px] leading-[28px] text-[#111111]">6. International transfers</h2>
          <p className="mt-3">
            We are based in India. Some providers (including Vercel, Microsoft and Meta) process data in the United
            States and other countries. Where GDPR or UK GDPR applies, we rely on an adequacy decision (including the
            EU-US Data Privacy Framework where the provider is certified) and/or Standard Contractual Clauses, plus the
            provider’s supplementary measures as described in their documentation.
          </p>
        </section>

        <section>
          <h2 className="type-sans-medium text-[20px] leading-[28px] text-[#111111]">7. How long we keep data</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>Cookie consent records: 6 months, then we ask again.</li>
            <li>Contact and project conversations: for the discussion and a reasonable period afterwards, or longer if needed for a contract, claim or legal duty.</li>
            <li>Analytics data: according to Microsoft Clarity and Vercel retention settings, and only if you consented.</li>
            <li>Hosting logs: for the period our host retains them for security and operations.</li>
          </ul>
        </section>

        <section>
          <h2 className="type-sans-medium text-[20px] leading-[28px] text-[#111111]">8. Your rights</h2>
          <p className="mt-3">
            If GDPR or UK GDPR applies, you may request access, rectification, erasure, restriction, portability, or
            object to processing based on legitimate interests. You may withdraw consent at any time where we rely on
            consent. Withdrawal does not affect processing already carried out.
          </p>
          <p className="mt-3">
            Write to{" "}
            <a href="mailto:info@phionike.com" className="underline underline-offset-2">
              info@phionike.com
            </a>
            . We may need to confirm your identity. You can also complain to a supervisory authority in your country,
            including the UK Information Commissioner’s Office or an EU/EEA authority. In India you may have rights
            under the Digital Personal Data Protection Act, 2023, including the right to complain to the Data
            Protection Board of India once that process is available.
          </p>
        </section>

        <section>
          <h2 className="type-sans-medium text-[20px] leading-[28px] text-[#111111]">9. Children</h2>
          <p className="mt-3">
            This site is aimed at businesses and professional contacts. We do not knowingly collect personal data from
            children.
          </p>
        </section>

        <section>
          <h2 className="type-sans-medium text-[20px] leading-[28px] text-[#111111]">10. Updates</h2>
          <p className="mt-3">
            We may update this policy when our practices or the law change. The date at the top is the latest version.
          </p>
        </section>

        <section>
          <h2 className="type-sans-medium text-[20px] leading-[28px] text-[#111111]">11. Contact</h2>
          <p className="mt-3">
            Phionike Solutions LLP, WeWork — Nesco IT Park, Goregaon, Mumbai, India.{" "}
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
