'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import type { GlobalContent } from '@/content/schema'

// SVG for the custom PHIONIKE logo with strikethrough O
function PhionikieLogo() {
  return (
    <div className="text-2xl font-bold tracking-tight text-primary">
      <svg
        viewBox="0 0 160 32"
        className="h-8 w-auto"
        fill="currentColor"
      >
        <text x="0" y="28" fontSize="28" fontWeight="700" fontFamily="Arial, sans-serif">
          PHIONIKE
        </text>
        {/* Strikethrough on the O */}
        <line x1="88" y1="18" x2="100" y2="18" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </div>
  )
}

// Decorative background shapes
function DecorativeShapes() {
  return (
    <>
      {/* Top-left: overlapping lavender and khaki */}
      <div
        className="absolute -left-12 -top-20 h-48 w-48 rounded-3xl bg-lavender/30 blur-3xl"
        style={{ transform: 'rotate(8deg)' }}
        aria-hidden="true"
      />
      <div
        className="absolute -left-6 -top-12 h-56 w-56 rounded-3xl bg-yellow-100/40 blur-3xl"
        style={{ transform: 'rotate(-6deg)' }}
        aria-hidden="true"
      />

      {/* Top-right: peach */}
      <div
        className="absolute -right-16 -top-32 h-64 w-64 rounded-3xl bg-peach/40 blur-3xl"
        style={{ transform: 'rotate(12deg)' }}
        aria-hidden="true"
      />

      {/* Bottom-right: lavender (partially cropped) */}
      <div
        className="absolute -bottom-32 -right-20 h-80 w-80 rounded-3xl bg-lavender/30 blur-3xl"
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
      <DecorativeShapes />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500">
          {cta.eyebrow}
        </p>

        <div className="mt-8">
          <h2 className="text-5xl font-medium tracking-tight text-neutral-950 md:text-6xl">
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
            className="group inline-flex items-center gap-2 rounded-full bg-neutral-950 px-7 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-80"
          >
            {cta.primaryCta.label}
            <ArrowUpRight className="h-4 w-4" />
          </Link>

          {/* Secondary CTA */}
          <Link
            href={cta.secondaryCta.href}
            className="group inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-7 py-3.5 text-sm font-medium text-neutral-950 transition-opacity hover:opacity-80"
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
    <footer className="border-t border-neutral-200 bg-white px-5 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          {/* Left column */}
          <div>
            {/* Logo */}
            <Link href="/" className="inline-block">
              <div className="text-2xl font-bold tracking-tight text-primary">
                PHIONIKE
              </div>
            </Link>

            {/* Tagline */}
            <p className="mt-6 max-w-sm text-sm text-neutral-600">
              {content.description}
            </p>

            {/* Contact and Navigation sub-grid */}
            <div className="mt-10 grid grid-cols-2 gap-8">
              {/* Contact Column */}
              <div>
                <p className="text-xs uppercase tracking-widest text-neutral-400">
                  Contact
                </p>
                <div className="mt-3 space-y-2">
                  <a
                    href={`mailto:${content.contact.email}`}
                    className="block text-sm text-neutral-700 transition-opacity hover:opacity-60"
                  >
                    {content.contact.email}
                  </a>
                  <a
                    href={`tel:${content.contact.phone}`}
                    className="block text-sm text-neutral-700 transition-opacity hover:opacity-60"
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
                      className="inline-flex items-center gap-1 text-sm text-neutral-700 transition-opacity hover:opacity-60"
                    >
                      {s.platform}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Navigation Column */}
              <div>
                <p className="text-xs uppercase tracking-widest text-neutral-400">
                  Navigation
                </p>
                <div className="mt-3 space-y-2">
                  {content.navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block text-sm text-neutral-700 transition-opacity hover:opacity-60"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="mt-10 border-t border-neutral-200" />

            {/* Copyright */}
            <div className="mt-8 flex flex-wrap items-center gap-2 text-xs text-neutral-500">
              <span>{content.copyright}</span>
              <span className="text-neutral-300">{content.copyrightSeparator}</span>
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
