"use client"

import { useState, type CSSProperties } from "react"
import { Plus } from "lucide-react"
import type { GlobalContent } from "@/content/schema"
import { cn } from "@/lib/utils"

const colors = {
  cobalt: "bg-primary text-primary-foreground",
  lavender: "bg-lavender text-foreground",
  terracotta: "bg-accent text-accent-foreground",
  mustard: "bg-mustard text-foreground",
} as const

const isLightBand = (bandColor: string) =>
  bandColor === "lavender" || bandColor === "mustard"

/** Figma card shell — shared by every step in the stack. */
const CARD_WIDTH = 480
const CARD_HEIGHT = 220
const CARD_PAD = 48
const CARD_RADIUS = 32
/**
 * Vertical step between cards. Large enough that icon + title (and some body)
 * of each card stays visible — matches the fanned stack in the services artboard.
 */
const CARD_OFFSET = 108
/** Alternating tilt: -2°, 2°, -2°, 2° */
const CARD_ANGLES = [-2, 2, -2, 2] as const

const DOT_POSITIONS = [
  { cx: 12, cy: 4.4 },
  { cx: 19.6, cy: 12 },
  { cx: 12, cy: 19.6 },
  { cx: 4.4, cy: 12 },
] as const
const DOT_OUTER_R = 3.6
const DOT_STROKE = 1.2

function FourDots({
  activeIndex,
  className,
}: {
  activeIndex: number
  className?: string
}) {
  const active =
    ((activeIndex % DOT_POSITIONS.length) + DOT_POSITIONS.length) %
    DOT_POSITIONS.length

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {DOT_POSITIONS.map((pos, i) =>
        i === active ? (
          <circle key={i} cx={pos.cx} cy={pos.cy} r={DOT_OUTER_R} fill="currentColor" />
        ) : (
          <circle
            key={i}
            cx={pos.cx}
            cy={pos.cy}
            r={DOT_OUTER_R - DOT_STROKE / 2}
            fill="none"
            stroke="currentColor"
            strokeWidth={DOT_STROKE}
          />
        ),
      )}
    </svg>
  )
}

export function ProcessCardStack({
  steps,
}: {
  steps: GlobalContent["processSteps"]
}) {
  const [activeIndex, setActiveIndex] = useState(steps.length - 1)
  const stackHeight = CARD_OFFSET * (steps.length - 1) + CARD_HEIGHT

  return (
    <div
      className="relative mx-auto w-full max-w-[480px]"
      style={{ height: stackHeight }}
    >
      {steps.map((step, i) => {
        const light = isLightBand(step.bandColor)
        const isActive = i === activeIndex
        const angle = CARD_ANGLES[i % CARD_ANGLES.length]

        const style: CSSProperties = {
          top: i * CARD_OFFSET,
          zIndex: isActive ? 40 : (i + 1) * 10,
          width: `min(100%, ${CARD_WIDTH}px)`,
          height: CARD_HEIGHT,
          borderRadius: CARD_RADIUS,
          padding: CARD_PAD,
          justifyContent: "space-between",
          transform: `translateX(-50%) rotate(${angle}deg)`,
          opacity: 1,
        }

        return (
          <button
            key={step.id}
            type="button"
            onClick={() => setActiveIndex(i)}
            aria-pressed={isActive}
            className={cn(
              "absolute left-1/2 flex w-full max-w-[480px] cursor-pointer flex-col text-left shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-[z-index] duration-200",
              colors[step.bandColor],
              light ? "text-[#121212]" : "text-white",
            )}
            style={style}
          >
            <div className="flex items-start gap-3">
              <FourDots
                activeIndex={i}
                className={cn(
                  "mt-1 shrink-0",
                  light ? "text-[#121212]" : "text-white",
                )}
              />
              <div className="min-w-0">
                <h2
                  className={cn(
                    "type-sans-regular text-title leading-none md:text-heading",
                    step.bandColor === "terracotta" && "text-[#FDF8F0]",
                  )}
                >
                  {step.heroLabel}
                </h2>
                {isActive && (
                  <p
                    className={cn(
                      "type-sans-regular mt-3 max-w-[280px] text-body-sm leading-[150%]",
                      light ? "text-[#121212]/80" : "text-white/85",
                    )}
                  >
                    {step.shortDescription}
                  </p>
                )}
              </div>
            </div>

            {isActive && (
              <div className="flex justify-end">
                <span
                  className="inline-flex size-10 items-center justify-center rounded-full bg-[#F5B800] text-[#121212] shadow-sm ring-1 ring-[#121212]/10"
                  aria-hidden
                >
                  <Plus size={18} strokeWidth={2.25} />
                </span>
              </div>
            )}
          </button>
        )
      })}
    </div>
  )
}
