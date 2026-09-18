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
/** Figma vector corner radius on every hover connector turn. */
const CONNECTOR_TURN_R = 21

/** Round every 90° H/V corner in a connector with a circular arc of `radius`. */
function roundedOrthogonalPath(d: string, radius = CONNECTOR_TURN_R): string {
  const cmds = d.match(/[MHV][^MHV]*/g)
  if (!cmds) return d

  let x = 0
  let y = 0
  const pts: { x: number; y: number }[] = []
  for (const cmd of cmds) {
    const nums = cmd
      .slice(1)
      .trim()
      .split(/[\s,]+/)
      .filter(Boolean)
      .map(Number)
    if (cmd[0] === "M") {
      x = nums[0]
      y = nums[1]
      pts.push({ x, y })
    } else if (cmd[0] === "H") {
      x = nums[0]
      pts.push({ x, y })
    } else if (cmd[0] === "V") {
      y = nums[0]
      pts.push({ x, y })
    }
  }
  if (pts.length < 3) return d

  let out = `M${pts[0].x} ${pts[0].y}`
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1]
    const curr = pts[i]
    const next = pts[i + 1]
    if (!next) {
      out += curr.x === prev.x ? ` V${curr.y}` : ` H${curr.x}`
      continue
    }

    const inLen = Math.hypot(curr.x - prev.x, curr.y - prev.y)
    const outLen = Math.hypot(next.x - curr.x, next.y - curr.y)
    const r = Math.min(radius, inLen / 2, outLen / 2)
    if (r < 0.5) {
      out += curr.x === prev.x ? ` V${curr.y}` : ` H${curr.x}`
      continue
    }

    const ix = curr.x === prev.x ? curr.x : curr.x - Math.sign(curr.x - prev.x) * r
    const iy = curr.y === prev.y ? curr.y : curr.y - Math.sign(curr.y - prev.y) * r
    const ox = next.x === curr.x ? curr.x : curr.x + Math.sign(next.x - curr.x) * r
    const oy = next.y === curr.y ? curr.y : curr.y + Math.sign(next.y - curr.y) * r
    const cross = (curr.x - prev.x) * (next.y - curr.y) - (curr.y - prev.y) * (next.x - curr.x)
    const sweep = cross > 0 ? 1 : 0

    out += curr.x === prev.x ? ` V${iy}` : ` H${ix}`
    out += ` A${r} ${r} 0 0 ${sweep} ${ox} ${oy}`
  }
  return out
}

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
  /** which `step.images` entry to paint; defaults to the box index */
  srcIndex?: number
  objectPosition?: string
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
      { x: 135, y: 20, w: 165, h: 90, z: 2 },
    ],
    connectors: [
      // left dashboard: down, then right into a drop shared with the next line
      "M40 143 V200 H130 V240",
      // centre card: down, then left into that same drop
      "M180 110 V200 H130 V240",
    ],
  },
  // ── Build from 0→1 ─ spans full column (both lines)
  // Hover: ResAI above-left, Brandintelle below-right.
  // Line 1: drop from ResAI, jog right onto the pill stem, drop into the pill.
  // Line 2: same stem continues down into Brandintelle.
  // Turns use a 21px circular radius (CONNECTOR_TURN_R).
  {
    pill: { y: 163, left: COL[1], right: COL[2], align: "stretch" },
    divider: COL[1],
    images: [
      { x: 138, y: 15, w: 162, h: 88 },
      { x: 267, y: 249, w: 164, h: 88 },
    ],
    connectors: [
      "M219 103 V121 H308 V180",
      "M308 200 V249",
    ],
  },
  // ── Redesign & Reposition ─ spans full column (both lines)
  // Hover: Vetbuddy above-left, ICP below-right.
  // Line 1: horizontal from Vetbuddy, then drop into the pill (------|).
  // Line 2: drop from the pill, long run right, then drop into ICP.
  {
    pill: { y: 101, left: COL[2], right: COL[3], align: "stretch" },
    divider: COL[2],
    images: [
      { x: 200, y: 16, w: 186, h: 101 },
      { x: 453, y: 207, w: 186, h: 101 },
    ],
    connectors: [
      "M386 66 H455 V118",
      "M455 118 V178 H546 V207",
    ],
  },
  // ── Scale & Partner ─ left edge flush to column line
  // Hover: one stem from the pill, T-junction left into ICP, stem continues into Oren.
  // Turns use a 21px circular radius (CONNECTOR_TURN_R).
  {
    pill: { y: 39, left: COL[3], right: COL[4], align: "left" },
    divider: COL[3],
    images: [
      { x: 394, y: 198, w: 186, h: 101 },
      { x: 612, y: 198, w: 186, h: 101 },
    ],
    connectors: [
      "M705 55 V198",
      "M705 163 H475 V198",
    ],
  },
]

