import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { GlobalContent } from "@/content/schema"

// ─── WorkFooterCTA ───────────────────────────────────────────────────────────
// Light-background footer CTA with decorative colored rectangle shapes and
// a two-line heading: plain text + serif italic accent line.

export function WorkFooterCTA({
  cta,
}: {
  cta: GlobalContent["footerCta"]
}) {
  // Split "Have a project in mind? We'd love to hear about it." into two lines
  const parts = cta.heading.split("? ")
  const headingLine = parts[0] ? parts[0] + "?" : cta.heading
  const accentLine = parts[1] ?? ""

  return (
    <section className="relative overflow-hidden bg-background py-28 md:py-36">
      {/* Decorative shapes — corners */}
      <div
        className="absolute left-10 top-10 h-24 w-24 rounded-2xl bg-lavender opacity-80 md:left-16 md:top-14 md:h-28 md:w-28"
        aria-hidden="true"
      />
      <div
        className="absolute left-16 top-40 h-16 w-16 rounded-2xl bg-mustard opacity-70 md:left-24 md:top-48"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-16 left-8 h-14 w-14 rounded-xl bg-lavender opacity-50"
        aria-hidden="true"
      />
      <div
        className="absolute right-10 top-10 h-28 w-28 rounded-2xl opacity-70 md:right-16 md:top-12 md:h-32 md:w-32"
        style={{ backgroundColor: "#fce3d7" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-12 h-20 w-20 rounded-2xl bg-lavender opacity-50 md:bottom-14 md:right-20"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <p className="eyebrow tracking-[0.25em]">Ready to work together?</p>

        <h2 className="mt-5 text-4xl font-medium leading-tight tracking-tight md:text-6xl">
          {headingLine}
        </h2>

        {accentLine && (
          <p
            className="mt-1 font-serif text-4xl italic leading-tight text-accent md:text-6xl"
          >
            {accentLine}
          </p>
        )}

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={cta.primaryCta.href}
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-4 text-sm font-semibold text-background"
          >
            {cta.primaryCta.label}
            <ArrowUpRight size={15} />
          </Link>
          <Link
            href={cta.secondaryCta.href}
            className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-4 text-sm font-semibold text-foreground"
          >
            {cta.secondaryCta.label}
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─── WorkFooter ──────────────────────────────────────────────────────────────
// Light-background footer with logo, description, contact, nav, and team photo.

export function WorkFooter({ content }: { content: GlobalContent["footer"] }) {
  return (
    <footer className="border-t border-border bg-background px-5 pb-10 pt-14 md:px-6">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 md:grid-cols-[1fr_auto_auto_1fr] md:gap-8">
        {/* Logo + description + contact */}
        <div>
          <Link href="/" className="text-xl font-bold tracking-tighter text-primary">
            PHIONIKE
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {content.description}
          </p>

          <div className="mt-8">
            <p className="footer-label text-foreground/50">Contact</p>
            <a
              href={`mailto:${content.contact.email}`}
              className="mt-3 block text-sm text-foreground"
            >
              {content.contact.email}
            </a>
            <a
              href={`tel:${content.contact.phone}`}
              className="mt-1 block text-sm text-foreground"
            >
              {content.contact.phone}
            </a>
            <div className="mt-3 flex gap-4">
              {content.social.map((s) => (
                <a
                  key={s.platform}
                  href={s.href}
                  className="inline-flex items-center gap-1 text-sm text-foreground"
                >
                  {s.platform}
                  <ArrowUpRight size={12} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <p className="footer-label text-foreground/50">Navigation</p>
          <nav className="mt-3 flex flex-col gap-2">
            {content.navLinks.map((l) => (
              <Link key={l.href} href={l.href} className="text-sm text-foreground">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Team photo */}
        <div className="relative hidden overflow-hidden rounded-2xl md:block md:col-span-2 md:max-w-sm">
          <Image
            src="/editorial/team-photo.png"
            alt="The Phionike studio team"
            width={480}
            height={360}
            className="h-full w-full object-cover"
            sizes="(max-width:1024px) 0vw, 30vw"
          />
        </div>
      </div>

      <p className="mx-auto mt-10 max-w-7xl text-xs text-muted-foreground">
        {content.copyright}
      </p>
    </footer>
  )
}
