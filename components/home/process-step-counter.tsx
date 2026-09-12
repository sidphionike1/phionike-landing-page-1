"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { HomePage } from "@/content/schema"

type Props = { content: HomePage["processSteps"]; disciplines: HomePage["venn"]["disciplines"] }

const CARD_STYLES = [
  "bg-primary text-primary-foreground",
  "bg-lavender text-foreground",
  "bg-accent text-accent-foreground",
  "bg-mustard text-foreground",
]

const BASE_TOP = 128 // px, sticky offset of the first card / left column

/**
 * Card metrics taken from the reference. The prototype screenshot was captured
 * at ~71% zoom (1024 of a 1440 artboard), so the measured values divided by
 * 0.711 give the native sizes used below — a 368px card, a 120px peek, 64px
 * padding, a 36px heading and 14px list text.
 *
 * STEP_TOP is deliberately larger than the heading row's lower edge
 * (CARD_PAD_TOP + 40 = 108) so a stacked card's peek always shows its complete
 * dot-icon + heading row, exactly as the reference does.
 */
const STEP_TOP = 120         // px of "peek" revealed per stacked card
const CARD_MIN_HEIGHT = 368  // px
const CARD_PAD_X = 64        // px
const CARD_PAD_TOP = 68      // px
const CARD_PAD_BOTTOM = 64   // px
const POINT_GAP = 22         // px between list rows (→ ~42px row pitch at 14px/20px text)
/**
 * How far below a card's sticky top we still treat it as “coming into view”.
 * Activates the left indicator as soon as the card starts scrolling up —
 * not only once it has locked to its sticky position.
 */
const ACTIVATE_EARLY_PX = STEP_TOP + 80

/** Ring positions, clockwise from the top. */
const DOT_POSITIONS = [
  { cx: 12, cy: 4.4 },  // top
  { cx: 19.6, cy: 12 }, // right
  { cx: 12, cy: 19.6 }, // bottom
  { cx: 4.4, cy: 12 },  // left
] as const

const DOT_OUTER_R = 3.6
const DOT_STROKE = 1.2

/**
 * The four-dot cluster that precedes every card heading. Exactly one dot is
 * filled and the other three are outlined; the filled dot advances one position
 * per step. Uses currentColor so cards can force white icons.
 */
function FourDots({ activeIndex, className }: { activeIndex: number; className?: string }) {
  const active = ((activeIndex % DOT_POSITIONS.length) + DOT_POSITIONS.length) % DOT_POSITIONS.length

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

/** Double-check mark — two ticks stacked with a tight overlap. */
function DoubleTick({ className }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M1.25 7.25 3.5 9.5 9.75 2.5" />
      <path d="M1.25 11 3.5 13.25 9.75 6.25" />
    </svg>
  )
}