// Fallback placeholder, used only when a step carries no `images` in content.
// Real project images come from `steps[].images` — swapping them in needs no
// change to the geometry or interaction logic below.
const FALLBACK_IMAGE = "https://placehold.co/420x260?text=Project"

// Mobile numbered markers from the Process Section frame (not the desktop bands).
const MOBILE_MARKERS = [
  { bg: "#F2BB06", fg: "#111111" },
  { bg: "#FF5B23", fg: "#FFFFFF" },
  { bg: "#DCB8FF", fg: "#111111" },
  { bg: "#3A39FF", fg: "#FFFFFF" },
] as const

export function DisciplineList({ steps }: { steps: ProcessStep[] }) {
  // First stage is active on load; only hover/focus changes it.
  const [activeStep, setActiveStep] = useState(0)

  // The section clips horizontally because the first stage's left card
  // overhangs the container on purpose (as it does in the reference) — clipping
  // keeps that overhang from ever introducing a horizontal scrollbar.
  return (
    <section className="overflow-x-clip bg-background py-12 md:py-28">
      <div className="section-shell [--section-pad-x:1rem] md:[--section-pad-x:1.5rem]">
        {/* Heading block */}
        <p className="type-vf-medium text-center text-[12px] leading-[normal] tracking-[3.3px] uppercase text-[#212121] max-md:!font-[550] md:text-left md:![font-family:var(--font-season-sans),ui-sans-serif,system-ui,sans-serif] md:!font-[550] md:text-eyebrow md:leading-normal md:text-[#AAAAAA] md:[font-variation-settings:normal]">
          <span className="md:hidden">Our Process</span>
          <span className="hidden md:inline">Where We Create Impact</span>
        </p>
        <h2 className="type-vf-regular mx-auto mt-3 max-w-3xl text-center text-[28px] leading-[125%] text-[#212121] max-md:!font-[400] md:mx-0 md:text-left md:![font-family:var(--font-season-sans),ui-sans-serif,system-ui,sans-serif] md:!font-[400] md:text-display-xs md:leading-[47.84px] md:text-[#111111] md:[font-variation-settings:normal]">
          <span className="block">Not Every Product Needs the Same Help</span>
          <span className="type-sans-light-italic mt-2 hidden text-[#666666] md:block">
            We Meet You Where You Are
          </span>
        </h2>

        {/* Mobile numbered process list — desktop keeps the staircase. */}
        <ol className="mt-8 flex flex-col pl-3 md:hidden">
          {steps.map((step, i) => {
            const marker = MOBILE_MARKERS[i] ?? MOBILE_MARKERS[0]
            return (
              <li key={step.id} className="flex gap-4 pb-5 last:pb-0">
                <span
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: marker.bg, color: marker.fg }}
                >
                  <span
                    className="type-vf-regular text-[12px] leading-[normal]"
                    style={{ fontVariationSettings: '"wght" 700, "SERF" 0, "slnt" 0', fontWeight: 700 }}
                  >
                    {i + 1}
                  </span>
                </span>
                <div className="flex flex-col gap-1">
                  <p className="type-vf-medium text-[16px] leading-[normal] text-[#111111] max-md:!font-[550]">
                    {step.vennLabel}
                  </p>
                  <p className="type-vf-regular text-[14px] leading-[140%] text-[#212121]/60 max-md:!font-[400]">
                    {step.shortDescription}
                  </p>
                </div>
              </li>
            )
          })}
        </ol>

        {/* Desktop-only staircase. */}
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
                    src={sources[box.srcIndex ?? imageIndex] ?? FALLBACK_IMAGE}
                    alt=""
                    className="h-full w-full object-cover"
                    style={
                      box.objectPosition
                        ? { objectPosition: box.objectPosition }
                        : undefined
                    }
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
                    d={roundedOrthogonalPath(path)}
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
