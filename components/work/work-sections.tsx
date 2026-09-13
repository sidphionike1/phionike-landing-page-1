"use client"

import { useState } from "react"
import type { ProcessStep } from "@/content/schema"

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
 *  - pill:       staircase position + how the pill meets the column lines.
 *                Columns are bounded by [0, 230, 386, 618, FRAME_W].
 *                stretch = full column width; left/right = content width
 *                flush to that edge of the column.
 *  - divider:    x of the divider at this column's left edge (null = none).
 *  - images:     one entry per project card, so the count is data-driven and
 *                differs per stage (3 / 2 / 2 / 2).
 *  - connectors: one SVG path per line, in frame units, so each stage owns its
 *                own geometry. Paths deliberately end *inside* the pill: the
 *                pill is opaque and painted above, so each line visually stops
 *                at the pill's edge no matter what height the text renders at.
 */
type PillAlign = "left" | "right" | "stretch"

type StageVisual = {
  pill: { y: number; left: number; right: number; align: PillAlign }
  divider: number | null
  images: StageImage[]
  connectors: string[]
}

/** Column guides: left edge → … → right edge of the frame */
const COL = [0, 230, 386, 618, FRAME_W] as const

const STAGE_VISUALS: StageVisual[] = [
  // ── Discover & Define ─ right edge flush to column line
  {
    pill: { y: 223, left: COL[0], right: COL[1], align: "right" },
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
  // ── Build from 0→1 ─ spans full column (both lines)
  {
    pill: { y: 163, left: COL[1], right: COL[2], align: "stretch" },
    divider: COL[1],
    images: [
      { x: 135, y: 20, w: 165, h: 90 },
      { x: 266, y: 250, w: 164, h: 91 },
    ],
    connectors: [
      "M190 110 V135 Q190 145 200 145 H205 Q215 145 215 155 V180",
      "M250 180 V220 Q250 230 260 230 H290 Q300 230 300 240 V250",
    ],
  },
  // ── Redesign & Reposition ─ spans full column (both lines)
  {
    pill: { y: 101, left: COL[2], right: COL[3], align: "stretch" },
    divider: COL[2],
    images: [
      { x: 210, y: 20, w: 163, h: 90 },
      { x: 453, y: 213, w: 164, h: 75 },
    ],
    connectors: [
      "M373 55 H390 Q400 55 400 65 V118",
      "M430 118 V170 Q430 180 440 180 H470 Q480 180 480 190 V213",
    ],
  },
  // ── Scale & Partner ─ left edge flush to column line
  {
    pill: { y: 39, left: COL[3], right: COL[4], align: "left" },
    divider: COL[3],
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
      <div className="section-shell">
        {/* Heading block */}
        <p className="type-sans-medium text-eyebrow leading-normal tracking-[3.3px] uppercase text-[#AAAAAA]">
          Where We Create Impact
        </p>
        <h2 className="type-sans-regular mt-3 max-w-3xl text-lead leading-[125%] text-[#111111] md:text-display-xs md:leading-[47.84px]">
          <span className="block">Not Every Product Needs the Same Help</span>
          <span className="type-sans-light-italic mt-2 block text-[#666666]">
            We Meet You Where You Are
          </span>
        </h2>

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
            const { left, right, y, align } = visual.pill

            const positionStyle =
              align === "stretch"
                ? {
                    left: pctX(left),
                    width: pctX(right - left),
                  }
                : align === "right"
                  ? {
                      // Flush content-width pill to the column's right guide
                      right: pctX(FRAME_W - right),
                      left: "auto" as const,
                    }
                  : {
                      // Flush content-width pill to the column's left guide
                      left: pctX(left),
                    }

            return (
              <button
                key={step.id}
                type="button"
                aria-pressed={isActive}
                onMouseEnter={() => setActiveStep(i)}
                onFocus={() => setActiveStep(i)}
                className="type-sans-medium absolute z-10 flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full border px-4 py-2.5 text-body-sm uppercase leading-[16.5px] tracking-[3.3px] text-[#111111] transition-colors duration-300 ease-out hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E2566F] focus-visible:ring-offset-2"
                style={{
                  top: pctY(y),
                  ...positionStyle,
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
