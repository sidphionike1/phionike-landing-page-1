'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import type { GlobalContent } from '@/content/schema'

// Phionike logo
function PhionikieLogo() {
  return (
    <Link href="/" className="inline-flex items-center">
      <Image src="/logo.svg" alt="Phionike" width={138} height={36} />
    </Link>
  )
}

// Decorative background shapes
function DecorativeShapes() {
  return (
    <>
      {/* Top-left: overlapping lavender and khaki squares */}
      <div
        className="absolute -left-16 -top-24 h-56 w-56 rounded-[2rem] bg-lavender/25 blur-3xl"
        style={{ transform: 'rotate(8deg)' }}
        aria-hidden="true"
      />
      <div
        className="absolute -left-12 -top-16 h-64 w-64 rounded-[2rem] bg-yellow-100/35 blur-3xl"
        style={{ transform: 'rotate(-6deg)' }}
        aria-hidden="true"
      />

      {/* Top-right: peach rounded square */}
      <div
        className="absolute -right-20 -top-40 h-72 w-72 rounded-[2rem] bg-peach/30 blur-3xl"
        style={{ transform: 'rotate(12deg)' }}
        aria-hidden="true"
      />

      {/* Bottom-right: lavender (partially cropped) */}
      <div
        className="absolute -bottom-40 -right-24 h-80 w-80 rounded-[2rem] bg-lavender/20 blur-3xl"
        style={{ transform: 'rotate(-8deg)' }}
        aria-hidden="true"
      />
    </>
  )
}

export function FooterCTA({
  cta,
}: {
  cta: GlobalContent['footerCta']
}) {
  return (
    <section className="relative overflow-hidden bg-white px-5 py-24 md:py-32">
      {/* <DecorativeShapes /> — superseded by the background images below; kept for reference */}

      {/* Mobile background */}
      <Image
        src="/cta-background-mobile.png"
        alt=""
        fill
        aria-hidden="true"
        className="object-cover object-top md:hidden"
      />

      {/* Desktop background */}
      <Image
        src="/cta-background-desktop.png"
        alt=""
        fill
        aria-hidden="true"
        className="hidden object-cover md:block"
      />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
          {cta.eyebrow}
        </p>

        <div className="mt-8">
          <h2 className="text-5xl font-medium tracking-tight text-foreground md:text-6xl">
            {cta.headingLine1}
          </h2>
          <h3 className="mt-2 text-5xl font-medium italic tracking-tight text-primary md:text-6xl">
            {cta.italicHeadingLine}
          </h3>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {/* Primary CTA */}
          <Link
            href={cta.primaryCta.href}
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-80"
          >
            {cta.primaryCta.label}
            <ArrowUpRight className="h-4 w-4" />
          </Link>

          {/* Secondary CTA */}
          <Link
            href={cta.secondaryCta.href}
            className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-3.5 text-sm font-medium text-foreground transition-opacity hover:opacity-80"
          >
            <span>{cta.secondaryCta.label}</span>
            <ArrowUpRight className="h-4 w-4 text-primary" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export function Footer({
  content,
}: {
  content: GlobalContent['footer']
}) {
  return (
    <footer className="border-t border-border bg-card px-5 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          {/* Left column */}
          <div>
            {/* Logo */}
            <PhionikieLogo />

            {/* Tagline */}
            <p className="mt-6 max-w-sm text-sm text-muted-foreground">
              {content.description}
            </p>

            {/* Contact and Navigation sub-grid */}
            <div className="mt-10 grid grid-cols-2 gap-8">
              {/* Contact Column */}
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  Contact
                </p>
                <div className="mt-3 space-y-2">
                  <a
                    href={`mailto:${content.contact.email}`}
                    className="block text-sm text-foreground transition-opacity hover:opacity-70"
                  >
                    {content.contact.email}
                  </a>
                  <a
                    href={`tel:${content.contact.phone}`}
                    className="block text-sm text-foreground transition-opacity hover:opacity-70"
                  >
                    {content.contact.phone}
                  </a>
                </div>
                {/* Social Links */}
                <div className="mt-4 flex flex-wrap gap-x-3 gap-y-2">
                  {content.social.map((s) => (
                    <a
                      key={s.platform}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-foreground transition-opacity hover:opacity-70"
                    >
                      {s.platform}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Navigation Column */}
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  Navigation
                </p>
                <div className="mt-3 space-y-2">
                  {content.navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block text-sm text-foreground transition-opacity hover:opacity-70"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="mt-10 border-t border-border" />

            {/* Copyright and Location */}
            <div className="mt-8 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span>{content.copyright}</span>
              {content.copyrightSeparator && (
                <span className="text-border">{content.copyrightSeparator}</span>
              )}
              <span>{content.location}</span>
            </div>
          </div>

          {/* Right column - Team photo */}
          <div className="relative h-96 w-full overflow-hidden rounded-lg lg:h-full lg:min-h-[500px]">
            <Image
              src={content.teamPhotoSrc}
              alt="Phionike team"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </footer>
  )
}
