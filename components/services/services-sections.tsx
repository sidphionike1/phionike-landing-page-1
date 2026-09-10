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
      return "01 . CLARIFY"
    case "shape":
      return "02 - 0 - 1"
    case "build-iterate":
      return "03 . BUILD & ITERATE"
    case "scale":
      return "04 - SCALE"
    default:
      return `${step.number} . ${step.heroLabel}`
  }
}

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
      <div className="section-shell py-20 md:py-28">
        <p className="type-sans-bold text-eyebrow leading-normal tracking-[0.1em] uppercase text-[#FF5B23]">
          {intro.eyebrow}
        </p>
        <h2 className="type-sans-regular mt-5 max-w-4xl text-balance text-lead leading-[120%] tracking-[-1px] text-[#111111] md:text-display-sm">
          {intro.headingPlain}{" "}
          <span className="text-[#FF5B23]">{intro.headingAccent}</span>
        </h2>
      </div>
      {steps.map((step, index) => {
        const strip = strips.find((s) => s.afterStepId === step.id)
        const light = isLightBand(step.bandColor)

        return (
          <div key={step.id}>
            <article
              className={cn(
                "py-20 md:py-28",
                bands[step.bandColor],
              )}
            >
              <div className="section-shell grid gap-12 lg:grid-cols-2">
                <div>
                  <span
                    className={cn(
                      "type-vf-regular text-body-sm leading-normal tracking-[4px] md:text-title-lg",
                      light ? "text-[#121212]/80" : "text-white/80",
                    )}
                  >
                    {stageLabel(step)}
                  </span>
                  <h3
                    className={cn(
                      "type-sans-medium mt-8 text-balance text-[26px] leading-[120%] tracking-[-2px] md:text-display-md",
                      light ? "text-[#121212]" : "text-white",
                    )}
                  >
                    {step.heading}
                  </h3>
                  <p
                    className={cn(
                      "type-vf-regular mt-6 max-w-xl text-body leading-[150%]",
                      light ? "text-[#121212]/90" : "text-white/90",
                    )}
                  >
                    {step.longDescription}
                  </p>
                </div>
                <div className="flex flex-col gap-10 lg:pt-12">
                  <List title="What We Do" items={step.whatWeDo} light={light} />
                  <List
                    title="Client Outcomes"
                    items={step.clientOutcomes}
                    light={light}
                  />
                </div>
              </div>
            </article>
            {strip && index < 3 ? (
              <div className="relative aspect-[4/3] w-full md:aspect-[32/9]">
                <Image
                  src={strip.src.replace(".jpg", ".png")}
                  alt={strip.alt}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            ) : null}
          </div>
        )
      })}
    </section>
  )
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
      <h4
        className={cn(
          "type-vf-medium text-body-lg leading-normal tracking-[-0.5px]",
          light ? "text-[#121212]" : "text-white",
        )}
      >
        {title}
      </h4>
      <ul className="mt-4 flex flex-col gap-2">
        {items.map((i) => (
          <li
            key={i}
            className={cn(
              "type-vf-regular flex gap-3 text-body-sm leading-[140%] before:content-['—']",
              light ? "text-[#121212]/90" : "text-white/90",
            )}
          >
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
        {content.sectors.map((row) => (
          <div
            key={row.sector}
            className="grid gap-6 border-b border-border py-8 md:grid-cols-[18rem_1fr]"
          >
            <h3 className="type-vf-regular flex items-start gap-3 text-body-lg leading-[140%] tracking-[-0.44px] text-[#1A1A1A] before:mt-2 before:size-2 before:shrink-0 before:rounded-full before:bg-accent md:text-title-md md:leading-[29.7px]">
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
