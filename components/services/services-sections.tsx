import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { CSSProperties } from "react"
import type { GlobalContent, ServicesPage } from "@/content/schema"
import { ProcessCardStack } from "./process-card-stack"
import { cn } from "@/lib/utils"

const bands = {
  cobalt: "bg-primary text-primary-foreground",
  lavender: "bg-lavender text-foreground",
  terracotta: "bg-accent text-accent-foreground",
  mustard: "bg-mustard text-foreground",
} as const

/** Mobile-only band fills from Figma 2206:21368 / 21401 / 21433 / 21460. */
const MOBILE_BAND_BG = {
  cobalt: "#3A39FF",
  lavender: "#DCB8FF",
  terracotta: "#FF5B23",
  mustard: "#F2BB06",
} as const

const isLightBand = (bandColor: string) =>
  bandColor === "lavender" || bandColor === "mustard"

/** Numbered stage labels matching the desktop artboard. */
function stageLabel(step: GlobalContent["processSteps"][number]) {
  switch (step.id) {
    case "clarify":
      return "01  CLARIFY"
    case "shape":
      return "02  DESIGN"
    case "build-iterate":
      return "03  FROM 0 TO 1"
    case "scale":
      return "04  BUILD"
    default:
      return `${step.number}  ${step.heroLabel}`
  }
}

/** Multi-colour industry dots (cycles). */
const SECTOR_DOTS = ["#F5B800", "#FF5B23", "#9B6BFF", "#C5D94E"] as const
const MOBILE_SECTOR_DOTS = ["#F2BB06", "#FF5B23", "#3A39FF", "#DCB8FF"] as const

export function ServicesHero({
  content,
  steps,
}: {
  content: ServicesPage["hero"]
  steps: GlobalContent["processSteps"]
}) {
  return (
    <section className="section-shell grid grid-cols-1 items-start gap-0 [--section-pad-x:1.25rem] md:gap-12 md:pb-20 md:pt-32 md:[--section-pad-x:1.5rem] lg:grid-cols-[minmax(0,1fr)_480px] lg:gap-x-10 lg:pb-[112px] lg:pt-40">
      <div className="flex w-full flex-col items-start gap-6 pt-28 md:gap-0 md:pt-0">
        <p className="type-vf-regular text-[11px] leading-normal tracking-normal uppercase text-[#212121]/60 max-md:!font-[400] md:mt-[25px] md:![font-family:var(--font-season-sans),ui-sans-serif,system-ui,sans-serif] md:!font-[550] md:text-caption md:leading-[16.5px] md:tracking-[3.6px] md:[font-variation-settings:normal]">
          <span className="md:inline">THINK. DESIGN . SCALE</span>
        </p>
        <div className="flex w-full flex-col gap-1 md:gap-0">
          <h1 className="type-sans-medium text-[36px] leading-[120%] tracking-normal text-[#121212] max-md:whitespace-normal md:mt-5 md:whitespace-pre-line md:text-hero md:leading-[130%] md:tracking-[-2px]">
            {content.headlineDark}
          </h1>
          <p className="type-sans-medium text-[32px] leading-[120%] tracking-normal text-[#FF5B23] md:text-display-md md:leading-[130%] md:tracking-[-2px]">
            {content.headlineAccent}
          </p>
        </div>
        <p className="type-sans-regular text-[14px] leading-[150%] tracking-normal text-[#212121]/60 md:mt-6 md:max-w-[420px] md:text-body-sm md:leading-[20px]">
          {content.body}
        </p>
        <div className="flex w-full flex-col gap-3 pt-2 md:mt-8 md:flex-row md:flex-wrap md:items-center md:gap-6 md:pt-0">
          <Link
            href={content.primaryCta.href}
            className="type-sans-medium inline-flex h-[45px] w-full items-center justify-center gap-2 rounded-full border-0 bg-[#121212] px-6 py-[14px] text-[14px] leading-normal text-white max-md:!font-[650] md:h-auto md:w-auto md:bg-ink md:px-7 md:py-4 md:text-body-sm md:leading-[21px]"
          >
            {content.primaryCta.label}
            <ArrowUpRight size={15} className="hidden md:inline" />
          </Link>
          <Link
            href={content.secondaryCta.href}
            className="type-sans-medium inline-flex h-[45px] w-full items-center justify-center gap-2 rounded-full border border-[#121212] bg-transparent px-6 py-[14px] text-[14px] leading-normal text-[#121212] max-md:!font-[650] md:h-auto md:w-auto md:border-0 md:bg-transparent md:px-0 md:py-0 md:text-body-sm md:leading-[21px]"
          >
            {content.secondaryCta.label}
            <ArrowUpRight size={15} className="hidden text-[#3A39FF] md:inline" />
          </Link>
        </div>
      </div>

      <div className="w-full py-20 md:py-0">
        <ProcessCardStack steps={steps} />
      </div>
    </section>
  )
}

