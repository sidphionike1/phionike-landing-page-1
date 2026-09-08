"use client"

import { useState } from "react"
import { ArrowRight, Circle, Minus, } from "lucide-react"
import type { WorkPage, ProcessStep } from "@/content/schema"
import { motion } from "framer-motion";


// ─── DisciplineList ──────────────────────────────────────────────────────────
// Staircase diagonal badges within 4-column guide layout.
// Hovering (or focusing) a stage pill activates it and reveals that stage's
// project image plus a connector line. The active stage persists until a
// different stage is hovered/focused — it is never reset on mouse leave.

// Active pill / connector palette (pink-red tone from the reference)
const ACTIVE_PILL_BG = "#FCE1E7"
const ACTIVE_PILL_BORDER = "#E2566F"
const CONNECTOR_COLOR = "#E2566F"

/**
 * Design frame measured off the reference artboard, with the grid's top-left
 * corner as the origin. Every number in STAGE_VISUALS is in these units, so the
 * whole composition scales proportionally: the grid box carries
 * `aspect-ratio: 845/308` and images, pills, dividers and connectors are all
 * expressed as percentages of it. The arrangement therefore stays identical to
 * the reference at any viewport width.
 */
const FRAME_W = 845
const FRAME_H = 308

const pctX = (v: number) => `${(v / FRAME_W) * 100}%`
const pctY = (v: number) => `${(v / FRAME_H) * 100}%`

type StageImage = {
  x: number
  y: number
  w: number
  h: number
  /** paint order inside the stage; higher sits on top */
  z?: number
}

/**
 * Per-stage visuals, ordered clarify→scale to match `steps`.
 *
 *  - pill:       top-left of this stage's pill. In the reference each pill's
 *                left edge is exactly the previous pill's right edge, and the
 *                vertical dividers land on those same x values (230/386/618) —
 *                the columns are not equal quarters.
 *  - divider:    x of the divider at this column's left edge (null = none).
 *  - images:     one entry per project card, so the count is data-driven and
 *                differs per stage (3 / 2 / 2 / 2).
 *  - connectors: one SVG path per line, in frame units, so each stage owns its
 *                own geometry. Paths deliberately end *inside* the pill: the
 *                pill is opaque and painted above, so each line visually stops
 *                at the pill's edge no matter what height the text renders at.
 */
type StageVisual = {
  pill: { x: number; y: number }
  divider: number | null
  images: StageImage[]
  connectors: string[]
}

const STAGE_VISUALS: StageVisual[] = [
  // ── Discover & Define ─ 3 cards: left dashboard, centre card, narrow card behind it
  {
    pill: { x: 25, y: 223 },
    divider: null,
    images: [
      { x: -62, y: 53, w: 164, h: 90 },
      { x: 290, y: 22, w: 55, h: 90, z: 1 }, // sits behind the centre card, only its right sliver shows
      { x: 135, y: 20, w: 165, h: 90, z: 2 },
    ],
    connectors: [
      // left dashboard: down, then right into a drop shared with the next line
      "M40 143 V190 Q40 200 50 200 H120 Q130 200 130 210 V240",
      // centre card: down, then left into that same drop
      "M180 110 V190 Q180 200 170 200 H140 Q130 200 130 210 V240",
    ],
  },
  // ── Build from 0→1 ─ 2 cards: one above the pill, one below it
  {
    pill: { x: 230, y: 163 },
    divider: 230,
    images: [
      { x: 135, y: 20, w: 165, h: 90 },
      { x: 266, y: 250, w: 164, h: 91 },
    ],
    connectors: [
      "M190 110 V135 Q190 145 200 145 H205 Q215 145 215 155 V180",
      "M250 180 V220 Q250 230 260 230 H290 Q300 230 300 240 V250",
    ],
  },
  // ── Redesign & Reposition ─ 2 cards: one upper-left, one below the pill
  {
    pill: { x: 386, y: 101 },
    divider: 386,
    images: [
      { x: 210, y: 20, w: 163, h: 90 },
      { x: 453, y: 213, w: 164, h: 75 },
    ],
    connectors: [
      "M373 55 H390 Q400 55 400 65 V118",
      "M430 118 V170 Q430 180 440 180 H470 Q480 180 480 190 V213",
    ],
  },
  // ── Scale & Partner ─ 2 cards. No reference frame was supplied for this
  // state, so the arrangement mirrors the established pattern: pill near the
  // top, both cards routed below it.
  {
    pill: { x: 618, y: 39 },
    divider: 618,
    images: [
      { x: 453, y: 110, w: 164, h: 90 },
      { x: 640, y: 215, w: 164, h: 90 },
    ],
    connectors: [
      "M650 57 V80 Q650 90 640 90 H570 Q560 90 560 100 V110",
      "M700 57 V140 Q700 150 710 150 H712 Q720 150 720 160 V215",
    ],
  },
]

// Fallback placeholder, used only when a step carries no `images` in content.
// Real project images come from `steps[].images` — swapping them in needs no
// change to the geometry or interaction logic below.
const FALLBACK_IMAGE = "https://placehold.co/420x260?text=Project"

