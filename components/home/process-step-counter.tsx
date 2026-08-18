"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Check, Orbit } from "lucide-react"
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
const STEP_TOP = 64  // px of "peek" revealed per stacked card
const CARD_MIN_HEIGHT = 384 // px, matches `min-h-96` on each card

export function ProcessStepCounter({ content, disciplines }: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const [active, setActive] = useState(0)
  const [hovered, setHovered] = useState<number | null>(null)

  const topOffsets = content.steps.map((_, i) => BASE_TOP + i * STEP_TOP)

  // Total height of the pinned card stack: the last card's peek offset plus one
  // full card. Used to vertically centre the left column against the stack.
  const stackHeight = STEP_TOP * Math.max(0, content.steps.length - 1) + CARD_MIN_HEIGHT

  useEffect(() => {
    let raf = 0
    const measure = () => {
      let current = 0
      cardRefs.current.forEach((el, i) => {
        if (!el) return
        const top = el.getBoundingClientRect().top
        if (top <= topOffsets[i] + 4) current = i
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
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <div className="md:hidden">
          <p className="text-6xl font-medium tracking-tight">{content.mobileEyebrowNumber}</p>
          <h2 className="mt-4 max-w-xs text-2xl leading-tight text-muted-foreground">{content.mobileHeading}</h2>
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
                <h3 className="flex items-center gap-3 text-2xl">
                  <Orbit size={22} />
                  {item.mobileLabel}
                </h3>
                {index === 3 && (
                  <div className="mt-4">
                    <p className="text-xs uppercase tracking-[.16em]">{content.mobileHeading}</p>
                    <ul className="mt-4 flex flex-col gap-2 text-sm">
                      {content.steps.map((step) => (
                        <li key={step.id} className="flex items-center gap-2">
                          <Check size={14} />
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
          <div
            className="sticky col-span-5 flex flex-col justify-center self-start"
            style={{ top: BASE_TOP, height: stackHeight }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={displayIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
              >
                <p className="text-9xl font-semibold tracking-tighter">{content.steps[displayIndex]?.number}</p>
                <h2 className="mt-5 text-4xl font-semibold tracking-tight">{content.steps[displayIndex]?.heading}</h2>
                <p className="mt-3 max-w-sm text-muted-foreground">{content.steps[displayIndex]?.caption}</p>
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
                    "relative min-h-96 rounded-[2.5rem] p-12 shadow-lg",
                    CARD_STYLES[i % CARD_STYLES.length],
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{step.number}</span>
                    <motion.span
                      initial={false}
                      animate={{
                        opacity: hovered === i ? 1 : 0,
                        scale: hovered === i ? 1 : 0.6,
                        y: hovered === i ? 0 : 8,
                      }}
                      transition={{ duration: 0.25 }}
                      className="text-4xl font-semibold tracking-tighter"
                    >
                      {step.number}
                    </motion.span>
                  </div>
                  <h3 className="mt-20 text-5xl tracking-tight">{step.subheading}</h3>
                  <p className="mt-4 max-w-md text-lg opacity-75">{step.caption}</p>
                </motion.article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}