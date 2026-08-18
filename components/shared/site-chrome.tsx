'use client'
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import type { GlobalContent } from "@/content/schema"
import { LiquidGlass } from "@creativoma/liquid-glass"


// Derive an active slug from a nav href: "/" → "home", "/work" → "work", etc.
function linkSlug(href: string) {
  return href === "/" ? "home" : href.replace(/^\//, "").replace(/-/g, "-")
}


export function SiteNavbar({ content, activePage }: { content: GlobalContent["nav"]; activePage?: string }) {
  return (
    <header className="fixed inset-x-0 top-5 z-50 mx-auto max-w-[1480px] px-6 md:px-10">
      <LiquidGlass
        backdropBlur={6}
        displacementScale={0}
        turbulenceBaseFrequency="0.008 0.012"
        tintColor="rgba(255, 255, 255, 0.02)" // near-zero tint, was too strong before
        className="rounded-xl border border-primary/25 bg-background/40 shadow-none px-6 py-4 md:px-8"
        style={{boxShadow: 'none'}}
      >
        <div className="flex items-center justify-between">
          <Link href="/" className="inline-flex items-center">
            <Image src="/logo.svg" alt={content.logo} width={138} height={36} priority />
          </Link>
          <nav className="hidden gap-12 md:flex" aria-label="Primary">
            {content.links.map((l) => {
              const isActive = activePage ? linkSlug(l.href) === activePage : false
              return (
                <Link key={l.href} href={l.href} className="flex flex-col items-center gap-0.5 text-sm">
                  {l.label}
                  {isActive && <span className="block h-0.5 w-full rounded-full bg-foreground" aria-hidden="true" />}
                </Link>
              )
            })}
          </nav>
          <Link href={content.cta.href} className="rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground">
            {content.cta.label}
          </Link>
        </div>
      </LiquidGlass>
    </header>
  )
}

export function SiteFooter({
  cta,
  content,
}: {
  cta: GlobalContent["footerCta"]
  content: GlobalContent["footer"]
}) {
  return (
    <>
      <section className="bg-ink px-5 py-20 text-primary-foreground">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs uppercase">{cta.eyebrow}</p>
          <div className="mx-auto mt-6 max-w-2xl">
            <h2 className="font-serif text-5xl leading-none md:text-7xl">
              {cta.headingLine1}
            </h2>
            {cta.italicHeadingLine && (
              <p className="mt-2 font-serif text-5xl italic leading-none md:text-7xl text-primary">
                {cta.italicHeadingLine}
              </p>
            )}
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <Link
              href={cta.primaryCta.href}
              className="rounded-full bg-background px-8 py-4 font-semibold text-foreground"
            >
              {cta.primaryCta.label}
            </Link>
            <Link
              href={cta.secondaryCta.href}
              className="rounded-full border border-primary-foreground px-8 py-4 font-semibold"
            >
              {cta.secondaryCta.label}
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-ink px-5 pb-10 text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 border-t border-primary-foreground/20 pt-12 md:grid-cols-3">
          <p className="max-w-sm text-sm text-primary-foreground/60">{content.description}</p>
          <div>
            <p className="footer-label">Based in</p>
            <p className="mt-3">{content.location}</p>
            <a className="mt-6 block" href={`mailto:${content.contact.email}`}>
              {content.contact.email}
            </a>
            <a className="mt-2 block" href={`tel:${content.contact.phone}`}>
              {content.contact.phone}
            </a>
          </div>
          <div className="flex flex-col gap-2">
            {content.social.map((s) => (
              <a key={s.platform} href={s.href} className="flex items-center gap-1">
                {s.platform}
                <ArrowUpRight size={14} />
              </a>
            ))}
          </div>
        </div>
        <p className="mx-auto mt-12 max-w-7xl text-xs text-primary-foreground/50">
          {content.copyright}
        </p>
      </footer>
    </>
  )
}
