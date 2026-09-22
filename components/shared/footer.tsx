'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import type { GlobalContent } from '@/content/schema'
import { CookieSettingsButton } from '@/components/shared/cookie-consent'
import { SocialIcon } from '@/components/shared/social-icon'

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

      <div className="relative z-10 section-shell [--section-pad-x:1.25rem] md:[--section-pad-x:1.5rem]">
        {/* Work mobile: centered headings; other pages / desktop stay left-aligned */}
        <div className={`mx-auto w-full max-w-full md:w-fit ${isWork ? "text-center md:text-left" : "text-left"}`}>
          <p className="type-sans-regular text-caption leading-[16.5px] tracking-[2.75px] uppercase text-[#212121]/60">
            {cta.eyebrow}
          </p>

          <div className="mt-8">
            <h2
              className={
                isAbout
                  ? "type-sans-regular text-lead leading-[120%] text-[#212121] md:text-[48px] md:leading-[62px] md:tracking-[-1px]"
                  : "type-sans-regular text-lead leading-[120%] text-[#212121] md:text-[44.8px] md:leading-[51.52px]"
              }
            >
              {cta.headingLine1}
            </h2>
            <h3
              className={
                isAbout
                  ? "type-sans-italic mt-2 text-lead leading-[120%] text-[#FF5B23] md:text-[48px] md:leading-[62px] md:tracking-[-1px]"
                  : "type-sans-italic mt-2 text-lead leading-[120%] text-[#FF5B23] md:text-[44.8px] md:leading-[51.52px]"
              }
            >
              {cta.italicHeadingLine}
            </h3>
          </div>

          <div className="mt-10 flex w-full flex-col items-stretch gap-3 md:w-auto md:flex-row md:items-start md:gap-4">
            <Link
              href={cta.primaryCta.href}
              className="group type-sans-medium inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-5 py-3.5 text-body-sm leading-[21px] text-white transition-opacity hover:opacity-80 md:w-auto md:justify-start md:px-7"
            >
              {cta.primaryCta.label}
              <ArrowUpRight className="h-4 w-4" />
            </Link>

            <Link
              href={cta.secondaryCta.href}
              className="group type-sans-medium inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#212121] bg-transparent px-5 py-3.5 text-body-sm leading-[21px] text-[#212121] transition-opacity hover:opacity-80 md:w-auto md:justify-start md:border-border md:bg-card md:px-7"
            >
              <span>{cta.secondaryCta.label}</span>
              <ArrowUpRight className="h-4 w-4 text-[#212121] md:text-primary" />
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
    <footer className="border-t border-border bg-white">
      <div className="relative">
        <div
          className="flex flex-col justify-between px-5 py-12 md:py-16 md:pr-12 lg:w-[55%] lg:pr-16 lg:pl-[max(var(--section-pad-x),calc((100vw-var(--section-max))/2))]"
        >
          <div>
            <PhionikieLogo />

            {/* Tagline — mobile 13/150% muted; desktop 14/23.8 */}
            <p className="type-sans-regular mt-5 max-w-[560px] text-label leading-[150%] text-[#212121]/60 md:mt-6 md:whitespace-pre-line md:text-body-sm md:leading-[23.8px] md:text-[#212121]">
              {content.description}
            </p>

            {/* Contact | Navigation — nav hidden on mobile */}
            <div className="mt-10 grid grid-cols-1 md:mt-14 md:grid-cols-2 md:gap-20 lg:gap-24">
              <div>
                <p className="type-sans-bold text-caption leading-normal tracking-[1px] uppercase text-[#121212] md:!font-[400] md:tracking-[1.65px] md:text-[#212121]">
                  Contact
                </p>
                <div className="mt-3 space-y-1.5 md:mt-4 md:space-y-2">
                  <a
                    href={`mailto:${content.contact.email}`}
                    className="type-sans-regular block text-body-sm leading-normal text-[#121212] transition-opacity hover:opacity-70 md:text-body-lg md:leading-[21px] md:text-[#212121]"
                  >
                    {content.contact.email}
                  </a>
                  <a
                    href={`tel:${content.contact.phone.replace(/\s/g, "")}`}
                    className="type-sans-regular block text-body-sm leading-normal text-[#121212] transition-opacity hover:opacity-70 md:text-body-lg md:leading-[21px] md:text-[#212121]"
                  >
                    {content.contact.phone}
                  </a>
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-4">
                  {content.social.map((s) => (
                    <a
                      key={s.platform}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.platform}
                      className="inline-flex text-[#121212] transition-opacity hover:opacity-70 md:text-[#212121]"
                    >
                      <SocialIcon platform={s.platform} />
                    </a>
                  ))}
                </div>
              </div>

              <div className="hidden md:block">
                <p className="type-sans-regular text-caption leading-[16.5px] tracking-[1.65px] uppercase text-[#212121]">
                  Navigation
                </p>
                <div className="mt-4 space-y-3">
                  {content.navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="type-sans-regular block text-body-sm leading-[21px] text-[#212121] transition-opacity hover:opacity-70 md:text-body-lg md:leading-[21px]"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="mt-12 hidden border-t border-border md:mt-14 md:block" />
            <div className="mt-10 flex flex-col gap-1 md:mt-6 md:flex-row md:flex-wrap md:items-center md:gap-x-1.5 md:gap-y-1">
              <span className="type-sans-regular text-caption leading-normal text-[#212121]/60 md:text-eyebrow md:leading-[18px]">
                {content.copyright}
              </span>
              {content.copyrightSeparator && (
                <span className="hidden type-sans-regular text-caption leading-[18px] text-[#212121]/60 md:inline md:text-eyebrow">
                  {content.copyrightSeparator}
                </span>
              )}
              <span className="type-sans-semibold text-caption leading-normal text-[#121212] md:!font-[400] md:text-eyebrow md:leading-[18px] md:text-[#212121]">
                {content.location}
              </span>
              <span className="hidden text-[#212121]/60 md:inline">·</span>
              <nav aria-label="Legal" className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 md:mt-0">
                <Link
                  href="/privacy"
                  className="type-sans-regular text-caption leading-normal text-[#212121]/60 transition-opacity hover:opacity-70 md:text-eyebrow md:leading-[18px]"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/cookies"
                  className="type-sans-regular text-caption leading-normal text-[#212121]/60 transition-opacity hover:opacity-70 md:text-eyebrow md:leading-[18px]"
                >
                  Cookie Policy
                </Link>
                <CookieSettingsButton className="type-sans-regular text-left text-caption leading-normal text-[#212121]/60 transition-opacity hover:opacity-70 md:text-eyebrow md:leading-[18px]" />
              </nav>
            </div>
          </div>
        </div>

        <div className="absolute inset-y-0 right-0 hidden overflow-hidden lg:block lg:w-[45%]">
          <Image
            src={content.teamPhotoSrc}
            alt="Phionike team"
            fill
            className="object-cover object-top"
            sizes="45vw"
            priority={false}
          />
        </div>
      </div>
    </footer>
  )
}
