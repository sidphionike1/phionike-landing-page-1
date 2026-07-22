import { ArrowRight } from "lucide-react"
import type { WorkPage, ProcessStep } from "@/content/schema"

// ─── WorkHero ────────────────────────────────────────────────────────────────
// Centered layout with tall vertical tag cards flanking the headline

const TAG_CONFIG: Record<string, { bg: string; text: string; h: string }> = {
  terracotta: { bg: "#E65124", text: "#fff",  h: "h-48" },
  mustard:    { bg: "#F2A93B", text: "#111",  h: "h-56" },
  cobalt:     { bg: "#2538F5", text: "#fff",  h: "h-48" },
  lavender:   { bg: "#EAE8FC", text: "#111",  h: "h-56" },
}

export function WorkHero({ content }: { content: WorkPage["hero"] }) {
  // Left tags: Enterprise (mustard, taller) + Retail (terracotta, shorter)
  // Right tags: SAAS (cobalt, shorter) + Education (lavender, taller)
  const [left1, left2, right1, right2] = content.decorativeTags

  return (
    <section className="relative overflow-hidden bg-background pb-14 pt-28 md:pt-36 md:pb-16">
      {/* ── Left tag group ──────────────────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 top-0 hidden items-center gap-2 pl-6 md:flex md:pl-10"
        aria-hidden="true"
      >
        {[left1, left2].map((tag) => {
          if (!tag) return null
          const cfg = TAG_CONFIG[tag.color] ?? TAG_CONFIG.cobalt
          return (
            <div
              key={tag.label}
              className={`flex w-[72px] ${cfg.h} items-end justify-center rounded-2xl pb-5`}
              style={{ backgroundColor: cfg.bg }}
            >
              <span
                className="whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.2em]"
                style={{ writingMode: "vertical-lr", transform: "rotate(180deg)", color: cfg.text }}
              >
                {tag.label}
              </span>
            </div>
          )
        })}
      </div>

      {/* ── Right tag group ─────────────────────────────────────────── */}
      <div
        className="absolute bottom-0 right-0 top-0 hidden items-center gap-2 pr-6 md:flex md:pr-10"
        aria-hidden="true"
      >
        {[right1, right2].map((tag) => {
          if (!tag) return null
          const cfg = TAG_CONFIG[tag.color] ?? TAG_CONFIG.cobalt
          return (
            <div
              key={tag.label}
              className={`flex w-[72px] ${cfg.h} items-end justify-center rounded-2xl pb-5`}
              style={{ backgroundColor: cfg.bg }}
            >
              <span
                className="whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.2em]"
                style={{ writingMode: "vertical-lr", transform: "rotate(180deg)", color: cfg.text }}
              >
                {tag.label}
              </span>
            </div>
          )
        })}
      </div>

      {/* ── Centered content ────────────────────────────────────────── */}
      <div className="mx-auto max-w-4xl px-24 text-center md:px-32">
        <p className="eyebrow text-muted-foreground">{content.eyebrow}</p>
        <h1 className="mt-4 text-5xl font-medium leading-[1.05] tracking-tighter md:text-7xl">
          {content.headline}
        </h1>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
          <a
            href={content.primaryCta.href}
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background"
          >
            {content.primaryCta.label}
          </a>
          <a
            href={content.secondaryCta.href}
            className="inline-flex items-center gap-1.5 text-sm text-foreground/70"
          >
            {content.secondaryCta.label}
            <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  )
}

// ─── DisciplineList ──────────────────────────────────────────────────────────
// Staircase diagonal badges within 4-column guide layout

// top % within each column's h-72 container, ordered clarify→scale
const STAIR_TOP = ["80%", "55%", "30%", "5%"]

export function DisciplineList({ steps }: { steps: ProcessStep[] }) {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        {/* Heading block */}
        <p className="eyebrow text-muted-foreground">Where We Create Impact</p>
        <h2 className="mt-3 max-w-2xl text-4xl font-medium tracking-tight md:text-5xl">
          Not every product needs the same help
        </h2>
        <p className="mt-2 text-lg italic text-muted-foreground">
          we meet you where you are
        </p>

        {/* 4-column staircase grid */}
        <div className="mt-10 grid grid-cols-4 divide-x divide-border border-t border-border">
          {steps.map((step, i) => (
            <div key={step.id} className="relative h-72">
              <div
                className="absolute left-3 flex items-center gap-2.5 whitespace-nowrap rounded-full border border-border bg-background px-4 py-2.5 text-[10px] uppercase tracking-[0.18em] text-foreground"
                style={{ top: STAIR_TOP[i] }}
              >
                {/* Mustard asterisk icon */}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M6 1v10M1 6h10M2.05 2.05l7.9 7.9M9.95 2.05l-7.9 7.9" stroke="#F2A93B" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                {step.vennLabel}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── OutcomesStatement ───────────────────────────────────────────────────────
export function OutcomesStatement({ content }: { content: WorkPage["outcomesStatement"] }) {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <h2 className="max-w-2xl text-3xl font-medium tracking-tight md:text-4xl">
          {content.heading}
        </h2>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
          {content.body}
        </p>
      </div>
    </section>
  )
}
