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
  typography = "home",
}: {
  cta: GlobalContent['footerCta']
  typography?: "home" | "about" | "work" | "services"
}) {
  const isAbout = typography === "about" || typography === "services"
  const isWork = typography === "work"

  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-32">
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

      <div className="relative z-10 section-shell">
        <div className="mx-auto max-w-3xl text-center">
          <p
            className={
              isAbout || isWork
                ? "type-sans-regular text-caption leading-[16.5px] tracking-[2px] uppercase text-[#212121]/60"
                : "type-sans-regular text-caption leading-[16.5px] text-[#212121]/60"
            }
          >
            {cta.eyebrow}
          </p>

          <div className="mt-8">
            <h2
              className={
                isAbout
                  ? "type-sans-regular text-lead leading-[120%] text-[#212121] md:text-display md:leading-[62px] md:tracking-[-1px]"
                  : "type-sans-regular text-lead leading-[120%] text-[#212121] md:text-display-sm md:leading-[51.52px]"
              }
            >
              {cta.headingLine1}
            </h2>
            <h3
              className={
                isAbout
                  ? "type-sans-italic mt-2 text-lead leading-[120%] text-[#FF5B23] md:text-display md:leading-[62px] md:tracking-[-1px]"
                  : "type-sans-italic mt-2 text-lead leading-[120%] text-[#FF5B23] md:text-display-sm md:leading-[51.52px]"
              }
            >
              {cta.italicHeadingLine}
            </h3>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={cta.primaryCta.href}
              className="group type-sans-medium inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-body-sm leading-[21px] text-white transition-opacity hover:opacity-80"
            >
              {cta.primaryCta.label}
              <ArrowUpRight className="h-4 w-4" />
            </Link>

            <Link
              href={cta.secondaryCta.href}
              className="group type-sans-medium inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-3.5 text-body-sm leading-[21px] text-[#212121] transition-opacity hover:opacity-80"
            >
              <span>{cta.secondaryCta.label}</span>
              <ArrowUpRight className="h-4 w-4 text-primary" />
            </Link>
          </div>
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
    <footer className="border-t border-border bg-card py-16">
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          {/* Left column */}
          <div>
            {/* Logo */}
            <PhionikieLogo />

            {/* Tagline */}
            <p className="type-sans-regular mt-6 max-w-sm text-label leading-[150%] text-[#212121]/60 md:text-body-sm md:leading-[23.8px] md:text-[#212121]">
              {content.description}
            </p>

            {/* Contact and Navigation sub-grid */}
            <div className="mt-10 grid grid-cols-2 gap-8">
              {/* Contact Column */}
              <div>
                <p className="type-sans-bold text-caption leading-[16.5px] tracking-[1.65px] uppercase text-[#212121]">
                  Contact
                </p>
                <div className="mt-3 space-y-2">
                  <a
                    href={`mailto:${content.contact.email}`}
                    className="type-sans-regular block text-body-sm leading-[21px] text-[#212121] transition-opacity hover:opacity-70 md:text-body-lg"
                  >
                    {content.contact.email}
                  </a>
                  <a
                    href={`tel:${content.contact.phone}`}
                    className="type-sans-regular block text-body-sm leading-[21px] text-[#212121] transition-opacity hover:opacity-70 md:text-body-lg"
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
                      className="type-sans-regular inline-flex items-center gap-1 text-body-sm leading-[19.5px] text-[#212121] transition-opacity hover:opacity-70 md:text-body-lg"
                    >
                      {s.platform}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Navigation Column */}
              <div>
                <p className="type-sans-bold text-caption leading-[16.5px] tracking-[1.65px] uppercase text-[#212121]">
                  Navigation
                </p>
                <div className="mt-3 space-y-2">
                  {content.navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="type-sans-regular block text-body-sm leading-[21px] text-[#212121] transition-opacity hover:opacity-70 md:text-body-lg"
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
            <div className="mt-8 flex flex-wrap items-center gap-2">
              <span className="type-sans-regular text-caption leading-[18px] text-[#212121]/60">
                {content.copyright}
              </span>
              {content.copyrightSeparator && (
                <span className="type-sans-regular text-caption leading-[18px] text-[#212121]/60">
                  {content.copyrightSeparator}
                </span>
              )}
              <span className="type-sans-semibold text-caption leading-[18px] text-[#212121]">
                {content.location}
              </span>
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
