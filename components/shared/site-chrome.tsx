'use client'
import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight, Menu, X } from "lucide-react"
import type { GlobalContent } from "@/content/schema"
import { LiquidGlass } from "@creativoma/liquid-glass"

/** Brand blue, matching the single fill in public/logo.svg. */
const BRAND_BLUE = "#3A39FF"
/** Surface of the full-page mobile menu. */
const MENU_BG = "#131313"

// Derive an active slug from a nav href: "/" → "home", "/work" → "work", etc.
function linkSlug(href: string) {
  return href === "/" ? "home" : href.replace(/^\//, "").replace(/-/g, "-")
}

// lucide-react v1 ships no brand marks, so the three social glyphs are inline.
// LinkedIn is solid and the other two are stroked, matching the reference.
function SocialGlyph({ platform }: { platform: string }) {
  const key = platform.toLowerCase()

  if (key.includes("linkedin")) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    )
  }

  if (key.includes("instagram")) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4.5" />
        <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    )
  }

  if (key.includes("dribbble")) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
        <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32" />
        <path d="M8.56 2.75c4.37 6 6 9.42 8 17.72" />
      </svg>
    )
  }

  // Unknown platform: fall back to the label so nothing silently disappears.
  return <span className="text-sm">{platform}</span>
}

export function SiteNavbar({
  content,
  activePage,
  footer,
}: {
  content: GlobalContent["nav"]
  activePage?: string
  /** Optional: powers the socials/legal block at the foot of the mobile menu. */
  footer?: GlobalContent["footer"]
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const hasOpened = useRef(false)
  const pathname = usePathname()
  const closeMenu = () => setMenuOpen(false)

  // Never let the panel outlive the page it was opened from.
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // While open: freeze the page behind it and wire up Escape. Also close if the
  // viewport grows past md, otherwise the scroll lock would survive on desktop
  // where the panel itself is hidden.
  useEffect(() => {
    if (!menuOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false)
    }
    const desktop = window.matchMedia("(min-width: 768px)")
    const onBreakpoint = () => {
      if (desktop.matches) setMenuOpen(false)
    }

    document.addEventListener("keydown", onKeyDown)
    desktop.addEventListener("change", onBreakpoint)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener("keydown", onKeyDown)
      desktop.removeEventListener("change", onBreakpoint)
    }
  }, [menuOpen])

  // Move focus into the panel on open and hand it back to the trigger on close,
  // but never steal focus on first mount.
  useEffect(() => {
    if (menuOpen) {
      hasOpened.current = true
      panelRef.current?.focus()
    } else if (hasOpened.current) {
      triggerRef.current?.focus()
    }
  }, [menuOpen])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 mx-auto max-w-[1480px] md:top-5 md:px-6 lg:px-10">
        {/* Mobile: full-bleed bar, flush to the top edge */}
        <div className="flex h-16 items-center justify-between border-b border-border bg-background px-5 md:hidden">
          <Link href="/" className="inline-flex items-center" onClick={closeMenu}>
            <Image src="/logo.svg" alt={content.logo} width={104} height={27} priority />
          </Link>

          <div className="flex items-center gap-2.5">
            <Link
              href={content.cta.href}
              className="rounded-full px-5 py-3 text-sm text-white"
              style={{ backgroundColor: BRAND_BLUE }}
            >
              {content.cta.label}
            </Link>
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="inline-flex h-9 w-9 items-center justify-center rounded-[10px] bg-ink text-white"
            >
              <Menu className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Desktop: floating glass card (unchanged) */}
        <div className="hidden md:block">
          <LiquidGlass
            backdropBlur={6}
            displacementScale={0}
            turbulenceBaseFrequency="0.008 0.012"
            tintColor="rgba(255, 255, 255, 0.02)" // near-zero tint, was too strong before
            className="rounded-xl border border-primary/25 bg-background/40 shadow-none px-6 py-4 md:px-8"
            style={{ boxShadow: 'none' }}
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
        </div>
      </header>

      {/* Full-page mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            // overflow-y-auto so the panel still scrolls on short viewports
            className="fixed inset-0 z-[60] overflow-y-auto outline-none md:hidden"
            style={{ backgroundColor: MENU_BG }}
          >
            {/* Decorative brand blobs, both cropped by the viewport edges */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-16 top-36 h-56 w-40 blur-2xl"
              style={{
                backgroundColor: 'rgba(255,84,40,0.20)',
                borderRadius: '55% 45% 50% 50% / 50% 55% 45% 50%',
              }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-14 top-[60%] h-44 w-36 blur-2xl"
              style={{
                backgroundColor: 'rgba(249,189,0,0.16)',
                borderRadius: '50% 50% 45% 55% / 55% 45% 55% 45%',
              }}
            />

            <div className="relative flex min-h-full flex-col">
              {/* Mirrors the closed bar's height and padding so the logo doesn't shift */}
              <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-5">
                <Link href="/" className="inline-flex items-center" onClick={closeMenu}>
                  <Image
                    src="/logo.svg"
                    alt={content.logo}
                    width={104}
                    height={27}
                    // Forces the single-fill blue wordmark to white
                    className="brightness-0 invert"
                  />
                </Link>
                <button
                  type="button"
                  onClick={closeMenu}
                  aria-label="Close menu"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-[10px] border border-white/15 bg-white/5 text-white"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              {/* 40/48 links, indented to leave a gutter for the active dot */}
              <nav aria-label="Mobile" className="px-5 pt-10">
                <ul className="flex flex-col gap-5">
                  {content.links.map((l) => {
                    const isActive = activePage ? linkSlug(l.href) === activePage : false
                    return (
                      <li key={l.href} className="relative pl-7">
                        {isActive && (
                          <span
                            aria-hidden="true"
                            className="absolute left-0.5 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full"
                            style={{ backgroundColor: BRAND_BLUE }}
                          />
                        )}
                        <Link
                          href={l.href}
                          onClick={closeMenu}
                          aria-current={isActive ? 'page' : undefined}
                          className="block text-[40px] leading-[48px] tracking-[-0.02em]"
                          style={{ color: isActive ? BRAND_BLUE : '#FFFFFF' }}
                        >
                          {l.label}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </nav>

              {/* mt-auto pins this block to the bottom on tall viewports */}
              <div className="mt-auto px-5 pb-8 pt-16">
                <Link
                  href={content.cta.href}
                  onClick={closeMenu}
                  className="flex h-12 items-center justify-center rounded-full text-base text-white"
                  style={{ backgroundColor: BRAND_BLUE }}
                >
                  {content.cta.label}
                </Link>

                {footer && (
                  <>
                    <div className="mt-8 flex items-center gap-5 text-white">
                      {footer.social.map((s) => (
                        <a
                          key={s.platform}
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={s.platform}
                          className="inline-flex"
                        >
                          <SocialGlyph platform={s.platform} />
                        </a>
                      ))}
                    </div>

                    <div className="mt-6 border-t border-white/10 pt-4">
                      <p className="text-xs text-white/50">{footer.copyright}</p>
                      <p className="mt-2 text-xs font-medium text-white">{footer.location}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
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