export function Capabilities({
  intro,
  steps,
  strips,
}: {
  intro: ServicesPage["capabilitiesIntro"]
  steps: GlobalContent["processSteps"]
  strips: ServicesPage["photoStrips"]
}) {
  return (
    <section id="capabilities">
      {/* Capabilities heading only — photos sit above the section they name */}
      <div className="md:bg-white">
        <div className="section-shell pt-0 pb-20 md:py-28">
          <p
            className="type-sans-semibold uppercase"
            style={{
              color: "rgba(68, 68, 68, 1)",
              fontSize: 14,
              fontWeight: 600,
              lineHeight: "100%",
              letterSpacing: "0.1em",
            }}
          >
            {intro.eyebrow}
          </p>
          <h2 className="type-sans-regular mt-5 max-w-4xl text-lead leading-[120%] tracking-[-1px] text-[#111111] md:text-display-sm">
            <span className="block">{intro.headingPlain}</span>
            <span className="block"><span>for </span><span className="text-[#FF5B23]">{intro.headingAccent}</span></span>
          </h2>
        </div>
      </div>

      {steps.map((step) => {
        // Image filename = title of the section BELOW it
        const strip = strips.find((s) => s.beforeStepId === step.id)
        const light = isLightBand(step.bandColor)

        return (
          <div key={step.id}>
            {strip ? (
              <div className="relative h-[200px] w-full overflow-hidden md:h-[540px]">
                <Image
                  src={strip.src}
                  alt={strip.alt}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            ) : null}
            <ProcessBand step={step} light={light} />
          </div>
        )
      })}
    </section>
  )
}

function ProcessBand({
  step,
  light,
}: {
  step: GlobalContent["processSteps"][number]
  light: boolean
}) {
  return (
    <article
      className={cn(
        "relative overflow-hidden py-12 md:flex md:h-[680px] md:items-center md:py-0",
        bands[step.bandColor],
        "max-md:![background-color:var(--band-mobile)]",
      )}
      style={
        {
          "--band-mobile": MOBILE_BAND_BG[step.bandColor],
        } as CSSProperties
      }
    >
      {/* Background tilted square (Figma) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 top-2/3 hidden h-[280px] w-[280px] -translate-y-1/2 rotate-12 opacity-40 md:block lg:right-[15%] lg:h-[340px] lg:w-[340px]"
      >
        <Image
          src="/services/section-square-block.png"
          alt=""
          fill
          className="object-contain"
          sizes="340px"
        />
      </div>

      <div className="section-shell relative flex flex-col gap-6 [--section-pad-x:1.25rem] md:grid md:items-start md:gap-10 md:[--section-pad-x:1.5rem] lg:grid-cols-[65fr_35fr] lg:gap-16">
        <div className="flex flex-col gap-3 md:block">
          {/* Step label — mobile: 14 / 2px / 0.8 · desktop: Sans Medium 20 / 4px */}
          <span
            className={cn(
              "type-sans-medium block text-[14px] leading-normal tracking-[2px] opacity-80 md:text-[20px] md:tracking-[4px] md:opacity-100",
              step.id === "shape" ? "max-md:!font-[550]" : "max-md:!font-[400]",
              light ? "text-[#121212]" : "text-white",
            )}
            style={{ fontWeight: 550 }}
          >
            {stageLabel(step)}
          </span>
          {/* Heading — mobile: VF Medium 26 / 120% · desktop: 52 / 120% / -2px */}
          <h3
            className={cn(
              "type-vf-medium max-w-xl text-[26px] leading-[120%] tracking-normal md:mt-8 md:text-[52px] md:tracking-[-2px]",
              light ? "text-[#121212]" : "text-white",
            )}
            style={{
              fontWeight: 550,
              fontVariationSettings: '"wght" 550, "SERF" 0, "slnt" 0',
            }}
          >
            {formatProcessHeading(step.heading)}
          </h3>
          {/* Body — mobile: 15 / 150% / 0.9 · desktop: Sans Regular 20 / 140% */}
          <p
            className={cn(
              "type-sans-regular max-w-xl text-[15px] leading-[150%] md:mt-6 md:text-[20px] md:leading-[140%]",
              light ? "text-[#121212]/90" : "text-white/90",
            )}
            style={{ fontWeight: 400, letterSpacing: 0 }}
          >
            {step.longDescription}
          </p>
        </div>

        {/* Align list titles with the process heading on desktop */}
        <div className="flex flex-col gap-6 pt-3 md:gap-10 md:pt-0 lg:pt-[3.25rem]">
          <List title="What We Do" items={step.whatWeDo} light={light} />
          <List title="Client Outcomes" items={step.clientOutcomes} light={light} />
        </div>
      </div>
    </article>
  )
}

