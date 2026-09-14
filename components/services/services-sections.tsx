import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { GlobalContent, ServicesPage } from "@/content/schema"
import { ProcessCardStack } from "./process-card-stack"
import { cn } from "@/lib/utils"

const bands = {
  cobalt: "bg-primary text-primary-foreground",
  lavender: "bg-lavender text-foreground",
  terracotta: "bg-accent text-accent-foreground",
  mustard: "bg-mustard text-foreground",
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

export function ServicesHero({
  content,
  steps,
}: {
  content: ServicesPage["hero"]
  steps: GlobalContent["processSteps"]
}) {
  return (
    <section className="section-shell grid grid-cols-1 items-start gap-12 pb-20 pt-32 lg:grid-cols-[minmax(0,1fr)_480px] lg:gap-x-10 lg:pb-24 lg:pt-40">
      <div className="flex flex-col">
        <p className="type-sans-medium mt-[25px] text-caption leading-[16.5px] tracking-[3.6px] uppercase text-[#212121]/60">
          {content.eyebrow}
        </p>
        <h1 className="type-sans-medium mt-5 whitespace-pre-line text-[36px] leading-[120%] tracking-[-2px] text-[#121212] md:text-hero md:leading-[130%]">
          {content.headlineDark}
        </h1>
        <p className="type-sans-medium text-[36px] leading-[120%] tracking-[-2px] text-[#FF5B23] md:text-display-md md:leading-[130%] md:tracking-[-2px]">
          {content.headlineAccent}
        </p>
        <p className="type-sans-regular mt-6 max-w-[420px] text-body-sm leading-[20px] text-[#212121]/60">
          {content.body}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <Link
            href={content.primaryCta.href}
            className="type-sans-medium inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 text-body-sm leading-[21px] text-white"
          >
            {content.primaryCta.label}
            <ArrowUpRight size={15} />
          </Link>
          <Link
            href={content.secondaryCta.href}
            className="type-sans-medium inline-flex items-center gap-2 text-body-sm leading-[21px] text-[#121212]"
          >
            {content.secondaryCta.label}
            <ArrowUpRight size={15} className="text-[#3A39FF]" />
          </Link>
        </div>
      </div>

      <ProcessCardStack steps={steps} />
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
      <div className="section-shell py-20 md:py-28">
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

      {steps.map((step) => {
        // Image filename = title of the section BELOW it
        const strip = strips.find((s) => s.beforeStepId === step.id)
        const light = isLightBand(step.bandColor)

        return (
          <div key={step.id}>
            {strip ? (
              <div className="relative aspect-[4/3] w-full md:aspect-[32/9]">
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
      className={cn("relative overflow-hidden py-20 md:py-28", bands[step.bandColor])}
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

      <div className="section-shell relative grid items-start gap-10 lg:grid-cols-[65fr_35fr] lg:gap-16">
        <div>
          {/* Step label — desktop: Sans Medium 20 / 4px tracking */}
          <span
            className={cn(
              "type-sans-medium block text-[14px] leading-normal tracking-[2.5px] md:text-[20px] md:tracking-[4px]",
              light ? "text-[#121212]" : "text-white",
            )}
            style={{ fontWeight: 550 }}
          >
            {stageLabel(step)}
          </span>
          {/* Heading — desktop: VF Medium 52 / 120% / -2px */}
          <h3
            className={cn(
              "type-vf-medium mt-5 max-w-xl text-[22px] leading-[120%] tracking-[-0.5px] md:mt-8 md:text-[52px] md:tracking-[-2px]",
              light ? "text-[#121212]" : "text-white",
            )}
            style={{
              fontWeight: 550,
              fontVariationSettings: '"wght" 550, "SERF" 0, "slnt" 0',
            }}
          >
            {formatProcessHeading(step.heading)}
          </h3>
          {/* Body — desktop: Sans Regular 20 / 140% */}
          <p
            className={cn(
              "type-sans-regular mt-4 max-w-xl text-[14px] leading-[140%] md:mt-6 md:text-[20px]",
              light ? "text-[#121212]/90" : "text-white/90",
            )}
            style={{ fontWeight: 400, letterSpacing: 0 }}
          >
            {step.longDescription}
          </p>
        </div>

        {/* Align list titles with the process heading on desktop */}
        <div className="flex flex-col gap-8 md:gap-10 lg:pt-[3.25rem]">
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
    <div>
      {/* Section heading — desktop: Sans Bold 20 / -0.5px */}
      <h4
        className={cn(
          "type-sans-bold text-[16px] leading-normal tracking-[-0.5px] md:text-[20px]",
          light ? "text-[#121212]" : "text-white",
        )}
        style={{ fontWeight: 750 }}
      >
        {title}
      </h4>
      <ul className="mt-3 flex flex-col gap-2 md:mt-4 md:gap-2.5">
        {items.map((i) => (
          <li
            key={i}
            className={cn(
              "type-sans-regular flex items-center gap-3 text-[14px] leading-[140%] md:text-[18px]",
              light ? "text-[#121212]/90" : "text-white/90",
            )}
            style={{ fontWeight: 400, letterSpacing: 0 }}
          >
            <span
              aria-hidden
              className={cn(
                "size-1.5 shrink-0 rounded-full",
                light ? "bg-[#121212]" : "bg-white",
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
    <section className="section-shell py-20 md:py-28">
      <h2 className="type-vf-regular max-w-4xl text-lead leading-[120%] tracking-[-1px] text-[#111111] md:text-display-xl">
        {content.heading}{" "}
        <span className="text-[#FF5B23]">{content.headingAccent}</span>
      </h2>
      <p className="type-vf-regular mt-6 max-w-2xl text-body-sm leading-[150%] text-[#121212]/60 md:text-title md:leading-[29.7px] md:tracking-[-0.44px]">
        {content.subheading}
      </p>
      <div className="mt-16 border-t border-border">
        {content.sectors.map((row, idx) => (
          <div
            key={row.sector}
            className="grid gap-6 border-b border-border py-8 md:grid-cols-[18rem_1fr]"
          >
            <h3 className="type-vf-regular flex items-start gap-3 text-body-lg leading-[140%] tracking-[-0.44px] text-[#1A1A1A] md:text-title-md md:leading-[29.7px]">
              <span
                aria-hidden
                className="mt-2 size-2 shrink-0 rounded-full"
                style={{ backgroundColor: SECTOR_DOTS[idx % SECTOR_DOTS.length] }}
              />
              {row.sector}
            </h3>
            <div className="flex flex-wrap gap-x-8 gap-y-4">
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
        className="type-sans-medium mt-12 inline-flex items-center gap-2 border-b border-foreground pb-1 text-body text-[#111111]"
      >
        {content.cta.label}
        <ArrowUpRight size={16} />
      </Link>
    </section>
  )
}