export function ProcessStepCounter({ content, disciplines }: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const [active, setActive] = useState(0)
  const [hovered, setHovered] = useState<number | null>(null)

  const topOffsets = content.steps.map((_, i) => BASE_TOP + i * STEP_TOP)

  // Total height of the pinned card stack: the last card's peek offset plus one
  // full card. Used so the left column can track the active card's top edge.
  const stackHeight = STEP_TOP * Math.max(0, content.steps.length - 1) + CARD_MIN_HEIGHT

  useEffect(() => {
    let raf = 0
    const measure = () => {
      let current = 0
      cardRefs.current.forEach((el, i) => {
        if (!el) return
        const top = el.getBoundingClientRect().top
        // Fire as soon as the card is approaching its sticky slot — not only
        // after it has locked to topOffsets[i].
        if (top <= topOffsets[i] + ACTIVATE_EARLY_PX) current = i
      })
      setActive(current)
    }
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(measure)
    }
    measure()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(raf)
    }
    // topOffsets is stable across renders for a given content.steps.length
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content.steps.length])

  const displayIndex = hovered ?? active

  return (
    <section ref={sectionRef} className="bg-background py-20 md:py-28">
      <div className="section-shell">
        <div className="md:hidden">
          <p className="type-sans-regular text-numeral-sm leading-none text-[#212121] md:text-numeral">
            {content.mobileEyebrowNumber}
          </p>
          <h2 className="type-sans-regular mt-4 max-w-sm text-title leading-[120%] text-[#212121]/60 md:text-display-xs md:leading-[53.76px]">
            {content.mobileHeading}
          </h2>
          <div className="mt-10 flex flex-col">
            {disciplines.map((item, index) => (
              <article
                key={item.id}
                className={cn(
                  "min-h-28 rounded-[2rem] p-8",
                  index > 0 && "-mt-5",
                  index === 0 && "bg-primary text-primary-foreground",
                  index === 1 && "bg-lavender text-foreground",
                  index === 2 && "bg-accent text-accent-foreground",
                  index === 3 && "bg-mustard text-foreground",
                )}
              >
                <h3 className="type-sans-regular flex items-center gap-3 text-title-lg leading-[31.76px]">
                  <FourDots activeIndex={index} className="shrink-0 text-white" />
                  {item.mobileLabel}
                </h3>
                {index === 3 && (
                  <div className="mt-4">
                    <p className="type-sans-regular text-eyebrow leading-[18px] tracking-[1.95px] uppercase">
                      {content.mobileHeading}
                    </p>
                    <ul className="mt-4 flex flex-col gap-2">
                      {content.steps.map((step) => (
                        <li
                          key={step.id}
                          className="type-sans-regular flex items-center gap-2 text-eyebrow leading-[18.91px]"
                        >
                          <DoubleTick className="shrink-0" />
                          {step.subheading}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>

        <div
          className="hidden grid-cols-12 gap-12 md:grid"
          style={{ minHeight: `${Math.max(150, content.steps.length * 70)}vh` }}
        >
          {/* Left indicator — fixed to the second card's top; content swaps on scroll */}
          <div
            className="sticky col-span-5 self-start"
            style={{ top: BASE_TOP + STEP_TOP, height: stackHeight - STEP_TOP }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={displayIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <p className="type-sans-regular text-numeral-sm leading-none text-[#212121] md:text-numeral">
                  {content.steps[displayIndex]?.number}
                </p>
                <h2 className="type-sans-regular mt-5 max-w-md text-title leading-[120%] text-[#212121]/60 md:text-display-xs md:leading-[53.76px]">
                  {content.steps[displayIndex]?.heading}
                </h2>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="col-span-7 flex flex-col">
            {content.steps.map((step, i) => (
              <div
                key={step.id}
                ref={(el) => {
                  cardRefs.current[i] = el
                }}
                className="sticky"
                style={{
                  top: topOffsets[i],
                  zIndex: hovered === i ? content.steps.length + 10 : i + 1,
                }}
              >
                <motion.article
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  animate={{
                    y: hovered === i ? -28 : 0,
                    scale: hovered === i ? 1.02 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 320, damping: 28 }}
                  className={cn(
                    "relative rounded-[2.5rem] shadow-lg",
                    CARD_STYLES[i % CARD_STYLES.length],
                  )}
                  style={{
                    minHeight: CARD_MIN_HEIGHT,
                    paddingLeft: CARD_PAD_X,
                    paddingRight: CARD_PAD_X,
                    paddingTop: CARD_PAD_TOP,
                    paddingBottom: CARD_PAD_BOTTOM,
                  }}
                >
                  {/* Dot icon + heading — the only row revealed in a stacked card's peek */}
                  <div className="flex items-center gap-4">
                    <FourDots activeIndex={i} className="shrink-0 text-white" />
                    <h3 className="type-sans-regular text-title-lg leading-[31.76px] md:text-heading md:leading-[53.76px]">
                      {step.subheading}
                    </h3>
                  </div>

                  {step.cardSubheading && (
                    <p className="type-sans-regular mt-7 max-w-md text-eyebrow leading-[18px] tracking-[1.95px] uppercase">
                      {step.cardSubheading}
                    </p>
                  )}

                  {step.points && step.points.length > 0 && (
                    <ul className="mt-8 flex flex-col" style={{ gap: POINT_GAP }}>
                      {step.points.map((point) => (
                        <li
                          key={point}
                          className="type-sans-regular flex items-center gap-3 text-eyebrow leading-[18.91px]"
                        >
                          <DoubleTick className="shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