/** Soft line break for long process headings so line-height reads clearly. */
function formatProcessHeading(heading: string) {
  const patterns = [
    /^(Understand the right )\s+(problem before building the solution\.?)$/i,
    /^(Turn insights into )\s+(experiences people can understand and use\.?)$/i,
    /^(Design, refine and improve)\s+(through continuous learning\.?)$/i,
    /^(Create systems that )\s+(support long[- ]term growth\.?)$/i,
  ]

  for (const re of patterns) {
    const m = heading.match(re)
    if (m) {
      return (
        <>
          {m[1]}
          <br />
          {m[2]}
        </>
      )
    }
  }

  return heading
}

function List({
  title,
  items,
  light,
}: {
  title: string
  items: string[]
  light: boolean
}) {
  return (
    <div className="flex flex-col gap-3 md:block">
      {/* Section heading — mobile: Sans Medium 16 · desktop: Sans Bold 20 / -0.5px */}
      <h4
        className={cn(
          "type-sans-bold text-[16px] leading-normal tracking-normal max-md:!font-[550] md:text-[20px] md:tracking-[-0.5px]",
          light ? "text-[#121212]" : "text-white",
        )}
        style={{ fontWeight: 750 }}
      >
        {title}
      </h4>
      <ul className="flex flex-col gap-3 md:mt-4 md:gap-2.5">
        {items.map((i) => (
          <li
            key={i}
            className={cn(
              "type-sans-regular flex items-center gap-2 text-[14px] leading-[140%] md:gap-3 md:text-[18px]",
              light ? "text-[#121212]/80 md:text-[#121212]/90" : "text-white/90",
            )}
            style={{ fontWeight: 400, letterSpacing: 0 }}
          >
            <span
              aria-hidden
              className={cn(
                "size-1.5 shrink-0 rounded-full",
                light
                  ? "bg-[#121212] opacity-60 md:opacity-100"
                  : "bg-white opacity-80 md:opacity-100",
              )}
            />
            {i}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function SectorGrid({ content }: { content: ServicesPage["sectorGrid"] }) {
  return (
    <section className="section-shell py-14 [--section-pad-x:1.25rem] md:py-28 md:[--section-pad-x:1.5rem]">
      <div className="flex flex-col gap-4 md:block">
        <h2 className="type-vf-regular text-[28px] leading-[120%] tracking-normal text-[#121212] md:max-w-4xl md:text-display-xl md:tracking-[-1px] md:text-[#111111]">
          {content.heading}
          <span className="text-[#FF5B23] max-md:block">
            <span className="hidden md:inline"> </span>
            {content.headingAccent}
          </span>
        </h2>
        <p className="type-vf-regular text-[14px] leading-[150%] text-[#212121]/60 md:mt-6 md:max-w-2xl md:text-title md:leading-[29.7px] md:tracking-[-0.44px] md:text-[#121212]/60">
          {content.subheading}
        </p>
      </div>
      <div className="mt-7 border-t border-black/10 md:mt-16 md:border-border">
        {content.sectors.map((row, idx) => (
          <div
            key={row.sector}
            className="flex flex-col gap-2 border-b border-black/10 py-[18px] md:grid md:grid-cols-[18rem_1fr] md:gap-6 md:border-border md:py-8"
          >
            <h3 className="type-vf-regular flex items-center gap-2 text-[16px] leading-normal tracking-normal text-[#121212] md:items-start md:gap-3 md:text-title-md md:leading-[29.7px] md:tracking-[-0.44px] md:text-[#1A1A1A]">
              <span
                aria-hidden
                className="size-2 shrink-0 rounded-full [background-color:var(--dot)] md:mt-2 md:[background-color:var(--dot-md)]"
                style={
                  {
                    "--dot": MOBILE_SECTOR_DOTS[idx % MOBILE_SECTOR_DOTS.length],
                    "--dot-md": SECTOR_DOTS[idx % SECTOR_DOTS.length],
                  } as CSSProperties
                }
              />
              {row.sector}
            </h3>
            <p className="type-sans-regular text-[13px] leading-[140%] text-[#212121]/60 md:hidden">
              {row.clients.join(", ")}
            </p>
            <div className="hidden flex-wrap gap-x-8 gap-y-4 md:flex">
              {row.clients.map((c) => (
                <span
                  key={c}
                  className="type-vf-regular text-label leading-[140%] text-[#6B6B6B]/60 md:text-title-sm md:leading-[26px] md:text-[#6B6B6B]"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Link
        href={content.cta.href}
        className="type-sans-medium mt-12 hidden items-center gap-2 border-b border-foreground pb-1 text-body text-[#111111] md:inline-flex"
      >
        {content.cta.label}
        <ArrowUpRight size={16} />
      </Link>
    </section>
  )
}