export function DisciplineList({ steps }: { steps: ProcessStep[] }) {
  // First stage is active on load; only hover/focus changes it.
  const [activeStep, setActiveStep] = useState(0)

  // The section clips horizontally because the first stage's left card
  // overhangs the container on purpose (as it does in the reference) — clipping
  // keeps that overhang from ever introducing a horizontal scrollbar.
  return (
    <section className="overflow-x-clip bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        {/* Heading block */}
        <p className="eyebrow text-muted-foreground">Where We Create Impact</p>
        <h2 className="mt-3 max-w-2xl text-4xl font-medium tracking-tight md:text-5xl">
          Not every product needs the same help
        </h2>
        <p className="mt-2 text-lg italic text-muted-foreground">
          we meet you where you are
        </p>

        {/* Desktop-only staircase. Mobile behaviour is unchanged (hidden). */}
        <div
          className="relative mt-10 hidden border-t border-border md:block"
          style={{ aspectRatio: `${FRAME_W} / ${FRAME_H}` }}
        >
          {/* Column dividers — drawn at the reference's pill boundaries */}
          {STAGE_VISUALS.map((visual, i) =>
            visual.divider === null ? null : (
              <div
                key={`divider-${i}`}
                aria-hidden="true"
                className="absolute top-0 z-0 h-full w-px bg-border"
                style={{ left: pctX(visual.divider) }}
              />
            ),
          )}

          {/* Project cards + connectors — decorative, never intercept pointer events */}
          <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
            {steps.map((step, i) => {
              const visual = STAGE_VISUALS[i]
              if (!visual) return null
              const isActive = i === activeStep
              const sources = step.images ?? []

              return visual.images.map((box, imageIndex) => (
                <div
                  key={`image-${step.id}-${imageIndex}`}
                  className="absolute overflow-hidden rounded-[10px] shadow-[0_8px_24px_-12px_rgba(0,0,0,0.25)] transition-all duration-300 ease-out"
                  style={{
                    left: pctX(box.x),
                    top: pctY(box.y),
                    width: pctX(box.w),
                    aspectRatio: `${box.w} / ${box.h}`,
                    zIndex: box.z ?? 0,
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? "translateY(0)" : "translateY(6px)",
                    transitionDelay: isActive ? `${imageIndex * 40}ms` : "0ms",
                  }}
                >
                  <img
                    src={sources[imageIndex] ?? FALLBACK_IMAGE}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
              ))
            })}

            {/* Connectors: one path per line, only the active stage's are drawn */}
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox={`0 0 ${FRAME_W} ${FRAME_H}`}
              preserveAspectRatio="none"
              fill="none"
            >
              {steps.map((step, i) => {
                const visual = STAGE_VISUALS[i]
                if (!visual) return null
                const isActive = i === activeStep

                return visual.connectors.map((path, pathIndex) => (
                  <path
                    key={`connector-${step.id}-${pathIndex}`}
                    d={path}
                    pathLength={1}
                    stroke={CONNECTOR_COLOR}
                    strokeWidth={1.25}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    // holds the stroke at 1.25px regardless of the viewBox scale
                    vectorEffect="non-scaling-stroke"
                    style={{
                      strokeDashoffset: isActive ? 0 : 1,
                      opacity: isActive ? 1 : 0,
                      transition:
                        "stroke-dashoffset 400ms ease-out, opacity 300ms ease-out",
                      transitionDelay: isActive ? `${pathIndex * 60}ms` : "0ms",
                    }}
                  />
                ))
              })}
            </svg>
          </div>

          {/* Stage pills */}
          {steps.map((step, i) => {
            const visual = STAGE_VISUALS[i]
            if (!visual) return null
            const isActive = i === activeStep

            return (
              <button
                key={step.id}
                type="button"
                aria-pressed={isActive}
                onMouseEnter={() => setActiveStep(i)}
                onFocus={() => setActiveStep(i)}
                className="absolute z-10 flex items-center gap-2.5 whitespace-nowrap rounded-full border px-4 py-2.5 text-[10px] uppercase tracking-[0.18em] text-foreground transition-colors duration-300 ease-out hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E2566F] focus-visible:ring-offset-2"
                style={{
                  left: pctX(visual.pill.x),
                  top: pctY(visual.pill.y),
                  backgroundColor: isActive
                    ? ACTIVE_PILL_BG
                    : "var(--background)",
                  borderColor: isActive ? ACTIVE_PILL_BORDER : "var(--border)",
                }}
              >
                {/* Mustard asterisk icon */}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M6 1v10M1 6h10M2.05 2.05l7.9 7.9M9.95 2.05l-7.9 7.9" stroke="#F2A93B" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                {step.vennLabel}
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── OutcomesStatement ───────────────────────────────────────────────────────

const stats = [
  {
    value: "300M+",
    label: "PEOPLE REACHED",
  },
  {
    value: "20+",
    label: "INDUSTRIES SERVED",
  },
  {
    value: "2.5M+",
    label: "MONTHLY ACTIVE USERS",
  },
  {
    value: "8+",
    label: "YEARS OF CRAFT",
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const card = {
  hidden: {
    opacity: 0,
    x: -80,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};